import Link from "next/link";
import { PropsWithChildren } from "react"
import './index.css'

export interface CardProps {
  path: string;
}

export function Card(props: PropsWithChildren<CardProps>) {
  
  const { path, children } = props
  return (
    <Link 
      href={path}
      className="card relative inline-block rounded-md"
    >
      <div className="relative rounded-lg p-6">
        {children}
      </div>
    </Link>
  );
}
