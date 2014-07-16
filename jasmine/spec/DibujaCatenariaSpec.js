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
