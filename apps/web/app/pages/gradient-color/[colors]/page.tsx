"use client"
import React, { useState } from "react";

export interface ColoBackgrounDBoardProps {
  params: Promise<Record<string, string>>
}

export default function ColoBackgrounDBoard(props: ColoBackgrounDBoardProps) {
  const [ direction, setDirection ] = useState<'row' | 'column'>('row')
  
  // 用 React.use() 解包 Promise
  const params = React.use(props.params);
  const { colors } = params;
  console.log({colors,params});
  

  if(!colors) return;
  const formatColors = decodeURIComponent(colors).split(',')

  // 生成"硬切分"的 background
  const percent = 100 / formatColors.length;
  const colorStops = formatColors.map((color, idx) => {
    const start = percent * idx;
    const end = percent * (idx + 1);
    return `${color} ${start}% ${end}%`;
  }).join(', ');

  const backgroundDirection = direction === 'column' ? 'to bottom' : 'to right';
  const background = `linear-gradient(${backgroundDirection}, ${colorStops})`;

  // 最外层样式
  const layOutStyle: React.CSSProperties = {
    background,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  // 颜色块容器样式（不需要再设置背景色）
  const colorBlocksStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    width: direction === 'row' ? '24rem' : 'fit-content',
    height: direction === 'column' ? '24rem' : 'fit-content',
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
    color: 'black',
    fontWeight: 600,
    fontSize: '1.2rem',
  });

  return (
    <div style={layOutStyle} className='relative'>
      <div
        style={colorBlocksStyle}
        onClick={() => setDirection(pre => pre === 'row' ? 'column' : 'row')}
      >
        {
          formatColors?.map((color, index) => (
            <div  key={index} style={getBlockStyle(color)}>
              {color}
            </div>
          ))
        }
      </div>
    </div>
  );
}
