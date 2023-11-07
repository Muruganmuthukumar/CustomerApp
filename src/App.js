import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Order from './pages/Order';
import Product from './pages/Product';
import About from './pages/About';
import SidePanel from './components/SidePanel';
import CustomerEdit from './pages/CustomerEdit';
import ProductEdit from './pages/ProductEdit';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useState } from 'react';

function App() {
  const [toggle,setToggle]=useState(true)
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<SidePanel setToggle={setToggle} toggle={toggle} />} >
                  <Route index element={<Dashboard />} />
                  <Route path="about" element={<About />} />
                  <Route path="order" element={<Order />} />
                  <Route path="product" element={<Product toggle={toggle} />} />
                  <Route path="customer" element={<Customer setToggle={setToggle} toggle={toggle} />}/>
                  <Route path="customer-edit" element={<CustomerEdit toggle={toggle} />}/>
                  <Route path={'product-edit'} element={<ProductEdit toggle={toggle} /> }/>
              </Route>
              <Route path={"sign-up"} element={<SignUp/>} />
              <Route path={"sign-in"} element={<SignIn/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
