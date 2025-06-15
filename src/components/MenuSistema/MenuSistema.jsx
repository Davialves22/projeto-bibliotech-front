import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Input, Menu } from "semantic-ui-react";
import "./MenuSistema.css";

export default function MenuSistema(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [busca, setBusca] = useState("");

  const handleBusca = (e) => {
    if (e.key === "Enter") {
      navigate(`/list-livro?busca=${encodeURIComponent(busca)}`);
    }
  };

  return (
    <div className="menu-container">
      <Menu className="menu-custom" inverted>
        {/* Menu completo (desktop) */}
        <div className="desktop-menu">
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
                active={
                  props.tela === "livro" && location.pathname.includes("form")
                }
              />
              <Dropdown.Item
                as={Link}
                to="/list-livro"
                text="Ver Todos"
                active={
                  props.tela === "livro" && location.pathname.includes("list")
                }
              />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text="Usuario">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/form-usuario"
                text="Cadastro"
                active={
                  props.tela === "usuario" &&
                  location.pathname.includes("form")
                }
              />
              <Dropdown.Item
                as={Link}
                to="/list-usuario"
                text="Ver Todos"
                active={
                  props.tela === "usuario" &&
                  location.pathname.includes("list")
                }
              />
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item
            content="Sobre"
            active={props.tela === "sobre"}
            as={Link}
            to="/sobre"
          />

          <Menu.Item>
            <Input
              icon="search"
              placeholder="Buscar livro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={handleBusca}
            />
          </Menu.Item>
        </div>

        {/* Apenas a barra de busca no mobile */}
        <div className="mobile-only-search">
          <Menu.Item className="mobile-search-input">
            <Input
              icon="search"
              placeholder="Buscar livro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={handleBusca}
              autoFocus
            />
          </Menu.Item>
        </div>

        {/* Logo fixo à direita */}
        <Menu.Menu position="right">
          <Menu.Item>
            <img src="/favicon.ico" alt="Logo" style={{ height: "30px" }} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
