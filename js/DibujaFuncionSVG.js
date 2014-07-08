var NUMBER_POINTS = 600;
var YMIN= -2, YMAX = 10;
var XMIN = -8, XMAX = 8;
var xRange = XMAX-XMIN, yRange = YMAX-YMIN;

function Plot() {
    
    this.xMin = XMIN;
    this.xMax = XMAX;
    this.yMin = YMIN;
    this.yMax = YMAX;

    this.xRange = function() {
	return this.xMax - this.xMin;
    }
    this.yRange = function() {
	return this.yMax - this.yMin;
    }

    this.creaSVG = function() {
	var divCatenaria = document.getElementById('divCatenaria');
	var divWidth = divCatenaria.attributes.width.nodeValue;
	var divHeight = divCatenaria.attributes.height.nodeValue;
	
	var svg = document.getElementById('Grafica');
	svg.setAttribute('width', '100%');
	svg.setAttribute('height', '90%');
	svg.setAttribute('viewBox', '' + (this.xMin-0.1*this.xRange()) + 
			 ' ' + (-this.yMax-0.1*this.yRange()) + ' ' + (1.1*this.xRange()) + ' ' + (1.1)*this.yRange());
	return svg;
    }

    var svg = this.creaSVG();

    // elemento es un objeto que representa a una funcion, un poste, eje, perfil...
    this.add = function(elemento) {
	elemento.plot(svg);
    }

    this.remove = function() {
	elemento.remove(svg);
    }

    this.creaText = function() {
	// Aqui vamos a añadir el texto con el valor del parametro
	var textoCatenaria = svg.getElementById('textoCatenaria');
	if(textoCatenaria) { svg.removeChild(textoCatenaria); }

	var myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	myText.setAttribute('id', "textoCatenaria");
	myText.setAttribute('x', XMIN  + 0.01*xRange);
	myText.setAttribute('y', 0     + 0.10*yRange);
	myText.setAttribute('font-size', '5%');

	var texto = document.createTextNode('Parámetro: ' + Parametro.toFixed(2));
	myText.appendChild(texto);

	svg.appendChild(myText);
    }
    


    this.creaEjes = function() {
	var ejeX = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var ejeY = document.createElementNS("http://www.w3.org/2000/svg", "line");

	// Eje X
	ejeX.setAttribute('x1', XMIN);
	ejeX.setAttribute('y1', 0);
	ejeX.setAttribute('x2', XMAX);
	ejeX.setAttribute('y2', 0);

	// Eje Y
	ejeY.setAttribute('x1', 0);
	ejeY.setAttribute('y1', -YMIN);
	ejeY.setAttribute('x2', 0);
	ejeY.setAttribute('y2', -YMAX);
	

	// Colores
	ejeX.setAttribute('style', "stroke:#006600;stroke-width:0.5%");
	ejeY.setAttribute('style', "stroke:#006600;stroke-width:0.5%");

	// Las añadimos
	svg.appendChild(ejeX);
	svg.appendChild(ejeY);

	//flechas
	var flechaDelta = 0.0005;

	var flechaX = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	var pointsX = ""+(XMAX-flechaDelta)+","+(-flechaDelta/2)+" "+(XMAX-flechaDelta)+","+flechaDelta/2+" "+XMAX+",0";
	flechaX.setAttribute('points', pointsX);
	flechaX.setAttribute('style',"stroke:#006600;stroke-width:2%;");
	svg.appendChild(flechaX);

	var flechaY = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	var pointsY = ""+(-flechaDelta/2)+","+(-YMAX+flechaDelta)+" "+flechaDelta/2+","+(-YMAX+flechaDelta)+" "+" "+"0,"+(-YMAX);
	flechaY.setAttribute('points', pointsY);
	flechaY.setAttribute('style',"stroke:#006600;stroke-width:2%;");
	svg.appendChild(flechaY);
    }
}



function Funcion (f, rango, identificador) {

    this.f = f;
    this.fxMin = rango.xMin;
    this.fxMax = rango.xMax;
    this.fyMin = rango.yMin;
    this.fyMax = rango.yMax;
    this.fxRange = this.fxMax - this.fxMin;
    this.identificador = identificador;

    this.remove = function(svg) {
	var pathf = svg.getElementById('tramo' + identificador);
	if(pathf) { svg.removeChild(pathf) }
    }


    this.plot = function (svg) {
	this.remove(svg);
	
	var pathf = document.createElementNS("http://www.w3.org/2000/svg", "path");
	pathf.setAttribute('style', "stroke:red;stroke-width:1%; fill:none");
	pathf.setAttribute('id', 'tramo' + identificador);
	
	this.pathXY = function (i) {
	    var valorX = i;
	    var valorY = f(i);
	    if (valorY < this.fyMax && valorY > this.fyMin){ 
		return "" + valorX + " " + -valorY;
	    }
	}

	var ruta = "M";
	for (var i=0; i<600; i++) {	
	    var x = this.fxMin + i*this.fxRange/NUMBER_POINTS;
	    var xy = this.pathXY(x);
	    if (xy) {
		if (ruta!="M") {ruta += " L";}
		ruta += xy;
	    }
	}
	pathf.setAttribute('d', ruta);
	svg.appendChild(pathf);
    }

}

function Poste(x, y, altura, identificador) {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.identificador = identificador;

    this.remove = function(svg) {
	var poste = svg.getElementById('poste' + identificador);
	if(poste) { svg.removeChild(pathf) }
    }

    this.plot = function(svg) {
	
	this.remove(svg);

	var poste = document.createElementNS("http://www.w3.org/2000/svg", "line");
	poste.setAttribute('id', 'poste' + identificador);
	
	// poste
	poste.setAttribute('x1', this.x);
	poste.setAttribute('y1', -this.y);
	poste.setAttribute('x2', this.x);
	poste.setAttribute('y2', -(this.y + this.altura));
	
	// Colores
	poste.setAttribute('style', "stroke:#0000aa;stroke-width:1%");
	
	// Las añadimos
	svg.appendChild(poste);
    }

}
