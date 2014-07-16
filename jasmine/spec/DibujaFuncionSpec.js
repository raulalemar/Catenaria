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


	describe("#svg", function() {
		it("deberia estar definida", function() {
			expect(elemento.svg).toBeDefined();
		});
		it("deberia devolver null is no tiene padre", function() {
			expect(elemento.svg()).toBeNull();
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
	var funcion;
	beforeEach(function() {
		funcion = new Funcion();
	});
	it("deberia tener padre definido", function() {
		expect(funcion.padre).toBeDefined();
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
			elemento = {
				 remove: function() {}
			 }; //double
			elementos.add(elemento);
			spyOn(elemento, 'remove');
		});

		it("deberia estar definido", function() {
			expect(elementos.remove).toBeDefined();
		});
		it("deberia eliminar el elmento de la lista", function() {
			elementos.remove(elemento);
			expect(elementos.length()).toBe(0);
		});
		xit("deberia llamar remove de elemento", function() {
			elementos.remove(elemento);
			expect(elemento.remove).toHaveBeenCalled();
		})
	});
});



describe("Plot", function() {
  var rango;
  var plot;
  var elemento;
  
  beforeEach(function() {
    rango = {}; //double
    plot = new Plot(rango); 
    spyOn(plot.elementos, 'add');
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
    it("responde", function() {
      expect(plot.plot).toBeDefined();
    });
		xit("it shoud create div with id 'Grafica'", function() {
			plot.plot();
			expect(document.getElementById('divGrafica')).not.toBe(null);
		});
  });
 
	describe("#svg", function() {
		it("deberia estar definido", function() {
			expect(plot.svg).toBeDefined();
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
