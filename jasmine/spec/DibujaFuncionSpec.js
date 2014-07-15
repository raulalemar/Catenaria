describe("ListaDeElementos", function() {
	var plot;
	var elementos;
	beforeEach(function() {
		plot = {}; //double
		elementos = new ListaDeElementos(plot);
	});

	it("deberia estar definidos", function() {
		expect(elementos).toBeDefined();
	});
	
	describe("#_plotThatBelongs", function() {
		it("deberia tener su plot definido", function() {
			expect(elementos._plotThatBelongs).toBeDefined();
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
			it("deberia tener longitud 1", function() {
				var elemento2;
				elementos.add(elemento2);
				expect(elementos.length()).toBe(1);
			});
		});

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
	});


});
