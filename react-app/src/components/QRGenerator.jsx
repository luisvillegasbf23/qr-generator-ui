import React, { useState } from 'react';
import "./QRGenerator.css"

function QRGenerator() {
    const [qrText, setQrText] = useState('');
    const [qr, setQr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envía una petición POST a tu API
            const response = await fetch('https://bzc5fdl6pdp2marmkoosjiezku0aicay.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                body: JSON.stringify({ 
                    name: "myqr",
                    data: "https://twitter.com/home",
                    config: "PNG",
                    // color: "#000000",
                    bg_color: "#ffffff",
                    // size: 500
                   }),
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

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa el texto para generar el QR"
                    value={qrText}
                    onChange={e => setQrText(e.target.value)}
                />
                <button type="submit">Generar QR</button>
            </form>
            {qr && <a href={qr.link} download={qr.name}>Descargar QR</a>}
        </div>
    );
}

export default QRGenerator;

