var canvas = document.getElementById("gamecanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var camx = 0;
var camy = 0;
var playerx = 100;
var playery = 0;
var gravitydirection = 1;
var velocityY = 3;
var playerspeed = 5;
var mapdirection = 1;
var charrotation = 0;
var isatmenu = true;
var objects = [{
	Type: "Cube",
	X: 400,
	Y: 300
},{
	Type: "Cube",
	X: 425,
	Y: 300
},{
	Type: "Cube",
	X: 450,
	Y: 300
},{
	Type: "Cube",
	X: 475,
	Y: 300
},{
	Type: "Spike",
	X: 500,
	Y: 275
},{
	Type: "Cube",
	X: 500,
	Y: 300
},{
	Type: "Cube",
	X: 525,
	Y: 300
},{
	Type: "Cube",
	X: 550,
	Y: 300
},{
	Type: "Cube",
	X: 575,
	Y: 300
},{
	Type: "OrbJump",
	X: 675,
	Y: 225
},{
	Type: "Cube",
	X: 750,
	Y: 150
},{
	Type: "Cube",
	X: 775,
	Y: 150
},{
	Type: "Cube",
	X: 800,
	Y: 150
},{
	Type: "Cube",
	X: 825,
	Y: 150
},{
	Type: "OrbJump",
	X: 900,
	Y: 150
},{
	Type: "OrbJump",
	X: 1000,
	Y: 150
},{
	Type: "Cube",
	X: 1075,
	Y: 150
},{
	Type: "Cube",
	X: 1150,
	Y: 150
},{
	Type: "Cube",
	X: 1175,
	Y: 150
},{
	Type: "Cube",
	X: 1200,
	Y: 150
},{
	Type: "Cube",
	X: 1225,
	Y: 150
},{
	Type: "Cube",
	X: 1300,
	Y: 150
},{
	Type: "Cube",
	X: 1325,
	Y: 150
},{
	Type: "Cube",
	X: 425,
	Y: 300
},{
	Type: "Cube",
	X: 375,
	Y: 325
},{
	Type: "Cube",
	X: 350,
	Y: 325
},{
	Type: "Cube",
	X: 325,
	Y: 325
},{
	Type: "Cube",
	X: 300,
	Y: 325
},{
	Type: "Cube",
	X: 275,
	Y: 325
},{
	Type: "Cube",
	X: 250,
	Y: 325
},{
	Type: "Cube",
	X: 225,
	Y: 325
},{
	Type: "Cube",
	X: 200,
	Y: 325
},{
	Type: "Cube",
	X: 175,
	Y: 325
},{
	Type: "Cube",
	X: 200,
	Y: 325
},{
	Type: "Cube",
	X: 225,
	Y: 325
},{
	Type: "Cube",
	X: 250,
	Y: 325
},{
	Type: "Cube",
	X: 275,
	Y: 325
},{
	Type: "Cube",
	X: 300,
	Y: 325
},{
	Type: "Cube",
	X: 1375,
	Y: 325
},{
	Type: "Cube",
	X: 1400,
	Y: 325
},{
	Type: "Cube",
	X: 1425,
	Y: 325
},{
	Type: "Cube",
	X: 1450,
	Y: 325
},{
	Type: "Cube",
	X: 1475,
	Y: 325
},{
	Type: "Cube",
	X: 1500,
	Y: 325
},{
	Type: "Cube",
	X: 1525,
	Y: 325
},{
	Type: "Cube",
	X: 1550,
	Y: 325
},{
	Type: "Cube",
	X: 1575,
	Y: 300
},{
	Type: "Cube",
	X: 1600,
	Y: 300
},{
	Type: "Cube",
	X: 1625,
	Y: 300
},{
	Type: "Jumper",
	X: 1625,
	Y: 275
}];

document.getElementById("textmapjson").value = JSON.stringify(objects);

var isdown = false;
var downcounter = 0;
function down(event) {
	isdown = true;
}
function up(event) {
	isdown = false;
	downcounter = 0;
}

canvas.addEventListener("mousedown",down)
canvas.addEventListener("touchstart",down)
canvas.addEventListener("mouseup",up)
canvas.addEventListener("touchend",up)
var levellength = 0;
function resetgame() {
	camx = 0;
	camy = 0;
	playerx = 100;
	playery = 0;
	gravitydirection = 1;
	velocityY = 3;
	playerspeed = 5;
	mapdirection = 1;
	charrotation = 0;
	levellength = 0;

	objects.forEach((i) => {
		if (i.X > levellength) {
			levellength = i.X;
		}
	})
	
	levellength += 200;
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");
}

function playerdied() {
	resetgame();
}
var circlessize = 25
var circlessizeinc = -1
function gameloop() {
	if (isatmenu) {
		
	}else {
		if (isdown) {
			downcounter += 1;
		}
		playerx += playerspeed * mapdirection;
		camx -= (camx - (playerx - 350)) / 20;
		camy -= (camy - (playery - canvas.height + ((canvas.height / 635) * 350))) / 20
		playery += (gravitydirection * velocityY) * mapdirection;
		renderandcol();
		requestAnimationFrame(gameloop);
		circlessize += circlessizeinc;
		if (circlessize == 5) {
			circlessizeinc = 1
		}
		if (circlessize == 26) {
			circlessizeinc = -1
		}
		if (playery > 5000) {
			resetgame();
		}
		if (playerx > levellength - 100) {
			playery += (-50 - playery) / 8;
			gravitydirection = 0;
			if (playerx > levellength + 200) {
				isatmenu = true;
				document.getElementById("menuoverlay").style.display = "";
			}
		}
		ctx.strokeStyle = "Lime";
		ctx.beginPath();
		ctx.moveTo((levellength - 100) - camx, -100 - camy);
		ctx.lineTo((levellength - 100) - camx, 100 -camy);
		ctx.stroke(); 
	}
}

var falling = true;
function renderandcol() {
	falling = true;
	drawrectat(0,0,canvas.width,canvas.height,"Black",3,true);
	objects.forEach((i) => {
		if (i.Type == "Cube") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,i.Y - camy,25,25,"Blue",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
		if (i.Type == "Jumper") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,(i.Y + 15) - camy,25,10,"Orange",3,true);
					handlecol(i.X, i.Y + 15, 25, 10,i.Type);
				}
			}
		}
		if (i.Type == "Spike") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawtrigat(i.X - camx,i.Y - camy,25,25,"Red",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
		if (i.Type == "OrbJump") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawcircleat(i.X - camx,i.Y - camy,circlessize,"Gold",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
	})
	//ctx.translate((playerx - camx + 12.5), (playery - camy + 12.5));
	ctx.translate(playerx - camx + 12.5, playery - camy + 12.5);
	ctx.rotate(Math.PI / 180 * charrotation);
	drawrectat(-12.5,-12.5,25,25,"LightBlue",0,true);
	ctx.rotate(Math.PI / 180 * -charrotation);
	ctx.translate(-(playerx - camx + 12.5), -(playery - camy + 12.5));
	ctx.fillStyle = "white";
	ctx.font = "30px Sans Serif";
	ctx.fillText(Math.floor((playerx / levellength) * 100) + "%",0,30)
	if (falling) {
		velocityY += 0.7;
		if (velocityY > 32) {
			velocityY = 32
		}
		charrotation += 10
	}else {
		var charrotmod = charrotation % 90;
		if (charrotmod > 45) {
			charrotation += charrotmod;
		}else {
			charrotation -= charrotmod;
		}
	}
}

