import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Transaction } from '../models/transaction';
import Image from 'next/image';

interface TransactionFormProps {
    initialTransaction?: Partial<Transaction> | null;
    onSubmit: (transaction: Partial<Transaction>) => void;
    onCancel?: () => void;
}

const transactionOptions = [
    { value: 'deposit', label: 'Depósito' },
    { value: 'transfer', label: 'Transferência' },
];

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        maxWidth: '360px',
        borderColor: state.isFocused ? 'var(--primary)' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px var(--primary)' : provided.boxShadow,
        '&:hover': {
            borderColor: state.isFocused ? 'var(--primary)' : provided.borderColor,
        },
    }),
    singleValue: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
        color: 'var(--primary)',
        padding: '2px 8px',
        borderRadius: '4px',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        zIndex: 99,
        backgroundColor: state.isSelected ? 'var(--primary)' : "var(--white)",
        color: state.isSelected ? 'var(--white)' : 'var(--primary)',
        '&:hover': {
            backgroundColor: state.isSelected ? 'var(--primary)' : 'var(--white)',
            color: state.isSelected ? 'var(--white)' : 'var(--primary)',
        },
    }),
};

export default function TransactionForm({ initialTransaction, onSubmit }: TransactionFormProps) {
    const [transactionType, setTransactionType] = useState<{ value: string; label: string }>(initialTransaction?.description ? { value: initialTransaction.description, label: initialTransaction.description } : { value: 'deposit', label: 'Depósito' });
    const [amount, setAmount] = useState(initialTransaction?.amount ? initialTransaction.amount.toString() : '');

    const handleTransactionTypeChange = (selectedOption: any) => {
        setTransactionType(selectedOption);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedValue = formatCurrency(value);
        setAmount(formattedValue);
    };

    const formatCurrency = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formattedValue;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const numericAmount = parseFloat(amount.replace(/[^\d,]/g, '').replace(',', '.'));
        onSubmit({
            description: transactionType.value,
            amount: numericAmount,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full z-20">
            <div className="relative bg-grey w-full m-h-[636px] flex-wrap flex justify-center content-start rounded-lg w-full sm:max-w-[38rem] sm:p-8 py-8 px-4">
                <div className="absolute right-0 top-0 bg-checkered-pattern bg-right-top bg-no-repeat bg-contain h-1/2 w-1/2 z-10"></div>
                <div className="absolute left-0 bottom-0 bg-checkered-pattern-bottom bg-left-bottom bg-no-repeat bg-contain h-1/2 w-1/2 z-10"></div>


                <span className="text-neutral-50 font-bold text-2xl">Nova transação</span>
                <div className="relative w-full mt-8 z-40">
                    <label htmlFor="transactionType" className="block text-neutral-50 font-bold mb-2">Tipo de transação</label>
                    <Select
                        id="transactionType"
                        value={transactionType}
                        onChange={handleTransactionTypeChange}
                        options={transactionOptions}
                        className="w-full"
                        styles={customStyles}
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="w-full  z-20">
                    <div className='flex flex-col sm:flex-row'>

                        <div className='flex flex-col'>

                            <label htmlFor="amount" className="mt-8 block text-neutral-50 font-bold mb-2 z-20">Valor

                                <input
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    defaultValue={"0,00"}
                                    placeholder="R$ 0,00"
                                    className="w-full p-2 rounded bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </label>
                            <div className="w-full mt-8">
                                <button type="submit" className="p-2 rounded-lg bg-primary text-white font-bold">Concluir</button>
                            </div>
                        </div>
                        <Image
                            className="block mt-8"
                            src="/Ilustração2.png"
                            width={283}
                            height={228.17}
                            alt="Picture of the author"
                        />

                    </div>

                </div>
            </div>
        </form>
    );
}