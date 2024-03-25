from flask import Flask, request, jsonify
from huggingfaceAPI import queryLLM
from flask_cors import cross_origin
from mongoDB import getAllReviews, addReview
from werkzeug.exceptions import BadRequest
from dotenv import load_dotenv
import os
from langchainCode import langchain_call

app = Flask(__name__)
load_dotenv()

def analyze_llm(llm, prompt):               #not sure what our actual llm analysis code is, wrote llm
    summary = f"Summary from {llm}: {prompt}"
    return summary

@app.route('/prompt', methods=['POST'])
@cross_origin()
def handle_prompt():
    if request.content_type != 'application/json':
        return jsonify({"success": False, "error": "Unsupported Media Type"}), 415
    try:
        data = request.get_json() # im assuming the data is json?
        llm = data.get('llm')
        prompt = data.get('prompt')

        if not llm or not prompt:
            raise ValueError("Both 'llm' and 'prompt' are required in the request body.")

        if llm.startswith("gpt"):
            key = os.getenv("OPENAI_KEY")
            summary = langchain_call(key, llm, prompt)  # Use the modified langchain_call for specific LLMs
        else:
            summary = queryLLM(llm, prompt) #performance analysis
        result = {"success": True, "summary": summary}
        return jsonify(result)    #returning the analysis

    except ValueError as ve:     #validation error
        error_message = {"success": False, "error": str(ve)}
        return jsonify(error_message), 400
    
    except BadRequest:
        return jsonify({"success": False, "error": "Invalid JSON"}), 400  # Directly return the error response
    
    except Exception as e:  # other exceptions
        error_message = {"success": False, "error": str(e)}
        return jsonify(error_message), 500
    
@app.route('/reviews',methods = ['POST', 'GET'])
def ratings():
    if request.method == 'GET':
        reviews = getAllReviews()
        return list(reviews)
    
    elif request.method == 'POST':
        llm = request.form.get('llm')
        rating = request.form.get('rating') 
        review = request.form.get('review')
        addReview(llm, rating, review)
        return jsonify({'ReviewMessage': 'Review has been added'})

if __name__ == '__main__':
    app.run(debug=True)
