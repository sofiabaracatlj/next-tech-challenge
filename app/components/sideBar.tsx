import Menu from './menu';

export default function SideBar() {
    return (
        <div className="bg-white w-[180px] p-4 shadow-lg rounded-lg justify-center hidden lg:flex">
            <Menu type='sideBar' />
        </div>
    );
}