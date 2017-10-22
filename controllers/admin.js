import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import moment from 'moment';

const router = module.exports = express.Router();
const Hall = mongoose.model('Hall');
const Movie = mongoose.model('Movie');
const Cashier = mongoose.model('Cashier');

router.get('/', helpers.auth('admin'), (req, res) => {
	res.render('index', {
		name: req.user.name,
		username: req.user.username,
		email: req.user.email
	});
});

router.get('/create', helpers.auth('admin'), (req, res) => {
	res.render('index', {
		name: req.user.name,
		username: req.user.username,
		email: req.user.email
	});
});

router.post('/hall', (req, res, next) => {
	new Hall({name: req.body.name})
		.save((err, hall) => {
			if (err && !req.body.name) return next({
				status: 'error',
                message: 'Hall name is incorrect'
			});

			res.send({
				status: 'success',
				message: 'Hall created',
				_id: hall._id,
				name: hall.name
			})
		})
});

router.post('/movie', (req, res, next) => {
	if (!req.body.hall) return next({
		status: 'error',
		message: 'Movie Hall is required'
	});

	if (req.body.startTime) {
		var startTimeHour = req.body.startTime.split(':')[0];
	}
	if (req.body.startTime) {
		var startTimeSeconds = req.body.startTime.split(':')[1];
	}

	if (req.body.durationHour && req.body.durationSecond) req.body.duration = `${req.body.durationHour}:${req.body.durationSecond}`;
	if (req.body.day && req.body.startTime) req.body.startAt = new Date(`${req.body.day} ${req.body.startTime}`);
	if (req.body.day && req.body.startTime) req.body.endAt = 
		new Date(`${req.body.day} ${+startTimeHour + +req.body.durationHour}:${+startTimeSeconds + +req.body.durationSecond}`);

	// 1.  // start >= startAt <= endAt
		  // end  =>= endAt
	
	// 2. // start <= startAt <= endAt
		 // end  =>= startAt

	// 3. // start <= startAt
		 // end  =>= endAt

	// 4. // start >= startAt
		 // end  <= endAt

	Movie.findOne({
		hall: req.body.hall,		
		$or: [
			{
				startAt: {
					$gte: req.body.startAt,
					$lte: req.body.endAt					
				},
				endAt: {$gte: req.body.endAt}
			},
			{
				startAt: {					
					$lte: req.body.startAt,
					$lte: req.body.endAt					
				},
				endAt: {$gt: req.body.startAt}
			},
			{
				startAt: {$lte: req.body.startAt},
				endAt: {$gte: req.body.endAt}
			},
			{
				startAt: {$gte: req.body.startAt},
				endAt: {$lte: req.body.endAt}
			}
		]		
	})
	.exec()
	.then(data => {
		if (data) return next({
			status: 'error',
            message: 'Change Date or start time'
		});
		return(true);
	})
	.then(status => {
		if (status) {
			new Movie(req.body)
				.save((err, movie) => {
					if (err) {
						if (!req.body.hall) return next({
							status: 'error',
			                message: 'Movie Hall is required'
						})
						if (!req.body.name) return next({
							status: 'error',
			                message: 'Movie name is required'
						})
						if (!req.body.startTime) return next({
							status: 'error',
			                message: 'Movie Start time name is required'
						})
						if (!req.body.day) return next({
							status: 'error',
			                message: 'Movie Day is required'
						})
						if (!req.body.duration) return next({
							status: 'error',
			                message: 'Movie Duration is required'
						})
						if (!req.body.price) return next({
							status: 'error',
			                message: 'Movie Price is required'
						})
						return next(err);
					};

					Movie.findOne({_id: movie._id})
						.deepPopulate('hall')
						.exec((err, movie) => {
							if (err) return next(err);
							res.send({
								status: 'success',
								message: 'movie created',
								_id: movie._id,
								hall: movie.hall,
								name: movie.name,
								startTime: movie.startTime,
								day: movie.day,
								duration: movie.duration,
								price: movie.price
							})
						});			
				});
		}
	})
	.catch(err => {
    	return next(err);
    });
});

router.post('/cashier', (req, res, next) => {
	new Cashier(req.body)
		.save((err, cashier) => {
			if (err) {
				if (!req.body.name) return next({
					status: 'error',
	                message: 'Cashier Name is required'
				})

				if (!req.body.username) return next({
					status: 'error',
	                message: 'Cashier Username is required'
				})

				if (!req.body.password) return next({
					status: 'error',
	                message: 'Cashier Password is required'
				})

				Cashier.findOne({username: req.body.username})
					.exec()
					.then(cashier => {
						if (cashier) return next({
							status: 'error',
	                		message: 'Cashier username already exists'
						})
					})
					.catch(err => {
                    	return next(err);
                    });
			} else {
				res.send({
					status: 'success',
					message: cashier && cashier.username && `cashier ${cashier.username} is created`,
					username: cashier && cashier.username
				});
			}
		})
});