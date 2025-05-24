import React, { useEffect, useState } from "react";
import InputMask from "comigo-tech-react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  FormSelect,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";

const options = [
  { key: "", text: "", value: "" },
  { key: "P", text: "Pernambuco", value: "PE" },
  { key: "S", text: "São Paulo", value: "SP" },
  { key: "C", text: "Santa Catarina", value: "SC" },
];

export default function FormEntregador() {
  const { state } = useLocation();
  const [idEntregador, setIdEntregador] = useState();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [enderecoUf, setEnderecoUf] = useState("");
  const [enderecoComplemento, setEnderecoComplemento] = useState("");
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    console.log("state recebido:", state);
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setRg(response.data.rg);
          setDataNascimento(response.data.dataNascimento);
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);

          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
          setValorFrete(response.data.valorFrete);
          setEnderecoRua(response.data.enderecoRua);
          setEnderecoNumero(response.data.enderecoNumero);
          setEnderecoBairro(response.data.enderecoBairro);
          setEnderecoCidade(response.data.enderecoCidade);
          setEnderecoCep(response.data.enderecoCep);

          setEnderecoUf(response.data.enderecoUf);
          setEnderecoComplemento(response.data.enderecoComplemento);
          setAtivo(response.data.ativo);
        });
    }
  }, [state]);

  function salvar() {
    const entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: moment(dataNascimento, "DD/MM/YYYY").format("DD/MM/YYYY"),
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: parseInt(qtdEntregasRealizadas || "0", 10),
      valorFrete: parseFloat(
        valorFrete?.replace("R$", "").replace(",", ".") || "0"
      ),
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo,
    };

    if (idEntregador != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/entregador/" + idEntregador,
          entregadorRequest
        )
        .then((response) => {
          console.log("Entregador alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um Entregador.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => {
          console.log("Entregador cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o Entregador.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEntregador === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEntregador != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
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
                  width={8}
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Field width={3} required>
                  <label>CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Field>
                <Form.Field width={3} required>
                  <label>RG</label>
                  <InputMask
                    mask="99.999.999"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field width={6}>
                  <label>Data Nascimento</label>
                  <InputMask
                    mask="99-99-9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Field>
                <Form.Field width={3} required>
                  <label>Fone Celular</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Field>
                <Form.Field width={3}>
                  <label>Fone Fixo</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Field>
                <Form.Input
                  width={3}
                  label="QTD Entregas Realizadas"
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                />
                <Form.Field width={3}>
                  <label>Valor Por Frete</label>
                  <InputMask
                    mask="R$99,99"
                    value={valorFrete}
                    onChange={(e) => setValorFrete(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  width={12}
                  label="Rua"
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                />
                <Form.Input
                  required
                  width={3}
                  label="Número"
                  value={enderecoNumero}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  width={10}
                  label="Bairro"
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                />
                <Form.Input
                  width={10}
                  label="Cidade"
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                />
                <Form.Field width={3} required>
                  <label>CEP</label>
                  <InputMask
                    mask="99999-999"
                    value={enderecoCep}
                    onChange={(e) => setEnderecoCep(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group>
                <FormSelect
                  width={16}
                  label="UF"
                  options={options}
                  placeholder="Selecione o estado"
                  value={enderecoUf}
                  onChange={(e, { value }) => setEnderecoUf(value)}
                />
              </Form.Group>

              <Form.Input
                required
                fluid
                label="Complemento"
                maxLength="50"
                value={enderecoComplemento}
                onChange={(e) => setEnderecoComplemento(e.target.value)}
              />

              <Form.Group inline>
                <label>
                  <b>Ativo:</b>
                </label>
                <Form.Radio
                  label="Sim"
                  checked={ativo}
                  onChange={() => setAtivo(true)}
                />
                <Form.Radio
                  label="Não"
                  checked={!ativo}
                  onChange={() => setAtivo(false)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-entregador"}>
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
          </div>
        </Container>
      </div>
    </div>
  );
}
