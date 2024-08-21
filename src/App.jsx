import React, { useEffect, useState } from 'react';

function App() {
    const [country, setCountry] = useState('Loading...');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            const address = data.address;
                            if (address && address.country) {
                                setCountry(address.country);
                            } else {
                                setCountry('Unable to determine country');
                            }
                        })
                        .catch(err => {
                            console.error('Error fetching location:', err);
                            setCountry('Unable to determine location');
                        });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setError('Unable to retrieve your location');
                    setCountry('Unable to determine location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser');
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Your Country</h1>
            {error ? <p>{error}</p> : <p>{country}</p>}
        </div>
    );
}

export default App;
