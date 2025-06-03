import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListLivro() {
  const [lista, setLista] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  function carregarLista() {
    const livrosDefault = [
      {
        id: 1,
        titulo: "Dom Casmurro",
        nomeAutor: "Machado de Assis",
        genero: "Romance",
        isbn: "978-85-359-0277-7",
        urlImagem:
          "data:image/jpeg;base64,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",
      },
      {
        id: 2,
        titulo: "O Alienista",
        nomeAutor: "Machado de Assis",
        genero: "Conto",
        isbn: "978-85-359-0212-8",
        urlImagem:
          "data:image/jpeg;base64,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",
      },
    ];

    axios
      .get("http://localhost:8080/api/livro")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setLista(response.data);
        } else {
          console.warn("API retornou lista vazia. Usando livros padrão.");
          setLista(livrosDefault);
        }
      })
      .catch((error) => {
        console.error(
          "Erro ao carregar lista da API. Usando livros padrão.",
          error
        );
        setLista(livrosDefault);
      });
  }

  function abrirModal(livro) {
    setEntregadorSelecionado(livro);
    setModalAberto(true);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/livro/" + idRemover)
      .then((response) => {
        console.log("Livro removido com sucesso.");
        carregarLista();
      })
      .catch((error) => {
        console.log("Erro ao remover o Livro.", error);
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"livro"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Livros</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-livro"
            />
            <br />
            <br />
            <br />
            <Table textAlign="center" color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Capa</Table.HeaderCell>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Autor</Table.HeaderCell>
                  <Table.HeaderCell>Gênero</Table.HeaderCell>
                  <Table.HeaderCell>ISBN</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {Array.isArray(lista) && lista.length > 0 ? (
                  lista.map((livro) => (
                    <Table.Row key={livro.id}>
                      <Table.Cell>
                        <img
                          src={
                            livro.urlImagem ||
                            `http://localhost:8080/api/livro/imagem/${livro.id}`
                          }
                          alt={`Capa do livro ${livro.titulo}`}
                          style={{
                            width: "60px",
                            height: "auto",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            if (
                              e.currentTarget.src !==
                              window.location.origin + "/default.jpg"
                            ) {
                              e.currentTarget.src = "/default.jpg";
                            }
                          }}
                        />
                      </Table.Cell>

                      <Table.Cell>{livro.titulo}</Table.Cell>
                      <Table.Cell>{livro.nomeAutor || livro.autor}</Table.Cell>
                      <Table.Cell>{livro.genero}</Table.Cell>
                      <Table.Cell>{livro.isbn}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste Livro"
                          icon
                        >
                          <Link
                            to="/form-livro"
                            state={{ id: livro.id }}
                            style={{ color: "green" }}
                          >
                            <Icon name="edit" />
                          </Link>
                        </Button>{" "}
                        &nbsp;
                        <Button
                          inverted
                          circular
                          color="red"
                          title="Clique aqui para remover este Livro"
                          icon
                          onClick={() => confirmaRemover(livro.id)}
                        >
                          <Icon name="trash" />
                        </Button>{" "}
                        &nbsp;
                        <Button
                          inverted
                          circular
                          color="blue"
                          title="Ver detalhes"
                          icon
                          onClick={() => abrirModal(livro)}
                        >
                          <Icon name="eye" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="6">
                      Nenhum livro encontrado.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>

          {/* Modal de confirmação de remoção */}
          <Modal
            basic
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
          >
            <Header icon>
              <Icon name="trash" />
              <div style={{ marginTop: "5%" }}>
                Tem certeza que deseja remover esse registro?
              </div>
            </Header>
            <Modal.Actions>
              <Button
                basic
                color="red"
                inverted
                onClick={() => setOpenModal(false)}
              >
                <Icon name="remove" /> Não
              </Button>
              <Button color="green" inverted onClick={() => remover()}>
                <Icon name="checkmark" /> Sim
              </Button>
            </Modal.Actions>
          </Modal>

          {/* Modal de detalhes */}
          <Modal
            onClose={() => setModalAberto(false)}
            open={modalAberto}
            size="small"
          >
            <Modal.Header>Detalhes do Livro</Modal.Header>
            <Modal.Content>
              {entregadorSelecionado && (
                <div>
                  <p>
                    <strong>Título:</strong> {entregadorSelecionado.titulo}
                  </p>
                  <p>
                    <strong>Autor:</strong>{" "}
                    {entregadorSelecionado.nomeAutor ||
                      entregadorSelecionado.autor}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {entregadorSelecionado.genero}
                  </p>
                  <p>
                    <strong>ISBN:</strong> {entregadorSelecionado.isbn}
                  </p>
                </div>
              )}
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => setModalAberto(false)}>
                Fechar
              </Button>
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
