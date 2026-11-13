type Props = {
  text?: string;
};

const EmptyComponent = ({ text = 'Nada encontrado' }: Props) => {
  return (
    <div className="my-auto flex items-center justify-center py-10">
      <p className="text-center text-sm text-neutral-400">{text}</p>
    </div>
  );
};

export default EmptyComponent;
