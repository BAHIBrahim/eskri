import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { getSession, useSession} from 'next-auth/react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Login from "../components/Login"
import Modal from "@material-tailwind/react/Modal"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import { useState } from 'react'
import {db} from "../firebase"
import firebase from "firebase/app"
import { collection, setDoc, serverTimestamp, doc, getDocs, query } from "firebase/firestore"; 

const Home: NextPage = () => {
  const {data: session} = useSession(); 
  if(!session) return <Login/>;

  const [showModal,setShowModal] = useState(false);
  const [input,setInput] = useState("");
  const userRef = collection(db, session.user?.email);
  const [userDocs,setUserDocs] = useState();

  const createDocument = async () => {
    if(!input) return;
    try {
      await setDoc(doc(userRef, input), {
        fileName: input,
        timestamp: serverTimestamp()
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInput("");
    setShowModal(false);
  };

  //V2**************************************************
//   const [userDocs,setUserDocs] = useState(
//     getDocs(userRef).then((response) => {
//       response.docs.map((item) => {
//         return {...item.data(),id:item.id}
//       });
//     })
//   );

//   const createDocument = async () => {
//     if(!input) return;
//     //I used setDoc(doc(userRef, input)) but failed in reading data.
//     try {
//       await addDoc(userRef, {
//         fileName: input,
//         timestamp: serverTimestamp()
//       });
//       console.log("Document written");
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//     setInput("");
//     setShowModal(false);
//   };
  //V2**************************************************
  
  const getData = () => {
    getDocs(userRef).then((response) => {
      console.log(
        response.docs.map((item) => {
        return {...item.data(),id:item.id}
        })
      );
    });
  };

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

  return (
    <div className="">
      <Head>
        <title>Docs Hybrid</title>
      </Head>
      <Header/>
      {modal}
      {/* this section is where we find the add button and the central divisions */}
      <section className="bg-[#F8F9FA] pb-10 px-10">
        {/* this division is used to surround our divisions in the gray division */}
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
                <Icon name="more_vert" size="2xl" color="gray"/>
            </Button>
          </div>
          {/* add blank division */}
          <div>
            <div onClick={() => setShowModal(true)} className="relative h-52 w-40 border cursor-pointer hover:border-blue-700">
              <Image src="/resources/docs-add-blank.png" layout="fill"/>
              
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
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray"/>
          </div>
        </div>
        {/* listview display division */}
        <div>
          
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
