// Show an element
 const show = function (elem) {
	elem.classList.add('is-visible');
};

// Hide an element
 const hide = function (elem) {
	elem.classList.remove('is-visible');
};

// Toggle element visibility
 const toggle = function (elem) {
	elem.classList.toggle('is-visible');
};

 const buildQuery = function(userQuery) {
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

const hashCode = (str) => {
    let hash = 0, chr;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash < 0 ? hash*-1 : hash;
  }