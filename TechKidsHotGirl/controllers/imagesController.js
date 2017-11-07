const imagesModel = require('../models/imagesModel');

const createImage = (image, callback) => {
  let newImage = {
    imageUrl: image.imageUrl,
    title: image.title,
    description: image.description
  };

  imagesModel.create(newImage, (err, data) => {
    if (err) {
      console.log(err.message);
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

const getImageById = (id, callback) => {
  imagesModel.findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      data.views += 1;
      data.save((err, updatedData) => {
        if (err) {
          console.log(err);
        }
        console.log(updatedData);
        callback(null, updatedData);
      });
    }
  });
}

const getAllImages = (callback) => {
  imagesModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

module.exports = {
  createImage,
  getImageById,
  getAllImages
}
