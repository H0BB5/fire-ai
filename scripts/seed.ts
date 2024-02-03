const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const { addDays } = require("date-fns");

const db = new PrismaClient();

const now = new Date();
const currentDate = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
);

console.log("TIMEZONE/CURRENT DAY SET", currentDate);

const futureDate = addDays(new Date(), 10);

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
        expirationDate: currentDate, // Today
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

    const notification = await db.notification.create({
      data: {
        id: customerId,
        tag: {
          connect: {
            tagId: tag.tagId,
          },
        },
        customer: {
          connect: {
            customerId: customerId,
          },
        },
        title: "Reminder Title",
        body: "Body",
        status: "Scheduled",
        sendDate: currentDate, // today
        method: ["email", "sms"],
      },
    });

    const notification1 = await db.notification.create({
      data: {
        id: uuidv4(),
        tag: {
          connect: {
            tagId: tag.tagId,
          },
        },
        customer: {
          connect: {
            customerId: customerId,
          },
        },
        title: "Reminder 1",
        body: "Time to service equipment",
        method: ["email"],
        sendDate: currentDate, // today
        status: "pending",
      },
    });

    const notification2 = await db.notification.create({
      data: {
        id: uuidv4(),
        tag: {
          connect: {
            tagId: tag.tagId,
          },
        },
        customer: {
          connect: {
            customerId: customerId,
          },
        },
        title: "Reminder 2",
        body: "Schedule maintenance",
        method: ["sms"],
        sendDate: futureDate, // 10 days from now
        status: "pending",
      },
    });

    console.log("Seeded sample notification data");

    console.log("\x1b[32m%s\x1b[0m", "Success seeding data! 🌱");
  } catch (error) {
    console.error("Error seeding data: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
