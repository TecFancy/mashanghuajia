/**
 * @name 电子商务网站代码示例（终端运行）
 * @description 这个示例演示了：观察者模式中，观察者和被观察者之间的依赖关系过于紧密，导致代码难以维护的问题。本示例对代码进行了改进，使得代码更容易阅读和维护。
 * @link
 * @example node ecommerce.js
 */

// 购物车模块
class Cart {
  constructor() {
    this.observers = []; // 观察者列表
    this.items = []; // 购物车中的商品列表
  }

  attach(observer) {
    this.observers.push(observer); // 向观察者列表添加新的观察者
  }

  addItem(item) {
    this.items.push(item); // 向购物车添加新的商品
    this.notifyAllObservers(); // 通知所有的观察者
  }

  notifyAllObservers() {
    for (let observer of this.observers) {
      observer.update(this); // 通知每个观察者进行更新
    }
  }
}

// 促销模块
class Promotion {
  constructor(cart) {
    this.cart = cart; // 与促销相关的购物车对象
    this.cart.attach(this); // 将当前的促销对象添加到购物车的观察者列表
  }

  update() {
    console.log(`Promotion updated!`); // 更新促销信息
    // 根据购物车中的商品更新促销信息
  }
}

// 库存模块
class Inventory {
  constructor(cart) {
    this.cart = cart; // 与库存相关的购物车对象
    this.cart.attach(this); // 将当前的库存对象添加到购物车的观察者列表
    this.promotion = new Promotion(cart); // 创建一个新的促销对象并将购物车对象传给它
  }

  update() {
    console.log(`Inventory updated!`); // 更新库存信息
    // 根据购物车中的商品更新库存信息

    // 再次通知促销模块进行更新
    this.promotion.update();
  }
}

const cart = new Cart(); // 创建一个新的购物车对象
const inventory = new Inventory(cart); // 创建库存对象并传入购物车对象

cart.addItem("item1"); // 这将触发一系列的更新操作
