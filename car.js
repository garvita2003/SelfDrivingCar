
class Car
{
    constructor(x, y, width, height, controlType, maxSpeed=3, color = "blue")
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.accelaration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05; // to stop the car from going to fast
        this.angle = 0; //making the rotation
        this.damaged = false; //to check if the car is damaged or not

        this.useBrain = controlType=="AI"; //if the control type is AI then use brain

        //dont draw sensor for the dummy cars
        if(controlType!="DUMMY")
        {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount,6,4]);
        }

        //moving the car using keyboard arrow keys - controls
        this.controls = new Controls(controlType);

        //image of the car
        this.img = new Image();
        this.img.src = "car.png";

        this.mask = document.createElement("canvas");
        this.mask.width = width;
        this.mask.height = height;

        const maskCtx = this.mask.getContext("2d");
        this.img.onload = () => {
            maskCtx.fillStyle=color;
            maskCtx.rect(0,0,this.width,this.height);
            maskCtx.fill();

            maskCtx.globalCompositeOperation = "destination-atop";
            maskCtx.drawImage(this.img,0,0,this.width,this.height);
        }
    }

    //manages and moves the car based on the control by keyboard keys
    update(roadBorders, traffic)
    {
        if(!this.damaged) //allow to move if not damaged
        {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }
        if(this.sensor)
        {
            this.sensor.update(roadBorders, traffic);
            const offsets = this.sensor.readings.map(s=>s==null?0:1-s.offset); // low value(0) - when object is far away and higher value(1) -when the object is near
            const outputs = NeuralNetwork.feedForward(offsets, this.brain); //will get 4 values-> forward, left, right, backward
            
            if(this.useBrain)
            {
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.backward = outputs[3];
            }
        }
    }

    #assessDamage(roadBorders, traffic)
    {
        for(let i = 0; i < roadBorders.length; i++)
        {
            if(polysIntersect(this.polygon, roadBorders[i]))
            {
                return true;
            }
        }

        //to damage the car if it touched the dummy car in the road
        for(let i = 0; i < traffic.length; i++)
        {
            if(polysIntersect(this.polygon, traffic[i].polygon))
            {
                return true;
            }
        }

        return false;
    }

    //contains the point of the car position and coordinates
    #createPolygon()
    {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({x:this.x-Math.sin(this.angle-alpha)*rad, y:this.y-Math.cos(this.angle-alpha)*rad});
        points.push({x:this.x-Math.sin(this.angle+alpha)*rad, y:this.y-Math.cos(this.angle+alpha)*rad});
        points.push({x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad, y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad});
        points.push({x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad, y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad});
        return points;
    }

    #move()
    {
        if(this.controls.forward)
            {
                this.speed += this.accelaration; //upwards movement
            }
            if(this.controls.backward)
            {
                this.speed -= this.accelaration;//downwards movement
            }
    
            if(this.speed > this.maxSpeed)
            {
                this.speed = this.maxSpeed;
            }
    
            if(this.speed < -this.maxSpeed/2) // - sign fro going backwards
            {
                this.speed = -this.maxSpeed/2;
            }
    
            if(this.speed > 0)
            {
                this.speed -= this.friction;
            }
    
            if(this.speed < 0)
            {
                this.speed += this.friction;
            }
    
            // to stop the movement of the car because of friction if we release the key
            if(Math.abs(this.speed) < this.friction)
            {
                this.speed = 0;
            }
    
            if(this.speed != 0)
            {
                const flip = this.speed > 0 ? 1 : -1;
                if(this.controls.left)
                {
                    this.angle+=0.03*flip;
                }
                if(this.controls.right)
                {
                    this.angle-=0.03*flip;
                }
            }
    
            //move car in the direction of the angle
            this.x-=Math.sin(this.angle)*this.speed;
            this.y-=Math.cos(this.angle)*this.speed;
    }

    //Building a car mechanism 
    draw(ctx, drawSensor = false)
    {
        
        //dont show sensors for the dummy cars
        if(this.sensor && drawSensor)
        {
            this.sensor.draw(ctx); //causing the sensor to draw itself
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        //check wheather the car is damaged or not
        if(!this.damaged)
        {
            ctx.drawImage(this.mask, -this.width/2, -this.height/2, this.width, this.height);
            ctx.globalCompositeOperation="multiply"; 
        }
        ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);

        ctx.restore();
    }
}