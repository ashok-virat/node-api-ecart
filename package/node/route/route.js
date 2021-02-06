const signup = require("./../service/signup");

let setRouter = (app) => {
  let baseUrl = `/api/v1/users`;

  app.post(`${baseUrl}/signup`, signup.signup);
};

module.exports = {
  setRouter: setRouter,
};
