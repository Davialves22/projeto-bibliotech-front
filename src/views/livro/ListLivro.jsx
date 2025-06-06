import axios from "axios";
import { useEffect, useState } from "react";
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
import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";

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
    urlImagem: capaDomCasmurro,
  },
  {
    id: 2,
    titulo: "O Alienista",
    nomeAutor: "Machado de Assis",
    genero: "Conto",
    isbn: "978-85-359-0212-8",
    urlImagem: capaOAlienista,
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
          <h2>Livros Cadastrados</h2>
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
                            livro.imagemUrl ||
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
