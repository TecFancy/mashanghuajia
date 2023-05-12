/**
 * @name 掌握前端开发中的单例模式——模态窗口实战
 * @description 建议结合下面链接的文章一起阅读
 * @link https://mp.weixin.qq.com/s/DDvYMHB0BO57XK0pJCXHyg
 */

import { useRef } from "react";

import styles from "@/styles/demos/modal.module.css";

class Modal {
  private static instance: Modal;
  private queue: string[];
  private ref: any;

  private constructor() {
    this.queue = [];
  }

  public static getInstance({ ref }: { ref: any }): Modal {
    if (!Modal.instance) {
      Modal.instance = new Modal();
    }
    Modal.instance.ref = ref;
    return Modal.instance;
  }

  public open(content: string): void {
    this.queue.push(content);
    if (this.queue.length === 1) {
      this.show();
    }
  }

  public close(): void {
    this.queue.shift();
    if (this.queue.length > 0) {
      this.show();
    } else {
      this.destroy();
    }
  }

  private show(): void {
    const modal = document.createElement("div");
    modal.classList.add(styles.modal);

    const overlay = document.createElement("div");
    overlay.classList.add(styles.overlay);
    modal.appendChild(overlay);

    const content = document.createElement("div");
    content.classList.add(styles.content);
    content.innerHTML = this.queue[0];
    modal.appendChild(content);

    const closeButton = document.createElement("button");
    closeButton.classList.add(styles.closeButton);
    closeButton.innerHTML = "关闭";
    closeButton.addEventListener("click", () => {
      this.close();
    });
    content.appendChild(closeButton);

    this.ref.current.appendChild(modal);
  }

  private destroy(): void {
    const modalRef = this.ref.current;
    console.log("modal", modalRef);
    if (modalRef) {
      this.ref.current.removeChild(modalRef.firstChild)
    }
  }
}

const ModalPage = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modal: Modal = Modal.getInstance({ ref: modalRef });

  function openModal(content: string) {
    modal.open(content);
  }

  return (
    <div className={styles.container}>
      <button onClick={() => openModal("这是一个模态窗口")}>
        Open Modal
      </button>
      <div ref={modalRef} />
    </div>
  );
};

export default ModalPage;
