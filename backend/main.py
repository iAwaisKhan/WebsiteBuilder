import os
import logging
import time
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CLOWN Website Builder Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    logger.warning("GEMINI_API_KEY not found in environment variables")

class AIRequest(BaseModel):
    userMessage: string
    currentElements: List[Any]
    preferredModel: Optional[str] = "gemini"
    apiKey: Optional[str] = None

@app.get("/")
async def root():
    return {
        "status": "online", 
        "engine": "CLOWN Website Builder",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": time.time()
    }

@app.post("/process")
async def process_request(request: AIRequest):
    """
    Process a user message using Google Gemini to generate website elements.
    """
    try:
        # Use key from request if provided (client-side override), else env var
        api_key = request.apiKey if request.apiKey and request.apiKey.strip() else GEMINI_API_KEY
        
        if not api_key:
            raise HTTPException(status_code=400, detail="No API Key provided. Please set GEMINI_API_KEY in backend/.env or provide it in the request.")

        # Re-configure if using a different key (not thread safe but okay for this scale)
        if request.apiKey:
            genai.configure(api_key=request.apiKey)
        
        # Construct the prompt
        prompt = f"""
        You are an expert web designer assisting a user in building a website.
        User Request: "{request.userMessage}"
        
        Current Elements: {request.currentElements}
        
        Return a JSON response with the structure: 
        {{
            "text": "Description of what you did",
            "actions": [
                {{ "type": "ADD_ELEMENT", "payload": {{ "tag": "div", "style": {{...}}, "content": "..." }} }}
            ]
        }}
        Only return valid JSON. Do not include markdown naming like ```json.
        """
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        text_response = response.text
        # Cleanup potential markdown
        if text_response.startswith("```json"):
            text_response = text_response[7:]
        if text_response.endswith("```"):
            text_response = text_response[:-3]
            
        return text_response # This relies on the model returning compatible JSON string which the frontend parses?
                             # Or we should parse it here.
                             # Frontend expects { text: string, actions: [] }
                             # Let's try to parse it to ensure validity, or just return raw if frontend handles it.
                             # But typical backend should return JSON object.
                             
        # Let's parse it securely
        import json
        try:
            return json.loads(text_response)
        except json.JSONDecodeError:
             # Fallback
            return {
                "text": text_response,
                "actions": []
            }

    except Exception as e:
        logger.error(f"Error processing AI request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
