const shortid = require("shortid");
const mongoose = require("mongoose");
const userpath = require("./../model/user");
const userModel = mongoose.model("User");
const response = require("./../libs/responseLib");
const paramValidation = require("./../libs/paramValidation");

let signup = (req, res) => {
  let validateuseremail = () => {
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        if (!paramValidation.Email(req.body.email)) {
          let apiResponse = response.response(
            true,
            "email does not meet requirement",
            404,
            null
          );
          reject(apiResponse);
        } else if (paramValidation.isEmpty(req.body.email)) {
          let apiResponse = response.response(
            true,
            "email is not there",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        let apiResponse = response.response(
          true,
          "email parameter is missing",
          403,
          null
        );
        reject(apiResponse);
      }
    });
  };
  let validateuserpassword = () => {
    return new Promise((resolve, reject) => {
      if (req.body.password) {
        if (!paramValidation.Password(req.body.password)) {
          let apiResponse = response.response(
            true,
            "password does not meet requirement",
            404,
            null
          );
          reject(apiResponse);
        } else if (paramValidation.isEmpty(req.body.password)) {
          let apiResponse = response.response(
            true,
            "password is not there",
            400,
            null
          );
          reject(apiResponse);
        } else {
          resolve(req);
        }
      } else {
        let apiResponse = response.response(
          true,
          "password parameter is missing",
          403,
          null
        );
        reject(apiResponse);
      }
    });
  };

  let createUser = () => {
    return new Promise((resolve, reject) => {
      userModel.findOne({ email: req.body.email }).exec((err, emailDeatils) => {
        if (err) {
          let apiResponse = response.response(true, err.message, 400, null);
          reject(apiResponse);
        } else if (paramValidation.isEmpty(emailDeatils)) {
          let createuser = new userModel({
            userId: shortid.generate(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            countryCode: req.body.countryCode,
            email: req.body.email,
            password: req.body.password,
            createdOn: Date.now(),
          });
          createuser.save((err, createuser) => {
            if (err) {
              let apiResponse = response.response(true, err.message, 403, null);
              reject(apiResponse);
            } else {
              let object = createuser.toObject();
              resolve(object);
            }
          });
        } else {
          let apiResponse = response.response(
            true,
            "email is already present",
            500,
            null
          );
          reject(apiResponse);
        }
      });
    });
  };

  validateuseremail(req, res)
    .then(validateuserpassword)
    .then(createUser)
    .then((resolve) => {
      delete resolve.password;
      let apiResponse = response.response(
        false,
        "signup succesfully",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch((reject) => {
      res.send(reject);
    });
};

module.exports = {
  signup: signup,
};
