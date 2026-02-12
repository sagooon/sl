
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const interactions = pgTable("interactions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'open', 'scroll', 'play'
  timestamp: text("timestamp").notNull(),
});

export const insertInteractionSchema = createInsertSchema(interactions).pick({
  type: true,
  timestamp: true,
});

export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
export type Interaction = typeof interactions.$inferSelect;
