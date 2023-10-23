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


if __name__ == '__main__': 
  
    app.run(debug = True) 