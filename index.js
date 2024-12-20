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
var objects = [{"Type":"Cube","X":400,"Y":300},{"Type":"Cube","X":425,"Y":300},{"Type":"Cube","X":450,"Y":300},{"Type":"Cube","X":475,"Y":300},{"Type":"Spike","X":500,"Y":275},{"Type":"Cube","X":500,"Y":300},{"Type":"Cube","X":525,"Y":300},{"Type":"Cube","X":550,"Y":300},{"Type":"Cube","X":575,"Y":300},{"Type":"OrbJump","X":675,"Y":225},{"Type":"Cube","X":750,"Y":150},{"Type":"Cube","X":775,"Y":150},{"Type":"Cube","X":800,"Y":150},{"Type":"Cube","X":825,"Y":150},{"Type":"OrbJump","X":900,"Y":150},{"Type":"OrbJump","X":1080,"Y":150},{"Type":"Cube","X":1175,"Y":150},{"Type":"Cube","X":1200,"Y":150},{"Type":"Cube","X":1225,"Y":150},{"Type":"Cube","X":1300,"Y":150},{"Type":"Cube","X":1325,"Y":150},{"Type":"Cube","X":425,"Y":300},{"Type":"Cube","X":375,"Y":325},{"Type":"Cube","X":350,"Y":325},{"Type":"Cube","X":325,"Y":325},{"Type":"Cube","X":300,"Y":325},{"Type":"Cube","X":275,"Y":325},{"Type":"Cube","X":250,"Y":325},{"Type":"Cube","X":225,"Y":325},{"Type":"Cube","X":200,"Y":325},{"Type":"Cube","X":175,"Y":325},{"Type":"Cube","X":200,"Y":325},{"Type":"Cube","X":225,"Y":325},{"Type":"Cube","X":250,"Y":325},{"Type":"Cube","X":275,"Y":325},{"Type":"Cube","X":300,"Y":325},{"Type":"Cube","X":1375,"Y":325},{"Type":"Cube","X":1400,"Y":325},{"Type":"Cube","X":1425,"Y":325},{"Type":"Cube","X":1450,"Y":325},{"Type":"Cube","X":1475,"Y":325},{"Type":"Cube","X":1500,"Y":325},{"Type":"Cube","X":1525,"Y":325},{"Type":"Cube","X":1550,"Y":325},{"Type":"Cube","X":1575,"Y":300},{"Type":"Cube","X":1600,"Y":300},{"Type":"Cube","X":1625,"Y":300},{"Type":"Jumper","X":1625,"Y":275},{"Type":"Cube","X":1850,"Y":300},{"Type":"Cube","X":1875,"Y":300},{"Type":"Cube","X":1900,"Y":300},{"Type":"PlanePortal","X":1900,"Y":250},{"Type":"Cube","X":1925,"Y":300},{"Type":"Cube","X":1950,"Y":300},{"Type":"Cube","X":1975,"Y":300},{"Type":"Cube","X":1975,"Y":150},{"Type":"Cube","X":2000,"Y":300},{"Type":"Cube","X":2000,"Y":150},{"Type":"Cube","X":2025,"Y":300},{"Type":"Cube","X":2025,"Y":150},{"Type":"Cube","X":2050,"Y":300},{"Type":"Cube","X":2050,"Y":150},{"Type":"Cube","X":2075,"Y":300},{"Type":"Cube","X":2075,"Y":150},{"Type":"Cube","X":2100,"Y":300},{"Type":"Cube","X":2100,"Y":150},{"Type":"Cube","X":2125,"Y":300},{"Type":"Cube","X":2125,"Y":150},{"Type":"Cube","X":2150,"Y":300},{"Type":"Cube","X":2150,"Y":150},{"Type":"Cube","X":2170,"Y":300},{"Type":"Cube","X":2170,"Y":150},{"Type":"Cube","X":2190,"Y":150},{"Type":"Cube","X":2210,"Y":150},{"Type":"Cube","X":2230,"Y":150},{"Type":"Cube","X":2250,"Y":150},{"Type":"Cube","X":2270,"Y":150},{"Type":"Cube","X":2290,"Y":150},{"Type":"Cube","X":2310,"Y":150},{"Type":"Cube","X":2330,"Y":150},{"Type":"Cube","X":2350,"Y":150},{"Type":"Cube","X":2370,"Y":150},{"Type":"Cube","X":2390,"Y":150},{"Type":"Cube","X":2410,"Y":150},{"Type":"Cube","X":2430,"Y":150},{"Type":"Cube","X":2450,"Y":150},{"Type":"Cube","X":2470,"Y":150},{"Type":"Cube","X":2490,"Y":150},{"Type":"Cube","X":2510,"Y":150},{"Type":"Cube","X":2530,"Y":150},{"Type":"Cube","X":2570,"Y":300},{"Type":"Cube","X":2590,"Y":300},{"Type":"Cube","X":2610,"Y":300},{"Type":"Cube","X":2630,"Y":300},{"Type":"Cube","X":2650,"Y":300},{"Type":"Cube","X":2670,"Y":300},{"Type":"Cube","X":2550,"Y":170},{"Type":"Cube","X":2570,"Y":190},{"Type":"CubePortal","X":2580,"Y":260},{"Type":"Cube","X":2690,"Y":300},{"Type":"Cube","X":2710,"Y":300},{"Type":"Cube","X":2730,"Y":300},{"Type":"Jumper","X":2750,"Y":280},{"Type":"Cube","X":3030,"Y":300},{"Type":"Cube","X":3010,"Y":300},{"Type":"Cube","X":2990,"Y":300},{"Type":"Cube","X":2970,"Y":300},{"Type":"Cube","X":2950,"Y":300},{"Type":"Cube","X":2930,"Y":300},{"Type":"Cube","X":2910,"Y":300},{"Type":"Cube","X":2890,"Y":300},{"Type":"Spike","X":2790,"Y":380},{"Type":"Spike","X":2750,"Y":400},{"Type":"Spike","X":2860,"Y":390},{"Type":"Spike","X":2830,"Y":400},{"Type":"Spike","X":2890,"Y":380},{"Type":"Spike","X":2730,"Y":360},{"Type":"Spike","X":2210,"Y":390},{"Type":"Spike","X":2260,"Y":380},{"Type":"Spike","X":2240,"Y":380},{"Type":"Spike","X":2190,"Y":350},{"Type":"Spike","X":2370,"Y":370},{"Type":"Spike","X":2300,"Y":390},{"Type":"Spike","X":2320,"Y":400},{"Type":"Spike","X":2340,"Y":370},{"Type":"Spike","X":2310,"Y":360},{"Type":"Spike","X":2410,"Y":370},{"Type":"Spike","X":2420,"Y":380},{"Type":"Spike","X":2450,"Y":380},{"Type":"Spike","X":2490,"Y":360},{"Type":"Spike","X":2530,"Y":340},{"Type":"Spike","X":2560,"Y":340},{"Type":"Spike","X":2570,"Y":360},{"Type":"Spike","X":2490,"Y":400},{"Type":"Spike","X":2420,"Y":410},{"Type":"Spike","X":2350,"Y":420},{"Type":"Spike","X":2330,"Y":390},{"Type":"Cube","X":3050,"Y":300},{"Type":"OrbDown","X":3180,"Y":290},{"Type":"Spike","X":3100,"Y":350},{"Type":"Cube","X":3170,"Y":110},{"Type":"Cube","X":3190,"Y":110},{"Type":"Cube","X":3210,"Y":110},{"Type":"Cube","X":3230,"Y":110},{"Type":"Cube","X":3250,"Y":110},{"Type":"Cube","X":3270,"Y":110},{"Type":"Cube","X":3290,"Y":110},{"Type":"Cube","X":3310,"Y":110},{"Type":"Cube","X":3330,"Y":110},{"Type":"Cube","X":3350,"Y":110},{"Type":"Cube","X":3370,"Y":110},{"Type":"Cube","X":3390,"Y":110},{"Type":"Cube","X":3410,"Y":110},{"Type":"Cube","X":3430,"Y":110},{"Type":"Cube","X":3450,"Y":110},{"Type":"Cube","X":3470,"Y":110},{"Type":"Cube","X":3490,"Y":110},{"Type":"Cube","X":3510,"Y":110},{"Type":"Cube","X":3530,"Y":110},{"Type":"Jumper","X":3560,"Y":120},{"Type":"Cube","X":3550,"Y":110},{"Type":"OrbDown","X":3610,"Y":330},{"Type":"OrbDown","X":3560,"Y":330},{"Type":"OrbDown","X":3660,"Y":330},{"Type":"OrbDown","X":3710,"Y":330},{"Type":"Cube","X":3540,"Y":490},{"Type":"Cube","X":3560,"Y":490},{"Type":"Cube","X":3580,"Y":490},{"Type":"Cube","X":3600,"Y":490},{"Type":"Cube","X":3620,"Y":490},{"Type":"Cube","X":3640,"Y":490},{"Type":"Cube","X":3660,"Y":490},{"Type":"Cube","X":3680,"Y":490},{"Type":"Cube","X":3700,"Y":490},{"Type":"Cube","X":3720,"Y":490},{"Type":"Cube","X":3740,"Y":490},{"Type":"Cube","X":3760,"Y":490},{"Type":"Cube","X":3780,"Y":490},{"Type":"Cube","X":3800,"Y":490},{"Type":"Spike","X":3370,"Y":120},{"Type":"Cube","X":3820,"Y":490},{"Type":"Cube","X":3840,"Y":490},{"Type":"Cube","X":3860,"Y":490},{"Type":"Cube","X":3880,"Y":490},{"Type":"Jumper","X":3890,"Y":470}];

