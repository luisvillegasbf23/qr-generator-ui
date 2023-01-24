import React, { useState } from 'react';
import "./QRGenerator.css"

function QRGenerator() {
    const [qrText, setQrText] = useState({name: "",
    data: "",
    // color: "",
    // bg_color: "",
    // size: 500
   });
    const [qr, setQr] = useState('');
    const url = "https://bzc5fdl6pdp2marmkoosjiezku0aicay.lambda-url.us-east-1.on.aws"
    // const url = "http://0.0.0.0:8000"
    console.log(url)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envía una petición POST a tu API
            // const response = await fetch('https://bzc5fdl6pdp2marmkoosjiezku0aicay.lambda-url.us-east-1.on.aws/create_qr', {
            const response = await fetch(`${url}/create_qr`, {
                method: 'POST',
                body: JSON.stringify(qrText),
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            // Obtiene la respuesta en formato JSON
            const data = await response.json();
            // Actualiza el estado con el link de descarga del QR
            setQr(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = e => {
        setQrText({
          ...qrText,
          [e.target.name]: e.target.value,
        })
      }

    //   const deleteLink = (e) => {
    //     e.preventDefault()
    //     setQr("");

    // }

    console.log(qrText)

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="qr name"
                    name='name'
                    value={qrText.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="url"
                    name='data'
                    value={qrText.data}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="default #000000"
                    name='color'
                    value={qrText.color}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="default transparent"
                    name="bg_color"
                    value={qrText.bg_color}
                    onChange={handleChange}
                />
                <button type="submit">generate qr</button>
            </form>
            {qr && <a href={qr.link} download={qr.name}>Descargar QR</a>}
        </div>
    );
}

export default QRGenerator;

