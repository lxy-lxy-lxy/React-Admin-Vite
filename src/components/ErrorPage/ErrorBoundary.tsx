import { Component } from "react";
import type { PropsWithChildren } from "react";
import ErrorPage from "@components/ErrorPage/index.tsx";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // 你同样可以将错误记录到一个错误报告服务器
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
