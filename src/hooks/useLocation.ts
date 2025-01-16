import {useState, useEffect} from "react";
import axios from "axios";

interface Location {
    ip?: string;
    country?: string;
    city?: string;
    state?: string;
    address?: string;
    apartment?: string;
    postalCode?: string;
}

export const useLocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    console.log(setError)
    const fetchIpAddress = async () => {
        try {
            const response = await axios.get('https://api.ipify.org?format=json');
            return response.data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    };

    const handleGeoLocationClick = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords;
                try {
                    const ip = await fetchIpAddress();
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const address = response.data.address;
                    const country = address.country || '';
                    const city = address.city || address.town || address.village || '';
                    setLocation({
                        ip,
                        country,
                        city,
                        state: address.state || '',
                        address: address.road || '',
                        apartment: address.house_number || '',
                        postalCode: address.postcode || ''
                    });
                } catch (error) {
                    console.error('Error fetching location:', error);
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        handleGeoLocationClick();
    }, []);

    return {location, error};
};