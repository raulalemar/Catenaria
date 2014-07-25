describe("Feature: creating electric lines", function() {
	var div; 
	describe("Scenary: Drawing catenary", function() {
		div = document.getElementById("div1");
		var scene = new Scene(div);
		var catenaryGraph = new CatenaryGraph();
		it("Given instances scene and a graph of catenary created", function() {
			expect(scene instanceof Scene).toBe(true);
			expect(catenaryGraph instanceof CatenaryGraph).toBe(true);
		});
		scene.add(catenaryGraph);
		it("and adding the graph to scene.", function() {

		});		
		scene.plotSVG();
		it("Then scene.plotSVG() should produce a graph of a catenary.", function() {
			var funEl = scene.svgElement.getElementById(catenaryGraph.identificator);
			expect(funEl).toBe(catenaryGraph.svgElement);
		});
	});
	
	describe("Scenario: Ploting a pole", function() {
		div = document.getElementById("div2");
		var scene = new Scene(div);
		var pole = new Pole(50,0,80);
		it("Given instances scene and a pole created", function() {
			expect(scene instanceof Scene).toBe(true);
			expect(pole instanceof Pole).toBe(true);
		});
		scene.add(pole);
		it("and adding the graph to scene.", function() {
		});
		scene.plotSVG();
		it("Then scene.plotSVG() should produce a pole.", function() {
			var poleElement = scene.svgElement.getElementById(pole.identificator);
			console.log(poleElement.getBoundingClientRect());
			expect(poleElement).toBe(pole.svgElement);
		});
	});
	
})
