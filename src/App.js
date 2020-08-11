import React, { useState, useEffect } from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Login'
import Shop from './Components/Shop'
import Product from './Components/Product'
import Cart from './Components/Cart'
import UserContext from './Components/UserContext'
import PrivateRoute from './config/PrivateRoute'
import * as firebaseAuth from './config/FirebaseAuth'
import firebase from './config/Firebase'


function App() {
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const updation = async () => {
      const verificationResult = await firebaseAuth.verifySecuredToken(token);

      if (verificationResult !== null) {
        setUser({
          name: verificationResult.name,
          email: verificationResult.email,
          uid: verificationResult.uid
        });
      }
    }
    if (token) {
      updation();
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])




  if (Loading) return <p>loading</p>

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ User, setUser }}>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/shop" component={Shop} exact />
            <PrivateRoute path="/shop/:pid" component={Product} exact />
            <PrivateRoute path="/cart" component={Cart} exact />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
