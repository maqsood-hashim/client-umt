import React from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import base from './BaseUrl';
const Result = ({ showResult, quizs, marks, startOver, level, category }) => {
    const { user } = useSelector((state) => state.auth);
    const updateMarksOnBackend = async () => {
        try {
            // Make a POST request to update the marks on the backend
            const response = await axios.post(`${base}/addUpdateGrades`, 
            { 

                student_id:user._id,
                level:level,
                week:category, 
                value: marks });
            console.log(response.data);
            console.log(level)
            console.log("inside update marks") // Assuming the response contains the necessary information or success message
        } catch (error) {
            console.error('Error in updating marks:', error);
        }

        startOver();
    };

    const handleStartOver = () => {
        // Reset the marks to 0
       

        // Call the method to update the marks on the backend
        updateMarksOnBackend();
        const updatedMarks = 0;
        // Call the startOver function
       
    };

    return (
        <section className="bg-dark text-white" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className={`text-light text-center p-5 rounded ${marks > (quizs.length * 10 / 2) ? 'bg-success' : 'bg-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{marks > (quizs.length * 10 / 2) ? 'Awesome!' : 'Oops!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {marks} out of {quizs.length * 10}</h3>

                            <button onClick={handleStartOver} className='btn py-2 px-4 btn-light fw-bold d-inline'>Back to home</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;