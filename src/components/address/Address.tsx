"use client";

import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const mapStyles = {
    width: "100%",
    height: "700px",
};

const darkTheme = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
];

const Address = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDVNDAsPWNwktSF0f7KnAKO5hr8cWSJmNM", // Replace with your API key
        libraries: ["marker"], // Add the marker library
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            (async () => {
                const markerLibrary = (await google.maps.importLibrary(
                    "marker"
                )) as unknown as { AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement };

                const { AdvancedMarkerElement } = markerLibrary;

                const position = { lat: 53.515028, lng: -1.122465 };

                // Create an advanced marker
                new AdvancedMarkerElement({
                    map: mapRef.current,
                    position,
                    title: "Location",
                });
            })();
        }
    }, [isLoaded]);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            center={{ lat: 53.515028, lng: -1.122465 }}
            zoom={15}
            onLoad={onLoad}
            options={{
                styles: darkTheme,
                disableDefaultUI: true,
            }}
        />
    );
};

export default Address;
