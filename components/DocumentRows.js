import {useState} from 'react';
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore"; 


export default function DocumentRows(props) {

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    setIsOpen(true);
    // console.log(event.currentTarget.id);
    anchorEl=event.currentTarget;
    setAnchorEl(event.currentTarget);
    // console.log(anchorEl.id);
  };

  const handleClose = (event) => {
    // console.log(event.currentTarget);
    setIsOpen(false);
  };

  const handleDelete = async (val) => {
    // console.log(val);
    await deleteDoc(doc(props.db, props.session.user.email, val));
    props.setRefresher(!props.refresher);
    setIsOpen(false);
  }

  const showItem = (item) => {
    return (
      <div id={item.fileName} className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer max-w-3xl mx-auto">
        <Icon name="article" size="3xl" color="yellow" onClick={() => router.push(`doc/${item.fileName}`)} />
        <p className="flex-grow pl-5 w-10 pr-10 truncate" onClick={() => router.push(`doc/${item.fileName}`)}>{item.fileName}</p>
        <p className="pr-5 test-sm" onClick={() => router.push(`doc/${item.fileName}`)}>{item.timestamp}</p>
        <Button
          color="gray"
          buttonType="outline"
          rounded={true}
          iconOnly={true}
          id={item.fileName}
          onClick={handleClick}
          ripple="dark"
          className="ml-5 md:ml-20 border-0"
        >
          <Icon name="more_vert" size="2xl" color="gray" />
        </Button>
        <Menu
          anchorEl={anchorEl}
          elevation={0}
          keepMounted onClose={handleClose}
          open={isOpen}>
          <MenuItem
            key={item.fileName}
            onClick={() => handleDelete(anchorEl.id)}>
            {"Delete"}
          </MenuItem>
          {/* <MenuItem
            key={item.fileName}
            onClick={}>
            {"Disp"}
          </MenuItem> */}
        </Menu>

      </div>
    );
  }
  return (
    <div>
      {props.docs.map(showItem)}
    </div>
  );
}