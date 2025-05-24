import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema(props) {
  return (
    <>
      <Menu inverted>
        <Menu.Item
          content="Home"
          active={props.tela === "home"}
          as={Link}
          to="/"
        />

        <Menu.Item
          content="Livro"
          active={props.tela === "livro"}
          as={Link}
          to="/list-livro"
        />
        <Menu.Item
          content="Usuário"
          active={props.tela === "usuario"}
          as={Link}
          to="/list-usuario"
        />

        <Menu.Item
          content="Entregador"
          active={props.tela === "entregador"}
          as={Link}
          to="/list-entregador"
        />
      </Menu>
    </>
  );
}
