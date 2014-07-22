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
    }
  });
});



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

describe("parabola", function() {

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




describe("Tramo", function() {
  var tramo;
  var referenceSpecs = {
    span: 30,
    height: 30,
    tension: 10,
    temperature: 20,
    linearDensity: 1.0,
    loadRate: 1
  };
  var cableSpecs = {
    temperature: 10,
    loadRate: 1,
    tension: 10
  };
  
  beforeEach(function() {
    tramo = new Tramo(referenceSpecs, cableSpecs);
  });


  describe("referenceSpecs", function() {
    it("they should be defined", function() {
      expect(tramo.referenceSpecs).toBeDefined();
    });


    it("should have span defined .............................(now span = 30 m)", function() {
      expect(tramo.referenceSpecs.span).toBeDefined();
    });
    
    it("should have height defined ...........................(now height = 30 m)", function() {
      expect(tramo.referenceSpecs.height).toBeDefined();
    });
    
    it("should have tension defined ..........................(now tension = 10 N)", function() {
      expect(tramo.referenceSpecs.tension).toBeDefined();
    });

    it("should have temperature defined ......................(now temperature = 20 ºC)", function() {
      expect(tramo.referenceSpecs.temperature).toBeDefined();
    });
    
    it("should have linearDensity defined ....................(now linearDensity = 1 kg/m)", function() {
      expect(tramo.referenceSpecs.linearDensity).toBeDefined();
    });
    it("should have loadRate defined .........................(now loadRate = 1)", function() {
      expect(tramo.referenceSpecs.loadRate).toBeDefined();
    });

  });



  describe("cableSpecs", function() {
    it("they should be defined", function() {
      expect(tramo.cableSpecs).toBeDefined();
    });

    it("should have temperature defined ......................(now temperature = 10 ºC)", function() {
      expect(tramo.cableSpecs.temperature).toBeDefined();
    });
    
    // the following should be calcualated in terms of temperature, wind, ice, etc
    it("should have loadRate defined .........................(now loadRate = 1)", function() {
      expect(tramo.cableSpecs.loadRate).toBeDefined();
    });
    // and the following should be calculated in terms of the loadRate
    it("should have tension defined ..........................(now tension = 10)", function() {
      expect(tramo.cableSpecs.tension).toBeDefined();
    });
  });


  describe("#sag", function() {
    it("this method should be defined", function() {
      expect(tramo.sag).toBeDefined();
    });
    it("should return 110.3625, (recall that sag = span^2 * linearDensity * m * G / (8*tension))", function () {
      expect(tramo.sag()).toBe(110.3625);
    });
  });

  describe("#a", function() {
    it("this method should be defined", function() {
      expect(tramo.a).toBeDefined();
    });
    it("should return something close to 1.019, (recall that a = tension / (G * linearDensity))", function () {
      expect(tramo.a()).toBeBetween(1.018, 1.020);
    });
  });


  xit("should have a left pole defined HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", function() {
    expect(tramo.leftPole).toBeDefined();
  });
  xit("should have a right pole defined", function() {
    expect(tramo.rightPole).toBeDefined();
  });



});


