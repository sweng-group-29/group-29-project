import requests
ENDPOINT = "https://api-inference.huggingface.co/models/"
API_KEY = "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"
headers = {"Authorization": f"Bearer {API_KEY}"}

def queryLLM(llm, textPrompt):
    url = ENDPOINT + llm
    llmResponse = requests.post(url, headers=headers, 
                                json = {"inputs" : textPrompt,
                                        "options" : {"wait_for_model":True}})
    return llmResponse.json()