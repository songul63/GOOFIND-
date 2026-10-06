
import { GoogleGenAI } from '@google/genai';

// Lazy singleton — avoids initializing the SDK during initial app module load.
let aiClient: GoogleGenAI | null | undefined;

const getAI = () => {
  if (aiClient !== undefined) return aiClient;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing. AI features will be disabled.');
    aiClient = null;
    return aiClient;
  }

  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
};

export const searchTurkishBusinesses = async (query: string) => {
  try {
    const ai = getAI();
    if (!ai) throw new Error('AI not initialized');
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Find Turkish businesses in Canada related to: ${query}. Provide a structured list including Name, Address, Phone, and Category.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || 'No results found.';
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources: chunks };
  } catch (error) {
    console.warn('Gemini Search Warning (using fallback):', error);
    return { text: 'Search temporarily offline. Please try again soon.', sources: [] };
  }
};

export const moderateContent = async (text: string): Promise<boolean> => {
  try {
    const ai = getAI();
    if (!ai) return true;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Analyze the following content for a community app and decide if it is appropriate, truthful-sounding, and helpful. Return "SAFE" or "UNSAFE". Content: "${text}"`,
    });
    return response.text?.includes('SAFE') ?? false;
  } catch {
    return true;
  }
};

const getNewsReferenceDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-CA', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getLatestCanadaTurkishNews = async (lang: 'en' | 'tr') => {
  try {
    const ai = getAI();
    if (!ai) return [];
    const todayLabel = getNewsReferenceDate();
    const prompt =
      lang === 'en'
        ? `Today is ${todayLabel} (Canada/Eastern). Find the latest news from the last 7 days (prioritize stories from today or the most recent days) about the Turkish community in Canada, immigration updates affecting Turks, TS2023 earthquake survivors, or events involving Turks in Canada. Provide exactly 3 items with Title, a brief Description (max 100 chars), a detailed Content (long version for reading), a Category, and a Link (real source URL of a trusted news article or official resource covering this topic). Format as JSON array of objects with keys: title, desc, content, category, link, color (pick a tailwind color like 'bg-red-600'). Return JSON only.`
        : `Bugün ${todayLabel} (Kanada/Doğu saati). Son 7 günün haberlerini bul (mümkünse bugünün veya en yeni günlerin başlıklarına öncelik ver): Kanada Türk toplumu, Türkler için göçmenlik güncellemeleri, TS2023 deprem mağdurları veya Kanada'daki Türkleri ilgilendiren gelişmeler. Tam 3 madde; her biri Başlık, kısa açıklama (max 100 karakter), detaylı İçerik (okuma için uzun versiyon), kategori ve Bağlantı (güvenilir haber veya resmi kaynağın gerçek URL'si). JSON dizi: keys title, desc, content, category, link, color (ör. bg-red-600). Yalnızca JSON döndür.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || '[]';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const cleanedText = jsonMatch ? jsonMatch[0] : text;

    return JSON.parse(cleanedText);
  } catch (error) {
    console.warn(
      'Gemini Live News currently experiencing high demand. Seamlessly falling back to curated local news.',
      error,
    );
    return [];
  }
};

export const summarizeWebsiteInfo = async (
  url: string,
  title: string,
  lang: 'en' | 'tr',
): Promise<string | null> => {
  try {
    const ai = getAI();
    if (!ai) return null;
    const prompt =
      lang === 'en'
        ? `You are an expert content analyzer. Generate a highly concise and structured summary/overview of the website/brand/offer at URL: "${url}". This is a community advertisement banner titled: "${title}". Use Google Search to look up the exact details of this URL/brand, and present a professional summary (around 2 paragraphs) in English about their services, ongoing offers, or essential terms. Use bullet points for key features at the end.`
        : `Sen uzman bir içerik analistisin. "${url}" adresindeki web sitesinin/markanın/teklifin son derece özlü ve yapılandırılmış bir özetini çıkar. Bu, "${title}" başlıklı bir topluluk reklam bannerıdır. Bu URL/marka hakkındaki detayları bulmak için Google Arama'yı kullan ve Türkçe olarak sundukları hizmetler, aktif kampanyalar veya katılım koşulları hakkında profesyonel bir özet (yaklaşık 2 paragraf) oluştur. Sonunda ana özellikleri maddeler halinde listele.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text || null;
  } catch (error) {
    console.warn('Error in summarizeWebsiteInfo:', error);
    return null;
  }
};

export const translatePlaceFields = async (fields: {
  howToGetEn?: string;
  howToGetTr?: string;
  tipsEn?: string;
  tipsTr?: string;
  priceEn?: string;
  priceTr?: string;
  parkingEn?: string;
  parkingTr?: string;
}): Promise<{
  howToGetEn: string;
  howToGetTr: string;
  tipsEn: string;
  tipsTr: string;
  priceEn: string;
  priceTr: string;
  parkingEn: string;
  parkingTr: string;
}> => {
  try {
    const ai = getAI();
    if (!ai) throw new Error('AI not initialized');
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are an expert bilingual translator between English and Turkish.
Analyze the following object. For any field pairs (e.g., howToGetEn & howToGetTr), if one is provided and the other is empty/blank, translate the provided one into the other language (EN -> TR or TR -> EN). If both are empty, leave them empty. If both are provided, keep them as is. Maintain a natural, friendly local guide tone.

Input:
${JSON.stringify(fields, null, 2)}

Return ONLY a valid JSON object matching the exact keys: howToGetEn, howToGetTr, tipsEn, tipsTr, priceEn, priceTr, parkingEn, parkingTr. Code output must not contain markdown styling except inside a single JSON block.`,
    });

    const text = response.text || '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanedText = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error in translatePlaceFields:', error);
    throw error;
  }
};
