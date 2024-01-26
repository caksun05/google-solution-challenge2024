# chatbot.py
import os
import warnings
from pathlib import Path
from pprint import pprint
from dotenv import load_dotenv
from flask import current_app

from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import OpenAIEmbeddings

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
    pdfs_path = os.path.join(current_app.root_path, 'files')
    
    for file in os.listdir(pdfs_path):
        pdf_path = os.path.join(pdfs_path, file)

        try:
            loader = PyPDFLoader(pdf_path)
            documents.extend(loader.load_and_split())
        except Exception as e:  
            print(f"Error loading PDF file {pdf_path}: {str(e)}")

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
