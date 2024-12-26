import React, { useEffect, useState } from 'react';

// Define the type for a candidate
type Candidate = {
  login: string;
  avatar_url: string;
  location?: string;
  email?: string;
  company?: string;
  html_url: string;
};

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage on component mount
  useEffect(() => {
    const candidates = localStorage.getItem('savedCandidates');
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates));
    }
  }, []);

  // Save candidates to local storage
  const saveCandidatesToLocalStorage = (candidates: Candidate[]) => {
    localStorage.setItem('savedCandidates', JSON.stringify(candidates));
  };

  // Function to add a candidate
  const addCandidate = (candidate: Candidate) => {
    const updatedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedCandidates);
    saveCandidatesToLocalStorage(updatedCandidates);
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width={50} />
              <div>
                <h2>{candidate.login}</h2>
                <p>Location: {candidate.location || 'N/A'}</p>
                <p>Email: {candidate.email || 'N/A'}</p>
                <p>Company: {candidate.company || 'N/A'}</p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted yet.</p>
      )}
    </>
  );
};

export default SavedCandidates;