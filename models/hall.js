import mongoose from 'mongoose';

const HallSchema = mongoose.Schema({
	name: {type: String, trim: true, required: true, unique: true}
}, {
	timestamps: true
});

mongoose.model('Hall', HallSchema);