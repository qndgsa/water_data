import React, { useState } from 'react';

const SelectionFlowCard = () => {
    const [selectionStep, setSelectionStep] = useState(0);

    const selections = [
        [
            { label: 'Option 1A', nextStep: 1 },
            { label: 'Option 1B', nextStep: 1 },
            { label: 'Option 1C', nextStep: 1 },
            { label: 'Option 1D', nextStep: 1 }
        ],
        [
            { label: 'Option 2A', nextStep: 2 },
            { label: 'Option 2B', nextStep: 2 },
            { label: 'Option 2C', nextStep: 2 },
            { label: 'Option 2D', nextStep: 2 }
        ],
        [
            { label: 'Option 3A', nextStep: 3 },
            { label: 'Option 3B', nextStep: 3 },
            { label: 'Option 3C', nextStep: 3 },
            { label: 'Option 3D', nextStep: 3 }
        ]
    ];

    const titles = [
        "First Selection Title",
        "Second Selection Title",
        "Final Selection Title"
    ];

    const handleOptionClick = (nextStep) => {
        if (nextStep < selections.length) {
            setSelectionStep(nextStep);
        } else {
            // Finish the flow or reset to the first selection if needed
            // setSelectionStep(0);
            alert('Selection Completed!');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card" style={{ width: '80vh' }}>
                <div className="card-body">
                    <h5 className="card-title">{titles[selectionStep]}</h5>
                    <div className="row">
                        {selections[selectionStep].map((option, idx) => (
                            <div key={idx} className="col-6 mb-2">
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => handleOptionClick(option.nextStep)}
                                >
                                    {option.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectionFlowCard;
