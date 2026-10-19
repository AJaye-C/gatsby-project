import * as React from "react";

const BlogCategoryDropdown = ({ categories, selected, onSelect }) => {
  const triggerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const selectedCategory = categories.find((category) => category.key === selected);
  const options = categories.filter((category) => category.key !== selected);

  React.useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!panelRef.current?.contains(event.target) && !triggerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const handleBlur = (event) => {
    if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const buttons = [...panelRef.current.querySelectorAll("button")];
      const current = buttons.indexOf(document.activeElement);
      const next = event.key === "ArrowDown" ? current + 1 : current - 1;
      buttons[(next + buttons.length) % buttons.length]?.focus();
    }
  };

  return (
    <div onBlur={handleBlur} className="relative mx-auto mb-14 w-[clamp(220px,61vw,320px)] md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="blog-category-options"
        aria-label={`Category: ${selectedCategory?.label || selected}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleKeyDown}
        className="flex h-[42px] w-full items-center justify-center border-2 border-black bg-brand-bg px-3 text-[18px] font-normal uppercase text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
      >
        <span>{selectedCategory?.filterLabel || selectedCategory?.label || selected}</span>
        <img
          src="/figma/icons/icon-arrow-down.svg"
          alt=""
          aria-hidden="true"
          className={`absolute right-3 h-3 w-3 transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div ref={panelRef} id="blog-category-options" className="absolute left-0 right-0 top-[42px] z-40 max-h-[calc(100dvh-120px)] overflow-y-auto border-2 border-t-0 border-black bg-brand-bg">
          {options.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => {
                onSelect(category.key);
                setOpen(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
              }}
              className="flex h-[42px] w-full items-center justify-center border-t border-black px-2 text-[18px] font-normal uppercase text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal"
            >
              {category.filterLabel || category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCategoryDropdown;
