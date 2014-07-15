function FuncionCatenaria(a,c1,c2,rango,identificador) {
  this.a = a;
  this.c1 = c1;
  this.c2 = c2;
  this.f = function(x) {return catenaria(x,this.a,this.c1,this.c2);};
  this.rango = rango;
  this.identificador = identificador;
}

FuncionCatenaria.prototype = new Funcion();

var creaLinea = function (distancia, a, alturaPoste) {
  var numeroPostes = Math.floor(distancia/100); //Postes de suspension
  var vano = distancia / (numeroPostes+1);
  var rango = {xMin: -0.1*distancia, xMax: 1.1*distancia, yMin: -0.2*alturaPoste, yMax: 4*alturaPoste};
  var escena = new Plot(rango)

  escena.creaSVG();
  escena.creaEjes();

  var postes = [];
  var catenarias = [];

  for(var i = 0; i <= numeroPostes+1; i++) {
    var xPoste = 0 + i*vano;
    var yPoste = 0;
    postes[i] = new Poste(xPoste, yPoste, alturaPoste, i);
    escena.add(postes[i]);
  }

  for(var i = 0; i < postes.length - 1; i++) {
    var rangoCatenaria = {xMin: postes[i].x, xMax: postes[i+1].x, yMin: -0.2*alturaPoste, yMax: 4*alturaPoste};
    var constantes = resuelvaParabola(a, postes[i].x, postes[i].y + postes[i].altura, postes[i+1].x, postes[i+1].y + postes[i+1].altura);
    catenarias[i] = new FuncionCatenaria(a, constantes[0], constantes[1], rangoCatenaria, i);
    escena.add(catenarias[i]);
  }

	escena.plot();
}

creaLinea(870, 100, 30);
