from flask import Flask, request, render_template, redirect, url_for
import numpy as np
import cv2
import os
from rules import heart_attack_indicator
from main import results

app = Flask(__name__)

# List of allowed image extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    """Check if the uploaded file has an allowed image extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_ecg_image(image_path):
    """Basic heuristic to check if the image resembles an ECG graph."""
    # Load the image
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    # Detect edges in the image (ECG graphs typically have high contrast waveforms)
    edges = cv2.Canny(img, 50, 150)

    # Find contours, assuming ECG waves will show continuous contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Heuristic: if there are many long contours, it's likely an ECG image
    long_contours = [cnt for cnt in contours if cv2.arcLength(cnt, True) > 100]  # Adjust threshold as needed

    # For a simple check, if we find more than a certain number of long contours, assume it's ECG-like
    return len(long_contours) > 10  # Adjust this threshold based on testing

# def calculate_bpm(image_path):
#     # Load the image
#     img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

#     # Preprocess the image (threshold, blur, etc.)
#     _, thresh = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY_INV)
    
#     # Find contours which might correspond to beats
#     contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#     # #print(contours)

#     # Get the x-coordinates of the detected beat markers
#     beat_positions = []
#     for cnt in contours:
#         # Calculate the centroid of each contour
#         M = cv2.moments(cnt)
#         if M['m00'] != 0:
#             cx = int(M['m10'] / M['m00'])  # X-coordinate of the centroid
#             beat_positions.append(cx)

#     # Sort the beat positions by x-coordinate (time axis)
#     beat_positions.sort()

#     # Calculate time intervals between beats (assuming uniform time scale on the x-axis)
#     time_intervals = np.diff(beat_positions)

#     if len(time_intervals) == 0:
#         #print("No beats detected")
#         return 0

#     # Calculate average time interval
#     avg_interval = np.mean(time_intervals)

#     # Assuming the image represents one second of music/data, calculate BPM
#     bpm = (60 / avg_interval) * len(time_intervals)

#     return bpm

@app.route('/')
def base():
    return render_template('base.html')

@app.route('/home',methods=['GET','POST'])
def home():
    return render_template('homepage.html')

@app.route('/result', methods=['POST'])
def result():
    # Check if a file was uploaded
    if 'ecg_file' not in request.files:
        return "No file uploaded", 400
    
    file = request.files['ecg_file']
    # Ensure a valid file is uploaded and has an allowed image extension
    if file.filename == '' or not allowed_file(file.filename):
        return "Invalid file or file type. Please upload a valid image file.", 400

    # Save the uploaded file to a temporary path
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    

    # Check if the image is likely an ECG graph
    if not is_ecg_image(file_path):
        os.remove(file_path)
        return render_template('result.html', bpm="Please upload the correct image")
    
    print("File path: ",file_path)
    # Calculate BPM
    result = results(file_path)
    os.remove(file_path)  # Clean up the temporary file


    if result is None:
        return render_template('result.html', result="Please upload the correct image")
    else:
        return render_template('result.html', result=result)


@app.route('/index',methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/result_rate', methods=['POST'])
def result_rate():
    heart_rate = int(request.form['heart_rate'])
    blood_pressure_sys = int(request.form['blood_pressure_sys'])
    exercise_level = int(request.form['exercise_level'])
    cholesterol = int(request.form['cholesterol'])
    age = int(request.form['age'])
    sex = (request.form['sex'])  # 1 for male, 0 for female
    smoking_status = (request.form['smoking_status'])  # 1 for Yes, 0 for No
    diabetes_status = (request.form['diabetes_status'])  # 1 for Yes, 0 for No
    family_history = (request.form['family_history'])  # 1 for Yes, 0 for No
    weight = float(request.form['weight'])
    height = float(request.form['height'])

    result = heart_attack_indicator(
        heart_rate, blood_pressure_sys, exercise_level, cholesterol, age, sex,
        smoking_status, diabetes_status, family_history, weight, height
    )

    return render_template('result_rate.html', result=result)

if __name__ == "__main__":
    # Create an 'uploads' directory if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    app.run(debug=True)
