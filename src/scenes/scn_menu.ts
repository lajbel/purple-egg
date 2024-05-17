import { k } from "../engine";

const eggs = [
    "uwu",
    "nerd",
    "xd",
    "synj",
    "alien",
    "b",
];

const X_OFFSET = 4;
const TOP_OFFSET = 15;
const BOTTOM_OFFSET = 15;
const SPAWN_AREA = k.vec2(k.width() - X_OFFSET, k.height() - BOTTOM_OFFSET);

k.scene("menu", () => {
    let eggCount = 100;

    k.add([
        k.rect(k.width(), k.height()),
        k.color("#0e0e37"),
    ]);

    const computerFrame = k.add([
        k.z(40),
        k.stay(),
    ]);

    computerFrame.add([
        k.sprite("computer"),
    ]);

    computerFrame.add([
        k.sprite("button"),
        k.pos(0, k.height() - 12),
    ]);

    for (let i = 0; i < eggCount; i++) {
        const eggColor = i === 0 ? "#6a0dad" : "#ffffff";
        const eggFrame = eggs.indexOf(k.choose(eggs));

        k.add([
            k.sprite("eggs", { frame: eggFrame }),
            k.color(eggColor),
            k.z(10),
            k.pos(
                k.randi(X_OFFSET, SPAWN_AREA.x),
                k.randi(TOP_OFFSET, SPAWN_AREA.y),
            ),
            k.anchor("center"),
        ]);
    }
});
