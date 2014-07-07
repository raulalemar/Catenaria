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
	svg.setAttribute('viewBox', '' + XMIN + ' ' + (-YMAX) + ' ' + xRange + ' ' + yRange);

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

	var texto = document.createTextNode('Parámetro: ' + Parametro);
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
}

function Catenaria(x)
{
	var a = Parametro;
	return a*(Math.exp(x/a) + Math.exp(-x/a)) / 2;
};
