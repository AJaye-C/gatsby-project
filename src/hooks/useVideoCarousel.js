import * as React from "react";

// `count` = number of videos currently in the carousel (from WordPress).
// Next goes forward one video at a time and only wraps to the first video after the last one.
export const useVideoCarousel = (count = 0) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  // Only videos the viewer has un-muted are stored; anything missing counts as muted.
  const [mutedMap, setMutedMap] = React.useState({});
  const [dragStartX, setDragStartX] = React.useState(null);
  const videoRefs = React.useRef([]);

  // If videos are removed in WordPress, keep the index in range
  React.useEffect(() => {
    if (count > 0 && activeIndex > count - 1) setActiveIndex(count - 1);
  }, [count, activeIndex]);

  const goToPrevious = React.useCallback(() => {
    if (count < 1) return;
    setActiveIndex((current) => (current <= 0 ? count - 1 : current - 1));
  }, [count]);

  const goToNext = React.useCallback(() => {
    if (count < 1) return;
    setActiveIndex((current) => (current >= count - 1 ? 0 : current + 1));
  }, [count]);

  const toggleMute = React.useCallback((index) => {
    setMutedMap((current) => ({ ...current, [index]: !(current[index] !== false) }));
  }, []);

  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = mutedMap[index] !== false;
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
