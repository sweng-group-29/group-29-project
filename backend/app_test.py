import json
from unittest.mock import patch

def test_handle_prompt_success(client):
    with patch('app.queryLLM') as mock_queryLLM:
        mock_queryLLM.return_value = "The foundation of chatbots lies in the GPT (Generative Pre-trained Transformer) large language model. These LLMs process natural language inputs and predict subsequent words based on context. Open-source LLMs are gaining traction, allowing developers to create customizable models at a lower cost."
        
        payload = {
            "llm": "facebook/bart-large-cnn",
            "prompt": "When ChatGPT emerged in November 2022, it brought to the forefront the concept that generative artificial intelligence (AI) could revolutionize tasks for both companies and consumers. Whether it’s summarizing lengthy email threads, enhancing resumes with eloquent language, or brainstorming marketing campaigns, LLMs play a pivotal role. The foundation of chatbots like OpenAI’s ChatGPT and Google’s Bard lies in the GPT (Generative Pre-trained Transformer) large language model (LLM). These LLMs process natural language inputs and predict subsequent words based on context. Essentially, they’re next-word prediction engines. Alongside GPT-3 and GPT-4, other popular LLMs include Google’s LaMDA, PaLM LLM (the basis for Bard), Hugging Face’s BLOOM, XLM-RoBERTa, Nvidia’s NeMO LLM, XLNet, Co:here, and GLM-130B. Open-source LLMs are gaining traction, allowing developers to create customizable models at a lower cost. Meta’s LLaMA (Large Language Model Meta AI), launched in February, has sparked a surge of interest among developers. These LLMs, trained on vast datasets including articles, Wikipedia entries, and internet resources, generate human-like responses to natural language queries. However, vendors are now customizing LLMs for specific use cases, reducing their reliance on massive data sets. For instance, Google’s new PaLM 2 LLM uses nearly five times more training data than its predecessor, enabling advanced coding, math, and creative writing tasks. Training such LLMs demands substantial compute power, but their potential applications are vast"
        }
        
        response = client.post('/prompt', data=json.dumps(payload), content_type='application/json')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['success'] is True
        assert "GPT (Generative Pre-trained Transformer)" in data['summary']

def test_handle_prompt_missing_fields(client):
    payload = {}
    
    response = client.post('/prompt', data=json.dumps(payload), content_type='application/json')
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['success'] is False
    assert "Both 'llm' and 'prompt' are required in the request body" in data['error']
