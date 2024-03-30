from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
USERNAME=os.getenv("MONGODB_USERNAME")
PASSWORD=os.getenv("MONGODB_PASSWORD")

uri = "mongodb+srv://%(username)s:%(password)s@cluster0.iglnqgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" %{
    "username":USERNAME, "password": PASSWORD}

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

database = client["database"]
collection = database["llmReviews"]

# Add new review to database
def addReview(llm, rating, review):
    collection.insert_one({"llm": llm, "rating": rating, "review": review})

# Get a cursor to all reviews in database
def getAllReviews():
    cursor = collection.find()
    reviews = []
    for review in cursor:
        review['_id'] = str(review['_id'])  # Convert ObjectId to string
        reviews.append(review)
    return reviews

if __name__ == "__main__":
    #addReview("ChatGPT", 4, "This AI is great for my financial summarization!")
    for x in getAllReviews():
        print(x)