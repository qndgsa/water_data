import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);


const ChoroplethMap = ({ lat, lon, shouldFocus }) => {
    const [data, setData] = useState([]);
    const [layout, setLayout] = useState({});


    useEffect(() => {
        fetch('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json')
            .then(response => response.json())
            .then(geojson => {
                fetch('http://localhost:5000/all')
                    .then((response) => response.json())
                    .then((result) => {
                        const citiesData = result.data;

                        const latitudes = citiesData.map(loc => loc.Latitude);
                        const longitudes = citiesData.map(loc => loc.Longitude);
                        const cityNames = citiesData.map(loc => loc.City);
                        const cityValues = citiesData.map(loc => loc.Hardness);
                        const stateName = citiesData.map(loc => loc.State);

                        const hoverTexts = cityNames.map((city, index) => `${stateName[index]} ${city}: ${cityValues[index]} PPM`);

                        // Filling all blocks with a blue color
                        const allFips = geojson.features.map(feature => feature.id);
                        const dummyValues = Array(allFips.length).fill(0);

                        const blocksPlot = {
                            type: 'choropleth',
                            geojson: geojson,
                            z: dummyValues,
                            locations: allFips,
                            colorscale: [[0, '#79C5ED'], [1, '#79C5ED']],
                            showscale: false
                        };

                        const scatterPlot = {
                            type: 'scattergeo',
                            mode: 'markers',
                            lon: longitudes,
                            lat: latitudes,
                            hoverinfo: 'text',
                            hovertext: hoverTexts,
                            marker: {
                                color: '#FFFF00',
                                size: 10,
                                opacity: 0.8,
                            },
                            name: 'City Location',
                            customdata: hoverTexts,
                        };

                        setData([blocksPlot, scatterPlot]);

                        setLayout({
                            geo: {
                                scope: 'usa',
                                showcoastlines: true,
                                projection: {
                                    type: 'albers usa',
                                    scale: 1,  // Increase this to zoom in
                                },
                            },
                        });
                    })
                    .catch(error => {
                        console.error('Failed to fetch city data:', error);
                    });
            })
            .catch(error => {
                console.error('Failed to fetch geojson data:', error);
            });
        if (shouldFocus && lat && lon) {
            console.log('Inside focus condition');  // Logging

            setLayout({
                geo: {
                    scope: 'usa',
                    showcoastlines: true,
                    projection: {
                        type: 'albers usa',
                        scale: 8,
                        center: { lon, lat }
                    }
                }
            });
        }
    }, [lat, lon, shouldFocus]);

    const handlePointClick = (data) => {
        const clickedPointIndex = data.points[0].pointIndex;
        const clickedCityLabel = data.points[0].customdata;
        const clickedLon = data.points[0].lon;
        const clickedLat = data.points[0].lat;
        console.log(clickedLon)
        console.log(clickedLat)
        // Update the data to show the label for the clicked point
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[1].text = Array(updatedData[1].lon.length).fill(''); // Empty labels for all
            updatedData[1].text[clickedPointIndex] = clickedCityLabel; // Set label only for the clicked point
            return updatedData;
        });

        // Adjust the map's center and zoom based on the clicked point's location
        setLayout(prevLayout => ({
            ...prevLayout,
            geo: {
                ...prevLayout.geo,
                projection: {
                    ...prevLayout.geo.projection,
                    scale: 10,  // Zoom level (adjust as needed)
                    center: { lon: clickedLon, lat: clickedLat }
                }
            }
        }));
    };

    return <Plot data={data} layout={layout} onClick={handlePointClick} />;
};

export default ChoroplethMap;