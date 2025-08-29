import { EditableUserProperties, User, UserBeforeInitiation, UserId, UserModel } from "./types";

class DBRenderModel implements UserModel {
  private static instance: DBRenderModel;
  private constructor() {}
  public static getInstance() {
    if (DBRenderModel.instance === undefined)
      DBRenderModel.instance = new DBRenderModel();
    return DBRenderModel.instance;
  }

  signup: (newUser: UserBeforeInitiation) => Promise<string>;
  getByEmail: (email: string) => Promise<User | null>;
  verifyAccount: (verificationCode: string) => Promise<string | { error: string; }>;
  updateUser: ({ userId, newValues }: { userId: UserId; newValues: EditableUserProperties; }) => Promise<boolean>;
}

export { DBRenderModel };
