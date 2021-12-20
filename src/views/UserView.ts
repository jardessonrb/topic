import { User } from "../models/User";
import { UserResponse } from "../types/objects-responses";

class UserView{

  static viewUsers(users: User[]): UserResponse[]{
    const usersView = users.map(user => {
      return this.viewUser(user);
    })
    return usersView;
  }

  static viewUser(user: User): UserResponse{
    return {
      id: user.id,
      name: user.name
    };
  }
}

export { UserView };
