import React from 'react';
import Image from 'next/image'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import {signOut,useSession} from 'next-auth/react'

function Header() {
    const {data: session} = useSession();
    return (
        <header className="sticky top-0 z-50 h-16 flex items-center px-4 py-2 shadow-md bg-white">
            {/* menu button */}
            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="border-0"
            >
                <Icon name="menu" size="2xl" color="gray"/>
            </Button>

            {/* logo and name */}
            {/* <Icon name="description" size="5xl" color="blue" /> */}
            <Image src="/resources/LogoApp.png" height="48" width="48" objectFit="contain"/>
            <h1 className="ml-2 text-gray-700 text-2xl">Docs Hybrid</h1>

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