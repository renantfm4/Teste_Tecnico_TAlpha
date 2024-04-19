import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [createdProduct, setCreatedProduct] = useState(null); // Estado para armazenar o produto criado

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/products/create-product",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        stock: Number(productData.stock),
      },
    };

    try {
      const response = await axios(options);
      const responseBody = response.data;

      if (responseBody.success === true) {
        console.log("Produto registrado com sucesso");
        setCreatedProduct(responseBody.data); // Armazena o produto criado
      } else {
        console.log(responseBody.message);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpa o token de autenticação
    window.location.href = "/login"; // Redireciona para a página de login
  };

  const goToProductList = () => {
    window.location.href = "/listproducts"; // Redirecionar para a página de listagem de produtos
  };

  return (
    <div>
      <h2>Criar Produto</h2>
      <button onClick={handleLogout}>Deslogar</button> {/* Botão para deslogar o usuário */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Estoque:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Produto</button>
        {/* Adicione um botão para ir para a página de listagem de produtos */}
        <button onClick={goToProductList}>Ir para a Lista de Produtos</button>
      </form>

      {/* Exibe detalhes do produto criado, se existir */}
      {createdProduct && (
        <div>
          <h3>Detalhes do Produto Criado</h3>
          <p>Nome: {createdProduct.name}</p>
          <p>Descrição: {createdProduct.description}</p>
          <p>Preço: {createdProduct.price}</p>
          <p>Estoque: {createdProduct.stock}</p>
          {/* Adicione o link para editar o produto */}
          <Link to={`/editproduct/${createdProduct.id}`}>Editar Produto</Link>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
