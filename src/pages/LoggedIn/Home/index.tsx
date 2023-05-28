import { useAuth } from "../../../contexts/AuthProvider/useAuth";

function Home() {
  const auth = useAuth();
  const user = auth.getCurrentUser()?.user;

  function handleLogout() {
    auth.logout();
  }

  return (
    <>
      <h1>
        Você esta logado como:
      </h1>
      <h3>
        Nome: {user?.name} <br />
        E-mail: {user?.email} <br />
        Tipo: {user?.type} <br />
      </h3>
      <button onClick={handleLogout}>Deslogar!</button>
    </>
  )
}

export { Home };