# ChoroplethMap React Component Documentation

## Overview

The `ChoroplethMap` component is a React component designed to display a choropleth map of the USA with city markers. This component relies on the `plotly.js` library to render the map and integrates the data fetched from an external API to represent city locations and water hardness data.

## Props

| Prop          | Type    | Description                                                                                                     |
|---------------|---------|-----------------------------------------------------------------------------------------------------------------|
| `lat`         | Number  | Latitude to center the map. Useful when the `shouldFocus` prop is set to `true`.                                |
| `lon`         | Number  | Longitude to center the map. Useful when the `shouldFocus` prop is set to `true`.                               |
| `shouldFocus` | Boolean | Determines if the map should be centered and zoomed based on the provided `lat` and `lon` props.                |

## Functionalities

1. **Fetch GeoJSON Data**: The component fetches geoJSON data for counties from an external source.
2. **Fetch City Data**: It fetches water hardness data for various cities.
3. **Render Choropleth Map**: Using the fetched data, the component visualizes the USA map, overlaying city markers on top of it.
4. **Clickable City Markers**: Each city marker is clickable. On clicking a city, the map will zoom in and focus on the clicked city's location.

## Internal State

| State Variable | Description                                                             |
|----------------|-------------------------------------------------------------------------|
| `data`        | Holds the plotting data for the choropleth blocks and scatter markers.  |
| `layout`      | Defines the layout configuration for the map.                           |

## Event Handlers

- **handlePointClick(data)**: This handler is triggered when a city marker on the map is clicked. It focuses and zooms the map to the clicked city's location and displays its label.

## Usage

```jsx
import React from 'react';
import ChoroplethMap from './ChoroplethMap';

const App = () => {
    return (
        <div>
            <ChoroplethMap shouldFocus={true} lat={40.730610} lon={-73.935242} /> 
            {/* This will focus on New York City */}
        </div>
    );
};

export default App;
```

## Dependency

This component requires the following dependencies:

- `react-plotly.js`: A React component for Plotly.js.
- `plotly.js`: A plotting library.

Make sure to install these using npm or yarn.

## Future Enhancements

1. **Error Handling**: Enhance error handling for better user experience in case of failed data fetches.
2. **Custom Styling**: Allow custom styles to be applied to the map and city markers.
3. **Additional Tooltips**: Display more detailed tooltips for each city marker.

## Conclusion

The `ChoroplethMap` component is an interactive map representation suitable for displaying geographical data points. Its dependency on `plotly.js` provides powerful visualization capabilities, making it apt for data-centric applications.