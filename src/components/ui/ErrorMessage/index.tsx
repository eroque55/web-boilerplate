type Props = {
  message: string;
  id?: string;
};

const ErrorMessage = ({ message, id }: Props) => {
  return (
    <p className="animate-fade-in text-xs font-medium text-red" id={id}>
      {message}
    </p>
  );
};

export default ErrorMessage;
