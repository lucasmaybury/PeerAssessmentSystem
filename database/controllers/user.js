

exports.getUserByUsername = (req, res) => {
    const user = {
        username: req.params.username || 'stranger',
        firstName: "Lucas",
        lastName: "Maybury",
        role: "2"
    };

    res.json(user);
}