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

export default function ListEntregador() {
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
    axios.get("http://localhost:8080/api/entregador").then((response) => {
      setLista(response.data);
    });
  }

  function formatarData(dataParam) {
    if (!dataParam) return "";
    const arrayData = dataParam.split("-");
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
  }

  function abrirModal(entregador) {
    setEntregadorSelecionado(entregador);
    setModalAberto(true);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/entregador/" + idRemover)
      .then((response) => {
        console.log("Entregador removido com sucesso.");

        axios.get("http://localhost:8080/api/entregador").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover um Entregador.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Entregador</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-entregador"
            />
            <br />
            <br />
            <br />
            <Table textAlign="center" color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>RG</Table.HeaderCell>
                  <Table.HeaderCell>Celular</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((entregador) => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>{entregador.nome}</Table.Cell>
                    <Table.Cell>
                      {formatarData(entregador.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{entregador.cpf}</Table.Cell>
                    <Table.Cell>{entregador.rg}</Table.Cell>
                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste Entregador"
                        icon
                      >
                        <Link
                          to="/form-entregador"
                          state={{ id: entregador.id }}
                          style={{ color: "green" }}
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Link>
                      </Button>{" "}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este Entregador"
                        icon
                        onClick={(e) => confirmaRemover(entregador.id)}
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
                        onClick={() => abrirModal(entregador)}
                      >
                        <Icon name="eye" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

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
            <Modal.Header>Detalhes do Entregador</Modal.Header>
            <Modal.Content>
              {entregadorSelecionado && (
                <div>
                  <p>
                    <strong>Nome:</strong> {entregadorSelecionado.nome}
                  </p>
                  <p>
                    <strong>Data de Nascimento:</strong>{" "}
                    {formatarData(entregadorSelecionado.dataNascimento)}
                  </p>
                  <p>
                    <strong>CPF:</strong> {entregadorSelecionado.cpf}
                  </p>
                  <p>
                    <strong>RG:</strong> {entregadorSelecionado.rg}
                  </p>
                  <p>
                    <strong>Celular:</strong>{" "}
                    {entregadorSelecionado.foneCelular}
                  </p>
                  <p>
                    <strong>Fone Fixo:</strong> {entregadorSelecionado.foneFixo}
                  </p>
                  <p>
                    <strong>QTD Entregas:</strong>{" "}
                    {entregadorSelecionado.qtdEntregasRealizadas}
                  </p>
                  <p>
                    <strong>Valor por Frete:</strong>{" "}
                    {entregadorSelecionado.valorFrete}
                  </p>
                  <p>
                    <strong>Rua:</strong> {entregadorSelecionado.enderecoRua}
                  </p>
                  <p>
                    <strong>Número:</strong>{" "}
                    {entregadorSelecionado.enderecoNumero}
                  </p>
                  <p>
                    <strong>Bairro:</strong>{" "}
                    {entregadorSelecionado.enderecoBairro}
                  </p>
                  <p>
                    <strong>Cidade:</strong>{" "}
                    {entregadorSelecionado.enderecoCidade}
                  </p>
                  <p>
                    <strong>CEP:</strong> {entregadorSelecionado.enderecoCep}
                  </p>
                  <p>
                    <strong>UF:</strong> {entregadorSelecionado.enderecoUf}
                  </p>
                  <p>
                    <strong>Complemento:</strong>{" "}
                    {entregadorSelecionado.enderecoComplemento}
                  </p>
                  <p>
                    <strong>Ativo:</strong>{" "}
                    {entregadorSelecionado.ativo ? "Sim" : "Não"}
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
