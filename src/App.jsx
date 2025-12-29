import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login";
import Register from "./components/Register";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./services/auth";


console.log("Render App - loggedIn:");

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp && decoded.exp > now;
  } catch {
    return false;
  }
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isTokenValid());
  const [ticketsUpdated, setTicketsUpdated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  const handleTicketCreated = () => {
    setTicketsUpdated(prev => !prev);
  };

  return (
    <div>
      <h1>HelpDesk Frontend</h1>

      {!loggedIn && !showRegister && (
        <>
          <Login onLoginSuccess={() => setLoggedIn(true)} />
          <p>
            Ainda não tens conta?{" "}
            <button onClick={() => setShowRegister(true)}>
              Registar
            </button>
          </p>
        </>
      )}

      {!loggedIn && showRegister && (
        <>
          <Register onRegisterSuccess={() => setShowRegister(false)} />
          <p>
            Já tens conta?{" "}
            <button onClick={() => setShowRegister(false)}>
              Voltar ao login
            </button>
          </p>
        </>
      )}

      <PrivateRoute loggedIn={loggedIn}>
        <button onClick={handleLogout}>Logout</button>
        <TicketForm onTicketCreated={handleTicketCreated} />
        <TicketList key={ticketsUpdated} />
      </PrivateRoute>
    </div>
  );
}
