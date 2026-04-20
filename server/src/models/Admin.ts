import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin {
    email: string;
    password: string;
    name: string;
    comparePassword(password: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        name: { type: String, default: 'Admin' },
    },
    { timestamps: true }
);

AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IAdmin>('Admin', AdminSchema);
