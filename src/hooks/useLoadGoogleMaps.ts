import { useEffect, useState } from 'react';

const useLoadGoogleMaps = (apiKey: string) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => setIsLoaded(true);
            document.head.appendChild(script);
        } else {
            setIsLoaded(true);
        }
    }, [apiKey]);

    return isLoaded;
};

export default useLoadGoogleMaps;