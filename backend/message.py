import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(auth, receiver, question, content):
  # Set your email credentials
  sender_email = auth['email']
  password = auth['password']
  receiver_email = receiver

  # Create the email content
  subject = "Reply to {}'s question: {}".format(receiver_email, question)
  body = content

  message = MIMEMultipart()
  message["From"] = sender_email
  message["To"] = receiver_email
  message["Subject"] = subject

  message.attach(MIMEText(body, "plain"))

  # Establish a connection to the SMTP server
  with smtplib.SMTP("smtp.gmail.com", 587) as server:
      server.starttls()
      
      # Log in to the email account
      server.login(sender_email, password)
      
      # Send the email
      server.sendmail(sender_email, receiver_email, message.as_string())

  return ("Email sent successfully!")
