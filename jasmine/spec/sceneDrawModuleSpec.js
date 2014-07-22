var DIV1 = document.getElementById("div1");
DIV1 = DIV1 || document.createElement("div");
console.log(DIV1.offsetHeight);

describe("Creating standard plot:", function() {
	var scene = new Scene(DIV1); //crear scene
	var functionGraph = new FunctionGraph(); //cerar graph of a function
	scene.add(functionGraph); //add the graph to scene
	scene.plotSVG(); //plot
	it("should plot a graph of a quadratic recurrence equation function", function() {
		expect(DIV1 instanceof HTMLElement).toBe(true);
	});
});

