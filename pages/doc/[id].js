import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import TextEditor from '../../components/TextEditor'
import Image from 'next/image'
import logo from '../../public/Images/LogoApp-1.png'
import ShareForm from '../../components/ShareForm'
import { useState } from 'react'
import Functionalities from "../../components/Functionalities";

function Doc() {

    const [show, setShow] = useState(false)

  return (
    <>
    <div>
        <header className='flex justify-between items-center p-3 pb-1'>
            <Image src={logo}
            alt="" 
            title="" 
            width="48px" 
            height="48px" />
            <div className='flex-grow px-2'>
                <h2>FileNameFromFireStore</h2>
                <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-[#9A2A2A]'>
                    <Functionalities name='Download' onClick={downloadTxtFile}/>
                    <Functionalities name='Upload'/>
                    <Functionalities name='Print'/>
                    {/* <DropDown name='File' showMenu={showMenu} showMenuFct={() => setShowMenu(true)}/> */}
                    {/* <p className='option'>File</p> */}
                    {/* <p className='option'>Edit</p> */}
                    {/* <p className='option'>View</p> */}
                    {/* <p className='option'>Insert</p> */}
                    {/* <p className='option'>Format</p> */}
                    {/* <p className='option'>Tools</p> */}
                </div>
            </div>

            <Button
                color='lightBlue'
                buttonType='filled'
                size='regular'
                className='share-Btn'
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light" 
                onClick={() => setShow(true)}
            >
                <Icon name='people' size='md' color='yellow'/>SHARE
                
            </Button>

            <img 
                src='#' 
                alt='' 
                className='cursor-pointer rounded-full h-10 w-10 ml-2'
            />

        </header>

        <TextEditor/>
        

    </div>
    <ShareForm show={show} hideModal={() => setShow(false)} />
    </>
  )
}

export default Doc
