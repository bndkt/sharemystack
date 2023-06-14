import { Avatar } from "tamagui";

export function ImageIcon({ src }: { src?: string | null }) {
  return (
    <Avatar circular size="$3">
      {src && <Avatar.Image source={{ uri: src, width: 400, height: 400 }} />}
      <Avatar.Fallback bc="#f43f5e" />
    </Avatar>
  );
}
