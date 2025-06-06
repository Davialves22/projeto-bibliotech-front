import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
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

        <Dropdown item text="Livro">
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/form-livro"
              text="Cadastro"
              active={props.tela === "livro" && window.location.pathname.includes("form")}
            />
            <Dropdown.Item
              as={Link}
              to="/list-livro"
              text="Ver Todos"
              active={props.tela === "livro" && window.location.pathname.includes("list")}
            />
          </Dropdown.Menu>
        </Dropdown>

      <Dropdown item text="Usuario">
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/form-usuario"
              text="Cadastro"
              active={props.tela === "usuario" && window.location.pathname.includes("form")}
            />
            <Dropdown.Item
              as={Link}
              to="/list-usuario"
              text="Ver Todos"
              active={props.tela === "usuario" && window.location.pathname.includes("list")}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          content="Sobre"
          active={props.tela === "sobre"}
          as={Link}
          to="/sobre"
        />


        <Menu.Menu position="right">
          <Menu.Item>
            <img src="/favicon.ico" alt="Logo" style={{ height: "30px" }} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
