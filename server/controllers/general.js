import user from '../models/user.js';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await user.findById(id);
        res.status(200).json(userFound);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
