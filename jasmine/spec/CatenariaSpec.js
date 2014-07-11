describe("catenaria", function() {

  describe("cuando pasas un argumento", function() {
    
    it("devuelve 1 en 0", function() {
      expect(catenaria(0)).toEqual(1.0);
    });

  });
  describe("cuando pasas dos argumentos", function() {
    
    it("devuelve 2 en 0", function() {
      expect(catenaria(0,2)).toEqual(2.0);
    });

  });

  describe("cuando pasas tres argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(catenaria(1,3,1)).toEqual(3.0);
    });

  });
  
  describe("cuando pasas cuatro argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(catenaria(1,2,1,1)).toEqual(3.0);
    });

  });
  
});

describe("parbola", function() {

  describe("cuando pasas un argumento", function() {
    
    it("devuelve 1 en 0", function() {
      expect(parabola(0)).toBeCloseTo(1.0,2);
    });

  });
  describe("cuando pasas dos argumentos", function() {
    
    it("devuelve 2 en 0", function() {
      expect(parabola(0,2)).toEqual(2.0);
    });

  });

  describe("cuando pasas tres argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(parabola(1,3,1)).toEqual(3.0);
    });

  });
  
  describe("cuando pasas cuatro argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(parabola(1,2,1,1)).toEqual(3.0);
    });

  });
  
});


describe("resuelvaParabola", function() {
	var y1,y2;

	beforeEach(function() {
		y1 = parabola(1,1);
		y2 = parabola(2,1);
	});

	describe("cuando hay dos postes iguales",function() {
		describe("simetricos", function() {
			it("devuelva c1=0 y c2 = 0", function() {
				var c = resuelvaParabola(1,-1,y1,1,y1);
				expect(c).toEqual([0,0]);
			})
			it("devuelva c1=0 y c2 = 1", function() {
				var c = resuelvaParabola(1,-1,y1+1,1,y1+1);
				expect(c).toEqual([0,1]);
			})
		});
		describe("no simetricos", function() {
			it("devuelva c1 = 1, and c2=0", function() {
				var c = resuelvaParabola(1,0,y1,2,y1);
				expect(c).toEqual([1,0]);
			})
		});
	});

	describe("cuando hay dos postes no iguales",function() {
	 	it("devuelva",function() {
	 		var c = resuelvaParabola(1,-1,y1,2,y2);
	 		expect(c).toEqual([0,0]);
	 	});
	});
});
