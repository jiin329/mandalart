import React from "react";
import ReactDOM from "react-dom/client"; // React 18 이상

const App: React.FC = () => {
  return <h1>Hello, React with TypeScript!</h1>;
};

// React 18 이상에서는 root를 생성하여 렌더링합니다.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
