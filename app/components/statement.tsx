import { toast } from 'react-toastify';
import { Transaction } from '../models/transaction';
import { TrashIcon } from '@heroicons/react/16/solid';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import EditTransactionDialog from './edit-transaction-dialog';
import { on } from 'events';
import UserDTO from '../models/userDTO';

interface StatementProps {
    transactions: Transaction[];
    onEditList: () => void;
    user: UserDTO;
}

export default function Statement({ transactions, onEditList, user }: StatementProps) {
    const groupedTransactions = groupTransactionsByMonth(transactions);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

    function groupTransactionsByMonth(transactions: Transaction[]) {
        return transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });

            if (!acc[month]) {
                acc[month] = [];
            }

            acc[month].push(transaction);
            return acc;
        }, {} as { [key: string]: Transaction[] });
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleEdit = (transaction: Transaction) => {
        setTransactionToEdit(transaction);
        setIsEditDialogOpen(true);
    };
    const handleDeleteClick = (transactionId: string) => {
        setTransactionToDelete(transactionId);
        setIsDeleteDialogOpen(true);
    };


    const confirmDelete = async () => {
        if (transactionToDelete) {
            try {
                const response = await fetch(`/api/transactions/${transactionToDelete}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Transação excluída com sucesso');
                    const transaction = transactions.find(transaction => transaction._id === transactionToDelete);
                    if (transaction) {
                        await updateUserAmount(transaction);
                    }
                    onEditList();
                } else {
                    toast.error('Erro ao excluir transação');
                }
            } catch (error) {
                toast.error('Erro ao excluir transação');
            } finally {
                setIsDeleteDialogOpen(false);
                setTransactionToDelete(null);
            }
        }
    };

    const updateUserAmount = async (transaction: Transaction) => {
        const userId = transaction.userId;
        const transactionAmount = transaction.amount;
        const newAmount = transaction.description === 'deposit' ? -transactionAmount : transactionAmount;

        const updateUserResponse = await fetch(`/api/user/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: newAmount }),
        });

        if (!updateUserResponse.ok) {
            throw new Error('Failed to update user amount');
        }
    }

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setTransactionToDelete(null);
    };

    const onEditSuccess = () => {
        onEditList();
        setIsEditDialogOpen(false);
    }

    return (
        <div className="bg-white p-4  w-full h-full rounded-lg shadow-md">
            <div className='w-52 m-auto'>
                <h1 className="text-2xl font-bold mb-4 text-primary">Extrato</h1>
                {Object.keys(groupedTransactions).map((month) => (
                    <div key={month} className="mb-4">
                        <h2 className="text-lg text-primary font-semibold my-6">{capitalizeFirstLetter(month)}</h2>
                        <ul>
                            {groupedTransactions[month].map((transaction) => (
                                <li key={transaction._id} className="mb-2 text-dark-grey">
                                    <div className="flex flex-row justify-between items-center my-2">
                                        <div className="flex flex-col justify-between">
                                            <span>{transaction.description === 'deposit' ? 'Depósito' : 'Transferência'}</span>
                                            <span className='font-bold'>
                                                {transaction.description === 'transfer' ? '-' : ''}
                                                {transaction.amount?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            {new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                        </div>
                                        <div className="flex space-x-2">
                                            <PencilIcon onClick={() => handleEdit(transaction)} className="size-10 text-primary">Editar</PencilIcon>
                                            <TrashIcon onClick={() => handleDeleteClick(transaction._id)} className="text-primary">Excluir</TrashIcon>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>


            {isDeleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                        <p>Tem certeza de que deseja excluir esta transação?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">Excluir</button>
                        </div>
                    </div>
                </div>
            )}
            {isEditDialogOpen && transactionToEdit && (
                <EditTransactionDialog
                    user={user}
                    transactionProps={transactionToEdit}
                    onEditSuccess={() => onEditSuccess()}
                    onCancel={() => setIsEditDialogOpen(false)}
                />
            )}
        </div>
    );
}