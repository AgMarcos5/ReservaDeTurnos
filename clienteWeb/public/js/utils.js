// Mostrar un elemento
 const show = function (elem) {
	elem.classList.add('is-visible');
};

// Ocultar un elemento
 const hide = function (elem) {
	elem.classList.remove('is-visible');
};

// Toggle
 const toggle = function (elem) {
	elem.classList.toggle('is-visible');
};

 const buildQuery = function(userQuery) {
    var query = [];
    for (var key in userQuery) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(userQuery[key]));
    }
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