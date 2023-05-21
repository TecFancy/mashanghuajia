class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  async notify(data) {
    for (let observer of this.observers) {
      try {
        // 使用 await 等待异步操作的结果
        await observer.update(data);
      } catch (error) {
        console.log(`通知观察者时发生了错误：\n${error}`);
      }
    }
  }
}

class Observer {
  update(data) {
    throw new Error("在更新期间发生了错误");
  }
}

const observable = new Observable();
const observer = new Observer();

observable.addObserver(observer);
observable.notify("Some data");
