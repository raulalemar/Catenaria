function isDescendant(descendant, child) {
//descendant, child: Elements objects (nodes) 
  var parent = child.parentNode;
  if (parent == null) {
		return false
	} else if (descendant == parent) {
		return true
	} else {
		return isDescendant(descendant, parent)
	}
}
function isAntecedent(child, parent) {
	return isDescendant(parent, child)
}

Array.prototype.duplicates = function() {
	var duplicates = this.filter(function(elem, pos, self) {
		return self.indexOf(elem) != pos;
	});
	var duplicatesWithoutDuplicates = 	duplicates.filter(function(elem, pos, self) {
		return self.indexOf(elem) == pos;
	});
	return duplicatesWithoutDuplicates;
};

beforeEach(function() {
	jasmine.addMatchers({
		toBeBetween: function() {
			return {
				compare: function(actual,lower, upper) {
					return {
						pass: actual >= lower && actual <= upper,
						message: "Expected " + actual + " to be between " + lower + " and " + upper + " (inclusive)"
					}
				}
			}
		},
		toHaveDistinctValues: function() {
			return {
				compare: function(actual) {
					duplicates = actual.duplicates();
					return {
						pass: duplicates.length==0,
						message: "Expected the list not to have duplicates. However the following element(s):" +duplicates.toString() + " is/are repeated."
					}
				}
			}
		},
		toContainClass: function() {
			return {
				compare: function(actual, className) {
					return {
						pass: actual.classList.contains(className),
						message: "Expected the classList to contain " + className + "."
					}
				}
			}
		},
		toBeDescendantOf: function() {
			return {
				compare: function(actual, parent) {
					return {
						pass: isDescendant(parent, actual),
						message: "Expected the element to be descendant of the other."
					}
				}
			}
		},
		toBeInstanceOf: function() {
			return {
				compare: function(objectName, className) {
					return {
						pass: objectName instanceof className,
						message: "Expected the element to be instance of the class."
					}
				}
			}
		},
		//the following works only with a browser
		toBeFullyContainedIn: function() {
			function isInside(rect1,rect2) {
				//rect1,rect2: TextRectangles objects
				return (rect1.height<=rect2.height) && (rect1.width<=rect2.width) && (rect1.bottom<=rect2.bottom) && (rect1.left>=rect2.left);
			};
			return {
				compare: function(actual, parent) {
					var rectInside = actual.getBoundingClientRect();
					var rectOutside = parent.getBoundingClientRect();
					return {
						pass: isInside(rectInside, rectOutside),
						message: "Expected the element to be inside the other. It should, "+rectInside.height+'<='+
							rectOutside.height+'::'+rectInside.width+"<="+rectOutside.width+"::"+rectInside.bottom+
							'<='+rectOutside.bottom+"::"+rectInside.left+">="+rectOutside.left
					}
				}
			}
		},
	});
}); 
