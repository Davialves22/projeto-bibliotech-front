import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Icon,
  Table,
  Image,
  Modal,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuSistema from "../../MenuSistema";

export default function ListLivro() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState(null);

  useEffect(() => {
    carregarLista();
  }, []);

  function confirmaRemover(id) {
    setIdRemover(id);
    setOpenModal(true);
  }

  function carregarLista() {
    axios.get("http://localhost:8080/api/livro").then((response) => {
      setLista(response.data);
    });
  }

  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/livro/" + idRemover)
      .then((response) => {
        console.log("Livro removido com sucesso.");

        axios.get("http://localhost:8080/api/livro").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover o Livro.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"livro"} />
      <Container style={{ marginTop: "3%" }} textAlign="justified">
        <h2>
          <span style={{ color: "darkgray" }}>
            Livro <Icon name="angle double right" />
          </span>
          Listagem
        </h2>

        <Link to="/form-livro">
          <Button
            color="green"
            icon
            labelPosition="left"
            style={{ marginBottom: 20 }}
          >
            <Icon name="plus" />
            Novo
          </Button>
        </Link>

        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Imagem</Table.HeaderCell>
              <Table.HeaderCell>ISBN</Table.HeaderCell>
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.HeaderCell>Data Publicação</Table.HeaderCell>
              <Table.HeaderCell>Gênero</Table.HeaderCell>
              <Table.HeaderCell>Autor</Table.HeaderCell>
              <Table.HeaderCell>Nacionalidade</Table.HeaderCell>
              <Table.HeaderCell>PDF</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {lista.map((livro) => (
              <Table.Row key={livro.id}>
                <Table.Cell>
                  {livro.imagem ? (
                    <Image
                      src={`http://localhost:8080/api/livro/${livro.id}/imagem`}
                      size="tiny"
                      bordered
                    />
                  ) : (
                    <span>Sem imagem</span>
                  )}
                </Table.Cell>
                <Table.Cell>{livro.isbn}</Table.Cell>
                <Table.Cell>{livro.titulo}</Table.Cell>
                <Table.Cell>{formatarData(livro.dataPublicacao)}</Table.Cell>
                <Table.Cell>{livro.genero}</Table.Cell>
                <Table.Cell>{livro.nomeAutor}</Table.Cell>
                <Table.Cell>{livro.nacionalidadeAutor}</Table.Cell>
                <Table.Cell>
                  {livro.pdf ? (
                    <a
                      href={`http://localhost:8080/api/livro/${livro.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver PDF
                    </a>
                  ) : (
                    <span>Sem PDF</span>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Link to="/form-livro" state={{ id: livro.id }}>
                    <Button color="blue" size="small" icon title="Editar">
                      <Icon name="edit" />
                    </Button>
                  </Link>
                  <Button
                    color="red"
                    size="small"
                    icon
                    title="Excluir"
                    onClick={() => confirmaRemover(livro.id)}
                  >
                    <Icon name="trash" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>

      <Modal basic open={openModal} onClose={() => setOpenModal(false)}>
        <Header icon>
          <Icon name="trash" />
          Tem certeza que deseja remover esse livro?
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
    </div>
  );
}
