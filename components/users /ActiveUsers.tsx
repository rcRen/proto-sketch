import React, { useMemo } from "react";
import { Avatar } from "./Avatar";
import { RoomProvider, useOthers, useSelf } from "@/liveblocks.config";
import { useRouter } from "next/router";
import styles from "./ActiveUsers.module.css";
import { generateRandomName } from "@/lib/utils";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memorizedUsers = useMemo(() => {
    return (
      <div className="flex items-center justify-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && (
            <div className="relative ml-8 first:ml-0">
              <Avatar
                otherStyles="border-[3px] border-primary-green"
                name="You"
              />
            </div>
          )}

          {users.slice(0, 3).map(({ connectionId }) => {
            return (
              <Avatar
                key={connectionId}
                name={generateRandomName()}
                otherStyles="-ml-3"
              />
            );
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}
        </div>
      </div>
    );
  }, [users.length]);

  return memorizedUsers;
};

export default ActiveUsers;
// export default function Page() {
//   const roomId = useOverrideRoomId("nextjs-live-avatars");

//   return (
//     <RoomProvider id={roomId} initialPresence={{}}>
//       <Example />
//     </RoomProvider>
//   );
// }

// export async function getStaticProps() {
//   const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
//   const API_KEY_WARNING = process.env.CODESANDBOX_SSE
//     ? `Add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` secret in CodeSandbox.\n` +
//       `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#codesandbox.`
//     : `Create an \`.env.local\` file and add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` environment variable.\n` +
//       `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#getting-started.`;

//   if (!API_KEY) {
//     console.warn(API_KEY_WARNING);
//   }

//   return { props: {} };
// }

// /**
//  * This function is used when deploying an example on liveblocks.io.
//  * You can ignore it completely if you run the example locally.
//  */
// function useOverrideRoomId(roomId: string) {
//   const { query } = useRouter();
//   const overrideRoomId = useMemo(() => {
//     return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
//   }, [query, roomId]);

//   return overrideRoomId;
// }
