import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. We are safely back to using your .env file!
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(API_KEY, { apiVersion: "v1" });

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is missing! Check your .env file.");
} else {
  console.log("API Key found. Starts with:", API_KEY.substring(0, 5) + "...");
}

export async function askGemini(prompt, systemInstruction = "You are an empathetic student tutor.") {
  try {
    // 2. Upgraded to the active 2.5 model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const fullPrompt = `${systemInstruction}\n\nStudent: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    return await result.response.text();
  } catch (error) {
    console.error("Chat API Error:", error);
    return "Sorry, I'm taking a quick brain break. Try again in a second!";
  }
}

export async function analyzeMood(text) {
  try {
    // 3. Upgraded to the active 2.5 model here too
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `You are an empathetic AI for a student dashboard. 
    Analyze this text: "${text}"
    Return a JSON object with exactly these two keys:
    "mood" (a single emoji)
    "suggestion" (one short sentence of advice)`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    
    // Safety parsing just in case the AI adds markdown blocks
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Mood API Error:", error);
    return { mood: "🤖", suggestion: "I couldn't quite read that. Take a deep breath and try again!" };
  }
}

export async function generateStudyPlan(subjects, examDate) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `You are an expert academic planner. Create a highly effective, realistic daily study plan.
    Subjects to study: ${subjects}
    Exam Date/Deadline: ${examDate}
    
    Return a JSON object with exactly ONE key called "plan". 
    "plan" must be an array of objects. Each object represents one day and must have exactly these keys:
    "day" (string, e.g., "Day 1" or a specific date)
    "focus" (string, the main subject or theme for the day)
    "tasks" (array of 3 specific, actionable strings, e.g., ["Read Chapter 4", "Do 10 practice problems"])`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText).plan;
  } catch (error) {
    console.error("Planner API Error Details:", error);
    if (error.message?.includes("API key not valid")) {
      console.error("CRITICAL: Your Gemini API key is invalid!");
    } else if (error.message?.includes("quota")) {
      console.error("CRITICAL: You have exceeded your API quota!");
    }
    return null;
  }
}

export async function evaluateFeynman(topic, explanation) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `You are an expert professor grading a student who is using the Feynman Technique. 
    The student is trying to explain the topic: "${topic}".
    Here is their explanation: "${explanation}"
    
    Evaluate their explanation. Return a JSON object with exactly these keys:
    "score" (a number from 0 to 100 representing their mastery of the concept)
    "feedback" (a short, encouraging paragraph summarizing how they did and what tone they used)
    "gaps" (an array of 1 to 3 short strings. Point out specific logical flaws, missing core concepts, or jargon they used without explaining it. If their explanation is 100% perfect, return an empty array [])`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Feynman API Error:", error);
    return null;
  }
}

export async function sparWithAI(topic, userArgument) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `You are a ruthless, highly intellectual Devil's Advocate. 
    The debate topic is: "${topic}".
    The user's argument: "${userArgument}"
    
    Analyze their argument. Find the logical flaws, counter it aggressively but professionally, and score the strength of their logic.
    Return a JSON object with exactly these keys:
    "rebuttal" (string, your counter-argument, maximum 3 sentences. Be sharp and persuasive.)
    "logicScore" (number between -15 and 15. Negative means their logic was flawed and you pushed them back. Positive means their argument was strong and they gained ground. 0 is a tie.)`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Debate API Error:", error);
    return null;
  }
}



export async function getInterviewQuestion(topic) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `You are a strict, senior technical interviewer at a top-tier tech company. 
    Generate one challenging, highly specific technical interview question about: "${topic}". 
    Return a JSON object with exactly one key: "question" (string).`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText).question;
  } catch (error) {
    console.error("Interview API Error:", error);
    return "Network error. Explain the difference between a Mutex and a Semaphore.";
  }
}

export async function evaluateInterviewAnswer(question, answer) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `You are a strict technical interviewer. 
    You asked this question: "${question}". 
    The candidate provided this answer: "${answer || "[Blank - Time ran out]"}". 
    
    Evaluate their answer. Return a JSON object with exactly these keys:
    "score" (number from 0 to 100 based on technical accuracy)
    "feedback" (string, max 2 sentences. Be blunt, professional, and point out exactly what they missed.)
    "hired" (boolean, true if score is 75 or higher, false otherwise)`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Evaluation API Error:", error);
    return null;
  }
}

export async function analyzeMoodTheme(moodText) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `A user has described their emotional state: "${moodText}".
    
    Design a premium, cinematic, Awwwards-style immersive experience to regulate their mood.
    Return a JSON object with exactly these keys:
    "imageKeyword": (string, ONE highly specific keyword for Unsplash to fetch a cinematic background. e.g., "ethereal-landscape", "dark-ocean", "misty-forest", "calm-desert-dune", "abstract-liquid")
    "overlayColor": (string, a CSS rgba color to tint the image for readability. e.g., "rgba(0,0,0,0.6)" for dark/moody, "rgba(255,255,255,0.3)" for ethereal/light)
    "textColor": (string, either "text-white" or "text-slate-900")
    "heading": (string, a 2-3 word poetic, editorial heading. e.g., "Find Stillness", "Release Tension", "Embrace Focus")
    "activity": (string, MUST BE exactly one of: "smash", "breathe", "pop", "ripple", "burn". EXTREMELY IMPORTANT: Ensure variety! Choose "smash" if angry/aggressive. Choose "burn" if carrying heavy thoughts/regrets. Choose "pop" if distracted/hyper. Choose "ripple" if sad/lonely/numb. Choose "breathe" ONLY if anxious/panicking.)`;

    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Mood Theme API Error:", error);
    return { imageKeyword: 'minimalist-nature', overlayColor: 'rgba(0,0,0,0.5)', textColor: 'text-white', heading: 'Breathe Deeply', activity: 'breathe' };
  }
}