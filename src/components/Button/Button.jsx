import { LoadButton } from 'components/Button/Button.styled';
export const Button = ({ onClick }) => {
  return (
    <LoadButton onClick={onClick} type="button">
      Load more
    </LoadButton>
  );
};
