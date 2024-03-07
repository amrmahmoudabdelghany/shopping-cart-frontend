import './App.css';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom' ; 
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
         
         <BrowserRouter> 
         
            <Routes> 
              <Route path = "/" element={<Layout/>}> 
                <Route index element = {<Home/>} />
                <Route path="cart" element = {<Cart/>} />
                <Route path="*" element={<PageNotFound/>} />
              </Route>
            </Routes>

         </BrowserRouter>

    </div>
  );
}

export default App;
