import React from 'react';

// A simple SVG component representing an arrow.
const ArrowSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
        <path fill="blue" d="M12 2l8 8h-6v12h-4v-12h-6z"/>
    </svg>
);

// A component representing a visual "hardness bar" indicating the hardness of water based on a provided value.
const HardnessBar = ({ hardness }) => {
    // Define hardness ranges with their labels and colors.
    const ranges = [
        { label: 'Slightly Hard', max: 17, color: 'bg-info' },
        { label: 'Moderate Hard', max: 60, color: 'bg-primary' },
        { label: 'Hard', max: 120, color: 'bg-warning' },
        { label: 'Very Hard', max: 172, color: 'bg-danger' },
        { label: 'Extreme Hard', max: 240, color: 'bg-dark' },
    ];

    // A function to determine the position of the arrow based on the provided hardness value.
    const determinePosition = () => {
        for (let i = 0; i < ranges.length; i++) {
            if (hardness <= ranges[i].max) {
                return i;
            }
        }
        return ranges.length - 1; // Default to the last range if none of the others match.
    };

    const arrowPosition = determinePosition();

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Render the hardness ranges as segments on a progress bar */}
            <div className="progress" style={{ width: '60%' }}>
                {ranges.map((range, index) => (
                    <div key={index} className={`progress-bar ${range.color}`} style={{ width: '20%', textAlign: 'center', fontSize: '18px' }}>
                        {range.label}
                    </div>
                ))}
            </div>
            {/* Position the arrow above the progress bar at the appropriate segment based on the hardness value */}
            <div style={{ position: 'absolute', top: '-24px', width: '60%', textAlign: 'center', pointerEvents: 'none' }}>
                <div style={{ left: `${arrowPosition * 20 + 10}%`, position: 'absolute', transform: 'translateX(-50%)' }}>
                    <ArrowSVG />
                </div>
            </div>
        </div>
    );
};

export default HardnessBar;