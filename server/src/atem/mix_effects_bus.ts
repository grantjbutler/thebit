import { UpstreamKey } from "./upsteam_key.js";
import { Actions } from '../action.js';

class MixEffectsBus {
  upstreamKeys: UpstreamKey[] = [];

  constructor(numUpstreamKeyers: number) {
    for (let i = 0; i < numUpstreamKeyers; i++) {
      this.upstreamKeys.push(new UpstreamKey());
    }
  }

  getActions(): Actions {
    const actions: Actions = {};

    for (let i = 0; i < this.upstreamKeys.length; i++) {
      actions[`upstreamKey${i}`] = this.upstreamKeys[i].getActions();
    }

    return actions;
  }
}

export { MixEffectsBus };