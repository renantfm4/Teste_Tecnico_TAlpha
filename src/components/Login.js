import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  // Estado para armazenar os dados de login
  const [loginData, setLoginData] = useState({
    taxNumber: "",
    password: "",
  });

  // Estado para controlar se o usuário está logado
  const [loggedIn, setLoggedIn] = useState(false);

  // Função para lidar com o login do usuário
  const loginUser = async (e) => {
    e.preventDefault();

    // Opções para a requisição de login
    const loginOptions = {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/auth/login",
      headers: { "Content-Type": "application/json" },
      data: {
        taxNumber: loginData.taxNumber,
        password: loginData.password,
      },
    };

    try {
      // Realiza a requisição de login
      const response = await axios(loginOptions);
      const responseBody = response.data;

      // Verifica se o login foi bem-sucedido
      if (responseBody.success === true) {
        console.log("Login feito com sucesso");
        // Salva o token de autenticação
        const token = responseBody.data.token;
        saveToken(token);
        // Atualiza o estado para indicar que o usuário está logado
        setLoggedIn(true);
      } else {
        console.log(responseBody.message);
      }
    } catch (error) {
      console.log("Ocorreu um erro:", error);
    }
  };

  // Função para salvar o token de autenticação no localStorage
  const saveToken = (token) => {
    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
  };

  // Função para atualizar os dados de login conforme o usuário digita
  const updateUserData = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  // Se o usuário estiver logado, redireciona para a página de criação de produto
  if (loggedIn) {
    return <Navigate to="/createproduct" />;
  }

  // Renderiza o formulário de login
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={loginUser}>
        <div className="form-group">
          <label htmlFor="taxNumber">CPF ou CNPJ:</label>
          <input
            type="text"
            id="taxNumber"
            name="taxNumber"
            value={loginData.taxNumber}
            onChange={updateUserData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={updateUserData}
            required
          />
        </div>
        <button type="submit">Entrar</button>
        <p className="register-link">
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
