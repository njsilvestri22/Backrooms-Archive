import { IMG, entry, lvl } from "./entry";
import type { ArchiveEntry } from "./types";

export const coreLevels: ArchiveEntry[] = [
  entry({
    kind: "level", id: "level-0", code: "Level 0", name: "The Lobby", class: "1", cluster: "main-nine",
    image: IMG.yellow, tags: ["main-nine", "copypasta", "kane"], related: ["level-1", "smilers"],
    exits: ["level-1"],
    summary: "Damp yellow wallpaper, soaked beige carpet, the drone of fluorescent lights. If you have noclipped out of reality, this is probably where you landed.",
    body: [
      "If you're not careful and you noclip out of reality in the wrong areas, you'll end up in the Backrooms, where it's nothing but the stink of old moist carpet, the madness of mono-yellow, the endless background noise of fluorescent lights at maximum hum-buzz, and approximately six hundred million square miles of randomly segmented empty rooms to be trapped in.",
      "God save you if you hear something wandering around nearby, because it sure as hell has heard you.",
      "M.E.G. files treat Level 0 as the default spawn. Kane Pixels' analog tapes show an overlapping room: same lights, same wallpaper, a threshold event instead of a wiki door. Both canons agree on the hum.",
    ],
  }),
  entry({
    kind: "level", id: "level-1", code: "Level 1", name: "Habitable Zone", class: "1", cluster: "inhabited",
    image: IMG.warehouse, related: ["level-0", "level-2", "meg"], exits: ["level-2", "level-4"],
    summary: "Concrete, columns, hanging industrial lights. The first room that can keep you alive on purpose.",
    body: [
      "Level 1 is warehouse-scale and dim. Pallet marks, fog, a temperature that is almost kind. Almond water turns up in crates. M.E.G. and B.N.T.G. both keep caches here.",
      "Lights cycle. When they die, Hounds and Dullers hunt the dark. Stay near a column until they return.",
    ],
  }),
  lvl(2, "Pipe Dreams", "2", "Maintenance tunnels packed with pipes, valves, and heat. Claustrophobia with a work order.", { image: IMG.pipes, related: ["level-1", "level-3"] }),
  lvl(3, "Electrical Station", "3", "Switchgear, transformers, and a hum you feel in your teeth. The Backrooms' unlicensed power plant.", { image: IMG.electrical, related: ["level-2", "level-4"] }),
  lvl(4, "Abandoned Office", "0", "Empty cubicles, dead CRTs, rain on windows that have no outside. One of the safest numbered rooms.", { image: IMG.office, cluster: "inhabited", related: ["level-1", "level-5"] }),
  lvl(5, "Terror Hotel", "2", "An ornate hotel that wants you to stay. The Beast in the boiler, Jerry in the walls, and a lobby that remembers your name.", { image: IMG.hotel, related: ["beast-of-level-5", "jerry"] }),
  lvl(6, "Lights Out", "4", "A level of near-total darkness. Light sources fail. Sound is the only map, and it lies.", { image: IMG.dark, related: ["level-6-1", "wretches"] }),
  lvl(7, "Thalassophobia", "4", "An indoor ocean under a warehouse roof. A catwalk, black water, and something too large underneath.", { image: IMG.ocean, related: ["the-thing", "level-7-1"] }),
  lvl(8, "Cave System", "4", "Wet limestone, drop caverns, and nests. The Main Nine's underground.", { image: IMG.cave, related: ["deathmoths", "hounds"] }),
  lvl(9, "The Suburbs", "2", "Identical houses, sodium streetlights, empty sidewalks. Night is the default.", { image: IMG.suburbs, related: ["level-9-1", "facelings"] }),
  lvl(10, "Field of Wheat", "1", "An endless wheat field under an overcast sky. Peaceful until the wheat moves against the wind.", { image: IMG.wheat, related: ["level-11"] }),
  lvl(11, "The Endless City", "1", "A downtown with working infrastructure and no drivers. The first city that feels like it could be home.", { image: IMG.city, cluster: "inhabited", related: ["level-9", "facelings"] }),
  lvl(37, "The Poolrooms", "1", "Endless connected pools, cream tile, still cyan water, columns standing in silence.", { image: IMG.pool, related: ["level-0", "hydrolitis"] }),
  lvl(94, "Motion", "2", "A suburban dream that animates when you look away. Furniture slides. The sky is a texture.", { image: IMG.motion, related: ["level-9"] }),
  lvl(188, "The Windows", "4", "A hall of tall windows onto grey fog. The glass is an entity. Do not let it see you notice it.", { image: IMG.windows, related: ["windows"] }),
  entry({
    kind: "level", id: "you-cheated-fun", code: "Level Fun", name: "Level Fun", class: "5", cluster: "enigmatic",
    image: IMG.fun, related: ["partygoers", "party-host", "level-fun-plus"], aliases: ["Level Fun"],
    summary: "Balloons, cake, streamers, and a table set for guests who will not leave. Partygoers live here. You were invited.",
    body: ["Invitations appear as flyers, doors marked with smiley faces, and a smell of frosting. Accepting is a survival-class error."],
  }),
  entry({
    kind: "level", id: "run-for-your-life", code: "Level !", name: "Run For Your Life", class: "5", cluster: "enigmatic",
    image: IMG.bang, related: ["level-0", "you-cheated"], aliases: ["Level !"],
    summary: "A hospital-red corridor that never ends and something behind you that does not tire. Running is the only mechanic.",
  }),
  lvl("level-3999", "The True Ending", "habitable", "A neon arcade at the far edge of the catalog. Rumored to be a true exit. Rumored to be a kind lie.", { cluster: "enigmatic", image: IMG.arcade, related: ["the-frontrooms"], aliases: ["Level 3999"] }),
  entry({
    kind: "level", id: "the-hub", code: "The Hub", name: "The Hub", class: "habitable", cluster: "enigmatic",
    image: IMG.hub, related: ["level-1", "meg"], aliases: ["The Hub"],
    summary: "A transit hall of doors. Each door is a level if you have the key. The closest thing the Backrooms have to a lobby that admits it.",
  }),
  entry({
    kind: "level", id: "the-end", code: "The End", name: "The End", class: "2", cluster: "enigmatic",
    image: IMG.office, related: ["level-3999"], aliases: ["The End"],
    summary: "A library that claims you have escaped. Computers, books, a door marked EXIT. The exit is a file path, not a place.",
  }),
  entry({
    kind: "level", id: "the-void", code: "The Void", name: "The Void", class: "deadzone", cluster: "enigmatic",
    image: IMG.void, related: ["the-broken"], aliases: ["The Void"],
    summary: "Unstructured black. A failed noclip. There is no floor until there is, and then there isn't.",
  }),
  lvl("level--1", "Drowning", "4", "A parking structure filling with water. Negative levels are not below Level 0 so much as beside it, badly.", { cluster: "negative", image: IMG.ocean, related: ["level-0"], aliases: ["Level -1"] }),
];
