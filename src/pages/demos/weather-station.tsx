/**
 * @name 揭秘观察者模式的威力：深入理解与实战应用
 * @description 观察者模式 `天气预报工作站` 示例，建议结合文章一起阅读
 * @link 
 */

import { Button, message } from "antd";
import React, { useState, useLayoutEffect } from "react";

import styles from "@/styles/demos/weather-station.module.css";

// WeatherStation 是一个主题，也被称为被观察者，它有一组观察者，并能够通知它们温度更改。
class WeatherStation {
  // 这是观察者列表
  private observers: Observer[];
  private temperature: number;

  constructor() {
    this.observers = [];
    this.temperature = 0;
  }

  // 添加观察者到列表
  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  // 从列表中移除观察者
  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  // 设置新的温度并通知所有的观察者
  setTemperature(temp: number): void {
    console.log(`天气预报工作站: 当前温度为 ${temp}℃`);
    this.temperature = temp;
    this.notifyObservers();
  }

  // 通知所有的观察者
  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature);
    }
  }
}

// Observer 是一个接口，表示所有观察者都需要实现的方法
interface Observer {
  update(temperature: number): void;
}

// TemperatureDisplay 是一个观察者，它观察温度并更新显示。
class TemperatureDisplay implements Observer {
  private weatherStation: WeatherStation;
  private updateDisplay: (temperature: number) => void;

  constructor(
    weatherStation: WeatherStation,
    updateDisplay: (temperature: number) => void
  ) {
    this.weatherStation = weatherStation;
    this.updateDisplay = updateDisplay;
    this.weatherStation.addObserver(this);
  }

  // 更新显示的温度
  update(temperature: number): void {
    console.log(
      `[订阅者-温度显示器]: 我得赶紧把显示的温度更新为 ${temperature}℃`
    );
    this.updateDisplay(temperature);
  }
}

// Fan 也是一个观察者，它根据温度来决定是否打开风扇。
class Fan implements Observer {
  private weatherStation: WeatherStation;
  private updateFanState: (isFanOn: boolean) => void;

  constructor(
    weatherStation: WeatherStation,
    updateFanState: (isFanOn: boolean) => void
  ) {
    this.weatherStation = weatherStation;
    this.updateFanState = updateFanState;
    this.weatherStation.addObserver(this);
  }

  // 根据温度更新风扇的状态
  update(temperature: number): void {
    if (temperature > 25) {
      console.log("[订阅者-风扇]: 太 TM 热了，我得赶紧开风扇凉快凉快...");
      this.updateFanState(true);
    } else {
      console.log("[订阅者-风扇]: 太 TM 冷了，赶紧把风扇给关了吧先......");
      this.updateFanState(false);
    }
  }
}

// 创建一个新的 WeatherStation 实例
const weatherStation = new WeatherStation();

// WeatherStationComponent 组件，显示当前的温度和风扇的状态
const WeatherStationComponent: React.FC = () => {
  const [temperature, setTemperature] = useState(0);
  const [isFanOn, setIsFanOn] = useState(false);

  // 在组件挂载后，创建 TemperatureDisplay 和 Fan 对象，它们会自动添加到 WeatherStation 的观察者列表中
  useLayoutEffect(() => {
    new TemperatureDisplay(weatherStation, setTemperature);
    new Fan(weatherStation, setIsFanOn);
  }, []);

  // 通过调用 setTemperature 方法，更新 WeatherStation 的温度，并通知所有的观察者
  const setNewTemperature = (temp: number): void => {
    console.clear();
    weatherStation.setTemperature(temp);
  };

  const msgInfo = () => message.info("你可以尝试自己实现");

  return (
    <div className={styles.container}>
      <h1>天气预报工作站</h1>

      <div className={styles.subscribers}>
        <p>
          <span>[订阅者] 温度显示器: {temperature}℃</span>
          <Button size="small" onClick={msgInfo}>
            移除订阅者
          </Button>
        </p>
        <p>
          <span>[订阅者] 风扇: {isFanOn ? "开" : "关"}</span>
          <Button size="small" onClick={msgInfo}>
            移除订阅者
          </Button>
        </p>
      </div>

      {/* 发布消息区域 */}
      <div className={styles.publishArea}>
        <h2>发布者发布温度通知订阅者</h2>
        <div className={styles.submitBtns}>
          <Button onClick={() => setNewTemperature(20)}>温度设置为 20℃</Button>
          <Button onClick={() => setNewTemperature(30)}>温度设置为 30℃</Button>
        </div>
      </div>
    </div>
  );
};

export default WeatherStationComponent;
