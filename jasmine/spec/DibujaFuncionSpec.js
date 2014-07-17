describe("clase Elemento", function() {
  var elemento, elemento2;
  beforeEach(function() {
    elemento = new Elemento();
  });
  describe("#padre", function() {
    it("deberia tener padre definido", function() {
      expect(elemento.padre).toBeDefined();
    });
	});

	describe("#identificador", function() {
		it("deberia estar definido", function() {
			expect(elemento.identificador).toBeDefined();
		});
	});

  describe("#svg", function() {
    it("deberia estar definida", function() {
      expect(elemento.svg).toBeDefined();
    });
    it("deberia saltar una excepcion si no tiene padre", function() {
      expect(elemento.svg).toThrow(new SVGException());
    });
    it("devuelve svg del padre", function() {
      elemento2 = new Elemento();
      elemento.padre = elemento2;
      spyOn(elemento2,'svg');
      elemento.svg();
      expect(elemento2.svg).toHaveBeenCalled();
    })
  });
});

describe("Funcion", function() {
  describe("Constructor sin parametros", function() {
    var funcion;
    beforeEach(function() {
      funcion = new Funcion();
    });

    it("deberia tener rango definido", function() {
      expect(funcion.rango).toBeDefined();
    });
    it("deberia tener padre null", function() {
      expect(funcion.padre).toBeNull();
    });
    describe("identificador", function() {
      it("deberia tener identificador definido", function() {
				expect(funcion.identificador ).toBeDefined();
      });
      it("deberia ser str con un numero entre 0 y 1", function () {
				expect(parseFloat(funcion.identificador)<=1).toBe(true);
				expect(parseFloat(funcion.identificador)>=0).toBe(true);
      });
    });


    describe("#plot", function() {
      beforeEach(function() {
	spyOn(funcion, 'remove');
	spyOn(funcion, 'svg').and.returnValue(document.createElementNS("http://www.w3.org/2000/svg","svg"));
	funcion.plot();
      });
      it("deberia empezar llamando a remove", function() {
	expect(funcion.remove).toHaveBeenCalled();
      });
      it("deberia crear un dibujo reconocible por su identificador", function() {
	expect(funcion.svg().getElementById(funcion.identificador)).not.toBeNull();
      });
      
    });
    //describe("#remove", function() {
    
    //});
  });

});

describe("ListaDeElementos", function() {
  var plot;
  var elementos;

  beforeEach(function() {
    plot = {
    }; //double
    elementos = new ListaDeElementos(plot);
  });

  it("deberia estar definidos", function() {
    expect(elementos).toBeDefined();
  });
  
  describe("#_plotThatBelongs", function() {
    it("no deberia tener su plot definido", function() {
      expect(elementos._plotThatBelongs).not.toBeDefined();
    });
  });

  describe("#padre", function() {
    it("deberia tener padre definido", function() {
      expect(elementos.padre).toBeDefined();
    });
  });

  describe("#_lista", function() {
    it("deberia tener lista definida", function() {
      expect(elementos._lista).toBeDefined();
    });
    it("al principio deberia tener longitud 0", function() {
      expect(elementos._lista.length).toBe(0);
    });
  });

  describe("#length", function() {
    it("deberia estar definido", function() {
      expect(elementos.length).toBeDefined();
    });
    it("deberia dar 0 al inicio", function() {
      expect(elementos.length()).toBe(0);
    });
    it("deberia dar 1 is _lista tiene un elemento", function() {
      var elemento2;
      elementos._lista.push(elemento2);
      expect(elementos.length()).toBe(1);
    });
    
  });

  describe("#add", function() {
    it("deberia estar definido",function() {
      expect(elementos.add).toBeDefined();
    });
    describe("despues de añadir un elemento", function() {
      var elemento;
      beforeEach(function() {
				elemento = {padre: null};
				elementos.add(elemento);
      });

      it("deberia asignar el padre al elemento", function() {
				expect(elemento.padre).toBe(elementos);
      });

      it("deberia tener longitud 1", function() {
				expect(elementos.length()).toBe(1);
      });
    });
  });
  
  describe("#remove", function() {

    var elemento;


    beforeEach(function() {
      elemento = {};
			elemento.remove = jasmine.createSpy();
      elementos.add(elemento);
    });

    it("deberia estar definido", function() {
      expect(elementos.remove).toBeDefined();
    });
    it("deberia eliminar el elmento de la lista", function() {
      elementos.remove(elemento);
      expect(elementos.length()).toBe(0);
    });
    it("deberia llamar remove de elemento", function() {
      elementos.remove(elemento);
      expect(elemento.remove).toHaveBeenCalled();
    })
  });

	describe("#plot", function() {
		beforeEach(function() {
      elemento = {};
			elemento.plot = jasmine.createSpy();
      elementos.add(elemento);
			elementos.plot();
    });
		it('deberia llamar Elemento#plot', function() {
			expect(elemento.plot).toHaveBeenCalled();
		});
	});
});

describe("Rango", function() {
	var rango=new Rango();
	it("deberia ser un constructor", function() {
		expect(rango).toBeDefined();
	});
});

describe("Plot", function() {
  var plot;
  var elemento;
  var numeroDeSVG;

  beforeEach(function() {
		numeroDeSVG = document.getElementsByTagName('svg').length;
    plot = new Plot(); 
    spyOn(plot.elementos, 'add');
		spyOn(plot.elementos, 'plot');
  });
  
	it("al inicio no deberia crear svg", function() {
		expect(document.getElementsByTagName('svg').length).toBe(numeroDeSVG);
	});

	describe("#rango", function() {
		it("al inicion deberia tener xMin = 0", function() {
			expect(plot.rango.xMin).toBe(0);
		});
	});

  describe("#add", function() {
    it("responde", function() {
      expect(plot.add).toBeDefined();
    });
    it("llama ListaDeElementos#add", function() {
      plot.add(elemento);
      expect(plot.elementos.add).toHaveBeenCalled();
    });
  });
  
  describe("#plot", function() {
		beforeEach(function(){
			plot.plot();
		});
    it("responde", function() {
      expect(plot.plot).toBeDefined();
    });
		it("deberia llamar elementos.plot", function() {
			expect(plot.elementos.plot).toHaveBeenCalled();
		});
  });

  describe("#svg", function() {
		beforeEach(function() {
			plot.svg();
		});
		it("it shoud create div with id 'Grafica'", function() {
      expect(document.getElementById('divGrafica')).not.toBe(null);
    });
		it("deberia crear svg", function() {
			expect(document.getElementsByTagName('svg').length).toBe(numeroDeSVG+1);
		});
  })

});

describe("Poste", function() {
  describe("#tipo", function() {
    it("cuando creas un poste sin parametro tipo, su tipo es suspension", function() {
      var poste = new Poste();
      expect(poste.tipo).toBe('suspension');
    })
  })
})
