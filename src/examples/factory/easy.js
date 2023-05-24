class Pizza {
  constructor(name) {
    this.name = name;
  }

  prepare() {
    console.log(`Prepare ${this.name} pizza`);
  }

  bake() {
    console.log(`Bake ${this.name} pizza`);
  }

  box() {
    console.log(`Box ${this.name} pizza`);
  }
}

class CheesePizza extends Pizza {
  constructor() {
    super("Cheese");
  }
}

class ClamPizza extends Pizza {
  constructor() {
    super("Clam");
  }
}

// PizzaFactory 是一个简单工厂
class PizzaFactory {
  static createPizza(type) {
    switch (type) {
      case "cheese":
        return new CheesePizza();
      case "clam":
        return new ClamPizza();
      default:
        throw new Error("Invalid pizza type");
    }
  }
}

// 客户端代码
const cheesePizza = PizzaFactory.createPizza("cheese");
cheesePizza.prepare();
cheesePizza.bake();
cheesePizza.box();

const clamPizza = PizzaFactory.createPizza("clam");
clamPizza.prepare();
clamPizza.bake();
clamPizza.box();
