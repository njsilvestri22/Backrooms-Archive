export type Kind = "level" | "entity" | "object" | "group" | "phenomenon" | "person";

export type SurvivalClass =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "habitable"
  | "deadzone"
  | "variable"
  | "psi"
  | "unknown";

export type Cluster =
  | "main-nine"
  | "inhabited"
  | "normal"
  | "sublevel"
  | "enigmatic"
  | "negative"
  | "anomalous";

export type ArchiveEntry = {
  kind: Kind;
  id: string;
  code: string;
  name: string;
  class: SurvivalClass;
  summary: string;
  image: string;
  cluster?: Cluster;
  body: string[];
  tags: string[];
  related: string[];
  exits?: string[];
  aliases?: string[];
  canon?: string;
};
