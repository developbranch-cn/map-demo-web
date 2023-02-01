import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

function Map({ id }) { 
    const mapEl = useRef(null);

    useEffect(
        () => {
            loadModules(["esri/config", "esri/Map", "esri/layers/VectorTileLayer", "esri/views/MapView"], {
                version: '4.24',
                //url: 'https://js.arcgis.com/4.24/',
                css: true
            }).then(([esriConfig, Map, VectorTileLayer, MapView]) => {
                esriConfig.apiKey = "AAPKc85619ab61144011b89e94bd99e0a55cJXjNQG8TIn_54f2fp1azph9IB-PXQPCkJorOQirjGhb5wt7D6EreTHFLPkyIestQ";
                //var webmap = new WebMap({
                //    portalItem: {
                //        id: id
                //    }
                //});
                const vtlLayer = new VectorTileLayer({
                    url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
                    //url: "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/ArcGIS:Streets"
                });
                const vectorTileLayer = new VectorTileLayer({
                    portalItem: {
                        id: "6976148c11bd497d8624206f9ee03e30" // Forest and Parks Canvas
                    },
                    opacity: .75
                });
                const map = new Map({
                    basemap: "streets-vector",
                    //layers: [vtlLayer, vectorTileLayer]
                });
                const view = new MapView({
                    center: [-118.80543, 34.02700],
                    zoom: 8,
                    map: map,
                    container: mapEl.current,
                });
                console.log('map extent', view.center, view, 'zoom', view.zoom);
                return () => {
                    if (!!view) {
                        view.destroy();
                        view = null;
                    }
                };
            }).catch(error => {
                console.error(error);
            });
        },
        [id]
    );
    return (
        <div style={{ height: 800 }} ref={mapEl} />
    );
}

export default Map;
