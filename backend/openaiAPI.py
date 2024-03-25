import openai
from dotenv import load_dotenv
import os
load_dotenv()
# OpenAI API key
api_key = os.getenv("OPENAI_KEY")
openai.api_key = api_key

# Function to read text from a file
def read_text_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# File path from which to read text
file_path = r'C:\Users\padma\InfoManagement2\CitiBankReport.txt'  # Replace with the actual file path

# Read text from file
text_to_summarize = read_text_from_file(file_path)

# Make API request for text summarization using the chat-based endpoint
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",  # Specify a chat-based model suitable for summarization tasks
    messages=[
        {"role": "system", "content": "You: " + text_to_summarize},
    ]
)

# Extract summarized text from the API response
summarized_text = response['choices'][0]['message']['content']

# Print summarized text
print("Summarized text:", summarized_text)
