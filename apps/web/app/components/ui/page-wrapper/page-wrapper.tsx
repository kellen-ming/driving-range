import { PropsWithChildren } from "react"

export function PageWrapper(props: PropsWithChildren) {
  
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-30">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 rounded-full bg-pink-100/50 blur-3xl" />
      </div>
        {props.children}
      </div>
  );
}
