import React, { useEffect, useState } from "react";
import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormProduto() {
  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();

  const [titulo, setTitulo] = useState();
  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  const [listaCategoria, setListaCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState();

  useEffect(() => {
    console.log("state recebido:", state);
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setIdProduto(response.data.id);
          setTitulo(response.data.titulo);
          setCodigo(response.data.codigo);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoEntregaMinimo(response.data.tempoEntregaMaximo);
          setTempoEntregaMaximo(response.data.tempoEntregaMinimo);
          if (response.data.categoria != null) {
            setIdCategoria(response.data.categoria.id);
          }
        });
    }

    axios.get("http://localhost:8080/api/categoriaproduto").then((response) => {
      const dropDownCategorias = response.data.map((c) => ({
        text: c.descricao,
        value: c.id,
      }));
      setListaCategoria(dropDownCategorias);
    });
  }, [state]);

  function salvar() {
    let produtoRequest = {
      idCategoria: idCategoria,
      titulo: titulo,
      codigo: codigo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    if (idProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then((response) => {
          console.log("Produto alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um produto.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
          console.log("produto cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o produto.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
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
                  width={10}
                  label="Título"
                  maxLength="100"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input required width={3} label="Código do Produto">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.TextArea
                  required
                  fluid
                  label="Descrição"
                  placeholder=""
                  maxLength="500"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              <Form.Select
                required
                fluid
                tabIndex="3"
                placeholder="Selecione"
                label="Categoria"
                options={listaCategoria}
                value={idCategoria}
                onChange={(e, { value }) => {
                  setIdCategoria(value);
                }}
              />

              <Form.Group>
                <Form.Input
                  required
                  width={6}
                  label="Valor Unitário"
                  maxLengt="50"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>

                <Form.Input
                  required
                  width={6}
                  label="Tempo de Entrega em Minutos"
                  maxLengt="50"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                />

                <Form.Input
                  required
                  width={6}
                  label="Tempo de Entrega Máximo em Minutos"
                  maxLengt="50"
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-produto"}>
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
