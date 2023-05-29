import { NextFunction, Response, Request } from "express";
import database from "./database";

const verifyIfIdExists = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const itemIndex: number = database.findIndex(product => product.id === Number(id))
    
  if (itemIndex === -1) {
    const error: string = "Product not found";
    return res.status(404).json({ error });
  }
  res.locals = { ...res.locals, itemIndex };
  return next();
};

const verifyNameExists = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const isArray = Array.isArray(payload);
  if (isArray) {
    payload.forEach((item) => {
      const nameUsed: boolean = database.some(
        (element) => element.name === item.name
      );
      if (nameUsed) {
        return res.status(409).json({ error: "Product already exists" });
      }
    });
    
  } else {
    const nameUsed: boolean = database.some(
      (element) => element.name === payload.name
    );

    if (nameUsed) {
      return res.status(409).json({ error: "Product already exists" });
    }
  }

  return next();
};

export default { verifyIfIdExists, verifyNameExists };
