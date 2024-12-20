// TODO: Create an interface for the Candidate objects returned by the API

interface Candidate {
    login: string; // The username of the GitHub user
    avatar_url: string; // URL to the user's avatar
    location?: string; // User's location (optional)
    email?: string; // User's email (optional)
    company?: string; // User's company (optional)
    html_url: string; // URL to the user's GitHub profile
  }
  