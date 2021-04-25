exports.checkStatus = async response => {
  if (!response.ok) {
    let message = await response.text();
    let error = new Error(message || response.statusText);
    error.status = response.status;
    throw error;
  } else {
    return response.json();
  }
};

//adapted from https://www.npmjs.com/package/node-fetch#handling-client-and-server-errors
