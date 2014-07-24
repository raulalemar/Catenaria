describe("new CatenaryGraph()", function() {
	var catenaryGraph;
	beforeEach(function() {
		catenaryGraph = new CatenaryGraph();
	});
});


describe("pideLongitud", function() {
	it("llama promp", function() {
		spyOn(window, 'prompt');
		pideLongitud();
		expect(prompt).toHaveBeenCalled();
	})
	it("devuelva valor intorducido", function() {
		spyOn(window, 'prompt').and.returnValue(901);
		expect(pideLongitud()).toBe(901);
	})
})

describe("new Pole()", function() {
	var pole;
	beforeEach(function() {
		pole = new Pole();
	});

	describe("#svgElement", function() {
		it("should be null", function() {
			expect(pole.svgElement).toBeNull();
		});
		describe("after calling #updateSVG()",function() {
			describe("without parentSceneNode", function() {
				beforeEach(function() {
					pole.updateSVG();
				});
				it("should be a SVGElement", function() {
					expect(pole.svgElement instanceof SVGElement).toBe(true);
				});
				it("should have a 'pole' class", function() {
					expect(pole.svgElement).toContainClass("pole");
				});
				it("should have attribute", function () {
					expect(pole.svgElement.hasAttribute('id')).toBe(true);
				});
			});
		});
	});
			
  describe("#tipo", function() {
    it("cuando creas un poste sin parametro tipo, su tipo es suspension", function() {
      expect(pole.tipo).toBe('suspension');
    })
  })
})


describe("How to create a graph of a catenary", function() {
	var div = document.createElement('div');
	div.setAttribute('style', 'height:100px; max-width:100px;'); 
	//document.body.appendChild(div);
	var scene = new Scene(div);
	var catenaryGraph = new CatenaryGraph();
	scene.add(catenaryGraph);
	scene.plotSVG();
	it("should produce a graph of a catenary", function() {
		var funEl = scene.svgElement.getElementById(catenaryGraph.identificator);
		expect(funEl).toBe(catenaryGraph.svgElement);
	});
})
