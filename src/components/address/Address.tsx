"use client";

import React, {useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import whiteMarker from '@/assets/icons/whiteMarker.svg';
import useLoadGoogleMaps from '@/hooks/useLoadGoogleMaps';
import styles from './Address.module.scss';
import {AddressProps} from "@/types/address";

const containerStyle = {
    width: '100%',
    height: '400px'
};

const darkTheme = [
    { elementType: 'geometry', stylers: [{ color: '#212121' }] },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
    { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
    { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#181818' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { featureType: 'poi.park', elementType: 'labels.text.stroke', stylers: [{ color: '#1b1b1b' }] },
    { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#373737' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3c3c3c' }] },
    { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#4e4e4e' }] },
    { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] }
];

const Address: React.FC<AddressProps> = ({ children }) => {
    const isLoaded = useLoadGoogleMaps("AIzaSyDVNDAsPWNwktSF0f7KnAKO5hr8cWSJmNM");

    const [center] = useState({ lat: 53.515028, lng: -1.122465 });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className={styles.wrapper}>
            {children}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                    styles: darkTheme,
                    disableDefaultUI: true,
                    zoomControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false,
                }}
            >
                <Marker
                    position={center}
                    icon={{
                        url: whiteMarker.src,
                        scaledSize: new google.maps.Size(46, 59)
                    }}
                />
            </GoogleMap>
            {children}
        </div>
    );
};

export default Address;