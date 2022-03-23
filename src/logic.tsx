import { makeAutoObservable, observable  } from "mobx";

interface Word {
  rus: string;
  eng: string;
  isCorrect: boolean;
  point?: number;
  hint?: string;
}

const url: string = 'https://thirtythreeboas.github.io/data/dictionary.json';

class Logic {
  words: Word[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  getData() {
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(data => this.words = data)
  }
}

const instance = new Logic();

export default instance;
