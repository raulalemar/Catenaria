// Lista de funciones:
//    Scene
//    GroupOfSceneElements
//    FunctionGraph
//    Poste
//    Text
//    Flecha

var NUMBER_POINTS = 600;

function SVGException() {
  this.message = 'Function Element#svg called, but element does not have a father';
  this.name = "SVGException";
}

var Rango = function(xMin, xMax, yMin, yMax) {
  this.xMin = xMin;
  this.xMax = xMax;
  this.yMin = yMin;
  this.yMax = yMax;
}

function SceneElement() {
  this.father = null;
  this.identificator = null;

  this.svg = function() {
	  if (this.father) {
	    return this.father.svg();
	  }
    throw new SVGException;
  };

	this.tagSVG = null;
};

function Scene() {
	
	this.rango = new Rango(0,100,0,100); 

	this.updateTagSVG = function(div) {
		if (!this.tagSVG) {
			this.tagSVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
			if (div) {
				div.appendChild(this.tagSVG);
			}
		}
	};

	this.elements = new GroupOfSceneElements(this);

  this.creaSVG = function() {

    var div = document.getElementById('divGrafica');
    if(!div) {
      div = document.createElement("div");
      div.setAttribute("id", "divGrafica");
      document.body.appendChild(div);
    };

		this.updateTagSVG(div);
		var svg = this.tagSVG;
    svg.setAttribute('width' , '90%');
    svg.setAttribute('height', '90%');
		
    return svg;
  };

  this._svg = function() {
		var svg = null;
		return function() {
			if (!svg) {svg = this.creaSVG()};
			return svg;
		}
	}
  this.svg = this._svg();




  // Estas funciones tontas solo sirven para simplificar el acceso a los elementos
  this.add = function(elemento) {
    this.elements.add(elemento);
  }

  this.remove = function(elemento) {
    this.elements.remove(elemento);
  }

  this.plot = function() {
    this.elements.plot();
  }
}

Scene.prototype = new SceneElement();

var limitaSVG = function(svg, rango) {
  xRange = rango.xMax - rango.xMin;
  yRange = rango.yMax - rango.yMin;
  svg.setAttribute('viewBox', '' + (rango.xMin-0.1*xRange) + 
		   ' ' + (-rango.yMax-0.1*yRange) + ' ' + (1.1*xRange) + ' ' + (1.1)*yRange);
}

function GroupOfSceneElements(father) {
  this._lista = [];
  this.father = father;
  //interface:
  this.length = function() {
    return this._lista.length;
  };


  // Manipular la lista
  this.add = function(elemento) {
		elemento.father = this;
    this._lista.push(elemento);
  };

  this.remove = function(elemento) {
    elemento.remove();
    var index = this._lista.indexOf(elemento);
    this._lista.splice(index, 1);
  };

  // Manipular los dibujos que estan en la lista
  this.plot = function() {
		this._lista.forEach(function(elemento) {elemento.plot()});
  }

  this.hide = function(elemento) {
    // To be defined
    
  }
}

GroupOfSceneElements.prototype = new SceneElement();

