import React from 'react';

const Start = ({ startQuiz, showStart, isLoading }) => (
  <section className='text-white text-center bg-dark' style={{ display: `${showStart ? 'block' : 'none'}` }}>
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-lg-8">
          <h3 className='mb-2'>Make sure to attempt all the questions within the given time.</h3>
          {/* Show loading state or Start Quiz button */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default Start;
