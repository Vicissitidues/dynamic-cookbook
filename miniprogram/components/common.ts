type tIcon = 'success' | 'error' | 'warning';
declare class dymc {
  title: string;
  icon: tIcon;
  duration: number;
  constructor(title: string, icon: tIcon, duration: number)
}

// export function dymc(
//   this: any,
//   title: string,
//   icon: icon,
//   duration: number
// ) {
//   this.title = title;
//   this.icon = icon;
//   this.duration = duration;
// }
// dymc.prototype.toast = () => {
//   this.title
// }