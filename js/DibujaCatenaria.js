function Catenaria(x,a,c1,c2){
	if (arguments.length == 1){
		a = 1;
		c1 = 0;
		c2 = 0;
	}
	return a*(Math.exp((x-c1)/a) + Math.exp(-(x-c1)/a))/2 + c2;
};

function FuncionCatenaria(a,c1,c2,rango,identificador) {
	this.a = a;
	this.c1 = c1;
	this.c2 = c2;
	this.f = function(x) {return Catenaria(x,this.a,this.c1,this.c2);};
	this.rango = rango;
	this.identificador = identificador;
}

FuncionCatenaria.prototype = new Funcion();

var plotCatenaria = new Plot();

plotCatenaria.creaSVG();
plotCatenaria.creaEjes();

Tramo1 = new FuncionCatenaria(1,0,0, {xMin: -2, xMax: -1, yMin: -2, yMax: 8}, 1)
//Tramo1 = new Funcion(Catenaria, {xMin: -2, xMax: -1, yMin: -2, yMax: 8}, 1);
Tramo2 = new Funcion(Catenaria, {xMin: 0, xMax: 2, yMin: -2, yMax: 8}, 2);
Poste0 = new Poste(-2, 0, Catenaria(-2), 0);
Poste1 = new Poste(-1, 0, Catenaria(-1), 1);
Poste2 = new Poste(0, 0, Catenaria(0), 2);
Poste3 = new Poste(2, 0, Catenaria(2), 3);
plotCatenaria.add(Tramo1);
plotCatenaria.add(Tramo2);

plotCatenaria.add(Poste0);
plotCatenaria.add(Poste1);
plotCatenaria.add(Poste2);
plotCatenaria.add(Poste3);
