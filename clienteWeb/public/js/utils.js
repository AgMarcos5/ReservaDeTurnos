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

export const buildQuery = function(userQuery) {
    //store query parameters in a temporary variable
    var query = [];
    //loop through user query object
    for (var key in userQuery) {
        //encode the keys and values this is most necessary for search inputs 
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(userQuery[key]));
    }
    //construct new URL
    let new_url = "" + (query.length ? '?' + query.join('&') : '');
    return(new_url);
}