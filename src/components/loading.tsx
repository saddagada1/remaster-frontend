import { ReloadIcon } from "@radix-ui/react-icons";

export const SimpleLoading: React.FC = ({}) => {
  return (
    <p className="p my-8 flex w-full items-center justify-center">
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </p>
  );
};

const Loading: React.FC = ({}) => {
  return (
    <div className="section flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="logo font-display">Remaster</h1>
      <p className="p flex items-center justify-center">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </p>
    </div>
  );
};

export default Loading;
