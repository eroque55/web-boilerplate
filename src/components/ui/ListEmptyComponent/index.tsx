type Props = {
  message?: string;
};

const ListEmptyComponent = ({ message = 'Nada encontrado.' }: Props) => {
  return (
    <div className="my-auto flex items-center justify-center py-10">
      <p className="text-center text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default ListEmptyComponent;
