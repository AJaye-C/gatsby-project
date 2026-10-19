import * as React from "react";

// Lets a component that still uses its ORIGINAL prop names be driven by the NEW ACF / GraphQL names.
//
//   adaptProps(Hero, { rename: { intro: "heading" } })
//     -> the page builder passes `heading`, Hero receives it as `intro`.
//
//   adaptProps(Logos, { lists: { logos: { logo: "image" } } })
//     -> every item of the `logos` list has its `image` field handed over as `logo`.
//
// rename / lists are written as { oldName: newName }.
// Remove an entry once the component itself has been renamed to the new prop.
const adaptProps = (Component, { rename = {}, lists = {} } = {}) => {
  const Adapted = (props) => {
    const next = { ...props };

    Object.entries(rename).forEach(([oldName, newName]) => {
      if (newName in next) {
        next[oldName] = next[newName];
        delete next[newName];
      }
    });

    Object.entries(lists).forEach(([listName, fields]) => {
      const list = next[listName];
      if (!Array.isArray(list)) return;
      next[listName] = list.map((item) => {
        if (!item) return item;
        const copy = { ...item };
        Object.entries(fields).forEach(([oldField, newField]) => {
          if (newField in copy) {
            copy[oldField] = copy[newField];
            delete copy[newField];
          }
        });
        return copy;
      });
    });

    return <Component {...next} />;
  };

  Adapted.displayName = `adaptProps(${Component.displayName || Component.name || "Component"})`;
  return Adapted;
};

export default adaptProps;
