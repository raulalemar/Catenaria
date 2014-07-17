function FuncionCatenaria(a,c1,c2,rango,identificador) {
  this.a = a;
  this.c1 = c1;
  this.c2 = c2;
  this.f = function(x) {return catenaria(x,this.a,this.c1,this.c2);};
  this.rango = rango;
  this.identificador = identificador;
}

FuncionCatenaria.prototype = new Funcion();


var creaRangoLinea = function(distancia, altura) {
  return creaRango(-0.1*distancia, 1.1*distancia, -0.2*altura, 4*altura);
}

var creaRangoCatenaria = function(postes, i, alturaPoste) {
  return creaRango(postes[i].x, postes[i+1].x, -0.2*alturaPoste, 4*alturaPoste);
}


var creaEjesLinea = function(escena, rango) {
  var ejeX = new Flecha(rango.xMin, 0, rango.xMax, 0, 'ejeX');
  var ejeY = new Flecha(0, rango.yMin, 0, rango.yMax, 'ejeY');
  var ejes = new ListaDeElementos(escena);

  ejes.add(ejeX);
  ejes.add(ejeY)
  escena.add(ejes);
  return ejes;
}


var escena = new Plot();



var creaLinea = function (distancia, a, alturaPoste) {

  var rango = creaRangoLinea(distancia, alturaPoste);
  limitaSVG(escena.svg(), rango);
  


  var numeroPostes = Math.floor(distancia/100)+2;
  var vano = distancia / (numeroPostes-1);
  var postes = [];
  var catenarias = [];
  var ejes = creaEjesLinea (escena, rango);

  for(var i = 0; i < numeroPostes; i++) {
    var xPoste = 0 + i*vano;
    var yPoste = 0;
    postes[i] = new Poste(xPoste, yPoste, alturaPoste, i);
    if (i==0) postes[i].tipo='amarre';
    if (i==numeroPostes-1) postes[i].tipo='amarre';
    escena.add(postes[i]);
  }

  for(var i = 0; i < postes.length - 1; i++) {
    var rangoCatenaria = creaRangoCatenaria(postes, i, alturaPoste);
    var constantes = resuelvaParabola(a, postes[i].x, postes[i].y + postes[i].altura, postes[i+1].x, postes[i+1].y + postes[i+1].altura);
    catenarias[i] = new FuncionCatenaria(a, constantes[0], constantes[1], rangoCatenaria, i);
    escena.add(catenarias[i]);
  }

  escena.plotAll();
}

var pideLongitud = function() {
	var longitud = window.prompt("Longitud de la linea:", 1000);
	return longitud;
}

