import Image from "next/image"
import Button from '@material-tailwind/react/Button'
import {signIn} from "next-auth/react"

function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Image
                src="/resources/Banner.png"
                height="360"
                width="720"
                objectFit="contain"
            />
            <Button
            className="w-44 mt-4 hover:bg-blue-800"
            color="yellow"
            buttonType="filled"
            ripple="light"
            onClick={signIn}
            >Login</Button>
        </div>
    );
}

export default Login