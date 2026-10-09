import * as React from "react";
import { teamMembers as fallbackMembers } from "../../data/team";
import { chunk, mediaAlt, mediaUrl } from "../../utils/acf";

const splitRoles = (roles) =>
  Array.isArray(roles)
    ? roles
    : String(roles || "")
        .split(",")
        .map((role) => role.trim())
        .filter(Boolean);

// WordPress members -> the shape this component uses. Falls back to src/data/team.js if none.
const normaliseMembers = (members) => {
  const fromWp = (members || [])
    .map((member, index) => ({
      id: `${member.firstName}-${index}`,
      firstName: member.firstName,
      lastName: member.lastName,
      roles: splitRoles(member.roles),
      bio: member.bio,
      image: mediaUrl(member.photo),
      imageAlt: mediaAlt(member.photo, `${member.firstName} ${member.lastName}`),
      linkedinUrl: member.linkedinUrl,
    }))
    .filter((member) => member.firstName);

  if (fromWp.length) return fromWp;

  return fallbackMembers.map((member) => ({
    ...member,
    imageAlt: `${member.firstName} ${member.lastName}`,
    linkedinUrl: member.linkedinUrl || "",
  }));
};

// A link when the member has a LinkedIn URL, otherwise the original (inert) button.
const LinkedInButton = ({ url, name, className = "" }) => {
  const classes = `group relative flex items-center justify-center transition-transform duration-200 hover:scale-105 ${className}`;
  const icons = (
    <>
      <img
        src="/figma/icons/icon-linkedin.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
      />
      <img
        src="/figma/icons/icon-linkedin-hvr.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </>
  );
  const label = `${name} on LinkedIn`;

  return url ? (
    <a href={url} target="_blank" rel="noreferrer" aria-label={label} className={classes}>
      {icons}
    </a>
  ) : (
    <button type="button" aria-label={label} className={classes}>
      {icons}
    </button>
  );
};

// Page-builder layout: "team"
// fields: heading (Text), members (repeater: first_name, last_name, roles, bio, photo, linkedin_url)
const TeamSection = ({ heading, members }) => {
  const team = React.useMemo(() => normaliseMembers(members), [members]);
  const [activeId, setActiveId] = React.useState(team[0]?.id);
  const activeMember = team.find((member) => member.id === activeId) || team[0];
  const rows = React.useMemo(() => chunk(team, 3), [team]);

  if (!activeMember) return null;

  const fullName = `${activeMember.firstName} ${activeMember.lastName}`;

  return (
    <section className="w-full overflow-x-clip bg-brand-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-layout-shell px-6 sm:px-10 lg:px-12">
        <div className="lg:hidden">
          <h2 className="mb-5 text-2xl font-black text-brand-slate sm:text-3xl">{heading}</h2>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {team.map((member) => {
              const isActive = activeMember.id === member.id;

              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveId(member.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:text-base ${
                    isActive ? "bg-brand-yellow text-white" : "text-brand-text-muted hover:bg-brand-teal hover:text-white"
                  }`}
                >
                  {member.firstName}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto] items-start gap-4 md:grid-cols-[minmax(0,360px)_1fr] md:gap-8">
            <div className="overflow-hidden rounded-[20px] shadow-md">
              <img
                src={activeMember.image}
                alt={activeMember.imageAlt}
                className="aspect-[4/5] w-full object-cover md:max-h-[460px]"
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <h3 className="text-3xl font-black leading-[0.95] tracking-[-0.06em] text-brand-slate md:text-5xl">
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

                <LinkedInButton url={activeMember.linkedinUrl} name={fullName} className="h-12 w-12" />
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-[22rem] md:max-w-none">
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {activeMember.roles.map((role) => (
                <span key={role} className="text-sm font-bold tracking-tight text-brand-slate md:text-base">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-text-muted md:text-lg">{activeMember.bio}</p>
        </div>

        <div className="hidden grid-cols-1 items-start gap-10 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="mb-6 text-2xl font-black text-brand-slate sm:text-3xl">{heading}</h2>

            <div className="overflow-hidden rounded-[20px] shadow-md">
              <img
                src={activeMember.image}
                alt={activeMember.imageAlt}
                className="aspect-[4/5] w-full object-cover lg:max-h-[580px]"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3 sm:gap-4">
              {rows.map((row, rowIndex) => (
                <div
                  key={`team-row-${rowIndex}`}
                  className={`flex flex-wrap gap-3 sm:gap-4 ${rowIndex === 1 ? "ml-6 sm:ml-10 lg:ml-14" : ""}`}
                >
                  {row.map((member) => {
                    const isActive = activeMember.id === member.id;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setActiveId(member.id)}
                        className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 sm:text-base ${
                          isActive ? "bg-brand-yellow text-white" : "text-brand-text-muted hover:bg-brand-teal hover:text-white"
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
                    <span key={role} className="text-sm font-bold tracking-tight text-brand-slate sm:text-base">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <p className="my-6 max-w-xl text-base leading-relaxed text-brand-text-muted sm:text-lg">{activeMember.bio}</p>

              <div className="max-w-xl">
                <div className="flex items-center justify-center gap-5 sm:gap-6">
                  <button
                    type="button"
                    className="group flex h-16 w-16 transform items-center justify-center rounded-full bg-brand-teal text-center text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-yellow sm:h-18 sm:w-18"
                    aria-label={`Message ${activeMember.firstName}`}
                  >
                    <span className="text-team-badge font-extrabold sm:text-team-badge-sm">
                      Msg
                      <br />
                      {activeMember.firstName}
                    </span>
                  </button>

                  <LinkedInButton url={activeMember.linkedinUrl} name={fullName} className="h-12 w-12 sm:h-14 sm:w-14" />
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
