"use client";

import React, {useEffect, useState} from 'react';
import axios from "axios";
import Popup from "@/components/popup/Popup";
import Button from "@/components/button/Button";

const CheckLocation = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkLocation = async (latitude: number, longitude: number) => {
            try {
                const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
                    params: {
                        latitude,
                        longitude,
                        localityLanguage: 'en'
                    }
                });

                const countryName = response.data.countryName;
                if (countryName === 'Germany') {
                    setShowPopup(true);
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        const handleLocation = (position: GeolocationPosition) => {
            const {latitude, longitude} = position.coords;
            checkLocation(latitude, longitude);
        };

        const handleError = (error: GeolocationPositionError) => {
            console.error('Error getting location:', error);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleLocation, handleError);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <>
            {showPopup && (
                <Popup
                    title={"сайт временно недоступен в вашем регионе"}
                    description={"К сожалению, наш сайт временно недоступен в вашем регионе по техническим причинам. Мы уже активно работаем над устранением неполадок и постараемся восстановить доступ как можно скорее. Спасибо за ваше понимание!"}
                    firstChildren={<Button variant="authentication" onClick={() => setShowPopup(false)}>Вернуться
                        назад</Button>}
                />
            )}
        </>
    );
};

export default CheckLocation;