var NUMBER_POINTS = 600;

function ListaDeElementos(plot) {
  this._plotThatBelongs = plot;
  this._lista = [];
  
  //interface:
  this.length = function() {
    return this._lista.length;
  };
  
  this.add = function(elemento) {
    this._lista.push(elemento);
  };
	
  this.plot = function(svg) {
    for(var i=0; i<this.length(); i++) {
      this._lista[i].plot(svg);
    }
  }
}


function Plot(rango) {
    
  this.rango = rango;
  this.elementos = new ListaDeElementos(this);
	this.svg = null;

  this.xRange = function() { return this.rango.xMax - this.rango.xMin; };
  this.yRange = function() { return this.rango.yMax - this.rango.yMin; };

  this.creaSVG = function() {
	
    var svg = document.getElementById('Grafica');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '90%');
    svg.setAttribute('viewBox', '' + (this.rango.xMin-0.1*this.xRange()) + 
		     ' ' + (-this.rango.yMax-0.1*this.yRange()) + ' ' + (1.1*this.xRange()) + ' ' + (1.1)*this.yRange());
    return svg;
  };

  //var svg = this.creaSVG();

  // elemento es un objeto que representa a una funcion, un poste, eje, perfil...
  this.add = function(elemento) {
    this.elementos.add(elemento);
  }

  this.remove = function() {
    elemento.remove(this.svg);
  }

  //Plot
  this.plot = function() {
		if (!this.svg) {this.svg = this.creaSVG()};
    this.elementos.plot(this.svg);
  }

}



function Funcion (f, rango, identificador) {
  this.f = f;
  this.rango = rango;
  this.identificador = identificador;
  this.fxRange = function() {return this.rango.xMax - this.rango.xMin;};

  this.remove = function(svg) {
		var pathf = svg.getElementById('tramo' + this.identificador);
		if(pathf) { svg.removeChild(pathf) }
  }

  this.plot = function (svg) {
		this.remove(svg);
	
		var pathf = document.createElementNS("http://www.w3.org/2000/svg", "path");
		pathf.setAttribute('style', "stroke:red;stroke-width:3px; fill:none");
		pathf.setAttribute('id', 'tramo' + this.identificador);
	
		this.pathXY = function (x) {
	    var valorX = x;
	    var valorY = this.f(x);
	    if (valorY < this.rango.yMax && valorY > this.rango.yMin){ 
				return "" + valorX + " " + -valorY;
	    }
		}

		var ruta = "M";
		for (var i=0; i<600; i++) {	
	    var x = this.rango.xMin + i*this.fxRange()/NUMBER_POINTS;
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
		if(poste) { svg.removeChild(poste) }
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

function Text(texto, x,y, identificador) {
  this.texto = texto;
  this.x = x;
  this.y = y;

  this.remove = function(svg) {
		var text = svg.getElementById('texto' + identificador);
		if(text) { svg.removeChild(text) }
  }

  this.plot = function(svg) {
    this.remove(svg);
    // Aqui vamos a añadir el texto con el valor del parametro
    
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('id', "texto"+identificador);
    text.setAttribute('x', this.x);
    text.setAttribute('y', this.y);
    text.setAttribute('font-size', '5%');
    
    var textNode = document.createTextNode(this.texto);
    text.appendChild(textNode);
    
    svg.appendChild(text);
  }
}


function Flecha(x1,y1,x2,y2, identificador) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.xRange = this.x2 - this.x1;
  this.yRange = this.y2 - this.y1;
  this.cosTheta = this.xRange / Math.sqrt(this.xRange*this.xRange + this.yRange*this.yRange);
  this.senTheta = this.yRange / Math.sqrt(this.xRange*this.xRange + this.yRange*this.yRange);
  this.size = 20;
  this.sizeX = this.size * this.cosTheta;
  this.sizeY = this.size * this.senTheta;
  this.anchura = 1/3;

  this.remove = function(svg) {
    var flecha = svg.getElementById('flecha' + identificador);
    if(flecha) { svg.removeChild(flecha); };
    var punta1 = svg.getElementById('punta1_' + identificador);
    if(punta1) { svg.removeChild(punta1); };
    var punta2 = svg.getElementById('punta2_' + identificador);
    if(punta2) { svg.removeChild(punta2); };
  }

  this.plot = function(svg) {
    this.remove(svg);
    
    // Linea de la flecha
    var flecha =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    flecha.setAttribute('id', 'flecha' + identificador);
    flecha.setAttribute('x1',  this.x1);
    flecha.setAttribute('y1', -this.y1); // Recordar que las coordenadas van al reves
    flecha.setAttribute('x2',  this.x2);
    flecha.setAttribute('y2', -this.y2);
    flecha.setAttribute('style', "stroke:#00aa00;stroke-width:2px");
    
    svg.appendChild(flecha);


    // Punta de la flecha
    var punta1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    punta1.setAttribute('id',  'punta1_' + identificador);
    punta1.setAttribute('x1',   this.x2-this.sizeX + this.sizeY*this.anchura);
    punta1.setAttribute('y1', -(this.y2-this.sizeY + this.sizeX*this.anchura)); // Recordar que las coordenadas van al reves
    punta1.setAttribute('x2',   this.x2);
    punta1.setAttribute('y2', - this.y2);
    punta1.setAttribute('style', "stroke:#00aa00;stroke-width:2px");

    var punta2 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    punta2.setAttribute('id',  'punta2_' + identificador);
    punta2.setAttribute('x1',   this.x2-this.sizeX - this.sizeY*this.anchura);
    punta2.setAttribute('y1', -(this.y2-this.sizeY - this.sizeX*this.anchura)); // Recordar que las coordenadas van al reves
    punta2.setAttribute('x2',   this.x2);
    punta2.setAttribute('y2', - this.y2);
    punta2.setAttribute('style', "stroke:#00aa00;stroke-width:2px");
    
    svg.appendChild(punta1);
    svg.appendChild(punta2);

  }
}
