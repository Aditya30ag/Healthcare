from transformers import AutoModelForCausalLM, AutoTokenizer

# Load BioGPT model and tokenizer
model_name = "microsoft/BioGPT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def get_medical_response(user_input):
    # Tokenize user input
    input_ids = tokenizer.encode(user_input, return_tensors="pt")

    # Generate AI response
    output = model.generate(input_ids, max_length=150)

    # Decode AI response
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response

# Test the chatbot
user_input = "I have a fever and sore throat. What should I do?"
response = get_medical_response(user_input)
print("AI Response:", response)
