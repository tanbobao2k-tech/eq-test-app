/**
 * ads.js — Quản lý khung quảng cáo (banner hai bên + banner chân trang)
 *
 * CÁCH GẮN QUẢNG CÁO THẬT:
 *  1) Google AdSense: dán mã <ins class="adsbygoogle"> vào đúng chỗ đánh dấu
 *     "<!-- DÁN MÃ QUẢNG CÁO TẠI ĐÂY -->" trong index.html và thêm script AdSense
 *     vào <head>.
 *  2) Banner ảnh tĩnh: đặt ảnh vào thư mục ads/ rồi sửa AD_CONFIG bên dưới.
 *
 * AD_CONFIG.slots: mỗi slot ứng với 1 khung trên trang.
 *   - enabled : bật/tắt khung đó
 *   - image   : đường dẫn ảnh banner (để trống nếu dùng AdSense)
 *   - link    : URL đích khi bấm banner
 *   - title   : tiêu đề nhỏ hiển thị phía trên (để trống nếu không cần)
 *   - html    : (tùy chọn) mã HTML quảng cáo tự dựng, vd "<a href=...><img ...></a>"
 *   - renderer: (tùy chọn) hàm tự vẽ nội dung vào thẻ .ad-slot-inner
 */
(function () {
  "use strict";

  const AD_CONFIG = {
    // Bật/tắt toàn bộ quảng cáo
    enabled: true,

    // Hiển thị banner dọc hai bên khi màn hình đủ rộng
    // (khớp breakpoint CSS ở css/styles.css: cần >= 1516px mới đủ chỗ)
    minWidthForSideAds: 1516,

    // Không hiện quảng cáo trong màn hình làm bài (tránh phân tâm)
    hideDuringQuiz: true,

    // Vị trí hiển thị banner chân trang.
    //   "all"   : tất cả các màn trừ lúc làm bài
    //   "home"  : chỉ trang chủ (an toàn nhất, tránh đặt cạnh nút tải thẻ/điểm số)
    //   "result": chỉ màn kết quả
    footerPlacement: "all",

    // ===== QUẢNG CÁO LUMORA (site riêng của chủ trang) =====
    // Muốn đặt khách hàng khác: chỉ sửa image/link/eyebrow/headline/sub/cta của slot đó.
    //
    // Mỗi slot có thể khai báo `sets`: nhiều bộ sản phẩm.
    // Mỗi lần vào trang (mở mới hoặc chuyển màn home / làm bài / kết quả),
    // ads.js bốc ngẫu nhiên 1 bộ -> quảng cáo thay đổi, khung không bị lặp 1 sản phẩm.
    slots: {
      "ad-left": {
        enabled: true,
        title: "Tài trợ — LUMORA",
        link: "http://lumoravn.com/",
        renderer: sponsorCard({
          eyebrow: "LUMORA · OPPLE",
          headline: "Đèn Linear treo thả trần",
          cta: "Xem sản phẩm →",
          tone: "lamp",
          // Nhiều sản phẩm để lấp đầy khung dọc — thêm/bớt tùy ý
          items: [
            {
              eyebrow: "OPPLE",
              headline: "Đèn Linear treo thả trần",
              sub: "từ 1.050.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-linear.jpg"
            },
            {
              eyebrow: "OPPLE",
              headline: "Đèn ốp trần lắp nổi",
              sub: "từ 132.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-op-tran.jpg"
            },
            {
              eyebrow: "PHILIPS",
              headline: "Đèn downlight âm trần",
              sub: "từ 85.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-downlight.jpg"
            },
            {
              eyebrow: "LTS · NGOÀI TRỜI",
              headline: "Đèn cắm cỏ sân vườn",
              sub: "từ 300.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-den-cam-co.jpg"
            }
          ]
        })
      },
      "ad-right": {
        enabled: true,
        title: "Tài trợ — LUMORA",
        link: "http://lumoravn.com/",
        renderer: sponsorCard({
          eyebrow: "LUMORA · LTS",
          headline: "Đèn cắm cỏ sân vườn",
          cta: "Xem sản phẩm →",
          tone: "lamp",
          items: [
            {
              eyebrow: "LTS · NGOÀI TRỜI",
              headline: "Đèn cắm cỏ sân vườn",
              sub: "từ 300.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-den-cam-co.jpg"
            },
            {
              eyebrow: "PHILIPS",
              headline: "Đèn downlight âm trần",
              sub: "từ 85.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-downlight.jpg"
            },
            {
              eyebrow: "OPPLE",
              headline: "Đèn Linear treo thả trần",
              sub: "từ 1.050.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-linear.jpg"
            },
            {
              eyebrow: "OPPLE",
              headline: "Đèn ốp trần lắp nổi",
              sub: "từ 132.000 ₫",
              cta: "Xem →",
              image: "ads/lumora-op-tran.jpg"
            }
          ]
        })
      },
      "ad-inline-home": {
        enabled: true,
        title: "Tài trợ — LUMORA",
        link: "http://lumoravn.com/",
        renderer: sponsorCard({
          eyebrow: "LUMORA · ĐÈN CHIẾU SÁNG CHÍNH HÃNG",
          headline: "Ánh sáng cho mọi không gian sống",
          sub: "Phân phối Opple · Philips · Osram · LTS — bảo hành 3 năm, giao nội thành 24h",
          cta: "Xem sản phẩm →",
          logo: "ads/lumora-logo.png",
          tone: "lamp"
        })
      },
      "ad-footer": {
        enabled: true,
        title: "Tài trợ — LUMORA",
        link: "http://lumoravn.com/",
        renderer: sponsorCard({
          eyebrow: "LUMORA",
          headline: "Đèn trong nhà · Đèn ngoài trời · Năng lượng mặt trời",
          sub: "Hàng chính hãng 100% · Bảo hành 3 năm · Hotline 0968 070 182",
          cta: "Xem sản phẩm →",
          logo: "ads/lumora-logo.png",
          tone: "lamp"
        })
      }
    }
  };

  const STORAGE_KEY = "eq_compass_ads_closed_v1";

  /**
   * Banner quảng cáo thật: logo hoặc ảnh sản phẩm + dòng chữ + nút CTA.
   * Toàn banner là 1 thẻ <a> mở link của nhà tài trợ ở tab mới.
   *
   * Truyền vào: { eyebrow, headline, sub, cta, image?, logo?, tone? }        -> 1 banner
   *            { items: [ {image|logo, headline, sub, link?}, ... ] }       -> danh sách nhiều sản phẩm
   * (dùng cho khung dọc 160×600 và chân trang: càng nhiều món càng lấp đầy khung)
   */
  function sponsorCard(opts) {
    const o = opts || {};
    const fallbackLink = typeof o.link === "string" && o.link ? o.link : "http://lumoravn.com/";
    const tone = o.tone || "lamp";

    // Một thẻ sản phẩm — dùng chung cho cả 2 kiểu banner
    function buildItem(cfg) {
      const a = document.createElement("a");
      a.href = (cfg && cfg.link) || fallbackLink;
      a.target = "_blank";
      a.rel = "noopener sponsored";
      a.className = "ad-sponsor ad-sponsor-" + tone;

      const media = document.createElement("div");
      media.className = "ad-sponsor-media";
      if (cfg && cfg.image) {
        const img = document.createElement("img");
        img.src = cfg.image;
        img.alt = cfg.headline || "LUMORA";
        img.loading = "lazy";
        media.appendChild(img);
      } else if (cfg && cfg.logo) {
        const lg = document.createElement("img");
        lg.src = cfg.logo;
        lg.alt = "LUMORA";
        lg.loading = "lazy";
        lg.className = "ad-sponsor-logo";
        media.appendChild(lg);
      }
      a.appendChild(media);

      const body = document.createElement("div");
      body.className = "ad-sponsor-body";

      if (cfg && cfg.eyebrow) {
        const eb = document.createElement("span");
        eb.className = "ad-sponsor-eyebrow";
        eb.textContent = cfg.eyebrow;
        body.appendChild(eb);
      }
      const h = document.createElement("strong");
      h.className = "ad-sponsor-headline";
      h.textContent = (cfg && cfg.headline) || "";
      body.appendChild(h);

      if (cfg && cfg.sub) {
        const sub = document.createElement("span");
        sub.className = "ad-sponsor-sub";
        // Giá được tách theo ranh giới từ (không dùng <br>) nhưng mỗi mảnh là 1 khối
        // không bao giờ xuống dòng -> "từ 85.000 ₫" luôn nằm trọn trên 1 dòng.
        sub.textContent = cfg.sub;
        body.appendChild(sub);
      }
      const cta = document.createElement("span");
      cta.className = "ad-sponsor-cta";
      cta.textContent = (cfg && cfg.cta) || o.cta || "Xem thêm →";
      body.appendChild(cta);

      a.appendChild(body);
      return a;
    }

    return function (inner) {
      if (Array.isArray(o.items) && o.items.length) {
        const wrap = document.createElement("div");
        wrap.className = "ad-sponsor-list";
        inner.parentNode && inner.parentNode.classList.add("is-list");
        o.items.forEach((item) => {
          const row = document.createElement("div");
          row.className = "ad-sponsor-item";
          row.appendChild(buildItem(item));
          wrap.appendChild(row);
        });
        inner.appendChild(wrap);
        return;
      }
      inner.appendChild(buildItem(o));
    };
  }

  /**
   * Banner DEMO (chỉ dùng khi chưa có nhà tài trợ).
   * Giờ mọi slot đã dùng sponsorCard(), hàm này giữ lại để tham khảo.
   */
  function demoBanner(variant) {
    return function (inner) {
      const cards = {
        "ad-left": {
          emoji: "🧠",
          title: "Luyện IQ mỗi ngày",
          text: "Thử thách trí nhớ 5 phút",
          cta: "Khám phá →",
          tone: "indigo"
        },
        "ad-right": {
          emoji: "🌱",
          title: "Kỹ năng mềm",
          text: "Khóa học EQ cho người đi làm",
          cta: "Xem ngay →",
          tone: "emerald"
        },
        "ad-inline-home": {
          emoji: "📘",
          title: "Khung quảng cáo trong luồng 728×90",
          text: "Vị trí giữa bộ lọc và danh sách đề — không che nút bấm",
          cta: "Xem chi tiết →",
          tone: "indigo"
        },
        "ad-footer": {
          emoji: "🎯",
          title: "Đây là khung banner ngang 970×90",
          text: "Thay bằng mã AdSense hoặc ảnh banner thật trong js/ads.js",
          cta: "Tìm hiểu →",
          tone: "amber"
        }
      };
      const c = cards[variant] || cards["ad-footer"];

      const wrap = document.createElement("a");
      wrap.href = "#";
      wrap.className = "ad-demo ad-demo-" + variant + " ad-demo-" + c.tone;
      wrap.addEventListener("click", (e) => e.preventDefault());

      const emoji = document.createElement("span");
      emoji.className = "ad-demo-emoji";
      emoji.textContent = c.emoji;

      const textWrap = document.createElement("span");
      textWrap.className = "ad-demo-text";

      const title = document.createElement("strong");
      title.textContent = c.title;

      const desc = document.createElement("span");
      desc.textContent = c.text;

      const cta = document.createElement("span");
      cta.className = "ad-demo-cta";
      cta.textContent = c.cta;

      textWrap.appendChild(title);
      textWrap.appendChild(desc);
      textWrap.appendChild(cta);
      wrap.appendChild(emoji);
      wrap.appendChild(textWrap);
      inner.appendChild(wrap);
    };
  }

  // Cho phép gọi renderer: demoBanner(...) TRƯỚC khi được định nghĩa
  // (function declaration được hoisted nên hợp lệ),
  // nhưng AD_CONFIG dùng nó ngay trong object literal -> đảm bảo đã hoisted.

  function getClosed() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function markClosed(slotId) {
    try {
      const list = getClosed();
      if (!list.includes(slotId)) {
        list.push(slotId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      /* bỏ qua nếu trình duyệt chặn localStorage */
    }
  }

  function buildBanner(slotEl, cfg) {
    if (!cfg || cfg.enabled === false) return;

    const inner = slotEl.querySelector(".ad-slot-inner");
    if (!inner) return;

    // Nếu đã có nội dung quảng cáo được dán sẵn trong HTML thì giữ nguyên,
    // chỉ thêm nút đóng.
    const hasCustom = inner.querySelector("ins.adsbygoogle, img, iframe, a");

    // Renderer tùy biến (hoặc banner demo) vẽ nội dung vào khung
    if (!hasCustom && typeof cfg.renderer === "function") {
      cfg.renderer(inner);
    }

    if (!inner.querySelector("ins.adsbygoogle, img, iframe, a") && cfg.image) {
      const anchor = document.createElement("a");
      anchor.href = cfg.link || "#";
      anchor.target = "_blank";
      anchor.rel = "noopener sponsored";
      const img = document.createElement("img");
      img.src = cfg.image;
      img.alt = cfg.title || "Quảng cáo";
      img.loading = "lazy";
      anchor.appendChild(img);
      inner.appendChild(anchor);
    }

    if (cfg.title) {
      const label = slotEl.querySelector(".ad-slot-label");
      if (label) label.textContent = cfg.title;
    }

    slotEl.classList.remove("hidden");
  }

  function attachCloseButton(slotEl, slotId) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ad-slot-close";
    btn.setAttribute("aria-label", "Đóng quảng cáo");
    btn.textContent = "✕";
    btn.addEventListener("click", () => {
      slotEl.classList.add("ad-slot-closed");
      markClosed(slotId);
    });
    slotEl.appendChild(btn);
  }

  function render() {
    if (!AD_CONFIG.enabled) return;

    const closed = getClosed();
    const isNarrow = window.innerWidth < AD_CONFIG.minWidthForSideAds;

    Object.keys(AD_CONFIG.slots).forEach((slotId) => {
      const cfg = AD_CONFIG.slots[slotId];
      if (!cfg || cfg.enabled === false) return;

      const slotEl = document.getElementById(slotId);
      if (!slotEl) return;

      // Người dùng đã đóng khung này ở lần trước
      if (closed.includes(slotId)) {
        slotEl.classList.add("ad-slot-closed");
        return;
      }

      // Banner dọc hai bên chỉ hiện khi đủ chỗ
      if ((slotId === "ad-left" || slotId === "ad-right") && isNarrow) return;

      buildBanner(slotEl, cfg);
      attachCloseButton(slotEl, slotId);
    });

    syncWithView();
  }

  // Ẩn/hiện quảng cáo theo màn hình hiện tại và bề rộng cửa sổ
  function syncWithView() {
    const quizView = document.getElementById("quiz-view");
    const resultView = document.getElementById("result-view");
    const inQuiz = !!(quizView && !quizView.classList.contains("hidden"));
    const inResult = !!(resultView && !resultView.classList.contains("hidden"));
    const isNarrow = window.innerWidth < AD_CONFIG.minWidthForSideAds;

    // Banner dọc hai bên: ẩn khi màn hẹp hoặc đang làm bài
    const hideSide = isNarrow || (AD_CONFIG.hideDuringQuiz && inQuiz);
    document.querySelectorAll(".ad-slot-col").forEach((el) => {
      el.classList.toggle("ad-slot-suspended", hideSide);
    });

    // Banner chân trang: luôn ẩn khi làm bài; "home"/"result" giới hạn thêm màn hình
    // (màn kết quả cũng là trang chủ chuyển view nên cần loại trừ sau cùng)
    const placement = AD_CONFIG.footerPlacement || "all";
    const allowedByView =
      placement === "all" ||
      (placement === "home" && !inResult && !inQuiz) ||
      (placement === "result" && inResult);
    const hideFooter = (AD_CONFIG.hideDuringQuiz && inQuiz) || !allowedByView;
    const footer = document.getElementById("ad-footer");
    const footerHidden = footer ? footer.classList.contains("ad-slot-suspended") : null;
    if (footer) footer.classList.toggle("ad-slot-suspended", hideFooter);
    if (window.__AD_TRACE) window.__AD_TRACE.push({ fn: "syncWithView", inQuiz, inResult, isNarrow, placement, hideFooter, footerHiddenBefore: footerHidden, footerHiddenAfter: footer.classList.contains("ad-slot-suspended") });

    // Khung trong luồng trang chủ: chỉ hiện ở trang chủ, ẩn khi làm bài / xem kết quả
    const inline = document.getElementById("ad-inline-home");
    if (inline) inline.classList.toggle("ad-slot-suspended", inQuiz || inResult);
  }

  function init() {
    render();

    // Theo dõi thay đổi màn hình: bật/tắt banner dọc khi co giãn cửa sổ
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // syncWithView xử lý cả hai điều kiện: đang làm bài HOẶC màn hình hẹp
        syncWithView();
      }, 150);
    });

    // Theo dõi đổi view để tạm ẩn quảng cáo khi làm bài
    const main = document.querySelector("main");
    if (main && window.MutationObserver) {
      const obs = new MutationObserver(syncWithView);
      document.querySelectorAll(".view").forEach((v) => {
        obs.observe(v, { attributes: true, attributeFilter: ["class"] });
      });
    }
  }

  // -- Chế độ DEMO: giúp script kiểm tra đọc được trạng thái (vô hại khi chạy thật)
  window.__EQ_ADS_DEMO = true;
  window.EQ_ADS_CONFIG = AD_CONFIG;
  window.EQ_ADS_TEST_SYNC = syncWithView;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
