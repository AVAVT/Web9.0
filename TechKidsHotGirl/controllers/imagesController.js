const imagesModel = require('../models/imagesModel');

const createImage = (image, callback) => {
  let newImage = {
    imageUrl: image.imageUrl,
    title: image.title,
    description: image.description,
    poster: image.posterId
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
  imagesModel.findOne({ _id: id }).populate("poster", "username title email userAvatar").exec((err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

const getAllImages = (callback) => {
  imagesModel.find({})
    .populate("poster", "username title email userAvatar")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    });
}

const updateImageView = (id, callback) => {
  imagesModel.find({ _id : id }, (err, data) => {
    data.views += 1;
    data.save((err, updatedData) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null,updatedData);
      }
    })
  })
}

const getAllCookImage = (callback) => {
  getAllImages((err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.map((value) => {
        return cookViewImageData(value);
      }));
    }
  })
}

const cookViewImageData = (imageData) => {
  return {
    id: imageData._id,
    imageUrl: imageData.imageUrl,
    view: imageData.views,
    date: imageData.date,
    plus: imageData.plus.length,
    posterAvatar: imageData.poster.userAvatar,
    posterName: imageData.poster.username,
    posterTitle: imageData.title
  }
}

module.exports = {
  createImage,
  getImageById,
  getAllImages,
  updateImageView,
  cookViewImageData,
  getAllCookImage
}
