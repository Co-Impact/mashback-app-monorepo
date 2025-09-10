import { Involve } from "../../api/types";

export interface CTFDisplayData {
  name: string;
  startDate: string;
  endDate: string;  
  involve: Involve;
  joined: number;
}