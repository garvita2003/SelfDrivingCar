class Road{
    constructor(x,width,laneCount=3){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount; // number of lanes

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000; //making road to go infinitely upside
        this.top=-infinity;
        this.bottom=infinity;

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        
        //Border or boundaries of the road
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    //used to find the center of the lane
    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.laneCount;
        return this.left+laneWidth/2 + Math.min(laneIndex,this.laneCount-1)*laneWidth; //used minimum so that if the lane is less as compared to positionof the car then place in the last lane irself
    }

    //draw the road
    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=1;i<=this.laneCount-1;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            
            ctx.setLineDash([20,20]); // line dash having break of 20px between them
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]); // for borders their is not line dash
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}