const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let arr = [];
class P {
    constructor(x,y){
        this.x=x; this.y=y;
        this.s=Math.random()*2+1;
        this.dx=(Math.random()-0.5)*1;
        this.dy=(Math.random()-0.5)*1;
    }
    u(){
        this.x+=this.dx;
        this.y+=this.dy;
        if(this.x<0 || this.x>canvas.width) this.dx*=-1;
        if(this.y<0 || this.y>canvas.height) this.dy*=-1;
    }
    d(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.s,0,Math.PI*2);
        ctx.fillStyle="#ff00ff";
        ctx.fill();
    }
}
function init(){
    arr=[];
    for(let i=0;i<100;i++){
        arr.push(new P(Math.random()*canvas.width,Math.random()*canvas.height));
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    arr.forEach(p=>{p.u();p.d();});
    requestAnimationFrame(animate);
}
init();
animate();
