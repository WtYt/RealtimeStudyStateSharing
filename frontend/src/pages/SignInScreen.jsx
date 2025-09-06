import React, { useState } from 'react';
import './SignInScreen.css';

const SignInScreen = () => {
  const [screen, setScreen] = useState('signin'); // 'signin' or 'signup'

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('ログイン処理実行');
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('新規登録処理実行');
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        {screen === 'signin' ? (
          <>
            <h1 className="signin-title">ログイン</h1>
            <form className="signin-form" onSubmit={handleSignIn}>
              <label htmlFor="email" className="signin-label">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                placeholder="メールアドレス"
                className="signin-input"
                required
              />
              <label htmlFor="password" className="signin-label">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                placeholder="パスワード"
                className="signin-input"
                required
              />
              <button type="submit" className="signin-button">
                ログイン
              </button>
            </form>
            <span
              className="switch-screen-link"
              onClick={() => setScreen('signup')}
              style={{
                marginTop: 16,
                color: '#4f8cff',
                cursor: 'pointer',
                textDecoration: 'underline',
                display: 'inline-block',
              }}
              role="button"
              tabIndex={0}
            >
              新規登録はこちら
            </span>
          </>
        ) : (
          <>
            <h1 className="signin-title">新規登録</h1>
            <form className="signin-form" onSubmit={handleSignUp}>
              <label htmlFor="signup-email" className="signin-label">
                メールアドレス
              </label>
              <input
                type="email"
                id="signup-email"
                placeholder="メールアドレス"
                className="signin-input"
                required
              />
              <label htmlFor="signup-password" className="signin-label">
                パスワード
              </label>
              <input
                type="password"
                id="signup-password"
                placeholder="パスワード"
                className="signin-input"
                required
              />
              <label htmlFor="signup-name" className="signin-label">
                ニックネーム
              </label>
              <input
                type="text"
                id="signup-name"
                placeholder="ニックネーム"
                className="signin-input"
                required
              />
              <button type="submit" className="signin-button">
                登録
              </button>
            </form>
            <span
              className="switch-screen-link"
              onClick={() => setScreen('signin')}
              style={{
                marginTop: 16,
                color: '#4f8cff',
                cursor: 'pointer',
                textDecoration: 'underline',
                display: 'inline-block',
              }}
              role="button"
              tabIndex={0}
            >
              ログインはこちら
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInScreen;
