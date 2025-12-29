import { useState } from "react";
import { createTicket } from "../services/tickets";
console.log("TicketForm component loaded");
export default function TicketForm({ onTicketCreated }) {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const Ticket = await createTicket(Title, Description);
            alert("Ticket criado com sucesso!");
            setTitle("");
            setDescription("");
            onTicketCreated(Ticket);
        } catch {
            alert("Falha ao criar ticket.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Título"
                value={Title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Descrição"
                value={Description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <button type="submit">Criar Ticket</button>
        </form>
    );
}
