from flask import Flask, request, jsonify
from huggingfaceAPI import queryLLM
from flask_cors import cross_origin

app = Flask(__name__)

def analyze_llm(llm, prompt):               #not sure what our actual llm analysis code is, wrote llm
    summary = f"Summary from {llm}: {prompt}"
    return summary

@app.route('/prompt', methods=['POST'])
@cross_origin()
def handle_prompt():
    try:
        data = request.get_json() # im assuming the data is json?
        llm = data.get('llm')
        prompt = data.get('prompt')

        if not llm or not prompt:
            raise ValueError("Both 'llm' and 'prompt' are required in the request body.")

        summary = queryLLM(llm, prompt) #performance analysis
        result = {"success": True, "summary": summary}
        return jsonify(result)    #returning the analysis

    except ValueError as ve:     #validation error
        error_message = {"success": False, "error": str(ve)}
        return jsonify(error_message), 400

    except Exception as e:  # other exceptions
        error_message = {"success": False, "error": str(e)}
        return jsonify(error_message), 500

if __name__ == '__main__':
    app.run(debug=True)
