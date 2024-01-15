#backend/routes/admin.py
from flask import Blueprint, request, jsonify, render_template
from flask_uploads import UploadSet, configure_uploads, DATA
from flask_restful import Api, Resource
from app import app

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('', methods=['GET'])
def dashboard():
    return jsonify({'message': 'Admin page!'})

@admin_bp.route('/uploads', methods=['GET'])
def get_uploads():
    return render_template('uploads.html')

@admin_bp.route('/uploads', methods=['POST'])
def upload_file():
    return jsonify({'message': 'Upload Success!'})

# Configure file uploads
app.config['UPLOADED_PDFS_DEST'] = 'uploads/pdf'
pdfs = UploadSet('pdfs', ('pdf',))
configure_uploads(app, pdfs)

api = Api(app)

class PDFUpload(Resource):
    def post(self):
        if 'pdf' in request.files:
            pdf = request.files['pdf']
            pdf_path = pdfs.save(pdf)
            return jsonify({'message': 'File uploaded successfully!', 'pdf_path': pdf_path})
        return jsonify({'error': 'No PDF file provided!'})

api.add_resource(PDFUpload, '/api/upload/pdf')