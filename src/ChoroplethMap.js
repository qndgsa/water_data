import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// Create a Plotly React component
const Plot = createPlotlyComponent(Plotly);

const ChoroplethMap = ({ lat, lon, shouldFocus }) => {
    // State to store the data and layout for the map
    const [data, setData] = useState([]);
    const [layout, setLayout] = useState({});

    // useEffect hook to fetch data and create the map when the component mounts or when lat, lon, or shouldFocus changes
    useEffect(() => {
        // Fetch GeoJSON data for counties
        fetch('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json')
            .then(response => response.json())
            .then(geojson => {
                // Fetch city data from a local server
                fetch('http://localhost:5000/all')
                    .then((response) => response.json())
                    .then((result) => {
                        const citiesData = result.data;

                        // Extract data from citiesData
                        const latitudes = citiesData.map(loc => loc.Latitude);
                        const longitudes = citiesData.map(loc => loc.Longitude);
                        const cityNames = citiesData.map(loc => loc.City);
                        const cityValues = citiesData.map(loc => loc.Hardness);
                        const stateName = citiesData.map(loc => loc.State);

                        // Create hover texts for each city
                        const hoverTexts = cityNames.map((city, index) => `${stateName[index]} ${city}: ${cityValues[index]} PPM`);

                        // Create a choropleth layer to color all counties blue
                        const blocksPlot = {
                            type: 'choropleth',
                            geojson: geojson,
                            z: Array(geojson.features.length).fill(0),
                            locations: geojson.features.map(feature => feature.id),
                            colorscale: [[0, '#79C5ED'], [1, '#79C5ED']],
                            showscale: false
                        };

                        // Create a scattergeo layer for city markers
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

                        // Update the data state with the two plotly layers
                        setData([blocksPlot, scatterPlot]);

                        // Define the default map layout
                        setLayout({
                            geo: {
                                scope: 'usa',
                                showcoastlines: true,
                                projection: {
                                    type: 'albers usa',
                                    scale: 1,  // Default scale
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

        // If we need to focus on a specific city, adjust the map's center and zoom
        if (shouldFocus && lat && lon) {
            console.log('Inside focus condition');  // Logging

            setLayout({
                geo: {
                    scope: 'usa',
                    showcoastlines: true,
                    projection: {
                        type: 'albers usa',
                        scale: 8,  // Adjusted scale for focused view
                        center: { lon, lat }
                    }
                }
            });
        }
    }, [lat, lon, shouldFocus]);

    // Handle click events on city markers
    const handlePointClick = (data) => {
        const clickedPointIndex = data.points[0].pointIndex;
        const clickedCityLabel = data.points[0].customdata;
        const clickedLon = data.points[0].lon;
        const clickedLat = data.points[0].lat;

        // Update the data to show the label for the clicked point
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[1].text = Array(updatedData[1].lon.length).fill(''); // Empty labels for all points
            updatedData[1].text[clickedPointIndex] = clickedCityLabel; // Set label for the clicked point
            return updatedData;
        });

        // Adjust the map's center and zoom based on the clicked point's location
        setLayout(prevLayout => ({
            ...prevLayout,
            geo: {
                ...prevLayout.geo,
                projection: {
                    ...prevLayout.geo.projection,
                    scale: 10,  // Adjusted scale for clicked view
                    center: { lon: clickedLon, lat: clickedLat }
                }
            }
        }));
    };

    return <Plot data={data} layout={layout} onClick={handlePointClick} />;
};

export default ChoroplethMap;