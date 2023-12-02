const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const { addDays } = require("date-fns");

const db = new PrismaClient();

async function main() {
  try {
    // Seed Technician data
    const technician = await db.technician.create({
      data: {
        userId: uuidv4(),
        name: "John Doe",
        email: "johndoe@example.com",
      },
    });

    // Seed Customer data
    const customer = await db.customer.create({
      data: {
        name: "Fire Safety Inc.",
        address: "123 Fire Lane, Safety Town, ST 12345",
        location: "Main Office",
        contactName: "Jane Smith",
        contactPhone: "123-456-7890",
        contactEmail: "contact@firesafety.com",
        technicianId: technician.id,
      },
    });

    // Seed Tag data
    const tag = await db.tag.create({
      data: {
        name: "Office Fire Extinguisher",
        type: "Fire Extinguisher",
        location: "Office",
        expirationDate: addDays(new Date(), 150), // 150 days from now
        serialNumber: "SN123456",
        rating: "A",
        extinguisher: true,
        fireHose: false,
        fireSystem: false,
        photoFrontUrl: "http://example.com/photo_front_1.jpg",
        photoBackUrl: "http://example.com/photo_back_1.jpg",
        status: "Active",
        technicianId: technician.id,
        customerId: customer.id,
      },
    });

    // Seed Notification data (optional, based on your logic)
    // ...
  } catch (error) {
    console.error("Error seeding data: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
