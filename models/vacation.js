const mongoose = require('mongoose');
let vacationSchema = new mongoose.Schema({
	vacationPlace: {type: String, required: true},
	description: String
});

var Vacation = mongoose.model('Vacation', vacationSchema);

module.exports = Vacation;
