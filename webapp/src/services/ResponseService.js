const helper = require('./helper');

export async function getAll() {
  console.log('getting all responses');
  const response = await fetch('/api/response', {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function getById(data) {
  console.log('getting response'.data);
  if (!data['grade']) delete data['grade'];
  const response = await fetch(`/api/response/${data}`, {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function create(data) {
  console.log('creating response', data);
  const response = await fetch('/api/response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function update(data) {
  console.log('updating response', data);
  const response = await fetch('/api/response', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function deleteRecord(data) {
  console.log('deleting response', data);
  const response = await fetch('/api/response', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}
