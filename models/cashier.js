import mongoose from 'mongoose';
import crypto from 'crypto';

var CashierSchema = mongoose.Schema({
	name: {type: String, trim: true, required: true},
	username: {type: String, trim: true, unique: true, required: true},
	password: {type: String, trim: true, required: true},
}, {
	timestamps: true
});

/**
 * Pre-save hook
 */
CashierSchema.pre('findOne', function (next) {
    if (this._conditions.password) {
        this._conditions.password = crypto.createHash('md5').update(this._conditions.password).digest("hex");
    }

    next();
});

CashierSchema.pre('save', function (next) {
    if (this.password.length >= 1 && this.password.length != 32) {
        this.password = crypto.createHash('md5').update(this.password).digest("hex");
    }
    next();
});

mongoose.model('Cashier', CashierSchema);