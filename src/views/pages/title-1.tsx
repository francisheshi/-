import React,
    { useState } from 'react';
import {
    Form,
    Button,
    Input
} from 'antd';

import './pages-style.css';


const { TextArea } = Input;
const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
const textareaValue = JSON.stringify(obj, undefined, 2);

const Title1 = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopy, setIsCopy] = useState(false);

    const collapse = () => {
        setIsExpanded(!isExpanded)
    }

    const copyFile = async (e: any) => {
        await navigator.clipboard.writeText(textareaValue);
        setIsCopy(!isCopy);
        e.preventDefault();
    }
    
    return (
        <div>
            <h2>Title 1</h2>
            
            <Button className='collapse-code' onClick={collapse} type='primary' size='large'>Collapse</Button>
                <br />
            <Form className='textarea-form'>
                <TextArea className='textarea' size='large' disabled={true} rows={15} value={textareaValue}>{textareaValue}</TextArea>
                <Button
                    className='copy-code'
                    htmlType='submit'
                    onClick={copyFile}
                    type='dashed'
                    size='small'
                >
                    Copy
                </Button>
            </Form>
        </div>
    );
}
 
export default Title1;