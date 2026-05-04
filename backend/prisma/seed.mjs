import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  const passwordHash = await bcrypt.hash("Password@123", 10);

  // Delete old development data in correct order
  await prisma.notification.deleteMany();
  await prisma.alertEvidence.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.cameraEvent.deleteMany();
  await prisma.faceEmbedding.deleteMany();
  await prisma.criminalPhoto.deleteMany();
  await prisma.criminalCase.deleteMany();
  await prisma.criminal.deleteMany();
  await prisma.userSession.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.camera.deleteMany();
  await prisma.user.deleteMany();
  await prisma.policeStation.deleteMany();

  console.log("🧹 Old development data cleared.");

  // Police Stations
  const colomboStation = await prisma.policeStation.create({
    data: {
      name: "Colombo Central Police Station",
      code: "CMB-CENTRAL",
      city: "Colombo",
      district: "Colombo",
      province: "Western Province",
      address: "Colombo 01, Sri Lanka",
      phone: "+94112421111",
      email: "central.colombo@police.lk",
    },
  });

  const kandyStation = await prisma.policeStation.create({
    data: {
      name: "Kandy Police Station",
      code: "KDY-MAIN",
      city: "Kandy",
      district: "Kandy",
      province: "Central Province",
      address: "Kandy, Sri Lanka",
      phone: "+94812222222",
      email: "kandy@police.lk",
    },
  });

  const galleStation = await prisma.policeStation.create({
    data: {
      name: "Galle Police Station",
      code: "GAL-MAIN",
      city: "Galle",
      district: "Galle",
      province: "Southern Province",
      address: "Galle, Sri Lanka",
      phone: "+94912222222",
      email: "galle@police.lk",
    },
  });

  console.log("🏢 Police stations created.");

  // Users
  const superAdmin = await prisma.user.create({
    data: {
      fullName: "System Super Admin",
      email: "superadmin@thiefdetect.lk",
      passwordHash,
      phone: "+94770000001",
      badgeNumber: "SA-001",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      policeStationId: colomboStation.id,
      lastLoginAt: new Date(),
    },
  });

  const admin = await prisma.user.create({
    data: {
      fullName: "Admin Officer",
      email: "admin@thiefdetect.lk",
      passwordHash,
      phone: "+94770000002",
      badgeNumber: "AD-001",
      role: "ADMIN",
      status: "ACTIVE",
      policeStationId: colomboStation.id,
    },
  });

  const policeOfficer = await prisma.user.create({
    data: {
      fullName: "Officer Nimal Perera",
      email: "officer@thiefdetect.lk",
      passwordHash,
      phone: "+94770000003",
      badgeNumber: "PO-001",
      role: "POLICE_OFFICER",
      status: "ACTIVE",
      policeStationId: colomboStation.id,
    },
  });

  const investigator = await prisma.user.create({
    data: {
      fullName: "Investigator Kasun Silva",
      email: "investigator@thiefdetect.lk",
      passwordHash,
      phone: "+94770000004",
      badgeNumber: "IN-001",
      role: "INVESTIGATOR",
      status: "ACTIVE",
      policeStationId: kandyStation.id,
    },
  });

  const viewer = await prisma.user.create({
    data: {
      fullName: "Viewer User",
      email: "viewer@thiefdetect.lk",
      passwordHash,
      phone: "+94770000005",
      badgeNumber: "VW-001",
      role: "VIEWER",
      status: "ACTIVE",
      policeStationId: galleStation.id,
    },
  });

  console.log("👮 Users created.");

  // Cameras
  const camera1 = await prisma.camera.create({
    data: {
      name: "Pettah Market Entrance Camera",
      code: "CAM-PETTAH-001",
      location: "Pettah Market Entrance",
      rtspUrl: "rtsp://192.168.1.101:554/stream1",
      ipAddress: "192.168.1.101",
      status: "ACTIVE",
      latitude: 6.9369,
      longitude: 79.8500,
      policeStationId: colomboStation.id,
      lastHeartbeatAt: new Date(),
    },
  });

  const camera2 = await prisma.camera.create({
    data: {
      name: "Fort Railway Station Camera",
      code: "CAM-FORT-001",
      location: "Colombo Fort Railway Station",
      rtspUrl: "rtsp://192.168.1.102:554/stream1",
      ipAddress: "192.168.1.102",
      status: "ACTIVE",
      latitude: 6.9344,
      longitude: 79.8500,
      policeStationId: colomboStation.id,
      lastHeartbeatAt: new Date(),
    },
  });

  const camera3 = await prisma.camera.create({
    data: {
      name: "Kandy Bus Stand Camera",
      code: "CAM-KANDY-001",
      location: "Kandy Central Bus Stand",
      rtspUrl: "rtsp://192.168.2.101:554/stream1",
      ipAddress: "192.168.2.101",
      status: "MAINTENANCE",
      latitude: 7.2906,
      longitude: 80.6337,
      policeStationId: kandyStation.id,
    },
  });

  const camera4 = await prisma.camera.create({
    data: {
      name: "Galle Fort Camera",
      code: "CAM-GALLE-001",
      location: "Galle Fort Entrance",
      rtspUrl: "rtsp://192.168.3.101:554/stream1",
      ipAddress: "192.168.3.101",
      status: "OFFLINE",
      latitude: 6.0329,
      longitude: 80.2168,
      policeStationId: galleStation.id,
    },
  });

  console.log("📹 Cameras created.");

  // Camera Events
  await prisma.cameraEvent.createMany({
    data: [
      {
        cameraId: camera1.id,
        eventType: "ONLINE",
        message: "Camera stream connected successfully.",
      },
      {
        cameraId: camera2.id,
        eventType: "STREAM_STARTED",
        message: "RTSP stream started.",
      },
      {
        cameraId: camera3.id,
        eventType: "MAINTENANCE",
        message: "Camera is under scheduled maintenance.",
      },
      {
        cameraId: camera4.id,
        eventType: "OFFLINE",
        message: "Camera connection lost.",
      },
    ],
  });

  console.log("📡 Camera events created.");

  // Criminals
  const criminal1 = await prisma.criminal.create({
    data: {
      criminalCode: "CR-2026-001",
      fullName: "Ruwan Fernando",
      aliasName: "Ruwa",
      nic: "901234567V",
      passportNumber: "N1234567",
      gender: "MALE",
      dateOfBirth: new Date("1990-04-12"),
      age: 36,
      nationality: "Sri Lankan",
      address: "Dematagoda, Colombo",
      crimeType: "Theft",
      description: "Suspected in multiple mobile phone theft cases around Pettah and Fort.",
      riskLevel: "HIGH",
      status: "WANTED",
      lastKnownLocation: "Pettah Market",
      lastSeenAt: new Date(),
      createdById: admin.id,
    },
  });

  const criminal2 = await prisma.criminal.create({
    data: {
      criminalCode: "CR-2026-002",
      fullName: "Saman Kumara",
      aliasName: "Kuma",
      nic: "852345678V",
      gender: "MALE",
      dateOfBirth: new Date("1985-09-22"),
      age: 40,
      nationality: "Sri Lankan",
      address: "Kandy",
      crimeType: "Robbery",
      description: "Wanted for robbery incidents near bus stands.",
      riskLevel: "CRITICAL",
      status: "UNDER_INVESTIGATION",
      lastKnownLocation: "Kandy Bus Stand",
      createdById: investigator.id,
    },
  });

  const criminal3 = await prisma.criminal.create({
    data: {
      criminalCode: "CR-2026-003",
      fullName: "Unknown Female Suspect",
      aliasName: "Unknown",
      gender: "FEMALE",
      nationality: "Unknown",
      crimeType: "Pickpocketing",
      description: "Suspected pickpocket detected in crowded areas.",
      riskLevel: "MEDIUM",
      status: "WANTED",
      lastKnownLocation: "Colombo Fort",
      createdById: policeOfficer.id,
    },
  });

  console.log("🗂 Criminals created.");

  // Criminal Photos
  await prisma.criminalPhoto.createMany({
    data: [
      {
        criminalId: criminal1.id,
        imageUrl: "/uploads/criminals/ruwan-fernando-1.jpg",
        fileName: "ruwan-fernando-1.jpg",
        mimeType: "image/jpeg",
        fileSize: 245000,
        isPrimary: true,
        qualityScore: 0.92,
      },
      {
        criminalId: criminal2.id,
        imageUrl: "/uploads/criminals/saman-kumara-1.jpg",
        fileName: "saman-kumara-1.jpg",
        mimeType: "image/jpeg",
        fileSize: 210000,
        isPrimary: true,
        qualityScore: 0.89,
      },
      {
        criminalId: criminal3.id,
        imageUrl: "/uploads/criminals/unknown-female-1.jpg",
        fileName: "unknown-female-1.jpg",
        mimeType: "image/jpeg",
        fileSize: 198000,
        isPrimary: true,
        qualityScore: 0.76,
      },
    ],
  });

  console.log("🖼 Criminal photos created.");

  // Face Embeddings - dummy vectors for development
  await prisma.faceEmbedding.createMany({
    data: [
      {
        criminalId: criminal1.id,
        vector: Array.from({ length: 128 }, (_, i) => Number((0.01 * i).toFixed(4))),
        modelName: "face_recognition_dlib",
        dimension: 128,
        imageUrl: "/uploads/criminals/ruwan-fernando-1.jpg",
        isActive: true,
      },
      {
        criminalId: criminal2.id,
        vector: Array.from({ length: 128 }, (_, i) => Number((0.02 * i).toFixed(4))),
        modelName: "face_recognition_dlib",
        dimension: 128,
        imageUrl: "/uploads/criminals/saman-kumara-1.jpg",
        isActive: true,
      },
      {
        criminalId: criminal3.id,
        vector: Array.from({ length: 128 }, (_, i) => Number((0.03 * i).toFixed(4))),
        modelName: "face_recognition_dlib",
        dimension: 128,
        imageUrl: "/uploads/criminals/unknown-female-1.jpg",
        isActive: true,
      },
    ],
  });

  console.log("🧠 Face embeddings created.");

  // Criminal Cases
  await prisma.criminalCase.createMany({
    data: [
      {
        caseNumber: "CASE-2026-001",
        title: "Pettah Mobile Theft Investigation",
        description: "Investigation related to repeated mobile phone thefts in Pettah Market.",
        status: "OPEN",
        criminalId: criminal1.id,
      },
      {
        caseNumber: "CASE-2026-002",
        title: "Kandy Bus Stand Robbery Case",
        description: "Robbery investigation around Kandy central bus stand.",
        status: "UNDER_INVESTIGATION",
        criminalId: criminal2.id,
      },
      {
        caseNumber: "CASE-2026-003",
        title: "Fort Pickpocketing Surveillance Case",
        description: "Monitoring suspicious pickpocket activity near Colombo Fort.",
        status: "OPEN",
        criminalId: criminal3.id,
      },
    ],
  });

  console.log("📁 Criminal cases created.");

  // Alerts
  const alert1 = await prisma.alert.create({
    data: {
      alertCode: "ALT-2026-001",
      criminalId: criminal1.id,
      cameraId: camera1.id,
      confidenceScore: 91.7,
      status: "NEW",
      snapshotUrl: "/uploads/alerts/alt-2026-001.jpg",
      location: "Pettah Market Entrance",
      notes: "High confidence face match detected.",
      detectedAt: new Date(),
      assignedToId: policeOfficer.id,
    },
  });

  const alert2 = await prisma.alert.create({
    data: {
      alertCode: "ALT-2026-002",
      criminalId: criminal2.id,
      cameraId: camera3.id,
      confidenceScore: 87.2,
      status: "REVIEWING",
      snapshotUrl: "/uploads/alerts/alt-2026-002.jpg",
      location: "Kandy Central Bus Stand",
      notes: "Match requires manual investigation.",
      detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      reviewedById: investigator.id,
      assignedToId: investigator.id,
      reviewedAt: new Date(),
    },
  });

  const alert3 = await prisma.alert.create({
    data: {
      alertCode: "ALT-2026-003",
      criminalId: criminal3.id,
      cameraId: camera2.id,
      confidenceScore: 73.4,
      status: "FALSE_POSITIVE",
      snapshotUrl: "/uploads/alerts/alt-2026-003.jpg",
      location: "Colombo Fort Railway Station",
      notes: "Low confidence match marked as false positive after review.",
      detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      reviewedById: admin.id,
      reviewedAt: new Date(),
      resolvedAt: new Date(),
    },
  });

  console.log("🚨 Alerts created.");

  // Alert Evidence
  await prisma.alertEvidence.createMany({
    data: [
      {
        alertId: alert1.id,
        fileUrl: "/uploads/alerts/alt-2026-001.jpg",
        fileType: "image/jpeg",
        fileName: "alt-2026-001.jpg",
        metadata: {
          camera: camera1.name,
          confidence: 91.7,
        },
      },
      {
        alertId: alert2.id,
        fileUrl: "/uploads/alerts/alt-2026-002.jpg",
        fileType: "image/jpeg",
        fileName: "alt-2026-002.jpg",
        metadata: {
          camera: camera3.name,
          confidence: 87.2,
        },
      },
      {
        alertId: alert3.id,
        fileUrl: "/uploads/alerts/alt-2026-003.jpg",
        fileType: "image/jpeg",
        fileName: "alt-2026-003.jpg",
        metadata: {
          camera: camera2.name,
          confidence: 73.4,
        },
      },
    ],
  });

  console.log("📸 Alert evidence created.");

  // Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: policeOfficer.id,
        alertId: alert1.id,
        type: "DASHBOARD",
        status: "PENDING",
        title: "New High Risk Alert",
        message: "Ruwan Fernando detected at Pettah Market Entrance.",
      },
      {
        userId: investigator.id,
        alertId: alert2.id,
        type: "EMAIL",
        status: "SENT",
        title: "Alert Under Review",
        message: "Saman Kumara possible match detected in Kandy.",
        sentAt: new Date(),
      },
      {
        userId: admin.id,
        alertId: alert3.id,
        type: "DASHBOARD",
        status: "READ",
        title: "False Positive Alert",
        message: "Alert ALT-2026-003 was marked as false positive.",
        readAt: new Date(),
      },
    ],
  });

  console.log("🔔 Notifications created.");

  // Audit Logs
  await prisma.auditLog.createMany({
    data: [
      {
        userId: superAdmin.id,
        action: "SEED_DATABASE",
        entity: "SYSTEM",
        entityId: null,
        details: {
          message: "Development database seeded successfully.",
        },
        ipAddress: "127.0.0.1",
        userAgent: "Seed Script",
      },
      {
        userId: admin.id,
        action: "CREATE_CRIMINAL",
        entity: "Criminal",
        entityId: criminal1.id,
        details: {
          criminalCode: criminal1.criminalCode,
        },
        ipAddress: "127.0.0.1",
        userAgent: "Seed Script",
      },
      {
        userId: policeOfficer.id,
        action: "ASSIGN_ALERT",
        entity: "Alert",
        entityId: alert1.id,
        details: {
          alertCode: alert1.alertCode,
        },
        ipAddress: "127.0.0.1",
        userAgent: "Seed Script",
      },
    ],
  });

  console.log("📝 Audit logs created.");

  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("Demo Login Accounts:");
  console.log("SUPER_ADMIN: superadmin@thiefdetect.lk / Password@123");
  console.log("ADMIN: admin@thiefdetect.lk / Password@123");
  console.log("POLICE_OFFICER: officer@thiefdetect.lk / Password@123");
  console.log("INVESTIGATOR: investigator@thiefdetect.lk / Password@123");
  console.log("VIEWER: viewer@thiefdetect.lk / Password@123");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });