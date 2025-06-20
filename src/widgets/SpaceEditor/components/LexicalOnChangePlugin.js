import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

const OnChangePlugin = ({ onChange }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({editorState}) => {
            onChange(editorState.toJSON());
        });
        // TODO: Write a teardown return function here
    }, [editor, onChange]);

    return null;
}

export default OnChangePlugin;