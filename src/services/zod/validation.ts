import { Schemas } from "./schemas";

export type SchemasNames = 'addProduct' | `createStore` | 'signup' | 'login'

export const ValidateBody = async ({body, schema}:{body: object, schema: SchemasNames}):Promise<any> => {
  try {
    return await Schemas[schema].parseAsync(body);
  } catch (error) {
    const errorToReturn = { error: true};
    JSON.parse(error.message).forEach((err) => {
      errorToReturn[err.path] = err.message;
    });
    return errorToReturn;
  }
};
