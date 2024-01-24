import { UserController } from "../controllers/user.ctrl";
import { UserRepository } from "../repositories/user.repo";
import { userCollection } from "../schemas/user.schema";
import { UserService } from "../services/user.svc";

const newUserController = (): UserController => {
  return new UserController(newUserService());
};

const newUserService = (): UserService => {
  return new UserService(newUserRepository());
};

const newUserRepository = (): UserRepository => {
  return new UserRepository(userCollection);
};

export { newUserController, newUserService, newUserRepository };
