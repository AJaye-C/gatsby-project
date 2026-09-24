import * as React from "react";
import { teamRows, teamMembers } from "../../data/team";
import { useActiveTeamMember } from "../../hooks/useActiveTeamMember";

const TeamSection = () => {
  const { activeTeamId, setActiveTeamId, activeMember } = useActiveTeamMember();

  return (
    <section className="w-full bg-brand-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="lg:hidden">
          <h2 className="mb-5 text-2xl font-black text-brand-slate sm:text-3xl">Meet the Team</h2>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {teamRows.flat().map((memberName) => {
              const member = teamMembers.find((item) => item.firstName === memberName);
              const isActive = activeTeamId === member.id;

              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveTeamId(member.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "bg-brand-yellow text-white" : "text-brand-text-muted hover:bg-brand-teal hover:text-white"
                  }`}
                >
                  {member.firstName}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto] items-start gap-4">
            <div className="overflow-hidden rounded-[20px] shadow-md">
              <img
                src={activeMember.image}
                alt={`${activeMember.firstName} ${activeMember.lastName}`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <h3 className="text-3xl font-black leading-[0.95] tracking-[-0.06em] text-brand-slate">
                <span className="block text-brand-yellow">{activeMember.firstName}</span>
                <span className="block text-xl font-black text-brand-teal">{activeMember.lastName}</span>
              </h3>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="group flex h-16 w-16 transform items-center justify-center rounded-full bg-brand-teal text-center text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-yellow"
                  aria-label={`Message ${activeMember.firstName}`}
                >
                  <span className="text-[0.7rem] font-extrabold leading-[0.9]">
                    Msg
                    <br />
                    {activeMember.firstName}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="LinkedIn"
                  className="group relative flex h-12 w-12 items-center justify-center transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src="/figma/icons/icon-linkedin.svg"
                    alt="LinkedIn"
                    className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <img
                    src="/figma/icons/icon-linkedin-hvr.svg"
                    alt="LinkedIn hover"
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-[22rem]">
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {activeMember.roles.map((role) => (
                <span key={role} className="text-sm font-bold tracking-tight text-brand-slate">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 text-base leading-relaxed text-brand-text-muted">
            {activeMember.bio}
          </p>
        </div>

        <div className="hidden grid-cols-1 items-start gap-10 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="mb-6 text-2xl font-black text-brand-slate sm:text-3xl">Meet the Team</h2>

            <div className="overflow-hidden rounded-[20px] shadow-md">
              <img
                src={activeMember.image}
                alt={`${activeMember.firstName} ${activeMember.lastName}`}
                className="aspect-[4/5] w-full object-cover lg:max-h-[580px]"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3 sm:gap-4">
              {teamRows.map((row, rowIndex) => (
                <div
                  key={`team-row-${rowIndex}`}
                  className={`flex flex-wrap gap-3 sm:gap-4 ${rowIndex === 1 ? "ml-6 sm:ml-10 lg:ml-14" : ""}`}
                >
                  {row.map((memberName) => {
                    const member = teamMembers.find((item) => item.firstName === memberName);
                    const isActive = activeTeamId === member.id;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setActiveTeamId(member.id)}
                        className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 sm:text-base ${
                          isActive
                            ? "bg-brand-yellow text-white"
                            : "text-brand-text-muted hover:bg-brand-teal hover:text-white"
                        }`}
                      >
                        {member.firstName}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <h3 className="text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                <span className="text-brand-yellow">{activeMember.firstName}</span>
                <span className="ml-2 inline-block align-bottom text-2xl font-black text-brand-teal sm:ml-3 sm:text-4xl lg:text-4xl">
                  {activeMember.lastName}
                </span>
              </h3>

              <div className="mt-6 max-w-[22rem] sm:max-w-[26rem]">
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {activeMember.roles.map((role) => (
                    <span
                      key={role}
                      className="text-sm font-bold tracking-tight text-brand-slate sm:text-base"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <p className="my-6 max-w-xl text-base leading-relaxed text-brand-text-muted sm:text-lg">
                {activeMember.bio}
              </p>

              <div className="max-w-xl">
                <div className="flex items-center justify-center gap-5 sm:gap-6">
                    <button
                    type="button"
                    className="group flex h-16 w-16 transform items-center justify-center rounded-full bg-brand-teal text-center text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-yellow sm:h-18 sm:w-18"
                    aria-label={`Message ${activeMember.firstName}`}
                    >
                    <span className="text-[0.7rem] font-extrabold leading-[0.9] sm:text-[0.78rem]">
                        Msg
                        <br />
                        {activeMember.firstName}
                    </span>
                    </button>

                    <button
                    type="button"
                    aria-label="LinkedIn"
                    className="group relative flex h-12 w-12 items-center justify-center transition-transform duration-200 hover:scale-105 sm:h-14 sm:w-14"
                    >
                    <img
                        src="/figma/icons/icon-linkedin.svg"
                        alt="LinkedIn"
                        className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                    />
                    <img
                        src="/figma/icons/icon-linkedin-hvr.svg"
                        alt="LinkedIn hover"
                        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;