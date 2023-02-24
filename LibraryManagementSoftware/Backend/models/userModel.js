import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
        password: { type: String, required: true },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    // Only run this function if password is modified
    if (!this.isModified('password')) return next();

    // Hash the password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; // subtracting 1 sec to counter the time between issuing jwt and document saving time
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    // this.password is not available because this refers to current document and current document does not have password as it is false
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, // milliseconds to seconds
            10 // base 10
        ); // change date object to timestamp (unix)

        // console.log(changedTimeStamp, JWTTimestamp);
        return JWTTimestamp < changedTimeStamp;
    }
    // False means not changed
    return false;
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;