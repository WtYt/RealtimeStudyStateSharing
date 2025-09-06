import React, { useState } from 'react';
import { SignIn, SignUp } from '../api/auth';
import './SignInScreen.css';

const SignInScreen = ({ onLoginSuccess }) => {
  const [screen, setScreen] = useState('signin'); // 'signin' or 'signup'

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await SignIn(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError('ログインに失敗しました: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = e.target['signup-email'].value;
    const password = e.target['signup-password'].value;
    const nickname = e.target['signup-name'].value;
    try {
      await SignUp(email, password, nickname);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError('新規登録に失敗しました: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
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
                disabled={loading}
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
                disabled={loading}
              />
              <button
                type="submit"
                className="signin-button"
                disabled={loading}
              >
                {loading ? '処理中...' : 'ログイン'}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
              <button
                type="submit"
                className="signin-button"
                disabled={loading}
              >
                {loading ? '処理中...' : '登録'}
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
