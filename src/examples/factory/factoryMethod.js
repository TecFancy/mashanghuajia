/**
 * @description “工厂方法”模式实现
 */

// 定义一个接口，表示所有产品都应该有的方法
class Product {
  use() {
    console.log("This is a product.");
  }
}

// 定义具体的产品类
class ConcreteProductA extends Product {
  use() {
    console.log("I am product A.");
  }
}

class ConcreteProductB extends Product {
  use() {
    console.log("I am product B.");
  }
}

// 定义工厂接口
class Factory {
  createProduct() {
    throw new Error("This method must be overridden.");
  }
}

// 定义具体的工厂类
class ConcreteFactoryA extends Factory {
  createProduct() {
    return new ConcreteProductA();
  }
}

class ConcreteFactoryB extends Factory {
  createProduct() {
    return new ConcreteProductB();
  }
}

// 使用工厂类创建产品
const factoryA = new ConcreteFactoryA();
const productA = factoryA.createProduct();
productA.use(); // 输出 "I am product A."

const factoryB = new ConcreteFactoryB();
const productB = factoryB.createProduct();
productB.use(); // 输出 "I am product B."