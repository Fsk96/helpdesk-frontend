# 🖥️ HelpDesk Frontend

Frontend da aplicação HelpDesk desenvolvido em **React**, que consome a API em ASP.NET Core.  
Permite autenticação e gestão completa de tickets.

## 🚀 Funcionalidades

- Login e registo de utilizadores
- Armazenamento de JWT no localStorage
- Criação de tickets
- Listagem de tickets
- Visualização por ID
- Edição de tickets
- Apagar tickets
- Proteção de rotas (PrivateRoute)
- Logout

## 🧰 Tecnologias

- React
- Vite
- Axios
- JavaScript (ES6+)
- CSS

## 📦 Pré-requisitos

- Node.js (>= 18)
- npm
- Git

## ⚙️ Configuração

1. Clonar o repositório:


git clone https://github.com/Fsk96/helpdesk-frontend.git
cd helpdesk-frontend

2. Instalar dependências:

npm install

3. Iniciar o projeto:

npm run dev

🔐 Autenticação

Após login:

O token JWT é guardado no localStorage

Enviado automaticamente nos pedidos protegidos

🧪 Utilização

Registar utilizador

Fazer login

Criar e gerir tickets

Editar ou apagar tickets

Logout

⚠️ Notas

Projeto de demonstração/portfólio

Configurações usam localhost e ambiente de desenvolvimento

🗄️ Backend

API usada por este frontend:
👉 https://github.com/Fsk96/helpdeskapi

👤 Autor

João Fonseca
Projeto de portfólio para demonstração de competências em desenvolvimento frontend com React.
