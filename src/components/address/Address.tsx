"use client";

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const Address: React.FC = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyDDrjEOYD77yL8-TyV731oeO8hyRtbb0WQ">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
            </GoogleMap>
        </LoadScript>
    );
};

export default Address;