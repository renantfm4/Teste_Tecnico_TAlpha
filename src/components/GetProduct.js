import React, { useState, useEffect } from "react";
import axios from "axios";

const GetProduct = () => {
  // Extrai o productId da URL
  const productId = window.location.pathname.split("/").pop();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar os detalhes do produto
    const fetchData = async () => {
      try {
        // Obtém o token do localStorage
        const token = localStorage.getItem("token");
        // Opções para a requisição GET dos detalhes do produto
        const requestOptions = {
          method: "GET",
          url: `https://interview.t-alpha.com.br/api/products/get-one-product/${productId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // Faz a requisição GET dos detalhes do produto
        const response = await axios.request(requestOptions);
        // Verifica se a requisição foi bem-sucedida
        if (response.data.success) {
          // Define os detalhes do produto no estado
          setProduct(response.data.data);
        } else {
          console.error("Erro ao obter produto:", response.data.message);
        }
      } catch (error) {
        console.error("Erro ao obter produto:", error);
      }
    };

    // Chama a função para buscar os detalhes do produto quando o productId mudar
    fetchData();
  }, [productId]); // Dispara o efeito sempre que o productId mudar

  return (
    <div>
      {product ? (
        // Se o produto existir, exibe seus detalhes
        <div>
          <h2>Detalhes do Produto</h2>
          <p>
            <strong>Nome:</strong> {product.name}
          </p>
          <p>
            <strong>Descrição:</strong> {product.description}
          </p>
          <p>
            <strong>Preço:</strong> R$ {product.price}
          </p>
          <p>
            <strong>Estoque:</strong> {product.stock}
          </p>
        </div>
      ) : (
        // Se o produto ainda não foi carregado, exibe uma mensagem de espera
        <p>Aguarde</p>
      )}
    </div>
  );
};

export default GetProduct;
