import { type RefObject, useEffect } from "react";

export const useScrollBottom = (
  chatBottomRef: RefObject<HTMLDivElement | null>,
  roomId: string,
  loading: boolean
) => {
  useEffect(() => {
    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading, chatBottomRef]);
};
