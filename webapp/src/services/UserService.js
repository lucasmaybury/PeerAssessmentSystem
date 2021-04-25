const helper = require('./helper');

export async function getUsers() {
  const response = await fetch('/api/user', {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}

export async function getUserByUsername(data) {
  const response = await fetch(`/api/user/${data}`, {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}

export async function createUser(data) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}
