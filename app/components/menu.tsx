import { usePathname, useRouter } from 'next/navigation';

interface MenuProps {
    type: 'sideBar' | 'menuBar' | 'burguerMenu';
}

export default function Menu({ type }: MenuProps) {
    const router = useRouter();
    const actualPage = usePathname();

    const menuItems = [
        { href: "/", label: "Início" },
        { href: "/all-transactions", label: "Transferências" },
        { href: "/app/investments", label: "Investimentos" },
        { href: "/app/services", label: "Outros Serviços" },
    ];

    const typeClasses = {
        sideBar: "flex-col h-44",
        menuBar: "flex-row justify-between w-[38rem] px-4 gap-4",
        burguerMenu: "flex-col",
    };

    return (
        <div className={`${typeClasses[type]} justify-between flex`}>
            {menuItems.map((item, index) => (
                <div className='flex flex-col content-center' key={item.href}>

                    <a

                        href={item.href}
                        className={type === "menuBar" ? `text-sm py-2  text-center text-primary ${actualPage === item.href ? "font-bold" : "font-normal"}` : `text-sm py-4  text-center text-primary ${actualPage === item.href ? "font-bold" : "font-normal"}`}
                    >
                        {item.label}
                    </a>
                    {type !== "menuBar" ?
                        (index < menuItems.length - 1 ?
                            <hr className="w-30 "></hr> : null) :
                        actualPage === item.href ? <hr className=" w-36 bg-primary h-[3px]"></hr> : null}
                </div>
            ))}
        </div>
    );
}