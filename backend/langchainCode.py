from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI

loader = WebBaseLoader("https://en.wikipedia.org/wiki/Financial_statement")
docs = loader.load()

llm = ChatOpenAI(openai_api_key="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", temperature=0, model_name="gpt-3.5-turbo-1106")
chain = load_summarize_chain(llm, chain_type="stuff")

summary = chain.run(docs)

print(summary)