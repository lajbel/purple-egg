// Import components and plugins /////////////////////////////////////////////////////////

import { newgroundsPlugin } from "./plugins/newgrounds.js";
import { drag } from "./plugins/components/drag.js";

// Kaboom ////////////////////////////////////////////////////////////////////////////////

export const k = kaboom({
	width: 600,
	height: 600,
    letterbox: true,
    touchToMouse: true,
    font: "sinko",
    curDraggin: null,
    clearColor: [0, 0, 0, 1],
    plugins: [ newgroundsPlugin ]
});

// Load Assets and Newgrounds ////////////////////////////////////////////////////////////

const eggs = [
    "mark", "madness", "omni", 
    "ahegao", "creeper", "roblox", 
    "xd", "papa", "alien", 
    "sad", "joy", "furry", 
    "angry", "steve", "pacman", 
    "sus", "think", "chapo", 
    "flushed", "synj", "boyfriend", 
    "clasic", "uwu", "woman", 
    "nerd", "stupid"
];

eggs.map(e => loadSprite(e, `./sprites/${e}.png`));

loadSprite("background", "./sprites/background.png");
loadSound("music", "./sounds/music.ogg");
loadSprite("newgrounds", "./sprites/newgrounds.png");

ngInit("", "");

// Scenes ////////////////////////////////////////////////////////////////////////////////

// Splash Scene ////////////////////////////////

scene("splash", async () => {
	let show = false;
    let splashTime = 0; 

	const ng = add([
		sprite("newgrounds"),
		origin("center"),
		color(rgba(255, 255, 255, 0)),
		scale(1),
		pos(width() / 2, height() / 2)
	]);

    ng.action(() => {
        if(time() > splashTime + 0.01 && !show) {
            splashTime = time();
            if(ng.color.a < 1) ng.color.a += 0.01;
            else wait(2, () => show = true);
        }
        else {
            if(ng.color.a > 0) ng.color.a -= 0.01;
            else wait(1, () => go("game"));
        };

        if(keyIsPressed() || mouseIsClicked()) {
            go("game");
        };
    });
});

// Game Scene //////////////////////////////////

scene("game", () => {
    const eggsForSpawn = 100;
	let purpleEgg;
	let hasWin;

	layers(["background", "game", "ui"]);
	
	add([
		rect(width(), height()),
		color(rgb(255, 0, 255)),
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
		let egg = add([
			sprite(choose(eggs)),
			pos(rand(width()), rand(height())),
			scale(7),
			origin("center"),
            area(),
			drag(),
			layer("game"),
			i !== 0 ? color(rgb(255, 255, 255)) : color(rgb(255, 0, 255)),
			{
				dragged: false
			}
		]);

		if(i == 0) purpleEgg = egg;
	}

	const timer = add([
		text(0, {size: 50}),
		color(rgb(229, 207, 64)),
		pos(15, 15),
		layer("ui"),
		{
			time: 0,
		},
	]);

	timer.action(() => {
		if(hasWin == true) return;

		timer.time += dt();
		timer.text = timer.time.toFixed(2).toString().replace(".", ":");
	});

	purpleEgg.action(() => {
		if(purpleEgg.dragged) {
			hasWin = true;
            ngUnlockMedal(63941);
			music.stop();
		};

		if(hasWin == true && !purpleEgg.dragged) {
            ngPostScore(10455, Number(timer.time.toFixed(2).toString().replace(".", "")));
			
			wait(0.4, () => go("game"));
		};
	});

	// Input

    action(() => {
        if(mouseIsReleased()) {
            k.curDraggin = null
        };

        if(keyIsPressed("f")) {
            fullscreen(!fullscreen());
        };
    });
});

// Start Scene ///////////////////////////////////////////////////////////////////////////

go("splash");

