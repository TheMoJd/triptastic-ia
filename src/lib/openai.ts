import { toast } from "@/components/ui/use-toast";

const SYSTEM_PROMPT = `You are an expert travel planner. Create detailed, organized travel plans. 
Format your response in markdown with the following sections:
- Summary (2-3 sentences)
- Daily Itinerary (day by day breakdown)
- Must-See Attractions
- Local Tips
- Estimated Budget`;

export async function generateTravelPlan(destination: string) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  console.log("Generating travel plan for:", destination);
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Create a 3-day travel plan for ${destination}. Include specific places, timing, and practical tips.` }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
}