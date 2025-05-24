import React, { useEffect, useState } from "react";
import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormLivro() {
  const { state } = useLocation();
  const [idLivro, setIdLivro] = useState();

  const [titulo, setTitulo] = useState();
  const [autor, setAutor] = useState();
  const [dataPublicacao, setDatapublicacao] = useState();
  const [genero, setGenero] = useState();
  const [preco, setPreco] = useState();

  const [isbn, setIsbn] = useState();
  const [nacionalidadeAutor, setNacionalidadeAutor] = useState();
  const [imagem, setImagem] = useState();
  const [imagem_url, setImagem_url] = useState();
  const [pdf, setPdf] = useState();

  useEffect(() => {
    console.log("state recebido:", state);
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/livro/" + state.id)
        .then((response) => {
          setIdLivro(response.data.id);
          setTitulo(response.data.titulo);
          setAutor(response.data.autor);
          setDatapublicacao(formatarData(response.data.datapublicacao));
          setGenero(response.data.genero);
          setPreco(response.data.preco);
          setIsbn(response.data.isbn);
          setNacionalidadeAutor(response.data.nacionalidadeAutor);
          setImagem(response.data.imagem);
          setImagem_url(response.data.imagem_url);
          setPdf(response.data.pdf);
        });
    }
  }, [state]);

  function salvar() {
    console.log("ID do livro no salvar():", idLivro);

    let livroRequest = {
      titulo: titulo,
      autor: autor,
      dataPublicacao: dataPublicacao,
      genero: genero,
      preco: preco,
      isbn: isbn,
      nacionalidadeAutor: nacionalidadeAutor,
      imagem: imagem,
      imagem_url: imagem_url,
      pdf: pdf,
    };

    if (idLivro != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/livro/" + idLivro, livroRequest)
        .then((response) => {
          console.log("Livro alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um Livro.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/livro", livroRequest)
        .then((response) => {
          console.log("Livro cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o Livro.");
        });
    }
  }

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  return (
    <div>
      <MenuSistema tela={"livro"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idLivro === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Livro &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idLivro != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
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
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />

                <Form.Input fluid label="Data De Publicação" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataPublicacao}
                    onChange={(e) => setDatapublicacao(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Field width={3}>
                  <label>Preço</label>
                  <InputMask
                    mask="R$99,99"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </Form.Field>

                <Form.Input
                  required
                  fluid
                  label="ISBN"
                  maxLength="100"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Nacionalidade do Autor"
                  maxLength="100"
                  value={nacionalidadeAutor}
                  onChange={(e) => setNacionalidadeAutor(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
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
                    onChange={(e) => setPdf(e.target.files[0])}
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
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
