import pprint
from flask import Flask, request, jsonify, redirect
from flask_bcrypt import Bcrypt
from flask_uploads import UploadSet, configure_uploads, DATA
from flask_restful import Api, Resource
from google.cloud import firestore
from chatbot import get_stuff_answer, initialize_chatbot
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "key.json"

# Flask application
app = Flask(__name__)
db = firestore.Client()

# Routes
@app.route('/users', methods=['GET'])
def users():
    data = []
    docs = db.collection('users').stream()
    for doc in docs:
        data.append(doc.to_dict())
    return jsonify(data)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username is None or password is None:
        return jsonify({'error': 'Please provide both username and password'}), 400

    docs = db.collection('users').where('username', '==', username).stream()
    for doc in docs:
        user = doc.to_dict()
        if user['password'] == password:
            return jsonify({'message': 'User logged in successfully!'})
        else:
            return jsonify({'error': 'Invalid credentials!'}), 400

    return jsonify({'error': 'User does not exist!'}), 400

@app.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'User logged out successfully!'})

@app.route('/chatbot', methods=['GET'])
def chatbot():
    question = request.args.get('question')
    
    if not question:
        return jsonify({'error': 'Please provide a valid \'question\' parameter in the request.'}), 400

    try:
        vector_index, stuff_chain = initialize_chatbot()
        stuff_answer = get_stuff_answer(vector_index, stuff_chain, question)
        return jsonify(stuff_answer), 200
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
    
# File Uploads API
app.config['UPLOADED_PDFS_DEST'] = 'files'
pdfs = UploadSet('pdfs', ('pdf',))
configure_uploads(app, pdfs)

api = Api(app)

class PDFUpload(Resource):
    def post(self):
        if 'pdf' in request.files:
            filename = request.form['filename']
            description = request.form['description']
            pdf = request.files['pdf']
            pdf_size = len(pdf.read())         
            pdf_path = pdfs.save(pdf)
            
            if pdf_size < 1000:
                pdf_size = str(pdf_size) + ' B'
            elif pdf_size < 1000000:
                pdf_size = str(pdf_size / 1000) + ' KB'
            else:
                pdf_size = str(pdf_size / 1000000) + ' MB'

            metadata = {
                'pdf_path': pdf_path,
                'filename': filename,
                'description': description,
                'pdf_size': pdf_size,}
            db.collection('metadata').add(metadata)
            return redirect('http://localhost:5173/data-management')
        return jsonify({'error': 'No PDF file provided!'})

api.add_resource(PDFUpload, '/api/upload/pdf')

# Run the Flask application in debug mode
if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)