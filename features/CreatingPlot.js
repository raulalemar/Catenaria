describe("Feature: Crear plots of functions", function() {
	describe("Scenario: Creating standard square plot in rectanguled div", function() {
		var div = document.getElementById("div1");
		//var div = document.createElement('div');
		var scene = new Scene(div); //crear scene
		it("Given instance of Scene",function() {
			expect(scene).toBeInstanceOf(Scene);
		});
		var functionGraph = new FunctionGraph(); //cerar graph of a function
		scene.add(functionGraph); 
		it("And instance of FunctionGraph added to scene",function() {
			expect(functionGraph).toBeInstanceOf(FunctionGraph);
			expect(scene.elements.length()).toBe(1);
		});
		scene.plotSVG();
		it("when ploting", function() {
			expect(functionGraph.svgElement).not.toBeNull();
		});
		it("Then the plot should contain a graph of a quadratic recurrence equation function", function() {
			var funEl = scene.svgElement.getElementById(functionGraph.identificator);
			expect(funEl).toBe(functionGraph.svgElement);
		});
		it("and the SVGElement of the scene should be fully inside the <div>.", function() {
			expect(scene.svgElement).toBeFullyContainedIn(div);
			//console.log(div.getBoundingClientRect());
			//console.log(scene.svgElement.getBoundingClientRect());
		})
	});

describe("Creating standard plot no div:", function() {
	var scene = new Scene(); //crear scene
	var functionGraph = new FunctionGraph(); //cerar graph of a function
	scene.add(functionGraph); //add the graph to scene
	scene.plotSVG(); //plot
	//console.log(scene.svgElement.outerHTML);
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
});
