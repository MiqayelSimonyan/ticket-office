import express from 'express';
import mongoose from 'mongoose';

const router = module.exports = express.Router();
const Admin = mongoose.model('Admin');
const Movie = mongoose.model('Movie');
const Hall = mongoose.model('Hall');
const Cashier = mongoose.model('Cashier');

router.get('/api/movies', helpers.auth('admin'), (req, res, next) => {
	Movie.find({})
		.deepPopulate('hall')
		.exec((err, movies) => {
			if (err) return next(err);
			res.send(movies);
		})
});

router.get('/api/movie/days', helpers.auth('admin'), (req, res, next) => {
	Movie.find().distinct('day', function(err, days) {
	    if (err) return next(err);
	    days.unshift('')
	    res.send(days);
	});
});

router.put('/api/movie/edit', helpers.auth('admin'), (req, res, next) => {
	var movie = req.body;
	Movie.findOneAndUpdate({_id: movie.id}, 
		{$set: {
			hall: movie.hall,
			name: movie.name,
			startTime: movie.startTime,
			day: movie.day,
			duration: movie.duration,
			price: movie.price
		}},
		(err, doc) => {
			if (err) return next(err);
			Movie.findOne({_id: movie.id})
				.deepPopulate('hall')
				.exec((err, data) => {
					if (err) return next(err);
					res.send({
						movie: data,
						message: 'movie edited'
					});
				});
		});
});

router.delete('/api/movie/delete', helpers.auth('admin'), (req, res, next) => {
	Movie.remove({_id: req.body.id})
		.exec((err, data) => {
			if (err) return next(err);
			res.send({
				id: req.body.id,
				message: 'movie deleted'
			});
		})
});

router.get('/api/halls', helpers.auth('admin'), (req, res, next) => {
	Hall.find({})
		.exec((err, halls) => {
			if (err) return next(err);
			res.send(halls);
		});
});

router.get('/api/cashiers', helpers.auth('admin'), (req, res, next) => {
	Cashier.find({}, {password: false})
		.exec((err, cashiers) => {
			if (err) return next(err);
			res.send(cashiers);
		})
});