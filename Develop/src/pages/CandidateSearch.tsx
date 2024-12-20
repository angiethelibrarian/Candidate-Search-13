//comment back in later - default 
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

//i have to define what the candidate entails:
interface Candidate {
  login: string;
  avatar_url: string;
  location?: string;
  email?: string;
  company?: string;
}



//this would be the functional component which i am stuck on
const CandidateSearch = () => {
  //after access token get fetch request and console log - get API woring - get data - etc..
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  const handleSaveCandidate = () => {
    if (candidates[currentIndex]) {
      setSavedCandidates([...savedCandidates, candidates[currentIndex]]);
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
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
          <h2>{currentCandidate.login}</h2>
          <p>Location: {currentCandidate.location || 'N/A'}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <button onClick={handleSaveCandidate}>+</button>
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