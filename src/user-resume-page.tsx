import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

interface User {
  avatar_url: string;
  name: string;
  public_repos: number;
  created_at: string;
}

interface Repo {
  name: string;
  html_url: string;
  updated_at: string;
  language: string;
}

function UserResumePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>('null');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await octokit.users.getByUsername({ username: username! });

        // setUser(userData as User);

        const { data: reposData } = await octokit.repos.listForUser({
          username: username!,
          sort: "updated",
        });

        setRepos(reposData as Repo[]);

        const languageCounts: { [key: string]: number } = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          }
        });

        setLanguages(languageCounts);
      } catch (error) {
        setError("User not found");
      }
    };

    fetchData();
  }, [username]);

  if (error) {
    return (
      <div className="h-dvh max-w-lg mx-auto flex flex-col items-center justify-center text-center p-4 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-red-500">{error}</p>
        <Link to='/' className="text-blue-500 hover:underline mt-4">Go to home page</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-dvh max-w-lg mx-auto flex flex-col items-center justify-center text-center p-4 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Loading...</h1>
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  const totalRepos = Object.values(languages).reduce((acc, count) => acc + count, 0);
  const languagePercentages = Object.entries(languages).map(([language, count]) => ({
    language,
    percentage: ((count / totalRepos) * 100).toFixed(2),
  }));

  return (
    <div className="min-h-dvh max-w-5xl mx-auto px-4">
      <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-balance">User Resume for {username}</h1>

        <div className="w-full mb-6 p-4 border-b border-gray-300">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Personal Information</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <img src={user.avatar_url} className="rounded h-20 w-20" alt={`${username} avatar`} />

            <div className="flex flex-col gap-1">
              <p><strong>Name:</strong> {user.name || 'No name provided'}</p>

              <p><strong>Public Repositories:</strong> {user.public_repos}</p>

              <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="w-full mb-6 p-4 border-b border-gray-300">
          <h2 className="text-xl md:text-2xl font-semibold">Languages Used</h2>

          <ul className="mt-2">
            {languagePercentages.map(({ language, percentage }) => (
              <li key={language} className="mt-1"><strong>{language}:</strong> {percentage}%</li>
            ))}
          </ul>
        </div>

        <div className="w-full p-4">
          <h2 className="text-xl md:text-2xl font-semibold">Recent Repositories</h2>

          <ul className="mt-2 divide-y divide-gray-300 flex flex-col">
            {repos.map((repo) => (
              <li key={repo.name} className="flex items-center justify-between text-sm sm:text-base">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="py-3 px-2 max-w-full whitespace-nowrap transition-colors flex-1 flex flex-col sm:flex-row justify-between hover:bg-slate-100">
                  <span className="text-blue-500 hover:underline truncate">
                    {repo.name}
                  </span>

                  (Updated: {new Date(repo.updated_at).toLocaleDateString()})
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserResumePage;
