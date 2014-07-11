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

	describe("#add", function() {
		it("deberia estar definido",function() {
			expect(elementos.add).toBeDefined();
		});
	});
});



describe("Plot", function() {
	xit("deberia responder a add", function() {
		expect(true).toBe(false);
	});
});
