import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function optimizeResumeContent(text: string, type: 'summary' | 'experience' | 'skills') {
  const prompts = {
    summary: `Professionalize the following resume summary to be ATS-friendly and impactful: ${text}`,
    experience: `Improve the following job experience description using powerful action verbs and metrics: ${text}`,
    skills: `Suggest 5-10 relevant professional skills based on this description: ${text}`
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompts[type]
  });
  
  return response.text;
}

export async function parseResumeText(text: string) {
  const prompt = `
    Parse the following resume text into a JSON format. 
    Return an object matching this structure:
    {
      "personalInfo": { "fullName": "", "email": "", "phone": "", "location": "", "website": "", "summary": "", "title": "" },
      "experience": [ { "company": "", "position": "", "startDate": "", "endDate": "", "current": false, "location": "", "description": "" } ],
      "education": [ { "school": "", "degree": "", "startDate": "", "endDate": "", "current": false, "location": "" } ],
      "skills": [],
      "projects": [ { "name": "", "link": "", "description": "" } ],
      "languages": [],
      "certifications": []
    }
    
    Resume Text:
    ${text}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  return JSON.parse(response.text);
}
