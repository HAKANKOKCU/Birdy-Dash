var canvas = document.getElementById("gamecanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var normaltime = 1000 / 60;
var lastUpdate = Date.now();
var ctx = canvas.getContext("2d");
var camx = 0;
var camy = 0;
var camspeed = 10;
var playerx = 100;
var playery = 0;
var gravitydirection = 1;
var velocityY = 3;
var playerspeed = 5;
var mapdirection = 1;
var charrotation = 0;
var playertype = "Cube";
var isatmenu = true;
var bgmusic;
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
	X: 1080,
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
},{
	Type: "Cube",
	X: 1850,
	Y: 300
},{
	Type: "Cube",
	X: 1875,
	Y: 300
},{
	Type: "Cube",
	X: 1900,
	Y: 300
},{
	Type: "PlanePortal",
	X: 1900,
	Y: 250
},{
	Type: "Cube",
	X: 1925,
	Y: 300
},{
	Type: "Cube",
	X: 1950,
	Y: 300
},{
	Type: "Cube",
	X: 1975,
	Y: 300
},{
	Type: "Cube",
	X: 1975,
	Y: 150
},{
	Type: "Cube",
	X: 2000,
	Y: 300
},{
	Type: "Cube",
	X: 2000,
	Y: 150
},{
	Type: "Cube",
	X: 2025,
	Y: 300
},{
	Type: "Cube",
	X: 2025,
	Y: 150
},{
	Type: "Cube",
	X: 2050,
	Y: 300
},{
	Type: "Cube",
	X: 2050,
	Y: 150
},{
	Type: "Cube",
	X: 2075,
	Y: 300
},{
	Type: "Cube",
	X: 2075,
	Y: 150
},{
	Type: "Cube",
	X: 2100,
	Y: 300
},{
	Type: "Cube",
	X: 2100,
	Y: 150
},{
	Type: "Cube",
	X: 2125,
	Y: 300
},{
	Type: "Cube",
	X: 2125,
	Y: 150
},{
	Type: "Cube",
	X: 2150,
	Y: 300
},{
	Type: "Cube",
	X: 2150,
	Y: 150
}];

document.getElementById("textmapjson").value = JSON.stringify({"music":"xtrullortria.mp3","obj":objects});

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
	playertype = "Cube"
	camx = 0;
	lastUpdate = Date.now();
	camy = 0;
	playerx = 100;
	playery = 0;
	gravitydirection = 1;
	velocityY = 3;
	playerspeed = 5;
	mapdirection = 1;
	charrotation = 0;
	levellength = 0;
	music.currentTime = 0;

	objects.forEach((i) => {
		if (i.X > levellength) {
			levellength = i.X + (i.W ? i.W : 0);
		}
	})
	
	levellength += 250;
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");
}

function playerdied() {
	resetgame();
}
var circlessize = 25
var circlessizeinc = -1
var dt = 0;
var dtl = 0;
function gameloop() {
	if (isatmenu) {
		lastUpdate = now;
	}else {
		var now = Date.now();
		dt = (now / lastUpdate) ;
		
		
		var dta = (normaltime / dt);
		dtl = Math.floor(dta / normaltime);
		if (dtl == 0) {
			dtl = 1;
		}
		//alert(dtl)
		//dt = (dt % 1) + 1;
		
		for (let i = 0; i < dtl; i++) {
			if (isdown) {
				downcounter += 1;
				if (playertype == "Plane") {
					ct = downcounter / 2;
					if (ct > 4) {
						ct = 4
					}
					velocityY = -ct;
				}
			}
			
			playerx += (playerspeed * mapdirection) //* (dt / normaltime);
			camx -= ((camx - (playerx - ((canvas.width / 1366) * 350))) / camspeed)// * (dt / normaltime);
			camy -= ((camy - (playery - canvas.height + ((canvas.height / 635) * 350))) / camspeed) //* (dt / normaltime)
			playery += ((gravitydirection * velocityY) * mapdirection) //* (dt / normaltime);
			renderandcol(i == 0);
			
			circlessize += circlessizeinc;
			if (circlessize == 5) {
				circlessizeinc = 1
			}
			if (circlessize == 26) {
				circlessizeinc = -1
			}
			if (playery > 5000) {
				resetgame();
				i == dtl;
			}
			if (playerx > levellength - 100) {
				playery += (-50 - playery) / 8;
				gravitydirection = 0;
				if (playerx > levellength + 200) {
					isatmenu = true;
					music.pause();
					document.getElementById("menuoverlay").style.display = "";
				}
				
			}
			ctx.strokeStyle = "Lime";
			ctx.beginPath();
			ctx.moveTo((levellength - 100) - camx, -100 - camy);
			ctx.lineTo((levellength - 100) - camx, 100 -camy);
			ctx.stroke(); 
		}
		lastUpdate = now;
		requestAnimationFrame(gameloop);
	}
}

