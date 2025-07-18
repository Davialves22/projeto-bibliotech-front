import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  Button,
  Dropdown,
  Icon,
  Input,
  Menu,
} from "semantic-ui-react";
import Logo from "../../assets/Logo_sem_fundo.png";
import "./MenuSistema.css";

export default function MenuSistema(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const [activeIndexLivro, setActiveIndexLivro] = useState(-1);
  const [activeIndexUsuario, setActiveIndexUsuario] = useState(-1);

  const handleClickLivro = () => {
    setActiveIndexLivro(activeIndexLivro === 0 ? -1 : 0);
  };

  const handleClickUsuario = () => {
    setActiveIndexUsuario(activeIndexUsuario === 0 ? -1 : 0);
  };

  const handleBusca = (e) => {
    if (e.key === "Enter") {
      navigate(`/list-livro?busca=${encodeURIComponent(busca)}`);
      setMenuAberto(false);
    }
  };

  // 🔐 Verifica se o usuário está logado
  const isLoggedIn = !!localStorage.getItem("token");

  // 🔓 Faz logout removendo o token e redireciona para o login
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
                text="Cadastrar"
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

          <Menu.Item
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              icon="search"
              iconPosition="left"
              action={{
                icon: "arrow right",
                onClick: () => {
                  if (busca.trim()) {
                    navigate(`/list-livro?busca=${encodeURIComponent(busca)}`);
                    setMenuAberto(false);
                  }
                },
              }}
              placeholder="Buscar livro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={handleBusca}
              fluid
              style={{
                minWidth: "300px",
                maxWidth: "500px",
                width: "100%",
                borderRadius: "30px",
                padding: "5px 10px",
              }}
            />
          </Menu.Item>
        </div>

        {/* Menu mobile - botão */}
        <div className="mobile-menu">
          <Menu.Item onClick={() => setMenuAberto(true)}>
            <i className="bars icon" />
          </Menu.Item>
        </div>

        {/* Sidebar lateral */}
        <div className={`sidebar ${menuAberto ? "sidebar-open" : ""}`}>
          <div className="sidebar-header">
            <button
              className="sidebar-close-btn"
              onClick={() => setMenuAberto(false)}
            >
              &times;
            </button>
          </div>

          <Menu vertical fluid inverted>
            <Menu.Item as={Link} to="/" onClick={() => setMenuAberto(false)}>
              Home
            </Menu.Item>

            <Accordion as={Menu.Item} fluid inverted>
              <Accordion.Title
                active={activeIndexLivro === 0}
                index={0}
                onClick={handleClickLivro}
              >
                <Icon name="dropdown" />
                Livro
              </Accordion.Title>
              <Accordion.Content active={activeIndexLivro === 0}>
                <Menu.Menu>
                  <Menu.Item
                    as={Link}
                    to="/form-livro"
                    onClick={() => setMenuAberto(false)}
                  >
                    Cadastro
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/list-livro"
                    onClick={() => setMenuAberto(false)}
                  >
                    Ver Todos
                  </Menu.Item>
                </Menu.Menu>
              </Accordion.Content>
            </Accordion>

            <Accordion as={Menu.Item} fluid inverted>
              <Accordion.Title
                active={activeIndexUsuario === 0}
                index={0}
                onClick={handleClickUsuario}
              >
                <Icon name="dropdown" />
                Usuário
              </Accordion.Title>
              <Accordion.Content active={activeIndexUsuario === 0}>
                <Menu.Menu>
                  <Menu.Item
                    as={Link}
                    to="/form-usuario"
                    onClick={() => setMenuAberto(false)}
                  >
                    Cadastro
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/list-usuario"
                    onClick={() => setMenuAberto(false)}
                  >
                    Ver Todos
                  </Menu.Item>
                </Menu.Menu>
              </Accordion.Content>
            </Accordion>

            <Menu.Item
              as={Link}
              to="/sobre"
              onClick={() => setMenuAberto(false)}
            >
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
          </Menu>
        </div>

        {/* Overlay */}
        {menuAberto && (
          <div
            className="sidebar-overlay"
            onClick={() => setMenuAberto(false)}
          ></div>
        )}

        {/* Logo fixo e botão login/logout */}
        <Menu.Menu position="right" className="logo-fixo">
          {isLoggedIn ? (
            <Menu.Item>
              <Button
                onClick={handleLogout}
                color="red"
                content="Sair"
                style={{
                  minWidth: "50px",
                  borderRadius: "25px",
                  fontWeight: "700",
                  boxShadow: "0 4px 15px rgba(192, 57, 43, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#922B21";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(146, 43, 33, 0.7)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(192, 57, 43, 0.4)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Button
                as={Link}
                to="/login"
                primary
                content="Login"
                style={{
                  minWidth: "110px",
                  borderRadius: "25px",
                  fontWeight: "700",
                  boxShadow: "0 4px 15px rgba(41, 128, 185, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1B4F72";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(27, 79, 114, 0.7)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(41, 128, 185, 0.4)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Menu.Item>
          )}

          <Menu.Item>
            <img src={Logo} alt="Logo" style={{ height: "40px" }} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