function FunctionGraph(f, rango) {
	this.identificator = Math.random().toString();

  if (f) this.f = f
  else this.f = function(x) {return 4*x*(1-x/100);};

  if (rango)  this.rango = rango
  else this.rango = new Rango(0,100,0,100);

  this.fxRange = function() {return this.rango.xMax - this.rango.xMin;};

  this.remove = function() {
    var pathf = this.svg().getElementById(this.identificator);
    if(pathf) { this.svg().removeChild(pathf) }
  }

	this.updateTagSVG = function() {
		if (!this.tagSVG) {
			this.tagSVG = document.createElementNS("http://www.w3.org/2000/svg", "path");
		};
	};

  this.plot = function () {
    this.remove();
		this.updateTagSVG();
    var pathf = this.tagSVG; 
    pathf.setAttribute('style', "stroke:red;stroke-width:3px; fill:none");
    pathf.setAttribute('id', this.identificator);
    
    this.pathXY = function (x) {
      var valorX = x;
      var valorY = this.f(x);
      if (valorY < this.rango.yMax && valorY > this.rango.yMin){ 
				return ""+valorX+" "+ (-valorY);
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
    this.svg().appendChild(pathf); 
  }
}

FunctionGraph.prototype = new SceneElement();

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



function Text(texto, x,y, identificator) {
  this.texto = texto;
  this.x = x;
  this.y = y;

  this.remove = function() {
		var text = this.svg().getElementById('texto' + identificator);
		if(text) { this.svg().removeChild(text) }
  }

  this.plot = function() {
    this.remove();
    // Aqui vamos a añadir el texto con el valor del parametro
    
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('id', "texto"+identificator);
    text.setAttribute('x', this.x);
    text.setAttribute('y', this.y);
    text.setAttribute('font-size', '5%');
    
    var textNode = document.createTextNode(this.texto);
    text.appendChild(textNode);
    
    this.svg().appendChild(text);
  }
}

Text.prototype = new SceneElement();

/////////////////////////////////////////////

function Flecha(x1,y1,x2,y2, identificator) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.xRange = this.x2 - this.x1;
  this.yRange = this.y2 - this.y1;
  this.cosTheta = this.xRange / Math.sqrt(this.xRange*this.xRange + this.yRange*this.yRange);
  this.senTheta = this.yRange / Math.sqrt(this.xRange*this.xRange + this.yRange*this.yRange);
  this.size = 20;
  this.anchura = 1/3;

  this.remove = function() {
    var flecha = this.svg().getElementById('flecha' + identificator);
    if(flecha) { this.svg().removeChild(flecha); };
    var punta1 = this.svg().getElementById('punta1_' + identificator);
    if(punta1) { this.svg().removeChild(punta1); };
    var punta2 = this.svg().getElementById('punta2_' + identificator);
    if(punta2) { this.svg().removeChild(punta2); };
  }

  this.plot = function() {
    this.remove();

    // Esto lo declaro dentro de plot porque sino, los cambios en size no se reflejan
    this.sizeX = this.size * this.cosTheta;
    this.sizeY = this.size * this.senTheta;
    
    // Linea de la flecha
    var flecha =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    flecha.setAttribute('id', 'flecha' + identificator);
    flecha.setAttribute('x1',  this.x1);
    flecha.setAttribute('y1', -this.y1); // Recordar que las coordenadas van al reves
    flecha.setAttribute('x2',  this.x2);
    flecha.setAttribute('y2', -this.y2);
    flecha.setAttribute('style', "stroke:#00aa00;stroke-width:2px");
    
    this.svg().appendChild(flecha);


    // Punta de la flecha
    var punta1 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    punta1.setAttribute('id',  'punta1_' + identificator);
    punta1.setAttribute('x1',   this.x2-this.sizeX + this.sizeY*this.anchura);
    punta1.setAttribute('y1', -(this.y2-this.sizeY + this.sizeX*this.anchura)); // Recordar que las coordenadas van al reves
    punta1.setAttribute('x2',   this.x2);
    punta1.setAttribute('y2', - this.y2);
    punta1.setAttribute('style', "stroke:#00aa00;stroke-width:2px");

    var punta2 =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    punta2.setAttribute('id',  'punta2_' + identificator);
    punta2.setAttribute('x1',   this.x2-this.sizeX - this.sizeY*this.anchura);
    punta2.setAttribute('y1', -(this.y2-this.sizeY - this.sizeX*this.anchura)); // Recordar que las coordenadas van al reves
    punta2.setAttribute('x2',   this.x2);
    punta2.setAttribute('y2', - this.y2);
    punta2.setAttribute('style', "stroke:#00aa00;stroke-width:2px");
    
    this.svg().appendChild(punta1);
    this.svg().appendChild(punta2);

  }
}

Flecha.prototype = new SceneElement();
