import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface GeminiResponse {
  text: string;
  error?: string;
}

async function getMedicineInfo(medicineName: string, activeIngredient: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Sen bir ilaç uzmanısın. ${medicineName} (${activeIngredient}) hakkında aşağıdaki başlıklara göre DETAYLI bilgi ver. Her başlık için EN AZ 3 CÜMLE yaz ve bilgiyi "Bilgi alınamadı" şeklinde GEÇİŞTİRME:

Etken madde:
${activeIngredient} hakkında detaylı bilgi ver. Yapısını ve etki mekanizmasını açıkla.

Kullanım amacı:
Bu ilaç hangi hastalıkların tedavisinde kullanılır? Endikasyonlarını ve kullanım alanlarını listele.

Kullanım şekli ve dozu:
Günlük kullanım dozu nedir? Ne zaman ve nasıl kullanılmalı? Özel durumlar nelerdir?

Yan etkileri:
En sık görülen yan etkileri nelerdir? Ciddi yan etkiler nelerdir? Hangi durumlarda doktora başvurulmalı?

Önemli uyarılar:
Kimler kullanmamalı? Hangi durumlarda dikkatli olunmalı? Etkileşime girdiği ilaçlar nelerdir?

Lütfen cevabı aşağıdaki formatta ver:
Etken madde: [Detaylı açıklama]
Kullanım amacı: [Detaylı açıklama]
Kullanım şekli ve dozu: [Detaylı açıklama]
Yan etkileri: [Detaylı açıklama]
Önemli uyarılar: [Detaylı açıklama]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Gemini'den gelen yanıtı parse et
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    return {
      name: medicineName,
      activeIngredient: lines.find(l => l.includes("Etken madde"))?.replace("Etken madde:", "").trim() || "Bilgi alınamadı",
      usage: lines.find(l => l.includes("Kullanım amacı"))?.replace("Kullanım amacı:", "").trim() || "Bilgi alınamadı",
      dosage: lines.find(l => l.includes("Kullanım şekli"))?.replace("Kullanım şekli ve dozu:", "").trim() || "Doktorunuzun önerdiği şekilde kullanınız",
      sideEffects: lines.find(l => l.includes("Yan etkileri"))?.replace("Yan etkileri:", "").trim() || "Bilgi alınamadı",
      warnings: lines.find(l => l.includes("Önemli uyarılar"))?.replace("Önemli uyarılar:", "").trim() || "• Her ilaç kullanımında olduğu gibi doktorunuza danışınız\n• Prospektüsü dikkatle okuyunuz"
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      name: medicineName,
      activeIngredient: "Bilgi alınamadı",
      usage: "Bilgi alınamadı",
      dosage: "Doktorunuzun önerdiği şekilde kullanınız",
      sideEffects: "Bilgi alınamadı",
      warnings: "• Her ilaç kullanımında olduğu gibi doktorunuza danışınız\n• Prospektüsü dikkatle okuyunuz"
    };
  }
}

export async function analyzeImageWithGemini(imageData: string): Promise<GeminiResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log("Starting Gemini image analysis...");
    const base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
    const imageBytes = Buffer.from(base64Image, 'base64');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Bu bir ilaç kutusudur. Lütfen kutunun üzerindeki bilgileri dikkatlice incele ve aşağıdaki bilgileri bul:

1. İlaç ismi (En büyük yazılan marka ismi)
2. Etken madde (Genellikle kutunun ön yüzünde mg/ml gibi değerlerle birlikte yazılır)

Yanıtını şu formatta ver:
İLAÇ: [İlaç ismi büyük harflerle]
ETKEN MADDE: [Etken madde ve dozu]

Eğer görüntü net değilse veya bilgileri okuyamıyorsan "OKUNAMADI" yaz.

Not: Sadece kutu üzerinde açıkça görebildiğin bilgileri yaz, tahmin yapma.`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      },
      prompt
    ]);

    const response = await result.response;
    const detectedInfo = response.text();

    if (detectedInfo === "OKUNAMADI") {
      return { text: detectedInfo };
    }

    // Parse the detected info
    const nameMatch = detectedInfo.match(/İLAÇ: (.*)/);
    const ingredientMatch = detectedInfo.match(/ETKEN MADDE: (.*)/);

    const medicineName = nameMatch ? nameMatch[1].trim() : "";
    const activeIngredient = ingredientMatch ? ingredientMatch[1].trim() : "";

    const medicineInfo = await getMedicineInfo(medicineName, activeIngredient);

    if (medicineInfo) {
      return { text: JSON.stringify(medicineInfo) };
    }

    return { text: detectedName };
  } catch (error) {
    console.error('API Error:', error);
    return {
      text: '',
      error: 'İlaç analizi sırasında bir hata oluştu'
    };
  }
}