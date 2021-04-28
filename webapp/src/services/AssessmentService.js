const helper = require('./helper');

export async function getAll() {
  console.log('getting all assessments');
  const response = await fetch('/api/assessment', {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function getById(data) {
  console.log('getting assessment');
  console.log(data);
  if (!data['grade']) delete data['grade'];
  const response = await fetch(`/api/assessment/${data}`, {
    method: 'GET',
  }).then(helper.checkStatus);
  return response;
}

export async function create(data) {
  console.log('creating assessment');
  console.log(data);
  const response = await fetch('/api/assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function update(data) {
  console.log('updating assessment');
  console.log(data);
  const response = await fetch('/api/assessment', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}

export async function deleteRecord(data) {
  console.log('deleting assessment');
  console.log(data);
  const response = await fetch('/api/assessment', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(helper.checkStatus);
  return response;
}
