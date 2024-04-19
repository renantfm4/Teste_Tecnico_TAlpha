import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";

// Definindo o componente EditProduct
const EditProduct = () => {
  // Definindo estados para os dados do produto e do formulário
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  // Estado para armazenar as alterações do formulário
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  // Estado para controlar o estado de atualização
  const [isUpdated, setIsUpdated] = useState(false);

  // Efeito para carregar os dados do produto
  useEffect(() => {
    // Obtendo o productId da URL
    const productId = window.location.pathname.split("/").pop();
    // Função para obter os dados do produto
    const getProductData = async () => {
      try {
        const token = localStorage.getItem("token");
        const requestOptions = {
          method: "GET",
          url: `https://interview.t-alpha.com.br/api/products/get-one-product/${productId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios(requestOptions);
        setProductData(response.data.data);
        setFormData(response.data.data);
        setIsUpdated(false); // Redefine o estado de atualização
      } catch (error) {
        console.error(error);
      }
    };

    getProductData();
  }, [isUpdated]); // Apenas isUpdated é uma dependência, já que productId é extraído da URL diretamente

  // Função para lidar com a edição do produto
  const handleEditProduct = async (e) => {
    e.preventDefault();
    // Obtendo o productId da URL
    const productId = window.location.pathname.split("/").pop();
    try {
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "PATCH",
        url: `https://interview.t-alpha.com.br/api/products/update-product/${productId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios(requestOptions);
      if (response.data.success) {
        console.log("Produto atualizado com sucesso!");
        setIsUpdated(true); // Define o estado de atualização como true após a edição bem-sucedida
      } else {
        console.error("Falha ao atualizar o produto:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  // Função para atualizar os dados do formulário
  const updateUserData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Renderização do componente
  return (
    <div>
      <h1>Editar Produto</h1>
      <div>
        <h3>Detalhes do Produto</h3>
        {productData.name && (
          <div>
            <p><strong>Nome:</strong> {productData.name}</p>
            <p><strong>Descrição:</strong> {productData.description}</p>
            <p><strong>Preço:</strong> {productData.price}</p>
            <p><strong>Estoque:</strong> {productData.stock}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleEditProduct}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={updateUserData}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={updateUserData}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={updateUserData}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Estoque:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={updateUserData}
            required
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
      {/*Botão de volta para a lista de produtos */}
      <Link to="/listproducts">
        <button>Voltar para Lista de Produtos</button>
      </Link>
    </div>
  );
};

export default EditProduct;
