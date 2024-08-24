import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProoductList from "./components/ProoductList";
import UpdateProduct from "./components/UpdateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1><ProoductList/></h1>} />
            <Route path="/add" element={<h1><AddProduct/></h1>} />
            <Route path="/update/:id"element={<h1><UpdateProduct/></h1>}/>
            <Route path="/logout" element={<h1> logout product</h1>} />
            <Route path="/profile" element={<h1> profileProduct Components</h1>}/>
          </Route>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Login"element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
export default App;
