Array.prototype.duplicates = function() {
	var duplicates = this.filter(function(elem, pos, self) {
		return self.indexOf(elem) != pos;
	});
	var duplicatesWithoutDuplicates = 	duplicates.filter(function(elem, pos, self) {
		return self.indexOf(elem) == pos;
	});
	return duplicatesWithoutDuplicates;
};

beforeEach(function() {
	jasmine.addMatchers({
		toBeBetween: function() {
			return {
				compare: function(actual,lower, upper) {
					return {
						pass: actual >= lower && actual <= upper,
						message: "Expected " + actual + " to be between " + lower + " and " + upper + " (inclusive)"
					}
				}
			}
		},
		toHaveDistinctValues: function() {
			return {
				compare: function(actual) {
					duplicates = actual.duplicates();
					return {
						pass: duplicates.length==0,
						message: "Expected the list not to have duplicates. However the following element(s):" +duplicates.toString() + " is/are repeated."
					}
				}
			}
		},
	});
});

describe("Scene", function() {
  var scene;
  var element;
  var numbersOfSVGtags;

  beforeEach(function() {
		numbersOfSVGtags = document.getElementsByTagName('svg').length;
    scene = new Scene(); 
    spyOn(scene.elements, 'add');
		spyOn(scene.elements, 'plot');
  });
  
	it("should be instance of SceneElement", function() {
		expect(scene instanceof SceneElement).toBe(true);
	});

	it("al inicio no deberia crear svg", function() {
		expect(document.getElementsByTagName('svg').length).toBe(numbersOfSVGtags);
	});

	describe("#tagSVG", function() {

		describe("after calling #updateTagSVG()",function() {
			beforeEach(function () {
				scene.updateTagSVG();
			});
			it("should be an object", function() {
				expect(scene.tagSVG instanceof SVGElement).toBe(true);
			});
		});

		describe("after calling #updateTagSVG(div)",function() {
			var div = document.createElement("div");
			beforeEach(function () {
				scene.updateTagSVG(div);
			});
			it("should have div as parent", function() {
				expect(scene.tagSVG.parentNode).toBe(div);
			});
		});
	});

	describe("#elements", function() {
		it("should be instance of GroupOfSceneElements", function() {
			expect(scene.elements instanceof GroupOfSceneElements).toBe(true);
		});
	});


	describe("#rango", function() {
		it("al inicion deberia tener xMin = 0", function() {
			expect(scene.rango.xMin).toBe(0);
		});
	});

  describe("#add", function() {
    it("responde", function() {
      expect(scene.add).toBeDefined();
    });
    it("llama ListaDeElements#add", function() {
      scene.add(element);
      expect(scene.elements.add).toHaveBeenCalled();
    });
  });
  
  describe("#plot", function() {
		beforeEach(function(){
			scene.plot();
		});
    it("responde", function() {
      expect(scene.plot).toBeDefined();
    });
		it("deberia llamar elements.plot", function() {
			expect(scene.elements.plot).toHaveBeenCalled();
		});
  });

  describe("#svg", function() {
		beforeEach(function() {
			scene.svg();
		});
		it("it shoud create div with id 'Grafica'", function() {
      expect(document.getElementById('divGrafica')).not.toBe(null);
    });
		it("deberia crear svg", function() {
			expect(document.getElementsByTagName('svg').length).toBe(numbersOfSVGtags+1);
		});
  })

});



describe("SceneElement", function() {
  var element, element2;
  beforeEach(function() {
    element = new SceneElement();
  });
  describe("#father", function() {
    it("should have #father defined", function() {
      expect(element.father).toBeDefined();
    });
	});

	describe("#identificator", function() {
		it("should be null", function() {
			expect(element.identificator).toBeNull();
		});
	});

	describe("#tagSVG", function() {
		it("should be null", function() {
			expect(element.tagSVG).toBeNull();
		});
	});

  describe("#svg", function() {
    it("deberia estar definida", function() {
      expect(element.svg).toBeDefined();
    });
    it("deberia saltar una excepcion si no tiene father", function() {
      expect(element.svg).toThrow(new SVGException());
    });
    it("devuelve svg del father", function() {
      element2 = new SceneElement();
      element.father = element2;
      spyOn(element2,'svg');
      element.svg();
      expect(element2.svg).toHaveBeenCalled();
    })
  });

});

describe("FunctionGraph", function() {
  describe("new FunctionGraph()", function() {
    var functionGraph;
    beforeEach(function() {
      functionGraph = new FunctionGraph();
    });

		describe("#range", function() {
			it("should be null", function() {
				expect(functionGraph.rango).toBeDefined();
			})
		});

		describe("#father", function() {
			it("should be null", function() {
				expect(functionGraph.father).toBeNull();
			});
		});

		describe("#tagSVG", function() {
			describe("after calling #updatetagSVG", function() {
				beforeEach(function() {
					functionGraph.updateTagSVG();
				});
				it("should have an object as its value", function() {
					expect(typeof(functionGraph.tagSVG)).toBe("object");
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

    describe("#plot", function() {
      beforeEach(function() {
				spyOn(functionGraph, 'remove');
				spyOn(functionGraph, 'svg').and.returnValue(document.createElementNS("http://www.w3.org/2000/svg","svg"));
				functionGraph.plot();
      });
      it("deberia empezar llamando a remove", function() {
				expect(functionGraph.remove).toHaveBeenCalled();
      });
      it("deberia crear un dibujo reconocible por su identificator", function() {
				expect(functionGraph.svg().getElementById(functionGraph.identificator)).not.toBeNull();
      });
      
    });
    //describe("#remove", function() {
    
    //});
  });

});

describe("ListaDeElements", function() {
  var scene;
  var elements;

  beforeEach(function() {
    scene = {
    }; //double
    elements = new GroupOfSceneElements(scene);
  });

  it("deberia estar definidos", function() {
    expect(elements).toBeDefined();
  });
  
  describe("#father", function() {
    it("deberia tener father definido", function() {
      expect(elements.father).toBeDefined();
    });
  });

  describe("#_lista", function() {
    it("deberia tener lista definida", function() {
      expect(elements._lista).toBeDefined();
    });
    it("al principio deberia tener longitud 0", function() {
      expect(elements._lista.length).toBe(0);
    });
  });

  describe("#length", function() {
    it("deberia estar definido", function() {
      expect(elements.length).toBeDefined();
    });
    it("deberia dar 0 al inicio", function() {
      expect(elements.length()).toBe(0);
    });
    it("deberia dar 1 is _lista tiene un element", function() {
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
				element = {father: null};
				elements.add(element);
      });

      it("deberia asignar el father al element", function() {
				expect(element.father).toBe(elements);
      });

      it("deberia tener longitud 1", function() {
				expect(elements.length()).toBe(1);
      });
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

	describe("#plot", function() {
		beforeEach(function() {
      element = {};
			element.plot = jasmine.createSpy();
      elements.add(element);
			elements.plot();
    });
		it('deberia llamar SceneElement#plot', function() {
			expect(element.plot).toHaveBeenCalled();
		});
	});
});

describe("Rango", function() {
	var rango=new Rango();
	it("deberia ser un constructor", function() {
		expect(rango).toBeDefined();
	});
});


describe("Poste", function() {
  describe("#tipo", function() {
    it("cuando creas un poste sin parametro tipo, su tipo es suspension", function() {
      var poste = new Poste();
      expect(poste.tipo).toBe('suspension');
    })
  })
})
