// Website အပြည့်ကို ဖွင့်ထားရင် ပင်မစာမျက်နှာကို ပြန်သွားတဲ့ ခလုတ် ထည့်တာ
// Laptop screen ထဲ (iframe) မှာဆိုရင် မပြဘူး
(function () {
  if (window.self !== window.top) return;

  var style = document.createElement("style");
  style.textContent =
    ".portfolio-back{position:fixed;right:24px;bottom:24px;z-index:9999;display:inline-flex;align-items:center;gap:8px;" +
    "padding:12px 20px;border-radius:999px;background:rgba(20,20,20,.88);color:#fff;font:500 15px/1.2 Arial,'Hiragino Sans',sans-serif;" +
    "letter-spacing:0;text-decoration:none;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,.28);transition:transform .25s ease,background .25s ease}" +
    ".portfolio-back:hover{transform:translateY(-3px);background:#000}" +
    ".portfolio-back:focus-visible{outline:2px solid #fff;outline-offset:3px}";
  document.head.appendChild(style);

  var link = document.createElement("a");
  link.className = "portfolio-back";
  link.href = "../../index.html#projects";
  link.textContent = "← Back to Portfolio";
  document.body.appendChild(link);
})();
