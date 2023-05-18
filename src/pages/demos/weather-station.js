/**
 * @name 揭秘观察者模式的威力：深入理解与实战应用
 * @description 观察者模式 `天气预报工作站` 终端示例，建议结合文章一起阅读
 * @example node weather-station.js
 * @link 
 */

class WeatherStation {
  constructor() {
    this.observers = []; // 观察者数组，用于存储观察者对象
    this.temperature = 0; // 温度初始值为0
  }

  addObserver(observer) {
    this.observers.push(observer); // 将观察者对象添加到观察者数组中
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer); // 获取观察者对象在数组中的索引
    if (index > -1) {
      this.observers.splice(index, 1); // 如果观察者对象存在于数组中，则从数组中移除
    }
  }

  setTemperature(temp) {
    console.log(`天气预报工作站: 当前温度为 ${temp}℃`); // 打印新的温度测量值
    this.temperature = temp; // 更新温度值
    this.notifyObservers(); // 通知所有观察者对象
  }

  notifyObservers() {
    for(let observer of this.observers) {
      observer.update(this.temperature); // 调用每个观察者对象的update方法，传递当前温度值作为参数
    }
  }
}

class TemperatureDisplay {
  constructor(weatherStation) {
    this.weatherStation = weatherStation; // 引用WeatherStation对象
    this.weatherStation.addObserver(this); // 将自身作为观察者对象添加到WeatherStation的观察者数组中
  }

  update(temperature) {
    console.log(`[订阅者-温度显示器]: 我得赶紧把显示的温度更新为 ${temperature}℃`); // 打印需要更新显示的温度
    // 这里是更新显示的逻辑
  }
}

class Fan {
  constructor(weatherStation) {
    this.weatherStation = weatherStation; // 引用WeatherStation对象
    this.weatherStation.addObserver(this); // 将自身作为观察者对象添加到WeatherStation的观察者数组中
  }

  update(temperature) {
    if (temperature > 25) {
      console.log("[订阅者-风扇]: 太 TM 热了，我得赶紧开风扇凉快凉快..."); // 如果温度大于25度，则打印开启风扇的信息
    } else {
      console.log("[订阅者-风扇]: 太 TM 冷了，赶紧把风扇给关了吧先......"); // 如果温度小于等于25度，则打印关闭风扇的信息
    }
  }
}

const weatherStation = new WeatherStation(); // 创建WeatherStation对象
const tempDisplay = new TemperatureDisplay(weatherStation); // 创建TemperatureDisplay对象，并传入WeatherStation对象
const fan = new Fan(weatherStation); // 创建Fan对象，并传入WeatherStation对象

weatherStation.setTemperature(20); // 设置温度为20度，将触发所有观察者对象的更新操作
weatherStation.setTemperature(30); // 设置温度为30度，将触发所有观察者对象的更新操作