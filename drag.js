import k from "./script.js";

function drag() {
	var offset = vec2(0);
	var sdata = sceneData();

	return {
		id: "drag",
		require: [ "pos", "area", ],
		add() {
			this.clicks(() => {
				if (sdata.curDraggin) {
					return;
				}
				sdata.curDraggin = this;
				offset = mousePos().sub(this.pos);
				readd(this);
			});
		},
		update() {
			if (sdata.curDraggin === this) {
				this.dragged = true;
				this.pos = mousePos().sub(offset);
			} else {
				this.dragged = false;
			}
		},
	};
};

export default drag;