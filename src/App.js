import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/CreateProduct";
import GetProduct from "./components/GetProduct";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/listproducts" element={<ProductList />} />
          <Route path="/products/:id" element={<GetProduct />} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
