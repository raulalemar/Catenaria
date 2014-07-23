var NUMBER_POINTS = 600;

//function SVGException() {
//  this.message = 'Function Element#svg called, but element does not have a parentSceneElement';
//  this.name = "SVGException";
//}

var Range = function(xMin, xMax, yMin, yMax) {
  this.xMin = xMin;
  this.xMax = xMax;
  this.yMin = yMin;
  this.yMax = yMax;
}

function SceneElement() {
  this.parentSceneElement = null;
  this.identificator = null;
	this.svgElement = null;
};

function Scene(div) {
	this.div = div || null;
	this.elements = new GroupOfSceneElements(this);
	this.range = new Range(0,100,0,100); 
	this.xRange = function() {return this.range.xMax - this.range.xMin};
  this.yRange = function() {return this.range.yMax - this.range.yMin};
	this.add = function(elemento) {
    this.elements.add(elemento);
  }
	this.updateSVG = function() {
		if (!this.svgElement) {
			this.svgElement = document.createElementNS("http://www.w3.org/2000/svg","svg");
			this.svgElement.setAttribute('viewBox', '' + this.range.xMin + 
		   ' ' + (-this.range.yMax) + ' ' + this.xRange() + ' ' + this.yRange());
		}
		if (this.div) {
			div.appendChild(this.svgElement);
		}
	};
	this.plotSVG = function() {
		this.updateSVG();
		this.elements.plotSVG();
	};
  this.remove = function(element) {
    this.elements.remove(element);
  }
}
Scene.prototype = new SceneElement();

function GroupOfSceneElements(parentSceneElement) {
  this._lista = [];
	this.forEach = function(f) {this._lista.forEach(f)};
	
	this.parentSceneElement = parentSceneElement;
  this.length = function() {
    return this._lista.length;
  };
  this.add = function(element) {
		element.parentSceneElement = this;
    this._lista.push(element);
  };
	this.updateSVG = function() {
		if (!this.svgElement) {
			this.svgElement = document.createElementNS("http://www.w3.org/2000/svg","g");
			}
		if (this.parentSceneElement.svgElement) {
			((this.parentSceneElement).svgElement).appendChild(this.svgElement);
		}
	};
	this.plotSVG = function() {
		this.updateSVG();
		this.forEach(function(element) {element.plotSVG()});
	};
  this.remove = function(elemento) {
    elemento.remove();
    var index = this._lista.indexOf(elemento);
    this._lista.splice(index, 1);
  };
}
GroupOfSceneElements.prototype = new SceneElement();

function FunctionGraph(f, range) {
	this.identificator = Math.random().toString();
	this.f = f || function(x) {return 4*x*(1-x/100)};
	this.range = range || new Range(0,100,0,100);
  this.fxRange = function() {return this.range.xMax - this.range.xMin;};
	this.updateSVG = function() {
		if (!this.svgElement) {
			this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
			this.svgElement.classList.add("functionGraph"); 
		};
		if (this.parentSceneElement) {
			this.parentSceneElement.svgElement.appendChild(this.svgElement);
		};
		if (window.getComputedStyle(this.svgElement)['stroke']=='none') {
			this.svgElement.setAttribute('style', "stroke:black; fill:none");
		};
		this.svgElement.setAttribute('id', this.identificator);
		
		this.pointXY = function (x) {
			var valorX = x;
			var valorY = this.f(x);
			if (valorY < this.range.yMax && valorY > this.range.yMin){ 
				return ""+valorX+" "+ (-valorY);
			}
		}

		var ruta = "M";
		for (var i=0; i<600; i++) {	
			var x = this.range.xMin + i*this.fxRange()/NUMBER_POINTS;
			var xy = this.pointXY(x);
			if (xy) {
				if (ruta!="M") {ruta += " L";}
				ruta += xy;
			}
		}
		this.svgElement.setAttribute('d', ruta);
	};
	this.plotSVG = function() {
		this.updateSVG();
	};
	this.remove = function() {
    var pathf = this.svg().getElementById(this.identificator);
    if(pathf) { this.svg().removeChild(pathf) }
  }
}
FunctionGraph.prototype = new SceneElement();

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
