export async function getUsers() {
  const response = await fetch('/api/user');
  return await response.json();
}

export async function getUserByUsername(data) {
  const response = await fetch(`/api/user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: data }),
  });
  return await response.json();
}

export async function createUser(data) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
}
