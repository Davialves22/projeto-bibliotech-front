import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Table,
} from "semantic-ui-react";
import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListLivro() {
  const [lista, setLista] = useState([]);
  const [listaOriginal, setListaOriginal] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const termoBuscaQuery = queryParams.get("busca") || "";

  useEffect(() => {
    carregarLista();
  }, []);

  useEffect(() => {
    if (termoBuscaQuery && listaOriginal.length > 0) {
      filtrarLivros(termoBuscaQuery);
    } else {
      setLista(listaOriginal);
    }
  }, [termoBuscaQuery, listaOriginal]);

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
      .get("http://localhost:8080/api/livro/v1  ")
      .then((response) => {
        const livros =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data
            : livrosDefault;
        setLista(livros);
        setListaOriginal(livros);
      })
      .catch((error) => {
        console.error(
          "Erro ao carregar lista da API. Usando livros padrão.",
          error
        );
        setLista(livrosDefault);
        setListaOriginal(livrosDefault);
      });
  }

  function filtrarLivros(termo) {
    const termoLower = termo.toLowerCase();
    const filtrados = listaOriginal.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(termoLower) ||
        (livro.nomeAutor || livro.autor).toLowerCase().includes(termoLower) ||
        livro.genero.toLowerCase().includes(termoLower) ||
        livro.isbn.toLowerCase().includes(termoLower)
    );
    setLista(filtrados);
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/livro/" + idRemover)
      .then(() => {
        toast.success("Livro removido com sucesso.");
        carregarLista();
      })
      .catch((error) => {
        toast.error("Erro ao remover o Livro.");
        console.error(error);
      });
    setOpenModal(false);
  }

  function abrirModal(livro) {
    setEntregadorSelecionado(livro);
    setModalAberto(true);
  }

  async function baixarPdf(livro) {
    if (!livro || !livro.id) {
      toast.error("Livro inválido.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/livro/pdf/${livro.id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${livro.titulo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download iniciado.");
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Livro não encontrado.");
      } else {
        toast.error("Erro ao baixar o PDF.");
      }
    }
  }

  return (
    <div>
      <MenuSistema tela="livro" />
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
                {lista.length > 0 ? (
                  lista.map((livro) => (
                    <Table.Row key={livro.id}>
                      <Table.Cell>
                        <img
                          src={
                            livro.urlImagem ||
                            `http://localhost:8080/api/livro/v1/imagem/${livro.id}`
                          }
                          alt={`Capa do livro ${livro.titulo}`}
                          style={{ width: "60px", objectFit: "cover" }}
                          onError={(e) => {
                            if (
                              e.currentTarget.src !==
                              `${window.location.origin}/default.jpg`
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
                          icon
                          title="Editar"
                        >
                          <Link
                            to="/form-livro"
                            state={{ id: livro.id }}
                            style={{ color: "green" }}
                          >
                            <Icon name="edit" />
                          </Link>
                        </Button>
                        &nbsp;
                        <Button
                          inverted
                          circular
                          color="red"
                          icon
                          title="Remover"
                          onClick={() => confirmaRemover(livro.id)}
                        >
                          <Icon name="trash" />
                        </Button>
                        &nbsp;
                        <Button
                          inverted
                          circular
                          color="blue"
                          icon
                          title="Detalhes"
                          onClick={() => abrirModal(livro)}
                        >
                          <Icon name="eye" />
                        </Button>
                        &nbsp;
                        <Button
                          inverted
                          circular
                          color="violet"
                          icon
                          title="Download PDF"
                          onClick={() => baixarPdf(livro)}
                        >
                          <Icon name="download" />
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
          <Modal basic onClose={() => setOpenModal(false)} open={openModal}>
            <Header icon>
              <Icon name="trash" />
              Tem certeza que deseja remover esse registro?
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
              <Button color="green" inverted onClick={remover}>
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
