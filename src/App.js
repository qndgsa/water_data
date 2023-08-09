import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ChoroplethMap from './ChoroplethMap';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

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
                }, 500);
            }
        }, 100);

        // Implement your search logic here.
    };

    return (
        <div>
            <h1>USA County Level Data</h1>
            <div>
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
                <div style={{ width: '30%', margin: '10px auto', textAlign: 'center' }}>
                    <p>Search for county data and visualize it on the map.</p>
                    {showProgress && (
                        <div style={{ border: '1px solid black', height: '10px', borderRadius: '5px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'blue' }} />
                        </div>
                    )}
                </div>
            </div>
            <ChoroplethMap />
        </div>
    );
};
export default App;
ReactDOM.render(<App />, document.getElementById('root'));
