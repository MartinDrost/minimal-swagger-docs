import { IRoute } from "./route.interface";

export interface ILayer {
  route: IRoute;
  params: string[];
}
