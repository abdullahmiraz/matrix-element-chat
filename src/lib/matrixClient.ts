import { MatrixClient, createClient, Preset, Visibility } from "matrix-js-sdk";
import type { Room } from "matrix-js-sdk";

let client: MatrixClient | null = null;

export function getClient() {
  return client;
}

export async function loginWithPassword({
  homeserverUrl,
  username,
  password,
}: {
  homeserverUrl: string;
  username: string;
  password: string;
}): Promise<MatrixClient> {
  client = createClient({ baseUrl: homeserverUrl });
  await client.loginWithPassword(username, password);
  await client.startClient();
  return client;
}

export async function registerWithPassword({
  homeserverUrl,
  username,
  password,
}: {
  homeserverUrl: string;
  username: string;
  password: string;
}): Promise<MatrixClient> {
  client = createClient({ baseUrl: homeserverUrl });

  // Register the user
  await client.registerRequest({
    username,
    password,
    auth: {
      type: "m.login.dummy",
    },
  });

  // Start the client after registration
  await client.startClient();
  return client;
}

export async function createDirectMessage(userId: string): Promise<string> {
  if (!client) {
    throw new Error("Not logged in");
  }

  // Create a direct message room
  const result = await client.createRoom({
    preset: Preset.PrivateChat,
    visibility: Visibility.Private,
    invite: [userId],
    is_direct: true,
  });

  return result.room_id;
}

export function getDirectMessageRooms(): Room[] {
  if (!client) return [];

  return client.getRooms().filter((room) => {
    // Check if it's a direct message room
    const members = room.getJoinedMembers();
    return members.length === 2 && room.getMyMembership() === "join";
  });
}

export function logout() {
  if (client) {
    client.stopClient();
    client = null;
  }
}
