import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  // Estado para controlar o carregamento do produto
  const [loading, setLoading] = useState(true);
  // Estado para armazenar os detalhes do produto
  const [product, setProduct] = useState(null);
  // Obter o pathname da localização
  const location = useLocation();
  // Extrair o ID do produto do pathname
  const productId = location.pathname.split("/").pop();

  // Efeito para buscar os detalhes do produto quando o componente for montado ou quando o ID do produto mudar
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Obtém o token armazenado no localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          // Se não houver token, exibe uma mensagem de erro e retorna
          console.error("Token not found. Redirect to login page.");
          setLoading(false);
          return;
        }

        // Configurações para a requisição GET do produto específico
        const response = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Define o estado de carregamento como falso
        setLoading(false);
        // Verifica se a requisição foi bem-sucedida e atualiza o estado do produto
        setProduct(response.data.success ? response.data.data : null);
        // Em caso de erro na requisição, exibe uma mensagem de erro
        if (!response.data.success) {
          console.error("Error fetching product details:", response.data.message);
        }
      } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro e define o estado de carregamento como falso
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    // Chama a função para buscar os detalhes do produto
    fetchProduct();
  }, [productId]);

  // Se o produto estiver carregando, exibe uma mensagem de espera
  if (loading) {
    return <div>Aguarde...</div>;
  }

  // Se o produto não existir, exibe uma mensagem de erro
  if (!product) {
    return <div>Error: Produto não encontrado</div>;
  }

  // Se o produto existir, exibe os detalhes do produto
  return (
    <div className={styles.productDetailContainer}>
      <h2 className={styles.productName}>{product.name}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>Preço: ${product.price}</p>
      <p className={styles.productStock}>Estoque: {product.stock}</p>
      {/* Link para voltar para a lista de produtos */}
      <Link to="/listproducts" className={styles.backButton}>Voltar para lista de produtos</Link>
    </div>
  );
};

export default ProductDetail;
