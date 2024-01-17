# backend/routes/chatbot.py
import os
import urllib
import warnings
from pathlib import Path as p
from pprint import pprint
from dotenv import load_dotenv

import pandas as pd
from langchain import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings

warnings.filterwarnings("ignore")
load_dotenv()
model = ChatOpenAI(
    model_name="gpt-3.5-turbo-1106", openai_api_key=os.getenv("OPENAI_API_KEY"), temperature=0, streaming=True
)

documents = []
for file in os.listdir('data'):
    pdf_path = './data/' + file
    loader = PyPDFLoader(pdf_path)
    documents.extend(loader.load_and_split())

text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=0)
context = "\n\n".join(str(p.page_content) for p in documents)
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

from flask import Flask, request

<<<<<<< HEAD:backend/routes/chatbot.py
@chatbot_bp.route('/', methods=['GET'])
def render_chatbot():
    return render_template('chatbot.html')

@chatbot_bp.route('/', methods=['POST'])
def answer_question():
    question = request.form.get('question')
=======
app = Flask(__name__)

@app.route('/')
def hello_world():
    question = request.args.get('question')
>>>>>>> 5e5abca1a6831bb38a9681c24a8ad4fe94f35a9f:chatbot.py
    if question is None:
        return "Please provide a 'question' parameter in the request.", 400

    try:
        docs = vector_index.get_relevant_documents(question)
        stuff_answer = stuff_chain({"input_documents": docs, "question": question}, return_only_outputs=True)
        pprint(stuff_answer)
        return jsonify(stuff_answer), 200  # Convert to JSON using jsonify
    except Exception as e:
        return f"An error occurred: {str(e)}", 500


# if __name__ == '__main__':
# 	app.run(host="0.0.0.0")
