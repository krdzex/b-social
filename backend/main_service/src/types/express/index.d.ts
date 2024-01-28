import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Response {
    jsonSuccess: (options?: {
      msg?: string;
      data?: any;
      status?: number;
    }) => Response;
    jsonError: (options?: {
      msg?: string;
      data?: any;
      status?: number;
    }) => Response;
  }
}
