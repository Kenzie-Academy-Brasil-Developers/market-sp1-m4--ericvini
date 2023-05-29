import database from "./database";
import { Response, Request } from "express";
import {
  ICleaningProduct,
  IFoodProduct,
  TPatchRequests,
  IProduct,
  TProductRequests,
} from "./interfaces";

const getId = () => {
  if (database.length !== 0) {
    let nextIndex: number = 0;

    database.forEach((element: IProduct, index: number) => {
      const newItem = {
        ...element,
        id: index+1,
      };
      database.splice(index, 1, newItem);
      nextIndex = index + 2;
    });

    return nextIndex;
  }
  return 1;
};

const listAllItens = (req: Request, res: Response): Response => {
  const totalValue: number = database
    .map((element) => element.price)
    .reduce((acc, cur) => acc + cur);

  return res.status(200).json({
    total: totalValue,
    marketProducts: database,
  });
};

const listItemById = (req: Request, res: Response): Response => {
  const { itemIndex } = res.locals;
  return res.status(200).json(database[itemIndex]);
};

const createProduct = (req: Request, res: Response): Response => {
  const payload: TProductRequests[] = req.body;
  const newData: TProductRequests[] = [];

  payload.forEach((item: TProductRequests, index: number) => {
    const newItem: IFoodProduct | ICleaningProduct = {
      id: getId(),
      ...item,
      expirationDate: new Date(),
    };

    newData.push(newItem);
    database.push(newItem);

    return newItem;
  });

  const totalValue: number = newData
    .map((element) => element.price)
    .reduce((acc, curr) => acc + curr);

  return res.status(201).json({
    total: totalValue,
    marketProducts: newData,
  });
};

const updateProduct = (req: Request, res: Response): Response => {
  const payload: TPatchRequests = req.body;
  const { itemIndex } = res.locals;
  const {id, section, expirationDate} = database[itemIndex]

  const newProduct: IProduct = {
    ...database[itemIndex],
    ...payload,
    id: id,
    section: section,
    expirationDate: expirationDate,
  };

  database[itemIndex] = newProduct;

  return res.status(200).json(newProduct);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const { itemIndex } = res.locals;
  database.splice(itemIndex, 1);
  return res.status(204).json();
};

export default {
  createProduct,
  listAllItens,
  listItemById,
  updateProduct,
  deleteProduct,
};
