import { makeObservable, observable, action, autorun } from "mobx";

export interface Word {
  rus: string[];
  eng: string[];
  isCorrect: boolean;
  point: number;
  hint: string;
}

export interface Words {
  "Apple Juice": Word[],
  "Real Talk"?: Word[],
  "Winter is Coming"?: Word[],
  "Better than Others"?: Word[],
  "Upgrade"?: Word[],
  "Guru"?: Word[]
}

const url: string = 'https://thirtythreeboas.github.io/data/dictionary.json';

class Logic {
  @observable words = {} as Words;
  @observable chosenBlocks: string[] = [];

  constructor() {
    makeObservable(this)
    autorun(() => console.log(this.chosenBlocks))
  }

  @action.bound
  getData() {
    fetch(url)
    .then(res => res.json())
    .then(action(json => this.words = json))
  }

  @action.bound
  chooseBlock(e: { target: HTMLElement }) {
    if (this.chosenBlocks.indexOf(e.target.id) === -1) {
      this.chosenBlocks.push(e.target.id);
      document.getElementById(e.target.id)!.className += " hover";
      return;
    }
    if (this.chosenBlocks.indexOf(e.target.id) !== -1) {
      document.getElementById(e.target.id)!.className = "word-block";
      this.chosenBlocks = this.chosenBlocks.filter((elem: string) => elem !== e.target.id);
      return;
    }
  }
}

const logic = new Logic();

export default logic;
