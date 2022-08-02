import { History, Wrapper } from "./Display.styled";

export const Display = ({ input, history }) => {
  return (
    <Wrapper>
      <History>{history}</History>
      <p id="display">{input}</p>
    </Wrapper>
  );
};
