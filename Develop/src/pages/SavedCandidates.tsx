import { useEffect, useState } from 'react';
import { IoRemoveCircle } from 'react-icons/io5';

// Define the type for a candidate
type Candidate = {
  id: number;
  login: string;
  avatar_url: string;
  location?: string;
  email?: string;
  company?: string;
  html_url: string;
  name?: string;
  bio?: string;
};

type SavedCandidateProps = {
  candidate: Candidate;
  rejectCandidate: (id: number) => void;
};

const SavedCandidate = ({
  candidate,
  rejectCandidate,
}: SavedCandidateProps) => {
  return (
    <tr>
      {candidate ? (
        <>
          <td>
            <img
              src={`${candidate.avatar_url}`}
              alt={`Profile of ${candidate.login}`}
              style={{
                width: '70px',
                borderRadius: '10px',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </td>
          <td>
            <a href={candidate.html_url || ''} target='_blank' rel='noreferrer'>
              <h3 style={{ color: 'white' }}>
                {candidate.name || candidate.login}
                <br />
                <em>({candidate.login})</em>
              </h3>
            </a>
          </td>
          <td>{candidate.location || 'N/A'}</td>
          <td>
            <a href={`mailto:${candidate.email}`}>{candidate.email || 'N/A'}</a>
          </td>
          <td>{candidate.company || 'N/A'}</td>
          <td>
            <div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
              {candidate.bio || 'N/A'}
            </div>
          </td>
          <td>
            <IoRemoveCircle
              style={{
                color: 'red',
                margin: '0 auto',
                display: 'block',
                cursor: 'pointer',
                fontSize: '50px',
              }}
              onClick={() => rejectCandidate(candidate.id)}
            />
          </td>
        </>
      ) : null}
    </tr>
  );
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

  // Function to reject a candidate
  const rejectCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    saveCandidatesToLocalStorage(updatedCandidates);
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table style={{ 
          borderCollapse: 'collapse', 
          width: '100%', 
          tableLayout: 'fixed', 
          margin: '20px 0'
          }}>
          <thead>
            <tr>
              <th style={{ padding: '10px' }}>Image</th>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Location</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px' }}>Company</th>
              <th style={{ padding: '10px' }}>Bio</th>
              <th style={{ padding: '10px' }}>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <SavedCandidate
                key={candidate.id}
                candidate={candidate}
                rejectCandidate={rejectCandidate}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been accepted yet.</p>
      )}
    </>
  );
};

export default SavedCandidates;
