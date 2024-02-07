import React, { useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, InputNumber } from 'antd';

import {
    NUMBERS,
    SPECIAL_CHARACTERS,
    UPPERCASE_CHARACTERS,
    LOWERCASE_CHARACTERS,
    generateRandomStringList,
    shuffleStrings
} from './utils';

const { TextArea } = Input;

const RandomStringGenerator = props => {
    const [form] = Form.useForm();

    const [randomStringList, setRandomStringList] = useState('');


    const onFinish = (values) => {
        let givenRandomSelection = '';
        if (values?.has_lowercase) {
            givenRandomSelection = `${givenRandomSelection}${LOWERCASE_CHARACTERS}`;
        }
        if (values?.has_uppercase) {
            givenRandomSelection = `${givenRandomSelection}${UPPERCASE_CHARACTERS}`;
        }
        if (values?.has_numbers) {
            givenRandomSelection = `${givenRandomSelection}${NUMBERS}`;
        }
        if (values?.has_special_characters) {
            givenRandomSelection = `${givenRandomSelection}${SPECIAL_CHARACTERS}`;
        }

        if (values.no_of_strings && values.string_length) {
            if (values?.has_lowercase || values?.has_uppercase || values?.has_numbers) {
                const noOfStrings = parseInt(values.no_of_strings);
                const stringLength = parseInt(values.string_length);
                givenRandomSelection = shuffleStrings(givenRandomSelection);
                let randomStrings = generateRandomStringList({
                    givenRandomStrings: givenRandomSelection,
                    noOfStrings,
                    stringLength,
                });
                setRandomStringList(randomStrings)
            }
        }

    };

    const onReset = () => {
        setRandomStringList('');
    }

    return <Flex gap="middle" vertical>
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={style.defaultContainer}
        >
            <Form.Item name="no_of_strings" label="Number of strings" rules={[{ required: true, min: 1, type: 'number' }]}>
                <InputNumber style={{ width: '100%' }} type="number" />
            </Form.Item>
            <Form.Item name="string_length" label="Length of each string" rules={[{ required: true, min: 5, type: 'number' }]}>
                <InputNumber style={{ width: '100%' }} type="number" />
            </Form.Item>
            <Flex gap="middle" horizontal>
                <Form.Item
                    name="has_lowercase"
                    valuePropName="checked"
                >
                    <Checkbox>Use lowercase letters (a-z)</Checkbox>
                </Form.Item>
                <Form.Item
                    name="has_uppercase"
                    valuePropName="checked"
                >
                    <Checkbox>Use uppercase letters (A-Z)</Checkbox>
                </Form.Item>

                <Form.Item
                    name="has_numbers"
                    valuePropName="checked"
                >
                    <Checkbox>Use numeric digits (0-9)</Checkbox>
                </Form.Item>
                <Form.Item
                    name="has_special_characters"
                    valuePropName="checked"
                >
                    <Checkbox>Use special characters</Checkbox>
                </Form.Item>
            </Flex>
            <Flex gap="middle" horizontal>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Generate</Button>
                </Form.Item>

                <Form.Item >
                    <Button onClick={onReset} type="default" htmlType="reset">Clear</Button>
                </Form.Item>
            </Flex>

        </Form>

        <TextArea
            style={{
                ...style.defaultContainer,
                resize: 'none'
            }}
            rows={10}
            value={randomStringList}
        />

    </Flex>
};

const style = {
    defaultContainer: {
        width: '100%'
    }
}


export default RandomStringGenerator;