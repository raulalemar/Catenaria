describe("new SceneElement()", function() {
  var element, element2;
  beforeEach(function() {
    element = new SceneElement();
  });
  describe("#parentSceneElement", function() {
    it("should be null", function() {
      expect(element.parentSceneElement).toBeNull();
    });
	});

	describe("#identificator", function() {
		it("should be null", function() {
			expect(element.identificator).toBeNull();
		});
	});

	describe("#svgElement", function() {
		it("should be null", function() {
			expect(element.svgElement).toBeNull();
		});
	});

});

describe("new Scene()", function() {
  var scene;
  var element;
  var numbersOfSVGtags;

  beforeEach(function() {
		numbersOfSVGtags = document.getElementsByTagName('svg').length;
    scene = new Scene(); 
    spyOn(scene.elements, 'add');
		spyOn(scene.elements, 'plotSVG');
  });
  
	it("should be instance of SceneElement", function() {
		expect(scene instanceof SceneElement).toBe(true);
	});

	it("al inicio no deberia crear svg", function() {
		expect(document.getElementsByTagName('svg').length).toBe(numbersOfSVGtags);
	});

	describe("#div", function() {
		it("should be null", function() {
			expect(scene.div).toBeNull();
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG()",function() {
			beforeEach(function () {
				scene.updateSVG();
			});
			it("should be an instance of SVGElement", function() {
				expect(scene.svgElement instanceof SVGElement).toBe(true);
			});
		});
	});

	describe("#elements", function() {
		it("should be instance of GroupOfSceneElements", function() {
			expect(scene.elements instanceof GroupOfSceneElements).toBe(true)
		});
	});

	describe("#range", function() {
		it("al inicion deberia tener xMin = 0", function() {
			expect(scene.range.xMin).toBe(0);
		});
	});

  describe("#add", function() {
    it("calls GroupOfSceneElements#add", function() {
      scene.add(element);
      expect(scene.elements.add).toHaveBeenCalled();
    });
  });
  
	describe("#plotSVG", function() {
		beforeEach(function() {
			spyOn(scene, 'updateSVG');
			scene.plotSVG();
		});
		it("should call updateSVG", function() {
			expect(scene.updateSVG).toHaveBeenCalled();
		});
		it("should call updateSVG", function() {
			expect(scene.elements.plotSVG).toHaveBeenCalled();
		});
	});
});

describe("new Scene(div)", function() {
	var div = document.createElement("div");
	var scene = new Scene(div);
	describe("#div", function() {
		it("should be HTTPElement 'div'", function() {
			expect(scene.div).toBe(div);
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG()",function() {
			beforeEach(function () {
				scene.updateSVG();
			});
			it("should have the div as parent", function() {
				expect(scene.svgElement.parentNode).toBe(div);
			});
			it("should be descendant of div", function() {
				expect(scene.svgElement).toBeDescendantOf(div);
			});
		});
	});
});

describe("new GroupOfSceneElementos()", function() {
	var elements;

	beforeEach(function() {
		elements = new GroupOfSceneElements();
	});

	it("should be instance of SceneElement", function() {
		expect(elements instanceof SceneElement).toBe(true);
	});

  describe("#length", function() {
    it("should be equal to 0 after the initialization", function() {
      expect(elements.length()).toBe(0);
    });
    it("deberia dar 1 si _lista tiene un element", function() {
      var element2;
      elements._lista.push(element2);
      expect(elements.length()).toBe(1);
    });
  });

  describe("#add", function() {
    it("deberia estar definido",function() {
      expect(elements.add).toBeDefined();
    });
    describe("despues de añadir un element", function() {
      var element;
      beforeEach(function() {
				element = {parentSceneElement: null};
				elements.add(element);
      });
      it("deberia asignar el parentSceneElement al element", function() {
				expect(element.parentSceneElement).toBe(elements);
      });
      it("deberia tener longitud 1", function() {
				expect(elements.length()).toBe(1);
      });
    });
  });
  
	describe("#plotSVG", function() {
		beforeEach(function() {
			element = {};
			element.plotSVG = jasmine.createSpy();
      elements.add(element);
			spyOn(elements, 'updateSVG');
			elements.plotSVG();
		});
		it("should call #updateSVG", function() {
			expect(elements.updateSVG).toHaveBeenCalled();
		});
		it("should call element#updateSVG", function() {
			expect(element.plotSVG).toHaveBeenCalled();
		});
	});

  describe("#remove", function() {

		var element = jasmine.createSpyObj('element', ['remove']);

    it("deberia estar definido", function() {
      expect(elements.remove).toBeDefined();
    });
    it("deberia eliminar el elmento de la lista", function() {
      elements.remove(element);
      expect(elements.length()).toBe(0);
    });
    it("deberia llamar remove de element", function() {
      elements.remove(element);
      expect(element.remove).toHaveBeenCalled();
    })
  });
});

