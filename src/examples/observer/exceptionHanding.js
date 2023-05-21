class Observable {
  constructor() {
    this.observers = []; // 观察者列表
  }

  addObserver(observer) {
    // 添加观察者
    this.observers.push(observer); // 将观察者添加到观察者列表中
  }

  notify(data) {
    // 通知观察者
    for (let observer of this.observers) {
      // 遍历观察者列表
      try {
        observer.update(data); // 调用观察者的 update 方法
      } catch (error) {
        console.log(`通知观察者时发生了错误：\n${error}`);
        // 处理错误，例如记录日志、忽略错误或停止通知过程
        // 为了本示例，我们只记录日志并继续通知其他观察者
      }
    }
  }
}

class Observer {
  update(data) {
    // 更新观察者
    // 这里是更新逻辑。为了本示例，我们模拟一个错误
    throw new Error("在更新期间发生了错误");
  }
}

const observable = new Observable(); // 创建 Observable 实例
const observer = new Observer(); // 创建 Observer 实例

observable.addObserver(observer); // 添加观察者
observable.notify("Some data"); // 通知观察者
