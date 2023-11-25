
import './App.css';
import Login from './screens/Login';
import Main from './screens/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// eslint-disable-next-line
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
           <Route exact path="/" element={<Main/>}></Route>
           <Route exact path="/Signup" element={<Signup/>}></Route>
           <Route exact path="/Login" element={<Login/>}></Route>
           <Route exact path="/myOrder" element={<MyOrder/>}></Route>

           

        </Routes>

      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

