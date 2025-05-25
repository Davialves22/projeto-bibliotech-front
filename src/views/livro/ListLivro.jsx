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

  // Ajuste aqui para validar o dado antes de setar o estado
  function carregarLista() {
    axios
      .get("http://localhost:8080/api/livro")
      .then((response) => {
        console.log("DEBUG DA API:", response.data);
        if (Array.isArray(response.data)) {
          setLista(response.data);
        } else {
          console.error("Resposta da API não é um array:", response.data);
          setLista([]); // evita erro no map
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar lista:", error);
        setLista([]); // evita erro no map em caso de erro
      });
  }

  function formatarData(dataParam) {
    if (!dataParam) return "";
    const arrayData = dataParam.split("-");
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
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

        // Atualiza a lista após remover
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
                {/* Adicione verificação antes do map */}
                {Array.isArray(lista) && lista.length > 0 ? (
                  lista.map((livro) => (
                    <Table.Row key={livro.id}>
                      <Table.Cell>
                        <img
                          src={`http://localhost:8080/api/livro/imagem/${livro.id}`}
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
                      <Table.Cell>{livro.autor}</Table.Cell>
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

          {/* ...restante do seu código de modal */}
          <Modal
            basic
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
          >
            <Header icon>
              <Icon name="trash" />
              <div style={{ marginTop: "5%" }}>
                {" "}
                Tem certeza que deseja remover esse registro?{" "}
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

          <Modal
            onClose={() => setModalAberto(false)}
            open={modalAberto}
            size="small"
          >
            <Modal.Header>Detalhes do Livro</Modal.Header>
            <Modal.Content>
              {entregadorSelecionado && (
                <div>
                  {/* Aqui você está mostrando dados de entregador, mas o modal é de livro?
                      Talvez precise ajustar os campos para os dados corretos do livro */}
                  <p>
                    <strong>Título:</strong> {entregadorSelecionado.titulo}
                  </p>
                  <p>
                    <strong>Autor:</strong> {entregadorSelecionado.autor}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {entregadorSelecionado.genero}
                  </p>
                  <p>
                    <strong>ISBN:</strong> {entregadorSelecionado.isbn}
                  </p>
                  {/* Adicione outros campos que queira mostrar */}
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
