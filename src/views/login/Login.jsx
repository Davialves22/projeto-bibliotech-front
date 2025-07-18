import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

import Logo from "../../assets/Logo_sem_fundo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Falha no login: ${errorText}`);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      toast.success("Login realizado com sucesso!");
      
      // Aguarda um tempo para o usuário ver o toast antes de redirecionar
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  const isMobile = windowWidth <= 480;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#E6F0FA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "2rem 1rem" : "3rem 2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        flexDirection: "column",
      }}
    >
      <ToastContainer position="top-center" autoClose={2000} />

      <img
        src={Logo}
        alt="Logo da Biblioteca"
        style={{
          width: isMobile ? 100 : 140,
          marginBottom: isMobile ? 25 : 40,
        }}
      />

      <Grid
        textAlign="center"
        style={{
          maxWidth: isMobile ? "90vw" : 420,
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: 14,
          boxShadow: "0 6px 18px rgba(50, 75, 150, 0.15)",
          padding: isMobile ? "2rem 1.5rem" : "3rem 2.5rem",
          color: "#34495E",
          margin: "0 auto",
        }}
        verticalAlign="middle"
      >
        <Grid.Column>
          <Header
            as="h2"
            style={{
              color: "#2C3E50",
              fontWeight: "700",
              marginBottom: "2rem",
              fontSize: isMobile ? "1.5rem" : "2rem",
            }}
          >
            <i className="book icon" style={{ color: "#2980B9" }} /> Entrar na
            sua conta
          </Header>
          <Segment
            stacked
            style={{
              backgroundColor: "#F5FAFF",
              borderRadius: 12,
              border: "1px solid #D6E6F5",
              padding: "2rem",
            }}
          >
            <Form size="large" onSubmit={handleSubmit}>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #A9CCE3",
                  color: "#2C3E50",
                  fontWeight: "600",
                  marginBottom: "1.2rem",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.07)",
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #A9CCE3",
                  color: "#2C3E50",
                  fontWeight: "600",
                  marginBottom: "1.8rem",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.07)",
                }}
              />

              <Button
                fluid
                size="large"
                type="submit"
                style={{
                  borderRadius: 12,
                  backgroundColor: "#2980B9",
                  color: "#FFFFFF",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 12px rgba(41, 128, 185, 0.6)",
                  transition: "background-color 0.3s ease",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1F618D")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2980B9")
                }
              >
                Entrar
              </Button>
            </Form>
          </Segment>
          <Message
            style={{
              marginTop: "1.8rem",
              color: "#34495E",
              fontWeight: "600",
              fontSize: isMobile ? "0.85rem" : "0.95rem",
            }}
          >
            Novo por aqui?{" "}
            <a
              href="/form-usuario"
              style={{ color: "#2980B9", fontWeight: "700" }}
            >
              Crie uma conta
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
