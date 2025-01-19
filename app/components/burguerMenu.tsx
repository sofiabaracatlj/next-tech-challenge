import { useState } from 'react';
import Menu from './menu';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function BurguerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleMenu} className="sm:hidden p-2">
                {isOpen ? <XMarkIcon className="h-6 w-6 text-black" /> : <Bars3Icon className="size-8 text-secondary" />}
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start z-50">
                    <div className="bg-white w-[180px] p-4 shadow-lg ">
                        <button onClick={toggleMenu} className="absolute top-2 left-[146px] text-primary">
                            <XMarkIcon className="h-6 w-6 text-black" />
                        </button>
                        <Menu type="burguerMenu" />
                    </div>
                </div>
            )}
        </div>
    );
}