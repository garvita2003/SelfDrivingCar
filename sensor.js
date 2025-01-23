class Sensor{
    //sensor should know where the car is thats why car as an parameter
    constructor(car)
    {
        this.car = car;

        this.rayCount = 5; //refers to the rays in different direction from a car
        this.rayLength = 150; //how far the ray can go and sense within this range only
        this.raySpread = Math.PI / 2; //how much the ray can spread

        this.rays = []; //store ray one by one
        this.readings = []; //tells the border is their or not and how far it is
    }

    update(roadBorders, traffic)
    {
        this.#castRays();
        this.readings = [];
        for(let i = 0;i<this.rays.length;i++)
        {
            this.readings.push(this.#getReading(this.rays[i],roadBorders, traffic));
        }
    }

    //check where these ray touches the borders and keep the closest point in the reading
    #getReading(ray,roadBorders, traffic)
    {
        let touches = [];

        for(let i=0;i<roadBorders.length;i++)
        {
            const touch = getIntersection(
                ray[0],ray[1],
                roadBorders[i][0],roadBorders[i][1]
            );
            if(touch)
            {
                touches.push(touch);
            }
        }

        //sensor for traffic road dummy car
        for(let i=0;i<traffic.length;i++)
        {
            const poly = traffic[i].polygon;
            for(let j=0;j<poly.length;j++)
            {
                const value = getIntersection(
                    ray[0],ray[1],
                    poly[j],poly[(j+1)%poly.length]
                );
                if(value)
                {
                    touches.push(value);
                }
            }
        }

        //if there is no touch, return null
        if(touches.length == 0)
        {
            return null;
        }
        else
        {
            const offsets = touches.map(e => e.offset); // how far the obstacle from 0 or cars initial position
            const minOffset = Math.min(...offsets); //minimum, near or closet obstacle because if we address that then no other obstacle occurs
            return touches.find(e => e.offset == minOffset);
        }
    }

    // Create a rays in different direction
    #castRays()
    {
        this.rays = [];
        for(let i=0; i<this.rayCount; i++)
        {
            const rayAngle = lerp(this.raySpread/2,-this.raySpread/2,this.rayCount==1?0.5:i/(this.rayCount-1))+this.car.angle; // we add this.car.angle so that sensor rays move along with the direction of car
            const start = {x:this.car.x, y:this.car.y}; //start point of the ray
            const end = {x:this.car.x - Math.sin(rayAngle)*this.rayLength, y:this.car.y - Math.cos(rayAngle)*this.rayLength}; //end point of the ray
            this.rays.push([start,end]); //form the segment
        }
    }

    //draw the sensors
    draw(ctx){
        for(let i=0; i<this.rays.length; i++)
        {
            let end = this.rays[i][1];
            if(this.readings[i])
            {
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            //reflect the obstacles present
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle = 'black';
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}
