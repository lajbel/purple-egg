import drag from "./components/drag.js";

Newgrounds.Init("fun", "raid");

var k = kaboom({
	global: true,
	width: 600,
	height: 600,
	debug: false,
	canvas: document.getElementById("game"),
	clearColor: [0, 0, 0, 1]
});

// Load assets 

var eggs = ["madness", "omni", "ahegao", "creeper", "roblox", "xd", "papa", "alien", "sad", "joy", "furry", "angry", "steve", "pacman", "sus", "think", "chapo", "flushed", "synj", "boyfriend", "clasic", "uwu", "woman", "nerd", "stupid"]
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
	var sdata = sceneData();
	sdata.curDraggin = null;
	
	var theEgg;
	var isPosted = false;
	var win;


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
	])

	const music = play("music");
	music.loop();
	music.volume(0.5);

	for (let i = 0; i < 100; i++) {
		var egg = add([
			sprite(choose(eggs)),
			pos(rand(width()), rand(height())),
			scale(7),
			origin("center"),
			drag(),
			layer("game"),
			i !== 0 ? color(1, 1, 1) : color(1, 0, 1),
			{
				dragged: false
			}
		]);

		if(i == 0) theEgg = egg;
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
		if(win == true) return;

		timer.time += dt();
		timer.text = timer.time.toFixed(2);
	});

	theEgg.action(() => {
		if(theEgg.dragged) {
			win = true;
			music.stop()
		};

		if(win == true && !theEgg.dragged) {
			const newScore = Number(timer.time.toFixed(2).toString().replace(".", ""));

			if(!isPosted) {
				isPosted = true;

				Newgrounds.PostScore(0, newScore);
				Newgrounds.UnlockMedal(0);		
			}

			wait(0.4, () => go("main"))
		};
	});

	// Input

	action(() => {
		if(mouseIsReleased()) {
			sdata.curDraggin = null;
		};
	});

});

start("splash");

export default k;