import React from 'react';
import Plot from 'react-plotly.js';

const ChoroplethMap = () => {
    // Dummy data for USA counties, replace with your data
    const values = Array(3142).fill(0).map((_, i) => Math.random() * 100);

    // USA county IDs
    // You should replace this with your own FIPS codes if you have them
    const fips = Array(3142)
        .fill(0)
        .map((_, i) => (i + 1001).toString());

    const handleClick = (data) => {
        const pointIndex = data.points[0].pointIndex;
        const countyFips = fips[pointIndex];
        const countyValue = values[pointIndex];

        // Handle the click event here, e.g., display information or navigate to a detailed view
        alert(`You clicked on county with FIPS code: ${countyFips} and value: ${countyValue}`);
    };

    return (
        <Plot
            data={[
                {
                    type: 'choropleth',
                    locationmode: 'USA-states',
                    locations: fips,
                    z: values,
                    zmin: 0,
                    zmax: 100,
                    colorscale: 'Viridis',
                    colorbar: {
                        title: 'Value',
                        thickness: 15,
                    },
                    geo: 'geo',
                },
            ]}
            layout={{
                geo: {
                    scope: 'usa',
                    projection: { type: 'albers usa' },
                    showlakes: true,
                    lakecolor: 'rgb(255, 255, 255)',
                },
            }}
            onClick={handleClick} // Add this line to handle click events
        />
    );
};

export default ChoroplethMap;