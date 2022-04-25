import React from 'react';
import Image from 'next/image'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import {signOut,useSession} from 'next-auth/react'
import {useState} from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener'

function Header() {
    const {data: session} = useSession();
    const [showSideBar,setShowSideBar] = useState(false);

    //Sidebar
    const sidebar = showSideBar?(
        <ClickAwayListener onClickAway={() => {
            setShowSideBar(false);
            document.querySelector("#menu-button").classList.remove('hidden');
            document.querySelector("#logo-icon").classList.remove('hidden');
        }}>
            <div className="sidebar fixed top-0 bottom-0 left-0 p-2 w-[300px] overflow-y-auto text-center bg-white shadow-lg">
                <div className="p-2.5 flex items-center">
                    <Image src="/resources/Banner.png" height="75" width="200" objectFit="contain"/>
                </div>
                <hr className="text-gray-600"/>
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-gray-700">
                    <Icon name="settings" size="2xl" color="gray"/>
                    <h className="ml-4">Settings</h>
                </div>
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-gray-700">
                    <Icon name="bookmark" size="2xl" color="gray"/>
                    <h className="ml-4">Bookmark</h>
                </div>
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-gray-700">
                    <Icon name="help" size="2xl" color="gray"/>
                    <h className="ml-4">Help</h>
                </div>
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-200 text-gray-700" onClick={signOut}>
                    <Icon name="logout" size="2xl" color="gray"/>
                    <h className="ml-4">Logout</h>
                </div>
            </div>
        </ClickAwayListener>
    ):(<div></div>);

    return (
        <header className="sticky top-0 z-50 h-16 flex items-center px-4 py-2 shadow-md bg-white">
            {sidebar}
            {/* menu button */}
            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                id="menu-button"
                ripple="dark"
                className="border-0"
                onClick={() => {
                    setShowSideBar(true); 
                    document.querySelector("#menu-button").classList.toggle('hidden');
                    document.querySelector("#logo-icon").classList.toggle('hidden');
                }}
            >
                <Icon name="menu" size="2xl" color="gray"/>
            </Button>

            {/* logo and name */}
            {/* <Icon name="description" size="5xl" color="blue" /> */}
            <div id="logo-icon" className="">
                <Image src="/resources/LogoApp.png" height="48" width="48" objectFit="contain"/>
            </div>
            <h1 className="ml-2 text-gray-700 text-2xl">Eskri</h1>

            {/* search bar */}
            <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-700 focus-within:shadow-md focus-within:bg-white ">
                <Icon name="search" size="3xl" color="gray"/>
                <input type="text" placeholder="Search" className="flex-grow px-5 text-base bg-transparent outline-none"/>
            </div>

            {/* apps button */}
            <Button
                color="gray"
                buttonType="outline"
                rounded="true"
                iconOnly="true"
                ripple="dark"
                className="ml-5 md:ml-20 border-0"
            >
                <Icon name="apps" size="1xl" color="gray"/>
            </Button>

            {/* google account image */}
            <img loading="lazy" className="cursor-pointer h-8 w-8 rounded-full ml-2" src={session.user?.image} alt="" onClick={signOut}/>
        </header>
    );
}

export default Header;