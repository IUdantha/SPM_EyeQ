import cv2
import cvzone
from cvzone.FaceMeshModule import FaceMeshDetector
from cvzone.PlotModule import LivePlot
import time

#get input from webcam
cap = cv2.VideoCapture(0)
detector = FaceMeshDetector(maxFaces=1)     #only 1 face

plotY = LivePlot(640, 360, [20, 50])

#add points in the mesh
idList = [22, 23, 24, 26, 110, 157, 158, 159, 160, 161, 130, 243]

ratioList = []
blinkCounter = 0
counter = 0

start_time = time.time()
end_time = start_time + 60  # Run for 60 seconds (1 minute)

while time.time() < end_time:
    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    success, img = cap.read()
    img, faces = detector.findFaceMesh(img, draw=False)

    if faces:
        face = faces[0]
        for id in idList:
            cv2.circle(img, face[id], 5, (255, 0, 255), cv2.FILLED)

        #get vertical distance
        leftUp = face[159]
        leftDown = face[23]
        leftLeft = face[130]
        leftRight = face[243]

        lengthVer,_ = detector.findDistance(leftUp, leftDown)
        lengthHor,_ = detector.findDistance(leftLeft, leftRight)

        cv2.line(img, leftUp, leftDown, (0, 200, 0), 2)
        cv2.line(img, leftLeft, leftRight, (0, 200, 0), 2)

        ratio = int((lengthVer / lengthHor) * 100)

        ratioList.append(ratio)

        if len(ratioList) > 3:
            ratioList.pop(0)

        ratioAvg = sum(ratioList) / len(ratioList)

        #blinkCounter condition
        if ratioAvg < 35 and counter == 0:
            blinkCounter += 1
            counter = 1
        if counter != 0:
            counter += 1
            if counter > 10:
                counter = 0

        cvzone.putTextRect(img, f'Blink Count: {blinkCounter}', (50, 100), colorR=(0, 0, 255))

        #liveplot
        imgPlot = plotY.update(ratioAvg)
        img = cv2.resize(img, (640, 360))

        #combine feed and plot
        imgStack = cvzone.stackImages([img, imgPlot], 2, 1)
    else:
        #if no face is found in feed
        img = cv2.resize(img, (640, 360))
        imgStack = cvzone.stackImages([img, img], 2, 1)


    #resize video to 640x360
    #img = cv2.resize(img, (640, 360))

    cv2.imshow("Live Feed", imgStack)
    #adjust speed
    cv2.waitKey(25)

# Release the webcam and close OpenCV windows when the loop exits
cap.release()
cv2.destroyAllWindows()
