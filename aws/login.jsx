/* global React, Icon, T24, msal */

function LoginScreen({ onSignIn }) {
  const [signing, setSigning] = React.useState(false);
  const [stage, setStage] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const [account, setAccount] = React.useState(null);

  /* === On mount: handle redirect OR restore cached session ===
     1. If returning from Microsoft redirect → complete sign-in.
     2. If a valid cached account exists → silently acquire token and auto sign-in.
     3. Otherwise → show login screen, user clicks once. */
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await window.msalReady;
        // Handle redirect return first
        const result = await window.msalInstance.handleRedirectPromise();
        if (cancelled) return;
        if (result && result.account) {
          window.msalInstance.setActiveAccount(result.account);
          setAccount(result.account);
          setStage("provision");
          setTimeout(() => onSignIn(result.account), 400);
          return;
        }
        // No redirect — check for a cached account and try silent token
        const cached = window.msalInstance.getAllAccounts()[0];
        if (cached) {
          setStage("provision");
          try {
            await window.msalInstance.acquireTokenSilent({
              scopes: ["openid", "profile", "email", "User.Read"],
              account: cached,
            });
            window.msalInstance.setActiveAccount(cached);
            if (!cancelled) onSignIn(cached);
          } catch {
            // Silent refresh failed — token truly expired, show login button
            if (!cancelled) setStage("idle");
          }
        }
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSignIn = async () => {
    setError(null);
    setSigning(true);
    setStage("auth");
    try {
      await window.msalReady;
      const loginScopes = ["openid", "profile", "email", "User.Read"];
      // On iOS/iPad: loginRedirect breaks with ITP clearing PKCE state.
      // Use loginPopup (triggered by user gesture, so not blocked by Safari).
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
        const result = await window.msalInstance.loginPopup({ scopes: loginScopes });
        window.msalInstance.setActiveAccount(result.account);
        setAccount(result.account);
        setStage("provision");
        setTimeout(() => onSignIn(result.account), 300);
      } else {
        await window.msalInstance.loginRedirect({ scopes: loginScopes });
      }
    } catch (e) {
      // Surface the real error code so it's debuggable
      const msg = e.errorCode ? `${e.errorCode}: ${e.message}` : (e.message || String(e));
      setError(msg);
      setSigning(false);
      setStage("idle");
    }
  };

  return (
    <div className="login-page">
      <section className="login-stage">
        <div className="login-glyph-bg">T</div>
        <div className="login-brand-mark">
          <span className="glyph">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 21V3l9 18 9-18v18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </span>
          <span>Projects <span className="muted" style={{ fontStyle: "italic" }}>by</span> <span className="amber">T24</span></span>
        </div>

        <div className="login-poetry">
          <div className="eyebrow login-eyebrow">A workspace · BLN24 ⨯ AWS</div>
          <h1 className="login-title">
            From a single<br/>
            client meeting<br/>
            <em>to a deck Fortune 500</em><br/>
            buyers <em>say yes</em> to.
          </h1>
          <p className="login-tagline">
            Drop in your meeting transcript. T24 drafts the narrative.
            Angie and Stephen review. Michael shapes the visuals.
            AWS approves. The deck writes itself — but it doesn't <em>feel</em> like it did.
          </p>

          <div className="login-process">
            {T24.stages.map((s, i) => (
              <div className="login-process-item" key={s.id}>
                <span className="num">{s.short}</span>
                <span className="nm">{s.name}</span>
                <span className="ds">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="login-meta">
          <span>projects.bln24.com / aws</span>
          <span>v 4.0 · 2026</span>
        </div>
      </section>

      <section className="login-form-side">
        <div className="login-card">
          <div className="eyebrow">Sign in</div>
          <h2 style={{ marginTop: 8 }}>Welcome back.</h2>
          <p className="sub">
            This workspace is restricted to BLN24 staff.
            Use your Microsoft Active Directory account.
          </p>

          {!signing && !account ? (
            <button className="sso-btn" onClick={handleSignIn}>
              <span className="ms-logo">
                <span></span><span></span><span></span><span></span>
              </span>
              Continue with Microsoft
              <Icon name="arrow_right" size={14} />
            </button>
          ) : (
            <div className="sso-flow">
              <div className={"sso-step " + (stage !== "idle" ? "active" : "")}>
                <span className="dot pulse" />
                <span>Redirecting to Microsoft Entra ID…</span>
                {(stage === "provision") && <Icon name="check" size={14} className="amber" />}
              </div>
              <div className={"sso-step " + (stage === "provision" ? "active" : "")}>
                <span className="dot pulse" />
                <span>{account ? "Welcome, " + (account.name || account.username) : "Verifying tenant membership…"}</span>
                {stage === "provision" && <Icon name="check" size={14} className="amber" />}
              </div>
              <div className={"sso-step " + (stage === "provision" ? "active" : "")}>
                <span className="dot pulse" />
                <span>Loading your plays from OpenClaw…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="sso-error">
              <strong>Sign-in failed.</strong>
              <span>{error}</span>
              <button className="sso-retry" onClick={() => { setError(null); setSigning(false); setStage("idle"); }}>Try again</button>
            </div>
          )}

          <div className="login-divider">Single sign-on · BLN24 tenant only</div>

          <div className="login-foot">
            By signing in, you agree to BLN24's acceptable-use policy.<br/>
            Trouble accessing? <span className="amber">Contact Angie</span>.
          </div>
        </div>
      </section>

      <style>{`
        .sso-flow { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
        .sso-step {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px;
          background: var(--paper-elev-2);
          border: 1px solid var(--line);
          border-radius: var(--r-sm);
          font-size: 13px;
          color: var(--muted);
          opacity: 0.4;
          transition: opacity .3s;
        }
        .sso-step.active { opacity: 1; color: var(--ink-soft); }
        .sso-step .dot { width: 8px; height: 8px; border-radius: 99px; background: var(--accent); }
        .sso-step > span:nth-child(2) { flex: 1; }
        .sso-error {
          margin-top: 20px;
          padding: 14px 16px;
          background: rgba(220, 70, 60, 0.08);
          border: 1px solid rgba(220, 70, 60, 0.4);
          border-radius: var(--r-sm);
          display: flex; flex-direction: column; gap: 6px;
          font-size: 12.5px;
        }
        .sso-error strong { color: #d8463c; }
        .sso-error span { color: var(--muted); word-break: break-word; }
        .sso-retry {
          align-self: flex-start; margin-top: 4px;
          background: none; border: 1px solid var(--line); color: var(--ink);
          padding: 6px 12px; border-radius: var(--r-xs);
          font-family: inherit; font-size: 12px; cursor: pointer;
        }
        .sso-retry:hover { background: var(--paper-elev-2); }
      `}</style>
    </div>
  );
}

window.LoginScreen = LoginScreen;
