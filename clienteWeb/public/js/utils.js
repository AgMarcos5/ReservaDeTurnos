// Show an element
export const show = function (elem) {
	elem.classList.add('is-visible');
};

// Hide an element
export const hide = function (elem) {
	elem.classList.remove('is-visible');
};

// Toggle element visibility
export const toggle = function (elem) {
	elem.classList.toggle('is-visible');
};