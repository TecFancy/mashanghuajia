class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => {
      // 返回一个新的 Promise 对象
      new Promise((resolve, reject) => {
        resolve(observer.update(data));
      })
      .catch(error => {
        console.log(`通知观察者时发生了错误：\n${error}`);
      });
    });
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