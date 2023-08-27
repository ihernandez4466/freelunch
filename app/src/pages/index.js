'use client'
import Button from '@mui/material/Button';
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
 
function Home() {
  return (
    <div className="App">
        <h1>
          Free Lunch Co
        </h1>
        <Button onClick={() => signIn("google")} variant="contained">Login</Button>
        <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}

export default Home;
