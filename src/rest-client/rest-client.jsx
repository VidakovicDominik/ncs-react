export function get(suffix){
    return fetch("http://www.fulek.com/nks/api/aw/"+suffix)
    .then(res=>res.json());
}

export function post(suffix, body, token){
  return fetch('https:http://www.fulek.com/nks/api/aw/'+suffix, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+token ,
  },
  body: body
}).then(response=>response.json())
}

export function login(username, password){
  return fetch('https:http://www.fulek.com/nks/api/aw/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: {username:username, password: password}
}).then(response=>response.json())
}