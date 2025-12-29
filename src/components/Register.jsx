import { useState } from "react";
import { register } from "../services/auth";
console.log("Register component loaded");
export default function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(username, password);
      setSuccess("Utilizador registado com sucesso!");
      setUsername("");
      setPassword("");
      setTimeout(() => onRegisterSuccess(), 1000);
    } catch (err) {
      setError(err.response?.data || "Erro ao registar utilizador");
    }
  };

  return (
    <div>
      <h2>Registar</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Registar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
