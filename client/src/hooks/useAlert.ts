import { useCallback } from "react";

export const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    window.alert(message);
  }, []);
  return showAlert;
};
// 이렇게 Alert를 Hook으로 만들어주면 후에 style을 입히기 편하다.
