import { Dimmer, Loader } from "semantic-ui-react";

export default function LoaderFallback({ mensagem }) {
  return (
    <Dimmer active inverted>
      <Loader>{mensagem}</Loader>
    </Dimmer>
  );
}
