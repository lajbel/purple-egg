import { k } from "../../game.js";

function drag() {
	let offset = vec2(0);

	return {
		id: "drag",
		require: [ "pos", "area", ],
		add() {
			this.clicks(() => {
				if(k.curDraggin) return;
                this.dragged = true;

				k.curDraggin = this;
				offset = mousePos().sub(this.pos);

				readd(this);
			});
		},
		update() {
			if (k.curDraggin === this) {
				this.pos = mousePos().sub(offset);
			}
            else {
                this.dragged = false;
            }
		},
	};

}

export { drag };