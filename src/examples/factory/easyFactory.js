/**
 * @name 工厂模式简单示例
 */

// 产品接口: Pizza
class Pizza {
  prepare() {
    throw new Error("该方法必须被覆写！");
  }

  bake() {
    throw new Error("该方法必须被覆写！");
  }

  box() {
    throw new Error("该方法必须被覆写！");
  }
}

// 具体产品: CheesePizza 和 ClamPizza
class CheesePizza extends Pizza {
  prepare() {
    console.log("准备 CheesePizza");
  }

  bake() {
    console.log("烘烤 CheesePizza");
  }

  box() {
    console.log("打包 CheesePizza");
  }
}

class ClamPizza extends Pizza {
  prepare() {
    console.log("准备 ClamPizza");
  }

  bake() {
    console.log("烘烤 ClamPizza");
  }

  box() {
    console.log("打包 ClamPizza");
  }
}

// 工厂接口: PizzaStore
class PizzaStore {
  createPizza(type) {
    throw new Error("该方法必须被覆写！");
  }

  orderPizza(type) {
    let pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.box();
    return pizza;
  }
}

// 具体工厂: NewYorkPizzaStore 和 ChicagoPizzaStore
class NewYorkPizzaStore extends PizzaStore {
  createPizza(type) {
    if (type === "cheese") {
      return new CheesePizza();
    } else if (type === "clam") {
      return new ClamPizza();
    }
  }
}

class ChicagoPizzaStore extends PizzaStore {
  createPizza(type) {
    if (type === "cheese") {
      return new CheesePizza();
    } else if (type === "clam") {
      return new ClamPizza();
    }
  }
}

// 客户端: Customer
let newYorkPizzaStore = new NewYorkPizzaStore();
let chicagoPizzaStore = new ChicagoPizzaStore();

newYorkPizzaStore.orderPizza("cheese");
chicagoPizzaStore.orderPizza("clam");
