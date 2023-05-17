/**
 * @name 一文读懂观察者模式：通俗易懂的JS例子帮你理解
 * @description 观察者模式示例，建议结合下面链接的文章一起阅读
 * @link https://mp.weixin.qq.com/s/pRpL4wLUbdwbnPZmMqdPSQ
 */

import { useEffect, useState } from "react";
import { Button, Input } from "antd";

import styles from "@/styles/demos/observer-pattern.module.css";

import type { ChangeEvent } from "react";

const { TextArea } = Input;

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: string): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(private name: string, private callback: (data: string) => void) {}

  update(data: string): void {
    this.callback(`[${this.name}] ${data}`);
  }
}

const subject = new Subject();

const ObserverPattern = () => {
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setMsg(val?.trim());
  }

  function handleClick() {
    if (typeof msg !== "string") return;
    subject.notify(msg);
    setMsg(undefined);
  }

  useEffect(() => {
    const observer1 = new Observer("Observer 1", setMessage1);
    subject.subscribe(observer1);

    return () => {
      subject.unsubscribe(observer1);
    };
  }, []);

  useEffect(() => {
    const observer2 = new Observer("Observer 2", setMessage2);
    subject.subscribe(observer2);

    return () => {
      subject.unsubscribe(observer2);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>观察者模式示例</h1>
      <section>
        <div className={styles.publisher}>
          <h2>发布者</h2>
          <TextArea
            rows={4}
            value={msg}
            onChange={handleChange}
            className={styles.input}
            placeholder="请输入要发布的消息"
          />
          <div className={styles.submit}>
            <Button disabled={!msg} onClick={handleClick}>
              发送消息
            </Button>
          </div>
        </div>
        <div className={styles.subscriber}>
          <h2>订阅者消息</h2>
          <p>{message1}</p>
          <p>{message2}</p>
        </div>
      </section>
    </div>
  );
};

export default ObserverPattern;
