"use client";

import { useEffect } from "react";
import { useFancyCounter } from "../../hooks/useFancyCounter";
import clsx from "clsx";

export default function HeadlessDemo() {
  const { fancyClass, increment, count } = useFancyCounter();

  // performing some event once the count reaches 10
  useEffect(() => {
    if (count === 10) {
      showFireworks();
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const showFireworks = () => {
    console.log({ count });
  };
  return (
    <div>
      <h1>My Counter App</h1>
      {/* rendering the `{count}` outside of the `<button>` */}
      <h2>Count is at {count}</h2>
      <button
        onClick={increment}
        // extend button styling
        className={clsx(fancyClass, "some-other-class")}>
        Increment by 1
      </button>
      {/* adding another button to increment the count by two */}
      <button
        onClick={() => {
          increment();
          increment();
        }}>
        Increment by 2
      </button>
    </div>
  );
}