var falling = true;
function renderandcol(a) {
	falling = true;
	if (a)
	drawrectat(0,0,canvas.width,canvas.height,"Black",3,true);
	objects.forEach((i) => {
		if (i.Type == "Cube") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					if (a)drawrectat(i.X - camx,i.Y - camy,25,25,"Blue",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
		if (i.Type == "Rect") {
			//if (i.X - camx < canvas.width && i.X - camx + i.W > 0) {
				//if (i.Y - camy < canvas.height && i.Y - camy + i.H > 0) {
					if (a)drawrectat(i.X - camx,i.Y - camy,i.W,i.H,"Blue",3,true);
					handlecol(i.X, i.Y, i.W, i.H,i.Type);
				//}
			//}
		}
		if (i.Type == "Jumper") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					if (a)drawrectat(i.X - camx,(i.Y + 15) - camy,25,10,"Orange",3,true);
					handlecol(i.X, i.Y + 15, 25, 10,i.Type);
				}
			}
		}
		if (i.Type == "Spike") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawtrigat(i.X - camx,i.Y - camy,25,25,"Red",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
		if (i.Type == "OrbJump") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawcircleat(i.X - camx,i.Y - camy,circlessize,"Gold",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
		if (i.Type == "OrbDown") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawcircleat(i.X - camx,i.Y - camy,circlessize,"DeepSkyBlue",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
				}
			}
		}
		if (i.Type == "PlanePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"Orange",3,true);
					handlecol(i.X, i.Y, 25, 50,i.Type);
				}
			}
		}
		if (i.Type == "CubePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"DeepSkyBlue",3,true);
					handlecol(i.X, i.Y, 25, 50,i.Type);
				}
			}
		}
	})
	//ctx.translate((playerx - camx + 12.5), (playery - camy + 12.5));
	if (a) {
		ctx.translate(playerx - camx + 12.5, playery - camy + 12.5);
		ctx.rotate(Math.PI / 180 * charrotation);
		drawrectat(-12.5,-12.5,25,25,"LightBlue",0,true);
		ctx.rotate(Math.PI / 180 * -charrotation);
		ctx.translate(-(playerx - camx + 12.5), -(playery - camy + 12.5));
		ctx.fillStyle = "white";
		ctx.font = "30px Sans Serif";
		ctx.fillText(Math.floor((playerx / levellength) * 100) + "%",0,30);
		ctx.fillStyle = "white";
		ctx.font = "12px Sans Serif";
		ctx.fillText("Frame Delay:" + dt + ", Loops:" + dtl,0,60);
	}
	if (falling) {
		velocityY += 0.7;
		if (velocityY > 32) {
			velocityY = 32
		}
		if (playertype == "Cube") {
			charrotation += 10;
		}
	}else {
		var charrotmod = charrotation % 90;
		if (charrotmod > 45) {
			charrotation += charrotmod;
		}else {
			charrotation -= charrotmod;
		}
	}
	if (playertype != "Cube") {
		charrotation = (Math.min(3,velocityY) / 10) * 180;
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
	}else if (type == "Rect") {
		if (playery >= y - width + 1) {
			if (playery <= y - 1) {
				if (playerx > x) {
					if (playerx <= xw) {
						velocityY = 0;
						playery = y - height
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
							velocityY = -12 * gravitydirection;
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
						gravitydirection = 1;
						velocityY = -15 * gravitydirection;
						falling = false
					}
				}
			}
		}
	}
	else if (type == "OrbDown") {
		if (playery >= y - 50) {
			if (playery <= y + 50) {
				if (playerx >= x) {
					if (playerx <= xw) {
						if (isdown && downcounter < 5) {
							gravitydirection = -1;
							velocityY = -12 * gravitydirection;
							falling = false
						}
					}
				}
			}
		}
	}
	else if (type == "PlanePortal") {
		if (playery >= y - 50) {
			if (playery <= y + 50) {
				if (playerx >= x) {
					if (playerx <= xw) {
						playertype = "Plane"
					}
				}
			}
		}
	}
	else if (type == "CubePortal") {
		if (playery >= y - 50) {
			if (playery <= y + 50) {
				if (playerx >= x) {
					if (playerx <= xw) {
						playertype = "Cube"
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
	var mp = JSON.parse(document.getElementById("textmapjson").value);
	music = new Audio(mp.music);
	music.play();
	objects = mp.obj;
	resetgame();
	isatmenu = false;
	document.getElementById("menuoverlay").style.display = "none";
	requestAnimationFrame(gameloop);
})

document.getElementById("editmap").addEventListener("click",function() {
	var mp = JSON.parse(document.getElementById("textmapjson").value);
	music = new Audio(mp.music);
	//music.play();
	objects = mp.obj;
	resetgame();
	isatmenu = false;
	document.getElementById("menuoverlay").style.display = "none";
	document.body.addEventListener("mouseup",function(e) {
		mpx = e.clientX;
		mpy = e.clientY;
		let i = {
			Type: tools[toolindex],
			X: Math.round((camx + mpx) / 10) * 10,
			Y: Math.round((camy+ mpy) / 10) * 10
		}
		objects.push(i);
	})
	document.body.addEventListener("touchend",function(e) {
		mpx = e.clientX;
		mpy = e.clientY;
		let i = {
			Type: tools[toolindex],
			X: Math.round((camx + mpx) / 10) * 10,
			Y: Math.round((camy+ mpy) / 10) * 10
		}
		objects.push(i);
	})
	requestAnimationFrame(editorloop);
})

let pressedkeys = [];
let tools = ["Cube","Jumper","Spike","OrbJump","OrbDown","PlanePortal","CubePortal"]
let toolindex = 0;

let mpx = 0;
let mpy = 0;
let objind = -1;
document.body.addEventListener("mousemove",function(e) {
	mpx = e.clientX;
	mpy = e.clientY;
})

document.body.addEventListener("touchmove",function(e) {
	mpx = e.clientX;
	mpy = e.clientY;
})

document.body.addEventListener("keydown",function(e) {
	if (pressedkeys.indexOf(e.key) == -1) {
		pressedkeys.push(e.key);
		console.log(pressedkeys)
	}
})

document.body.addEventListener("keyup",function(e) {
	pressedkeys.splice(pressedkeys.indexOf(e.key),1);
	if (e.key == "n") {
		toolindex += 1;
		if (toolindex > tools.length - 1) {
			toolindex == tools.length -1;
		}
	}
	if (e.key == "m") {
		toolindex -= 1;
		if (toolindex < 0) {
			toolindex = 0;
		}
		
	}
	if (e.key == "r") {
		toolindex = -1;
	}
	if (e.key == "s") {
		prompt("Map:", JSON.stringify({"music":"xtrullortria.mp3","obj":objects}));
	}
})

function editorloop() {
	if (pressedkeys.includes("ArrowRight")) {
		camx += 5;
	}
	if (pressedkeys.includes("ArrowLeft")) {
		camx -= 5;
	}
	if (pressedkeys.includes("ArrowUp")) {
		camy -= 5;
	}
	if (pressedkeys.includes("ArrowDown")) {
		camy += 5;
	}
	drawrectat(0,0,canvas.width,canvas.height,"Black",3,true);
	objects.forEach((i) => {
		if (i.Type == "Cube") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,i.Y - camy,25,25,"Blue",3,true);
				}
			}
		}
		if (i.Type == "Jumper") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,(i.Y + 15) - camy,25,10,"Orange",3,true);
				}
			}
		}
		if (i.Type == "Spike") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawtrigat(i.X - camx,i.Y - camy,25,25,"Red",3,true);
				}
			}
		}
		if (i.Type == "OrbJump") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawcircleat(i.X - camx,i.Y - camy,circlessize,"Gold",3,true);
				}
			}
		}
		if (i.Type == "OrbDown") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawcircleat(i.X - camx,i.Y - camy,circlessize,"DeepSkyBlue",3,true);
				}
			}
		}
		if (i.Type == "PlanePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"Orange",3,true);
				}
			}
		}
		if (i.Type == "CubePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"DeepSkyBlue",3,true);
				}
			}
		}
	})
	
	{
		let i = {
			Type: tools[toolindex],
			X: Math.round((camx + mpx) / 10) * 10,
			Y: Math.round((camy+ mpy) / 10) * 10
		}
		if (i.Type == "Cube") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,i.Y - camy,25,25,"Blue",3,true);
				}
			}
		}
		if (i.Type == "Jumper") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,(i.Y + 15) - camy,25,10,"Orange",3,true);
				}
			}
		}
		if (i.Type == "Spike") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawtrigat(i.X - camx,i.Y - camy,25,25,"Red",3,true);
				}
			}
		}
		if (i.Type == "OrbJump") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawcircleat(i.X - camx,i.Y - camy,circlessize,"Gold",3,true);
				}
			}
		}
		if (i.Type == "OrbDown") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawcircleat(i.X - camx,i.Y - camy,circlessize,"DeepSkyBlue",3,true);
				}
			}
		}
		if (i.Type == "PlanePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"Orange",3,true);
				}
			}
		}
		if (i.Type == "CubePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"DeepSkyBlue",3,true);
				}
			}
		}
	}
	
	
	ctx.fillStyle = "white";
	ctx.font = "12px Sans Serif";
	ctx.fillText("Arrow Keys: Move camera \nN: Next Tool \nM:Previous Tool \nR: Remover \nS: Save",0,30);
	requestAnimationFrame(editorloop)
}