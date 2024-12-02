'use client'
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import Link from 'next/link';
import React, { useCallback, useState } from 'react'

type DirectionsToYayaYogaProps = {}
const containerStyle = {
    width: '270px',
    height: '300px'
};

const center = {
    lat: 32.47563947144942,
    lng: 34.9730748226427
}
export default function DirectionsToYayaYoga({ }: DirectionsToYayaYogaProps) {
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(15)
    const [isMarkerActive, setIsMarkerActive] = useState<null | string>(null)
    const { isLoaded } = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || '',
        })

    const onLoad = useCallback(function callback(map: any) {

        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        map.setZoom(zoom)
        setMap(map)
    }, [])
    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])
    const handelMapClick = (ev: any) => {

        setIsMarkerActive(null)
        console.log("latitide = ", ev.latLng.lat());
        console.log("longitude = ", ev.latLng.lng());
    }


    return (
        <main className='map-warrper `'>

            <h2 className='title tac '>הכוונה לסטודיו 'קדם' </h2>

            <section className='adress-container  flex-col '>
                <p className='region flex-ac'>רח הדקלים 95 פרדס חנה </p>
            </section>

            {isLoaded ? <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onClick={(ev: any) => {
                    handelMapClick(ev)
                    setIsMarkerActive(null)
                }
                }
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                      style: google.maps.MapTypeControlStyle.DEFAULT, // Style can be changed as needed
                      mapTypeIds: [], // Excludes 'satellite', 'hybrid', or other types
                    },
                  }}
                >
                <MarkerF visible={true} position={center}>
                </MarkerF>

            </GoogleMap>
                : <></>
            }

            <div className='bold mt-1 flex-ac'>הוראות הגעה:</div>
            <div className='flex-ac'>עולים במדרגות מימין לבית מרקחת, ממשיכים לפי השילוט לאורך המסדרון אחרי "דרך המשי", אל הסטודיו.  אנחנו שם!</div>
            <div className='waize-txt flex-ac'>״אשטנגה יוגה פרדס חנה - יאיא יוגה״ בוויז</div>
        </main>)
}