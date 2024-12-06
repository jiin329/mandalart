import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client"; // React 18 이상
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import MandalartPage from "./mandalartPage";
import GlobalStyle from "./style/globalStyle";

import { darkTheme, lightTheme } from "./style/themes";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const kakaoLogin = () => {
    const redirectUri = "redirectUri"; // 카카오 로그인 후 리다이렉트할 URL
    const clientId = ""
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    // 팝업을 열고 카카오 로그인 페이지로 이동
    const popup = window.open(
      kakaoLoginUrl,
      "Kakao Login",
      "width=500,height=600"
    );

    // 팝업에서 인증 후, 결과를 받아올 때 사용할 메커니즘 (예: 팝업을 닫은 후 부모 창에서 URL을 확인)
    const checkPopupInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupInterval);
        // 팝업이 닫혔을 때, 부모 창에서 인증 결과를 처리할 수 있음
        // 인증된 코드를 서버로 보내서 토큰을 받아오는 등의 작업을 할 수 있습니다.
      }
    }, 500);

    // https://kauth.kakao.com/oauth/authorize?client_id=895550bfa3b03ce09a479321ec51eb47&redirect_uri=http:%2F%2Flocalhost:8080%2Flogin&response_type=code
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <MainContainer>
          <button onClick={toggleTheme}>
            {theme === "light" ? "다크 모드로 전환" : "화이트 모드로 전환"}
          </button>
          <button onClick={kakaoLogin}>
            <img
              src={require("./public/img/kakao_login_small.png").default}
              alt="Button"
            />
          </button>
          <MandalartPage />
        </MainContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

const MainContainer = styled.div`
  background-color: #f5f5f5; /* 전체 배경색 */
  margin: 20px; /* 원하는 공백 크기로 조정 */
  padding: 10px; /* 필요 시 내부 여백 추가 */
  box-sizing: border-box; /* 패딩과 테두리를 포함 */
`;
