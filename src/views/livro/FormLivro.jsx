import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import InputMask from "comigo-tech-react-input-mask/lib/react-input-mask.development";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormLivro() {
  const { state } = useLocation();
  const [idLivro, setIdLivro] = useState();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [nomeAutor, setNomeAutor] = useState("");
  const [dataPublicacao, setDatapublicacao] = useState("");
  const [genero, setGenero] = useState("");

  const [isbn, setIsbn] = useState("");
  const [nacionalidadeAutor, setNacionalidadeAutor] = useState("");
  const [imagem, setImagem] = useState(null);
  const [pdf, setPdf] = useState(null);

  const listaGeneros = [
    { key: "FICCAO", text: "Ficção", value: "FICCAO" },
    { key: "ROMANCE", text: "Romance", value: "ROMANCE" },
    { key: "DRAMA", text: "Drama", value: "DRAMA" },
    { key: "COMEDIA", text: "Comédia", value: "COMEDIA" },
    { key: "FANTASIA", text: "Fantasia", value: "FANTASIA" },
    { key: "TERROR", text: "Terror", value: "TERROR" },
    { key: "DOCUMENTARIO", text: "Documentário", value: "DOCUMENTARIO" },
    { key: "BIOGRAFIA", text: "Biografia", value: "BIOGRAFIA" },
  ];

  useEffect(() => {
    if (state?.id) {
      console.log("Carregando dados do livro com ID:", state.id);
      axios
        .get(`http://localhost:8080/api/livro/v1/${state.id}`)
        .then((response) => {
          console.log("Dados recebidos do backend:", response.data);
          const data = response.data;
          setIdLivro(data.id);
          setTitulo(data.titulo);
          setNomeAutor(data.nomeAutor);
          setDatapublicacao(formatarData(data.dataPublicacao));
          setGenero(data.genero);
          setIsbn(data.isbn);
          setNacionalidadeAutor(data.nacionalidadeAutor);
        })
        .catch((error) => {
          console.error("Erro ao carregar livro:", error);
          if (error.response) {
            console.error(
              "Erro com resposta do servidor:",
              error.response.data
            );
          } else if (error.request) {
            console.error("Erro de requisição:", error.request);
          } else {
            console.error("Erro geral:", error.message);
          }
          toast.error("Erro ao carregar dados do livro.");
        });
    }
  }, [state]);

  function salvar() {
    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("nomeAutor", nomeAutor);
    formData.append("dataPublicacao", converterDataParaISO(dataPublicacao));
    formData.append("genero", genero);
    formData.append("isbn", isbn);
    formData.append("nacionalidadeAutor", nacionalidadeAutor);
    if (imagem) formData.append("imagemCapa", imagem);
    if (pdf) formData.append("pdf", pdf);

    console.log("📤 Enviando os seguintes dados:");
    for (let pair of formData.entries()) {
      console.log(`→ ${pair[0]}:`, pair[1]);
    }

    // Pega o token JWT do localStorage (ajuste se você armazenar em outro lugar)
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,  // <<<<<< Token no header!
      },
    };

    const url = idLivro
      ? `http://localhost:8080/api/livro/v1/${idLivro}`
      : "http://localhost:8080/api/livro/v1";

    console.log(`🔗 Enviando ${idLivro ? "PUT" : "POST"} para`, url);

    const request = idLivro
      ? axios.put(url, formData, config)
      : axios.post(url, formData, config);

    request
      .then((response) => {
        console.log("✅ Livro salvo com sucesso!", response.data);
        toast.success("Livro salvo com sucesso!");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.error("❌ Erro ao salvar o Livro:", error);

        if (error.response) {
          console.error(
            "⚠️ Resposta com erro do servidor:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error(
            "⚠️ Sem resposta do servidor. Requisição enviada:",
            error.request
          );
        } else {
          console.error(
            "⚠️ Erro de configuração ao enviar requisição:",
            error.message
          );
        }

        toast.error("Erro ao salvar o livro. Verifique os dados.");
      });
  }

  function converterDataParaISO(data) {
    const partes = data.split("/");
    if (partes.length !== 3) return "";
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  function formatarData(dataParam) {
    if (!dataParam) return "";
    const partes = dataParam.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  return (
    <div>
      <MenuSistema tela={"livro"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Livro &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            {idLivro ? " Alteração" : " Cadastro"}
          </h2>

          <Divider />

          <Form>
            <Form.Group widths="equal">
              <Form.Input
                required
                fluid
                label="Título"
                maxLength="100"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <Form.Input
                required
                fluid
                label="Autor"
                maxLength="100"
                value={nomeAutor}
                onChange={(e) => setNomeAutor(e.target.value)}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Gênero"
                options={listaGeneros}
                placeholder="Selecione o gênero"
                value={genero}
                onChange={(e, { value }) => setGenero(value)}
              />

              <Form.Input fluid label="Data de Publicação" width={6}>
                <InputMask
                  mask="99/99/9999"
                  placeholder="Ex: 20/03/1985"
                  value={dataPublicacao}
                  onChange={(e) => setDatapublicacao(e.target.value)}
                />
              </Form.Input>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="ISBN"
                maxLength="100"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <Form.Input
                fluid
                label="Nacionalidade do Autor"
                maxLength="100"
                value={nacionalidadeAutor}
                onChange={(e) => setNacionalidadeAutor(e.target.value)}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Capa do Livro</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </Form.Field>
              <Form.Field>
                <label>PDF do Livro</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    setPdf(e.target.files[0]);
                    console.log("PDF selecionado:", e.target.files[0]);
                  }}
                />
              </Form.Field>
            </Form.Group>
          </Form>

          <div style={{ marginTop: "4%" }}>
            <Link to={"/list-livro"}>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
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
    </div>
  );
}
