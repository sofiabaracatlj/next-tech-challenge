import { Bars3Icon } from "@heroicons/react/16/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import BurguerMenu from "./burguerMenu";


export default function Header({ clientName }: HeaderProps) {

    return (
        <header className="bg-primary text-foreground p-4 flex justify-between gap-4 items-center w-full">
            <div>
                <BurguerMenu />
            </div>
            <div className="flex justify-end gap-4 items-center">
                <span className="text-sm text-neutral-50 font-bold hidden sm:block">{clientName}</span>
                <UserCircleIcon className="size-10 text-secondary" />
            </div>
        </header>
    );
}

interface HeaderProps {
    clientName: string;
}