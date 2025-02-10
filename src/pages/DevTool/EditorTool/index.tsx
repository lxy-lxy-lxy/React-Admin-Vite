import { useState } from "react";
import { Card } from "antd";
import { Editor } from "react-draft-wysiwyg";
import type { EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorTool = () => {
  const [editorState, setEditorState] = useState<EditorState>();
  return (
    <Card>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
    </Card>
  );
};

export default EditorTool;
