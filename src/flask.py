from flask import Flask, jsonify, request 
from flask_cors import CORS

app = Flask(__name__) 
CORS(app,resources={r"/api/*":{"origins":"*"}})
  
# on the terminal type: curl http://127.0.0.1:5000/ 

@app.route('/', methods = ['GET', 'POST']) 
def post_data(): 
    if(request.method == 'GET'): 
  
        data = "hello world"
        return jsonify({'data': data}) 
    
    if(request.method =='POST'):
        message = request.form.get("message")
        res = final_result(message)
        message = res["result"]
        return jsonify(message)
    
from flask import Flask, render_template, request, jsonify, send_file
from model import generate_response  # Import your model interaction function
import pdfkit  # You may need to install this library

app = Flask(__name__)

answers_data = []  # Store answers, queries, and timestamps

# Define a route for the home page


# Define an API endpoint for handling queries
@app.route('/GLP', methods=['POST'])
def query():
    if request.method == 'POST':
        if 'file' in request.files:
            # Handle file upload
            uploaded_file = request.files['file']
            # Process the PDF file and generate a response
            file_text = process_pdf(uploaded_file)
            model_response = generate_response(file_text)
        else:
            # Handle text query
            user_query = request.form['query']
            model_response = generate_response(user_query)
        
        # Store the answer, query, and timestamp
        answers_data.append({'query': user_query, 'answer': model_response, 'timestamp': get_current_timestamp()})

        return jsonify({'response': model_response})

# Define a route to generate and download the PDF report
@app.route('/download_report')
def download_report():
    # Generate the PDF report using answers_data
    pdf_report = generate_pdf_report(answers_data)
    return send_file(pdf_report, as_attachment=True, download_name='llm_report.pdf')


if __name__ == '__main__': 
  
    app.run(debug = True) 