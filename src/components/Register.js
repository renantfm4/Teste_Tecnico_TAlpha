import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Importe o Link
import "./Register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    taxNumber: "",
    mail: "",
    phone: "",
    password: "",
  });

  const [registered, setRegistered] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.request(registerOptions(userData));
      const responseBody = response.data;

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

  const updateUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

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

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <button type="submit">Cadastrar</button>
      </form>
      {/* Botão para redirecionar para a página de login se já tiver uma conta */}
      <Link to="/login">
        <button>Já tenho uma conta. Ir para o Login</button>
      </Link>
    </div>
  );
};

export default Register;
