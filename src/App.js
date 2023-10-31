import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Order from './pages/Order';
import Product from './pages/Product';
import About from './pages/About';
import SidePanel from './components/SidePanel';
import CustomerEdit from './pages/CustomerEdit';
import { useState } from 'react';

function App() {
  const [editingItem,setEditingItem]=useState();
  const [toggle,setToggle]=useState(true)
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<SidePanel setToggle={setToggle} toggle={toggle} />} >
                  <Route index element={<Dashboard />} />
                  <Route path="about" element={<About />} />
                  <Route path="order" element={<Order />} />
                  <Route path="product" element={<Product />} />
                  <Route path="customer" element={<Customer editingItem={editingItem} setEditingItem={setEditingItem} setToggle={setToggle} toggle={toggle} />}/>
                  <Route path="customer-edit" element={<CustomerEdit editingItem={editingItem} setEditingItem={setEditingItem} />}/>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
