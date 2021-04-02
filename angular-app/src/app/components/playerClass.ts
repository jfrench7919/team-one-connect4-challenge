export class Player {
  number: number = 0;
  name: string = '';
  color: string = '';

  constructor(player?: Player) {
    Object.assign(this, player);
  }

}
