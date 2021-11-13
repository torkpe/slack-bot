import { Request, Response } from 'express';
import Hello from "../modules/hello";
import Interactions from "../modules/interactions";

export default (app: any) => {
  const apiVersion = `/api/${process.env.API_VERSION}`;
  app.use(`${apiVersion}/hello`, Hello);
  app.use(`${apiVersion}/interactions`, Interactions);
  app.use(apiVersion + "/healthz", (req: Request, res: Response) =>
  res.status(200).json({ message: "Active" })
  );
};
