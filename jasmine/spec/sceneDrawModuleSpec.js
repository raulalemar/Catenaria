var DIV1 = document.getElementById("div1");
DIV1 = DIV1 || document.createElement("div");

describe("Creating standard plot:", function() {
	describe("after creating a scene", function() {
		var scene = new Scene();
		scene.updateTagSVG();
		it("should plot a graph of a quadratic recurrence equation function", function() {
			expect(DIV1 instanceof HTMLElement).toBe(true);
		});
	});
});
