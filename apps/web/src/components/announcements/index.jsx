/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Flex, Text } from "@theme-ui/components";
import { Cross } from "../icons";
import { ANALYTICS_EVENTS, trackEvent } from "../../utils/analytics";
import AnnouncementBody from "./body";
import { useStore as useAnnouncementStore } from "../../stores/announcement-store";
import Notice from "../notice";
import { ThemeVariant } from "../theme-provider";
import { alpha } from "@theme-ui/color";

function Announcements() {
  const announcements = useAnnouncementStore(
    (store) => store.inlineAnnouncements
  );
  const dismiss = useAnnouncementStore((store) => store.dismiss);
  const announcement = announcements[0];

  if (!announcement) return <Notice />;
  return (
    <ThemeVariant variant="secondary">
      <Flex
        mx={1}
        mb={2}
        py={2}
        bg="background"
        sx={{
          borderRadius: "default",
          position: "relative",
          flexDirection: "column"
        }}
      >
        <Text
          p="2px"
          sx={{
            bg: alpha("red", 0.2),
            position: "absolute",
            right: 2,
            top: 2,
            borderRadius: 50,
            cursor: "pointer",
            alignSelf: "end"
          }}
          title="Dismiss announcement"
          onClick={() => {
            trackEvent(ANALYTICS_EVENTS.announcementDismissed, announcement);
            dismiss(announcement.id);
          }}
        >
          <Cross size={16} color="red" />
        </Text>
        <AnnouncementBody components={announcement.body} type="inline" />
      </Flex>
    </ThemeVariant>
  );
}

export default Announcements;
