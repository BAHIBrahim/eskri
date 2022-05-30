import React from 'react'
import { useState } from 'react';
import {
    FacebookShareButton,
    EmailShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

import {
    FacebookIcon,
    EmailIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";  

import {CopyToClipboard} from 'react-copy-to-clipboard';

const ShareForm = props => {

    const [value, setValue] = useState('')

    if (!props.show) {
        return null;
    }

  return (
    <div className='sticky flex justify-center items-center h-0 mb-96 !bg-stone-800 bg-opacity-50 z-50'> 
        {/* <!-- CONTAINER MODAL--> */}
        <div className="min-h-screen w-screen bg-gray-800 flex items-center justify-center" >
        {/* <!--MODAL ITEM--> */}
        <div className="bg-gray-100 mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
            {/* <!--MODAL HEADER--> */}
            <div
            className="flex justify-between items center border-b border-gray-200 py-3"
            >
            <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-gray-800">Share Modal</p>
            </div>

            <button
                onClick={props.hideModal}
                className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold"
            >
                X
            </button>
            </div>

            {/* <!--MODAL BODY--> */}
            <div className="my-4">
            <p className="text-sm">Share this link via</p>

            <div className="flex justify-around my-4">
                <FacebookShareButton 
                url='https://boxicons.com/?query=link'
                quote={"Check-out this file it's full of fun..."}
                >
                    <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
                </FacebookShareButton>
                {/* <!--TWITTER ICON--> */}
                <TwitterShareButton 
                url='https://boxicons.com/?query=link'
                quote={"Check-out this file it's full of fun..."}
                >
                    <TwitterIcon logoFillColor="white" round={true}></TwitterIcon>
                </TwitterShareButton>
                {/* <!--EMAIL ICON--> */}
                <EmailShareButton 
                url='https://boxicons.com/?query=link'
                quote={"Check-out this file it's full of fun..."}
                >
                    <EmailIcon logoFillColor="white" round={true}></EmailIcon>
                </EmailShareButton>
                {/* <!--WHATSAPP ICON--> */}
                <WhatsappShareButton 
                url='https://boxicons.com/?query=link'
                quote={"Check-out this file it's full of fun..."}
                >
                    <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
                </WhatsappShareButton>
                {/* <!--TELEGRAM ICON--> */}
                <TelegramShareButton 
                url='https://boxicons.com/?query=link'
                quote={"Check-out this file it's full of fun..."}
                >
                    <TelegramIcon logoFillColor="white" round={true}></TelegramIcon>
                </TelegramShareButton>
            </div>

            <p className="text-sm">Or copy link</p>
            {/* <!--BOX LINK--> */}
            <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-gray-500 ml-2"
                >
                <path
                    d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
                ></path>
                <path
                    d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
                ></path>
                </svg>

                <input className="w-full outline-none bg-transparent" type="text" placeholder="link" defaultValue="https://boxicons.com/?query=link" value={value} onChange={({target :{value}}) => setValue(value)}/>

                <CopyToClipboard text={value}>
                    <button className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600">
                        Copy
                    </button>
                </CopyToClipboard>
                
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ShareForm