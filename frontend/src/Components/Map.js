import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = (props) => {
    const [ positionIP1, setPositionIP1 ] = useState([ 46.603354, 1.8883335 ]);
    const [ positionIP2, setPositionIP2 ] = useState([ 46.603354, 1.8883335 ]);

    useEffect(() => {
        if (props.firstData != null) {
            if (props.firstData[ 0 ] != null && props.firstData[ 0 ][ "key" ] === "IP1") {
                setPositionIP1([ props.firstData[ 0 ][ "latitude" ], props.firstData[ 0 ][ "longitude" ] ]);
            }
            if (props.firstData[ 1 ] != null && props.firstData[ 1 ][ "key" ] === "IP2") {
                setPositionIP2([ props.firstData[ 0 ][ "latitude" ], props.firstData[ 0 ][ "longitude" ] ]);
            }
        }
    }, [ props.firstData ]);

    useEffect(() => {
        if (props.latestData != null) {
            if (props.latestData[ "key" ] === "IP1") {
                setPositionIP1([ props.latestData[ "latitude" ], props.latestData[ "longitude" ] ]);
            } else if (props.latestData[ "key" ] === "IP2") {
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
            <MapContainer center={[ 46.603354, 1.8883335 ]} zoom={5} style={{ height: '100%', width: '80%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    positionIP1 &&
                    <Marker position={positionIP1} icon={customIcon}>
                        <Popup>
                            Coordonnées de IP1 : <br /> {positionIP1[ 0 ]}, {positionIP1[ 1 ]}
                        </Popup>
                    </Marker>
                }
                {
                    positionIP2 &&
                    <Marker position={positionIP2} icon={customIcon}>
                        <Popup>
                            Coordonnées de IP2 : <br /> {positionIP2[ 0 ]}, {positionIP2[ 1 ]}
                        </Popup>
                    </Marker>
                }
            </MapContainer>
        </div>
    );
};

export default Map;