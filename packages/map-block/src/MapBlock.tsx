import { AppBridgeBlock, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { FC, useCallback, useEffect, useState } from 'react';
import css from './style.module.css';

const DEFAULT_MAP_ID = 'fb1a500f724ffdd1';
const CLASSIC_MAP_ID = 'fbc37ca32d2815e7';
const DARK_MAP_ID = '6bf13bbe4af3b37e';
const LIGHT_MAP_ID = 'b4795f53fd242f8b';

export enum SelectedTheme {
    'Default' = 'Default',
    'Classic' = 'Classic',
    'Dark' = 'Dark',
    'Light' = 'Light',
}

type Settings = {
    token: string;
    theme: SelectedTheme;
    goTo: string;
    marker: any;
};

type Props = {
    appBridge: AppBridgeBlock;
};

const containerStyle = {
    width: '100%',
    height: '700px',
};
const initialCenter = {
    // frontify office
    lat: 47.420585501539435,
    lng: 9.370577711902264,
};

const mapIds: Record<SelectedTheme, string> = {
    [SelectedTheme.Default]: DEFAULT_MAP_ID,
    [SelectedTheme.Classic]: CLASSIC_MAP_ID,
    [SelectedTheme.Dark]: DARK_MAP_ID,
    [SelectedTheme.Light]: LIGHT_MAP_ID,
};

export const MapBlock: FC<Props> = React.memo(({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        libraries: ['places', 'geometry'],
        googleMapsApiKey: blockSettings.token,
        mapIds: Object.values(mapIds),
    });

    return isLoaded ? <MapComponent appBridge={appBridge} goTo={blockSettings.goTo} /> : <div> ... is loading</div>;
});

type MapProps = { appBridge: AppBridgeBlock; goTo: string };

const MapComponent: FC<MapProps> = ({ appBridge, goTo }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [marker2, setMarker2] = useState<google.maps.places.PlaceResult | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const { theme, marker } = blockSettings;
    const onLoad = (map: google.maps.Map) => {
        setMap(map);
    };
    useEffect(() => {
        if (map) {
            const service = new google.maps.places.PlacesService(map);
            const request = { query: goTo, fields: ['name', 'geometry'] };
            if (!goTo) {
                setMarker2(null);
                setBlockSettings({ ...blockSettings, marker: null });
                return;
            }
            service.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    map.setCenter(results?.[0].geometry?.location || initialCenter);
                    setBlockSettings({ ...blockSettings, marker: results?.[0] });
                    setMarker2(results?.[0]);
                }
            });
        }
    }, [goTo]);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return (
        <div key={theme}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={marker2?.geometry?.location || marker?.geometry?.location || initialCenter}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    mapId: mapIds[theme],
                    streetViewControl: isEditing,
                    zoomControl: isEditing,
                    scaleControl: false,
                    fullscreenControl: false,
                    mapTypeControl: isEditing,
                }}
            >
                <Marker
                    position={marker?.geometry?.location || initialCenter}
                    label={{
                        color: theme === SelectedTheme.Dark ? 'white' : 'black',
                        text: marker?.name || 'Frontify AG',
                        fontSize: '16px',
                        className: css.markerPosition,
                    }}
                />
            </GoogleMap>
        </div>
    );
};
