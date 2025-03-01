from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoModelForMaskedLM, AutoTokenizer, pipeline
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

# Use a biomedical model that supports text generation
model_name = "microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract-fulltext"

# Load using the text-generation pipeline for simplicity
try:
    # Try to initialize with fill-mask pipeline (for BERT-based models)
    fill_mask = pipeline(
        "fill-mask",
        model=model_name,
        tokenizer=model_name,
        device=0 if torch.cuda.is_available() else -1
    )
    generation_type = "fill-mask"
    print(f"Using {model_name} with fill-mask pipeline")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print("Falling back to standard BERT model")
    # Fall back to a standard BERT model for fill-mask
    model_name = "bert-base-uncased"
    fill_mask = pipeline(
        "fill-mask",
        model=model_name,
        tokenizer=model_name,
        device=0 if torch.cuda.is_available() else -1
    )
    generation_type = "fill-mask"

# Define request model
class ChatRequest(BaseModel):
    query: str

# Medical knowledge base responses
medical_responses = {
    "pain": """Common causes of pain include inflammation, injury, nerve damage, or underlying health conditions. 

For mild to moderate pain, consider:
- Rest the affected area
- Apply ice for acute injuries (first 48 hours)
- Apply heat for chronic pain and stiffness
- Over-the-counter pain relievers like acetaminophen or ibuprofen
- Gentle stretching exercises

Seek immediate medical attention if:
- Pain is severe or worsening rapidly
- Pain is accompanied by fever, vomiting, or difficulty breathing
- Pain follows an injury, especially with swelling or inability to bear weight
- You experience chest pain or symptoms of stroke

For persistent pain, consult your healthcare provider for proper diagnosis and treatment.""",

    "medication": """When taking medications, always:
- Follow your prescription exactly as directed
- Do not skip doses or double up if you miss a dose
- Be aware of potential side effects and interactions with other medications
- Take with food or water as directed
- Store medications properly, away from heat, moisture, and direct light
- Keep all medications out of reach of children
- Do not share prescription medications
- Dispose of unused medications properly

Consult your doctor or pharmacist if you experience unexpected side effects or have questions about your medication.""",

    "condition": """When managing a medical condition:
- Learn about your diagnosis from reputable sources
- Follow your treatment plan consistently
- Keep all follow-up appointments
- Monitor your symptoms and report changes to your healthcare provider
- Know warning signs that require immediate attention
- Consider joining support groups or seeking counseling
- Maintain a healthy lifestyle with proper nutrition and physical activity as appropriate
- Take medications as prescribed

Remember that early intervention often leads to better outcomes.""",

    "healthy": """For overall health and wellness:
- Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins
- Stay hydrated with plenty of water
- Aim for at least 150 minutes of moderate exercise per week
- Get 7-9 hours of quality sleep each night
- Manage stress through relaxation techniques, mindfulness, or hobbies
- Maintain social connections and relationships
- Avoid smoking and limit alcohol consumption
- Get regular health screenings appropriate for your age and risk factors
- Wash hands frequently to prevent infection
- Practice good posture and ergonomics

Small, consistent changes often lead to significant health improvements over time.""",

    "emergency": """In a medical emergency:
1. Call emergency services (911) immediately for serious situations
2. For bleeding: Apply direct pressure with clean cloth or bandage
3. For burns: Run cool (not cold) water over the area, do not apply ice
4. For choking: Perform the Heimlich maneuver if the person cannot speak or breathe
5. For suspected heart attack: Have the person chew aspirin (if not allergic) while waiting for help
6. For stroke symptoms (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911)
7. For seizures: Move objects away, do not restrain, place something soft under head if possible
8. For poisoning: Call poison control (1-800-222-1222) immediately

Do not move someone with a suspected neck or spine injury unless absolutely necessary.""",

    "pregnancy": """During pregnancy, it's important to:
- Attend all prenatal appointments
- Take prenatal vitamins as recommended
- Eat a nutritious diet and stay well-hydrated
- Avoid alcohol, tobacco, and recreational drugs
- Limit caffeine consumption
- Check with your healthcare provider before taking any medication
- Get appropriate exercise as approved by your healthcare provider
- Get adequate rest and manage stress
- Know the warning signs that require immediate attention

For family planning, discuss options with your healthcare provider to find the method that works best for you.""",

    "mental_health": """For mental health support:
- Establish regular routines for sleep, meals, and physical activity
- Practice stress-management techniques like deep breathing, meditation, or yoga
- Stay connected with supportive friends and family
- Limit exposure to stressful news and social media
- Seek professional help when emotions interfere with daily functioning
- Be aware that treatment may include therapy, medication, or both
- Join support groups to connect with others facing similar challenges
- Remember that mental health conditions are medical conditions that require proper treatment

Crisis resources: National Suicide Prevention Lifeline (1-800-273-8255) or text HOME to 741741 to reach the Crisis Text Line.""",

    "default": """General health recommendations include:
- Establish a relationship with a primary care provider
- Schedule regular preventive care appointments
- Stay up to date on recommended vaccinations
- Maintain a healthy lifestyle with balanced nutrition and regular physical activity
- Get adequate sleep (7-9 hours for most adults)
- Manage stress through healthy coping mechanisms
- Avoid tobacco products and limit alcohol consumption
- Know your family health history
- Be aware of changes in your body and report concerning symptoms
- Follow medical advice for managing any chronic conditions

Remember that early detection and treatment often lead to better health outcomes."""
}

