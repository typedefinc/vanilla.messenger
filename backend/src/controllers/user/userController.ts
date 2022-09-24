import userService from '../../service/user/userService';

class UserController {

  async signup(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await userService.signup(login, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });

      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  async users(req, res, next) {
    try {
      res.json(['123']);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();