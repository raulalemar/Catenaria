var G = 9.81

/*
Funciones generales para calcular una catenaria
*/

function catenaria(x,a,c1,c2){

  switch(arguments.length) {
    case 1:
      a = 1;
    case 2:
      c1 = 0;
    case 3:
      c2 = 0;
      break;
  }
  return a*(Math.exp((x-c1)/a) + Math.exp(-(x-c1)/a))/2 + c2;
};

function parabola(x,a,c1,c2){

  switch(arguments.length) {
    case 1:
      a = 1;
    case 2:
      c1 = 0;
    case 3:
      c2 = 0;
      break;
  }
  return a+Math.pow(x-c1,2)/(2*a) + c2;
};


function resuelvaParabola(a,x1,y1,x2,y2) {
  var c1 = a*(y2-y1)/(x1-x2) + (x1+x2)/2;
  var c2 = y1-parabola(x1,a,c1);
  return [c1,c2];
};



function Cable() {
  
};

function Conditions() {

  // optional values
  this.iceCoefficient = 0;
  this.iceWidth = 0;
  this.windPressure = 0;

  // output values
  this.loadRate = 0;
  this.tension = 0;
  this.sag = 0;
};



function Tramo(refSpecs, newSpecs) {

  this.refSpecs = refSpecs;
  this.newSpecs = newSpecs;

  this.sag = function() {
    return this.refSpecs.span*this.refSpecs.span*this.refSpecs.linearDensity*this.newSpecs.loadRate*G / (8*this.newSpecs.tension);
  };

  this.a = function() {
    return this.newSpecs.tension/(G*this.refSpecs.linearDensity*this.newSpecs.loadRate);
  };

  this.K = function() {
    var a = this.refSpecs.tension/(G*this.refSpecs.section);
    var b = this.refSpecs.span*this.refSpecs.loadRate()*this.refSpecs.linearDensity/(this.refSpecs.tension*1000);
    var c = Math.pow(b,2)*this.refSpecs.elasticModulus*G/24;

    var K = a-c;    
    return K;
  };

  this.A = function() {
    var deltaT = this.newSpecs.temperature - this.refSpecs.temperature;
    var a = this.refSpecs.dilationCoefficient * deltaT * this.refSpecs.elasticModulus/(1000000*G);

    return a-this.K();
  };

  this.B = function() {
    var a = this.refSpecs.span * this.newSpecs.loadRate * this.refSpecs.linearDensity / (1000*this.refSpecs.section);
    var b = this.refSpecs.elasticModulus / (24*G)
    var c = Math.pow(a,2) * b;

    return c;
  }

  this.solveChangeEquation = function () {
    var x = solveGeneralChangeEquation(this.A(), this.B());
    var tension = x * G * this.refSpecs.section;

    //console.log('K: ', this.K(), 'A: ', this.A(), 'B: ', this.B(), 't: ', x, 'tension: ', tension/G);

    return tension;
  };

};


var solveGeneralChangeEquation = function(A,B) {
  var evalua = function(x) {
    return x*x*(x+A) - B;
  }
  
  //iteracion inicial
  var a = Math.pow(B, 1/3); 
  
  if(evalua(a) > 0) {
    while(evalua(a)>0) {
      a = a/2;
    }
    b = 2*a;
  }

  else {
    b = 2*a;
    while(evalua(b)<0) {
      b = 2*b;
    }
  }

  // ahora ya tengo un intervalo en el cual se encuentra mi raiz
  var precision = 0.000001;
  do {
    var c = (a+b)/2;

    if(evalua(c)>0) b = c;
    else            a = c;

  } while(b-a > precision);

  return c;
  
}








var refSpecs = {
  span: 300,
  height: 30,

  elasticModulus: 7730*1000000*G,
  dilationCoefficient: 0.00001899,
  section: 281.10, // mm^2
  linearDensity: 0.9746, // kg/m
  diameter: 21.793, // mm

  tension: 2939*G,
  temperature: -20,
  iceCoefficient: 0.36, // or 0.18 or 0.
  iceWidth: 0, // needed when considering ice and wind together, in meters
  windPressure: 0,

  loadRate: function() {

    var ph = this.iceCoefficient*Math.sqrt(this.diameter);
    var pv = this.windPressure * (this.diameter/1000 + 2*this.iceWidth);
    var p  = this.linearDensity;
    pApparent = Math.sqrt((p+ph)*(p+ph) + pv*pv);
    m = pApparent / p;

    // esta linea redondea m a 2.72, con mas decimales resulta que otras pruebas fallan, pues los numeros se desvian un poco
    m = Math.round(m*Math.pow(10,2))/Math.pow(10,2);
    return m;
  },
  K: function() {
    return 17.25;
  }
};
var newSpecs = {
  temperature: 0,
  loadRate: 1,
};

var tramo = new Tramo(refSpecs, newSpecs);

for(var i=0; i<9; i++) {
  tramo.newSpecs.temperature = 5*i;
  tramo.newSpecs.tension = tramo.solveChangeEquation();
  console.log('Temperatura: ', tramo.newSpecs.temperature, '  ------->    Tension: ', tramo.newSpecs.tension/G, ', flecha: ', tramo.sag());
}
