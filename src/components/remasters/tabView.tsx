import { cn } from "@/lib/utils";
import { useState, type HTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffectOnce } from "usehooks-ts";
import { tuning } from "@/lib/constants";

interface TabViewProps extends HTMLAttributes<HTMLDivElement> {
  tuningIndex: number;
}

const TabView: React.FC<TabViewProps> = ({
  tuningIndex,
  className,
  ...props
}) => {
  const state = useAppSelector((store) => store.remaster);
  const [barTemplate, setBarTemplate] = useState(``);
  const [sectionTemplate, setSectionTemplate] = useState(``);
  const [tab, setTab] = useState(
    state.repeatingLoop?.composition ?? state.playingLoop?.composition ?? ``,
  );

  //   useEffectOnce(() => {
  //     let sTemplate = ``;
  //     const sTemplateLine = `|------------------|------------------|------------------|------------------|------------------|`;
  //     let bTemplate = ``;
  //     const bTemplateLine = `|------------------`;
  //     tuning[tuningIndex]?.notes
  //       .slice(0)
  //       .reverse()
  //       .map((note, index) => {
  //         if (index !== tuning[tuningIndex]!.notes.length - 1) {
  //           sTemplate =
  //             sTemplate +
  //             note +
  //             (note.length > 1 ? " " : "  ") +
  //             sTemplateLine +
  //             "\n";
  //           bTemplate =
  //             bTemplate +
  //             note +
  //             (note.length > 1 ? " " : "  ") +
  //             bTemplateLine +
  //             "\n";
  //         } else {
  //           sTemplate =
  //             sTemplate + note + (note.length > 1 ? " " : "  ") + sTemplateLine;
  //           bTemplate =
  //             bTemplate + note + (note.length > 1 ? " " : "  ") + bTemplateLine;
  //         }
  //       });
  //     setSectionTemplate(sTemplate);
  //     setBarTemplate(bTemplate);
  //   });

  return (
    <div {...props} className={cn("section flex flex-col", className)}>
      <div className="flex justify-between">
        <h1 className="label">Composition</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setTab((prev) => prev + barTemplate)}
          >
            Add Bar
          </Button>
          <Button
            variant="outline"
            onClick={() => setTab((prev) => prev + `\n\n` + sectionTemplate)}
          >
            Add Section
          </Button>
          <Button variant="destructive">Clear</Button>
        </div>
      </div>
      <Textarea
        className="mono flex-1 resize-none"
        value={tab}
        onChange={(e) => setTab(e.currentTarget.value)}
      />
    </div>
  );
};

export default TabView;
