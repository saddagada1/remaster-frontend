import { useAppSelector } from "@/lib/redux/hooks";
import Orb from "./orb";
import EditRemasterModal from "./remasters/editRemasterModal";
import { Button } from "./ui/button";
import NoData from "./noData";

const Topbar: React.FC = ({}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);

  if (!metadata) {
    return <div className="topbar section" />;
  }
  return (
    <nav className="topbar">
      <Orb orientation="top" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="section">
          <h1 className="label">Name</h1>
          <p className="p truncate">{metadata.name}</p>
        </div>
        <div className="flex gap-2">
          <EditRemasterModal />
          <Button className="flex-1">Save</Button>
        </div>
      </div>
    </nav>
  );
};

const Sidebar: React.FC = ({}) => {
  const metadata = useAppSelector((store) => store.remaster.metadata);

  if (!metadata) {
    return <div className="sidebar section" />;
  }

  return (
    <nav className="sidebar">
      <Orb orientation="side" grain />
      <div className="section flex gap-2 bg-muted">
        <EditRemasterModal />
        <Button className="flex-1">Save</Button>
      </div>
      <div className="section">
        <h1 className="label">Name</h1>
        <p className="p">{metadata.name}</p>
      </div>
      <div className="section flex-1">
        <h1 className="label">Description</h1>
        {metadata.description && metadata.description.length > 0 ? (
          <p className="p">{metadata.description}</p>
        ) : (
          <NoData />
        )}
      </div>
    </nav>
  );
};

export { Sidebar, Topbar };
