import './App.css';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Item from './views/Item';
import Users from './views/Users';
import ItemDetail from './views/ItemDetail';
import ItemEdit from './views/itemEdit.';
import {LogInPage} from './views/auth/Login';
import {SignUpPage} from './views/auth/Signup';
import {PrivateRoute} from './views/auth/PrivateRouts';
import acutionCreate from './views/auction'


function App() {

  return (
    <div className='App'>
      <Router>
        <h1>Blogg</h1>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/Item/'>Hem</Link>
            </Typography>
            <Button color='inherit'>
              <Link to='/Item/'>Visa alla inlägg</Link>
            </Button>
            <Button color='inherit'>
              <Link to='/item/new'>Skapa inlägg</Link>
            </Button>
            <Button color='inherit'>
              <Link to='/login/'>Log In</Link>
            </Button>
            <Button color='inherit'>
              <Link to='/signup/'>Sig Up</Link>
            </Button>
            
          </Toolbar>
        </AppBar>

        <Box
      // sx={{
      //   maxWidth: "85rem",
      //   margin:"0 auto",
      //   height: 300,
      //   backgroundColor: 'primary.dark',
    
      // }}
    >
          <Switch>
            <Route exact path='/item/' component={Item} />
            <PrivateRoute exact path='/item/new/' component={ItemEdit} />
            <PrivateRoute exact path='/item/:id' component={ItemDetail} />
            <PrivateRoute exact path='/item/:id/auction' component={acutionCreate} />
            {/* <Route exact path='/item/delet/:id' component={ItemEdit} /> */}
            <PrivateRoute exact path='/item/:id/edit' component={ItemEdit} />
            <PrivateRoute exact path='/users/' component={Users} />
            <Route exact path='/login/' component={LogInPage} />
            <Route exact path='/signup/' component={SignUpPage} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;
