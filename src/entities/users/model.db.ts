import { User, UserModel } from "./types";

class DBRenderModel implements UserModel {
  private static instance: DBRenderModel;
  private constructor() {}
  public static getInstance() {
    if (DBRenderModel.instance === undefined)
      DBRenderModel.instance = new DBRenderModel();
    return DBRenderModel.instance;
  }

  signup: (newUser: Omit<User, "id" | "verifiedUser">) => Promise<string>;
  getByEmail: (email: string) => Promise<User | null>;
}

export { DBRenderModel };