function handlecol(x,y,width,height,type) {
	var xw = x + width;
	var yh = y + height;
	x -= width;
	if (type == "Cube") {
		if (playery >= y - 26) {
			if (playery <= y - 1) {
				if (playerx > x) {
					if (playerx <= xw) {
						velocityY = 0;
						playery = y - 25
						falling = false;
						if (isdown) {
							velocityY -= 10;
						}
					}
				}
			}else {
				if (playery <= yh) {
					if (playerx >= x) {
						if (playerx <= xw) {
							playerdied();
						}
					}
				}
			}
		}
	}else if (type == "Spike") {
		if (playery >= y - 25) {
			if (playery <= y) {
				if (playerx >= x) {
					if (playerx <= xw) {
						playerdied();
					}
				}
			}else {
				if (playery <= yh) {
					if (playerx >= x) {
						if (playerx <= xw) {
							playerdied();
						}
					}
				}
			}
		}
	}else if (type == "OrbJump") {
		if (playery >= y - 50) {
			if (playery <= y + 50) {
				if (playerx >= x) {
					if (playerx <= xw) {
						if (isdown && downcounter < 5) {
							velocityY = -12;
							falling = false
						}
					}
				}
			}
		}
	}else if (type == "Jumper") {
		if (playery >= y - 50) {
			if (playery <= y + 50) {
				if (playerx >= x) {
					if (playerx <= xw) {
						velocityY = -15;
						falling = false
					}
				}
			}
		}
	}
}

function drawrectat(x,y,sizex,sizey,color,lineW,isFilled) {
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = lineW;
	ctx.beginPath();
	ctx.rect(x, y, sizex,sizey);
	if (isFilled) 
		ctx.fill()
	else
		ctx.stroke(); 
}

function drawtrigat(x,y,sizex,sizey,color,lineW,isFilled) {
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = lineW;
	ctx.beginPath();
	ctx.moveTo(x + (sizex / 2), y)
	ctx.lineTo(x, y + sizey)
	ctx.lineTo(x + sizex, y + sizey)
	//ctx.moveTo(x + (sizex / 2), y)
	if (isFilled) 
		ctx.fill()
	else
		ctx.stroke(); 
}

function drawcircleat(x,y,radius,color,lineW,isFilled) {
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = lineW;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI); /*+ (radius / 2)*/
	if (isFilled) 
		ctx.fill()
	else
		ctx.stroke(); 
}
document.getElementById("playmap").addEventListener("click",function() {
	objects = JSON.parse(document.getElementById("textmapjson").value);
	resetgame();
	isatmenu = false;
	document.getElementById("menuoverlay").style.display = "none";
	requestAnimationFrame(gameloop);
})