function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
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
				compare: function(actual, element) {
					return {
						pass: isDescendant(element, actual),
						message: "Expected the element to be inside the other."
					}
				}
			}
		},
		toBeInstanceOf: function() {
			return {
				compare: function(objectName, className) {
					return {
						pass: objectName instanceof className,
						message: "Expected the element to be inside the other."
					}
				}
			}
		}
	});
}); 
