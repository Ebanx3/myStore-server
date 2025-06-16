import { hashPassword } from "../../utils/bcrypt";
import { EditableUserProperties, User, UserId, UserModel } from "./types";
import { v4 as uuid } from "uuid";

const users: User[] = [];

const editableUserProperties: (keyof EditableUserProperties)[] = [
  "password",
  "email",
  "verifiedUser",
  "verificationUserCode"
];

class MemoryModel implements UserModel {
  private static instance: MemoryModel;
  private constructor() {}
  public static getInstance() {
    if (MemoryModel.instance === undefined)
      MemoryModel.instance = new MemoryModel();
    return MemoryModel.instance;
  }

  signup = async (newUser: Omit<User, "id" | "verifiedUser">) => {
    if (users.some((user) => user.email === newUser.email)) return {error:'Email already used'};
    
    const hashedPass = await hashPassword(newUser.password);
    if(!hashedPass) return {error: "Error trying to encrypt passowrd"}

    const user: User = { ...newUser, id: uuid(), verifiedUser: false, password: hashedPass };
    users.push(user);
    return user.id;
  };
  
  getByEmail = (email: string) => {
    return new Promise<User|null>((resolve) => {
      const index = users.findIndex(user => user.email === email);
      if(index<0) resolve(null);
      resolve(users[index]);
    })
  };

  updateUser = async ({userId, newValues}:{userId: UserId, newValues: EditableUserProperties}) => {
    const index = users.findIndex(user => user.id === userId);
    if(index < 0) return false;
    
    const filteredValues: EditableUserProperties = Object.keys(newValues)
          .filter((key) => editableUserProperties.some(p => p === key))
          .reduce((acc, key) => {
            acc[key] = newValues[key as keyof EditableUserProperties];
            return acc;
          }, {} as EditableUserProperties);

    users[index] = { ...users[index], ...filteredValues }
    console.log(users)
    return true;
  };

  verifyAccount = async (verificationCode: string) => {
    const index = users.findIndex(user => user.verificationUserCode === verificationCode);
    if(index<0) return {error:'Invalid verification code'};

    if(users[index].verifiedUser) return {error:'User already verified'};
    
    this.updateUser({userId:users[index].id, newValues:{verifiedUser:true}});
    return 'User verified successfully';
  };
}

export { MemoryModel };
