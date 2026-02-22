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

app = FastAPI(title="Web Builder Backend")

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
    userMessage: str
    currentElements: List[Any]
    preferredModel: Optional[str] = "gemini"
    apiKey: Optional[str] = None

@app.get("/")
async def root():
    return {
        "status": "online", 
        "engine": "Web Builder",
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
    Enhanced with robust JSON parsing and sophisticated system instructions.
    """
    try:
        # Use key from request if provided (client-side override), else env var
        api_key = request.apiKey if request.apiKey and request.apiKey.strip() else GEMINI_API_KEY
        
        if not api_key:
            raise HTTPException(
                status_code=400, 
                detail="API Key missing. Please provide it in the input or set GEMINI_API_KEY in the environment."
            )

        # Re-configure for this request
        genai.configure(api_key=api_key)
        
        system_instruction = """
        You are 'Web Builder AI', an elite web design agent.
        Your goal is to transform user requests into high-quality, modern, and responsive website structures.
        
        DESIGN PRINCIPLES:
        - Modern Glassmorphism: Use translucency, blur, and thin borders.
        - Typography: Use bold, varying font sizes for hierarchy.
        - Spacing: Ample padding and margins (systematic).
        - Interaction: Buttons should look clickable (rounded-xl, transition).
        
        TECHNICAL RULES:
        1. Output ONLY valid JSON. No markdown backticks.
        2. 'style' properties must use camelCase (e.g., 'backgroundColor').
        3. Use 'classes' for Tailwind utility classes (e.g., ['flex', 'items-center', 'justify-between']).
        4. When 'ADD_ELEMENT' is used, provide a unique 'id' if not provided by user context.
        5. Support multiple actions in one response if the user request is complex.
        """

        model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            system_instruction=system_instruction
        )
        
        # Enhanced prompt with schema details
        prompt = f"""
        USER_REQUEST: "{request.userMessage}"
        
        CURRENT_STATE: {request.currentElements}
        
        SCHEMA:
        {{
            "text": "Brief explanation of changes",
            "actions": [
                {{
                    "type": "ADD_ELEMENT | SET_ELEMENTS | UPDATE_ELEMENT | CLEAR_CANVAS",
                    "payload": {{
                        "tag": "nav|header|main|section|footer|div|h1|h2|p|button|img",
                        "style": {{ "fontSize": "...", "color": "...", ... }},
                        "classes": [...],
                        "content": "...",
                        "id": "optional-id",
                        "updates": {{ ... }} // Only for UPDATE_ELEMENT
                    }}
                }}
            ]
        }}
        
        Focus on creating a cohesive design. If the user says 'build a portfolio', use multiple ADD_ELEMENT actions for different sections.
        """
        
        # Generation config to encourage JSON
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 2048,
            "response_mime_type": "application/json",
        }

        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )
        
        text_response = response.text.strip()
        
        # Robust Cleanup for JSON parsing
        try:
            return json.loads(text_response)
        except json.JSONDecodeError:
            # Fallback parsing in case it still included markdown
            import re
            json_match = re.search(r'\{.*\}', text_response, re.DOTALL)
            if json_match:
                try:
                    return json.loads(json_match.group())
                except:
                    pass
            
            logger.error(f"Failed to parse AI response: {text_response}")
            return {{
                "text": "I encountered a formatting issue. Please try again with a simpler request.",
                "actions": []
            }}

    except Exception as e:
        logger.error(f"Error in process_request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        logger.error(f"Error processing AI request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Use PORT from environment variable or default to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
