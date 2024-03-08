import './App.css'; 
import "react-toastify/dist/ReactToastify.css" ; 
import {BrowserRouter, Route, Routes} from 'react-router-dom' ; 
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import PageNotFound from './components/PageNotFound';
import {ToastContainer} from "react-toastify" ; 

function App() {
  return (
    <div className="App">
         
         <BrowserRouter> 
         <ToastContainer/>
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
