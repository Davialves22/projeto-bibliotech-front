// MenuSistema.jsx (exemplo completo)
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "./MenuSistema.css";

export default function MenuSistema(props) {
  return (
    <div className="menu-container">
      <Menu inverted className="menu-custom">
        <Menu.Item
          content="Home"
          active={props.tela === "home"}
          as={Link}
          to="/"
        />
        <Menu.Item
          content="Livro"
          active={props.tela === "livro"}
          as={Link}
          to="/list-livro"
        />
        <Menu.Item
          content="Usuário"
          active={props.tela === "usuario"}
          as={Link}
          to="/list-usuario"
        />
        <Menu.Item
          content="Sobre"
          active={props.tela === "sobre"}
          as={Link}
          to="/list-entregador"
        />

        <Menu.Menu position="right">
          <Menu.Item>
            <img
              src="/logo192.png" 
              alt="Logo"
              style={{ height: "30px" }}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
