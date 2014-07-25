describe("Feature: creating electric lines", function() {
	var div = document.createElement('div');
	div.setAttribute('style', 'height:100px; max-width:100px;'); 	
	describe("Scenary: Drawing catenary", function() {
		//document.body.appendChild(div);
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
		var scene = new Scene(div);
		var pole = new Pole(0,0,30);
		it("Given instances scene and a pole created", function() {
			expect(scene instanceof Scene).toBe(true);
			expect(pole instanceof Pole).toBe(true);
		});
		scene.add(pole);
		it("and adding the graph to scene.", function() {
		});
		console.log(pole);
		console.log(scene);
		console.log(scene.elements._lista[0]);
		scene.plotSVG();
		it("Then scene.plotSVG() should produce a pole.", function() {
			var poleElement = scene.svgElement.getElementById(pole.identificator);
			expect(poleElement).toBe(pole.svgElement);
		});
	});
	
})
