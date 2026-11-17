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
    minWidthForSideAds: 1300,

    // Không hiện quảng cáo trong màn hình làm bài (tránh phân tâm)
    hideDuringQuiz: true,

    slots: {
      "ad-left": {
        enabled: true,
        title: "Tài trợ",
        image: "",
        link: "#",
        renderer: demoBanner("ad-left")
      },
      "ad-right": {
        enabled: true,
        title: "Tài trợ",
        image: "",
        link: "#",
        renderer: demoBanner("ad-right")
      },
      "ad-footer": {
        enabled: true,
        title: "",
        image: "",
        link: "#",
        renderer: demoBanner("ad-footer")
      }
    }
  };

  const STORAGE_KEY = "eq_compass_ads_closed_v1";

  /**
   * Banner DEMO hiển thị sẵn để bạn thấy vị trí khung quảng cáo.
   * Khi có quảng cáo thật, set renderer: null và dùng image/AdSense.
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

  // Ẩn banner trong lúc làm bài (nếu bật cấu hình)
  function syncWithView() {
    if (!AD_CONFIG.hideDuringQuiz) return;
    const quizView = document.getElementById("quiz-view");
    const inQuiz = quizView && !quizView.classList.contains("hidden");
    document.querySelectorAll(".ad-slot-col").forEach((el) => {
      el.classList.toggle("ad-slot-suspended", !!inQuiz);
    });
  }

  function init() {
    render();

    // Theo dõi thay đổi màn hình: bật/tắt banner dọc khi co giãn cửa sổ
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isNarrow = window.innerWidth < AD_CONFIG.minWidthForSideAds;
        document.querySelectorAll("#ad-left, #ad-right").forEach((el) => {
          if (!el.classList.contains("ad-slot-closed")) {
            el.classList.toggle("ad-slot-suspended", isNarrow);
          }
        });
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

  window.EQ_ADS_CONFIG = AD_CONFIG;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
