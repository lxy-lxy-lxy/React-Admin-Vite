import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import type { EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorTool = () => {
  const [editorState, setEditorState] = useState<EditorState>();
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setEditorState}
    />
  );
};

export default EditorTool;
