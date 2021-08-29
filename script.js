// Import components

import drag from "./components/drag.js";

// Game

const k = kaboom({
	global: true,
	width: 600,
	height: 600,
	debug: false,
    letterbox: true,
	canvas: document.getElementById("game"),
	clearColor: [0, 0, 0, 1],
    curDraggin: null
});

// Load assets 

const eggs = ["madness", "omni", "ahegao", "creeper", "roblox", "xd", "papa", "alien", "sad", "joy", "furry", "angry", "steve", "pacman", "sus", "think", "chapo", "flushed", "synj", "boyfriend", "clasic", "uwu", "woman", "nerd", "stupid"]
eggs.map(e => loadSprite(e, `./sprites/${e}.png`))

loadSprite("background", "./sprites/background.png");
loadSound("music", "./sounds/music.ogg");
loadSprite("newgrounds", "./sprites/newgrounds.png");

// SplashScreens

scene("splash", async () => {
	var show = false; 

	const ng = add([
		sprite("newgrounds"),
		origin("center"),
		color(1, 1, 1, 0),
		scale(1.5),
		pos(width() / 2, height() / 2)
	]);

	loop(0.01, () => {
		if(show) return;

		if(ng.color.a >= 1) wait(1, () => show = true)
		else ng.color.a += 0.01;
	});

	loop(0.01, () => {
		if(!show) return;

		ng.color.a -= 0.01;

		if(ng.color.a <= 0) wait(0.8, () => go("main"));
	});
});

scene("main", () => {
    const eggsForSpawn = 100;
	let purpleEgg;
	let hasWin;

	layers(["background", "game", "ui"]);
	
	add([
		rect(width(), height()),
		color(rgba(1, 0, 1, 1)),
		pos(0, 0)
	]);

	add([
		sprite("background"),	
		pos(0, 0),
		layer("background")
	]);

	const music = play("music");
	music.loop();
	music.volume(0.5);

	for (let i = 0; i < eggsForSpawn; i++) {
		var egg = add([
			sprite(choose(eggs)),
			pos(rand(width()), rand(height())),
			scale(7),
			origin("center"),
            area(),
			drag(),
			layer("game"),
			i !== 0 ? color(1, 1, 1) : color(1, 0, 1),
			{
				dragged: false
			}
		]);

		if(i == 0) purpleEgg = egg;
	}

	const timer = add([
		text(0, 30),
		color(rgb(136, 255, 0)),
		pos(2, 10),
		layer("ui"),
		{
			time: 0,
		},
	]);

	timer.action(() => {
		if(hasWin == true) return;

		timer.time += dt();
		timer.text = timer.time.toFixed(2);
	});

	purpleEgg.action(() => {
		if(purpleEgg.dragged) {
			hasWin = true;
			music.stop()
		};

		if(hasWin == true && !purpleEgg.dragged) {
			// const newgroundsScore = Number(timer.time.toFixed(2).toString().replace(".", ""));
			// const gamejoltScore = timer.time.toFixed(2).toString().replace(".", ":");
			
            music.stop();
			wait(0.4, () => go("main"))
		};
	});

	// Input

    mouseRelease(() => k.curDraggin = null);
});

go("main");

export default k;