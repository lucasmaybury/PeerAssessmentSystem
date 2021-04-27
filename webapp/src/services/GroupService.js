const helper = require('./helper');

export async function getAll() {
  console.log('getting all groups');
  const response = await fetch('/api/group', {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function getById(data) {
  console.log('getting group');
  console.log(data);
  if (!data['grade']) delete data['grade'];
  const response = await fetch(`/api/group/${data}`, {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function create(data) {
  console.log('creating group');
  console.log(data);
  const response = await fetch('/api/group', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function update(data) {
  console.log('updating group');
  console.log(data);
  const response = await fetch('/api/group', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function deleteRecord(data) {
  console.log('deleting group');
  console.log(data);
  const response = await fetch('/api/group', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}
