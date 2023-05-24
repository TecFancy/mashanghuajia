/**
 * @description “抽象工厂”模式实现
 */

// 抽象产品接口
class Button {
  paint() {}
}

// 具体产品类 A
class WinButton extends Button {
  paint() {
    console.log('WinButton');
  }
}

// 具体产品类 B
class MacButton extends Button {
  paint() {
    console.log('MacButton');
  }
}

// 抽象工厂接口
class GUIFactory {
  createButton() {}
}

// 具体工厂类 A
class WinFactory extends GUIFactory {
  createButton() {
    return new WinButton();
  }
}

// 具体工厂类 B
class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton();
  }
}

// 客户端代码
class Application {
  constructor(factory) {
    this.factory = factory;
  }

  createUI() {
    const button = this.factory.createButton();
    button.paint();
  }
}

// 使用具体工厂 A 创建产品
const app = new Application(new WinFactory());
app.createUI(); // 输出：WinButton

// 使用具体工厂 B 创建产品
const app2 = new Application(new MacFactory());
app2.createUI(); // 输出：MacButton