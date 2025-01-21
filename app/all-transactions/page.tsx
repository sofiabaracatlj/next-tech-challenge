'use client'
import Header from "@/app/components/header";
import MenuBar from "@/app/components/menuBar";
import SideBar from "@/app/components/sideBar";
import Statement from "@/app/components/statement";
import { Transaction } from "@/app/models/transaction";
import UserDTO from "@/app/models/userDTO";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AllTransactions() {
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

    const updatedTransactions = async () => {
        getTransactions(client._id);
        getUserInfo();
    }

    return (
        <div>
            <ToastContainer />
            <div className="flex flex-col gap-8 content-center md:items-center w-full h-screen">
                <Header clientName={client.fullName} />
                <MenuBar />
                <div className="flex lg:flex-row flex-col justify-center gap-8 h-full px-4">
                    <SideBar />

                    <div className="w-full sm:w-[38rem] h-full">
                        <Statement user={client} transactions={transactions} onEditList={() => updatedTransactions()} />
                    </div>
                </div>
            </div>
        </div>
    );
}