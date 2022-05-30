import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Login from "../components/Login"
import Modal from "@material-tailwind/react/Modal"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import { useState, useEffect } from 'react'
import { db } from "../firebase"
import firebase from "firebase/app"
import { collection, setDoc, serverTimestamp, doc, getDocs, query } from "firebase/firestore";
import { seteuid } from 'process'
import DocumentRows from "../components/DocumentRows";
import TextEditor from '../components/TextEditor.js';
import logo from "../public/resources/LogoApp.png"

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) return <Login />;
  const [textEditorIsOpen, setTextEditorIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const userRef = collection(db, session.user?.email);
  const [userDocs, setUserDocs] = useState([]);
  const [desc, setDesc] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const createDocument = async () => {
    if (!input) return;
    try {
      await setDoc(doc(userRef, input), {
        fileName: input,
        timestamp: serverTimestamp()
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setSelectedItem(input);
    setInput("");
    setShowModal(false);
    
    setTextEditorIsOpen(true);
  };

  useEffect(async () => {
    let docs = [];
    const querySnapshot = await getDocs(userRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docs.push({ fileName: "" + doc.data().fileName, timestamp: "" + doc.data().timestamp.toDate() });
    });

    setUserDocs(docs);
    userDocs.forEach((doc) => {
      console.log(doc.fileName)
    });
  }, [showModal]);

  function searchAndFilter() {
    let docs = userDocs;
    docs.sort((a, b) => (new Date(b.timestamp) - new Date(a.timestamp)));
    if (desc == false) {
      docs.reverse();
    }
    if (searchInput != "") {
      console.log(searchInput);
      docs = docs.filter((doc) => doc.fileName.toLowerCase().includes(searchInput.toLowerCase()));
    }
    return docs;

  }


  const modal = (
    <Modal
      size="sm"
      active={showModal}
      toggler={() => setShowModal(false)}
    >
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="yellow" buttonType="link" onClick={() => setShowModal(false)} ripple="dark" >Cancel</Button>
        <Button color="yellow" onClick={createDocument} ripple="light" >Create</Button>
      </ModalFooter>
    </Modal>
  );

  if (textEditorIsOpen) return (
    <>
      <header className='flex justify-between items-center p-3 pb-1'>
        <Image src={logo}
          alt=""
          title=""
          onClick={() => setTextEditorIsOpen(false)}
          width="48px"
          height="48px" />
        <div className='flex-grow px-2'>
          <h2>{selectedItem}</h2>
          <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-[#9A2A2A]'>
            {/* <Functionalities name='Download' onClick={downloadTxtFile} />
            <Functionalities name='Upload' />
            <Functionalities name='Print' /> */}
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
          onClick={() => console.log("clicked")}
        >
          <Icon name='people' size='md' color='yellow' />SHARE

        </Button>

        <img loading="lazy" className="cursor-pointer h-8 w-8 rounded-full ml-2" src={session.user?.image} alt=""/>

      </header>
      <TextEditor />
    </>
  )

  return (
    <div className="">
      <Head>
        <title>Eskri</title>
      </Head>
      <Header setSearchInput={setSearchInput} />
      {modal}
      {/* this section is where we find the add button and the central divisions */}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        {/* this division is used to surround our divisions in the gray section */}
        <div className="max-w-3xl mx-auto">
          {/* Start a new Document division*/}
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>

            <Button
              color="gray"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="ml-5 md:ml-20 border-0"
            >
              <Icon name="more_vert" size="2xl" color="gray" />
            </Button>
          </div>
          {/* add blank division */}
          <div>
            <div onClick={() => setShowModal(true)} className="relative h-52 w-40 border cursor-pointer hover:border-blue-700">
              <Image src="/resources/docs-add-blank.png" layout="fill" />

            </div>
            <p className="mt-2 ml-2 font-semibold text-sm text-gray-900">Blank</p>
          </div>
        </div>
      </section>

      {/* my documents section */}
      <section className="bg-white px-10 md:px-0">
        {/* recent documents division */}
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex-grow">Recent documents</h2>
            <button className="mr-12 focus:outline-none p-1 px-2  rounded-md hover:bg-gray-100" onClick={() => setDesc(!desc)}>Date Created</button>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
        {/* listview display division */}
        <div>
          <DocumentRows docs={searchAndFilter()} session={session} db={db} setTextEditorIsOpen={setTextEditorIsOpen} setSelectedItem={setSelectedItem} />
        </div>
      </section>
    </div>
  )
}

export default Home
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return ({
    props: {
      session
    }
  });
}
