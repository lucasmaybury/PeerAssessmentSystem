const helper = require('./helper');

export async function getUsers() {
  console.log('getting all users');
  const response = await fetch('/api/user', {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}

export async function getUserByUsername(data) {
  console.log('gettins user');
  const response = await fetch(`/api/user/${data}`, {
    method: 'GET',
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}

export async function createUser(data) {
  console.log('creating user');
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}

export async function updateUser(data) {
  console.log('updating user');
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}

export async function deleteUser(data) {
  console.log('deleting user');
  console.log(data);
  const response = await fetch('/api/user', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(helper.checkStatus)
    .catch(err => alert(err.message));
  return response;
}
