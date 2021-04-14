exports.getUserByUsername = (req, res) => {
  console.log(req.headers);
  const user = {
    username: req.params.username || 'stranger',
    firstName: 'Lucas',
    lastName: 'Maybury',
    role: '2',
  };
  res.json(user);
};

exports.getUsers = (req, res) => {
  const users = [
    {
      username: 'user1',
      firstName: 'Lucas',
      lastName: 'Maybury',
      role: '2',
    },
    {
      username: 'user2',
      firstName: 'Dylan',
      lastName: 'Maybury',
      role: '2',
    }
  ];
  res.json(users);
};
