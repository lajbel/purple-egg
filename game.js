// Import components and plugins /////////////////////////////////////////////////////////

import { newgroundsPlugin } from "./plugins/newgrounds.js";
import { drag } from "./plugins/components/drag.js";

// Kaboom ////////////////////////////////////////////////////////////////////////////////

export const k = kaboom({
    width: 600,
    height: 600,
    stretch: false,
    font: "sinko",
    curDraggin: null,
    clearColor: [255, 0, 255],
    plugins: [newgroundsPlugin]
});

// Load Assets and Newgrounds Init ///////////////////////////////////////////////////////

const eggs = [
    "mark", "madness", "omni",
    "ahegao", "creeper", "roblox",
    "xd", "papa", "alien",
    "sad", "joy", "furry",
    "angry", "steve", "pacman",
    "sus", "think", "chapo",
    "flushed", "synj", "boyfriend",
    "clasic", "uwu", "woman",
    "nerd", "stupid", "stepford",
    "slick"
];

eggs.map(e => loadSprite(e, `./sprites/${e}.png`));

loadSprite("background", "./sprites/background.png");
loadSound("music", "./sounds/music.ogg");
loadSprite("newgrounds", "./sprites/newgrounds.png");

ngInit("", "");

// Scenes ////////////////////////////////////////////////////////////////////////////////

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
        if (time() > splashTime + 0.01 && !show) {
            splashTime = time();
            if (ng.color.a < 1) ng.color.a += 0.01;
            else wait(2, () => show = true);
        }
        else {
            if (ng.color.a > 0) ng.color.a -= 0.01;
            else wait(1, () => go("game"));
        };
    });

    action(() => {
        if (keyIsPressed("enter") || keyIsPressed("space")) {
            go("game", false);
        };

        if(keyIsPressed("t")) {
            go("game", true)
        };
    });
});

scene("game", (tmode) => {
    // Vars and config

    layers(["game", "ui"]);

    let eggsForSpwan = tmode ? 200 : 100;
    let purpleEgg;
    let win;

    const music = play("music", { loop: true, volume: 0.5 });

    // Characters and gui 

    add([ sprite("background") ]);

    for (let i = 0; i < eggsForSpwan; i++) {
        let egg = add([
            sprite(choose(eggs)),
            pos(rand(width()), rand(height())),
            scale(7),
            origin("center"),
            area(),
            drag(),
            layer("game"),
            i !== 0 ? color(rgb(255, 255, 255)) : color(rgb(255, 0, 255)),
            "egg",
            {
                dragged: false
            }
        ]);

        if (i == 0) purpleEgg = egg;
    };

    const timer = add([
        text(0, { size: 50 }),
        color(rgb(229, 207, 64)),
        pos(15, 15),
        layer("ui"),
        {
            time: 0,
        },
    ]);

    // Events

    hovers("egg", () => {
        cursor("pointer");
    });

    timer.action(() => {
        if (win == true) return;

        timer.time += dt();
        timer.text = timer.time.toFixed(2).toString().replace(".", ":");
    });

    purpleEgg.action(() => {
        if (purpleEgg.dragged) {
            win = true;

            ngUnlockMedal(63941);
            music.stop();

            if (purpleEgg.sprite == "clasic") ngUnlockMedal(65362);
            else if (purpleEgg.sprite == "alien") ngUnlockMedal(65358);
            else if (purpleEgg.sprite == "angry") ngUnlockMedal(65359);
            else if (purpleEgg.sprite == "ahegao") ngUnlockMedal(65357);
            else if (purpleEgg.sprite == "boyfriend") ngUnlockMedal(65360);
            else if (purpleEgg.sprite == "chapo") ngUnlockMedal(65361);
            else if (purpleEgg.sprite == "flushed") ngUnlockMedal(65364);
            else if (purpleEgg.sprite == "creeper") ngUnlockMedal(65363);
            else if (purpleEgg.sprite == "furry") ngUnlockMedal(65365);
            else if (purpleEgg.sprite == "joy") ngUnlockMedal(65366);
            else if (purpleEgg.sprite == "madness") ngUnlockMedal(65367);
            else if (purpleEgg.sprite == "nerd") ngUnlockMedal(65368);
            else if (purpleEgg.sprite == "omni") ngUnlockMedal(65369);
            else if (purpleEgg.sprite == "pacman") ngUnlockMedal(65370);
            else if (purpleEgg.sprite == "papa") ngUnlockMedal(65371);
            else if (purpleEgg.sprite == "roblox") ngUnlockMedal(65372);
            else if (purpleEgg.sprite == "sad") ngUnlockMedal(65373);
            else if (purpleEgg.sprite == "slick") ngUnlockMedal(65383);
            else if (purpleEgg.sprite == "steve") ngUnlockMedal(65374);
            else if (purpleEgg.sprite == "stupid") ngUnlockMedal(65375);
            else if (purpleEgg.sprite == "sus") ngUnlockMedal(65376);
            else if (purpleEgg.sprite == "woman") ngUnlockMedal(65380);
            else if (purpleEgg.sprite == "xd") ngUnlockMedal(65381);
            else if (purpleEgg.sprite == "stepford") ngUnlockMedal(65382);
            else if (purpleEgg.sprite == "synj") ngUnlockMedal(65377);
            else if (purpleEgg.sprite == "think") ngUnlockMedal(65378);
            else if (purpleEgg.sprite == "mark") ngUnlockMedal(65384);
            else if (purpleEgg.sprite == "uwu") ngUnlockMedal(65379);
        };

        if (win == true && !purpleEgg.dragged) {
            if(tmode) ngPostScore(10820, Number(timer.time.toFixed(2).toString().replace(".", "")));
            else ngPostScore(10455, Number(timer.time.toFixed(2).toString().replace(".", "")));

            wait(0.8, () => go("game"));
        };
    });

    // Input

    action(() => {
        if (mouseIsReleased()) {
            k.curDraggin = null
        };

        if (keyIsPressed("f")) {
            fullscreen(!fullscreen());
        };

        if (keyIsPressed("r")) {
            music.stop();
            go("game", false);
        };

        if (keyIsPressed("escape")) {
            music.stop();
            go("splash");
        };
    });
});

// Start Scene ///////////////////////////////////////////////////////////////////////////

go("splash");