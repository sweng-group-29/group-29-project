from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify

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

app = Flask(__name__)

@app.route('/reviews',methods = ['POST', 'GET'])
def ratings():
    if request.method == 'GET':
        reviews = getAllReviews()
        return jsonify(reviews)
    elif request.method == 'POST':    # data = request.json
        llm = request.form.get('llm')         # llm = data.get('llm)
        rating = request.form.get('rating')    # same as above 
        review = request.form.get('review')
        addReview(llm, rating, review)
        return jsonify({'ReviewMessage': 'Review has been added'})


if __name__ == '__main__':
    app.run(debug=True)


