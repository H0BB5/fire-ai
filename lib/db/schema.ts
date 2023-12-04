import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Technician = pgTable("technician", {
  id: serial("id").primaryKey(),
  technicianId: varchar("technician_id", { length: 256 }).notNull(),
  firstName: text("first_name"),
  email: text("email").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Customer = pgTable("customer", {
  id: serial("id").primaryKey(),
  customerId: varchar("customer_id", { length: 256 }).notNull(),
  businessName: text("business_name"),
  address: text("address"),
  city: text("city"),

  technicianId: integer("technician_id")
    .references(() => Technician.id)
    .notNull(),
  technicianNotes: text("technician_notes"),

  contactName: text("contact_name"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at").defaultNow(),
});

export const Tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  tagId: varchar("tag_id", { length: 256 }).notNull(),

  technicianId: integer("technician_id")
    .references(() => Technician.id)
    .notNull(),
  customerId: integer("customer_id")
    .references(() => Customer.id)
    .notNull(),

  name: text("name"),
  type: text("type"),
  location: text("location"),
  expiration: timestamp("expiration"),
  serial: text("serial"),
  rating: integer("rating"),
  photoFrontUrl: text("photo_front_url"),
  photoBackUrl: text("photo_back_url"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at").defaultNow(),
});
