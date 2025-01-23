// Layout of the road
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

// Layout of the network
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Draw the required item on the road
const carCtx = carCanvas.getContext("2d");
//network context
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
N=100;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain"))
{
    for(let i=0;i<cars.length;i++)
    {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(i!=0)
        {
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

//Each car having a different random colors of the DUMMY cars in the traffic
const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2, getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2, getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2, getRandomColor()),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2, getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2, getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2, getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2, getRandomColor()),
];

animate();

//save the car
function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

//replace and discard the previous saved car if get better than that car
function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N)
{
    const cars = [];
    for(let i=1; i<=N; i++)
    {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time)
{
    //create a traffic and update based on the road border
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].update(road.borders, []);
    }

    for(let i=0; i<cars.length; i++)
    {
        //interact the car with the traffic in the raod
        cars[i].update(road.borders, traffic);
    }

    //fitness function
    bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));
    
    //resize the canvas and clear the old position and image of the car
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    //moving road, look like car is still and road moving, can see what is ahead of the car even the traffics and other cars.
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx); // road comes first then the car on the top of it
    //drwa the traffic shown on the road 
    for(let i=0; i<traffic.length; i++)
    {
        traffic[i].draw(carCtx, "red");//red for dummy car
    }

    carCtx.globalAlpha=0.2;//make the car semi transparent
    for(let i=0; i<cars.length; i++)
    {
        cars[i].draw(carCtx, "blue"); //blue car original   
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx, "blue", true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50.0; //time/50.0 is the speed of the line
    Visualizer.drawNetwork(networkCtx, bestCar.brain); //visualizing the neural network

    requestAnimationFrame(animate);
}

