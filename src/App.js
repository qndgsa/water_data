import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ChoroplethMap from './ChoroplethMap';
import SelectionFlowCard from './SelectionFlowCard';
import HardnessBar from './HardnessBar';
import 'stream-browserify';
import axios from 'axios';


const App = () => {
    // State for the search term and other related variables
    const [searchTerm, setSearchTerm] = useState('');
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [progressFinished, setProgressFinished] = useState(false);
    const [searchInitiated, setSearchInitiated] = useState(false);
    let [searchResult, setSearchResult] = useState({});
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [hardness, setHardness] = useState('');
    const [state, setState] = useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState('');
    const [error, setError] = useState(false);

    // Function to handle changes in the search input
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle the search submission
    const handleSearchSubmit = async () => {
        setError(false);
        // Regex for validating the ZIP code format
        const zipRegex = /^\d{5}$/;
        if (!zipRegex.test(searchTerm)) {
            setError(true);
        } else {
            // Start showing progress
            setShowProgress(true);
            // Incremental progress logic for visual feedback
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 2; // Increment by 2% every 100ms to reach 100% in 5 seconds
                setProgress(currentProgress);
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    // Hide the progress bar after a short delay
                    setTimeout(() => {
                        setShowProgress(false);
                        setProgressFinished(true);
                    }, 500);
                }
            }, 100);
            console.log(searchTerm);
            setZip(searchTerm);
            try {
                // Make an API call to get data based on the ZIP code
                const response = await axios.get(`http://localhost:5000/search/${searchTerm}`);
                console.log(response.data);
                console.log(response.data.data);
                setSearchResult(response.data.data);
                console.log(searchResult);
                if (searchResult && searchResult.length > 0) {
                    setCity(searchResult[0].City);
                    setHardness(searchResult[0].Hardness);
                    setState(searchResult[0].State);
                    setLon(searchResult[0].Longitude);
                    setLat(searchResult[0].Latitude);
                }
                console.log(city);
                console.log(hardness);
                console.log(state);
            } catch (error) {
                console.error('Error fetching data from server:', error);
            }
        };
    }

    // Rendering the main application structure
    return (
        <div>
            {/* Header section */}
            <h1 style={{display: 'flex', justifyContent: 'center', color: '#40ABE7'}}>Check your water quality</h1>
            <p className="lead" style={{display: 'flex', justifyContent: 'center'}}>Enter your zip code and see if you
                live in a hard water area with out hardness tool. Lots of people lives in hard water areas without
                knowing. How hard is you water?</p>

            {/* Search bar section */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                <input
                    id="input-box"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{padding: '10px', fontSize: '16px', borderRadius: '15px 50px 30px', width: '30%'}}
                />
                <button
                    id="submit-button"
                    className="btn blue-gradient btn"
                    onClick={handleSearchSubmit}
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px 50px 30px',
                        padding: '10px 24px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer'
                    }}
                >
                    Search
                </button>
            </div>

            {/* Progress bar section */}
            {showProgress && !error && (
                <div style={{
                    border: '1px solid black',
                    height: '10px',
                    borderRadius: '5px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '10px'
                }}>
                    <div style={{width: `${progress}%`, height: '100%', backgroundColor: 'blue'}}/>
                </div>
            )}

            {/* Error message section */}
            {error && (
                <>
                    <div className="jumbotron winter-neva-gradient"
                         style={{width: '60%', margin: '10px auto', textAlign: 'center'}}>
                        <p>Please enter the valid zip code.</p>
                    </div>

                </>
            )}

            {/* Results section after searching */}
            {progressFinished && !showProgress && !error && (
                <>
                    <div className="jumbotron winter-neva-gradient"
                         style={{width: '60%', margin: '10px auto', textAlign: 'center'}}>
                        {searchResult && (
                            <>
                                <h1 className="display-4">Zip Code: {zip} City: {city} {state}</h1>
                                <p className="lead">The water hardness in your area is: <strong
                                    style={{color: "yellow"}}>{hardness}</strong></p>
                            </>
                        )}
                        <hr className="my-4"/>
                        <p>The water hardness in your area is consider as <strong
                            style={{color: "yellow"}}>hard</strong>water.</p>

                    </div>
                    <br></br>
                    <HardnessBar hardness={hardness}/>
                </>
            )}

            {/* Map visualization section */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                <ChoroplethMap
                    lat={lat}
                    lon={lon}
                    shouldFocus={progressFinished}
                    style={{width: '100%', height: '80vh'}}
                    key={lat + lon}  // This key will force the component to remount if lat or lon change
                />
            </div>

            {/* Disclaimer section */}
            <div className="jumbotron" style={{width: '60%', margin: '10px auto', textAlign: 'center'}}>
                <span style={{color: "gray"}}>Disclaimer : The data in this handy tool comes to provide a general overview of water hardness is based on reports from USGS.gov .  APEC do not guarantee the water hardness figures are 100% accurate. To see more information and access real-time water data please visit https://www.usgs.gov/mission-areas/water-resources/data</span>
            </div>

        </div>
    );
};
export default App;

// Rendering the main App component into the root DOM element
ReactDOM.render(<App/>, document.getElementById('root'));
