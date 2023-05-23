class Button {
  constructor() {
    this.type = "Button";
  }

  render() {
    console.log(`Rendering a ${this.type}`);
  }
}

class TextBox {
  constructor() {
    this.type = "TextBox";
  }

  render() {
    console.log(`Rendering a ${this.type}`);
  }
}

class Checkbox {
  constructor() {
    this.type = "Checkbox";
  }

  render() {
    console.log(`Rendering a ${this.type}`);
  }
}

class UIComponentFactory {
  static createComponent(type) {
    switch (type) {
      case "Button":
        return new Button();
      case "TextBox":
        return new TextBox();
      case "Checkbox":
        return new Checkbox();
      default:
        throw new Error(`Invalid component type: ${type}`);
    }
  }
}

// 使用工厂创建组件并进行渲染
const button = UIComponentFactory.createComponent("Button");
button.render();

const textbox = UIComponentFactory.createComponent("TextBox");
textbox.render();

const checkbox = UIComponentFactory.createComponent("Checkbox");
checkbox.render();
