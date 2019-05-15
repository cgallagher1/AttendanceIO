import face_recognition
import cv2
import os
import numpy as np
import sys
import json

# This is an edited version of a demo of running face recognition on a video file.

# Getting video location and known faces folder from javascript
videoLocation = sys.argv[1]
directory = sys.argv[2]

# Open the input movie file
input_movie = cv2.VideoCapture(videoLocation)
length = int(input_movie.get(cv2.CAP_PROP_FRAME_COUNT))

numStudents = len(os.listdir(directory))
student_names = np.empty(numStudents, dtype=object)
student_faces = list()
attendance = dict()
retVal = list()

# Will require that the images are either .png, .jpg, or .jpeg
for filename, index in zip(os.listdir(directory), range(numStudents)):
    direct = directory+'/'+filename
    if (filename.endswith(".png") or filename.endswith(".jpg")):
        person = filename[:-4]
    elif (filename.endswith(".jpeg")):
        person = filename[:-5]
    else:
        raise Exception("Improper file or folder in {}. Must have contain only files with type .png, .jpg, or .jpeg.")
    
    student_names[index] = person
    attendance[person] = 'absent'

    person_image = face_recognition.load_image_file(direct)
    person_encoding = face_recognition.face_encodings(person_image)[0]
    student_faces.append(person_encoding)


# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
frame_number = 0

while True:
    # Grab a single frame of video
    ret, frame = input_movie.read()
    frame_number += 10

    # Quit when the input video file ends
    if not ret:
        break

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_frame = frame[:, :, ::-1]

    # Find all the faces and face encodings in the current frame of video
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    face_names = []
    for face_encoding in face_encodings:
        # See if the face is a match for the known face(s)
        match = face_recognition.compare_faces(student_faces, face_encoding, tolerance=0.50)

        # If you had more than 2 faces, you could make this logic a lot prettier
        # but I kept it simple for the demo
        name = None
        name = student_names[match]
        if(len(name) == 1):
            name = name[0]

        face_names.append(name)

    # Label the results
    for name in face_names:
        if type(name) == str:
            if(attendance[name] == 'absent'):
                attendance[name] = 'present'
                retVal.append(name)


# All done!
cv2.destroyAllWindows()
for name in retVal:
    print(name)
