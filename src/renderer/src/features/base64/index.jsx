import React, { useState } from 'react';
import { Button, Flex, Form, Input, Radio } from 'antd';

import { base64EncodeAndDecode } from './utils';

const { TextArea } = Input;


const Base64Converter = props => {

    const [form] = Form.useForm();

    const [base64Results, setBase64Results] = useState('');

    const onFinish = (values) => {
        console.log('values',values)
        const results = base64EncodeAndDecode({
            string: values.strings,
            type: values?.convert_type || 'encode'
        });
        setBase64Results(results);
    };

    // const onReset = () => {

    // }

    return <Flex gap="middle" vertical>
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={style.defaultContainer}
            initialValues={{
                convert_type: 'encode'
            }}
        >
            <Form.Item name="convert_type" >
                <Radio.Group>
                    <Radio defaultChecked={true} value="encode">Encode</Radio>
                    <Radio value="decode">Decode</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="strings"
                label="Text"
                rules={[{ required: true }]}
            >
                <TextArea
                    style={{
                        ...style.defaultContainer,
                        resize: 'none'
                    }}
                    rows={10}
                    value=""
                />
            </Form.Item>

            <Flex gap="middle" horizontal>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Convert</Button>
                </Form.Item>
            </Flex>

        </Form>

        <TextArea
        label="Result"
            style={{
                ...style.defaultContainer,
                resize: 'none'
            }}
            rows={10}
            value={base64Results}
        />


    </Flex>
};

const style = {
    defaultContainer: {
        width: '100%'
    }
}


export default Base64Converter;