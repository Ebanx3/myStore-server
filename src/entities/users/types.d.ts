type UserId = string;

type User = {
  id: UserId;
  name: string;
  lastname: string;
  email: string;
  password: string;
  verifiedUser: boolean;
  verificationUserCode?: string;
};

type EditableUserProperties = {
  email?:string;
  password?: string;
  verifiedUser?: boolean;
  verificationUserCode?: string;
}

export interface UserModel {
  /**
   * Creates a new user in the system.
   * @param newUser - The user data, including:
   *  - `name`: User's first name.
   *  - `lastname`: User's last name.
   *  - `password`: Secure password for authentication.
   *  - `email`: A valid email address that is **not yet registered** in the system.
   * @returns A promise that resolves to the unique user ID (`string`) if successful, or {error} if the operation fails.
   */
  signup: (
    newUser: Omit<User, "id" | "verifiedUser">
  ) => Promise<string | { error: string }>;

  /**
   * Retrieves a user by their email address.
   * @param email - The email of the user to search for.
   * @returns A promise that resolves to the found `User` object, or `null` if no matching user exists.
   */
  getByEmail: (email: string) => Promise<User | null>;
  updateUser: ({userId, newValues}:{userId:UserId, newValues:EditableUserProperties}) => Promise<boolean>;
  verifyAccount:(verificationCode:string)=>Promise<string | {error:string}>;
}
