if (process.argv.includes("--loadEnv")) process.loadEnvFile();

type EnvironmentVariables = {
  PORT: number;
  DB_URL?: string;
  TOKEN_SECRET_KEY?: string;
  TOKEN_EXPIRATION_TIME: string;
  TOKEN_NAME:string;
  EMAIL_USER?:string;
  EMAIL_PASSWORD?:string;
  FRONTEND_URL:string;
  CLOUDINARY_SECRET?: string;
};

const { PORT, TOKEN_SECRET_KEY, TOKEN_EXPIRATION_TIME, DB_URL, TOKEN_NAME, EMAIL_PASSWORD, EMAIL_USER, FRONTEND_URL, CLOUDINARY_SECRET } = process.env;

const envs: EnvironmentVariables = {
  PORT: parseInt(PORT || "8080"),
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION_TIME: TOKEN_EXPIRATION_TIME || "15 days",
  DB_URL,
  TOKEN_NAME: TOKEN_NAME || 'authentication-token',
  EMAIL_USER,
  EMAIL_PASSWORD,
  FRONTEND_URL: FRONTEND_URL || 'http://localhost:5173',
  CLOUDINARY_SECRET
};

if (!envs.TOKEN_SECRET_KEY)
  throw Error("TOKEN_SECRET_KEY environment variable is naecessary.");
if (!envs.EMAIL_USER)
  throw Error("EMAIL_USER environment variable is naecessary.");
if (!envs.EMAIL_PASSWORD)
  throw Error("EMAIL_PASSWORD environment variable is naecessary.");
if(!envs.CLOUDINARY_SECRET){
  throw Error("CLOUDINARY_SECRET environment variable is naecessary.");
}
if (process.argv.includes("--db") && !envs.DB_URL)
  throw Error("DB_URL environment variables is naecessary.");


console.log(envs.DB_URL ? 'production mode' :  'dev mode')

export { envs };
