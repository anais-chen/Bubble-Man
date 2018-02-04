var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//array
var x=new Array (Math.random()*canvas.width,Math.random()*canvas.width,Math.random()*canvas.width,Math.random()*canvas.width,
Math.random()*canvas.width);

var y=new Array (Math.random()*canvas.height/2,Math.random()*canvas.height/2,Math.random()*canvas.height/2,
Math.random()*canvas.height/2,Math.random()*canvas.height/2);

var dx=new Array(2,2,2,2,2);
var dy=new Array(-2,-2,-2,-2,-2);

////stick

  var faceRight=true;

  var sx=canvas.width/2;
  var sy=canvas.height/2;
  var sdx=15;
  var sdy=15;

  var gameFinished=false;


var shooting=false;
var bx=new Array(sx+sdx,sx+sdx+100,sx+sdx+200,sx+sdx,sx+sdx+300,sx+sdx+400,sx+sdx+500,sx+sdx+600,sx+sdx+700,sx+sdx+800);
var by=new Array(sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy,sy+sdy);
var bd=15;

  var radius=10;

  var aliveTargets=true;
  var numTargets=5;

//draw ball
function drawBall() {
	for(i=0;i<numTargets;i++){
    if(x[i]>-1){
	ctx.beginPath();
	ctx.arc(x[i], y[i], 10, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
  }
}
}



//draw fireWeapon
function fireWeapon(){
  for(j=0; j<10;j++){

  ctx.beginPath();
  ctx.arc(bx[j], by[j], 5, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  shooting=true;
  console.log("shooting");
  }
}

//move stick
function leftArrowPressed() {
        	sx-=sdx;
        	}

        	function rightArrowPressed() {
        	sx+=sdx;
        	}

        	function upArrowPressed() {
        	sy-=sdy;
        	}

        	function downArrowPressed() {
        	sy+=sdy;
        	}

        	function moveSelection(evt) {
            	switch (evt.keyCode) {
                	case 37:
                	leftArrowPressed();
                	faceRight=false;
                	break;
                	case 39:
                	rightArrowPressed();
                	faceRight=true;
                	break;
                	case 38:
                	upArrowPressed();
                	break;
                	case 40:
                	downArrowPressed();
                	break;
                	case 81:
                	shooting= !shooting;
                	}
            	};

    	function docReady()
    	{

      	window.addEventListener('keydown', moveSelection);
    	}


function draw() {
if(gameFinished===false){

//collision
for(i=0;i<numTargets;i++){
/*if ( ( sx < (x[i] + 0.5*radius) )&&
	( (sx + 127*.75) > x[i] )&&
	( sy < (y[i] + 0.5*radius) )&&
	( (sy + 301*.75) > y[i]) ){
*/
if ( sx < x[i]+ 2*radius &&
   sx + 50 > x[i] &&
   sy < y[i] + 2*radius &&
   sy+ 111 > y[i] ){
    	// collision detected!
    	console.log("collision")

    	//alert("GAME OVER");
    	//document.location.reload();
    	window.location = "gobus.html";
    	gameFinished=true;
    	}
}
ctx.clearRect(0, 0, canvas.width, canvas.height);

for(i=0;i<10;i++){
  for(j=0;j<numTargets;j++){
if(by[i]-2*5<y[j]&&by[i]>y[j]-2*radius&&bx[i]>x[j]-2*radius &&bx[i]-2*5<x[j]&&shooting===true){
  console.log("shot the ball"+j);
  aliveTargets=false;
  numTargets--;
  console.log(numTargets);
	}
  }
}
//new



//move ball
for(i=0;i<numTargets;i++){
	x[i] += dx[i];
	y[i] += dy[i];

	if (x[i]+dx[i]<0|| x[i]+dx[i]>canvas.width) {
  	dx[i]=-dx[i];
  	x[i]+=dx[i];
	}

	if (y[i]+dy[i]<0|| y[i]+dy[i]>canvas.height) {
  	dy[i]=-dy[i];
  	y[i]+=dy[i];
	}
}

//draw stick

	var img=document.createElement('img');
if (faceRight===true){
	img.src='stick_figure_man_T.png';
  }else if (faceRight===false){
	img.src='stick_figure_man_T_rev.png';
  }
	img.onload = function () {
	ctx.drawImage(img,0,0,127,301,sx,sy,50,111);
	ctx.rect(sx,sy,50,111);
	ctx.stroke();
	}
  //  sx+=sdx;
	//sy+=sdy;
//check keys
  	docReady();

//WORK HERE
//get rid of shots that are offscreen
	for(i=0;i<10;i++){
  	if(bx[i]>canvas.width){
    	shooting=false;
    	bx[i]=sx+sdx;
    	by[i]=sy+sdy;
    	console.log("ball out of bounds");
 	} else if(bx[i]<0){
   	shooting=false;
   	bx[i]=sx-sdx;
   	by[i]=sy+sdy;
   	console.log("ball out of bounds");
 	}

   }
	//move shot balls
      	if(shooting===true){
        	console.log("fire away");
          	for(i=0;i<10;i++){
            	if (faceRight===true){
            	bx[i]+=bd;
          	}else if(faceRight===false){
            	bx[i]-=bd;
          	}
          	}
        	fireWeapon();
      	}
    	drawBall();

    	if(numTargets===0){
      	//alert("You Win");
      	//document.location.reload();
        window.location = "Win Screen.html";
      	gameFinished=true;
    	}
}
}


setInterval(draw, 10);
