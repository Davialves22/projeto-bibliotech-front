import { useEffect, useState } from "react";
import { Item, Menu, SelectMobile } from "./GeneroMenu.styles";

export default function GeneroMenu({ filtro, generos, onChange }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <SelectMobile
        value={filtro}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="TODOS">Todos</option>
        {generos.map((genero) => (
          <option key={genero} value={genero}>
            {genero.charAt(0) + genero.slice(1).toLowerCase()}
          </option>
        ))}
      </SelectMobile>
    );
  }

  return (
    <Menu>
      <Item active={filtro === "TODOS"} onClick={() => onChange("TODOS")}>
        Todos
      </Item>
      {generos.map((genero) => (
        <Item
          key={genero}
          active={filtro === genero}
          onClick={() => onChange(genero)}
        >
          {genero.charAt(0) + genero.slice(1).toLowerCase()}
        </Item>
      ))}
    </Menu>
  );
}
