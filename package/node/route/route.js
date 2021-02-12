const signup = require("./../service/signup");

let setRouter = (app) => {
  let baseUrl = `/api/v1/users`;

  app.post(`${baseUrl}/signup`, signup.signup);
  app.get(`${baseUrl}`, (req, res) => {
    res.send("hi ashok");
  });
};

module.exports = {
  setRouter: setRouter,
};
