"use client"

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "@/hooks/useLocation";
import axios from "axios";
import { BACKEND_URL } from "@/constants/constants";
import Popup from "@/components/popup/Popup";
import Button from "@/components/button/Button";

const RequestLocation = () => {
    const [showPopup, setShowPopup] = useState(true);
    const locationSent = useRef(false);

    const { location, error } = useLocation();
    if (error) {
        console.error('Error:', error);
        return null;
    }

    const sendLocationToServer = async (location: any) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/location/send-location`,
                { location },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Location data sent to server successfully', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const requestLocationAccess = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
            if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        console.log('Location access granted:', position);
                        setShowPopup(false);
                        const locationData = {
                            country: location?.country,
                            city: location?.city,
                            state: location?.state,
                            address: location?.address,
                            apartment: location?.apartment,
                            postalCode: location?.postalCode,
                            ip: location?.ip,
                        };
                        const locationDataJSON = JSON.stringify(locationData);
                        console.log("JSON LOCATION:", locationDataJSON);
                    },
                    (error) => {
                        console.error('Location access denied:', error);
                    }
                );
            } else if (permissionStatus.state === 'denied') {
                console.log('Location access denied previously. Please reset location settings in your browser.');
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };

    useEffect(() => {
        if (!locationSent.current) {
            setShowPopup(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    console.log('Location access granted:', position);
                    setShowPopup(false);
                    const locationData = {
                        country: location?.country,
                        city: location?.city,
                        state: location?.state,
                        address: location?.address,
                        apartment: location?.apartment,
                        postalCode: location?.postalCode,
                        ip: location?.ip,
                    };
                    console.log('Prepared location data:', locationData);
                    if (locationData) {
                        setTimeout(async () => {
                            await sendLocationToServer(locationData);
                            locationSent.current = true;
                        }, 3000);
                    } else {
                        console.error('Location data is empty');
                    }
                },
                (error) => {
                    console.error('Location access denied:', error);
                }
            );
        }
    }, [location]);

    return (
        <>
            {showPopup && (
                <Popup
                    title="Разрешите нам доступ к локации"
                    description="Для полного доступа к нашему сервису Вам нужно разрешить пользоваться Вашей локацией"
                    onClose={() => setShowPopup(false)} abilityToClose={false}
                    firstChildren={<Button variant="popupBlack" onClick={requestLocationAccess}>Запросить доступ локации</Button>}
                />
            )}
        </>
    );
};

export default RequestLocation;