import React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'

import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeNode } from '@lexical/code'
import { LinkNode } from '@lexical/link'

import OnChangePlugin from '../components/LexicalOnChangePlugin'
import ToolbarPlugin from './ToolbarPlugin'
import theme from './Theme'
import './styles.css'
import styled from 'styled-components'

const StyledEditorContainer = styled.div`
    margin: 20px auto 20px auto;
    border-radius: 2px;
    max-width: 600px;
    color: #000;
    position: relative;
    line-height: 20px;
    font-weight: 400;
    text-align: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const StyledContentEditable = styled(ContentEditable)`
    min-height: 300px;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

function onError(error) {
    console.error(error);
}

const editorConfig = {
    namespace: 'PortalEditor',
    theme,
    onError,
    nodes: [
        HeadingNode,
        QuoteNode,
        ListItemNode,
        ListNode,
        CodeNode,
        LinkNode
    ]
}

const RichTextEditor = ({ setPageBodyField, initialContent }) => {
    function onChange(editorState) {
        setPageBodyField(editorState);
    }

    return (
        <LexicalComposer initialConfig={{...editorConfig, editorState: JSON.stringify(initialContent)}}>
            <StyledEditorContainer>
                <ToolbarPlugin />
                <RichTextPlugin
                    contentEditable={
                    <StyledContentEditable
                        aria-placeholder={'Enter some text...'}
                    />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </StyledEditorContainer>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <OnChangePlugin onChange={onChange} />
        </LexicalComposer>
    )
}

export default RichTextEditor