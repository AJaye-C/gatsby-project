import * as React from "react";
import { videoCategories } from "../data/videos";

export const useVideoCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mutedMap, setMutedMap] = React.useState({ 0: true, 1: true, 2: true });
  const [dragStartX, setDragStartX] = React.useState(null);
  const videoRefs = React.useRef([]);

  const goToPrevious = React.useCallback(() => {
    setActiveIndex((current) => (current === 0 ? videoCategories.length - 1 : current - 1));
  }, []);

  const goToNext = React.useCallback(() => {
    setActiveIndex((current) => (current === videoCategories.length - 1 ? 0 : current + 1));
  }, []);

  const toggleMute = React.useCallback((index) => {
    setMutedMap((current) => ({ ...current, [index]: !current[index] }));
  }, []);

  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = Boolean(mutedMap[index]);
      if (index === activeIndex) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, mutedMap]);

  const handleDragStart = (clientX) => setDragStartX(clientX);

  const handleDragEnd = (clientX) => {
    if (dragStartX === null) return;

    const delta = clientX - dragStartX;
    if (delta < -60) {
      goToNext();
    } else if (delta > 60) {
      goToPrevious();
    }

    setDragStartX(null);
  };

  return {
    activeIndex,
    mutedMap,
    videoRefs,
    goToPrevious,
    goToNext,
    toggleMute,
    handleDragStart,
    handleDragEnd,
  };
};
