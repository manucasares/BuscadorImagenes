import React, { useState } from 'react';
import { Form } from './Components/Form';
import { Photos } from './Components/Photos';

function App() {

    const [formValue, setFormValue] = useState({
        inputValue : ''
    })

    const [showResult, setShowResult] = useState(false)

    return (
        <>
            <Form   setFormValue={setFormValue}
                    setShowResult={setShowResult}
            />

            {
                showResult
                &&
                <Photos formValue={formValue}/>
            }
        </>
    );
}

export default App;
