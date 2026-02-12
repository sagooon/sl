
import { db } from "./db";
import { interactions, type InsertInteraction } from "@shared/schema";

export interface IStorage {
  logInteraction(interaction: InsertInteraction): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async logInteraction(interaction: InsertInteraction): Promise<void> {
    await db.insert(interactions).values(interaction);
  }
}

export const storage = new DatabaseStorage();
