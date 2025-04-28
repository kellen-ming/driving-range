"use client"

import Link from "next/link";
import React, { useState } from "react";

export interface ColoBackgrounDBoardProps {
  params: Promise<Record<string, string>>
}

export default function ColoBackgrounDBoard(props: ColoBackgrounDBoardProps) {
  const [ direction, setDirection ] = useState<'row' | 'column'>('row')
  
  // 用 React.use() 解包 Promise
  const params = React.use(props.params);
  const { colors } = params;

  if(!colors) return;
  const formatColors = decodeURIComponent(colors).split(',')
  
  const backgroundDirection =  direction === 'column' ? 'bottom' : 'right'
  const background = formatColors.length > 2 
    ? `linear-gradient(to ${backgroundDirection}, ${formatColors[0]}, ${formatColors[1]}, ${formatColors[2]})` 
    : `linear-gradient(to ${backgroundDirection}, ${formatColors[0]}, ${formatColors[1]})`;

  const layOutStyle: React.CSSProperties = {
    background,
  };

  const innerStyle: React.CSSProperties = {
    background,
    flexDirection: direction,
    width: direction === 'row' ? '24rem' : 'fit-content',
    height: direction === 'column' ? '24rem' : 'fit-content',
    transition: 'all 0.4s ',
  };
  

  return (
    <div 
      style={layOutStyle}
      className='relative min-h-screen flex justify-center items-center flex-col'
    >
      <Link 
        href={'/page-list/gradient-color'}
        className="mb-4 text-xl"
      >👈</Link>
      <div
        style={innerStyle}
        className='relative flex p-3 text-white justify-between rounded-2xl shadow-xl cursor-pointer'
        onClick={() => setDirection(pre => pre === 'row' ? 'column' : 'row')}
      >
        {
          formatColors?.map((color, index) => (
            <span key={index} className="">{color}</span>
          ))
        }
      </div>
    </div>
    
  );
}
