describe("Creating standard plot:", function() {
	var div = document.getElementById("div1");
	var scene = new Scene(div); //crear scene
	var functionGraph = new FunctionGraph(); //cerar graph of a function
	scene.add(functionGraph); //add the graph to scene
	scene.plotSVG(); //plot
	it("should plot a graph of a quadratic recurrence equation function", function() {
		var funEl = document.getElementById(functionGraph.identificator);
		expect(funEl).toBe(functionGraph.svgElement);
	});
});

describe("Creating standard plot no div:", function() {
	var scene = new Scene(); //crear scene
	var functionGraph = new FunctionGraph(); //cerar graph of a function
	scene.add(functionGraph); //add the graph to scene
	scene.plotSVG(); //plot
	console.log(scene.svgElement.outerHTML);
	it("should plot a graph of a quadratic recurrence equation function", function() {
	});
});


describe("Scaling <svg> to fit <div>", function() {
	var div = document.getElementById('div2');
	var scene = new Scene(div);
	var functionGraph = new FunctionGraph();
	scene.add(functionGraph); 
	scene.plotSVG();
	it("should fit well", function() {
		expect(true).toBe(true);
	});
});

describe("Scaling <svg> to fit <div>", function() {
	var div = document.getElementById('div3');
	var scene = new Scene(div);
	var range = new Range(0,100,0,50);
	scene.range =range;
	var functionGraph = new FunctionGraph();
	functionGraph.range = range;
	scene.add(functionGraph); 
	scene.plotSVG();
	it("should fit well", function() {
		expect(true).toBe(true);
	});
});

describe("Scaling <svg> to fit <div>", function() {
	var div = document.getElementById('div4');
	var scene = new Scene(div);
	var range = new Range(0,50,0,100);
	scene.range =range;
	var functionGraph = new FunctionGraph();
	functionGraph.range = range;
	scene.add(functionGraph); 
	scene.plotSVG();
	it("should fit well", function() {
		expect(true).toBe(true);
	});
});
