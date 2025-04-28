const AccountModal = require("../../Models/AdminModels/AccountModal");
const { authMiddleware } = require("../../Middleware/AdminMiddleware/AdminAuthMiddleware");

module.exports.AllAccount = async (req, res) => {
    try {
        console.log("Request User:", req.user); // Debugging
        const accounts = await AccountModal.find({ userId: req.user.userId }).select('-password'); // Get only the user's accounts
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.AddAccount = [authMiddleware, async (req, res) => {
    try {
        const { name, email, mobileNo, address, type, amount } = req.body;
        
        // Add userId from the authenticated user
        const newAccount = new AccountModal({ 
            userId: req.user.userId, 
            name, 
            email, 
            mobileNo, 
            address, 
            type, 
            amount 
        });

        await newAccount.save();
        res.status(201).json({ message: "Account added successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];

// Update Account Details Route
module.exports.UpdateAccount = [authMiddleware, async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await AccountModal.findByIdAndUpdate(req.user.userId, updates, { new: true, select: '-password' });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];
