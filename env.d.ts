export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "test" | "dev" | "prod";
      DATABASE_URL: string;
    }
  }
}
