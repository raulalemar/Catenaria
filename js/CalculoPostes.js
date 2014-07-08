var X1 = -5, X2 = 7;
var Y1 =7,  Y2 = 8;

function dibujaPostes () {
    var svg = document.getElementById('Grafica');

    var poste1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    var poste2 = document.createElementNS("http://www.w3.org/2000/svg", "line");

    // poste1
    poste1.setAttribute('x1', X1);
    poste1.setAttribute('y1', 0);
    poste1.setAttribute('x2', X1);
    poste1.setAttribute('y2', -Y1);
    
    // poste2
    poste2.setAttribute('x1', X2);
    poste2.setAttribute('y1', 0);
    poste2.setAttribute('x2', X2);
    poste2.setAttribute('y2', -Y2);
    
    
    // Colores
    poste1.setAttribute('style', "stroke:#0000aa;stroke-width:1%");
    poste2.setAttribute('style', "stroke:#0000aa;stroke-width:1%");
    
    // Las añadimos
    svg.appendChild(poste1);
    svg.appendChild(poste2);
};

function calculaC1 () {
    return Parametro*(Y2-Y1)/(X1-X2) + (X1+X2)/2;
};

function calculaC2 () {
    return Y1-Catenaria(X1-calculaC1());
};

function CatenariaAjustada(x,C1,C2) {
    return Catenaria( x-C1 ) + C2;
};
