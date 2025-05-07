"use client"
import React from "react";

export interface ColoBackgrounDBoardProps {
  params: Promise<Record<string, string>>
}

function isLightColor(color: string): boolean {
  // 移除可能的 # 前缀
  const hex = color.replace('#', '');
  
  // 解析RGB值
  let r = 0, g = 0, b = 0;
  
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    return true; // 默认为浅色
  }
  
  // 计算亮度 (HSP color model)
  const brightness = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );
  
  // 亮度大于127.5视为浅色
  return brightness > 127.5;
}

export default function ColoBackgrounDBoard(props: ColoBackgrounDBoardProps) {
  
  // 用 React.use() 解包 Promise
  const params = React.use(props.params);
  const { colors } = params;
  console.log({colors,params});
  

  if(!colors) return;
  const formatColors = decodeURIComponent(colors).split(',')
  const len = formatColors.length
  // 生成"硬切分"的 background
  const percent = 100 / len;
  const colorStops = formatColors.map((color, idx) => {
    const start = percent * idx;
    const end = percent * (idx + 1);
    return `${color} ${start}% ${end}%`;
  }).join(', ');

  const background = `linear-gradient(to right, ${colorStops})`;

  // 最外层样式
  const layOutStyle: React.CSSProperties = {
    background,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: len > 2 ? 'end' : 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: len > 2 ? '5rem' : 'none'
  };

  // 颜色块容器样式（不需要再设置背景色）
  const colorBlocksStyle: React.CSSProperties = {
    display: 'flex',
    width: '24rem',
    height: 'fit-content',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    transition: 'all 0.4s',
    background: 'transparent',
  };

  // 每个颜色块样式（可以只显示文字或直接不显示）
  const getBlockStyle = (color: string) => ({
    backgroundColor: color,
    padding: '1rem',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isLightColor(color) ? 'black': 'white',
    fontWeight: 600,
    fontSize: '1.2rem',
  });

  return (
    <div style={layOutStyle} className='relative'>
      <div
        style={colorBlocksStyle}
      >
        {
          formatColors?.map((color, index) => (
            <div 
              key={index} style={getBlockStyle(color)}>
              {color}
            </div>
          ))
        }
      </div>
    </div>
  );
}
