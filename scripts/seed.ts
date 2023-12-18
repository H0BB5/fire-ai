const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const { addDays } = require("date-fns");

const db = new PrismaClient();

async function main() {
  try {
    const id = uuidv4();
    const technicianId = uuidv4();
    const tagId = uuidv4();
    const customerId = uuidv4();
    const emailIndex = uuidv4();

    const technician = await db.technician.create({
      data: {
        id,
        technicianId,
        firstName: "John",
        email: `technician${emailIndex}@email.com`,
      },
    });

    // Seed Customer data
    const customer = await db.customer.create({
      data: {
        id: customerId,
        customerId,
        businessName: "Fire Safety Inc.",
        address: "123 Fire Lane, Safety Town, ST 12345",
        city: "Edmonton",
        contactName: "Jane Smith",
        contactPhone: "123-456-7890",
        contactEmail: "contact@firesafety.com",
        technician: {
          connect: {
            technicianId: technician.technicianId,
          },
        },
      },
    });

    // Seed Tag data
    const tag = await db.tag.create({
      data: {
        id: uuidv4(),
        tagId,
        businessName: customer.businessName,
        type: "Fire Extinguisher",
        location: "Office",
        expirationDate: addDays(new Date(), 150), // 150 days from now
        serial: "SN123456",
        rating: "A",
        frontTagSrc: "http://placehold.co/300x300/000000/fff.jpg",
        backTagSrc: "http://placehold.co/300x300/444444/fff.jpg",
        technician: {
          connect: {
            technicianId: technician.technicianId,
          },
        },
        customer: {
          connect: {
            customerId: customerId,
          },
        },
      },
    });

    console.log("\x1b[32m%s\x1b[0m", "Success seeding data! 🌱");
    // Seed Notification data (optional, based on your logic)
  } catch (error) {
    console.error("Error seeding data: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
