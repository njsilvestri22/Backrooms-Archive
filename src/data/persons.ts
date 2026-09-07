import { IMG, entry } from "./entry";
import type { ArchiveEntry } from "./types";

export const corePersons: ArchiveEntry[] = [
  entry({ kind: "person", id: "kane-pixels", code: "POI K", name: "Kane Parsons", class: "unknown", image: IMG.async, canon: "kane", related: ["async", "cameraman"], summary: "The analog-horror author. Kane Pixels. Not the wiki. His tapes are a separate wound: Async, 1989, a threshold, a camera." }),
  entry({ kind: "person", id: "anonymous-4chan", code: "POI 0", name: "Anonymous (2019)", class: "unknown", image: IMG.yellow, related: ["noclip", "level-0"], summary: "The copypasta. May 2019, /x/. Six hundred million square miles. The seed of this whole binder." }),
  entry({ kind: "person", id: "meg-director", code: "POI 1", name: "M.E.G. Director", class: "unknown", image: IMG.meg, related: ["meg"], summary: "A title more than a face. Signs off on outposts. May be several people. May be none." }),
  entry({ kind: "person", id: "jerry-person", code: "POI 5", name: "Jerry (the guest)", class: "unknown", image: IMG.hotel, related: ["jerry", "level-5"], summary: "A wanderer who talked back to the walls. Or the walls using a name." }),
  entry({ kind: "person", id: "u-lost", code: "POI 2", name: "u/LostInTheYellow", class: "unknown", image: IMG.yellow, related: ["level-0"], summary: "An early forum voice. Logs of Level 0 that match the copypasta too well." }),
  entry({ kind: "person", id: "dr-kauer", code: "POI 3", name: "Dr. Kauer", class: "unknown", image: IMG.office, related: ["kauer"], summary: "Namesake of Kauer Research. Paper files, fountain pen, a habit of underlining 'do not follow sounds'." }),
  entry({ kind: "person", id: "agent-raine", code: "POI 4", name: "Agent Raine", class: "2", image: IMG.meg, related: ["meg", "level-1"], summary: "M.E.G. field agent. Last log: Level 1, lights out, then static." }),
  entry({ kind: "person", id: "the-photographer", code: "POI 6", name: "The Photographer", class: "unknown", image: IMG.async, related: ["cameraman"], summary: "Whoever took the analog stills in this binder. Maybe many people. The grain is the same." }),
  entry({ kind: "person", id: "blanche-human", code: "POI 7", name: "A visitor of Blanche", class: "1", image: IMG.office, related: ["blanche"], summary: "Left a thank-you note. The note is still there. The visitor is not." }),
  entry({ kind: "person", id: "party-survivor", code: "POI 8", name: "Mira Chen", class: "4", image: IMG.fun, related: ["partygoers"], summary: "Escaped Fun. Writes warnings on flyers. The smile on her notes is not a joke." }),
  entry({ kind: "person", id: "hive-keeper-ann", code: "POI 9", name: "Ann Voss", class: "3", image: IMG.hive, related: ["the-hive"], summary: "Paid in moth jelly. Her logs smell like wax even as text." }),
  entry({ kind: "person", id: "auctioneer-vell", code: "POI 10", name: "Vell", class: "2", image: IMG.gold, related: ["level-450"], summary: "Silent auctioneer. Has never been recorded speaking. Bids still resolve." }),
  entry({ kind: "person", id: "metro-driver", code: "POI 11", name: "Driver 9", class: "2", image: IMG.metro, related: ["the-metro"], summary: "A Metro operator. Timetables written on the back of tickets. Some times are in the past." }),
  entry({ kind: "person", id: "frontrooms-kid", code: "POI 12", name: "Eli", class: "1", image: IMG.front, related: ["the-frontrooms"], summary: "Swears he noclipped from a suburban living room in 2005. Describes a CRT and a beige carpet." }),
  entry({ kind: "person", id: "level-3999-clerk", code: "POI 13", name: "The Clerk", class: "habitable", image: IMG.arcade, related: ["level-3999"], summary: "Sells tokens. Asks if you want to go home. The correct answer is not known." }),
  entry({ kind: "person", id: "async-intern", code: "POI 14", name: "Async Intern", class: "unknown", image: IMG.async, canon: "kane", related: ["async"], summary: "A nameless badge in the analog tapes. Holds the camera. Breathes too loud." }),
  entry({ kind: "person", id: "scribe-owen", code: "POI 15", name: "Owen", class: "1", image: IMG.office, related: ["the-scribes"], summary: "Copied three hundred files by hand. His handwriting is this archive's default." }),
  entry({ kind: "person", id: "watch-captain", code: "POI 16", name: "Captain Holt", class: "2", image: IMG.suburbs, related: ["level-9"], summary: "Sodium Watch. Keeps curfew. Lost two patrols to the Neighborhood Watch that is not his." }),
  entry({ kind: "person", id: "the-original-wanderer", code: "POI 17", name: "The First Wanderer", class: "unknown", image: IMG.yellow, related: ["anonymous-4chan"], summary: "A title given to whoever noclipped first. There was no first. There were many, and none of them filed it." }),
  entry({ kind: "person", id: "red-walker", code: "POI 18", name: "The one in red", class: "4", image: IMG.red, related: ["crimson-wanderer"], summary: "May be the Crimson Wanderer. May be a person wearing the rumor." }),
];
