import React, { useState } from 'react';
import img1 from './images/RO-Hi.jpg';
import img2 from './images/RO-PERM.jpg';
import img3 from './images/RO-PH90.jpg';
import img4 from './images/RO-PUMP.png';


const SelectionFlowCard = () => {
    const [selectionStep, setSelectionStep] = useState(0);
    const [secondStepChoices, setSecondStepChoices] = useState([]);

    const finalImages = [img1, img2, img3, img4];

    const finalImageDetails = [
        { src: img1, title: 'RO-Hi', price: '$289.99', quote: '85% customers\' choice' },
        { src: img2, title: 'RO-PERM', price: '$349.95', quote: '' },
        { src: img3, title: 'RO-PH90', price: '$411.95', quote: '' },
        { src: img4, title: 'RO-PUMP', price: '$379.95', quote: ''}
    ];
    const determineFinalImages = () => {
        if (secondStepChoices.includes('2A') && secondStepChoices.includes('2C')) {
            return [finalImageDetails[0], finalImageDetails[1]];
        } else if (
            secondStepChoices.includes('2B') &&
            secondStepChoices.includes('2D') &&
            secondStepChoices.includes('2E')
        ) {
            return [finalImageDetails[2], finalImageDetails[3]];
        } else {
            return finalImageDetails;
        }
    };

    const imagesToShow = determineFinalImages();



    const selections = [
        [
            { label: 'Kitchen or Bathroom', nextStep: 1 },
            { label: 'Whole house', nextStep: 1 },
        ],
        [
            { label: 'taste, odor, cloudiness, chlorine', nextStep: 2, value: '2A' },
            { label: 'total dissolved solids (TDS)  and harmful contaminants', nextStep: 2, value: '2B' },
            { label: 'no balance of pH level', nextStep: 2, value: '2C' },
            { label: 'sediment', nextStep: 2, value: '2D' },
            { label: 'low psi (40 psi and under, counter top not suitable) ', nextStep: 2, value: '2F' },
            { label: 'all above', nextStep: 2, value: '2E' }
        ],
        [
            { label: 'Under Sink', nextStep: 3 },
            { label: 'Counter Top', nextStep: 3 },
        ]
    ];

    const titles = [
        "What usage your are looking for?",
        "Second Selection Title",
        "How would you like the style of your drinking water purification product ? "
    ];

    const handleMultiChoiceClick = (optionValue) => {
        setSecondStepChoices(prevChoices => {
            if (prevChoices.includes(optionValue)) {
                // Remove the choice if it was previously selected
                return prevChoices.filter(choice => choice !== optionValue);
            } else {
                // Add the choice otherwise
                return [...prevChoices, optionValue];
            }
        });
    };

    const handleOptionClick = (nextStep, optionValue) => {
        if (selectionStep === 1) {
            handleMultiChoiceClick(optionValue);
        } else if (nextStep < selections.length) {
            setSelectionStep(nextStep);
        } else {
            setSelectionStep(selections.length);  // Set it to a value beyond the selections to denote completion
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {selectionStep < selections.length ? (
                // ... previous rendering logic for other steps
                <div className="card" style={{ width: '80vh' }}>
                    <div className="card-body">
                        <h5 className="card-title">{titles[selectionStep]}</h5>
                        <div className="row">
                            {selections[selectionStep].map((option, idx) => (
                                <div key={idx} className="col-6 mb-2">
                                    <button
                                        className={`btn btn-block ${selectionStep === 1 && secondStepChoices.includes(option.value) ? 'btn-success' : 'btn-primary'}`}
                                        onClick={() => handleOptionClick(option.nextStep, option.value)}
                                    >
                                        {option.label}
                                    </button>
                                </div>
                            ))}
                        </div>
                        {selectionStep === 1 && (
                            <button
                                className="btn btn-secondary mt-3"
                                onClick={() => setSelectionStep(option => option + 1)}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="card" style={{ width: '80vh' }}>
                    <div className="card-body">
                        <h5 className="card-title">We recommend:</h5>
                        <div className="row">
                            {imagesToShow.map((imageDetail, idx) => (
                                <div key={idx} className="col-6 mb-2">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={imageDetail.src}
                                            alt={`Final Image ${idx}`}
                                            className="img-fluid"
                                            style={{ width: '50%', height: 'auto', marginRight: '10px' }}
                                        />
                                        <div>
                                            <h6>{imageDetail.title}</h6>
                                            <p>{imageDetail.price}</p>
                                            <blockquote className="blockquote">
                                                <p className="mb-0" style={{color:"blue"}}>{imageDetail.quote}</p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectionFlowCard;
