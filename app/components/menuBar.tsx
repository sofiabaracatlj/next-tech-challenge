import Menu from './menu';

export default function MenuBar() {
    return (
        <div className="justify-center w-full flex-row hidden lg:hidden md:flex ">
            <Menu type='menuBar' />
        </div>
    );
}