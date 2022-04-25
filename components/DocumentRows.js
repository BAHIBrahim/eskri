import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { useRouter } from "next/router";

export default function DocumentRow(props) {

    const router = useRouter();

    const showItem = (item) => {
        return (
            <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer max-w-3xl mx-auto">
                <Icon name="article" size="3xl" color="yellow" onClick={() => router.push(`doc/${item.fileName}`)}/>
                <p className="flex-grow pl-5 w-10 pr-10 truncate" onClick={() => router.push(`doc/${item.fileName}`)}>{item.fileName}</p>
                <p className="pr-5 test-sm" onClick={() => router.push(`doc/${item.fileName}`)}>{item.timestamp}</p>
                <Button
                    color="gray"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="ml-5 md:ml-20 border-0"
                >
                    <Icon name="more_vert" size="2xl" color="gray"/>
                </Button>
            </div>
        );
    }
    return(
        <div>
            {props.docs.map(showItem)}
        </div>
    );
}