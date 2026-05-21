import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "../config/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knownFacesDir = path.join(__dirname, "../../known_faces");

if (!fs.existsSync(knownFacesDir)) {
  fs.mkdirSync(knownFacesDir, { recursive: true });
}

// ==========================================
// ADD CRIMINAL
// ==========================================
export const addCriminal = async (req, res) => {
  try {
    const {
      fullName,
      criminalCode,
      nic,
      crimeType,
      riskLevel,
      status,
      lastKnownLocation,
      description,
    } = req.body;

    const newCriminal = await prisma.criminal.create({
      data: {
        fullName,
        criminalCode:
          criminalCode || `CR-${Date.now().toString().slice(-6)}`,
        nic,
        crimeType,
        riskLevel: riskLevel || "MEDIUM",
        status: status || "WANTED",
        lastKnownLocation,
        description,
      },
    });

    if (req.files && req.files.length > 0) {
      const photoRecords = [];

      req.files.forEach((file, index) => {
        const ext = path.extname(file.originalname) || ".jpg";

        const filename = `${newCriminal.id}_photo${index + 1}${ext}`;

        const filepath = path.join(knownFacesDir, filename);

        fs.writeFileSync(filepath, file.buffer);

        photoRecords.push({
          criminalId: newCriminal.id,
          imageUrl: `/known_faces/${filename}`,
          fileName: filename,
          mimeType: file.mimetype,
          isPrimary: index === 0,
        });
      });

      await prisma.criminalPhoto.createMany({
        data: photoRecords,
      });
    }

    res.status(201).json({
      success: true,
      message: "Criminal added successfully",
      data: newCriminal,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL
// ==========================================
export const getAllCriminals = async (req, res) => {
  try {
    const criminals = await prisma.criminal.findMany({
      include: {
        photos: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: criminals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ONE
// ==========================================
export const getCriminalById = async (req, res) => {
  try {
    const criminal = await prisma.criminal.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        photos: true,
      },
    });

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: "Criminal not found",
      });
    }

    res.status(200).json({
      success: true,
      data: criminal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE
// ==========================================
export const updateCriminal = async (req, res) => {
  try {
    const updated = await prisma.criminal.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE
// ==========================================
export const deleteCriminal = async (req, res) => {
  try {
    const photos = await prisma.criminalPhoto.findMany({
      where: {
        criminalId: req.params.id,
      },
    });

    photos.forEach((photo) => {
      const filepath = path.join(
        knownFacesDir,
        path.basename(photo.imageUrl)
      );

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    });

    await prisma.criminal.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Criminal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};