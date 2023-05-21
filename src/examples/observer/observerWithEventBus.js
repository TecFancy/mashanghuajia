// 创建事件总线
class EventBus {
  constructor() {
    this.observers = [];
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(event) {
    this.observers.forEach(observer => observer.update(event));
  }
}

// 创建观察者1
class Observer1 {
  update(event) {
    console.log(`观察者1收到了事件：${event}`);
  }
}

// 创建观察者2
class Observer2 {
  update(event) {
    console.log(`观察者2收到了不同的事件：${event}`);
  }
}

// 创建被观察者1
class Subject1 {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  sendEvent(event) {
    this.eventBus.notifyObservers(`被观察者1的事件：${event}`);
  }
}

// 创建被观察者2
class Subject2 {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  sendEvent(event) {
    this.eventBus.notifyObservers(`被观察者2的事件：${event}`);
  }
}

// 实例化事件总线
const eventBus = new EventBus();

// 实例化两个观察者并注册到事件总线
const observer1 = new Observer1();
const observer2 = new Observer2();
eventBus.registerObserver(observer1);
eventBus.registerObserver(observer2);

// 实例化两个被观察者
const subject1 = new Subject1(eventBus);
const subject2 = new Subject2(eventBus);

// 被观察者发送事件
subject1.sendEvent('Hello');
subject2.sendEvent('World');
