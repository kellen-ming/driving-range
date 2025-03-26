import { useMemo, useReducer } from "react";

// It's prefixed by `use` now, its a hook!
export function useFancyCounter() {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return Math.max(0, state - 1);
      default:
        return state;
    }
  }, 0);

  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });

  // Add fancy styles every time `count` doubles
  const fancyClass = useMemo(() => {

    switch (count) {
      case 1:
        return "text-red-400";
      case 2:
        return "text-green-400";
      case 3:
        return "text-blue-400";
      default:
        // Beyond 255
        return "";
    }
  }, [count]);

  return { fancyClass, increment, decrement, count };
};