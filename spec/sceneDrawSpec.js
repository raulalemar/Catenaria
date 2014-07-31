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
		it("should be good", function() {
			expect(element.identificator).toBeGoodId();
		});
	});
	describe("#svgElement", function() {
		it("should be null", function() {
			expect(element.svgElement).toBeNull();
		});
		describe("after calling #updateSVG", function() {
			it("should be <g>", function() {
				element.updateSVG();
				expect(element.svgElement.tagName).toBe("g");
			});
		}) 
	/*describe("having parent element with SVGElement", function(){
			element2 = new SceneElement();
			element.parentSceneElement = element2;
			element.svgElement = jasmine.createSpyObj('svgElement', ['appendChild']);
			describe("after calling appendToParentSVG", function() {
				element.appendToParentSVG();
				it("should be appended to parent SVG", function() {
					expect(element2.svgElement).toHaveBeenCalledWith(element.svgElement);
				})
			});
		})*/
	});	
	describe("#appendSVG", function() {
		describe("when the argument is SceneElement", function() {
			element = new SceneElement();
			element2 = new SceneElement();
			element.svgElement = {
				appendChild: function() {}
			}
			spyOn('svgElement', 'appendChild');
			it("should append SVGElements", function() {
				expect(element.svgElement.appendChild).toHaveBeenCalledWith(element2.svgElement);
			});
		})
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

	describe("#updateSVG",function() {
		describe("after the assigin non null div", function() {
			var div = jasmine.createSpyObj('div', ['appendChild']);
			it("should call div.appendChild", function() {
				scene.div = div; 
				scene.updateSVG();
				expect(div.appendChild).toHaveBeenCalled();
			});
		});
	});

	describe("#elements", function() {
		it("should be instance of GroupOfSceneElements", function() {
			expect(scene.elements instanceof GroupOfSceneElements).toBe(true)
		});
		describe("after calling #plotSVG", function() {
			it("#elements.plotSVG should be called", function() {
				spyOn(scene.svgElement, appendChild);
				scene.plotSVG();
				expect(scene.elements.plotSVG).toHaveBeenCalled();
			})
		})
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
	it("#identificator should be defined", function() {
		expect(elements.identificator).toBeBetween(0,1);
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

describe("new Circle", function() {
	var circle = new Circle();
	it("should have x = 0, y = 0 and r=1", function() {
		expect(circle.x).toBe(0);
		expect(circle.y).toBe(0);
		expect(circle.r).toBe(1);
	});
	it("should be instance of SceneElement", function() {
		expect(circle instanceof SceneElement).toBe(true);
	});
	describe("#plotSVG", function() {
		var elements;
		it("should be called by elements.plotSVG", function() {
			elements = new GroupOfSceneElements();
			elements.add(circle);
			spyOn(circle, 'plotSVG');
			elements.plotSVG();
			expect(circle.plotSVG).toHaveBeenCalled();
		});
		beforeEach(function() {
			circle.plotSVG();
		});
		it("should create SVGEelement",function() {
			expect(circle.svgElement instanceof SVGElement).toBe(true);
		});
		it("should create a circle of radius 1", function() {
			expect(circle.svgElement.tagName).toBe("circle");
		});

	});
});


describe("new Point()", function() {
	var point = new Point();
	it("should have x = 0 and y = 0", function() {
		expect(point.x).toBe(0);
		expect(point.y).toBe(0);
	});
	it("should be instance of SceneElement", function() {
		expect(point instanceof SceneElement).toBe(true);
	});
	it("should be instance of Circle", function() {
		expect(point instanceof Circle).toBe(true);
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
