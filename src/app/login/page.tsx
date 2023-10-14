"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "../../../types/database.types";
import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { user } = Auth.useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: username,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.push("/");
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    router.push("/");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  if (user)
    return (
      <button
        className="bg-gr-green hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSignOut}
      >
        Log Out
      </button>
    );

  const handleInputChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      setFunction(event.target.value);
  };
  

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gr-gray text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gr-gray leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleInputChange(setUsername)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gr-gray text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gr-gray mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gr-green hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="bg-gr-green hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="bg-gr-green hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
}
