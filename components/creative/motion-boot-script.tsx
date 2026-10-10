import { PRELOADER_STORAGE_KEY } from "./preloader-key";

/**
 * Runs before first paint (inline in <head>):
 * - html.motion-ok when the visitor allows motion (pre-hides hero split headings)
 * - html[data-preload] on the first visit to "/" (shows the preloader)
 * Both have CSS failsafes, so a JS failure can never hide content.
 */
const script = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(r)return;d.classList.add('motion-ok');var seen=null;try{seen=localStorage.getItem('${PRELOADER_STORAGE_KEY}')}catch(e){}if(!seen&&location.pathname==='/'){d.setAttribute('data-preload','');d.classList.add('intro-delay');}}catch(e){}})();`;

export function MotionBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
