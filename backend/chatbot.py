# chatbot.py
import os
import warnings
from pathlib import Path
from pprint import pprint
from dotenv import load_dotenv
from flask import current_app
import urllib

from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import OpenAIEmbeddings

import firebase_admin
from firebase_admin import credentials, storage
from firebase_admin import storage as fb_storage
from datetime import datetime, timedelta
import io
from PyPDF2 import PdfReader

# cred = credentials.Certificate('key.json')
# firebase_admin.initialize_app(cred, {'storageBucket': 'chatbot-1000.appspot.com'})

warnings.filterwarnings("ignore")
load_dotenv()

def initialize_chatbot():
    model = ChatOpenAI(
        model_name="gpt-3.5-turbo-1106",
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        temperature=0,
        streaming=True
    )
    
    documents = []
    bucket = fb_storage.bucket()
    folder_prefix = "documents/"
    
    for file in bucket.list_blobs(prefix=folder_prefix):
        if file.name.endswith('.pdf'):
            try:
                expiration = datetime.now() + timedelta(hours=1)
                download_url = file.generate_signed_url(expiration=int(expiration.timestamp()))
                response = urllib.request.urlopen(download_url)
                pdf_file = io.BytesIO(response.read())
                pdf_reader = PdfReader(pdf_file)
                num_pages = len(pdf_reader.pages)
                for page in range(num_pages):
                    page_content = pdf_reader.pages[page].extract_text()
                    documents.append(page_content)
            except Exception as e:
                print(f"Error loading PDF file {file.name}: {str(e)}")

    if not documents:
        raise ValueError("No valid PDF documents found.")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=0)
    context = "\n\n".join(str(page_content) for page_content in documents)
    texts = text_splitter.split_text(context)

    embeddings = OpenAIEmbeddings()

    vector_index = Chroma.from_texts(texts, embeddings).as_retriever()

    prompt_template = """Answer the question as precise as possible using the provided context. If the answer is
                        not contained in the context, say "answer not available in context" \n\n
                        Context: \n {context}?\n
                        Question: \n {question} \n
                        Answer:
                      """

    prompt = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    stuff_chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return vector_index, stuff_chain

def get_stuff_answer(vector_index, stuff_chain, question):
    try:
        docs = vector_index.get_relevant_documents(question)
        stuff_answer = stuff_chain({"input_documents": docs, "question": question}, return_only_outputs=True)
        pprint(stuff_answer)
        return stuff_answer
    except Exception as e:
        return f"An error occurred: {str(e)}"

