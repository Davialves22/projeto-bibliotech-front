import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import CarouselFotos from "../../components/CarouselFotos";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

export default function Sobre() {
  return (
    <div>
      <MenuSistema tela={"sobre"} />
      <div style={{ marginTop: "5%" }}>
        <Container>
          <Segment padded="very" raised>
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column>
                  <CarouselFotos />
                </Grid.Column>

                <Grid.Column>
                  <Header as="h2" color="blue">
                    Bem-vindo ao <strong>Bibliotech</strong>!
                  </Header>

                  <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    O <strong>Bibliotech</strong> é um sistema de biblioteca
                    online desenvolvido com foco na praticidade e facilidade em
                    encontrar livros públicos, tanto para leitura online quanto
                    para download gratuito.
                  </p>

                  <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    Projeto desenvolvido sob orientação do professor{" "}
                    <strong>Roberto Alencar</strong> na disciplina de
                    Desenvolvimento para Web III, no IFPE - Jaboatão dos
                    Guararapes.
                  </p>

                  <Divider />

                  <Header as="h4">Links úteis</Header>
                  <p>
                    <Icon name="code branch" color="blue" />
                    <strong>API:</strong>{" "}
                    <a
                      href="https://github.com/Davialves22/projeto-bibliotech-front.git"
                      target="_blank"
                      rel="noreferrer"
                    >
                      github.com/Davialves22/projeto-bibliotech-front
                    </a>
                  </p>

                  <p>
                    <Icon name="code branch" color="blue" />
                    <strong>API BASE_ROBERTO:</strong>{" "}
                    <a
                      href="https://github.com/robertoalencar/oxefood-api"
                      target="_blank"
                      rel="noreferrer"
                    >
                      github.com/robertoalencar/oxefood-api
                    </a>
                  </p>

                  <p>
                    <Icon name="desktop" color="teal" />
                    <strong>Módulo WEB usado:</strong>{" "}
                    <a
                      href="https://github.com/robertoalencar/oxefood-web"
                      target="_blank"
                      rel="noreferrer"
                    >
                      github.com/robertoalencar/oxefood-web
                    </a>
                  </p>

                  <Divider />

                  <a
                    href="https://wa.me/5581973417256"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "18px", color: "#25D366" }}
                  >
                    <Icon name="whatsapp" size="large" />
                    Fale comigo no WhatsApp
                  </a>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    </div>
  );
}
