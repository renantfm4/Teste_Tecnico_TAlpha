import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail"; // Importe o componente de detalhes do produto

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/listproducts" element={<ProductList />} />
        <Route path="/editproduct/:productId" element={<EditProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
