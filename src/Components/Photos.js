import React, { useState, useEffect } from 'react'
import { useFetch } from '../Hooks/useFetch'

export const Photos = ({formValue}) => {

    //PAGINADOR
    const [pagActual, setPagActual] = useState(1);
    const [pagTotal, setPagTotal] = useState(1)
    
    const {inputValue} = formValue;
    
    const {data} =
    useFetch(`https://pixabay.com/api/?key=18136241-a6a7a0151266526be96042e51&q=${encodeURI(inputValue)}&image_type=photo&page=${pagActual}`)
    
    const {hits, totalHits} = !!data && data;
    
    console.log(data);

    //seteamos el total de páginas
    useEffect(() => {
        //se muestran 30 fotos por pag, y totalhits es el total de fotos
        setPagTotal(Math.ceil(totalHits / 30))
    }, [totalHits])

    useEffect(() => {
        setPagActual(1);
    }, [inputValue])

    //funciones para incrementar y decrementar el paginador
    const decrement = () => {
        if(pagActual === 1) return;
        setPagActual(pagActual - 1);
    }

    const increment = () => {
        if(pagActual === pagTotal) return;
        setPagActual(pagActual + 1);
    }


    //funcion para abrir en nueva pestaña
    function openInNewTab(url) {
        const win = window.open(url, '_blank');
        win.focus();
    }

    return (

        <>
            <div className='photo-container'>
                {
                    hits
                    &&
                    hits.map(({id, largeImageURL, likes, views}) => (
    
                        <div    key={id}
                                className='photo'
                        >
                            <div style={{
                                    height : '200px',
                                    borderRadius : '5px',
                                    background: `url('${largeImageURL}') no-repeat center center / cover`
                                }}>
                            </div>
    
                            <div className='p-2'>
                                <p className='text-light'><i className="mr-3 far fa-thumbs-up"></i> {likes}</p>
                                <p className='text-light'><i className="mr-3 far fa-eye"></i>{views}</p>
                            </div>
    
                            <button onClick={(e) => openInNewTab(largeImageURL)}
                                    className='btn btn-primary m-auto'
                            >
                                Ver Imagen
                            </button>
                            
                        </div>
                    ))
                }
    
            </div>
            
            {
                data
                &&
                <div className='btn-paginador'>
                    {
                        pagActual === 1 
                        ?
                        null
                        :
                        <button className='btn btn-warning font-weight-bold'
                                onClick={decrement}>Anterior</button>
                    }
                    {
                        pagActual === pagTotal
                        ?
                        null
                        :
                        <button className='btn btn-warning font-weight-bold'
                                onClick={increment}>Siguiente</button>
                    }
                </div>
            }
        </>
    )
}
