import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateComposition } from "@/lib/redux/slices/remasterSlice";
import NoData from "../noData";

interface CompositionViewProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const CompositionView: React.FC<CompositionViewProps> = ({
  disabled,
  className,
  ...props
}) => {
  const state = useAppSelector((store) => store.remaster);
  const dispatch = useAppDispatch();

  return (
    <div {...props} className={cn("section flex flex-col gap-2", className)}>
      <h1 className="label">Composition</h1>
      {state.playingLoop ? (
        <Textarea
          className="flex-1 resize-none font-mono disabled:cursor-auto disabled:opacity-100"
          value={state.playingLoop.composition}
          onChange={(e) => dispatch(updateComposition(e.currentTarget.value))}
          disabled={disabled}
          onKeyDown={(e) => e.stopPropagation()}
          wrap="off"
        />
      ) : (
        <NoData>No Loop :(</NoData>
      )}
    </div>
  );
};

export default CompositionView;
