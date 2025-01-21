import { useState, useEffect } from 'react';
import TransactionForm from './transaction-form';
import { Transaction } from '../models/transaction';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/16/solid';
import UserDTO from '../models/userDTO';

interface EditTransactionDialogProps {
    transactionProps: Transaction;
    onEditSuccess: () => void;
    onCancel: () => void;
    user: UserDTO;
}

export default function EditTransactionDialog({ transactionProps, onEditSuccess, onCancel, user }: EditTransactionDialogProps) {
    const [transaction, setTransaction] = useState<Transaction>(transactionProps);


    const handleSubmit = async (updatedTransaction: Partial<Transaction>) => {
        const body: Partial<Transaction> = {
            ...updatedTransaction,
            _id: transaction._id,
        };

        try {
            const response = await fetch(`/api/transactions/${transaction._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                toast.success('Transação editada com sucesso');
                updateUserAmount(transaction, updatedTransaction);
                onEditSuccess();
            } else {
                toast.error('Erro ao editar transação');
            }
        } catch (error) {
            toast.error('Erro ao editar transação');
        }
    };


    const updateUserAmount = async (transaction: Transaction, updatedTransaction: Partial<Transaction>): Promise<void> => {
        if (updatedTransaction.amount !== undefined) {
            const userId = transaction.userId;
            const oldTransactionAmount = transaction.amount;
            const newTransactionAmount = updatedTransaction.amount;
            const userAmount = user.amount;

            let newUserAmount = 0;

            if (transaction.description !== updatedTransaction.description) {
                if (updatedTransaction.description === 'deposit') {
                    newUserAmount = userAmount + oldTransactionAmount + newTransactionAmount;
                } else {
                    newUserAmount = userAmount - oldTransactionAmount - newTransactionAmount;
                }
            } else {
                if (updatedTransaction.description === 'deposit') {
                    newUserAmount = userAmount - oldTransactionAmount + newTransactionAmount;
                } else {
                    newUserAmount = userAmount + oldTransactionAmount - newTransactionAmount;
                }
            }

            console.log("aqui", newUserAmount);

            const updateUserResponse = await fetch(`/api/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: newUserAmount }),
            });

            if (!updateUserResponse.ok) {
                throw new Error('Failed to update user amount');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-grey p-4 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onCancel}
                >
                    <XMarkIcon className="size-10 text-primary" />
                </button>
                <h2 className="text-xl font-bold mb-4 text-primary">Editar Transação</h2>
                {transaction && (
                    <TransactionForm
                        initialTransaction={transaction}
                        onSubmit={handleSubmit}
                        onCancel={onCancel}
                    />
                )}
            </div>
        </div>
    );
}

