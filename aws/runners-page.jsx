/* global React */
/* RunnersPage — surfaces RUNNERS.md as a clean technical doc inside the app.
   Lets the team see the wiring spec without leaving. */

/* Tiny markdown renderer — handles headings, paragraphs, lists, code,
   tables, hr. Not a full parser; tuned for this one doc. */
function renderMarkdown(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  let listBuf = null;
  let codeBuf = null;
  let codeLang = "";
  let tableBuf = null;

  const flushList = () => {
    if (listBuf) {
      out.push(<ul key={`u${i}`} className="rdoc-list">{listBuf}</ul>);
      listBuf = null;
    }
  };
  const flushTable = () => {
    if (tableBuf) {
      const [head, ...rows] = tableBuf;
      out.push(
        <div key={`t${i}`} className="rdoc-table-wrap">
          <table className="rdoc-table">
            <thead><tr>{head.map((c, j) => <th key={j}>{renderInline(c)}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, j) => <td key={j}>{renderInline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuf = null;
    }
  };

  while (i < lines.length) {
    const ln = lines[i];

    // Code fence
    if (ln.startsWith("```")) {
      flushList(); flushTable();
      if (codeBuf == null) {
        codeBuf = [];
        codeLang = ln.slice(3).trim();
      } else {
        out.push(
          <pre key={`c${i}`} className="rdoc-code"><code data-lang={codeLang}>{codeBuf.join("\n")}</code></pre>
        );
        codeBuf = null;
        codeLang = "";
      }
      i++; continue;
    }
    if (codeBuf != null) { codeBuf.push(ln); i++; continue; }

    // Table row
    if (/^\s*\|.*\|\s*$/.test(ln)) {
      // skip the separator row "| --- | --- |"
      if (/^\s*\|[\s|:-]+\|\s*$/.test(ln)) { i++; continue; }
      flushList();
      const cells = ln.replace(/^\s*\||\|\s*$/g, "").split("|").map(s => s.trim());
      if (!tableBuf) tableBuf = [];
      tableBuf.push(cells);
      i++; continue;
    } else {
      flushTable();
    }

    // HR
    if (/^---+\s*$/.test(ln)) {
      flushList();
      out.push(<hr key={`h${i}`} className="rdoc-hr" />);
      i++; continue;
    }

    // Heading
    const h = ln.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flushList();
      const level = h[1].length;
      const Tag = `h${level + 1}`;  // h1->h2 (we already have a page title)
      out.push(React.createElement(Tag, { key: `H${i}`, className: `rdoc-h rdoc-h${level}` }, renderInline(h[2])));
      i++; continue;
    }

    // Blockquote
    if (ln.startsWith("> ")) {
      flushList();
      const buf = [ln.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].startsWith("> ")) {
        buf.push(lines[++i].slice(2));
      }
      out.push(<blockquote key={`q${i}`} className="rdoc-quote">{renderInline(buf.join(" "))}</blockquote>);
      i++; continue;
    }

    // Numbered list
    const num = ln.match(/^(\d+)\.\s+(.+)$/);
    if (num) {
      if (!listBuf || listBuf.type !== "ol") {
        flushList();
        listBuf = [];
        listBuf.type = "ol";
      }
      listBuf.push(<li key={`l${i}`}>{renderInline(num[2])}</li>);
      i++; continue;
    }

    // Bullet list
    if (/^\s*-\s+/.test(ln) && !ln.startsWith("---")) {
      const item = ln.replace(/^\s*-\s+/, "");
      if (!listBuf) listBuf = [];
      listBuf.push(<li key={`l${i}`}>{renderInline(item)}</li>);
      i++; continue;
    } else {
      flushList();
    }

    // Paragraph
    if (ln.trim()) {
      const buf = [ln];
      while (i + 1 < lines.length && lines[i + 1].trim() && !lines[i + 1].match(/^(#|>|-|\d+\.|```|\|)/)) {
        buf.push(lines[++i]);
      }
      out.push(<p key={`p${i}`} className="rdoc-p">{renderInline(buf.join(" "))}</p>);
    }
    i++;
  }
  flushList(); flushTable();
  return out;
}

/* Inline: **bold**, `code`, [text](url) */
function renderInline(text) {
  const parts = [];
  let rest = text;
  let key = 0;
  // Order matters: code before bold so backticks aren't eaten
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let m;
  let lastIdx = 0;
  while ((m = re.exec(rest)) !== null) {
    if (m.index > lastIdx) parts.push(rest.slice(lastIdx, m.index));
    const tok = m[0];
    if (tok.startsWith("`")) parts.push(<code key={key++} className="rdoc-inline-code">{tok.slice(1, -1)}</code>);
    else if (tok.startsWith("**")) parts.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    else {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      parts.push(<a key={key++} href={lm[2]} target="_blank" rel="noopener">{lm[1]}</a>);
    }
    lastIdx = m.index + tok.length;
  }
  if (lastIdx < rest.length) parts.push(rest.slice(lastIdx));
  return parts;
}

function RunnersPage() {
  const [md, setMd] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("play-kit/RUNNERS.md")
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(setMd)
      .catch(err => setError(String(err)));
  }, []);

  return (
    <main className="runners-page">
      <div className="runners-shell">
        <header className="runners-head">
          <div className="runners-eyebrow">PLAY KIT · WIRING SPEC</div>
          <h1 className="runners-title">Runners</h1>
          <p className="runners-sub">
            How the play kit becomes a working agent system. Filesystem-and-prompts contract — any orchestrator implements against this.
          </p>
          <div className="runners-meta">
            <span className="runners-meta-item">
              <span className="muted">Source:</span> <code>play-kit/RUNNERS.md</code>
            </span>
            <span className="runners-meta-item">
              <span className="muted">Status:</span> Draft · v0.1
            </span>
            <span className="runners-meta-item">
              <span className="muted">Owner:</span> Stephen
            </span>
          </div>
        </header>

        {error && (
          <div className="runners-state runners-state-err">
            Couldn't load RUNNERS.md ({error}).
          </div>
        )}
        {!error && !md && <div className="runners-state">Loading…</div>}
        {md && <div className="rdoc">{renderMarkdown(md)}</div>}

        <footer className="runners-foot">
          <div className="runners-foot-callout">
            <div className="runners-foot-eyebrow">NEXT</div>
            <p>
              Build the local server first (50-line Express app) — then switch this UI's
              storage from <code>localStorage</code> to the kit API. Anvil runner second.
              One real play before adding Scout and Scribe.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

window.RunnersPage = RunnersPage;
