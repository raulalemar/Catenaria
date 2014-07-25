describe("new CatenaryGraph()", function() {
	var catenaryGraph;
	beforeEach(function() {
		catenaryGraph = new CatenaryGraph();
	});
	it("should be instance of FunctionGraph", function() {
		expect(catenaryGraph).toBeInstanceOf(FunctionGraph);
	});
	
	describe("#svgElement", function() {
		describe("after calling #plotSVG", function() {
			describe("without parentSceneNode", function() {
				beforeEach(function() {
					catenaryGraph.plotSVG();
				});
				it("should have a 'catenaryGraph' class", function() {
					expect(catenaryGraph.svgElement).toContainClass("catenaryGraph");
				})
			})
		})
	})
})

describe("new Pole()", function() {
	var pole;
	beforeEach(function() {
		pole = new Pole();
	});
	describe("#identificatod", function() {
		//it("sho")
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
			
  describe("#type", function() {
    it("shoud be null", function() {
      expect(pole.tipo).toBe('suspension');
    })
  })
})




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

