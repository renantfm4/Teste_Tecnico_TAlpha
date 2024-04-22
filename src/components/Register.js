import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    name: "",
    taxNumber: "",
    mail: "",
    phone: "",
    password: "",
  });

  // Estado para controlar o registro bem-sucedido
  const [registered, setRegistered] = useState(false);

  // Função para registrar o usuário
  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.request(registerOptions(userData));
      const responseBody = response.data;

      // Verifica se o registro foi bem-sucedido
      if (responseBody.success === true) {
        console.log("Registro feito com sucesso");
        setRegistered(true);
      } else {
        console.log(responseBody.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Função para atualizar os dados do usuário
  const updateUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Função para configurar as opções da requisição de registro
  const registerOptions = (userData) => {
    return {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/auth/register",
      headers: { "Content-Type": "application/json" },
      data: {
        name: userData.name,
        taxNumber: userData.taxNumber,
        mail: userData.mail,
        phone: userData.phone,
        password: userData.password,
      },
    };
  };

  // Se o registro for bem-sucedido, redireciona para a página de login
  if (registered) {
    return <Navigate to="/login" />;
  }

  // Renderiza o formulário de registro
  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Registra-se</h1>
      <form className={styles.registerForm} onSubmit={registerUser}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={updateUserData}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="taxNumber">CPF ou CNPJ:</label>
          <input
            type="text"
            id="taxNumber"
            name="taxNumber"
            value={userData.taxNumber}
            onChange={updateUserData}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mail">E-mail:</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={userData.mail}
            onChange={updateUserData}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={updateUserData}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={updateUserData}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Cadastrar</button>
      </form>
      {/* Botão para redirecionar para a página de login se já tiver uma conta */}
      <Link to="/login" className={styles.loginLink}>
        Já tenho uma conta. Ir para o Login
      </Link>
    </div>
  );
};

export default Register;
