import { useEffect, useState } from "react";
import {
  getTickets,
  deleteTicket,
  getTicketById,
  updateTicket
} from "../services/tickets";
console.log("TicketList component loaded");
export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "Open"
  });

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleView = async (id) => {
    try {
      const data = await getTicketById(id);
      setSelectedTicket(data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao obter ticket");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tens a certeza que queres apagar este ticket?")) return;

    try {
      await deleteTicket(id);
      setTickets(prev => prev.filter(t => t.id !== id));

      if (selectedTicket?.id === id) {
        setSelectedTicket(null);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao apagar ticket");
    }
  };

  const startEdit = () => {
    if (!selectedTicket) return;

    setEditData({
      title: selectedTicket.title,
      description: selectedTicket.description,
      status: selectedTicket.status
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updated = await updateTicket(selectedTicket.id, editData);

      setSelectedTicket(updated);
      setTickets(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      );

      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar ticket");
    }
  };

 
  return (
    <div>
      <h2>Tickets Criados</h2>

      <button onClick={fetchTickets} disabled={loading}>
        {loading ? "A atualizar..." : "Atualizar lista"}
      </button>

      {loading && <p>A carregar tickets...</p>}

      {!loading && tickets.length === 0 && <p>Sem tickets para mostrar.</p>}

      {!loading && tickets.length > 0 && (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <strong>{ticket.title}</strong>: {ticket.description} ({ticket.status})
              {" "}
              <button onClick={() => handleView(ticket.id)}>Ver</button>
              {" "}
              <button onClick={() => handleDelete(ticket.id)}>Apagar</button>
            </li>
          ))}
        </ul>
      )}

      {selectedTicket && (
        <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h3>Detalhe do Ticket #{selectedTicket.id}</h3>

          {!isEditing ? (
            <>
              <p><strong>Título:</strong> {selectedTicket.title}</p>
              <p><strong>Descrição:</strong> {selectedTicket.description}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>

              <button onClick={startEdit}>Editar</button>
              {" "}
              <button onClick={() => setSelectedTicket(null)}>Fechar</button>
            </>
          ) : (
            <>
              <input
                value={editData.title}
                onChange={e =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <textarea
                value={editData.description}
                onChange={e =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              <select
                value={editData.status}
                onChange={e =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option value="Open">Open</option>
                <option value="InProgress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>

              <br />

              <button onClick={handleSave}>Guardar</button>
              {" "}
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}