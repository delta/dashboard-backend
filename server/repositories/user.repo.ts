import { UserCollection } from "../schemas/user.schema";

class UserRepository {
  private userCollection: UserCollection;

  constructor(uc: UserCollection) {
    this.userCollection = uc;
  }

  public createUser = async (
    name: string,
    rollNo: string,
    gender: string,
    batch: string
  ) => {
    return await this.userCollection.create({
      name: name,
      rollNumber: rollNo,
      gender: gender,
      batch: batch,
    });
  };

  public findUserByRollNo = async (rollNo: string) => {
    const user = await this.userCollection.findOne({ rollNo: rollNo });
    return user;
  };

  public getUserFromId = async (id: string) => {
    const user = await this.userCollection.findById(id);
    return user;
  };
}

export { UserRepository };
