import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /**
     * GitHub usernames may only contain alphanumeric characters or hyphens.
     * GitHub usernames cannot have multiple consecutive hyphens.
     * GitHub usernames cannot begin or end with a hyphen.
     * GitHub usernames must be between 1 and 39 characters long.
     */
    const regex = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;

    if (!regex.test(username)) {
      setError("Invalid GitHub username");
    } else {
      setError("");
      navigate(`/${username}`)
    }
  }, [navigate, username]);

  return (
    <div className="h-dvh max-w-lg mx-auto flex flex-col justify-center p-4">
      <div className="h-full md:h-fit flex flex-col justify-between">
        <h1 className="font-bold text-4xl text-balance text-center pb-5">Input GitHub username to see resume</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 p-4 border border-gray-400 rounded shadow-lg">
          <label className="flex flex-col gap-2 font-bold text-xl md:text-2xl">
            <span>Username</span>

            <input 
              type="text" 
              placeholder="john-doe" 
              className="border-gray-400 border rounded shadow-md p-2" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />

            {error && <p className="text-red-500">{error}</p>}
          </label>

          <button className="p-3 bg-blue-500 font-bold text-base md:text-lg rounded transition-colors hover:bg-blue-700 text-white">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
