from google import genai
import os
from application.prompt import TRIP_PLAN_PROMPT
from flask import jsonify
import json
import re


def generate_trip_plan(source, destination, preferences):
    prompt = TRIP_PLAN_PROMPT.format(source=source, destination=destination, preferences=preferences)
    # prompt = f"""
    # You are a smart travel planner.

    # Please plan a detailed trip from **{source}** to **{destination}** based on the user's preferences: **{preferences}**.

    # Include the following sections clearly:

    # 1. **Trip Duration** — Total number of days and nights.
    # 2. **Daily Itinerary** — For each day, include:
    # - Day number and location
    # - Activities and timings
    # - Notes or travel tips for the day

    # 3. **Hotel Recommendations** — List 2-3 hotels for each city or stop:
    # - Name
    # - Price range (budget/mid-range/premium)
    # - Location
    # - One-line description or highlight
    # - Website or contact (if available)

    # 4. **Top Food Places / Local Cuisine** — Suggest 3-5 must-visit eateries or food spots:
    # - Name
    # - Type of cuisine or specialty
    # - Price level (cheap, moderate, expensive)
    # - Location or neighborhood
    # - Website or contact (if available)

    # 5. **Places to Visit** — Attractions, nature spots, or cultural landmarks

    # 6. **Estimated Cost Breakdown** — Travel, accommodation, food, activities, etc.

    # 7. **General Travel Tips**

    # Please structure your response as **well-formatted JSON** using the following structure:
    # ```json
    # {{
    # "duration": "",
    # "itinerary": [],
    # "hotels": [],
    # "food_places": [],
    # "places_to_visit": [],
    # "cost_estimate": {{}},
    # "tips": []
    # }}
    # Don't include any commentary or explanation — only return the JSON.
    # """
   
    client = genai.Client(api_key="AIzaSyATaBi2tijoxj6OLtDSdxQgWVPQf2TLytg")
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    text = response.text.strip()

    # Clean code block formatting if present
    if text.startswith("```json"):
        text = re.sub(r"^```json\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    # Attempt to parse as JSON
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Return raw text if JSON failed
        return {"raw_text": text, "error": "Failed to parse JSON from Gemini."}

    except Exception as e:
        return {"error": str(e)}

  
  
    
    