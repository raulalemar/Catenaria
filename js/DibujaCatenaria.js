
function Catenaria(x,a,c1,c2){

  switch(arguments.length) {
    case 1:
      a = 1;
    case 2:
      c1 = 0;
    case 3:
      c2 = 0;
      break;
  }
  return a*(Math.exp((x-c1)/a) + Math.exp(-(x-c1)/a))/2 + c2;
};

function calculaConstantes (a,x1,y1,x2,y2) {
  var c1 = a*(y2-y1)/(x1-x2) + (x1+x2)/2;
  var c2 = y1-Catenaria(x1,a,c1);
  return [c1,c2];
};


function FuncionCatenaria(a,c1,c2,rango,identificador) {
  this.a = a;
  this.c1 = c1;
  this.c2 = c2;
  this.f = function(x) {return Catenaria(x,this.a,this.c1,this.c2);};
  this.rango = rango;
  this.identificador = identificador;
  console.log(this.identificador);
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
    var constantes = calculaConstantes(a, postes[i].x, postes[i].y + postes[i].altura, postes[i+1].x, postes[i+1].y + postes[i+1].altura);
    catenarias[i] = new FuncionCatenaria(a, constantes[0], constantes[1], rangoCatenaria, i);
    escena.add(catenarias[i]);
  }
  console.log(catenarias);
}

creaLinea(870, 100, 30);


/*
var rango = {xMin: -8, xMax: 8, yMin: -2, yMax: 10}
var plotCatenaria = new Plot(rango);

plotCatenaria.creaSVG();
plotCatenaria.creaEjes();

var Tramo1 = new FuncionCatenaria(1,0,0, {xMin: -2, xMax: -1, yMin: -2, yMax: 8}, 1);
//Tramo1 = new Funcion(Catenaria, {xMin: -2, xMax: -1, yMin: -2, yMax: 8}, 1);
var Tramo2 = new Funcion(Catenaria, {xMin: 0, xMax: 2, yMin: -2, yMax: 8}, 2);
var Poste0 = new Poste(-2, 0, Catenaria(-2), 0);
var Poste1 = new Poste(-1, 0, Catenaria(-1), 1);
var Poste2 = new Poste(0, 0, Catenaria(0), 2);
var Poste3 = new Poste(2, 0, Catenaria(2), 3);
plotCatenaria.add(Tramo1);
plotCatenaria.add(Tramo2);

plotCatenaria.add(Poste0);
plotCatenaria.add(Poste1);
plotCatenaria.add(Poste2);
plotCatenaria.add(Poste3);*/
