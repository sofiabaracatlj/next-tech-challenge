import UserDTO from "@/app/models/userDTO";
import { EyeIcon } from "@heroicons/react/16/solid";
import Image from 'next/image'

export default function BalanceContainer({ client }: BalanceProps) {


    const getFirstName = (fullName: string) => {
        return fullName.split(' ')[0];
    };

    const formatDate = (date: Date) => {
        const daysOfWeek = [
            'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'
        ];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${dayOfWeek}, ${day}/${month}/${year}`;
    };

    const currentDate = formatDate(new Date());


    return (
        <div className="relative bg-primary min-h-101 rounded-lg w-full sm:max-w-[38rem]">
            <div className="absolute right-0 bg-checkered-pattern bg-right-top bg-no-repeat bg-contain h-1/2 w-1/2">

            </div >
            <div className="absolute left-0 bottom-0 bg-checkered-pattern-bottom bg-left-bottom bg-no-repeat bg-contain h-1/2 w-1/2">

            </div >
            <div className="flex h-full w-full flex-col sm:flex-row">
                <div className="flex sm:w-full flex-col items-center sm:items-start">
                    <span className="text-neutral-50 text-2xl p-6">Olá, {getFirstName(client.fullName || '')} :)</span>

                    <span className="text-neutral-50 text-sm px-6">{currentDate}</span>
                    <Image
                        className="hidden sm:block mt-12 z-40"
                        src="/ilustracao.png"
                        width={283}
                        height={228.17}
                        alt="Picture of the author"
                    />
                </div>
                <div className="flex sm:w-full flex-col py-10 sm:py-24 items-center sm:items-start">
                    <div className="flex flex-row pb-4">
                        <span className="text-neutral-50 text-2xl">Saldo</span>
                        <EyeIcon className="size-8 text-neutral-50 lg:text-secondary block ml-6" />
                    </div>
                    <hr className="w-44 py-4"></hr>

                    <span className="text-neutral-50 text-sm">Conta Corrente</span>
                    <span className="text-neutral-50 text-2xl pt-2">R$ {client.amount?.toFixed(2).replace('.', ',')}</span>
                    <Image
                        className="block sm:hidden mt-36 z-40"
                        src="/ilustracao.png"
                        width={283}
                        height={228.17}
                        alt="Picture of the author"
                    />
                </div>
            </div >
        </div >
    );
}

interface BalanceProps {
    client: UserDTO;
}