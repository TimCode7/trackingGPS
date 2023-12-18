import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = (props) => {
    const [ positionIP1, setPositionIP1 ] = useState([ 51.505, -0.09 ]);
    const [ positionIP2, setPositionIP2 ] = useState([ 51.510, -0.10 ]);

    useEffect(() => {
        console.log(typeof (props.latestData));
        if (props.latestData != null) {

            console.log(props.latestData[ "key" ], [ props.latestData[ "latitude" ], props.latestData[ "longitude" ] ])
            if (props.latestData[ "key" ] == "IP1") {
                setPositionIP1([ props.latestData[ "latitude" ], props.latestData[ "longitude" ] ]);
            } else if (props.latestData[ "key" ] == "IP2") {
                setPositionIP2([ props.latestData[ "latitude" ], props.latestData[ "longitude" ] ]);
            }
        }
    }, [ props.latestData ])

    const customIcon = new L.Icon({
        iconUrl: '/redMarker.png',
        iconSize: [ 25, 41 ],
        iconAnchor: [ 12, 41 ],
        popupAnchor: [ 1, -34 ],
        shadowSize: [ 41, 41 ]
    });
    return (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', height: '80vh', width: '100%' }}>
            <MapContainer center={positionIP1} zoom={13} style={{ height: '100%', width: '80%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={positionIP1} icon={customIcon}>
                    <Popup>
                        Coordonnées de IP1 : <br /> {positionIP1}
                    </Popup>
                </Marker>
                <Marker position={positionIP2} icon={customIcon}>
                    <Popup>
                        Coordonnées de IP2 : <br /> {positionIP2}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;