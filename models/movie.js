import mongoose from 'mongoose';
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const MovieSchema = mongoose.Schema({
	hall: {type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true},
	name: {type: String, trim: true, required: true},
	startTime: {type: String, trim: true, required: true},
    day: {type: Date, trim: true, required: true},
    duration: {type: String, trim: true, required: true},
    startAt: {type: Date, trim: true, required: true},
    endAt: {type: Date, trim: true, required: true},
    price: {type: String, trim: true, required: true}
}, {
	timestamps: true
});

MovieSchema.plugin(deepPopulate);
mongoose.model('Movie', MovieSchema);