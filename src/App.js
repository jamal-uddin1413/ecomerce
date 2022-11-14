import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetails from './Component/ProductDetails/ProductDetails';
import PageNotFound from './Component/PageNotFound/PageNotFound';
import Review from './Component/Review/Review';
import Login from './Component/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import Shipment from './Component/Shipment/Shipment';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const userContext = createContext()
function App() {
  const [LoggedInUser, setLoggedInUser] = useState({});
  // console.log(LoggedInUser)
  return (
    <div className="App">
      <userContext.Provider value={[LoggedInUser, setLoggedInUser]}>
        <p>Email: {LoggedInUser.email}</p>
        <Router>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/review' element={<Review />} />
            <Route path='/product/:productKey' element={<ProductDetails />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shipment/*' element={<PrivateRoute><Shipment/></PrivateRoute>} />
          </Routes>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
