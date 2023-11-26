module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.url.includes('/users')) {
    createUser(req.body)
      .then(user => {
        if (user) {
          next();
        } else {
          throw { status: 409, fullError: { detail: 'user with that name already exists' } };
        }
      })
      .catch(error => {
        res.statusCode = error.status || 409;
        res.end(JSON.stringify(error.fullError || {
          detail: 'Internal Server Error ' + error.message || 'Unknown error'
        }));
      });
  } else {
    next();
  }
};

async function createUser(body) {
  try {
    let user = body;
    let response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    let users = await response.json();

    // Check if username already exists
    const nameExists = users.find(u => u.name === user.name);
    if (nameExists) {
      console.log('Username already exists');
      throw { status: 400, fullError: { detail: 'Username already exists' } };
    }

    return !nameExists;
  } catch (error) {
    // Handle internal errors or rethrow if necessary
    throw {
      status: 409, fullError: {
        detail: 'User with that name already exists'
      }
    };
  }
}
