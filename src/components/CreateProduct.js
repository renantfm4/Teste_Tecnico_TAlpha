import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CreateProduct.module.css";

const CreateProduct = () => {
  // Define o estado para armazenar os dados do novo produto
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  // Estado para armazenar o produto criado
  const [createdProduct, setCreatedProduct] = useState(null);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Opções para a requisição POST
    const requestOptions = {
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
      // Realiza a requisição
      const response = await axios(requestOptions);
      const responseBody = response.data;

      // Verifica se a requisição foi bem-sucedida
      if (responseBody.success === true) {
        console.log("Produto registrado com sucesso");
        // Armazena o produto criado
        setCreatedProduct(responseBody.data);
      } else {
        console.log(responseBody.message);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  // Função para atualizar os dados do produto ao modificar os campos do formulário
  const updateUserData = (e) => {
    const { name, value } = e.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  // Função para deslogar o usuário
  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpa o token de autenticação
    window.location.href = "/login"; // Redireciona para a página de login
  };

  // Função para redirecionar para a página de listagem de produtos
  const goToProductList = () => {
    window.location.href = "/listproducts";
  };

  return (
    <div className={styles.createProductContainer}>
      <h1 className={styles.createProductTitle}>Criar Produto</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>Deslogar</button>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text" id="name" name="name" value={productData.name} onChange={updateUserData} required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={updateUserData}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={updateUserData}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stock">Estoque:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={updateUserData}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Criar Produto</button>
        <button onClick={goToProductList} className={styles.goToListButton}>Ir para a Lista de Produtos</button>
      </form>

      {createdProduct && (
        <div className={styles.productDetails}>
          <h3>Detalhes do Produto Criado</h3>
          <p>Nome: {createdProduct.name}</p>
          <p>Descrição: {createdProduct.description}</p>
          <p>Preço: {createdProduct.price}</p>
          <p>Estoque: {createdProduct.stock}</p>
          <Link to={`/editproduct/${createdProduct.id}`} className={styles.editProductLink}>Editar Produto</Link>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
