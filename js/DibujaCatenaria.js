var plotCatenaria = new Plot();

plotCatenaria.creaSVG();
plotCatenaria.creaText();
plotCatenaria.creaEjes();
plotCatenaria.creaFuncion(Catenaria, {xMin: -2, xMax: -1, yMin: -2, yMax: 8}, 1);
plotCatenaria.creaFuncion(Catenaria, {xMin: 0, xMax: 2, yMin: -2, yMax: 8}, 2);
