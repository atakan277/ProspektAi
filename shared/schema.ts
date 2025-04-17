import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const medicines = pgTable("medicines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  activeIngredient: text("active_ingredient").notNull(),
  usage: text("usage").notNull(),
  dosage: text("dosage").notNull(),
  sideEffects: text("side_effects").notNull(),
  warnings: text("warnings").notNull(),
  imageUrl: text("image_url"),
});

export const insertMedicineSchema = createInsertSchema(medicines).omit({ 
  id: true 
});

export type InsertMedicine = z.infer<typeof insertMedicineSchema>;
export type Medicine = typeof medicines.$inferSelect;

export const medicineAnalysisSchema = z.object({
  imageData: z.string()
});

export type MedicineAnalysis = z.infer<typeof medicineAnalysisSchema>;