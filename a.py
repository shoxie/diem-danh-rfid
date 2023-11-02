import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import signal
import sys
import time
from LCD import LCD  # Make sure the LCD module is properly imported
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Firebase Admin SDK using the configuration object
cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "garden-39e7b",
  "private_key_id": "a5beae9893350f3b9cc7499cafa00d962c5594a9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD1JXqLIilIbOMC\nkjgjb8PdO9bvYS2j0q9yBRJZN8lYa4xpXutgdk4CRotB/xPGqxkPe0RcvRh1GVit\ngHl67EA2i3sZzsdo1YGBTBu1uS5Y4ccJKd5hC3flUNwdyDwKTeq2Q9vFcnQG+WNH\nzku+n7pzfvRHbm91U5LvqewkQPYimTdhehofW7GfMhNedR0PzcLQMJs4aFtbGSvA\nnd50kCnkV3tvNRSBTbLYgCgvyQDYIxU6v7Gu4TZpXTATPC0XwHgD+RERJu/fsZb5\nYZmjBma6RED+k0XP4xCcrfrRPtMwfN5O4o+7IawGm/ZI4SnUN7c+182CyPBDP1ff\nm77OZ55dAgMBAAECggEAAh77GT31ZPOzhZZR/QYmNR9+GH3TfVpIgzQQ6ZrCowFq\ngQfyW9Cf30eUcWZanXqD6G8PNxhurz1kDGi4tyzvlLSHHxshOW+2w7F6B8gn4vFH\nBxQfRsMG2JEbzI7BZQ4EaQHULc7zyfwC7b5iC8zLspF5XYj4R9jMab9QiRyWqFr1\nrW+wZLkroP7foy4rPLl55znMvGvLOYkdJPKwknECoQps2fi9gEtFJfMuzJo7X6/1\nrqYG7w64c13hqLxv5pA8dmytqv9qdWA4DV2qlnT+ZvwvwpVxdQKLbiOxQ6jO2QG5\njq/Anii0I79Rbmx5bAklHP88mnnq7cQgM6gDANWSwwKBgQD7rhZqn7W2Qknu5S3g\nVm2tA5jfQe2o6Qr9LnpK7hbfdNMFTWqPqxdyayFWN45jcYHN28j/NvfpyogNWMt1\n5TrNlo1GkpDGhNDLlF+3h4weNQZWuodTKKwmxqvG0SnfO1zmtkhrPqMMI8FyZ8i/\nzIDvpRjZDm8S1DL2gIUG9t3hswKBgQD5Wq57TL+z+zpDp4JZ8g8HBZKqbZ2UrAlj\nAc7cxxqYWGNToJ1HAktTEGqGlykwzeg+9N2F/IW7YOWW7iFyS0BuoJYst5gRH1lp\nLG8zfWk+bMg/gzOKLyyfdWP6UXKXVEzmX7Ih7HYmlLAMg5245qxDGEDeP9MCc5QM\nzgrGYp/XrwKBgCiC1B7jiEdHEkl+4EyM/OhtfMzq+stGf7tTIOIwwsPDNThURsPL\nYWHMdrg/Bw9gtOki6I6UFYGvVQj48v8OH9H52tGyQ9WAiW9LecC788Tk+hk5uxCa\nqmMvdXTyNBA3qPOGAdApa+tHUhsNM5YT3+kzJPXDSgO43l8pPsBpOjvbAoGABmNj\nWvdRZfwGtxsAhOtlpSloY4NhaSCrMOUn9pIHRWXmTYss3FfbtCoUgJQ40u5Dh/Fg\nB4G7r1xBJYe+RZ5V7T+h+U1O0Ql7ke04gBozaw0AaFglJuIkg4VPZWdWxze6rKBB\nAQt8z2o5xGhOzyDhwupJJyh9cG+jmFxi/EgkjjMCgYAzDfzb0Rd9nOJBdMtPKHht\nAn6Di9EPllN2tTzHxEQ4JVUSZ39U5ZHOiVThXRnQ32NSh6ex033/XRk8kEqdDp7n\nkn7UgcUT9q2NzFBdGxLyAndu54QUudhw/eci8IWLrA7CvikSCReF6Bi7qtUfxk0g\nmAxJDBACcgBPhIgstmVhaQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-pgwtk@garden-39e7b.iam.gserviceaccount.com",
  "client_id": "104896805815467553909",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pgwtk%40garden-39e7b.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
})

firebase_admin.initialize_app(cred)

db = firestore.client()

reader = SimpleMFRC522()
is_reading = True

GPIO.setwarnings(False)

# Initialize the LCD
lcd = LCD()

# Capture SIGINT for cleanup
def end_read(signal, frame):
    global is_reading
    print('Ctrl+C captured, exiting')
    is_reading = False
    lcd.clear()  # Clear the LCD before exiting
    sys.exit()

# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

while is_reading:
    try:
        id, text = reader.read()
        print(f'ID :: {id}')
        print(f'Badge Number :: {text}')

        # Display the RFID ID on the LCD
        lcd.message(f'RFID ID: {id}', 1)

        # Check if the RFID ID already exists in Firebase
        id_exists = False
        existing_docs = db.collection('rfid_ids').where('id', '==', id).stream()
        for doc in existing_docs:
            id_exists = True
            doc_data = doc.to_dict()
            name = doc_data.get('name', '')  # Get the name from Firebase

        if id_exists:
            # Print the Diem danh line
            lcd.message(f'Diem danh {id}', 1)
            # Print the name if available
            lcd.message(name, 2)
            diem_danh_ref = db.collection('diem-danh').document(id)
            diem_danh_ref.set(doc_data)
            print(f'RFID ID {id} added to diem-danh.')
        else:
            # Push the RFID ID and name to Firebase
            doc_ref = db.collection('rfid_ids').document()
            doc_ref.set({'id': id, 'text': text, 'name': "", 'timestamp': time.time()})
            print(f'RFID ID {id} added to Firebase.')

        # Wait for a few seconds (you can adjust this duration)
        time.sleep(5)

        # Clear the LCD display
        lcd.clear()
    finally:
        GPIO.cleanup()