import React from 'react'
import { Menu } from 'antd';
import { useNavigate, useParams } from "react-router-dom"

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}

const items = [
    getItem('Random String Generator', 'randomstringgenerator'),
    getItem('Base64 Encode/Decode', 'base64'),
    getItem('Date Converter', 'dateconverter'),
    getItem('RegExp Tester', 'regexp'), 
    getItem('JSON Formatter', 'json'),
    getItem('SQL Formatter', 'sql')
];


const Navigation = () => {
    const navigate = useNavigate();

    const onClick = (e) => {
        console.log('click ', e);
        navigate(e.key);
    };

    return (
        <Menu
            style={{
                height: '100%',
                fontSize: 12
            }}
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    )
};

export default Navigation;