import data from "./buttons.json";
import { Button } from "./Buttons.styled";

export const Buttons = () => {
  const { buttons } = data;

  return (
    <>
      {buttons.map(({ id, value }) => (
        <Button type="button" key={id} id={id} value={value}>
          {value}
        </Button>
      ))}
    </>
  );
};
