import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { pink } from '@mui/material/colors';
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export function CustomNavBar() {
    return (
        <Grid 
          container
          sx={{flexWrap: 'nowrap', height: '50px', backgroundColor: pink[100] }}
        >
          <Grid item xs={3}>
            <h1>Tiktok Buttons</h1>
          </Grid>
          <Grid item xs={8}>
            <Button>Nav Button</Button>
            <Button>Nav Button</Button>
            <Button>Nav Button</Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => signIn("google")} variant="contained">Login</Button>
            <Button onClick={() => signOut()}>Sign out</Button>
          </Grid>
        </Grid>
    );
}