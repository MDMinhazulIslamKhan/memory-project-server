import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
// this is for authentication, but not use. because I use firebase 
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "User doesn't password" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret_string', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
};

export const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exist" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name, });

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret_string', { expiresIn: "1h" });
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
};