# Define enhanced medical prompt creator
def create_medical_response(query):
    query_lower = query.lower()
    
    # Determine which category the query falls into
    if any(term in query_lower for term in ["pain", "ache", "hurt", "sore", "discomfort", "stiffness", "swelling", "burning"]):
        return medical_responses["pain"]
    elif any(term in query_lower for term in ["medication", "medicine", "drug", "pill", "dose", "side effects", "prescription"]):
        return medical_responses["medication"]
    elif any(term in query_lower for term in ["disease", "condition", "disorder", "syndrome", "infection", "illness", "diagnosis"]):
        return medical_responses["condition"]
    elif any(term in query_lower for term in ["healthy", "wellness", "prevent", "nutrition", "exercise", "diet", "hydration", "fitness", "lifestyle"]):
        return medical_responses["healthy"]
    elif any(term in query_lower for term in ["first aid", "emergency", "burn", "fracture", "choking", "CPR", "unconscious", "bleeding", "poisoning"]):
        return medical_responses["emergency"]
    elif any(term in query_lower for term in ["pregnancy", "fertility", "contraception", "birth control", "prenatal", "menstruation", "menopause", "reproductive"]):
        return medical_responses["pregnancy"]
    elif any(term in query_lower for term in ["stress", "anxiety", "depression", "mental health", "panic", "therapy", "psychology", "counseling", "insomnia", "PTSD"]):
        return medical_responses["mental_health"]
    else:
        return medical_responses["default"]

# API Endpoint: Medical Chatbot
@app.post("/chat/")
async def chat(request: ChatRequest):
    try:
        # Instead of relying on complex model generation, use predefined responses
        # with some customization based on query keywords
        response = create_medical_response(request.query)
        
        
        # Append disclaimer
        response += "\n\n**Note:** This response is for informational purposes only and should not replace professional medical advice."
        
        return {"response": response}
    
    except Exception as e:
        # Provide fallback response in case of any errors
        return {
            "response": f"I apologize, but I'm having trouble processing your medical question. Please try asking a more specific question about symptoms, medications, or health concerns.\n\n**Note:** This response is for informational purposes only and should not replace professional medical advice."
        }

# Add a simple health check endpoint
@app.get("/health/")
async def health_check():
    return {"status": "ok", "model": model_name}

# Run the API server
# Run this command in terminal: uvicorn appnew:app --reload