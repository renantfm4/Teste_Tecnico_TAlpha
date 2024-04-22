import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

const ProductList = () => {
  // Estado para verificar se o usuário está autenticado
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  // Estado para armazenar a lista de produtos
  const [productsList, setProductsList] = useState([]);

  // Efeito para carregar a lista de produtos quando o componente for montado
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtém o token armazenado no localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          // Se não houver token, define o usuário como não autenticado e retorna
          setUserAuthenticated(false);
          return;
        }

        // Opções para a requisição GET dos produtos
        const requestOptions = {
          method: "GET",
          url: "https://interview.t-alpha.com.br/api/products/get-all-products",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // Faz a requisição GET dos produtos
        const response = await axios.request(requestOptions);
        if (response.data.success) {
          // Se a requisição for bem-sucedida, define o usuário como autenticado e atualiza a lista de produtos
          setUserAuthenticated(true);
          setProductsList(response.data.data);
        } else {
          // Se houver um erro na requisição, define o usuário como não autenticado e exibe uma mensagem de erro
          setUserAuthenticated(false);
          console.error("Error fetching product list:", response.data.message);
        }
      } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro
        console.error("Error fetching product list:", error);
      }
    };

    // Chama a função para carregar os produtos
    fetchProducts();
  }, []);

  // Função para lidar com a exclusão de um produto
  const handleDeleteProduct = async (productId) => {
    try {
      // Obtém o token armazenado no localStorage
      const token = localStorage.getItem("token");
      // Opções para a requisição DELETE do produto específico
      const requestOptions = {
        method: "DELETE",
        url: `https://interview.t-alpha.com.br/api/products/delete-product/${productId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Faz a requisição DELETE do produto
      const response = await axios.request(requestOptions);
      if (response.data.success) {
        // Se a requisição for bem-sucedida, remove o produto da lista de produtos
        setProductsList(productsList.filter((product) => product.id !== productId));
        console.log("Product deleted successfully!");
      } else {
        // Se houver um erro na requisição, exibe uma mensagem de erro
        console.error("Error deleting product:", response.data.message);
      }
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de erro
      console.error("Error deleting product:", error);
    }
  };

  // Se o usuário não estiver autenticado, exibe uma mensagem de solicitação de login
  if (!userAuthenticated) {
    return (
      <div>
        <p>Por favor, faça login para acessar esta página.</p>
      </div>
    );
  }

  // Se o usuário estiver autenticado, exibe a lista de produtos
  return (
    <div className={styles.productListContainer}>
      <h1 className={styles.productListTitle}>Lista de Produtos</h1>
      <div>
        {productsList.map((product) => (
          <div key={product.id} className={styles.productListItem}>
            <div>
              <Link to={`/product/${product.id}`} className={`${styles.productLink} ${styles.productNameLink}`}>
                <strong>{product.name}</strong>
              </Link>
            </div>
            <div className={styles.productDescription}>{product.description}</div>
            <div className={styles.productPrice}>$ {product.price}</div>
            <div className={styles.productStock}>Estoque: {product.stock}</div>
            <div className={styles.productActions}>
              <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
              <Link to={`/editproduct/${product.id}`}>
                <button className={styles.productButton}>Editar</button>
              </Link>
            </div>
          </div>
          
        ))}
        <Link to="/createproduct">
        <button className={styles.createProductButton}>Voltar para página de criação de produtos</button>
      </Link>
      </div>
    </div>
  );
};

export default ProductList;
