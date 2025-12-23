abstract class Controller {
  id!: string;
  active: boolean = true;

  abstract start(): boolean
  abstract reset(): boolean
  abstract stop(): boolean
}

export { Controller }
