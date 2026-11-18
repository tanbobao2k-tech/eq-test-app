/**
 * check-ads.mjs — kiểm tra khung quảng cáo bằng Chrome thật (headful).
 *
 *   node scripts/check-ads.mjs                 # chạy trên http://localhost:8765
 *   node scripts/check-ads.mjs http://...      # đổi URL
 *   node scripts/check-ads.mjs --keep          # giữ trình duyệt + mở DevTools
 *
 * Vì sao cần script này: trình duyệt headless trên máy này (Playwright Chromium
 * và cờ --headless của Chrome) tải được file .js nhưng KHÔNG thực thi chúng,
 * nên mọi kiểm tra giao diện/JS đều cho kết quả sai. Chrome headful thì chạy đúng.
 */
import { createRequire } from "node:module";


const require = createRequire(import.meta.url);
const PATCHRIGHT_PATHS = [
  "c:/Users/Admin/.antigravity-ide/extensions/danielsanmedium.dscodegpt-3.24.84-universal/standalone/node_modules/patchright",
  "c:/Users/Admin/.antigravity-ide/extensions/danielsanmedium.dscodegpt-3.24.84-universal/node_modules/patchright",
];
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const args = process.argv.slice(2);
const keep = args.includes("--keep");
const url = args.find((a) => a.startsWith("http")) || "http://localhost:8765/index.html";

const pw = (() => {
  for (const p of PATCHRIGHT_PATHS) {
    try {
      return require(p);
    } catch (_) {
      /* thử đường dẫn tiếp theo */
    }
  }
  throw new Error("Không tìm thấy patchright. Cài: npm i -D patchright");
})();

const result = { url, checks: [] };
const check = (name, ok, detail) => result.checks.push({ name, ok: ok === true, detail });

const browser = await pw.chromium.launch({ headless: false, executablePath: CHROME });
const page = await (await browser.newContext({ viewport: { width: 1700, height: 900 } })).newPage();
page.on("pageerror", (e) => check("pageerror", false, e.message));

const vis = () => page.evaluate(`(() => {
  const v = (id) => { const el = document.getElementById(id); return el ? getComputedStyle(el).display !== "none" : null; };
  return { left: v("ad-left"), right: v("ad-right"), inline: v("ad-inline-home"), footer: v("ad-footer") };
})()`);

const setView = (id) =>
  page.evaluate(
    `["home-view","quiz-view","result-view"].forEach((v) => { const el = document.getElementById(v); if (!el) return; const on = v === "${id}"; el.classList.toggle("hidden", !on); el.classList.toggle("active", on); })`
  );

await page.goto(url, { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(1200);

// Không kiểm tra bằng window.EQ_ADS_CONFIG / __EQ_ADS_DEMO được: trong ngữ cảnh
// page.evaluate của patchright, các biến do ads.js gán luôn đọc ra undefined,
// dù script đã chạy (DOM thì cập nhật bình thường). Để phát hiện "script chưa chạy",
// trang phải có sẵn khung ở trạng thái hidden và ads.js phải gỡ hidden.

await setView("home-view");
await page.waitForTimeout(300);
const home = await vis();
check("trang chủ: 2 banner dọc + banner trong luồng + chân trang", home.left && home.right && home.inline && home.footer, home);

await setView("quiz-view");
await page.waitForTimeout(300);
const quiz = await vis();
check("đang làm bài: ẩn hết quảng cáo", !quiz.left && !quiz.right && !quiz.inline && !quiz.footer, quiz);

await setView("result-view");
await page.waitForTimeout(300);
const res = await vis();
check("màn kết quả: chỉ banner dọc + chân trang", res.left && res.right && !res.inline && res.footer, res);

await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(400);
const narrow = await vis();
check("màn 1280px: ẩn banner dọc", !narrow.left && !narrow.right, narrow);

await page.setViewportSize({ width: 1700, height: 900 });
await page.waitForTimeout(400);
const wide = await vis();
check("phóng to lại 1700px: banner dọc hiện lại", wide.left && wide.right, wide);

if (!keep) await browser.close();
result.passed = result.checks.every((c) => c.ok);
console.log(JSON.stringify(result, null, 2));
if (!keep) process.exitCode = result.passed ? 0 : 1;
