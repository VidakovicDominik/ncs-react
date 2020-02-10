export function get(suffix){
    return fetch("http://www.fulek.com/nks/api/aw/"+suffix)
    .then(response=>response.json());
}

export function post(suffix, body){
  return fetch('http://www.fulek.com/nks/api/aw/'+suffix, {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+ localStorage.getItem('token') ,
  },
  body: body
})
}

export function login(body){
  return fetch('http://www.fulek.com/nks/api/aw/login', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: body
}).then(response=>response.json())
}

export function register(body){
  return fetch('http://www.fulek.com/nks/api/aw/registeruser', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: body
});
}