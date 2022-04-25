import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { useRouter } from "next/router";

export default function DocumentRow(props) {

    const showItem = (item) => {
        return (
            <div>
                <Icon name="article" size="3xl" color="yellow"/>
                <p className="flex-grow pl-5 w-10 pr-10 truncate">{item.fileName}</p>
                <p className="pr-5 test-sm">{item.timestamp}</p>
            </div>
        );
    }
    return(
        <div>
            {props.docs.map(showItem)}
        </div>
    );
}