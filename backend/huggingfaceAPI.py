import requests
from dotenv import load_dotenv
import os
load_dotenv()
ENDPOINT = "https://api-inference.huggingface.co/models/"
API_KEY = os.getenv("API_KEY")
headers = {"Authorization": f"Bearer {API_KEY}"}

def queryLLM(llm, textPrompt):
    url = ENDPOINT + llm
    responseLength = int(len(textPrompt.split())/4)
    llmResponse = requests.post(url, headers=headers, 
                                json = {"inputs" : textPrompt,
                                        "options" : {"wait_for_model":True},
                                        "parameters" : {"min_length":responseLength, "max_length":responseLength*2}})
    return llmResponse.json()