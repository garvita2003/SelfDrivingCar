# SelfDrivingCar
Learn how to create a neural network using JavaScript with no libraries, how to implement the car driving mechanics, how to define the environment, how to simulate some sensors, how to detect collisions, and how to make the car control itself using a neural network. This project covers how artificial neural networks work, by comparing them with the real neural networks in our brain - will learn how to implement a neural network and how to visualize it so we can see it in action.

1. CAR PHYSICS MECHANISM -> car design, mechanism, movement and controls of the car. (car.js, controls.js, main.js)
  
2. ROAD GENERATION AND DEFINATION-> creating a road using border, lanes, position of the car at start or when the number of lane is less as compared to original position of the car and make sure that car comes above the road, we even use translate and restore to have a look that show that the car is constant in is position and moving road and can see the traffic or other object or car Infront of the original car. (road.js, utils.js, main.js)
  
3. ARTIFICIAL SENSORS -> creating a sensor rays of a particular ray length so that it can detect object within that length or range, rays moving with the direction of the car movement, detect and get readings of the nearest obstacle from all the set of obstacles from the car sensor ray range and reflect the rays with black line in case of detection of obstacles or reaching the borders (sensor.js, car.js, utils.js, main.js)
   
4. COLLISIONS DETECTION USING SEGEMENT INTERSECTION FORMULA -> when the car is reaching the side of the road cause the car to damage itself so check for damage or not and change the colour of the car accordingly, Figure out the coordinated of the car while moving in the road (car.js, utils.js)

5. SIMULATING TRAFFIC -> creating a traffic in a road, controlling the only car that has control type as AI and not DUMMY, remove all the sensors from the dummy car in a road, consider the other dummy car in the road as an obstacle, keep the colour of the dummy and original car in a road to be different to see through the sensors clearly (main.js, car.js, controls.js, sensor.js)

6. NEURAL NETWORL -> we have 3 layers(input, hidden, output), input layer having number of rays as input, output layer will have 4 output(left, right, forward, backward) (network.js, car.js, main.js, index.html, style.css, visualizer.js). Create a visualizer for a neural network  (main.js, visualizer.js, utils.js) and parallelization -> optimizing neural network -> apply sensor to the car that is best among the number of cars or go upward best and save or replace them on local storage (main.js, car.js, index.html, style.css)

7. GENETIC ALGORITHM -> having many much traffic and check for the car to make an intelligent choice by its own and save the best one to the local storage, take more car that are copy of best car so that we have enough car for further rounds as well and again take best among that (mutate a network) and increase a traffic gradually and try for harder traffic condition for the self driving car, take along all the cars that passed the obstacle so that we get more chance for further traffic smart choice of the car (main.js, network.js) and car looking -> create a car structure, give the dummy car the random color and the original ai car as blue and it changes to grey in case of collision (main.js, car.js, utils.js)

# Technology Used :
1. HTML
2. CSS
3. ADVANCED JAVASCRIPT : NEURAL NETWORK AND MACHINE LEARNING

# Overview :
[Video Demo](https://drive.google.com/file/d/1Cvj2uhfrN95Q5zRgvtJXyfokxuoQrzXo/view?usp=sharing)
