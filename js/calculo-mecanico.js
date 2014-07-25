var div = document.getElementById('divCatenaria');
var escena = new Scene(div);

var cable = new Cable();
cable.elasticModulus = 7.9641*Math.pow(10,10);     // Pa;
cable.dilationCoefficient = 0.00001910;            // ºC^-1
cable.section = 54.60;                             // mm^2
cable.linearDensity = 0.189;                       // kg/m
cable.diameter = 9.5;                              // mm

var span = 100;
var conditions1 = new Conditions();
conditions1.span = span;                            // m

var conditions2 = new Conditions();
conditions2.span = span;


var tramo;
var range = new Range(-conditions1.span/2,conditions1.span/2, 0, 35); // entre 0 y 50 deberia ser, estando el poste a 30
var sceneRange = new Range(-conditions1.span/2 - 0.1*span,conditions1.span/2 + 0.1*span, 0, 40);
var constantes;
var catenariaGraph;
var posteIzquierdoGraph;
var posteDerechoGraph;
var construido = false;


var construirDibujo = function (form) {

  construido = true;

  var temperature = form.temperature.value;
  var windPressure = form.windPressure.value;
  var tension = form.tension.value;

  conditions1.temperature = temperature;
  conditions1.windPressure = windPressure;
  conditions1.tension = tension;
  
  conditions2.temperature = temperature;
  conditions2.windPressure = windPressure;
  
  tramo = new Tramo(cable, conditions1, conditions2);
  tramo.finalConditions.tension = tramo.solveChangeEquation();

  constantes = resuelvaParabola(tramo.a(), -conditions1.span/2,30, conditions1.span/2, 30);
  catenariaGraph = new CatenaryGraph(tramo.a(), constantes[0], constantes[1]);
  posteIzquierdoGraph = new Pole(-conditions1.span, 0, 30);
  posteDerechoGraph   = new Pole(+conditions1.span, 0, 30);

  escena.add(catenariaGraph);
  escena.add(posteIzquierdoGraph);
  escena.add(posteDerechoGraph);
  
  escena.range = sceneRange;
  catenariaGraph.range = range;

  escena.plotSVG();
};

var actualizarDibujo = function (form) {
  var temperature = form.temperature.value;
  var windPressure = form.windPressure.value;

  tramo.finalConditions.temperature = temperature;
  tramo.finalConditions.windPressure = windPressure;

  tramo.finalConditions.tension = tramo.solveChangeEquation();
  
  constantes = resuelvaParabola(tramo.a(), -conditions1.span/2,30, conditions1.span/2, 30);

  catenariaGraph.a = tramo.a();
  catenariaGraph.c1 = constantes[0];
  catenariaGraph.c2 = constantes[1];
  catenariaGraph.updateSVG();
};      


function tableCreate(){
  var body=document.getElementsByTagName('body')[0];
  var tbl=document.createElement('table');
  tbl.style.width='100%';
  tbl.setAttribute('border','1');
  var tbdy=document.createElement('tbody');
  for(var i=0;i<3;i++){
    var tr=document.createElement('tr');
    for(var j=0;j<2;j++){
      var td=document.createElement('td');
      td.appendChild(document.createTextNode('Hola0:' + i + ',' + j))
      //i==1&&j==1?td.setAttribute('rowSpan','2'):null;
      tr.appendChild(td)
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
