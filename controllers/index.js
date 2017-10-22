import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';

const router = module.exports = express.Router();

router.get('/login', (req, res) => {
	res.render('index');
});

router.get('/registration', (req, res) => {
	res.render('index');
});