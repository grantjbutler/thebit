import { ObsCommand, SceneItem } from "./scene_item.js"

interface Action {
  action: string,
  props?: any;
  options?: any;
}

interface Item {
  name: string,
  enabled: boolean,
  id?: number,
  uuid?: string
}

class Scene {
  name: string;
  sceneItem!: SceneItem;
  filters: Map<string, Item> = new Map();
  sources: Map<string, Item> = new Map();
  commands: ObsCommand[] = [];
  uuid: string;
  actions: Map<string, Function> = new Map();

  constructor(props: { name: string, uuid: string }) {
    this.name = props.name;
    this.uuid = props.uuid;
  }

  loadState(state: any) {
    this.sceneItem.loadState(state.sceneItem)
  }

  usableActions(): string[] {
    return [
      "reset",
      "scale",
      "source",
      "filter"
    ]
  }

  setSceneItem(sceneItem: SceneItem): SceneItem {
    this.sceneItem = sceneItem;

    return this.sceneItem;
  }

  getSceneItem(): SceneItem {
    return this.sceneItem;
  }

  addSource(props: Item): void {
    this.sources.set(props.name, props);
  }

  getSource(sourceName: string): Item | null {
    return this.sources.get(sourceName) || null;
  }

  addFilter(props: Item): void {
    this.filters.set(props.name, props)
  }

  getFilter(filterName: string): Item | null {
    return this.filters.get(filterName) || null;
  }

  getCommands(): Array<ObsCommand> {
    const commands = this.commands.splice(0, this.commands.length);

    return [...commands, ...this.sceneItem.getCommands()];
  }

  reset(): void {
    this.sceneItem.reset();

    this.sources.values().forEach((source: Item) => {
      source.enabled = false;

      this.commands.push({
        command: "SetSceneItemEnabled",
        props: {
          sceneName: source.name,
          sceneItemId: source.id,
          sceneItemEnabled: source.enabled
        }
      })
    })

    this.filters.values().forEach((filter: Item) => {
      this.commands.push({
        command: "SetSourceFilterEnabled",
        props: {
          sourceName: this.name,
          filterName: filter.name,
          filterEnabled: filter.enabled
        }
      })
    })
  }

  toggleSource({ sourceName }: { sourceName: string }): void {
    const source = this.getSource(sourceName);
    if (source) {
      source.enabled = !source.enabled;

      this.commands.push({
        command: "SetSceneItemEnabled",
        props: {
          sceneName: this.name,
          sceneItemId: source.id,
          sceneItemEnabled: source.enabled
        }
      })
    }
  }

  toggleFilter({ filterName }: { filterName: string }): void {
    const filter = this.getFilter(filterName)
    if (filter) {
      filter.enabled = !filter.enabled

      this.commands.push({
        command: "SetSourceFilterEnabled",
        props: {
          sourceName: this.name,
          filterName: filter.name,
          filterEnabled: filter.enabled
        }
      })
    }
  }

  scale({ scale }: { scale: number }): void {
    this.sceneItem.scale(+scale)
  }

  getProtocol(): Action[] {
    return [
      { action: "scale", props: { scale: "number" } },
      { action: "scale", options: { scale: [0.2, 0.5, 1, 2.5] } },
      {
        action: "toggleSource",
        options: {
          sourceName: [...this.sources.values()]
        }
      },
      {
        action: "toggleFilter",
        options: {
          filterName: [...this.filters.values()]
        }
      },
      { action: "reset", props: {} },
      { action: "shrink", props: {} },
    ]
  }
}

export { Scene }
