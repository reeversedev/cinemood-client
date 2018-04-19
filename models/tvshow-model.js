const mongoose = require('mongoose');
const tvShowSchema = mongoose.Schema({
    id: String,
    backdrop_path: String,
    first_air_data: String,
    genre_ids: Array,
    id: Number,
    name: String,
    origin_country: Array,
    original_name: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    vote_average: Number,
    vote_count: Number
});
const tvShow = module.exports = mongoose.model('tvShow', tvShowSchema);

module.exports.newTvShow = (newTvShow, callback) => {
    newTvShow.save(callback);
}