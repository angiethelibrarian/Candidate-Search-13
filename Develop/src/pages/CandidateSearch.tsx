import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);
      } catch (err) {
        setError('Failed to fetch candidates.'); // Set error message
      }
    };

    const loadSavedCandidates = () => {
      const candidatesFromStorage = localStorage.getItem('savedCandidates');
      if (candidatesFromStorage) {
        setSavedCandidates(JSON.parse(candidatesFromStorage));
      }
    };

    fetchCandidates();
    loadSavedCandidates(); // Load saved candidates from local storage
  }, []);

  const saveCandidatesToLocalStorage = (candidates: Candidate[]) => {
    localStorage.setItem('savedCandidates', JSON.stringify(candidates));
  };

  const handleSaveCandidate = () => {
    if (candidates[currentIndex]) {
      const candidateToSave = candidates[currentIndex];
      const updatedSavedCandidates = [...savedCandidates, candidateToSave];
      setSavedCandidates(updatedSavedCandidates);
      saveCandidatesToLocalStorage(updatedSavedCandidates); // Save to local storage
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
    }
  };

  const handleNextCandidate = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
  };

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {error && (<p>{error}</p>)}
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
          <h2>{currentCandidate.login}</h2>
          <p>Location: {currentCandidate.location || 'N/A'}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <button onClick={handleSaveCandidate} disabled={savedCandidates.some(candidate => candidate.login === currentCandidate.login)}>+</button>
          <button onClick={handleNextCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}

      {savedCandidates.length > 0 && (
        <div>
          <h2>Saved Candidates</h2>
          <ul>
            {savedCandidates.map((candidate, index) => (
              <li key={index}>
                {candidate.login} - {candidate.location || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;