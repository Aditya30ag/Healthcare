from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import re

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load BioGPT model
model_name = "microsoft/BioGPT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define request model
class ChatRequest(BaseModel):
    query: str

# Define medical prompt templates based on query keywords
def get_medical_prompt(query):
    query_lower = query.lower()
    
    # Common symptom patterns
    if any(term in query_lower for term in ["pain", "ache", "hurt", "sore"]):
        return f"""
Patient describes: {query}
Medical context: Patient is describing pain symptoms
Diagnostic considerations:
1. Determine location, intensity, duration, and quality of pain
2. Consider common causes based on affected area
3. Note any accompanying symptoms
4. Identify red flags requiring immediate attention

Medical response:
"""
    
    # Medication related
    elif any(term in query_lower for term in ["medication", "medicine", "drug", "pill", "dose"]):
        return f"""
Patient inquiry: {query}
Medical context: Patient has a medication-related question
Important considerations:
1. General medication information and purpose
2. Common side effects and precautions
3. General usage guidelines
4. When to consult a healthcare provider

Medical response:
"""
    
    # Disease or condition specific
    elif any(term in query_lower for term in ["disease", "condition", "disorder", "syndrome", "diagnosis"]):
        return f"""
Patient inquiry: {query}
Medical context: Patient is asking about a medical condition
Key information to provide:
1. General description of the condition
2. Common symptoms and presentation
3. General treatment approaches
4. When medical attention is recommended

Medical response:
"""
    
    # General health and wellness
    elif any(term in query_lower for term in ["healthy", "wellness", "prevent", "nutrition", "exercise", "diet"]):
        return f"""
Patient inquiry: {query}
Medical context: Patient is asking about health and wellness
Key points to address:
1. Evidence-based health recommendations
2. General wellness guidelines
3. Preventive health measures
4. When to seek professional guidance

Medical response:
"""
    
    # Default prompt for other medical queries
    else:
        return f"""
Patient inquiry: {query}
Medical context: General medical question
Response guidelines:
1. Provide accurate medical information
2. Address the specific question
3. Include relevant context
4. Note limitations and when to consult healthcare providers

Medical response:
"""

# API Endpoint: Medical Chatbot
@app.post("/chat/")
async def chat(request: ChatRequest):
    # Get appropriate medical prompt based on query type
    prompt = get_medical_prompt(request.query)
    
    # Encode the properly formatted prompt
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    
    # Generate with better parameters
    output = model.generate(
        input_ids, 
        max_length=250,
        min_length=75,
        num_beams=5,
        no_repeat_ngram_size=2,
        early_stopping=True,
        temperature=0.7
    )
    
    # Decode the response
    full_response = tokenizer.decode(output[0], skip_special_tokens=True)
    
    # Extract only the answer part after "Medical response:"
    if "Medical response:" in full_response:
        response = full_response.split("Medical response:")[1].strip()
    else:
        # Fallback if the expected format isn't found
        response = re.sub(r'^.*?(?:Patient (?:describes|inquiry)|Medical context).*?\n\n', '', full_response, flags=re.DOTALL)
    
    # Add disclaimer
    response += "\n\nNote: This information is for educational purposes only and should not replace professional medical advice."
    
    return {"response": response}

# Run the API server
# Run this in terminal: uvicorn filename:app --reload