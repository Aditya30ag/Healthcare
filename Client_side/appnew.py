from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import re

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load BioGPT model and tokenizer
model_name = "microsoft/BioGPT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define request model
class ChatRequest(BaseModel):
    query: str

# Define enhanced medical prompt templates
def get_medical_prompt(query):
    query_lower = query.lower()

    # Pain and Symptom-related inquiries
    if any(term in query_lower for term in ["pain", "ache", "hurt", "sore", "discomfort", "stiffness", "swelling", "burning"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient is experiencing pain or discomfort and seeks guidance.
- Important to assess the location, severity, and duration of pain.
- Consider common causes: injury, inflammation, infection, or nerve-related issues.
- Identify associated symptoms (e.g., swelling, fever, redness).
- Recognize when urgent medical attention is needed.

Diagnosis & Recommendations:
- Outline common causes and related symptoms.
- Suggest basic pain relief strategies (if applicable).
- Provide guidelines on when to consult a doctor.

Medical response:
"""

    # Medication-related inquiries
    elif any(term in query_lower for term in ["medication", "medicine", "drug", "pill", "dose", "side effects", "prescription"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient is inquiring about a medication or drug.
- Key considerations: purpose, dosage, side effects, interactions, contraindications.
- Importance of following medical prescriptions.
- When to seek professional advice before using any medication.

Pharmacological Information:
- Provide an overview of the drug’s function.
- List safety precautions and common side effects.
- Advise on proper usage and when to consult a doctor.

Medical response:
"""

    # Disease or Condition-related inquiries
    elif any(term in query_lower for term in ["disease", "condition", "disorder", "syndrome", "infection", "illness", "diagnosis"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient is seeking information about a disease or medical condition.
- Important to describe symptoms, causes, risk factors, and treatment options.
- When medical attention is necessary.

Key Medical Insights:
- Explain the condition in an easy-to-understand manner.
- Provide evidence-based treatment approaches.
- Offer preventive measures if applicable.
- Recommend seeking a healthcare provider when necessary.

Medical response:
"""

    # Health, Nutrition, and Lifestyle inquiries
    elif any(term in query_lower for term in ["healthy", "wellness", "prevent", "nutrition", "exercise", "diet", "hydration", "fitness", "lifestyle"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient is interested in health, fitness, or nutrition.
- Essential topics: balanced diet, exercise, preventive health measures.
- Address mental and physical wellness together.

Health Optimization Guidelines:
- Provide evidence-based lifestyle tips.
- Suggest practical steps for better health.
- Emphasize moderation and consistency.
- Encourage professional consultation for personalized advice.

Medical response:
"""

    # Emergency and First Aid-related inquiries
    elif any(term in query_lower for term in ["first aid", "emergency", "burn", "fracture", "choking", "CPR", "unconscious", "bleeding", "poisoning"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient seeks guidance on first aid or emergency care.
- Important to determine the severity of the situation.
- Immediate actions can prevent worsening.
- When to call emergency services.

Emergency Care Protocol:
- Provide step-by-step first aid instructions.
- Highlight urgent warning signs.
- Advise on when to seek immediate medical attention.

Medical response:
"""

    # Pregnancy and Reproductive Health inquiries
    elif any(term in query_lower for term in ["pregnancy", "fertility", "contraception", "birth control", "prenatal", "menstruation", "menopause", "reproductive"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient is asking about reproductive health or pregnancy.
- Topics include contraception, prenatal care, menstrual health, and fertility.
- When to seek medical supervision.

Reproductive Health Advice:
- Explain key concepts in an accessible manner.
- Offer general health recommendations.
- Clarify when professional consultation is needed.

Medical response:
"""

    # Mental Health and Psychological Well-being inquiries
    elif any(term in query_lower for term in ["stress", "anxiety", "depression", "mental health", "panic", "therapy", "psychology", "counseling", "insomnia", "PTSD"]):
        return f"""
Patient inquiry: {query}

Medical context:
- The patient is concerned about mental health.
- Important to recognize symptoms, triggers, and coping strategies.
- When professional therapy or medication is required.

Mental Health Guidelines:
- Offer stress management and coping techniques.
- Provide information on therapy and medical treatment options.
- Encourage seeking professional help if symptoms persist.

Medical response:
"""

    # Default medical response template
    else:
        return f"""
Patient inquiry: {query}

Medical context:
- The patient has a general medical question.
- Provide a factual, medically sound response.
- Encourage consultation with healthcare professionals when necessary.

General Medical Advice:
- Deliver a clear and useful response.
- Encourage evidence-based medical practices.
- Recommend when professional care is required.

Medical response:
"""

# API Endpoint: Medical Chatbot
@app.post("/chat/")
async def chat(request: ChatRequest):
    # Generate appropriate medical prompt
    prompt = get_medical_prompt(request.query)
    
    # Encode prompt for model input
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    
    # Generate response from BioGPT with optimized parameters
    output = model.generate(
        input_ids, 
        max_length=300,  # Allow longer responses
        min_length=100,   # Avoid overly short answers
        num_beams=5,      # Improve response quality with beam search
        no_repeat_ngram_size=2,
        early_stopping=True,
        temperature=0.7   # Balance randomness and coherence
    )
    
    # Decode model output
    full_response = tokenizer.decode(output[0], skip_special_tokens=True)
    
    # Extract the answer part after "Medical response:"
    if "Medical response:" in full_response:
        response = full_response.split("Medical response:")[1].strip()
    else:
        response = re.sub(r'^.*?(?:Patient (?:describes|inquiry)|Medical context).*?\n\n', '', full_response, flags=re.DOTALL)

    # Append disclaimer
    response += "\n\n**Note:** This response is for informational purposes only and should not replace professional medical advice."

    return {"response": response}

# Run the API server
# Run this command in terminal: uvicorn filename:app --reload
