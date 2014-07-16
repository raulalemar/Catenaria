// Lista de funciones:
//    Plot
//    ListaDeElementos
//    Funcion
//    Poste
//    Text
//    Flecha

var NUMBER_POINTS = 600;


function Plot() {

  this.creaSVG = function() {
    var div = document.getElementById('divGrafica');
    if(!div) {
      div = document.createElement("div");
      div.setAttribute("id", "divGrafica");
      document.body.appendChild(div);
    };
    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    div.appendChild(svg);
    svg.setAttribute('width' , '90%');
    svg.setAttribute('height', '90%');
    return svg;
  };

  this.svg = this.creaSVG();
  this.elementos = new ListaDeElementos(this);


  // Estas funciones tontas solo sirven para simplificar el acceso a los elementos
  this.add = function(elemento) {
    this.elementos.add(elemento);
  }

  this.remove = function(elemento) {
    this.elementos.remove(elemento);
  }

  this.plot = function(elemento) {
    this.elementos.plot(elemento);
  }

  this.hide = function(elemento) {
    this.elementos.hide(elemento);
  }

  this.plotAll = function() {
    for (var i=0; i<this.elementos.length(); i++) {
      var elemento = this.elementos._lista[i];
      this.elementos.plot(elemento);
    }
  }

}




var creaRango = function(xMin, xMax, yMin, yMax) {
  rango = new Object();
  rango.xMin = xMin;
  rango.xMax = xMax;
  rango.yMin = yMin;
  rango.yMax = yMax;

  return rango;
}



var limitaSVG = function(svg, rango) {
  xRange = rango.xMax - rango.xMin;
  yRange = rango.yMax - rango.yMin;
  svg.setAttribute('viewBox', '' + (rango.xMin-0.1*xRange) + 
		   ' ' + (-rango.yMax-0.1*yRange) + ' ' + (1.1*xRange) + ' ' + (1.1)*yRange);
}











function ListaDeElementos(plot) {
  this._plotThatBelongs = plot;
  this._lista = [];
  this.esLista = true;
  
  //interface:
  this.length = function() {
    return this._lista.length;
  };

  this.svg = function() {
    return this._plotThatBelongs.svg;
  };


  // Manipular la lista
  this.add = function(elemento) {
    elemento.svg = this.svg(); //asi tienen ya el svg guardado
    this._lista.push(elemento);
  };

  this.remove = function(elemento) {
    this.hide(elemento); // Por si no lo habiamos borrado antes
    var index = this._lista.indexOf(elemento);
    this._lista.splice(index, 1);
  };

  // Manipular los dibujos que estan en la lista
  this.plot = function(elemento) {
    var index = this._lista.indexOf(elemento);
    if(elemento.esLista) { //dibujo cada subelemento
      for(var i=0; i<this._lista[index]._lista.length; i++) {
	this._lista[index]._lista[i].plot()
      }
    }
    else {
      this._lista[index].plot(); //esto funciona si elemento no es otra lista dentro de la original
    }
  }

  this.hide = function() {
    // To be defined
  }
}










function Funcion (f, rango, identificador) {
  this.f = f;
  this.rango = rango;
  this.identificador = identificador;
  this.fxRange = function() {return this.rango.xMax - this.rango.xMin;};
  this.svg = null;

  this.remove = function() {
    var pathf = this.svg.getElementById('tramo' + this.identificador);
    if(pathf) { this.svg.removeChild(pathf) }
  }

  this.plot = function () {
    this.remove();
    
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
    this.svg.appendChild(pathf); 
  }
}












function Poste(x, y, altura, identificador, tipo) {
  this.x = x;
  this.y = y;
  this.altura = altura;
  this.identificador = identificador;
  this.svg = null;

  this.tipo = tipo || 'suspension';

  this.remove = function() {
    var poste = this.svg.getElementById('poste' + identificador);
    if(poste) { this.svg.removeChild(poste) }
  }

  this.plot = function() {
	
    this.remove();
    
    var poste = document.createElementNS("http://www.w3.org/2000/svg", "line");
    poste.setAttribute('id', 'poste' + identificador);
    
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
    this.svg.appendChild(poste);
  }
}












function Text(texto, x,y, identificador) {
  this.texto = texto;
  this.x = x;
  this.y = y;
  this.svg = null;

  this.remove = function() {
		var text = this.svg.getElementById('texto' + identificador);
		if(text) { this.svg.removeChild(text) }
  }

  this.plot = function() {
    this.remove(this.svg);
    // Aqui vamos a añadir el texto con el valor del parametro
    
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('id', "texto"+identificador);
    text.setAttribute('x', this.x);
    text.setAttribute('y', this.y);
    text.setAttribute('font-size', '5%');
    
    var textNode = document.createTextNode(this.texto);
    text.appendChild(textNode);
    
    this.svg.appendChild(text);
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
  this.anchura = 1/3;
  this.svg = null;

  this.remove = function() {
    var flecha = this.svg.getElementById('flecha' + identificador);
    if(flecha) { this.svg.removeChild(flecha); };
    var punta1 = this.svg.getElementById('punta1_' + identificador);
    if(punta1) { this.svg.removeChild(punta1); };
    var punta2 = this.svg.getElementById('punta2_' + identificador);
    if(punta2) { this.svg.removeChild(punta2); };
  }

  this.plot = function() {
    this.remove();

    // Esto lo declaro dentro de plot porque sino, los cambios en size no se reflejan
    this.sizeX = this.size * this.cosTheta;
    this.sizeY = this.size * this.senTheta;
    
    // Linea de la flecha
    var flecha =  document.createElementNS("http://www.w3.org/2000/svg", "line");
    flecha.setAttribute('id', 'flecha' + identificador);
    flecha.setAttribute('x1',  this.x1);
    flecha.setAttribute('y1', -this.y1); // Recordar que las coordenadas van al reves
    flecha.setAttribute('x2',  this.x2);
    flecha.setAttribute('y2', -this.y2);
    flecha.setAttribute('style', "stroke:#00aa00;stroke-width:2px");
    
    this.svg.appendChild(flecha);


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
    
    this.svg.appendChild(punta1);
    this.svg.appendChild(punta2);

  }
}
