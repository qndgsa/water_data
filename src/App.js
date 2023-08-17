import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ChoroplethMap from './ChoroplethMap';
import SelectionFlowCard from './SelectionFlowCard';
import 'stream-browserify';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [progressFinished, setProgressFinished] = useState(false);
    const [searchInitiated, setSearchInitiated] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        setShowProgress(true);
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

        // Implement your search logic here.
    };

    return (
        <div>
            <h1 style={{display: 'flex', justifyContent: 'center',}}>USA County Level Data</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <input
                    id="input-box"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '15px 50px 30px', width: '30%' }}
                />
                <button
                    id="submit-button"
                    className="btn blue-gradient btn"
                    onClick={handleSearchSubmit}
                    style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '15px 50px 30px', padding: '10px 24px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer' }}
                >
                    Search
                </button>
            </div>
            {showProgress && (
                    <div style={{  border: '1px solid black', height: '10px', borderRadius: '5px', position: 'relative', overflow: 'hidden', marginBottom: '10px' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'blue' }} />
                    </div>
            )}
            {progressFinished && !showProgress && (
                <>
                    <div className="jumbotron" style={{ width: '60%', margin: '10px auto', textAlign: 'center' }}>
                        <h1 className="display-4">Bergne County 07010</h1>
                        <p className="lead">The watar hardness in your area is: <strong style={{color:"yellow"}}>117</strong></p>
                        <hr className="my-4" />
                        <p>The water hardness in your area is consider as <strong style={{color:"yellow"}}>hard</strong></p> water， click bottom below to learn more
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                        </p>
                        <hr className="my-4" />
                        <span style={{color:"gray"}}>Disclaimer : The data in this handy tool comes to provide a general overview of water hardness is based on reports from USGS.gov .  APEC do not guarantee the water hardness figures are 100% accurate. To see more information and access real-time water data please visit https://www.usgs.gov/mission-areas/water-resources/data</span>
                    </div>

                    <div className="card" style={{ width: '60%', margin: '10px auto' }}>
                        <h1 className="display-4">Question title.......</h1>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            <div className="card" style={{ width: '45%', marginBottom: '10px' }}>
                                <div className="card-body">
                                    <p className="lead">Selection 1</p>
                                </div>
                            </div>
                            <div className="card" style={{ width: '45%', marginBottom: '10px' }}>
                                <div className="card-body">
                                    <p className="lead">Selection 2</p>
                                </div>
                            </div>
                            <div className="card" style={{ width: '45%', marginBottom: '10px' }}>
                                <div className="card-body">
                                    <p className="lead">Selection 3</p>
                                </div>
                            </div>
                            <div className="card" style={{ width: '45%', marginBottom: '10px' }}>
                                <div className="card-body">
                                    <p className="lead">Selection 4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <SelectionFlowCard />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <ChoroplethMap style={{width:'100%',height:'80vh'}}/>
            </div>

        </div>
    );
};
export default App;
ReactDOM.render(<App />, document.getElementById('root'));
