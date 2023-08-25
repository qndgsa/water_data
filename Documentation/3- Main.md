# App Component Documentation

## Overview

App.js file in the sre folder is the `App` component serves as the main entry point of the React application that allows users to check water quality based on a ZIP code. The application fetches the water hardness data and displays the results using a `ChoroplethMap` and a `HardnessBar`.

## Component Dependencies

- **ChoroplethMap**: Displays geographical data, focused on the given lat and lon.
- **HardnessBar**: Provides a visual representation of water hardness.
- **axios**: Used for making API requests.
- **stream-browserify**: A node.js core module for the browser environment.

## State Management

The component makes use of several `useState` hooks for maintaining the state:

| State Variable   | Purpose                                                                      |
|------------------|------------------------------------------------------------------------------|
| searchTerm       | Store the current value entered in the search input.                         |
| progress         | Tracks the progress bar's percentage.                                         |
| showProgress     | Determines if the progress bar should be displayed.                           |
| progressFinished | Determines if the progress has reached 100%.                                  |
| searchInitiated  | Deprecated (not used in current code).                                        |
| searchResult     | Stores the result from the API based on the ZIP code search.                  |
| zip, city, etc.  | Stores different details fetched from the API for the searched ZIP code.      |
| error            | Indicates if there was an error during ZIP code validation or fetching data. |

## Functions

### `handleSearchChange(event)`

Handles changes to the search input and updates the `searchTerm` state.

### `handleSearchSubmit()`

Executes when the search button is clicked:

1. Validates the ZIP code format using a regular expression.
2. Initiates a progress bar that increments by 2% every 100ms.
3. Sends an API request to fetch water quality data for the given ZIP code.
4. Stores the returned data in appropriate state variables.

## Rendered Elements

- **Header and Description**: Displays the application's purpose and prompts the user to input their ZIP code.

- **Search Input and Button**: Allows users to input a ZIP code and initiate a search.

- **Progress Bar**: Shows while the data is being fetched and disappears once the data retrieval is complete.

- **Error Message**: Displays a message if the ZIP code is invalid.

- **Results Display**: If the search is successful, it shows the ZIP code, city, state, and the water hardness value.

- **HardnessBar**: Visual representation of water hardness.

- **ChoroplethMap**: Geographic representation focusing on the lat and lon of the searched location.

- **Disclaimer**: Provides information about the data's source and its accuracy.

## Usage

The `App` component is rendered in the HTML element with the ID `root`. Ensure the index.html file contains a `<div>` with the `id="root"` for the application to mount correctly.

## Styling

The component uses both Bootstrap classes and inline styling. Ensure Bootstrap is loaded in the project for optimal display.

## External Data

The component fetches data from a local server endpoint: `http://localhost:5000/search/${searchTerm}`. Ensure the server is running and this endpoint is configured to return water quality data based on the ZIP code.

## Conclusion

The `App` component provides an intuitive interface for users to check water quality based on their ZIP code. With clear feedback mechanisms, like a progress bar and error messages, the application ensures a smooth user experience.