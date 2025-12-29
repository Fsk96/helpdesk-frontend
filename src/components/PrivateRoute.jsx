

export default function PrivateRoute({ children, loggedIn }) {
    if (!loggedIn) {
        return <p>⚠️ Acesso negado. Faça login primeiro.</p>;
    }
    return <>{children}</>;
}
