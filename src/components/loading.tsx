import { ReloadIcon } from "@radix-ui/react-icons";

const Loading: React.FC = ({}) => {
  return (
    <div className="section flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="logo font-display">Remaster</h1>
      <p className="flex items-center justify-center text-sm font-medium hr:text-base">
        <ReloadIcon className="mr-2 inline-block h-4 w-4 animate-spin" />
        Please wait
      </p>
    </div>
  );
};

export default Loading;
