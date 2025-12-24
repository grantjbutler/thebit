export interface PropAction {
  action: string;
  props: any;
};

export interface OptionsAction {
  action: string;
  options: any;
}

export type Action = PropAction | OptionsAction;

export type ActionList = Action[];
export type ActionMapping = {[key: string]: Actions};
export type Actions = ActionMapping | ActionList;
