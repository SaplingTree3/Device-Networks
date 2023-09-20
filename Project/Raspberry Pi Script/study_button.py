import requests
import socket
import RPi.GPIO as GPIO
import time

#initialize button to '0'
button = '0'
btn_pressed = 0
# send if the button was pressed to the BBB
# '1' means the button was pressed and '0' means it was not
s = socket.socket(socket.AF_INET)
s.connect(('192.168.1.121', 9055))


#set pins for leds and button
greenLED = 29
redLED = 31
push_button = 10

GPIO.setwarnings(False)
#pin setup
GPIO.setmode(GPIO.BOARD)
GPIO.setup(greenLED, GPIO.OUT)
GPIO.setup(redLED, GPIO.OUT)
GPIO.setup(push_button, GPIO.IN, pull_up_down= GPIO.PUD_DOWN)

#initialize leds
GPIO.output(greenLED, GPIO.HIGH) #<< greenLED on when study buddy is focused
GPIO.output(redLED, GPIO.LOW) #<< redLED on when buddy is distracted(BHADDD)

while(True):
    

    # see the status of the url
    # '1' means the user is on a non-productive .exe
    # '0' means the user is productive
    response = requests.get("http://192.168.1.121:9105/api/url/status")
    response_val= int(response.text)
    #print(response.text)

    # if we receive a flag, enable a button press to send to BBB
    while(response.text == '1'):  
        
        GPIO.output(greenLED, GPIO.LOW) 
        GPIO.output(redLED, GPIO.HIGH) #<< flag, set redLED high
        
        #btn_pressed = GPIO.IN(push_button)
        #if flag(redLED) is high and button is pushed send updated button value
        if( response_val == 1 & GPIO.input(10) == 1):
            button = '1'
            print("Button value: " + button)
            s.sendall('1'.encode("utf-8"))
            time.sleep(5)
            GPIO.cleanup()   # clean ports used before exit
        else:
            button = '0'
            print("Button value: " + button)
            s.sendall('0'.encode("utf-8"))
            time.sleep(5)
           
     

