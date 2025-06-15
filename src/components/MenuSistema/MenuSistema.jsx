import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Input, Menu } from "semantic-ui-react";
import "./MenuSistema.css";

export default function MenuSistema(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const handleBusca = (e) => {
    if (e.key === "Enter") {
      navigate(`/list-livro?busca=${encodeURIComponent(busca)}`);
      setMenuAberto(false); // fecha o menu mobile após busca
    }
  };

  return (
    <div className="menu-container">
      <Menu className="menu-custom" inverted stackable>

        {/* Menu completo - Desktop */}
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
                active={props.tela === "livro" && location.pathname.includes("form")}
              />
              <Dropdown.Item
                as={Link}
                to="/list-livro"
                text="Ver Todos"
                active={props.tela === "livro" && location.pathname.includes("list")}
              />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text="Usuario">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/form-usuario"
                text="Cadastro"
                active={props.tela === "usuario" && location.pathname.includes("form")}
              />
              <Dropdown.Item
                as={Link}
                to="/list-usuario"
                text="Ver Todos"
                active={props.tela === "usuario" && location.pathname.includes("list")}
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

        {/* Menu mobile - botão */}
        <div className="mobile-menu">
          <Menu.Item onClick={() => setMenuAberto(!menuAberto)}>
            <i className="bars icon" /> 
          </Menu.Item>

          {menuAberto && (
            <div className="mobile-dropdown">
              <Menu.Item as={Link} to="/" onClick={() => setMenuAberto(false)}>
                Home
              </Menu.Item>

              <Dropdown item text="Livro">
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/form-livro" onClick={() => setMenuAberto(false)}>
                    Cadastro
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/list-livro" onClick={() => setMenuAberto(false)}>
                    Ver Todos
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown item text="Usuario">
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/form-usuario" onClick={() => setMenuAberto(false)}>
                    Cadastro
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/list-usuario" onClick={() => setMenuAberto(false)}>
                    Ver Todos
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Menu.Item as={Link} to="/sobre" onClick={() => setMenuAberto(false)}>
                Sobre
              </Menu.Item>

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
          )}
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
