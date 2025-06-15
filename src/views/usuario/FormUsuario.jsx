import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import { ToastContainer, toast } from "react-toastify"; // import toast
import 'react-toastify/dist/ReactToastify.css'; // css do toastify

export default function FormUsuario() {
  const { state } = useLocation();
  const [idUsuario, setIdUsuario] = useState();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState(""); // formato dd/MM/yyyy
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
          setDataNascimento(response.data.dataNascimento); // já em formato dd/MM/yyyy
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
      // Alteração
      axios
        .put("http://localhost:8080/api/usuario/" + idUsuario, usuarioRequest)
        .then(() => {
          console.log("Usuário alterado com sucesso.");
          toast.success("Usuário alterado com sucesso.");
        })
        .catch(() => {
          console.log("Erro ao alterar usuário.");
          toast.error("Erro ao alterar usuário.");
        });
    } else {
      // Cadastro
      axios
        .post("http://localhost:8080/api/usuario", usuarioRequest)
        .then(() => {
          console.log("Usuário cadastrado com sucesso.");
          toast.success("Usuário cadastrado com sucesso.");
        })
        .catch(() => {
          console.log("Erro ao cadastrar usuário.");
          toast.error("Erro ao cadastrar usuário.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"usuario"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Usuário &nbsp;
              <Icon name="angle double right" size="small" />
            </span>{" "}
            {idUsuario ? "Alteração" : "Cadastro"}
          </h2>
          <Divider />
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                required
                label="Nome"
                value={nome}
                maxLength={100}
                onChange={(e) => setNome(e.target.value)}
              />

              <Form.Input required label="Data de Nascimento" placeholder="dd/MM/yyyy">
                <InputMask
                  mask="99/99/9999"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </Form.Input>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input required label="CPF">
                <InputMask
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </Form.Input>

              <Form.Input label="Fone Celular">
                <InputMask
                  mask="(99) 99999-9999"
                  value={foneCelular}
                  onChange={(e) => setFoneCelular(e.target.value)}
                />
              </Form.Input>
            </Form.Group>

            <Form.Input
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form>

          <div style={{ marginTop: "4%" }}>
            <Link to={"/list-usuario"}>
              <Button inverted circular icon labelPosition="left" color="orange">
                <Icon name="reply" /> Voltar
              </Button>
            </Link>

            <Button
              inverted
              circular
              icon
              labelPosition="left"
              color="blue"
              floated="right"
              onClick={salvar}
            >
              <Icon name="save" />
              Salvar
            </Button>
          </div>
        </Container>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      {/* Container do toast que aparece no topo direito e fecha após 3s */}
    </div>
  );
}
