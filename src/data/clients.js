export const clientLogos = [
  { name: "Argos", src: "/figma/images/client-1.png" },
  { name: "Soap & Glory", src: "/figma/images/client-2.png" },
  { name: "Macmillan Cancer Support", src: "/figma/images/client-3.png" },
  { name: "Kopparberg", src: "/figma/images/client-4.png" },
  { name: "Ladbrokes", src: "/figma/images/client-5.png" },
  { name: "Co-op", src: "/figma/images/client-6.png" },
  { name: "Business Insider", src: "/figma/images/client-7.png" },
  { name: "The Gym Group", src: "/figma/images/client-8.png" },
  { name: "The Telegraph", src: "/figma/images/client-9.png" },
];

export const firstSlide = clientLogos.slice(0, 9);
export const secondSlide = [...clientLogos, ...clientLogos].slice(9, 18);
