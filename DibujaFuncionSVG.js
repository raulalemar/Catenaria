var Parametro=25;         // Parámetro de la catenaria, valores entre 22 y 100 quedan bien
var YMIN= -5, YMAX = 200;
var XMIN = -350, XMAX = 350;
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

	function pathXY(i) {
		var valorX = i;
	        var valorY = functionGraph(i);
		if (valorY < YMAX && valorY > YMIN){ 
	      		return "" + valorX + " " + -valorY;
		}
	};

	// Aqui vamos a intentarlo haciendo path
	var pathCatenaria = svg.getElementById('pathCatenaria');
	if(pathCatenaria)
	{
		svg.removeChild(pathCatenaria);
	}

	var myPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	var ruta = "M";
	for (var i=XMIN; i<XMAX; i++)
	{
		var xy = pathXY(i);
		if (xy) {
			if (ruta!="M") {ruta += " L";}
			ruta += xy;
		}
		
		
	}
	myPath.setAttribute('style', "stroke:red;stroke-width:3; fill:none");
	myPath.setAttribute('id', "pathCatenaria");
	myPath.setAttribute('d', ruta);
	svg.appendChild(myPath);



	// Aqui vamos a añadir el texto con el valor del parametro
	var textoCatenaria = svg.getElementById('textoCatenaria');
	if(textoCatenaria)
	{
		svg.removeChild(textoCatenaria);
	}

	var myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	myText.setAttribute('id', "textoCatenaria");
	myText.setAttribute('x', 20);
	myText.setAttribute('y', 20);

	var texto = document.createTextNode('Parámetro: ' + Parametro);
	myText.appendChild(texto);

	svg.appendChild(myText);

}

function dibujaCat2(){
   dibuja(Catenaria)
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
	ejeX.setAttribute('style', "stroke:#006600;stroke-width:3");
	ejeY.setAttribute('style', "stroke:#006600;stroke-width:3");

	// Las añadimos
	svg.appendChild(ejeX);
	svg.appendChild(ejeY);
}

function Catenaria(x)
{
	var a = Parametro;
	return a*(Math.exp(x/a) + Math.exp(-x/a)) / 2;
}
