import { AccordionGroup, AccordionItem } from "../cmps/AccodionGroup.jsx";
import React, { useState } from 'react';
import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    Marker,
    Pin,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const apiKey = "AIzaSyDSwCDewQtA1S4wZLvm79EPeuOhhVEFS9g"




export function AboutUs() {

    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [selecterMarker, setSelecedMarker] = useState(null)
    const [markerRef1, marker1] = useAdvancedMarkerRef();
    const [markerRef2, marker2] = useAdvancedMarkerRef();
    const [markerRef3, marker3] = useAdvancedMarkerRef();



    return (
        <>
            <div className="map-container">
                <APIProvider apiKey={apiKey}>
                    <Map
                        mapId={"cb672691a9e9e9f2c5a2887d"}
                        style={{ width: '100%', height: '100%' }}
                        defaultCenter={{ lat: 32.08530, lng: 34.78177 }}
                        defaultZoom={10}
                        gestureHandling='greedy'
                        disableDefaultUI>

                        <AdvancedMarker
                            ref={markerRef1}
                            onClick={() => {
                                setInfowindowOpen(true)
                                setSelecedMarker(marker1)
                            }}
                            position={{ lat: 32.08530, lng: 34.78177 }}
                            title={'Branch 1'}
                        />
                        <AdvancedMarker
                            ref={markerRef2}
                            onClick={() => {
                                setInfowindowOpen(true)
                                setSelecedMarker(marker2)
                            }
                            }
                            position={{ lat: 32.092989, lng: 34.73177 }}
                            title={'Branch 2'}
                        />
                        {infowindowOpen && (
                            <InfoWindow
                                anchor={selecterMarker}
                                maxWidth={200}
                                onCloseClick={() => setInfowindowOpen(false)}>
                                This is  {selecterMarker.title}
                            </InfoWindow>
                        )}

                    </Map>

                </APIProvider>
            </div >


            <section className="about-us">
                <h2>About Us</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
                <AccordionGroup>
                    <AccordionItem title="The Team">
                        <h2>Our team is Here</h2>
                        <p>Lorem ipsum</p>
                    </AccordionItem >
                    <AccordionItem title="About Us">
                        <h2>We are Great</h2>
                        <p>Lorem ipsum</p>
                    </AccordionItem>
                    <AccordionItem title="About You">
                        <h2>You are Awesome</h2>
                        <p>Lorem ipsum</p>
                    </AccordionItem>
                    <AccordionItem title="About You">
                        <h2>You are Awesome</h2>
                        <p>Lorem ipsum</p>
                    </AccordionItem>
                </AccordionGroup>
            </section>
        </>
    )
}


