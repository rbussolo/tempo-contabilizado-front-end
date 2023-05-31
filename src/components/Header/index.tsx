import logo from './../../assets/images/logo.png';
import { useAuth } from "../../contexts/AuthProvider/useAuth";
import { Navbar, NavbarBrand, Nav } from "react-bootstrap";
import { Logo, NavbarContainer, NavItemContainer } from './styles';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

interface NavItemProps {
  icon: string;
  description: string;
}

function NavItem({ icon, description }: NavItemProps) {
  return (
    <NavItemContainer>
      <i className={icon}></i>
      <span>{ description }</span>
    </NavItemContainer>
  )
}

function Header() {
  const auth = useAuth();
  const user = auth.getCurrentUser()?.user;
  
  function handleLogout() {
    auth.logout();
  }

  return (
    <Navbar expand="lg">
      <NavbarContainer className="container">
        <NavbarBrand href="/">
          <Logo src={logo} alt="Logo" />
        </NavbarBrand>
        { user ? (
          <>
            <NavbarToggle aria-controls="navbarHeader" />
            <NavbarCollapse id="navbarHeader">
              <Nav>
                <NavbarBrand href="/calendar">
                  <NavItem icon="bi bi-calendar-date" description="Calendário" />
                </NavbarBrand>
                <NavbarBrand href="/report">
                  <NavItem icon="bi bi-card-list" description="Relatórios" />
                </NavbarBrand>
                <NavbarBrand href="/user/info">
                  <NavItem icon="bi bi-person-vcard" description="Usuário" />
                </NavbarBrand>

                { user.type === "adm" ? ( 
                  <NavbarBrand href="/user/list">
                    <NavItem icon="bi bi-person-fill-gear" description="Usuários" />
                  </NavbarBrand>
                ) : null }
                
                <NavbarBrand href="#" onClick={handleLogout}>
                  <NavItem icon="bi bi-reply" description="Sair" />
                </NavbarBrand>
              </Nav>
            </NavbarCollapse>
          </>
        ) : null }
      </NavbarContainer>
    </Navbar>
  );
}

export { Header };