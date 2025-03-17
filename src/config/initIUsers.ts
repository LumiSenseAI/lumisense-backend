// Fichier : src/config/initUsers.ts
import { Admin } from 'mongodb';
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { Enumerator } from '../models/userModel.js';

export const initializeUsers = async () => {
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
        const users = [
            {
                email: "emailAdmin@test.fr",
                username: 'Admin User',
                password: await bcrypt.hash('admin123', 10),
                role: Enumerator.Admin,
            },
            {
                email: "johndoe@test.fr",
                username: 'John Doe',
                password: await bcrypt.hash('admin123', 10),
                role: Enumerator.User,
            },
            {
                email: "janeSmith@test.fr",
                username: 'Jane Smith',
                password: await bcrypt.hash('admin123', 10),
                role: Enumerator.User,
            }
        ];

        await User.insertMany(users);
        console.log('Initialized 3 users in the database.');
    } else {
        console.log('Users already exist in the database.');
    }
};
