import { supabase } from "@/integrations/supabase/client";

const SYSTEM_PROMPT = `You are an expert travel planner. Create detailed, organized travel plans. 
Format your response in markdown with the following sections:
- Summary (2-3 sentences)
- Daily Itinerary (day by day breakdown)
- Must-See Attractions
- Local Tips
- Estimated Budget`;

export async function generateTravelPlan(destination: string) {
  try {
    console.log("Generating travel plan for:", destination);
    
    const { data, error } = await supabase.functions.invoke('generate-travel-plan', {
      body: { destination }
    });

    if (error) {
      console.error("Error calling edge function:", error);
      throw error;
    }

    if (!data?.content) {
      throw new Error("No content received from the travel plan generator");
    }

    return data.content;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
}