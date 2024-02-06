import React from 'react'
import {YMaps, Map, FullscreenControl, GeolocationControl} from "react-yandex-maps";

const MapYandex = () => {
    return (
        <YMaps>
            <div>
                <Map width={'100%'} defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
                    <FullscreenControl options={{float: 'right'}} />
                    <GeolocationControl options={{float: 'left'}} />
                </Map>
            </div>
        </YMaps>
    )
}

export default MapYandex;
