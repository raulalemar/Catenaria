function CatenaryGraph(a,c1,c2) {
  this.a = a || 10;
  this.c1 = c1 || 0;
  this.c2 = c2 || 0;
  this.f = function(x) {return catenaria(x,this.a,this.c1,this.c2);};
}
CatenaryGraph.prototype = new FunctionGraph();

function Pole(x, y, height, tipo) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.tipo = tipo || 'suspension';
	this.updateSVG = function() {
		if (!this.svgElement) {
			this.svgElement = document.createElementNS("http://www.w3.org/2000/svg","line");
			this.svgElement.classList.add("pole"); 
		}
		this.svgElement.setAttribute('id', this.identificator);
		this.svgElement.setAttribute('x1', this.x);
    this.svgElement.setAttribute('y1', -this.y);
    this.svgElement.setAttribute('x2', this.x);
    this.svgElement.setAttribute('y2', -(this.y + this.height));
    this.svgElement.setAttribute('style', "stroke:#000000;stroke-width:4px");
	};
}
Pole.prototype = new SceneElement();


var creaRangoLinea = function(distancia, height) {
  return new Range(-0.1*distancia, 1.1*distancia, -0.2*height, 4*height);
}

var creaRangoCatenaria = function(postes, i, heightPole) {
  return new Range(postes[i].x, postes[i+1].x, -0.2*heightPole, 4*heightPole);
}

var creaEjesLinea = function(escena, rango) {
  var ejeX = new Flecha(rango.xMin, 0, rango.xMax, 0, 'ejeX');
  var ejeY = new Flecha(0, rango.yMin, 0, rango.yMax, 'ejeY');
  var ejes = new GroupOfSceneElements(escena);

  ejes.add(ejeX);
  ejes.add(ejeY)
  escena.add(ejes);
  return ejes;
}

var escena = new Scene();

var creaLinea = function (distancia, a, heightPole) {

  var rango = creaRangoLinea(distancia, heightPole);
  limitaSVG(escena.svg(), rango);
  


  var numeroPoles = Math.floor(distancia/100)+2;
  var vano = distancia / (numeroPoles-1);
  var postes = [];
  var catenarias = [];
  var ejes = creaEjesLinea (escena, rango);

  for(var i = 0; i < numeroPoles; i++) {
    var xPole = 0 + i*vano;
    var yPole = 0;
    postes[i] = new Pole(xPole, yPole, heightPole, i);
    if (i==0) postes[i].tipo='amarre';
    if (i==numeroPoles-1) postes[i].tipo='amarre';
    escena.add(postes[i]);
  }

  for(var i = 0; i < postes.length - 1; i++) {
    var rangoCatenaria = creaRangoCatenaria(postes, i, heightPole);
    var constantes = resuelvaParabola(a, postes[i].x, postes[i].y + postes[i].height, postes[i+1].x, postes[i+1].y + postes[i+1].height);
    catenarias[i] = new CatenaryGraph(a, constantes[0], constantes[1], rangoCatenaria, i);
    escena.add(catenarias[i]);
  }

  escena.plot();
}




var limitaSVG = function(svg, rango) {
  xRange = rango.xMax - rango.xMin;
  yRange = rango.yMax - rango.yMin;
  svg.setAttribute('viewBox', '' + (rango.xMin-0.1*xRange) + 
		   ' ' + (-rango.yMax-0.1*yRange) + ' ' + (1.1*xRange) + ' ' + (1.1)*yRange);
}

var pideLongitud = function() {
	var longitud = window.prompt("Longitud de la linea:", 1000);
	return longitud;
}
