const SavedCandidates: React.FC<SavedCandidatesProps> = ({ savedCandidates }) => {
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