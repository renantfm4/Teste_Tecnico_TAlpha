import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./EditProduct.module.css";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
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
        setIsUpdated(false);
      } catch (error) {
        console.error(error);
      }
    };

    getProductData();
  }, [isUpdated]);

  const handleEditProduct = async (e) => {
    e.preventDefault();
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
        setIsUpdated(true);
      } else {
        console.error("Falha ao atualizar o produto:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  const updateUserData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.editProductContainer}>
      <h1 className={styles.editProductTitle}>Editar Produto</h1>
      <div className={styles.productDetailsContainer}>
        <h3 className={styles.productDetailsTitle}>Detalhes do Produto</h3>
        {productData.name && (
          <div className={styles.productDetails}>
            <p><strong>Nome:</strong> {productData.name}</p>
            <p><strong>Descrição:</strong> {productData.description}</p>
            <p><strong>Preço:</strong> {productData.price}</p>
            <p><strong>Estoque:</strong> {productData.stock}</p>
          </div>
        )}
      </div>
      <form className={styles.productForm} onSubmit={handleEditProduct}>
        <div className={styles.formGroup}>
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
        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
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
            value={formData.price}
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
            value={formData.stock}
            onChange={updateUserData}
            required
          />
        </div>
        <button className={styles.saveButton} type="submit">Salvar Alterações</button>
      </form>
      <Link to="/listproducts" className={styles.backButton}>
        <button>Voltar para Lista de Produtos</button>
      </Link>
    </div>
  );
};

export default EditProduct;
