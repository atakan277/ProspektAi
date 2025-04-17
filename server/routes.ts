import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { medicineAnalysisSchema } from "@shared/schema";
import { analyzeImageWithGemini } from "./utils/gemini";

export async function registerRoutes(app: Express) {
  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageData } = medicineAnalysisSchema.parse(req.body);

      // Remove data:image/jpeg;base64 prefix and validate base64
      const base64Regex = /^data:image\/([a-zA-Z]*);base64,/;
      if (!base64Regex.test(imageData)) {
        return res.status(400).json({ 
          message: "Geçersiz görüntü formatı. Lütfen tekrar deneyin." 
        });
      }

      console.log("Sending image to Gemini for analysis...");

      // Analyze image using Gemini
      const geminiResult = await analyzeImageWithGemini(imageData);

      if (geminiResult.error) {
        return res.status(500).json({ message: geminiResult.error });
      }

      const detectedText = geminiResult.text;
      console.log("Detected text:", detectedText);

      // Create a medicine object from Gemini response
      let medicine;
      try {
        const medicineInfo = JSON.parse(detectedText);
        medicine = {
          id: 1,
          ...medicineInfo,
          imageUrl: null
        };
      } catch {
        return res.status(400).json({
          message: "İlaç bilgileri bulunamadı. Lütfen fotoğrafı daha net çekiniz veya farklı bir ilaç deneyiniz."
        });
      }

      return res.json(medicine);
    } catch (error) {
      console.error("Analysis error:", error);
      return res.status(500).json({ 
        message: "İlaç analizi sırasında bir hata oluştu. Lütfen tekrar deneyin." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}