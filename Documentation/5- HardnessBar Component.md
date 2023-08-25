# HardnessBar React Component Documentation

## Overview

HardnessBar.js, the `HardnessBar` component provides a visual representation of water hardness using a progress bar. This component uses color-coded segments to represent different ranges of hardness and an arrow to point at the current hardness level.

## Components

### ArrowSVG
A simple arrow SVG which points downwards, colored blue and rotates 180 degrees.

### HardnessBar
The main component that receives a `hardness` prop and renders the visual representation.

## Props

| Prop       | Type   | Description                                                                           |
|------------|--------|---------------------------------------------------------------------------------------|
| `hardness` | Number | Represents the water hardness value which will determine the position of the arrow. |

## Functionalities

- **Progress Bar Rendering**: The component renders a progress bar segmented into different ranges of hardness. Each range has a unique color and label.

- **Arrow Positioning**: Determines the position of the arrow relative to the provided hardness value.

## Internal Functions

- **determinePosition()**: This function determines the position (index) of the arrow based on the provided hardness value. The function loops through the ranges and finds where the hardness value fits.

## Usage

To use the `HardnessBar` component, simply import it and provide the `hardness` prop:

```jsx
import React from 'react';
import HardnessBar from './HardnessBar';

const App = () => {
    return (
        <div>
            <HardnessBar hardness={50} />
        </div>
    );
};

export default App;
```

This will render a `HardnessBar` with an arrow pointing towards the "Moderate Hard" segment.

## Styling 

- The component uses Bootstrap's `progress` and `progress-bar` classes, so ensure Bootstrap is installed and imported in your project.

- The `ArrowSVG` uses inline styles for its blue fill color and rotation.

- The positioning and styling of the progress bar and arrow are achieved using inline styles in the component.

## Conclusion

`HardnessBar` offers an intuitive way to visualize water hardness levels. The use of color-coded segments makes it easy for users to understand the data, while the arrow provides a clear indicator of the current hardness level. This component can be especially useful for water quality monitoring dashboards or similar applications.