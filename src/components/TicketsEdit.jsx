import { useEffect, useState } from "react";
import { getTicketById, updateTicket } from "../services/tickets";

console.log("TicketEdit component loaded");

export default function TicketEdit({ ticketId, onUpdated, onCancel }) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Status, setStatus] = useState("Open");

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await getTicketById(ticketId);
        setTitle(data.title ?? data.Title); // data do backend geralmente vem com minúscula
        setDescription(data.description ?? data.Description);
        setStatus(data.status ?? data.Status);
      } catch (err) {
        console.error("Erro ao carregar ticket:", err);
        alert("Não foi possível carregar o ticket");
      }
    };
    loadTicket();
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // envia o Id junto do payload, conforme exige o backend
      await updateTicket(ticketId, {
        Id: ticketId,
        Title: Title,
        Description: Description,
        Status: Status
      });
      alert("Ticket atualizado com sucesso!");
      onUpdated();
    } catch (err) {
      console.error("Erro ao atualizar:", err.response?.data || err);
      alert("Erro ao atualizar ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Ticket #{ticketId}</h3>

      <input
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      <textarea
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />

      <select value={Status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Open">Open</option>
        <option value="InProgress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

      <br />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
