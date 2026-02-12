
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.interactions.log.path, async (req, res) => {
    try {
      const input = api.interactions.log.input.parse(req.body);
      await storage.logInteraction(input);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

  return httpServer;
}
