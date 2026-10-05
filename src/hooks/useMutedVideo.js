import * as React from "react";

const useMutedVideo = () => {
  const [isMuted, setIsMuted] = React.useState(true);
  const toggleMuted = React.useCallback(() => setIsMuted((current) => !current), []);
  const resetMuted = React.useCallback(() => setIsMuted(true), []);
  return { isMuted, toggleMuted, resetMuted };
};

export default useMutedVideo;
