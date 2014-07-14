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

  this.xRange = function() {
		return this.rango.xMax - this.rango.xMin;
  }
  this.yRange = function() {
		return this.rango.yMax - this.rango.yMin;
  }

  this.creaSVG = function() {
	
		var svg = document.getElementById('Grafica');
		svg.setAttribute('width', '100%');
		svg.setAttribute('height', '90%');
		svg.setAttribute('viewBox', '' + (this.rango.xMin-0.1*this.xRange()) + 
										 ' ' + (-this.rango.yMax-0.1*this.yRange()) + ' ' + (1.1*this.xRange()) + ' ' + (1.1)*this.yRange());
		return svg;
  }

  var svg = this.creaSVG();

  // elemento es un objeto que representa a una funcion, un poste, eje, perfil...
  this.add = function(elemento) {
		this.elementos.add(elemento);
  }

  this.remove = function() {
		elemento.remove(svg);
  }

	//Plot
	this.plot = function() {
		console.log("plot");
		this.elementos.plot(svg);
	}

  this.creaEjes = function() {
		var ejeX = document.createElementNS("http://www.w3.org/2000/svg", "line");
		var ejeY = document.createElementNS("http://www.w3.org/2000/svg", "line");

		// Eje X
		ejeX.setAttribute('x1', this.rango.xMin);
		ejeX.setAttribute('y1', 0);
		ejeX.setAttribute('x2', this.rango.xMax);
		ejeX.setAttribute('y2', 0);

		// Eje Y
		ejeY.setAttribute('x1', 0);
		ejeY.setAttribute('y1', -this.rango.yMin);
		ejeY.setAttribute('x2', 0);
		ejeY.setAttribute('y2', -this.rango.yMax);
	

		// Colores
		ejeX.setAttribute('style', "stroke:#006600;stroke-width:2px%");
		ejeY.setAttribute('style', "stroke:#006600;stroke-width:2px%");

		// Las añadimos
		svg.appendChild(ejeX);
		svg.appendChild(ejeY);

		//flechas
		/*var flechaDelta = 0.0005;

		var flechaX = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		var pointsX = ""+(this.rango.xMax-flechaDelta)+","+(-flechaDelta/2)+" "
                                +(this.rango.xMax-flechaDelta)+","+flechaDelta/2+" "+this.rango.xMax+",0";
		flechaX.setAttribute('points', pointsX);
		flechaX.setAttribute('style',"stroke:#006600;stroke-width:2%;");
		svg.appendChild(flechaX);

		var flechaY = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		var pointsY = ""+(-flechaDelta/2)+","+(-this.rango.yMax+flechaDelta)+" "
                                +flechaDelta/2+","+(-this.rango.yMax+flechaDelta)+" "+" "+"0,"+(-YMAX);
		flechaY.setAttribute('points', pointsY);
		flechaY.setAttribute('style',"stroke:#006600;stroke-width:2%;");
		svg.appendChild(flechaY);*/
  }
}



function Funcion (f, rango, identificador) {

  this.f = f;
	this.rango = rango;
//  this.fxMin = this.rango.xMin;
//  this.fxMax = this.rango.xMax;
//  this.fyMin = this.rango.yMin;
//  this.fyMax = this.rango.yMax;
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
