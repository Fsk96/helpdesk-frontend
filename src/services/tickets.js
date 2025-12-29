import api from '../api/api';

export const createTicket = async (Title, Description, Status = 'Open') => {
    const response = await api.post('/Tickets', { Title, Description, Status });
    return response.data;
};

export const getTickets = async () => {
    const response = await api.get('/Tickets');
    return response.data;
};
export const getTicketById = async (id) => {
    const response = await api.get(`/Tickets/${id}`);
    return response.data;
};

export const updateTicket = async (id, updates) => {
    const response = await api.put(`/Tickets/${id}`, updates);
    return response.data;
};
export const deleteTicket = async (id) => {
    const response = await api.delete(`/Tickets/${id}`);
    return response.data;
}