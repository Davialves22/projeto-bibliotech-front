import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormLivro() {
  const { state } = useLocation();
  const [idLivro, setIdLivro] = useState();

  const [titulo, setTitulo] = useState("");
  const [nomeAutor, setNomeAutor] = useState("");
  const [dataPublicacao, setDatapublicacao] = useState("");
  const [genero, setGenero] = useState("");
  const [preco, setPreco] = useState("");

  const [isbn, setIsbn] = useState("");
  const [nacionalidadeAutor, setNacionalidadeAutor] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagem_url, setImagem_url] = useState("");
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
      axios
        .get(`http://localhost:8080/api/livro/v1/${state.id}`)
        .then1((response) => {
          const data = response.data;
          setIdLivro(data.id);
          setTitulo(data.titulo);
          setNomeAutor(data.nomeAutor);
          setDatapublicacao(formatarData(data.dataPublicacao));
          setGenero(data.genero);
          setPreco(String(data.preco));
          setIsbn(data.isbn);
          setNacionalidadeAutor(data.nacionalidadeAutor);
          setImagem_url(data.imagemUrl);
        })
        .catch((error) => {
          console.error("Erro ao carregar livro:", error);
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
    formData.append("preco", formatarPreco(preco));
    formData.append("isbn", isbn);
    formData.append("nacionalidadeAutor", nacionalidadeAutor);
    if (imagem) formData.append("imagem", imagem);
    if (imagem_url) formData.append("imagemUrl", imagem_url);
    if (pdf) formData.append("pdf", pdf);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const request = idLivro
      ? axios.put(
          `http://localhost:8080/api/livro/v1/${idLivro}`,
          formData,
          config
        )
      : axios.post("http://localhost:8080/api/livro/v1", formData, config);
    request
      .then(() => {
        console.log("Livro salvo com sucesso!");
        toast.success("Livro salvo com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao salvar o Livro:", error);
        toast.error("Erro ao salvar o livro. Verifique os dados.");
      });
  }

  function formatarPreco(valor) {
    if (typeof valor === "number") return valor.toFixed(2);
    if (typeof valor === "string") return valor.replace(",", ".");
    return "0.00";
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
              <Form.Input fluid label="Data de Publicação" width={6}>
                <InputMask
                  mask="99/99/9999"
                  placeholder="Ex: 20/03/1985"
                  value={dataPublicacao}
                  onChange={(e) => setDatapublicacao(e.target.value)}
                />
              </Form.Input>
            </Form.Group>

            <Form.Select
              fluid
              label="Gênero"
              options={listaGeneros}
              placeholder="Selecione o gênero"
              value={genero}
              onChange={(e, { value }) => setGenero(value)}
            />

            <Form.Input
              fluid
              label="Preço"
              maxLength="100"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />

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
              <Form.Input
                fluid
                label="Imagem URL"
                placeholder="Cole o link da imagem aqui"
                value={imagem_url}
                onChange={(e) => setImagem_url(e.target.value)}
              />
              <Form.Field>
                <label>Upload de Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </Form.Field>
              <Form.Field>
                <label>Upload de PDF</label>
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
