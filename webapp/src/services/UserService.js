const helper = require('./helper');

export async function getAll() {
  console.log('getting all users');
  const response = await fetch('/api/user', {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function getById(data) {
  console.log('getting user', data);
  const response = await fetch(`/api/user/${data}`, {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function create(data) {
  console.log('creating user', data);
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function update(data) {
  console.log('updating user', data);
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function deleteRecord(data) {
  console.log('deleting user', data);
  const response = await fetch('/api/user', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}
