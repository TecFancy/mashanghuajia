import React, { useState, useRef, useEffect } from "react";

function DownloadButton() {
  const [content, setContent] = useState("这是一个文本文件中的内容");
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClick = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "file.txt";
    linkRef.current = link;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  };

  // 组件销毁时手动从页面中移除下载链接
  useEffect(() => {
    return () => {
      if (linkRef.current) {
        document.body.removeChild(linkRef.current);
      }
    };
  }, []);

  return <button onClick={handleClick}>下载文件</button>;
}

export default DownloadButton;
