import { useState } from 'react';
import TransactionForm from './transaction-form';
import UserDTO from '../models/userDTO';
import { Transaction } from '../models/transaction';
import { toast } from 'react-toastify';

interface NewTransactionProps {
    user: UserDTO;
    onTransactionSuccess: () => void;
}

export default function NewTransaction({ user, onTransactionSuccess }: NewTransactionProps) {
    const handleSubmit = async (transaction: Partial<Transaction>) => {
        const body: Partial<Transaction> = {
            ...transaction,
            userId: user._id,
        };

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                toast.success('Transação criada com sucesso');

                // Update user amount
                const transactionAmount = transaction.amount || 0;
                const newAmount = transaction.description === 'deposit' ? user.amount + transactionAmount : user.amount - transactionAmount;

                const updateUserResponse = await fetch(`/api/user/${user._id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: newAmount }),
                });

                if (updateUserResponse.ok) {
                    toast.success('Saldo atualizado com sucesso');
                    onTransactionSuccess();
                } else {
                    toast.error('Erro ao atualizar saldo');
                }
            } else {
                toast.error('Erro ao criar transação');
            }
        } catch (error) {
            toast.error('Erro ao criar transação');
        }
    };

    return (
        <div className="relative bg-grey w-full m-h-[636px] flex-wrap flex justify-center content-start rounded-lg w-full sm:max-w-[38rem] sm:p-8 py-8 px-4">
            <div className="absolute right-0 top-0 bg-checkered-pattern bg-right-top bg-no-repeat bg-contain h-1/2 w-1/2 z-10"></div>
            <div className="absolute left-0 bottom-0 bg-checkered-pattern-bottom bg-left-bottom bg-no-repeat bg-contain h-1/2 w-1/2 z-10"></div>
            <span className="text-neutral-50 font-bold text-2xl">Nova transação</span>
            <TransactionForm onSubmit={handleSubmit} initialTransaction={null} onCancel={() => { }} />
        </div>
    );
}