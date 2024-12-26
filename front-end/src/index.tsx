import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client"; // React 18 이상
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import kakaoSmallLogo from "./assets/img/kakao_login_small.png";
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
    const redirectUri = "redirectUri";
    const clientId = "clienId";
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    // 팝업을 열고 카카오 로그인 페이지로 이동
    const popup = window.open(
      kakaoLoginUrl,
      "Kakao Login",
      "width=500,height=600"
    );

    const checkPopupInterval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkPopupInterval);
      }
    }, 500);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <MainContainer>
          <ButtonContainer>
            <ThemeButton onClick={toggleTheme}>
              {theme === "light" ? "다크 모드로 보기" : "화이트 모드로 보기"}
            </ThemeButton>
            <KakaoLoginButton onClick={kakaoLogin}>
              <img src={kakaoSmallLogo} alt="Button" />
            </KakaoLoginButton>
          </ButtonContainer>
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
`;

const ButtonContainer = styled.div`
  display: flex; /*자식 요소 배치 정의*/
  justify-content: flex-end; /*오른쪽 끝으로 정렬*/
  padding: 3% 2% 0 0;
`;

const KakaoLoginButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  background-size: contain;
  overflow: hidden; /*이미지가 버튼 밖으로 나가지 않도록*/
  display: inline-flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%; /*버튼 너비에 맞게*/
    height: 100%; /*버튼 높이에 맞게*/
    object-fit: contain; /*이미지가 왜곡되지 않게 채우기*/
  }
`;

const ThemeButton = styled.button`
  border: 1px solid rgba(230, 230, 230, 0.7);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 10;
  font-size: 12px;
  font-color: #202020;
  transition: background-color 0.2s ease; /* 부드러운 색상 변화 효과 */
  display: inline-flex;
  justify-content: center; /*버튼 내부 가로축 정중앙 위치*/
  align-items: center; /*버튼 내부 세로축 정중앙 위치*/

  &:hover {
    background-color: rgba(50, 50, 50, 0.7);
    color: #f2f2f2;
  }
`;
