export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}