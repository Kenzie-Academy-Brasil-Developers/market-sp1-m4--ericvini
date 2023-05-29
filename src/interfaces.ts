
export interface IProduct {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: "food" | "cleaning";
    expirationDate: Date;
}

export type TProductRequests = Omit<IProduct, "id" | "expirationDate">;

export type TPatchRequests = Partial<TProductRequests>

export interface IFoodProduct extends IProduct{
    calories: number;
}

export interface ICleaningProduct extends IProduct{};