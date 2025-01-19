'use client'
import { useEffect, useState } from "react";
import Header from "./components/header";
import UserDTO from "./models/userDTO";
import BalanceContainer from "./components/balance";
import Menu from "./components/menu";
import SideBar from "./components/sideBar";
import MenuBar from "./components/menuBar";
import NewTransaction from "./components/new-transaction";
import { ToastContainer } from "react-toastify";
import { Transaction } from "./models/transaction";
import Statement from "./components/statement";

export default function Home() {
  const [client, setClient] = useState({} as UserDTO);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getUserInfo();
  }, [])

  async function getUserInfo() {
    const response = await fetch("../api/user/67844b6f353a4966f375e3d5", {
      method: "GET",
    });
    const userInfo: UserDTO = await response.json();
    setClient(userInfo);
    getTransactions(userInfo._id);
  }

  async function getTransactions(userId: string) {
    const response = await fetch(`../api/transactions/${userId}`, {
      method: "GET",
    });
    const transactions: Transaction[] = await response.json();
    setTransactions(transactions);
  }
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col gap-8 content-center md:items-center w-full h-full">
        <Header clientName={client.fullName} />
        <MenuBar />
        <div className="flex lg:flex-row flex-col justify-center gap-8 h-full px-4">
          <SideBar />
          {
            client ?
              <div className="lg:w-full max-w-[38rem] flex flex-col gap-8 lg:justify-start md:justify-center items-center">

                <BalanceContainer client={client} />
                <NewTransaction user={client} onTransactionSuccess={getUserInfo} />
              </div>
              : null
          }
          <Statement transactions={transactions} onEditList={() => getTransactions(client._id)} />
        </div>
      </div>
    </div>
  );
}
