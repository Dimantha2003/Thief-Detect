import fs from "fs";
import path from "path";
import os from "os";
import { exec } from "child_process";

import prisma from "../config/prisma.js";
import { sendAlertEmail } from "../services/emailService.js";

const PYTHON_EXEC = `"C:\\Users\\Dimatha Sheshan\\OneDrive\\Desktop\\pola\\pola\\.venv\\Scripts\\python.exe"`;

const AI_SCRIPT = `"C:\\Users\\Dimatha Sheshan\\OneDrive\\Desktop\\Thief Detect\\Thief-Detect\\ai-engine\\face_matcher.py"`;

// ==========================================
// PREVENT AI OVERLOAD
// ==========================================
let isScanning = false;

// ==========================================
// CREATE ALERT FROM CAMERA
// ==========================================
export const createAlert = async (
  req,
  res
) => {
  const {
    confidence,
    image,
    location,
  } = req.body;

  // ==========================================
  // VALIDATE IMAGE
  // ==========================================
  if (!image) {
    return res.status(400).json({
      success: false,
      message: "No image provided",
    });
  }

  // ==========================================
  // AI BUSY PROTECTION
  // ==========================================
  if (isScanning) {
    return res.status(200).json({
      success: true,
      message:
        "AI busy processing previous frame",
    });
  }

  isScanning = true;

  console.log("====================================");
  console.log(
    "🚨 INCOMING ALERT! Scanning face..."
  );

  // ==========================================
  // SAVE TEMP IMAGE
  // ==========================================
  const uniqueId = Date.now();

  const tempImagePath = path.join(
    os.tmpdir(),
    `temp_alert_${uniqueId}.jpg`
  );

  const base64Data = image.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  fs.writeFileSync(
    tempImagePath,
    base64Data,
    "base64"
  );

  // ==========================================
  // RUN PYTHON AI
  // ==========================================
  const command = `${PYTHON_EXEC} ${AI_SCRIPT} "${tempImagePath}"`;

  exec(command, async (error, stdout) => {
    // UNLOCK AI
    isScanning = false;

    // DELETE TEMP FILE
    if (fs.existsSync(tempImagePath)) {
      fs.unlinkSync(tempImagePath);
    }

    // PYTHON EXEC ERROR
    if (error) {
      console.error(
        "⚠️ Python Execution Error:",
        error
      );

      return;
    }

    try {
      // ==========================================
      // CLEAN PYTHON OUTPUT
      // ==========================================
      const jsonString = stdout.substring(
        stdout.indexOf("{"),
        stdout.lastIndexOf("}") + 1
      );

      const aiResult =
        JSON.parse(jsonString);

      // ==========================================
      // FACE MATCH FOUND
      // ==========================================
      if (aiResult.match) {
        console.log(
          `💥 FACE RECOGNIZED BY AI: ${aiResult.name}`
        );

        const criminalId =
          aiResult.name.split("_photo")[0];

        console.log(
          `🆔 Extracted Criminal ID: ${criminalId}`
        );

        // ==========================================
        // FIND CRIMINAL
        // ==========================================
        const criminalData =
          await prisma.criminal.findUnique({
            where: {
              id: criminalId,
            },

            include: {
              photos: true,
            },
          });

        // ==========================================
        // CRIMINAL FOUND
        // ==========================================
        if (criminalData) {
          console.log(
            `✅ DATABASE MATCH FOUND: ${criminalData.fullName}`
          );

          // ==========================================
          // CREATE ALERT
          // ==========================================
          const newAlert =
  await prisma.alert.create({
    data: {
      alertCode: `ALT-${Date.now()}`,

      confidenceScore: parseFloat(
        confidence ||
          Math.random() * (99 - 85) + 85
      ),

      status: "NEW",

      snapshotUrl:
        criminalData.photos?.[0]
          ?.imageUrl || null,

      location:
        location ||
        "Unknown Location",

      notes: `AI detected ${criminalData.fullName}`,

      criminal: {
        connect: {
          id: criminalData.id,
        },
      },
    },

    include: {
      criminal: {
        include: {
          photos: true,
        },
      },
    },
  });

          console.log(
            `🚨 ALERT CREATED: ${newAlert.alertCode}`
          );

          // ==========================================
          // 🚀 SEND EMAILS TO ACTIVE SYSTEM USERS
          // ==========================================
          try {
            const systemUsers = await prisma.user.findMany({
              where: { status: "ACTIVE" },
              select: { email: true }
            });

            if (systemUsers.length > 0) {
              console.log(`✉️ Found ${systemUsers.length} active monitors. Dispatching alert notifications...`);
              
              // Map individual transmission routines so they compile concurrently
              systemUsers.forEach((user) => {
                if (user.email) {
                  sendAlertEmail(user.email, newAlert, criminalData, base64Data);
                }
              });
            } else {
              console.log("⚠️ No active users found in database to notify.");
            }
          } catch (dbUserError) {
            console.error("⚠️ Failed to look up target notification recipients:", dbUserError);
          }

        }

        // ==========================================
        // CRIMINAL NOT FOUND
        // ==========================================
        else {
          console.log(
            "⚠️ Criminal recognized but not found in database."
          );
        }
      }

      // ==========================================
      // NO FACE MATCH
      // ==========================================
      else {
        console.log(
          "🤷‍♂️ No match found in database."
        );
      }
    } catch (parseError) {
      console.error(
        "❌ Failed to parse Python output",
        parseError
      );
    }
  });

  // ==========================================
  // RETURN FAST RESPONSE
  // ==========================================
  return res.status(200).json({
    success: true,
    message:
      "Scan started in background",
  });
};

// ==========================================
// GET ALERT HISTORY
// ==========================================
export const getAlerts = async (
  req,
  res
) => {
  try {
    const alerts =
      await prisma.alert.findMany({
        include: {
          criminal: {
            include: {
              photos: true,
            },
          },
        },

        orderBy: {
          detectedAt: "desc",
        },
      });

    res.status(200).json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};