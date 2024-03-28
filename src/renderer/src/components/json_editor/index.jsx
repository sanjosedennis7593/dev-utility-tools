import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json'
import { githubDark } from '@uiw/codemirror-theme-github';

const JSONEditor = ({
    onChange,
    width = '100%',
    height = '700px',
    initialState = '',
    value = ''
}) => {
    return <CodeMirror
        onChange={onChange}
        width={width}
        height={height}
        theme={githubDark}
        extensions={[json()]}
        initialState={initialState}
        value={value}

    />
};


export default JSONEditor;