export const getData = (url, header) => {
        return new Promise( (resolve,reject) => {
                fetch(url, { 
                        headers: header
                })
                    .then(response => response.json() )
                    .then(data => resolve(data))
                    .catch(error => reject([]))
        })
}
