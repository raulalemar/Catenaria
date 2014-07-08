var Parametro=1; 

function Catenaria(x)
{
	var a = Parametro;
	return a*(Math.exp(x/a) + Math.exp(-x/a)) / 2;
};

var plotCatenaria = new Plot();

plotCatenaria.creaSVG();
plotCatenaria.creaText();
plotCatenaria.creaEjes();

Tramo1 = new Funcion(Catenaria, {xMin: -2, xMax: -1, yMin: -2, yMax: 8}, 1);
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
