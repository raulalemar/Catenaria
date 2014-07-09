describe(Catenaria, function() {

  describe("cuando pasas un argumento", function() {
    
    it("devuelve 1 en 0", function() {
      expect(Catenaria(0)).toEqual(1.0);
    });

  });
  describe("cuando pasas dos argumentos", function() {
    
    it("devuelve 2 en 0", function() {
      expect(Catenaria(0,2)).toEqual(2.0);
    });

  });

  describe("cuando pasas tres argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(Catenaria(1,3,1)).toEqual(3.0);
    });

  });
  
  describe("cuando pasas cuatro argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(Catenaria(1,2,1,1)).toEqual(3.0);
    });

  });
  
});
