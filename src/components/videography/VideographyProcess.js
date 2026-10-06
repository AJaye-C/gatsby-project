import * as React from "react";
import PhotographyProcess from "../photography/PhotographyProcess";

const videographyRows = [
  {
    heading: "How we work",
    image: "/figma/images/video/we-work.png",
    alt: "Man holding a camera gimbal rig beside a woman in sunglasses",
    paragraphs: [
      "We aim to simplify the video production commissioning process as much as possible.",
      "At the start of your project we’ll sit down with you to thoroughly discuss your brief, to understand your vision and goals for the project, and to nail down the video production services and other support you’ll need from our videography company. We’ll also cover things like our flexible quoting options and your budget at this point too. After defining the project scope, we’ll finalise the creative approach, set dates for key milestones and capture footage.",
      "The edit phase – which is typically longer than the pre-production or production phases, includes multiple days for review and changes to be made, in order to make your video the best end product it can be. Throughout the post-production process we’ll be happy to provide online viewing copies for review, or you can join us for in-person editing.",
    ],
  },
  {
    heading: "Technically speaking",
    image: "/figma/images/video/speak.png",
    alt: "Cinema camera on a rig with a monitor and matte box",
    paragraphs: [
      <React.Fragment key="camera">Our video production services are delivered using cutting-edge <strong className="font-bold text-brand-teal">Panasonic S1H cameras</strong>, offering exceptional image quality in challenging lighting. These cameras support up to 6K resolution and high-quality slow motion.</React.Fragment>,
      <React.Fragment key="equipment">We also offer customised solutions with <strong className="font-bold text-brand-teal">RED, Blackmagic, Canon C Series</strong> and <strong className="font-bold text-brand-teal">Kinefinity Mavo</strong> cameras, again providing up to 6K capture with enhanced detail and impactful slow-motion capabilities. Standard additions to this video capture equipment include sound, lighting and creative options like sliders, gimbals and GoPros, with further additional features available.</React.Fragment>,
    ],
  },
  {
    heading: "The whole package",
    image: "/figma/images/video/pack.png",
    alt: "Street with trees and a billboard showing the Pocket Creatives studio sign",
    paragraphs: [
      "We offer comprehensive in-house video production services covering pre-production, planning, scripting, talent and location sourcing, production, edit, QC and delivery.",
      "Various strategic partnerships support our video production and videography services too – meaning we can help you source on-screen talent, specialised equipment and studio spaces. Additionally, our recommended suppliers offer agency, digital, design and web services.",
    ],
  },
];

const VideographyProcess = () => <PhotographyProcess rows={videographyRows} variant="videography" />;

// TODO: The Row 1 third paragraph follows Figma's punctuation exactly, including its opened dash/comma construction.
export default VideographyProcess;