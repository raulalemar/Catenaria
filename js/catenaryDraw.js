function CatenaryGraph(a,c1,c2) {
  this.a = a || 10;
  this.c1 = c1 || 0;
  this.c2 = c2 || 0;
  this.f = function(x) {return catenaria(x,this.a,this.c1,this.c2);};
}

CatenaryGraph.prototype = new FunctionGraph();

var creaRangoLinea = function(distancia, altura) {
  return new Range(-0.1*distancia, 1.1*distancia, -0.2*altura, 4*altura);
}

var creaRangoCatenaria = function(postes, i, alturaPoste) {
  return new Range(postes[i].x, postes[i+1].x, -0.2*alturaPoste, 4*alturaPoste);
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
    catenarias[i] = new CatenaryGraph(a, constantes[0], constantes[1], rangoCatenaria, i);
    escena.add(catenarias[i]);
  }

  escena.plot();
}



function Poste(x, y, altura, identificator, tipo) {
  this.x = x;
  this.y = y;
  this.altura = altura;
  this.identificator = identificator;
  //this.svg = null;

  this.tipo = tipo || 'suspension';

  this.remove = function() {
    var poste = this.svg().getElementById('poste' + identificator);
    if(poste) { this.svg().removeChild(poste) }
  }

  this.plot = function() {
	
    this.remove();
    
    var poste = document.createElementNS("http://www.w3.org/2000/svg", "line");
    poste.setAttribute('id', 'poste' + identificator);
    
    // poste
    poste.setAttribute('x1', this.x);
    poste.setAttribute('y1', -this.y);
    poste.setAttribute('x2', this.x);
    poste.setAttribute('y2', -(this.y + this.altura));
    
    // Colores
    switch(this.tipo) {
      case 'amarre':
        poste.setAttribute('style', "stroke:#000000;stroke-width:4px");
        break;
      case 'suspension':
      default:
        poste.setAttribute('style', "stroke:#0000aa;stroke-width:2px");
    }

    // Las añadimos
    this.svg().appendChild(poste);
  }
}
Poste.prototype = new SceneElement();

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
