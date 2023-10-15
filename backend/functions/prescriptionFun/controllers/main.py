import cv2
import numpy as np
import pytesseract
import os

import tkinter as tk
from tkinter import filedialog

import json  # Add the json module for JSON formatting
import requests  # Add requests module for making HTTP requests

# Initialize an empty dictionary to store the extracted data
extracted_data = {}

file_path = "G:/Personal Projects/Mern with Python/backend/controllers/Query.png"
# Create a Tkinter root window (it won't be shown)
# root = tk.Tk()
# root.withdraw()  # Hide the main root window

if not file_path:
    print("No image selected. Exiting...")
    exit(1)


# C:\Program Files\Tesseract-OCR
# path = 'Query.png'
per = 25


# ------------------------------------------------------------
# roi - Region Of Interest
roi = [[(472, 480), (800, 530), 'text', 'First Name'],
       [(1032, 482), (1394, 526), 'text', 'Last Name'],
       [(314, 546), (544, 582), 'text', 'Contact Number'],
       [(804, 550), (1392, 584), 'date', 'Date of Birth'],
       [(148, 146), (824, 234), 'text', 'Doctor Name'],
       [(1168, 226), (1382, 302), 'text', 'Hospital Name'],
       [(1030, 616), (1386, 660), 'date', 'Prescribe Date'],
       [(1032, 692), (1384, 734), 'date', 'Expiry Date'],
       [(516, 954), (754, 1014), 'number', 'Left Spehere'],
       [(948, 950), (1186, 1004), 'number', 'Right Spehere'],
       [(516, 1060), (758, 1112), 'number', 'left Cylinder'],
       [(946, 1050), (1188, 1112), 'number', 'Right Cylinder'],
       [(514, 1162), (756, 1220), 'number', 'Left Axis'],
       [(944, 1158), (1186, 1212), 'number', 'Right Axis'],
       [(518, 1274), (760, 1330), 'number', 'Left Add'],
       [(948, 1272), (1186, 1324), 'number', 'Right Add'],
       [(512, 1376), (758, 1434), 'text', 'Left Prism'],
       [(944, 1370), (1186, 1432), 'text', 'Right Prism'],
       [(246, 1472), (612, 1510), 'text', 'PD'],
       [(916, 1466), (1278, 1512), 'text', 'BVD']]

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

imgQ = cv2.imread(file_path)

# -------------- comment ----------
if imgQ is None:
    print(f"Error: Unable to read the image file at path: {file_path}")
    exit(1)

h, w, c = imgQ.shape

# creates an ORB detector with a maximum of 1000 keypoints.
orb = cv2.ORB_create(1000)
# find key point and coresponding descriptors from the resized input image
kp1, des1 = orb.detectAndCompute(imgQ, None)
# imgKp1 = cv2.drawKeypoints(imgQ, kp1, None)
# cv2.imshow("Key Points", imgKp1)

# -------------------------------------------------------------------------------------------------------------------------------------------
# Use a file dialog to let the user select a directory
# directory_path = filedialog.askdirectory(title="Select Directory")
directory_path = "G:/Personal Projects/Mern with Python/backend/controllers/UserForms"


# path = 'UserForms'
myPicList = os.listdir(directory_path)
print(myPicList)
for j, y in enumerate(myPicList):
    img = cv2.imread(directory_path + "/" + y)
    # img = cv2.resize(img, (w//3, h//3))
    # cv2.imshow(y, img)

    kp2, des2 = orb.detectAndCompute(img, None)

    # Brute-Force Matcher to match the descriptors of the current image (des2) with the descriptors of the reference image (des1).
    bf = cv2.BFMatcher(cv2.NORM_HAMMING)
    matches = bf.match(des2, des1)
    matches = list(matches)
    # matches are sorted by distance in ascending order.
    matches.sort(key=lambda x: x.distance)
    # Give us 25% of the best matches
    good = matches[:int(len(matches)*(per/100))]

    imgMatch = cv2.drawMatches(img, kp2, imgQ, kp1, good[:50], None, flags=2)
    # imgMatch = cv2.resize(imgMatch, (w // 3, h // 3))
    # cv2.imshow(y, imgMatch)

    srcPoints = np.float32(
        [kp2[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
    dstPoints = np.float32(
        [kp1[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)

    M, _ = cv2.findHomography(srcPoints, dstPoints, cv2.RANSAC, 5.0)
    imgScan = cv2.warpPerspective(img, M, (w, h))

    # imgScan = cv2.resize(imgScan, (w//3, h//3))
    # cv2.imshow(y, imgScan)

    imgShow = imgScan.copy()
    imgMask = np.zeros_like(imgShow)

    myData = []  # each of the form data will store(append) in this array

    print(f'############# Extracting data from Form {j} ###############')

    for x, r in enumerate(roi):
        cv2.rectangle(imgMask, (r[0][0], r[0][1]),
                      (r[1][0], r[1][1]), (0, 255, 0), cv2.FILLED)
        imgShow = cv2.addWeighted(imgShow, 0.99, imgMask, 0.1, 0)

        # Croping highlighted texts (width, height)
        imgCrop = imgScan[r[0][1]:r[1][1], r[0][0]: r[1][0]]
        # cv2.imshow(str(x), imgCrop)

        if r[2] == 'text' or r[2] == 'number' or 'date':
            # Remove leading/trailing whitespace, including newlines
            extracted_text = pytesseract.image_to_string(imgCrop).strip()
            print(f'{r[3]} : {extracted_text}')
            myData.append(extracted_text)

            # Add the extracted data to the dictionary with the field name as the key
            extracted_data[r[3]] = extracted_text

# Convert the extracted data dictionary to a JSON object
extracted_data_json = json.dumps(extracted_data)
print("Extracted data json object : " + extracted_data_json)

# Send the extracted data to your React app using an HTTP POST request
# Replace with your React app's API endpoint
url = "http://localhost:5000/api/ocr/records"
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, data=extracted_data_json, headers=headers)
    if response.status_code == 200:
        print("Data sent successfully to React app.")
    else:
        print(
            f"Error sending data to React app. Status code: {response.status_code}")
except Exception as e:
    print(f"An error occurred while sending data to React app: {str(e)}")

    # imgShow = cv2.resize(imgShow, (w // 3, h // 3))
    # print(myData)
    # cv2.imshow(y+"2", imgShow)

# cv2.imshow("KeyPointQuery", impKp1)
# cv2.imshow("Output", imgQ)
cv2.waitKey(0)
