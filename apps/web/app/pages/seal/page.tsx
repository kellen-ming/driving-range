"use client";

import { PageWrapper } from "@/app/components/ui/page-wrapper";
import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from "react";

// 定义消息类型
interface Message {
  text: string;
  type: "success" | "error" | "";
}

export default function Seal() {
  // 状态管理
  const [stampText, setStampText] = useState<string>("冲借款"); // 印章文字
  const [purpose, setPurpose] = useState<string>(""); // 印章用途描述
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [message, setMessage] = useState<Message>({ text: "", type: "" }); // 消息提示
  const stampSvgRef = useRef<SVGSVGElement>(null); // 用于获取SVG元素的引用
  const [geminiApiKey, setGeminiApiKey] = useState<string>(''); // Gemini API Key

  // 显示消息的函数
  const showMessage = (msg: string, type: "success" | "error" = "error"): void => {
    setMessage({ text: msg, type: type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000); // 5秒后隐藏
  };

  // 处理下载按钮点击事件
  const handleDownload = (): void => {
    // 获取当前的印章文字
    const textContent = stampText;

    // 构建一个包含内联样式的完整SVG字符串
    // 注意：这里为了确保Canvas能正确渲染，字体设置为更通用的'sans-serif'
    const fullSvgString = `
          <svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150">
              <g transform="rotate(-10 150 75)">
                  <rect x="75" y="50" width="150" height="50" rx="5" ry="5" style="stroke:red; stroke-width:3; fill:none;"/>
                  <text x="150" y="78" font-size="30" style="font-family:'sans-serif'; font-weight:bold; fill:red; text-anchor:middle; dominant-baseline:middle;">${textContent}</text>
                  <ellipse cx="150" cy="75" rx="120" ry="65" style="stroke:red; stroke-width:3; fill:none;"/>
              </g>
          </svg>
      `;

    console.log("Generated SVG String (first 200 chars):", fullSvgString.substring(0, 200));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      showMessage("无法获取Canvas上下文，请检查浏览器兼容性。", "error");
      return;
    }

    const svgWidth = 300;
    const svgHeight = 150;
    const scaleFactor = 2; // 提高分辨率以获得更好的质量
    canvas.width = svgWidth * scaleFactor;
    canvas.height = svgHeight * scaleFactor;

    // 确保canvas背景是透明的
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared for transparency.");

    const img = new Image();

    // 将SVG字符串转换为Base64编码的数据URL
    // 确保使用 encodeURIComponent 和 unescape 来正确处理中文字符
    const base64Svg = btoa(unescape(encodeURIComponent(fullSvgString)));
    const dataUrl = "data:image/svg+xml;base64," + base64Svg;
    console.log("Generated Base64 Data URL (first 100 chars):", dataUrl.substring(0, 100));

    img.onload = () => {
      console.log("Image loaded successfully from Base64 SVG Data URL.");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      console.log("SVG drawn onto canvas.");

      // 将canvas内容转换为数据URL（PNG格式，透明背景）
      const finalDataURL = canvas.toDataURL("image/png");
      console.log("Generated Final Data URL (first 100 chars):", finalDataURL.substring(0, 100));

      // 创建一个临时链接元素来触发下载
      const a = document.createElement("a");
      a.href = finalDataURL;
      a.download = "transparent_stamp.png"; // 文件名
      document.body.appendChild(a);
      a.click(); // 模拟点击下载
      document.body.removeChild(a); // 清理
      console.log("Download initiated.");
    };

    img.onerror = (error) => {
      console.error("Error loading SVG into image:", error);
      showMessage("SVG加载失败，无法生成图片。请检查控制台。", "error");
    };

    img.src = dataUrl;
    console.log("Image source set to Base64 SVG Data URL.");
  };

  // 处理智能文案建议按钮点击事件
  const handleSuggestText = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    // 检查API Key是否已配置
    if (!geminiApiKey.trim()) {
      showMessage('请先配置 Gemini API Key 才能使用 AI 功能！', 'error');
      return;
  }
    
    if (!purpose.trim()) {
      showMessage("请输入印章用途描述！", "error");
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" }); // 清除旧消息

    try {
      const chatHistory = [];
      // 构建发送给LLM的提示语
      const prompt = `请根据以下印章用途，提供一个简洁、专业的印章文字建议，字数不超过5个字。请直接给出文字，不要包含任何解释或标点符号。用途：${purpose}`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        let suggestedText: string = result.candidates[0].content.parts[0].text.trim();
        // 简单清理：去除引号、多余空格，并截断至5个字符
        suggestedText = suggestedText
          .replace(/['"“”‘’]/g, "")
          .replace(/\s+/g, "")
          .substring(0, 5);
        setStampText(suggestedText); // 更新印章文字状态
        showMessage("文案建议已更新！", "success");
      } else {
        console.error("Gemini API 返回了意外的结构:", result);
        showMessage("未能获取文案建议，请稍后再试。", "error");
      }
    } catch (error) {
      console.error("调用Gemini API时发生错误:", error);
      showMessage("获取文案建议时发生错误。", "error");
    } finally {
      setLoading(false);
    }
  };

  // 确保SVG响应式缩放
  useEffect(() => {
    const adjustSvgSize = (): void => {
      if (stampSvgRef.current) {
        const containerWidth = stampSvgRef.current.parentElement?.clientWidth || 0;
        stampSvgRef.current.style.width = `${containerWidth}px`;
        stampSvgRef.current.style.height = `${containerWidth / (300 / 150)}px`; // 保持2:1的宽高比
      }
    };

    adjustSvgSize(); // 初始调整
    window.addEventListener("resize", adjustSvgSize); // 监听窗口大小改变

    return () => {
      window.removeEventListener("resize", adjustSvgSize); // 清理事件监听器
    };
  }, []); // 仅在组件挂载和卸载时运行

  return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 font-sans'>
        <div className='bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 max-w-lg w-full'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>透明印章生成器</h1>

          {/* 印章预览区域 */}
          <div className='w-full flex justify-center items-center'>
            <svg
              ref={stampSvgRef}
              viewBox='0 0 300 150'
              xmlns='http://www.w3.org/2000/svg'
              className='border border-gray-200 rounded-lg bg-transparent max-w-full h-auto'>
              {/* 矩形边框 */}
              <rect
                x='75'
                y='50'
                width='150'
                height='50'
                rx='5'
                ry='5'
                className='stroke-red-500 stroke-[3] fill-none'
                transform='rotate(-10 150 75)'
              />
              {/* 印章文字 */}
              <text
                x='105'
                y='85'
                fontSize='30' // 调整y坐标确保居中
                className='font-bold fill-red-500 text-center'
                style={{ fontFamily: "SimHei, Heiti SC, sans-serif" }}
                transform='rotate(-10 150 75)'>
                {stampText}
              </text>
              {/* 椭圆边框 */}
              <ellipse
                cx='150'
                cy='75'
                rx='120'
                ry='65'
                className='stroke-red-500 stroke-[3] fill-none'
                transform='rotate(-10 150 75)'
              />
            </svg>
          </div>

          {/* 直接编辑印章文字的输入框 */}
          <div className='w-full flex flex-col items-center gap-3'>
            <label htmlFor='stampTextInput' className='text-gray-700 font-medium text-lg'>
              印章文字 (可编辑，最多5字):
            </label>
            <input
              type='text'
              id='stampTextInput'
              value={stampText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStampText(e.target.value)}
              maxLength={5}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl font-medium'
            />
          </div>

           {/* Gemini API Key 配置输入框 */}
           <div className="w-full flex flex-col items-center gap-3">
                    <label htmlFor="geminiApiKeyInput" className="text-gray-700 font-medium text-lg">
                        Gemini API Key:
                    </label>
                    <input
                        type="password" // 使用 password 类型隐藏输入内容
                        id="geminiApiKeyInput"
                        value={geminiApiKey}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setGeminiApiKey(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg"
                        placeholder="请输入你的 Gemini API Key"
                    />
                </div>

          {/* Gemini API 智能文案建议功能 */}
          <div className='w-full flex flex-col items-center gap-3 mt-4'>
            <label htmlFor='purposeInput' className='text-gray-700 font-medium text-lg'>
              印章用途描述 (例如: &quot;用于合同&quot;, &quot;表示已审核&quot;):
            </label>
            <textarea
              id='purposeInput'
              rows={3}
              value={purpose}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPurpose(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              placeholder='请输入印章的用途，获取智能文案建议...'></textarea>
            <button
              onClick={handleSuggestText}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out
                            ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"}`}>
              {loading ? (
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.106 21.14c-.996.608-2.231-.292-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007Z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
              <span>{loading ? "生成中..." : "✨ 获取文案建议"}</span>
            </button>
            {message.text && (
              <div
                className={`p-3 mt-2 text-sm rounded-lg w-full text-center
                            ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {message.text}
              </div>
            )}
          </div>

          {/* 下载按钮 */}
          <button
            onClick={handleDownload}
            className='w-full px-6 py-3 mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out'>
            下载透明印章 (PNG)
          </button>
          <p className='text-sm text-gray-600 mt-2'>点击上方按钮下载生成的透明印章图片。</p>
        </div>
      </div>
  );
}
