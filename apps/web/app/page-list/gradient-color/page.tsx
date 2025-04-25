"use client";
import Link from "next/link";
import { Url } from "url";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { PageWrapper } from "../../components/ui/page-wrapper";

export interface GradientColor {
  colors: string[];  
}

export interface Card extends PropsWithChildren {
  className?: string;
  glassEffect?: boolean;
  href?: string;
}

function Card(props: Card) {
  const { children, className = '', glassEffect = true, href } = props
  
  const baseClasses = `
    min-w-72 min-h-32
    inline-block
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
    

  const content = (
    <>
      <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-105">
        {children}
      </div>
      {glassEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 z-0 opacity-40 rounded-xl
                      transition-opacity duration-500 ease-out hover:opacity-60"></div>
      )}
    </>
  )
  return href ? (
    <Link href={href} className={`${baseClasses} ${bgClasses} ${className}`}>
      {content}
    </Link>
  ) : (
    <div className={`${baseClasses} ${bgClasses} ${className}`}>
      {content}
    </div>
  );
}

export default function GradientColor() {
  const gradientColor: string[][] = [
     ['#EF6837', '#114468'],
     ['#FEE9CB', '#14485E', '#C2FCC4']
  ]

  return (
    <PageWrapper>
        <div className="relative py-16 px-4 sm:px-6 lg:px-8">
          {gradientColor.map((item, index) => {
            const len = item.length
            const gradientClassName = len > 2 ? `from-[${item[0]}] via-[${item[1]}] to-[${item[2]}]` : `from-[${item[0]}] to-[${item[1]}]`
            return (
              <Card key={index} href={`/page-list/gradient-color/${item.join(',')}`}>
                <div 
                  className={clsx("flex p-3 text-white justify-between rounded-2xl bg-gradient-to-r shadow-xl", gradientClassName)}
                >
                  {
                    item.map((color, i) => (
                      <span key={i}>{color}</span>
                    ))
                  }
                </div>
              </Card>
            )  
          })}
          <Card>
            <h3 className="text-white font-medium text-lg mb-3">自然色调</h3>
            {/* <div className='h-40 w-full rounded-lg overflow-hidden flex'> */}
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
            {/* </div> */}
            
          </Card>
        </div>
    </PageWrapper> 
  )
}