import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon
} from "semantic-ui-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormUsuario() {
  const { state } = useLocation();
  const [idUsuario, setIdUsuario] = useState();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/usuario/" + state.id)
        .then((response) => {
          setIdUsuario(response.data.id);
          setNome(response.data.nome);
          setDataNascimento(response.data.dataNascimento);
          setCpf(response.data.cpf);
          setFoneCelular(response.data.foneCelular);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Erro ao carregar usuário:", error);
          toast.error("Erro ao carregar dados do usuário");
        });
    }
  }, [state]);

  function salvar() {
    const usuarioRequest = {
      nome,
      dataNascimento,
      cpf,
      foneCelular,
      email,
    };

    if (idUsuario != null) {
      axios
        .put("http://localhost:8080/api/usuario/" + idUsuario, usuarioRequest)
        .then(() => {
          toast.success("Usuário alterado com sucesso.");
        })
        .catch(() => {
          toast.error("Erro ao alterar usuário.");
        });
    } else {
      axios
        .post("http://localhost:8080/api/usuario/v1", usuarioRequest)
        .then(() => {
          toast.success("Usuário cadastrado com sucesso.");
        })
        .catch(() => {
          toast.error("Erro ao cadastrar usuário.");
        });
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#E6F0FA",
        minHeight: "100vh",
        paddingTop: 40,
        paddingBottom: 40,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container
        style={{
          maxWidth: 600,
          backgroundColor: "#fff",
          padding: "2.5rem 3rem",
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Header
          as="h2"
          style={{ color: "#2980B9", fontWeight: "700", marginBottom: 20 }}
          textAlign="center"
        >
          <Icon name="users" />
          {idUsuario ? "Alteração de Usuário" : "Cadastro de Usuário"}
        </Header>

        <Divider />

        <Form>
          <Form.Group widths="equal">
            <Form.Input
              required
              label="Nome"
              placeholder="Digite o nome"
              value={nome}
              maxLength={100}
              onChange={(e) => setNome(e.target.value)}
              style={{ borderRadius: 8 }}
            />

            <Form.Field required>
              <label>Data de Nascimento</label>
              <InputMask
                mask="99/99/9999"
                value={dataNascimento}
                placeholder="dd/MM/yyyy"
                onChange={(e) => setDataNascimento(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.9em",
                  borderRadius: 8,
                  border: "1.5px solid #A9CCE3",
                  fontSize: "1rem",
                  color: "#34495E",
                }}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field required>
              <label>CPF</label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                placeholder="000.000.000-00"
                onChange={(e) => setCpf(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.9em",
                  borderRadius: 8,
                  border: "1.5px solid #A9CCE3",
                  fontSize: "1rem",
                  color: "#34495E",
                }}
              />
            </Form.Field>

            <Form.Field>
              <label>Fone Celular</label>
              <InputMask
                mask="(99) 99999-9999"
                value={foneCelular}
                placeholder="(00) 00000-0000"
                onChange={(e) => setFoneCelular(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.9em",
                  borderRadius: 8,
                  border: "1.5px solid #A9CCE3",
                  fontSize: "1rem",
                  color: "#34495E",
                }}
              />
            </Form.Field>
          </Form.Group>

          <Form.Input
            required
            label="Email"
            type="email"
            placeholder="exemplo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: 8 }}
          />

          <Divider />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={"/list-usuario"}>
              <Button
                icon
                labelPosition="left"
                color="orange"
                style={{ borderRadius: 30 }}
                size="large"
              >
                <Icon name="reply" />
                Voltar
              </Button>
            </Link>

            <Button
              icon
              labelPosition="left"
              color="blue"
              floated="right"
              onClick={salvar}
              style={{ borderRadius: 30 }}
              size="large"
            >
              <Icon name="save" />
              Salvar
            </Button>
          </div>
        </Form>
      </Container>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
