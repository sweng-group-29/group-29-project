import json
from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter

# Load environment variables
load_dotenv()

def langchain_call(api_key, model, text_to_summarize):
    try:
        # Initialize the LangChain LLM with the provided API key and model
        llm = ChatOpenAI(openai_api_key=api_key, temperature=0, model_name=model)
        # Split text
        text_splitter = CharacterTextSplitter()
        texts = text_splitter.split_text(text_to_summarize)
        # Create multiple documents
        docs = [Document(page_content=t) for t in texts]
        # Text summarization
        # Load the summarization chain
        chain = load_summarize_chain(llm, chain_type="stuff")
        
        # Execute the chain to summarize the provided text
        summary = chain.run(docs)
        
        # Return the summary in a structured format
        return [{"summary_text": summary}]
    
    except Exception as e:
        # Return an error message in case of an exception
        return {"error": str(e)}

