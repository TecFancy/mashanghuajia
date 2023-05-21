/**
 * @description Map对象管理观察者列表
 */

class Subject {
  constructor() {
    // 创建一个 Map 对象来存储观察者列表
    this.observers = new Map();
  }

  // 添加观察者
  addObserver(id, observer) {
    // 将观察者添加到 Map 对象中
    this.observers.set(id, observer);
  }

  // 移除观察者
  removeObserver(id) {
    // 从 Map 对象中删除观察者
    this.observers.delete(id);
  }

  // 通知观察者
  notifyObservers() {
    // 遍历 Map 对象中的观察者列表并通知它们
    this.observers.forEach((observer, id) => observer.update(id));
  }
}

class Observer {
  // 更新观察者
  update(id) {
    console.log(`通知「${id}」`);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

// 添加观察者
subject.addObserver("观察者1", observer1);
subject.addObserver("观察者2", observer2);

// 通知观察者
subject.notifyObservers();

// 移除观察者
subject.removeObserver("observer1");
