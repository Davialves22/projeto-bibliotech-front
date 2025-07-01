import { Menu, RadioItem, SelectMobile } from "./GeneroMenu.styles";

export default function GeneroMenu({ filtro, generos, onChange }) {
  return (
    <>
      <Menu role="radiogroup" aria-label="Seleção de Gênero">
        <RadioItem active={filtro === "TODOS"}>
          <input
            type="radio"
            name="genero"
            value="TODOS"
            checked={filtro === "TODOS"}
            onChange={() => onChange("TODOS")}
          />
          <span>Todos</span>
        </RadioItem>

        {generos.map((genero) => (
          <RadioItem key={genero} active={filtro === genero}>
            <input
              type="radio"
              name="genero"
              value={genero}
              checked={filtro === genero}
              onChange={() => onChange(genero)}
            />
            <span>{genero.charAt(0) + genero.slice(1).toLowerCase()}</span>
          </RadioItem>
        ))}
      </Menu>

      <SelectMobile
        value={filtro}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Seleção de Gênero"
      >
        <option value="TODOS">Todos</option>
        {generos.map((genero) => (
          <option key={genero} value={genero}>
            {genero.charAt(0) + genero.slice(1).toLowerCase()}
          </option>
        ))}
      </SelectMobile>
    </>
  );
}
