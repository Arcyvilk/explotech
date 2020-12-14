export type WsMessage = {
  type: string;
  [key: string]: any;
};

export type Participant = {
  user: string;
  active: boolean;
};
export type RoomProps = {
  user?: string;
};
