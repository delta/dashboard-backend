import { newUserController } from "../registry/user";
import { UserController } from "./user.ctrl";

class AppController {
  User: UserController;

  constructor() {
    this.User = newUserController();
  }
}

export { AppController };
