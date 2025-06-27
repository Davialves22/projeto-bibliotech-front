// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Container, Divider, Grid, Header, Icon, Input, List, Segment } from "semantic-ui-react";

const Footer = () => (
  <Segment
    inverted
    vertical
    as="footer"
    style={{ padding: "4em 0 2em", background: "#1c4071" }}
  >
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          {/* Sobre */}
          <Grid.Column width={2} className="footer-column">
            <Header inverted as="h3" content="Sobre" />
            <List link inverted>
              <List.Item as={Link} to="/sobre">Quem Somos</List.Item>
              <List.Item as={Link} to="/team">Equipe</List.Item>
              <List.Item as={Link} to="/contact">Contato</List.Item>
            </List>
          </Grid.Column>

          {/* Suporte */}
          <Grid.Column width={2} className="footer-column">
            <Header inverted as="h3" content="Suporte" />
            <List link inverted>
              <List.Item as={Link} to="/help">Ajuda</List.Item>
              <List.Item as={Link} to="/faq">FAQ</List.Item>
              <List.Item as={Link} to="/terms">Termos</List.Item>
            </List>
          </Grid.Column>

          {/* Redes Sociais */}
          <Grid.Column width={5} className="footer-column">
            <Header inverted as="h3" content="Redes Sociais" />
            <List horizontal>
              {[
                { href: "https://facebook.com", name: "facebook", color: "grey" },
                { href: "https://linkedin.com", name: "linkedin", color: "grey" },
                { href: "https://instagram.com", name: "instagram", color: "grey" },
                { href: "https://x.com", name: "x", color: "grey" },
                { href: "https://youtube.com", name: "youtube", color: "grey" },
              ].map(({ href, name, color }) => (
                <List.Item
                  key={name}
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={name} size="big" color={color} link />
                </List.Item>
              ))}
            </List>
          </Grid.Column>

          {/* Newsletter */}
          <Grid.Column width={7} className="footer-column">
            <Header inverted as="h3" content="Newsletter" />
            <p>Receba as novidades da nossa Clínica por E‑mail.</p>
            <Input
              fluid
              inverted
              placeholder="Seu e‑mail"
              action={{
                color: "blue",
                labelPosition: "left",
                icon: "mail",
                content: "INSCREVA-SE!",
              }}
              style={{ maxWidth: "100%" }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider
        inverted
        section
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      />

      <Container textAlign="center">
        <p style={{ margin: 0, fontSize: "1em", color: "rgba(255,255,255,0.8)" }}>
          &copy; {new Date().getFullYear()} MedPlus. Todos os direitos reservados.
        </p>
      </Container>
    </Container>
  </Segment>
);

export default Footer;
