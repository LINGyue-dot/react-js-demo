import { useEffect } from "react";
import { create } from "zustand";
import zukeeper from "zukeeper";

const useStore2 = create(
  zukeeper((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
  }))
);

const useStore1 = create(
  zukeeper((set) => ({
    biggerCount: useStore2.getState().count + 1,
    setBiggerCount: (data) => set(() => ({ biggerCount: data })),
  }))
);
window.store = useStore1;

function Counter() {
  const { biggerCount, setBiggerCount } = useStore1();
  const { count, inc } = useStore2();

  // 1. useEffect 直接监听
  // useEffect(() => {
  //   setBiggerCount(count + 1);
  // }, [count]);
  // 2. 使用 subscribe
  useStore2.subscribe((state) => {
    setBiggerCount(state.count + 1);
  });
  return (
    <div>
      <p>{count}</p>
      <p>{biggerCount}</p>
      <p>{name}</p>
      <button
        onClick={() => {
          inc();
        }}
      >
        one up
      </button>
    </div>
  );
}

function App() {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <Counter />
    </div>
  );
}

export default App;
