type Props = {
  text?: string;
  id?: string;
};

const ErrorText = ({ text, id }: Props) => {
  if (!text) {
    return null;
  }

  return (
    <p className="animate-fade-in text-xs font-medium text-alert-error" id={id}>
      {text}
    </p>
  );
};

export default ErrorText;
