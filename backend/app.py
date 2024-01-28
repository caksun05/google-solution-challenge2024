import pprint
from flask import Flask, request, jsonify, redirect
from flask_bcrypt import Bcrypt
from flask_uploads import UploadSet, configure_uploads, DATA
from flask_restful import Api, Resource
from google.cloud import firestore
import firebase_admin
from firebase_admin import credentials, storage
from firebase_admin import storage as fb_storage
from datetime import datetime
from chatbot import get_stuff_answer, initialize_chatbot
import os
from datetime import datetime

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "key.json"
cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred, {'storageBucket': 'chatbot-1000.appspot.com'})

# Flask application
app = Flask(__name__)
db = firestore.Client()

# Routes    
vector_index, stuff_chain = initialize_chatbot()
@app.route('/chatbot', methods=['GET'])
def chatbot():
    time_start = datetime.now()
    question = request.args.get('question')
    
    if not question:
        return jsonify({'error': 'Please provide a valid \'question\' parameter in the request.'}), 400

    try:
        stuff_answer = get_stuff_answer(vector_index, stuff_chain, question)
        time_stop = datetime.now()
        response_time = (time_stop - time_start).total_seconds()

        history = {
        'question': question,
        'answer': stuff_answer['output_text'],
        'timestamp': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
        'response_time': response_time
         }

        db.collection('chatHistory').add(history)
        return jsonify(stuff_answer), 200
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/report', methods=['POST'])
def report():
    email = request.form['email']
    question = request.form['question']
    timestamp = request.form['timestamp']
    report = {
        'email': email,
        'question': question,
        'timestamp': timestamp
    }   
    db.collection('report').add(report)
    return jsonify(report), 200

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

            # Simpan file ke Firebase Storage
            bucket = fb_storage.bucket()
            blob = bucket.blob(f'documents/{filename}.pdf')
            blob.upload_from_file(pdf)
            pdf_path = f'https://firebasestorage.googleapis.com/v0/b/chatbot-1000.appspot.com/o/documents%2F{filename}.pdf?alt=media'

            pdf_size = bucket.get_blob(f'documents/{filename}.pdf').size
            timestamp = datetime.now().strftime('%d-%m-%Y')
            
            if pdf_size < 1000:
                pdf_size = str(round(pdf_size, 2)) + ' B'
            elif pdf_size < 1000000:
                pdf_size = str(round(pdf_size / 1000, 2)) + ' KB'
            else:
                pdf_size = str(round(pdf_size / 1000000, 2)) + ' MB'

            metadata = {
                'pdf_path': pdf_path,
                'filename': filename,
                'description': description,
                'pdf_size': pdf_size,
                'timestamp': timestamp}
            db.collection('metadata').add(metadata)
            return redirect('http://localhost:5173/data-management')
            # return jsonify(metadata)
        return jsonify({'error': 'No PDF file provided!'})

api.add_resource(PDFUpload, '/api/upload/pdf')

# Run the Flask application in debug mode
if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)