var Parametro=25;         // Parámetro de la catenaria, valores entre 22 y 100 quedan bien

function changeDimensions()
{
	document.getElementById("rect1").setAttribute("width", "100");
}

function dibujaSeno()
{
	var svg = document.getElementById('Grafica');
	var origin = { //origin of axes
	    x: 400,
	    y: 250
	};
	var amplitude = 50;  // wave amplitude
	var rarity = 1;      // point spacing
	var freq = 0.05;     // angular frequency
	var phase = 0;       // phase angle

	for (var i = 1; i < 300; i++)
	{
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

	    	line.setAttribute('x1', (i - 1) * rarity + origin.x);
	    	line.setAttribute('y1', -Math.sin(freq * (i - 1)) * amplitude + origin.y); // El signo menos es porque el eje va para abajo

	    	line.setAttribute('x2', i * rarity + origin.x);
	    	line.setAttribute('y2', -Math.sin(freq * (i)) * amplitude + origin.y);     // Idem
	
	    	line.setAttribute('style', "stroke:black;stroke-width:3");

	    	svg.appendChild(line);
	}
}

function dibujaCatenaria()
{
	var svg = document.getElementById('Grafica').children[0];
	var origin = { //origin of axes
	    x: 400,
	    y: 250
	};     
	var rarity = 1;      // point spacing

	for (var i = -300; i < 300; i++)
	{
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

	    	line.setAttribute('x1', (i - 1) * rarity + origin.x);
	    	line.setAttribute('y1', -Catenaria(i-1) + origin.y); // El signo menos es porque el eje va para abajo

	    	line.setAttribute('x2', i * rarity + origin.x);
	    	line.setAttribute('y2', -Catenaria(i)   + origin.y); // Idem
	
	    	line.setAttribute('style', "stroke:black;stroke-width:3");

	    	svg.appendChild(line);
	}
}

function dibujaEjes()
{
	var svg = document.getElementById('Grafica').children[0];

	var ejeX = document.createElementNS("http://www.w3.org/2000/svg", "line");
	var ejeY = document.createElementNS("http://www.w3.org/2000/svg", "line");

	// Posicion X
	ejeX.setAttribute('x1', 100);
	ejeX.setAttribute('y1', 250);
	ejeX.setAttribute('x2', 700);
	ejeX.setAttribute('y2', 250);

	// Posicion Y
	ejeY.setAttribute('x1', 400);
	ejeY.setAttribute('y1',  10);
	ejeY.setAttribute('x2', 400);
	ejeY.setAttribute('y2', 490);
	

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
