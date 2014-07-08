var Parametro=1; 
var NUMBER_POINTS = 600;
var YMIN= -2, YMAX = 10;
var XMIN = -8, XMAX = 8;
var xRange = XMAX-XMIN, yRange = YMAX-YMIN;

function dibuja(functionGraph)
{
	var divCatenaria = document.getElementById('divCatenaria');
	var divWidth = divCatenaria.attributes.width.nodeValue;
	var divHeight = divCatenaria.attributes.height.nodeValue;

	var svg = document.getElementById('Grafica');
	svg.setAttribute('width', '100%');
	svg.setAttribute('height', '90%');
	svg.setAttribute('viewBox', '' + (XMIN-0.1*xRange) + ' ' + (-YMAX-0.1*yRange) + ' ' + (1.1*xRange) + ' ' + (1.1)*yRange);

	// Aqui vamos a intentarlo haciendo path
	var pathCatenaria = svg.getElementById('pathCatenaria');
	if(pathCatenaria) { svg.removeChild(pathCatenaria) }

	function pathXY(i) {
		var valorX = i;
	        var valorY = functionGraph(i);
		if (valorY < YMAX && valorY > YMIN){ 
	      		return "" + valorX + " " + -valorY;
		}
	};

	var myPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	myPath.setAttribute('style', "stroke:red;stroke-width:1%; fill:none");
	myPath.setAttribute('id', "pathCatenaria");

	var ruta = "M";
	for (var i=0; i<600; i++) {	
		var x = XMIN + i*xRange/NUMBER_POINTS;
		var xy = pathXY(x);
		if (xy) {
			if (ruta!="M") {ruta += " L";}
			ruta += xy;
		}
	}
	myPath.setAttribute('d', ruta);
	svg.appendChild(myPath);

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


function dibujaEjes()
{
	var svg = document.getElementById('Grafica');

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
	var pointsX = ""+(XMAX-flechaDelta)+","+(-flechaDelta)+" "+(XMAX-flechaDelta)+","+flechaDelta+" "+XMAX+",0"
	console.log(pointsX);
	flechaX.setAttribute('points', pointsX);
	flechaX.setAttribute('style',"stroke:#006600;stroke-width:2%;");
	svg.appendChild(flechaX);

	var flechaY = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	var pointsY = ""+(-flechaDelta)+","+(-YMAX+flechaDelta)+" "+flechaDelta+","+(-YMAX+flechaDelta)+" "+" "+"0,"+(-YMAX)
	flechaY.setAttribute('points', pointsY);
	flechaY.setAttribute('style',"stroke:#006600;stroke-width:2%;");
	svg.appendChild(flechaY);
}

function Catenaria(x)
{
	var a = Parametro;
	return a*(Math.exp(x/a) + Math.exp(-x/a)) / 2;
};


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
	elemento.plot();
    }

    this.remove = function() {
	elemento.remove();
    }

    this.creaFuncion = function(f, rango, identificador) {
	
	var fxMin = rango.xMin;
	var fxMax = rango.xMax;
	var fxRange = fxMax - fxMin;

	var pathf = svg.getElementById('tramo' + identificador);
	if(pathf) { svg.removeChild(pathf) }
	
	pathf = document.createElementNS("http://www.w3.org/2000/svg", "path");
	pathf.setAttribute('style', "stroke:red;stroke-width:1%; fill:none");
	pathf.setAttribute('id', 'tramo' + identificador);
	
	function pathXY (i) {
	    var valorX = i;
	    var valorY = f(i);
	    if (valorY < rango.yMax && valorY > rango.yMin){ 
		return "" + valorX + " " + -valorY;
	    }
	}

	var ruta = "M";
	for (var i=0; i<600; i++) {	
	    var x = fxMin + i*fxRange/NUMBER_POINTS;
	    var xy = pathXY(x);
	    if (xy) {
		if (ruta!="M") {ruta += " L";}
		ruta += xy;
	    }
	}
	pathf.setAttribute('d', ruta);
	svg.appendChild(pathf);
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
