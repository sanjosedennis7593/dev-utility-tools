import React, { useState } from 'react';
import { Alert, Button, Col, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import JsonViewer from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';

import JSONEditor from '../../components/json_editor';


const JSONFormatter = props => {

    const [json, setJson] = useState('');
    const [output, setOutput] = useState({});
    const [errorMessage, setErrorMessage] = useState('');


    const formatCode = () => {
        try {
            setErrorMessage('');
            const obj = JSON.parse(json);
            const str = JSON.stringify(obj, null, 2);
            setJson(str);
            setOutput(JSON.parse(json))

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                throw error;
            }
        }
    }

    const onChangeInput = value => {
        setJson(value)
    }

    const onUpload = e => {

        const file = e.file;
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            try {
                setErrorMessage('');
                const obj = JSON.parse(content);
                const str = JSON.stringify(obj, null, 2);
                setJson(str);
                // setOutput(JSON.parse(json))
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    throw error;
                }
            }

        };
        reader.readAsText(file.originFileObj);

    }

    return <Row>
        {errorMessage && <Col span={23} style={style.error}>
            <Alert message={errorMessage} type="error" showIcon />
        </Col>}

        <Col span={10}>
            <Col>
                <JSONEditor
                    height="88vh"
                    value={json}
                    onChange={onChangeInput}
                />
            </Col>
        </Col>
        <Col span={4} style={style.action}>
            <Row>
                <Upload accept="application/JSON" multiple={false} showUploadList={false} onChange={onUpload}>
                    <Button icon={<UploadOutlined />}>Load JSON File</Button>
                </Upload>
            </Row>
            <br />
            <Row>
                <Button onClick={formatCode}>Process</Button>

            </Row>
        </Col>
        <Col span={10} style={style.previewContainer}>
            <JsonViewer
                displayDataTypes={false}
                displayObjectSize={true}
                enableClipboard={true}
                style={style.jsonViewer}
                value={output}
                innerWidth={true}
            />

        </Col>
    </Row>
};

const style = {
    action: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        paddingBottom: 12
    },
    previewContainer: {
        height: '88vh',
        overflowY: 'scroll'
    },
    jsonViewer: {
        ...monokaiTheme,
        width: 'auto',
        minHeight: '100%'
    }
}


export default JSONFormatter;