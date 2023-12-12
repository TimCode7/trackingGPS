import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = (props) => {
    const position = [ 51.505, -0.09 ];
    const position2 = [ 51.510, -0.10 ];

    const customIcon = new L.Icon({
        iconUrl: '/redMarker.png',
        iconSize: [ 25, 41 ],
        iconAnchor: [ 12, 41 ],
        popupAnchor: [ 1, -34 ],
        shadowSize: [ 41, 41 ]
    });

    return (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', height: '80vh', width: '100%' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '80%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        Coordonnées de IP1 : <br /> {position}
                    </Popup>
                </Marker>
                <Marker position={position2} icon={customIcon}>
                    <Popup>
                        Coordonnées de IP2 : <br /> {position2}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;