'use client'
//import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { red, pink } from '@mui/material/colors';
import { CustomNavBar } from '../components/navbar';
 
function Home() {
  return (
      <Box sx={{ 
          flexGrow: 1, 
          height: '100%',
          width: '100%', 
        }}>
        <CustomNavBar/>
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            sx={{backgroundColor: pink[200]}}
        >
          <Grid item xs={12}>
              <button>Hola</button>
          </Grid>
          <Grid item md={12}>
              <button>Como Te Llamas</button>
          </Grid>
          <Grid item xs={12}>
              <button>Espero que esto funcione</button>
          </Grid>
        </Grid>
      </Box>
  );
}

export default Home;