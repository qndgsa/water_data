import React, { useEffect } from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import * as turf from '@turf/turf';

const Plot = createPlotlyComponent(Plotly);

// FIPS codes for California counties
var ca_counties_fips = ['06001', '06003', '06005', '06007', '06009', '06011', '06013', '06015', '06017', '06019',
    '06021', '06023', '06025', '06027', '06029', '06031', '06033', '06035', '06037', '06039',
    '06041', '06043', '06045', '06047', '06049', '06051', '06053', '06055', '06057', '06059',
    '06061', '06063', '06065', '06067', '06069', '06071', '06073', '06075', '06077', '06079',
    '06081', '06083', '06085', '06087', '06089', '06091', '06093', '06095', '06097', '06099',
    '06101', '06103', '06105', '06107', '06109', '06111', '06113', '06115'];

const ChoroplethMap = () => {
    const [data, setData] = React.useState([]);
    const [layout, setLayout] = React.useState({});

    useEffect(() => {
        // Fetch the GeoJSON data and create the plot
        fetch('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json')
            .then((response) => response.json())
            .then((geojson) => {
                const caCounties = {
                    ...geojson,
                    features: geojson.features.filter((feature) => ca_counties_fips.includes(feature.id)),
                };

                const countyData = ca_counties_fips.map(() => Math.random());

                setData([
                    {
                        type: 'choropleth',
                        geojson: caCounties,
                        z: countyData,
                        locations: ca_counties_fips,
                    },
                ]);

                setLayout({
                    geo: {
                        scope: 'usa',
                        showcoastlines: true,
                        projection: { type: 'albers usa' },
                    },
                });
            });
    }, []);

    const handleCountyClick = (eventData) => {
        const { location } = eventData.points[0];


        // Fetch the clicked county's coordinates
        const clickedCounty = data[0].geojson.features.find((feature) => feature.id === location);

        if (clickedCounty) {
            const [lon, lat] = clickedCounty.geometry.coordinates[0][0];
            // Update the layout with the new bounds
            setLayout({
                geo: {
                    scope: 'usa',
                    showcoastlines: true,
                    projection: { type: 'albers usa' },
                    center: { lon, lat },
                    scales: 2,
                },
            });
        }
    };

    return <Plot data={data} layout={layout} onClick={handleCountyClick} />;
};

export default ChoroplethMap;