describe("new GroupOfSceneElementos(scene)", function() {
	var scene;
	
	beforeEach(function() {
		scene = {
			svgElement: document.createElementNS("http://www.w3.org/2000/svg","svg")
		}; //double
		elements = new GroupOfSceneElements(scene);
	});

	describe("#parentSceneElement", function() {
		it("deberia tener parentSceneElement definido", function() {
			expect(elements.parentSceneElement).toBeDefined();
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG", function() {
			beforeEach(function() {
				elements.updateSVG();
			});
			it("should have an object as its value", function() {
				expect(elements.svgElement instanceof SVGElement).toBe(true);
			});
			it("should have svg of scene as parentNode", function() {
				expect(elements.svgElement.parentNode).toBe(scene.svgElement);
			});
		});
	});
});
  
describe("new FunctionGraph()", function() {
  var functionGraph;
  beforeEach(function() {
    functionGraph = new FunctionGraph();
  });

	describe("#range", function() {
		it("should be null", function() {
			expect(functionGraph.range).toBeDefined();
		})
	});

	describe("#parentSceneElement", function() {
		it("should be null", function() {
			expect(functionGraph.parentSceneElement).toBeNull();
		});
	});

	describe("#svgElement", function() {
		describe("after calling #updateSVG", function() {
			describe("without parentSceneNode", function() {
				beforeEach(function() {
					functionGraph.updateSVG();
				});
				it("should be a 'path'", function() {
					expect(functionGraph.svgElement.nodeName).toBe("path");
				});
				it("should have a 'functionGraph' class", function() {
					expect(functionGraph.svgElement).toContainClass("functionGraph");
				});
			});
			describe("with parentSceneNode", function() {
				var elements = {
					svgElement: document.createElementNS("http://www.w3.org/2000/svg","g")
				};
				beforeEach(function() {
					functionGraph.parentSceneElement = elements;
					functionGraph.updateSVG();
				});
				it("should have a SVGElement as its value", function() {
					expect(functionGraph.svgElement instanceof SVGElement).toBe(true);
				});
				it("should have elements#svgElement as parent", function() {
					expect(functionGraph.svgElement.parentNode).toBe(elements.svgElement);
				});
			});
		});
	});

  describe("#identificator", function() {
    it("deberia tener identificator definido", function() {
			expect(functionGraph.identificator).toBeDefined();
    });
    it("deberia ser str con un numero entre 0 y 1", function () {
			expect(parseFloat(functionGraph.identificator)).toBeBetween(0, 1);
    });
		describe("cuando hay mas que uno", function() {
			it("si se crea dos no deberian repetirse", function() {
				var f1 = new FunctionGraph();
				var f2 = new FunctionGraph();
				expect(f1.identificator).not.toBe(f2.identificator);
			});
			it("si se crea 10000 no deberian repetirse", function() {
				var identificatores=[];
				for (var i=0;i<10000;i++) {
					element = new FunctionGraph();
					identificatores.push(element.identificator);
				}
				expect(identificatores).toHaveDistinctValues();
			});
		});
  });

	describe("#plotSVG", function() {
		it("should call #updateSVG", function() {
			spyOn(functionGraph, 'updateSVG');
			functionGraph.plotSVG();
			expect(functionGraph.updateSVG).toHaveBeenCalled();
		});
	})

});

describe("new Range()", function() {
	var range=new Range();
	it("deberia ser un constructor", function() {
		expect(range).toBeDefined();
	});
});
