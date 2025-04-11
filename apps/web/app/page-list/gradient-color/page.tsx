"use client";

import { PropsWithChildren } from "react";
import clsx from "clsx";

export interface GradientColor {
  colors: string[];
  
}

export interface Card extends PropsWithChildren {
  className?: string;
  glassEffect?: boolean;
}

function Card(props: Card) {
  const { children, className = '', glassEffect = true } = props
  
  const baseClasses = `
    min-w-72 min-h-32
    border 
    rounded-xl shadow-lg 
    transform 
    transition-all duration-500 ease-out
    hover:shadow-xl hover:-translate-y-3
    overflow-hidden 
    p-5
    cursor-pointer
  `;
  
  const bgClasses = glassEffect 
    ? 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15' 
    : 'bg-white border-gray-100 hover:bg-gray-50';
    
  return (
    <div className={clsx(
     `${baseClasses} ${bgClasses}`,
     className 
    )}>
      <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-105">
        {children}
      </div>
      {glassEffect && (
        <div 
          className="
            absolute 
            inset-0 
            bg-gradient-to-br 
            from-white/5 
            to-white/10 
            z-0 
            opacity-40 
            rounded-xl
            transition-opacity 
            duration-500 
            ease-out 
            hover:opacity-60"
          ></div>
      )}
    </div>
  )
}

export default function GradientColor() {
  const gradientColor: GradientColor[] = [
    {
      colors: ['#FEE9CB', '#14485E', '#C2FCC4']
    }
  ]
  return (
    // <div className="min-h-screen  p-8 flex flex-wrap gap-6 items-start justify-center">
    <div className="min-h-screen bg-gradient-to-b from-[#EF6837] to-[#114468] p-8 flex flex-wrap gap-6 items-start justify-center">
      <Card>
        <h3 className="text-white font-medium text-lg mb-3">自然色调</h3>
        <div className='h-40 w-full rounded-lg overflow-hidden flex'>
          {/* {gradientColor[0].colors.map((color, index) => (
            <div 
              key={index} 
              className="flex-1 flex items-end justify-center p-2" 
              style={{ backgroundColor: color }}
            >
              <span className="text-xs bg-black/30 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                {color}
              </span>
            </div>
          ))} */}
        </div>
      </Card>
      
      {/* 可以添加更多卡片 */}
    </div>  
  )
}