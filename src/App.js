import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Order from './pages/Order';
import Product from './pages/Product';
import About from './pages/About';
import SidePanel from './components/SidePanel';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<SidePanel />} >
                <Route index element={<Dashboard />} />
                <Route path="about" element={<About />} />
                <Route path="order" element={<Order />} />
                <Route path="product" element={<Product />} />
                <Route path="customer" element={<Customer/>}/>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
