import { useState, useEffect } from "react";
import api from "../api/api";

console.log("Login component loaded");

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const testToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token length:", token?.length);

      if (!token) return;

      try {
        const response = await api.get("/Auth/test-token");
        console.log("Token is valid. Backend decoded:", response.data);
        onLoginSuccess(); // se já for válido, entra direto
      } catch (err) {
        console.error(
          "Token failed validation:",
          err.response?.status,
          err.response?.data
        );
        localStorage.removeItem("token"); // limpa token inválido
      }
    };

    testToken();
  }, [onLoginSuccess]); // 👈 corre só ao montar

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Auth/login", { username, password });
      const token = response.data.token;

      localStorage.setItem("token", token);
      console.log("New token length:", token.length);

      alert("Login bem-sucedido!");
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert("Falha no login. Verifica as credenciais.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
