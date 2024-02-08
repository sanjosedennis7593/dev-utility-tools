
const base64EncodeAndDecode = ({
    string,
    type
}) => {
    let results = '';
    if(type === 'encode') {
        results = btoa(string)
    }
    if(type === 'decode') {
        results = atob(string)
    }

    return results;
};

export {
    base64EncodeAndDecode
}