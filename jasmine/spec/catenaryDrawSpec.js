describe("new CatenaryGraph()", function() {
	var catenaryGraph;
	beforeEach(function() {
		catenaryGraph = new CatenaryGraph();
	});
});


describe("pideLongitud", function() {
	it("llama promp", function() {
		spyOn(window, 'prompt');
		pideLongitud();
		expect(prompt).toHaveBeenCalled();
	})
	it("devuelva valor intorducido", function() {
		spyOn(window, 'prompt').and.returnValue(901);
		expect(pideLongitud()).toBe(901);
	})
})


describe("How to create a graph of a catenary", function() {
	var div = document.createElement('div');
	div.setAttribute('style', 'height:100px; max-width:100px;'); 
	//document.body.appendChild(div);
	var scene = new Scene(div);
	var catenaryGraph = new CatenaryGraph();
	scene.add(catenaryGraph);
	scene.plotSVG();
	it("should produce a graph of a catenary", function() {
		var funEl = scene.svgElement.getElementById(catenaryGraph.identificator);
		expect(funEl).toBe(catenaryGraph.svgElement);
		console.log(div);
	});
})
