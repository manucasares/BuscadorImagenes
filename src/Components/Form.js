import React, { useState } from 'react'
import { useForm } from '../Hooks/useForm'

export const Form = ({setFormValue, setShowResult}) => {

    const [validation, setValidation] = useState(false)

    const [{inputValue}, handleInputChange] = useForm({
        inputValue : ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!inputValue.trim()){
            console.log('validacion');
            setValidation(true);
            return;
        }
        setValidation(false);

        setFormValue(p => {return {
            inputValue
        }})

        setShowResult(true);
    }

    return (
        <div className='form-container'>
            <h4 className='text-center titulo'>Buscador de Imágenes</h4>

            <form   onSubmit={handleSubmit}
                    className='form'>
                <input
                        type='text'
                        className='form-control input'
                        onChange={handleInputChange}
                        value={inputValue}
                        name='inputValue'
                />

                <button className='btn-form btn btn-primary'>
                    Buscar
                </button>

                {
                    validation
                    &&
                    <p className='validacion bg-danger text-light text-center rounded mt-3'>Ingrese una búsqueda válida.</p>
                }

            </form>

        </div>
    )
}