document.getElementById("textmapjson").value = JSON.stringify({"music":"music.mp3","obj":objects});

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
	bglightr = 0;
	bglightg = 0;
	bglightb = 0;

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
var dta = 0;
var framedelay = 1;
var fi = 0;
var bglightr = 0;
var bglightg = 0;
var bglightb = 0;
var mp = 1;
function gameloop() {
	if (isatmenu) {
		lastUpdate = now;
	}else {
		var now = Date.now();
		dt = (now - lastUpdate) ;
		
		fi++;
		if (fi < framedelay) {
			lastUpdate = now; //or else only the fps will drop. we need to drop physics too.
			requestAnimationFrame(gameloop);
			return;
		};
		fi = 0;
		bglightr -= mp;
		bglightg -= mp;
		bglightb -= mp;
		dta = Math.floor(dt / normaltime);
		mp = 1;
		if (dt / normaltime < 1) {
			mp = dt / normaltime;
		}
		if (dta == 0) { // loop amount
			dta = 1;
		}
		//alert(dtl)
		//dt = (dt % 1) + 1;
		
		for (let i = 0; i < dta; i++) {
			if (isdown) {
				downcounter += 1 * mp;
				if (playertype == "Plane") {
					ct = downcounter / 2;
					if (ct > 4) {
						ct = 4
					}
					velocityY = -ct;
				}
			}
			
			playerx += (playerspeed * mapdirection) * mp //* (dt / normaltime);
			camx -= ((camx - (playerx - ((canvas.width / 1366) * 350))) / camspeed) * mp// * (dt / normaltime);
			camy -= ((camy - (playery - canvas.height + ((canvas.height / 635) * 350))) / camspeed) * mp //* (dt / normaltime)
			playery += ((gravitydirection * velocityY) * mapdirection) * mp //* (dt / normaltime);
			renderandcol(i == 0);
			
			circlessize += circlessizeinc * mp;
			if (circlessize < 5) {circlessize = 5}
			if (circlessize == 5) {
				circlessizeinc = 1
			}
			if (circlessize > 25) {
				circlessizeinc = -1
			}
			if (gravitydirection == 1) {
				if (playery > 3000) {
					resetgame();
					i = dta;
				}
			}else {
				if (playery < -3000) {
					resetgame();
					i = dta;
				}
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
	var renderedobjects = 0;
	if (a)
	drawrectat(0,0,canvas.width,canvas.height,"rgb(" + bglightr + "," + bglightg + "," + bglightb + ")",3,true);
	objects.forEach((i) => {
		if (i.Type == "Cube") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					if (a)drawrectat(i.X - camx,i.Y - camy,25,25,"Blue",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
					renderedobjects++;
				}
			}
		}
		if (i.Type == "Rect") {
			//if (i.X - camx < canvas.width && i.X - camx + i.W > 0) {
				//if (i.Y - camy < canvas.height && i.Y - camy + i.H > 0) {
					if (a)drawrectat(i.X - camx,i.Y - camy,i.W,i.H,"Blue",3,true);
					handlecol(i.X, i.Y, i.W, i.H,i.Type);
					renderedobjects++;
				//}
			//}
		}
		if (i.Type == "Jumper") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					if (a)drawrectat(i.X - camx,(i.Y + 15) - camy,25,10,"Orange",3,true);
					handlecol(i.X, i.Y + 15, 25, 10,i.Type);
					renderedobjects++;
				}
			}
		}
		if (i.Type == "Spike") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawtrigat(i.X - camx,i.Y - camy,25,25,"Red",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
					renderedobjects++;
				}
			}
		}
		if (i.Type == "OrbJump") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawcircleat(i.X - camx,i.Y - camy,circlessize,"Gold",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
					renderedobjects++;
				}
			}
		}
		if (i.Type == "OrbDown") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawcircleat(i.X - camx,i.Y - camy,circlessize,"DeepSkyBlue",3,true);
					handlecol(i.X, i.Y, 25, 25,i.Type);
					renderedobjects++;
				}
			}
		}
		if (i.Type == "PlanePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"Orange",3,true);
					handlecol(i.X, i.Y, 25, 50,i.Type);
					renderedobjects++;
				}
			}
		}
		if (i.Type == "CubePortal") {
			if (i.X - camx + 25 < canvas.width) {
				if (i.Y - camy + 25 < canvas.height) {
					if (a)drawrectat(i.X - camx,(i.Y - 25) - camy,25,50,"DeepSkyBlue",3,true);
					handlecol(i.X, i.Y, 25, 50,i.Type);
					renderedobjects++;
				}
			}
		}
	})
	//ctx.translate((playerx - camx + 12.5), (playery - camy + 12.5));
	if (a) {
		ctx.translate(playerx - camx + 12.5, playery - camy + 12.5);
		ctx.rotate(Math.PI / 180 * charrotation);
		drawrectat(-12.5,-12.5,25,25, playertype == "Cube" ? "LightBlue" : "gold",0,true);
		ctx.rotate(Math.PI / 180 * -charrotation);
		ctx.translate(-(playerx - camx + 12.5), -(playery - camy + 12.5));
		ctx.fillStyle = "white";
		ctx.font = "30px Sans Serif";
		ctx.fillText(Math.floor((playerx / levellength) * 100) + "%",0,30);
		ctx.fillStyle = "white";
		ctx.font = "12px Sans Serif";
		ctx.fillText("Frame Delay:" + dt + ", Loops:" + dta + ", Rendered:" + renderedobjects + (framedelay != 1 ? " CUSTOM FPS" : "") + " MP:" + mp,0,60);
	}
	if (falling) {
		if (playertype == "Cube") {
			velocityY += 0.7 * mp;
		}else {
			velocityY += ((8 - velocityY) / 8) * mp;
		}
		if (velocityY > 32) {
			velocityY = 32
		}
		if (playertype == "Cube") {
			charrotation += 10 * mp;
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
			if (gravitydirection == 1 && playery <= y - 1) {
				if (playerx > x) {
					if (playerx <= xw) {
						velocityY = 0;
						playery = y - 25
						falling = false;
						if (isdown && playertype == "Cube") {
							velocityY -= 10;
						}
					}
				}
			}else if (gravitydirection == -1 && playery <= y + 26) {
				if (playerx > x) {
					if (playerx <= xw) {
						velocityY = 0;
						playery = y + 25
						falling = false;
						if (isdown) {
							velocityY -= 10;
						}
					}
				}
			}else {
				if (playery <= yh - 1) {
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
							falling = false;
							bglightr = 50;
							bglightg = 50;
							downcounter = 5;
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
						falling = false;
						drawcircleat(x - camx,y - camy,50,"yellow",2,false);
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
							//if (gravitydirection == 1)
							gravitydirection = -gravitydirection;
							//else
							//	gravitydirection = 1;
							velocityY = 12;
							falling = false;
							bglightb = 50;
							bglightg = 50;
							downcounter = 5;
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
		if (toolindex == -1) {
			var x = Math.round((camx + mpx) / 5) * 5;
			var y = Math.round((camy + mpy) / 5) * 5;
			objects.forEach(function(i,r) {
				if (i.X == x && i.Y == y) {
					delete objects[r];
				}
			});
		}else {
			let i = {
				Type: tools[toolindex],
				X: Math.round((camx + mpx) / 5) * 5,
				Y: Math.round((camy + mpy) / 5) * 5
			}
			objects.push(i);
		}
	})
	document.body.addEventListener("touchend",function(e) {
		mpx = e.clientX;
		mpy = e.clientY;
		let i = {
			Type: tools[toolindex],
			X: Math.round((camx + mpx) / 5) * 5,
			Y: Math.round((camy + mpy) / 5) * 5
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
	if (e.key == " ") {
		isdown = true;
	}
	if (e.key == "e" && !editor) {
		isdown = true;
	}
})

document.body.addEventListener("keyup",function(e) {
	pressedkeys.splice(pressedkeys.indexOf(e.key),1);
	if (e.key == "n") {
		toolindex += 1;
		if (toolindex > tools.length - 1) {
			toolindex = tools.length -1;
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
		prompt("Map:", JSON.stringify({"music":"music.mp3","obj":objects}));
	}
	if (e.key == " ") {
		isdown = false;
		downcounter = 0;
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
	
	if (toolindex == -1) {
		var x = Math.round((camx + mpx) / 5) * 5;
		var y = Math.round((camy + mpy) / 5) * 5;
		objects.forEach(function(i,r) {
			if (i.X == x && i.Y == y) {
				drawrectat(i.X - camx - 5,i.Y - camy - 5,35,35,"red",3,false);
			}
		});
	}
	
	{
		let i = {
			Type: (toolindex == -1) ? "r" : tools[toolindex],
			X: Math.round((camx + mpx) / 5) * 5,
			Y: Math.round((camy + mpy) / 5) * 5
		}
		if (i.Type == "r") {
			if (i.X - camx < canvas.width && i.X - camx + 25 > 0) {
				if (i.Y - camy < canvas.height && i.Y - camy + 25 > 0) {
					drawrectat(i.X - camx,i.Y - camy,25,25,"red",3,false);
				}
			}
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