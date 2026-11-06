// ===== လိုအပ်တဲ့ အပိုင်းတွေ ယူထားတာ =====
var track  = document.getElementById("track");
var world  = document.getElementById("world");
var lid    = document.getElementById("lid");
var screenBox = document.getElementById("screen");
var shot   = document.getElementById("shot");
var hint   = document.getElementById("hint");
var titleBox = document.querySelector(".title");
var platform = document.querySelector(".platform");

// ===== ပြင်လို့ရတဲ့ ဂဏန်းတွေ =====
var START_TILT = 52;     // အစမှာ အပေါ်ကနေ ငုံ့ကြည့်တဲ့ ထောင့် (ကြီးရင် ပိုမတ်မတ်ကြည့်ရမယ်)
var START_TURN = -30;    // အစမှာ laptop လှည့်ထားတဲ့ ထောင့် (ပုံထဲကလို ယိုင်ထားတာ)
var END_TILT   = 75;     // နောက်ဆုံး screen ကို မျက်နှာချင်းဆိုင်ကြည့်တဲ့ ထောင့်
var WEB_SPEED  = 1.2;    // website scroll ဆင်းတာ (ကြီးရင် ပိုနှေးတယ်)

var LID_Y = 262, LID_Z = 196;   // laptop screen အလယ်နေရာ (မထိပါနဲ့)

var intro = 0, cur = 0;
var mx = 0, my = 0, tmx = 0, tmy = 0;
var D = 800, S = 0;

function lerp(a, b, t) { return a + (b - a) * t; }

// ===== page ရဲ့ scroll အမြင့်ကို တွက်တာ =====
function measure() {
  // code နဲ့ရေးထားတဲ့ website ဆိုရင် screen အကျယ်နဲ့ အံကိုက်ဖြစ်အောင် ချုံ့တာ
  if (shot.classList.contains("site")) {
    var siteW = Number(shot.dataset.width);
    var siteH = Number(shot.dataset.height);
    var frame = shot.querySelector("iframe");
    var ratio = screenBox.clientWidth / siteW;
    frame.style.width = siteW + "px";
    frame.style.height = siteH + "px";
    frame.style.transform = "scale(" + ratio + ")";
    shot.style.height = siteH * ratio + "px";
  }
  D = window.innerHeight;                                   // laptop ကို ချဉ်းကပ်တဲ့ scroll အရှည်
  S = Math.max(0, shot.offsetHeight - screenBox.clientHeight); // website ပုံ ဘယ်လောက် ဆင်းရမလဲ
  track.style.height = (window.innerHeight + D + S * WEB_SPEED + 200) + "px";
}
shot.addEventListener("load", measure);
window.addEventListener("resize", measure);
measure();

// ===== Laptop ကို 0.7 စက္ကန့်နောက် ဖွင့်မယ် =====
setTimeout(function () { lid.classList.add("open"); }, 700);

// ===== Mouse နဲ့ နည်းနည်း ယိမ်းမယ် =====
window.addEventListener("mousemove", function (e) {
  tmx = (e.clientX / window.innerWidth - 0.5) * 2;
  tmy = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ===== တစ်ကွက်ချင်းစီ ပြန်ဆွဲတဲ့ loop =====
function frame() {
  var t = Date.now() / 1000;
  var sy = window.scrollY;

  // စာမျက်နှာဖွင့်ချိန် လှည့်ဝင်လာတာ
  intro = Math.min(1, intro + 0.008);
  var ie = 1 - Math.pow(1 - intro, 3);

  // scroll အလိုက် ချဉ်းကပ်မှု (0 = အဝေး၊ 1 = screen အပြည့်)
  var target = Math.min(1, sy / D);
  cur += (target - cur) * 0.08;
  var e = cur * cur * (3 - 2 * cur);

  mx += (tmx - mx) * 0.05;
  my += (tmy - my) * 0.05;

  var sEnd = Math.min(window.innerWidth * 0.9 / 640, window.innerHeight * 0.88 / 400);
  var sStart = Math.min(1.1, window.innerWidth / 900);

  var s = lerp(sStart * (0.75 + 0.25 * ie), sEnd, e);
  var a = lerp(START_TILT, END_TILT, e) - my * 3 * (1 - e);
  var b = lerp(lerp(START_TURN - 50, START_TURN, ie), 0, e) + (Math.sin(t * 0.6) * 2 + mx * 5) * (1 - e);
  var ty = lerp(0, LID_Y, e);
  var tz = lerp(-60, -LID_Z, e);

  world.style.transform =
    "scale(" + s + ") rotateX(" + a + "deg) rotateZ(" + b + "deg) translate3d(0," + ty + "px," + tz + "px)";

  // ချဉ်းကပ်လာတာနဲ့ ကြမ်းပြင်၊ စာတွေ ပျောက်သွားမယ်
  platform.style.opacity = 1 - e;
  titleBox.style.opacity = Math.max(0, 1 - e * 2.5);
  hint.style.opacity = Math.max(0, 0.7 - e * 2);

  // ချဉ်းကပ်ပြီးရင် website ကို screen ထဲမှာ ဆင်းမယ်
  var k = Math.min(1, Math.max(0, (sy - D) / (S * WEB_SPEED || 1)));
  shot.style.transform = "translateY(" + (-k * S) + "px)";

  requestAnimationFrame(frame);
}
frame();
