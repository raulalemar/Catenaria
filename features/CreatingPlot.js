describe("Feature: Create a plot of a function, as developer, so that I can present data, I want to plot a graph", function() {
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

	describe("Background: Having scene, and functionGraph created", function() {
		var div = document.getElementById('div2');
		var scene = new Scene(div);
		
		describe("Scenario: Scaling <svg> to fit horizontal <div>", function() {
			var functionGraph = new FunctionGraph();
			scene.add(functionGraph); 
			scene.plotSVG();
			it("should fit well", function() {
				expect(true).toBe(true);
			});
		});
	});

	describe("Scenario: Scaling horizontal <svg> to fit squared <div>", function() {
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

	describe("Scaling vertical <svg> to fit squared <div>", function() {
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
