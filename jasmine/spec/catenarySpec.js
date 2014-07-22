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
  var refSpecs = {
    span: 300,
    height: 30,

    elasticModulus: 7730*1000000*G,
    dilationCoefficient: 0.00001899,
    section: 281.10, //mm^2
    linearDensity: 0.9746,

    tension: 2939*G,
    temperature: 20,

    loadRate: function() {
      return 2.72;
    },
    K: function() {
      return 17.25;
    }
  };
  var newSpecs = {
    temperature: 10,
    loadRate: 2.72,
    tension: 2939*G
  };
  
  beforeEach(function() {
    tramo = new Tramo(refSpecs, newSpecs);
  });


  describe("refSpecs", function() {
    it("they should be defined", function() {
      expect(tramo.refSpecs).toBeDefined();
    });


    it("should have span defined .............................(now span = 300 m)", function() {
      expect(tramo.refSpecs.span).toBeDefined();
    });
    
    it("should have height defined ...........................(now height = 30 m)", function() {
      expect(tramo.refSpecs.height).toBeDefined();
    });
    
    it("should have linearDensity defined ....................(now linearDensity = 0.9746 kg/m)", function() {
      expect(tramo.refSpecs.linearDensity).toBeDefined();
    });

    it("should have section defined ..........................(now section = 281.10 mm^2)", function() {
      expect(tramo.refSpecs.section).toBeDefined();
    });

    it("should have dilationCoefficient defined ..............(now dilationCoefficient = 0.00001899 ºC^-1)", function() {
      expect(tramo.refSpecs.dilationCoefficient).toBeDefined();
    });
    
    it("should have tension defined ..........................(now tension = 2939*9.81 N = 28831 N)", function() {
      expect(tramo.refSpecs.tension).toBeDefined();
    });

    it("should have temperature defined ......................(now temperature = 20 ºC)", function() {
      expect(tramo.refSpecs.temperature).toBeDefined();
    });

    it("should have elasticModulus defined ...................(now elasticModulus = 7.5*10^10 Pa)", function() {
      expect(tramo.refSpecs.elasticModulus).toBeDefined();
    });
    
    describe("#loadRate", function() {
      it("this method should be defined", function() {
	expect(tramo.refSpecs.loadRate).toBeDefined();
      });
      xit("at least in this example, it will return 2.72", function() {
	expect(tramo.refSpecs.loadRate()).toBe(2.72);
      });
    });

  });



  describe("newSpecs", function() {
    it("they should be defined", function() {
      expect(tramo.newSpecs).toBeDefined();
    });

    it("should have temperature defined ......................(now temperature = 10 ºC)", function() {
      expect(tramo.newSpecs.temperature).toBeDefined();
    });
    
    // the following should be calcualated in terms of temperature, wind, ice, etc
    it("should have loadRate defined .........................(now loadRate = 1)", function() {
      expect(tramo.newSpecs.loadRate).toBeDefined();
    });
    // and the following should be calculated in terms of the loadRate
    it("should have tension defined ..........................(now tension = 10)", function() {
      expect(tramo.newSpecs.tension).toBeDefined();
    });
  });


  describe("#sag", function() {
    it("this method should be defined", function() {
      expect(tramo.sag).toBeDefined();
    });
    it("should return 10.13, (recall that sag = span^2 * linearDensity * m * G / (8*tension))", function () {
      expect(tramo.sag()).toBeBetween(10.1,10.2);
    });
  });

  describe("#a", function() {
    it("this method should be defined", function() {
      expect(tramo.a).toBeDefined();
    });
    it("should return something close to 1.019, (recall that a = tension / (G * linearDensity * m))", function () {
      expect(tramo.a()).toBeBetween(1106, 1109);
    });
  });

  describe("#K", function() {
    it("this method should be defined", function() {
      expect(tramo.K).toBeDefined();
    });
    it("it should be close to -13.06", function() {
      expect(tramo.K()).toBeBetween(-14, -13);
    });
  });    


});


