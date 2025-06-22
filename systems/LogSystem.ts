import { Colors } from '../Constants';

interface World {
  log: string[];
}

function colorizeLog(entry: string): string {
  return entry
    // Reactor statuses (order matters: match EXPLODED before NORMAL)
    .replace(/\bEXPLODED\b/gi, `${Colors.BrightRed}EXPLODED${Colors.Reset}`)
    .replace(/\bCRITICAL\b/gi, `${Colors.BrightRed}CRITICAL${Colors.Reset}`)
    .replace(/\bOVERHEATING\b/gi, `${Colors.BrightRed}OVERHEATING${Colors.Reset}`)
    .replace(/\bNORMAL\b/gi, `${Colors.Green}NORMAL${Colors.Reset}`)
    // Needs and tasks
    .replace(/\bhungry\b/gi, `${Colors.Red}hungry${Colors.Reset}`)
    .replace(/\beating\b/gi, `${Colors.Yellow}eating${Colors.Reset}`)
    .replace(/\bresting\b/gi, `${Colors.Cyan}resting${Colors.Reset}`)
    .replace(/\btired\b/gi, `${Colors.Magenta}tired${Colors.Reset}`)
    .replace(/\bpatrolling\b/gi, `${Colors.Green}patrolling${Colors.Reset}`);
}

export default function LogSystem(world: World): void {
  for (const entry of world.log) {
    console.log(colorizeLog(entry));
  }
  world.log = [];
}