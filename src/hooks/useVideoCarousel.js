import * as React from "react";

// count        = number of videos actually rendered
// visibleCount = how many cards fit in the viewport at the current breakpoint
// The carousel scrolls one card at a time until the LAST video is fully visible
// (maxIndex), then the next press / swipe wraps back to the first.
export const useVideoCarousel = (count = 0, visibleCount = 1) => {
  const visible = Math.max(1, visibleCount);
  const maxIndex = Math.max(0, count - visible);

  const [activeIndex, setActiveIndex] = React.useState(0);
  // Missing key = muted. Only an explicit `false` means the viewer un-muted that video.
  const [mutedMap, setMutedMap] = React.useState({});
  const [dragStartX, setDragStartX] = React.useState(null);
  const videoRefs = React.useRef([]);

  // Keep the position valid if the number of videos or visible cards changes (resize, new content)
  React.useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goToPrevious = React.useCallback(() => {
    setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }, [maxIndex]);

  const goToNext = React.useCallback(() => {
    setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }, [maxIndex]);

  const toggleMute = React.useCallback((index) => {
    setMutedMap((current) => ({ ...current, [index]: current[index] === false }));
  }, []);

  // Play every card currently in view; pause and rewind the rest
  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = mutedMap[index] !== false;
      const inView = index >= activeIndex && index < activeIndex + visible;
      if (inView) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, mutedMap, visible, count]);

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