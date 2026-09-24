import * as React from "react";
import { teamMembers } from "../data/team";

export const useActiveTeamMember = (initialId = "steven") => {
  const [activeTeamId, setActiveTeamId] = React.useState(initialId);

  const activeMember = React.useMemo(
    () => teamMembers.find((member) => member.id === activeTeamId) ?? teamMembers[0],
    [activeTeamId],
  );

  return { activeTeamId, setActiveTeamId, activeMember };
};
