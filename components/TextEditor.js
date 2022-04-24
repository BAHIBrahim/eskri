import dynamic from "next/dynamic";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState} from 'draft-js';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor),{
    ssr: false,
})

function TextEditor() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
        <Editor 
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
            editorClassName='mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border'
        />
    </div>
  )
}

export default TextEditor

//asynchronisation prblm... no need to login every time we refresh the text editor page
//' ! ' in css code means that we're overriding a class already applied to something(Editor in our case)
//last step : working with firestore to keep data in the text that's getting edited...