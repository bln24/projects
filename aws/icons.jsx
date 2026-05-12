/* global React */
// Tiny inline SVG icon set — minimal, line-based, 1.6 stroke.
// Usage: <Icon name="search" size={16} />
const ICONS = {
  search: <><circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.6-3.6"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  arrow_right: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  arrow_left: <><path d="M19 12H5M11 6l-6 6 6 6"/></>,
  arrow_up_right: <><path d="M7 17 17 7M9 7h8v8"/></>,
  chevron_right: <><path d="m9 6 6 6-6 6"/></>,
  chevron_down: <><path d="m6 9 6 6 6-6"/></>,
  chevron_up: <><path d="m6 15 6-6 6 6"/></>,
  close: <><path d="M6 6l12 12M18 6 6 18"/></>,
  check: <><path d="m4 12 5 5L20 6"/></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
  bell_dot: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/><circle cx="19" cy="5" r="3" fill="currentColor" stroke="none"/></>,
  alert: <><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></>,
  command: <><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3Z"/></>,
  doc: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 14h6M9 17h4"/></>,
  doc_text: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></>,
  film: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M7 12h10"/></>,
  presentation: <><path d="M2 4h20M3 4v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4M12 17v4M9 21h6"/></>,
  sparkles: <><path d="m12 4 1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7Z"/><path d="M19 4v3M21 5h-4M5 17v3M7 19H3"/></>,
  message: <><path d="M21 12a8 8 0 0 1-12 6.9L3 21l2.1-6A8 8 0 1 1 21 12Z"/></>,
  send: <><path d="m22 2-9 19-2-8-8-2Z"/></>,
  paperclip: <><path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 1 1-2.8-2.8l7-7"/></>,
  upload: <><path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3M7 9l5-5 5 5M12 4v12"/></>,
  download: <><path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3M7 11l5 5 5-5M12 16V4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  users: <><circle cx="9" cy="8" r="4"/><circle cx="17" cy="9" r="3"/><path d="M2 21a7 7 0 0 1 14 0M16 21a5 5 0 0 1 6-3"/></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></>,
  folder_open: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v0M3 7v11a2 2 0 0 0 2 2h13l3-9H6Z"/></>,
  more: <><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></>,
  filter: <><path d="M3 5h18l-7 9v6l-4-2v-4Z"/></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/></>,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
  shield: <><path d="M12 3 4 6v6c0 5 3 8 8 9 5-1 8-4 8-9V6Z"/></>,
  link: <><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></>,
  edit: <><path d="M14 4 18 8 8 18l-5 1 1-5Z"/></>,
  pencil: <><path d="m16 3 5 5L8 21H3v-5Z"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  star: <><path d="m12 3 2.6 6 6.4.5-4.9 4.4 1.5 6.4L12 17l-5.6 3.3L8 13.9 3 9.4 9.4 9Z"/></>,
  bookmark: <><path d="M5 3h14v18l-7-5-7 5Z"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5M3 18l9 5 9-5"/></>,
  flow: <><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h10M7 18h10M5 8v8M19 8v8"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>,
  flame: <><path d="M12 21c-4 0-7-2.5-7-6 0-2.5 2-3.5 2-6 0 1.5 1 2 1 2s1-7 6-8c-1 3 1 4 2 6 1.5 3 3 4 3 6 0 3.5-3 6-7 6Z"/></>,
  zap: <><path d="M13 2 4 14h7l-1 8 9-12h-7Z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
  code: <><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></>,
  moon: <><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z"/></>,
  dot: <><circle cx="12" cy="12" r="2" fill="currentColor"/></>,
  drag: <><circle cx="9" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="15" cy="18" r="1.4"/></>,
  return: <><path d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 5 5v6"/></>,
  refresh: <><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/></>,
  warning: <><path d="M12 3 2 21h20Z"/><path d="M12 10v5M12 18v.01"/></>,
};

function Icon({ name, size = 16, className = "", style = {}, strokeWidth = 1.6 }) {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

window.Icon = Icon;
