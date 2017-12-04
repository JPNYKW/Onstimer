const canv=(d=document).getElementById('timer');
const cont=canv.getContext('2d');
const round=(m=Math).round;
const sin=m.sin;
const cos=m.cos;
const pi=m.PI;

var se,run=false,tick=0,timer={min:1,sec:0};

function init(){
	canv.height=360;
	canv.width=360;
	
	se=new Audio();
	se.src='impact.mp3';
}

function start(){
	if(!run){
		run=true;
		
		timer.min=parseInt(d.getElementById('min').value);
		timer.sec=parseInt(d.getElementById('sec').value);
		
		tick=(timer.min*60+timer.sec)*10;
		
		loop=setInterval(main,100);
	}
}

function dot(x,y,size){
	cont.fillRect(x-size/2,y-size/2,size,size);
}

function main(){
	draw();
	if(run)timer.sec-=0.1;
	if(timer.sec<0.4){
		if(run){
			timer.min--;
			timer.sec=60;
		}
		
		if(timer.min<0){
			run=false;
			timer.min=0;
			timer.sec=0;
		}
	}
	tick--;
	if(tick===-2)se.play();
	if(tick<-100)clearInterval(loop);
}

function draw(){
	cont.fillStyle='rgba('+0x20+','+0x20+','+0x28+',0.7)';
	cont.fillRect(0,0,canv.width,canv.height);
	
	let color=0x116cea;
	for(let i=0;i<5;i++){
		cont.fillStyle='#'+color.toString(16);
		
		if(tick<0){
			dotsOnCircle(canv.width/2,canv.height/2,i*14-(tick/i)*1.7,(-tick)*(i+1)+120-i*5,32-i*3);
		}else{
			dotsOnCircle(canv.width/2,canv.height/2,i*14-(tick/i)*1.7,120-i*5,32-i*3);
		}
		
		color+=0x311e06;
	}
	
	cont.textAlign='center';
	cont.fillStyle='rgba(220,220,220,0.7)';
	cont.font='50px Arial';
	
	cont.fillText(round(timer.min)+':'+round(timer.sec),canv.width/2,canv.height/2+20);
}

function dotsOnCircle(cx,cy,dir,radius,vertex){
	let theta=dir;
	for(let i=0;i<vertex;i++){
		dot(cx+cos(theta*pi/180)*radius,cy+sin(theta*pi/180)*radius,3);
		theta+=360/vertex;
	}
}

window.onload=()=>{
	init();
	draw();
};