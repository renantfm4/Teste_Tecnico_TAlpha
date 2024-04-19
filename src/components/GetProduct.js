import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetProduct = () => {
  const productId = useParams().id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const options = {
          method: "GET",
          url: `https://interview.t-alpha.com.br/api/products/get-one-product/${productId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.request(options);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          console.error("Erro ao obter produto:", response.data.message);
        }
      } catch (error) {
        console.error("Erro ao obter produto:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div>
      {product ? (
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
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default GetProduct;
