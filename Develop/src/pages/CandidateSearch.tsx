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





//this would be the functional component which i am stuck on - what am i missing??
const CandidateSearch = () => {
  //after access token get fetch request and console log - get API woring - get data - etc..
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);





  //need to Use local storage on module 13 requirements
  const saved = localStorage.getItem('savedCandidates');
  return saved ? JSON.parse(saved) : [];
};





useEffect(() => {
  const fetchCandidates = async () => {
    //fetch candidates from github
    const data = await searchGithub();
    setCandidates(data);
  };

  fetchCandidates();
}, []);

// Save to the local storage 
localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));


const handleSaveCandidate = () => {
  // if (candidates[currentIndex]) {
  //   const candidateToSave = candidates[currentIndex];
  //   const updatedSavedCandidates = [...savedCandidates, candidateToSave];
    
  //   setSavedCandidates(updatedSavedCandidates);
  //   setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));





    // Save to local storage
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };




// const handleNextCandidate = () => {
//   setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, candidates.length - 1));
// };


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

export default CandidateSearch;