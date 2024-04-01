from flask import Flask, request, jsonify, send_from_directory
from huggingfaceAPI import queryLLM
from flask_cors import cross_origin, CORS
from mongoDB import getAllReviews, addReview
from werkzeug.exceptions import BadRequest
from dotenv import load_dotenv
import os
from langchainCode import langchain_call

# Get the path to the directory of this file
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, template_folder=os.path.join(basedir, '../frontend'))
CORS(app)
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
        return jsonify(reviews)
    
    elif request.method == 'POST':
        data = request.get_json()
        if data:
            llm = data.get('llm')
            rating = data.get('rating')
            review = data.get('review')
            addReview(llm, rating, review)
            return jsonify({'ReviewMessage': 'Review has been added'})
        else:
            return jsonify({'error': 'No JSON data received'}), 400
    
@app.route('/statistics')
def statistics():
    reviews = getAllReviews() 
    return send_from_directory('../../frontend', 'statistics.html')


if __name__ == '__main__':
    app.run(debug=True)
