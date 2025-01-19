export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}