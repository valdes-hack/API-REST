const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/users.model');

// Hash passwords if they are not already hashed
users.forEach(async (user) => {
    if (user.password && !user.password.startsWith('$2b$')) { 
        user.password = await bcrypt.hash(user.password, 10);
    }
});

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({ error: "identifiant invalides" });
    }

    // Verify credentials using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "identifiant  invalides" });
    }

    // Generate JWT with user ID and role
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
};