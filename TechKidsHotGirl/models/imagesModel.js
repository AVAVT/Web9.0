const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imagesModel = new Schema({
  imageUrl: { type : String, required: true },
  views: { type: Number, default: 0 },
  plus: { type: [ ObjectId ], default: [] },
  title: { type: String, required: true },
  description: { type: String },
  poster: { type: ObjectId, ref: 'users' }
}, { timestamps: { createdAt: 'date' } });

module.exports = mongoose.model('images', imagesModel);
