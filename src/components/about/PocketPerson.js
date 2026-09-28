import * as React from "react";

const PocketPerson = () => {
  const [isMuted, setIsMuted] = React.useState(true);

  const toggleMute = () => {
    setIsMuted((current) => !current);
  };

  return (
    <section className="w-full bg-[#F2F2F2] pb-24 pt-16 md:pb-32 md:pt-24 lg:pb-[145px] lg:pt-[100px]">
      <div className="mx-auto max-w-[1563px] px-4 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-[1411px] text-[clamp(1.75rem,2.08vw,2.5rem)] font-normal leading-[1.2] tracking-[-0.05em] text-black">
          Want to know a bit more about who we work with, and <strong className="font-bold">what makes a &apos;Pocket Person&apos;?</strong>  Go behind the scenes to see how we work in action…
        </p>

        <div className="mt-12 md:mt-16 lg:mt-[72px]">
          <video
            src="/figma/videos/pocketperson.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onClick={toggleMute}
            className="block aspect-[1563/738] w-full cursor-pointer object-cover"
            aria-label="Pocket Person behind-the-scenes video"
          />
          <p className="mt-2 text-left text-base font-medium leading-[2] tracking-[-0.05em] text-brand-slate">
            *Click on Video to toggle sound
          </p>
        </div>
      </div>
    </section>
  );
};

export default PocketPerson;
