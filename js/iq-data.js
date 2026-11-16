(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  if (!DATA) {
    throw new Error("EQ_DATA must be loaded before iq-data.js.");
  }

  // Ensure existing EQ tests carry explicit testType
  DATA.TESTS.forEach((test) => {
    if (!test.testType) {
      test.testType = "eq";
    }
  });

  const IQ_DIMENSIONS = {
    logical_reasoning: {
      id: "logical_reasoning",
      name: "Tư duy Logic & Suy luận",
      shortName: "Logic & Suy luận",
      icon: "🧩",
      color: "#6366f1",
      description:
        "Khả năng phân tích mệnh đề, suy luận diễn dịch, loại trừ giả thiết sai và rút ra kết luận chắc chắn từ các dữ kiện rời rạc.",
      evaluations: {
        high: "Bạn sở hữu tư duy suy luận chặt chẽ và hệ thống. Bạn nhanh chóng phát hiện các mâu thuẫn logic và không dễ bị dẫn dắt bởi những kết luận vội vàng.",
        medium: "Bạn xử lý tốt các bài toán suy luận tuyến tính, nhưng khi gặp nhiều điều kiện ràng buộc đan xen hoặc mệnh đề phủ định kép, bạn dễ bỏ sót một trường hợp biên.",
        low: "Bạn thường dựa nhiều vào cảm giác quen thuộc khi kết luận thay vì kiểm chứng từng bước điều kiện logic. Lập bảng loại trừ đơn giản sẽ giúp bạn tăng độ chính xác vượt bậc."
      },
      tips: [
        "Với các bài toán thứ tự hoặc ghép cặp, hãy kẻ nhanh bảng ma trận loại trừ (✓ / ✕) thay vì giữ toàn bộ trong đầu.",
        "Ghi nhớ quy tắc phủ định đảo (Modus Tollens): 'Nếu A thì B' luôn tương đương với 'Nếu không B thì không A', nhưng KHÔNG suy ra được 'Nếu B thì A'.",
        "Thực hành giải 2–3 câu đố suy luận mệnh đề (Einstein puzzle hoặc Knights & Knaves) mỗi tuần."
      ]
    },
    numerical_pattern: {
      id: "numerical_pattern",
      name: "Quy luật Số học & Toán tư duy",
      shortName: "Số học & Quy luật",
      icon: "🔢",
      color: "#0ea5e9",
      description:
        "Khả năng nhận diện quy luật biến thiên của chuỗi số, ước lượng tỷ lệ phần trăm, vận tốc và mô hình hóa các bài toán định lượng.",
      evaluations: {
        high: "Bạn rất nhạy bén với các con số và cấu trúc biến thiên. Bạn dễ dàng nhìn ra quy luật đa tầng (hiệu số bậc hai, dãy đan xen, hàm mũ) chỉ sau vài giây quan sát.",
        medium: "Bạn nắm chắc các quy luật cộng-nhân cơ bản nhưng có thể chững lại ở các dãy số đan xen hai chuỗi song song hoặc bài toán bẫy tỷ lệ phần trăm kép.",
        low: "Khi gặp chuỗi số lạ, bạn dễ thử sai ngẫu nhiên thay vì kiểm tra có hệ thống. Việc dùng phương pháp 'tính hiệu giữa các số liên tiếp' sẽ mở khóa phần lớn dạng bài này."
      },
      tips: [
        "Khi gặp dãy số lạ, luôn kiểm tra theo thứ tự: (1) Hiệu số liên tiếp, (2) Tỷ lệ nhân, (3) Dãy đan xen vị trí chẵn-lẻ, (4) Bình phương/Lập phương gần nhất.",
        "Cẩn thận với tỷ lệ phần trăm kép và vận tốc trung bình: tăng 20% rồi giảm 20% KHÔNG quay về 100%, và vận tốc trung bình hai chiều bằng nhau dùng trung bình điều hòa.",
        "Tập tính nhẩm nhanh ước lượng kết quả trước khi chọn đáp án để lọc ngay các phương án vô lý."
      ]
    },
    spatial_visual: {
      id: "spatial_visual",
      name: "Trực quan Không gian & Ma trận Hình",
      shortName: "Không gian & Hình",
      icon: "📐",
      color: "#10b981",
      description:
        "Khả năng xoay hình trong tâm trí, nhận diện phép biến đổi hình học 2D/3D (đối xứng, đè hình XOR, gấp khối lập phương) và đọc ma trận thị giác Raven.",
      evaluations: {
        high: "Bạn có trí tưởng tượng không gian 2D và 3D vượt trội. Bạn tách lớp các thuộc tính hình học (hình dạng, góc xoay, mật độ chấm, phép hợp nét) rất chính xác.",
        medium: "Bạn giải tốt các bài xoay hình 2D và quy luật theo hàng đơn giản, nhưng đôi lúc nhầm hướng khi chuyển sang gấp khối 3D hoặc phép toán loại trừ nét (XOR).",
        low: "Tư duy thị giác của bạn đang có xu hướng nhìn tổng thể mờ nhạt thay vì tách từng thuộc tính độc lập. Hãy tập tách riêng 'hình dáng', 'vị trí' và 'hướng xoay' khi quan sát."
      },
      tips: [
        "Với ma trận Raven 3×3, luôn tách riêng từng lớp: (1) Hình bao ngoài, (2) Chi tiết bên trong, (3) Quy luật xoay góc, (4) Phép cộng hoặc triệt tiêu nét.",
        "Khi giải bài gấp khối lập phương, đánh dấu một mặt làm 'đáy cố định' rồi tưởng tượng 4 mặt xung quanh gập đứng lên 90°.",
        "Chơi các trò chơi rèn luyện không gian như Tangram, xếp khối 3D hoặc cờ vua 10 phút mỗi ngày."
      ]
    },
    verbal_analytic: {
      id: "verbal_analytic",
      name: "Ngôn ngữ & Phân tích Khái niệm",
      shortName: "Ngôn ngữ & Khái niệm",
      icon: "🔤",
      color: "#f59e0b",
      description:
        "Khả năng nắm bắt quan hệ ẩn dụ tương đồng, phân loại bản chất khái niệm, giải mã quy luật ký tự và hiểu chính xác ngữ nghĩa câu chữ.",
      evaluations: {
        high: "Bạn có vốn khái niệm sắc sảo và khả năng trừu tượng hóa cao. Bạn nhìn thấy mối liên hệ bản chất giữa các khái niệm tưởng như không liên quan.",
        medium: "Bạn hiểu rõ nghĩa bề mặt của ngôn ngữ nhưng đôi khi chọn cặp từ theo cảm giác 'cùng chủ đề' thay vì đối chiếu đúng 'hướng quan hệ chức năng'.",
        low: "Bạn dễ bị đánh lừa bởi các từ có cùng trường nghĩa bề ngoài nhưng khác cấp độ khái niệm. Tập đặt câu diễn đạt mối quan hệ A–B sẽ giúp bạn chính xác hơn nhiều."
      },
      tips: [
        "Với câu tương đồng A : B :: C : ?, hãy đặt một câu nối rõ quan hệ giữa A và B (ví dụ: 'A là công cụ dùng để đo B') rồi áp y nguyên câu đó cho C và D.",
        "Trong câu 'Tìm từ khác nhóm', kiểm tra phân cấp khái niệm: vật lý vs trừu tượng, hình phẳng 2D vs khối 3D, hành tinh vs vệ tinh.",
        "Đọc kỹ từng từ giới hạn trong đề như 'duy nhất', 'tất cả trừ', 'chắc chắn đúng'."
      ]
    },
    working_memory: {
      id: "working_memory",
      name: "Trí nhớ Làm việc & Chống Bẫy Tư Duy",
      shortName: "Giải quyết vấn đề",
      icon: "⚡",
      color: "#ec4899",
      description:
        "Khả năng giữ nhiều biến số cùng lúc trong bộ nhớ ngắn hạn, chống lại phản xạ trực giác sai lầm (hệ thống 1) và tìm phương án tối ưu cho bài toán thực tế.",
      evaluations: {
        high: "Bạn kiểm soát xung động trực giác cực tốt! Khi gặp các bài toán mẹo (Cognitive Reflection), bạn biết dừng lại kiểm chứng bằng phép tính thực tế trước khi chốt đáp án.",
        medium: "Bạn giải quyết tốt các bài toán quen thuộc nhưng vẫn có lúc rơi vào bẫy trực giác nhanh khi áp lực thời gian tăng cao.",
        low: "Não bộ của bạn thường ưu tiên câu trả lời bật ra đầu tiên (Hệ thống 1) mà chưa kích hoạt bước kiểm tra lại (Hệ thống 2). Tập thói quen kiểm tra ngược đáp án vào đề bài!"
      },
      tips: [
        "Luôn dành 3 giây thay ngược đáp án vừa nghĩ ra vào câu hỏi gốc (ví dụ: vợt + bóng = 110k, hiệu = 100k -> kiểm tra 105k - 5k = 100k ✓).",
        "Với bài toán thay đổi trạng thái theo bước (robot di chuyển, chia nhóm cân xu), hãy vẽ nhanh sơ đồ mũi tên từng bước.",
        "Rèn luyện bằng các bài tập nhớ chuỗi ngược và toán đố thực tế mỗi tuần."
      ]
    }
  };

  const IQ_LEVELS = [
    {
      id: "iq_genius",
      minPct: 86,
      eqRange: "130 – 145",
      badge: "Tốp 2% • IQ Xuất sắc",
      title: "Tư Duy Sắc Bén & Nhạy Bén Quy Luật Vượt Trội",
      color: "#10b981",
      summary:
        "Bạn đạt ngưỡng phân tích và nhận diện quy luật xuất sắc. Bạn xử lý mượt mà cả dãy số đa tầng, ma trận hình học phức tạp lẫn các câu hỏi bẫy trực giác tinh vi.",
      advice:
        "Khi tư duy logic đã rất mạnh, hãy kết hợp thêm với trí tuệ cảm xúc (EQ) trong giao tiếp để biến những ý tưởng sắc bén của bạn thành ảnh hưởng thuyết phục với tập thể."
    },
    {
      id: "iq_high",
      minPct: 72,
      eqRange: "115 – 129",
      badge: "IQ Cao • Nhạy bén",
      title: "Năng Lực Phân Tích & Logic Rất Tốt",
      color: "#6366f1",
      summary:
        "Bạn có nền tảng tư duy logic, định lượng và không gian cao hơn mức trung bình rõ rệt. Bạn tiếp thu khái niệm mới nhanh và giải quyết vấn đề có phương pháp.",
      advice:
        "Hãy xem lại 1–2 dạng câu hỏi khiến bạn mất điểm (ví dụ bẫy CRT hoặc phép biến đổi hình 3D) để lấp đầy những điểm khuyết nhỏ còn lại."
    },
    {
      id: "iq_good",
      minPct: 55,
      eqRange: "100 – 114",
      badge: "IQ Khá • Chuẩn mực",
      title: "Tư Duy Logic Cân Bằng & Ổn Định",
      color: "#0ea5e9",
      summary:
        "Bạn giải quyết tốt các quy luật chuẩn và bài toán đời thực có cấu trúc rõ ràng. Ở các bài toán nhiều lớp điều kiện hoặc đòi hỏi xoay hình trừu tượng, tốc độ xử lý đôi lúc bị chậm lại.",
      advice:
        "Thực hành đều đặn với sơ đồ giấy nháp và kiểm chứng ngược kết quả sẽ giúp điểm số của bạn tăng rất nhanh chỉ sau vài lần luyện."
    },
    {
      id: "iq_average",
      minPct: 38,
      eqRange: "85 – 99",
      badge: "IQ Trung bình",
      title: "Nền Tảng Cơ Bản, Dễ Mắc Bẫy Trực Giác Nhanh",
      color: "#f59e0b",
      summary:
        "Bạn xử lý ổn các câu hỏi trực diện một bước, nhưng dễ bị đánh lừa khi câu hỏi gài bẫy ngôn từ hoặc đòi hỏi theo dõi nhiều dữ kiện song song.",
      advice:
        "Thử chuyển sang Chế độ Luyện tập tương tác để đọc lời giải từng bước của từng dạng bài — mỗi dạng đều có một công thức tư duy rất dễ nắm bắt."
    },
    {
      id: "iq_developing",
      minPct: 0,
      eqRange: "70 – 84",
      badge: "Cần rèn luyện thêm",
      title: "Cần Rèn Luyện Phương Pháp Tư Duy Từng Bước",
      color: "#ef4444",
      summary:
        "Có thể bạn làm bài quá vội vàng hoặc chưa quen với các dạng câu đố logic, quy luật số và ma trận thị giác. Tư duy phân tích hoàn toàn có thể cải thiện mạnh qua luyện tập.",
      advice:
        "Đừng nản lòng! Hãy bắt đầu với bộ đề Test Nhanh 5 Phút ở chế độ Luyện tập để làm quen từng bước giải thích cặn kẽ."
    }
  ];

  // ==================== SVG BUILDERS FOR VISUAL IQ ====================
  function svgBox(inner, width = 300, height = 220) {
    return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" class="iq-svg" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  function svgArrowMatrix() {
    // 3x3 matrix: Row 1: 0, 90, 180; Row 2: 45, 135, 225; Row 3: 90, 180, ?
    const angles = [0, 90, 180, 45, 135, 225, 90, 180, null];
    let cells = "";
    angles.forEach((deg, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = 15 + col * 92;
      const y = 12 + row * 72;
      const cx = x + 41;
      const cy = y + 32;
      cells += `<rect x="${x}" y="${y}" width="82" height="64" rx="10" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
      if (deg === null) {
        cells += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
      } else {
        cells += `<g transform="translate(${cx},${cy}) rotate(${deg})">
          <line x1="0" y1="16" x2="0" y2="-14" stroke="var(--text)" stroke-width="3.2" stroke-linecap="round"/>
          <polyline points="-8,-6 0,-16 8,-6" fill="none" stroke="var(--text)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>`;
      }
    });
    return svgBox(cells, 300, 232);
  }

  function svgShapeFillMatrix() {
    // Row 0: circle, Row 1: square, Row 2: triangle
    // Col 0: outline, Col 1: outline + center dot, Col 2: solid fill
    let cells = "";
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const x = 15 + c * 92;
        const y = 12 + r * 72;
        const cx = x + 41;
        const cy = y + 32;
        cells += `<rect x="${x}" y="${y}" width="82" height="64" rx="10" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
        if (r === 2 && c === 2) {
          cells += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
          continue;
        }
        const fill = c === 2 ? "var(--primary)" : "none";
        const stroke = c === 2 ? "var(--primary)" : "var(--text)";
        if (r === 0) {
          cells += `<circle cx="${cx}" cy="${cy}" r="17" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
        } else if (r === 1) {
          cells += `<rect x="${cx - 16}" y="${cy - 16}" width="32" height="32" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
        } else {
          cells += `<polygon points="${cx},${cy - 17} ${cx + 18},${cy + 15} ${cx - 18},${cy + 15}" fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>`;
        }
        if (c === 1) {
          cells += `<circle cx="${cx}" cy="${r === 2 ? cy + 3 : cy}" r="4.5" fill="var(--text)"/>`;
        }
      }
    }
    return svgBox(cells, 300, 232);
  }

  function svgUnionMatrix() {
    // Row 0: vertical | + horizontal - = cross +
    // Row 1: / + \ = X
    // Row 2: square + cross = ?
    let cells = "";
    const drawSymbol = (cx, cy, type) => {
      const s = "var(--text)";
      if (type === "v") return `<line x1="${cx}" y1="${cy - 16}" x2="${cx}" y2="${cy + 16}" stroke="${s}" stroke-width="3" stroke-linecap="round"/>`;
      if (type === "h") return `<line x1="${cx - 16}" y1="${cy}" x2="${cx + 16}" y2="${cy}" stroke="${s}" stroke-width="3" stroke-linecap="round"/>`;
      if (type === "plus") return drawSymbol(cx, cy, "v") + drawSymbol(cx, cy, "h");
      if (type === "s1") return `<line x1="${cx - 14}" y1="${cy + 14}" x2="${cx + 14}" y2="${cy - 14}" stroke="${s}" stroke-width="3" stroke-linecap="round"/>`;
      if (type === "s2") return `<line x1="${cx - 14}" y1="${cy - 14}" x2="${cx + 14}" y2="${cy + 14}" stroke="${s}" stroke-width="3" stroke-linecap="round"/>`;
      if (type === "x") return drawSymbol(cx, cy, "s1") + drawSymbol(cx, cy, "s2");
      if (type === "sq") return `<rect x="${cx - 16}" y="${cy - 16}" width="32" height="32" fill="none" stroke="${s}" stroke-width="3"/>`;
      return "";
    };
    const grid = [
      ["v", "h", "plus"],
      ["s1", "s2", "x"],
      ["sq", "plus", null]
    ];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const x = 15 + c * 92;
        const y = 12 + r * 72;
        const cx = x + 41;
        const cy = y + 32;
        cells += `<rect x="${x}" y="${y}" width="82" height="64" rx="10" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
        if (grid[r][c] === null) {
          cells += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
        } else {
          cells += drawSymbol(cx, cy, grid[r][c]);
        }
      }
    }
    return svgBox(cells, 300, 232);
  }

  function svgNumberTriangles() {
    const tris = [
      { top: 4, left: 3, right: 2, mid: "14" },
      { top: 5, left: 4, right: 3, mid: "23" },
      { top: 6, left: 5, right: 7, mid: "?" }
    ];
    let out = "";
    tris.forEach((t, idx) => {
      const cx = 62 + idx * 112;
      const topY = 34;
      const baseY = 124;
      out += `<polygon points="${cx},${topY} ${cx - 40},${baseY} ${cx + 40},${baseY}" fill="var(--bg-soft)" stroke="var(--primary)" stroke-width="2.2"/>`;
      out += `<text x="${cx}" y="${topY - 8}" text-anchor="middle" font-size="14" font-weight="800" fill="var(--text)">${t.top}</text>`;
      out += `<text x="${cx - 44}" y="${baseY + 14}" text-anchor="middle" font-size="14" font-weight="800" fill="var(--text)">${t.left}</text>`;
      out += `<text x="${cx + 44}" y="${baseY + 14}" text-anchor="middle" font-size="14" font-weight="800" fill="var(--text)">${t.right}</text>`;
      out += `<text x="${cx}" y="${baseY - 26}" text-anchor="middle" font-size="18" font-weight="800" fill="${t.mid === "?" ? "var(--danger)" : "var(--primary)"}">${t.mid}</text>`;
    });
    return svgBox(out, 350, 155);
  }

  function svgNumberGrid() {
    const rows = [
      ["7", "4", "11"],
      ["9", "5", "14"],
      ["12", "?", "20"]
    ];
    let out = "";
    rows.forEach((r, ri) => {
      r.forEach((val, ci) => {
        const x = 45 + ci * 70;
        const y = 14 + ri * 54;
        out += `<rect x="${x}" y="${y}" width="64" height="48" rx="8" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
        out += `<text x="${x + 32}" y="${y + 30}" text-anchor="middle" font-size="18" font-weight="800" fill="${val === "?" ? "var(--primary)" : "var(--text)"}">${val}</text>`;
      });
    });
    return svgBox(out, 294, 184);
  }

  function svgClocks() {
    const times = [
      { h: 12, m: 0, label: "12:00" },
      { h: 2, m: 15, label: "02:15" },
      { h: 4, m: 30, label: "04:30" },
      { h: null, m: null, label: "?" }
    ];
    let out = "";
    times.forEach((t, idx) => {
      const cx = 48 + idx * 84;
      const cy = 54;
      out += `<circle cx="${cx}" cy="${cy}" r="32" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="2"/>`;
      out += `<circle cx="${cx}" cy="${cy}" r="2.5" fill="var(--text)"/>`;
      if (t.h === null) {
        out += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
      } else {
        const mAngle = (t.m * 6 - 90) * (Math.PI / 180);
        const hAngle = (((t.h % 12) + t.m / 60) * 30 - 90) * (Math.PI / 180);
        out += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(mAngle) * 23}" y2="${cy + Math.sin(mAngle) * 23}" stroke="var(--info)" stroke-width="2.2" stroke-linecap="round"/>`;
        out += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(hAngle) * 15}" y2="${cy + Math.sin(hAngle) * 15}" stroke="var(--text)" stroke-width="3.2" stroke-linecap="round"/>`;
      }
      out += `<text x="${cx}" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-muted)">${t.label}</text>`;
    });
    return svgBox(out, 348, 122);
  }

  function svgLShapeRotation() {
    // Steps: 0, -90, -180, ? (counter-clockwise 90 deg per step -> Step 4 is -270 = +90)
    const rots = [0, -90, -180, null];
    let out = "";
    rots.forEach((deg, idx) => {
      const cx = 48 + idx * 84;
      const cy = 56;
      out += `<rect x="${cx - 34}" y="${cy - 34}" width="68" height="68" rx="10" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
      if (deg === null) {
        out += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
      } else {
        out += `<g transform="translate(${cx},${cy}) rotate(${deg})">
          <path d="M-10,-18 L-10,16 L14,16" fill="none" stroke="var(--primary)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="-10" cy="-18" r="4" fill="var(--warning)"/>
        </g>`;
      }
      out += `<text x="${cx}" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-muted)">Bước ${idx + 1}</text>`;
    });
    return svgBox(out, 348, 122);
  }

  function svgMirrorF() {
    const out = `
      <rect x="20" y="18" width="120" height="120" rx="12" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <path d="M54,108 L54,44 L98,44 M54,74 L84,74" fill="none" stroke="var(--text)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="96" cy="96" r="8" fill="var(--primary)"/>
      <line x1="168" y1="14" x2="168" y2="142" stroke="var(--danger)" stroke-width="2.5" stroke-dasharray="6,5"/>
      <text x="168" y="158" text-anchor="middle" font-size="11" font-weight="700" fill="var(--danger)">Trục gương</text>
      <rect x="196" y="18" width="120" height="120" rx="12" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <text x="256" y="86" text-anchor="middle" font-size="28" font-weight="800" fill="var(--primary)">?</text>
    `;
    return svgBox(out, 336, 166);
  }

  function svgLatinShapeMatrix() {
    // Row 0: tri(1), sq(2), hex(3)
    // Row 1: sq(3), hex(1), tri(2)
    // Row 2: hex(2), tri(3), ? (sq with 1 dot)
    const cellsData = [
      ["tri", 1], ["sq", 2], ["hex", 3],
      ["sq", 3], ["hex", 1], ["tri", 2],
      ["hex", 2], ["tri", 3], [null, 0]
    ];
    let out = "";
    cellsData.forEach(([shape, dots], idx) => {
      const r = Math.floor(idx / 3);
      const c = idx % 3;
      const x = 15 + c * 92;
      const y = 12 + r * 72;
      const cx = x + 41;
      const cy = y + 32;
      out += `<rect x="${x}" y="${y}" width="82" height="64" rx="10" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
      if (!shape) {
        out += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
        return;
      }
      if (shape === "tri") {
        out += `<polygon points="${cx},${cy - 22} ${cx + 24},${cy + 18} ${cx - 24},${cy + 18}" fill="none" stroke="var(--text)" stroke-width="2.2" stroke-linejoin="round"/>`;
      } else if (shape === "sq") {
        out += `<rect x="${cx - 20}" y="${cy - 20}" width="40" height="40" rx="3" fill="none" stroke="var(--text)" stroke-width="2.2"/>`;
      } else {
        out += `<polygon points="${cx},${cy - 22} ${cx + 19},${cy - 11} ${cx + 19},${cy + 11} ${cx},${cy + 22} ${cx - 19},${cy + 11} ${cx - 19},${cy - 11}" fill="none" stroke="var(--text)" stroke-width="2.2"/>`;
      }
      const dotY = shape === "tri" ? cy + 7 : cy;
      if (dots === 1) {
        out += `<circle cx="${cx}" cy="${dotY}" r="3.5" fill="var(--primary)"/>`;
      } else if (dots === 2) {
        out += `<circle cx="${cx - 6}" cy="${dotY}" r="3.2" fill="var(--primary)"/><circle cx="${cx + 6}" cy="${dotY}" r="3.2" fill="var(--primary)"/>`;
      } else if (dots === 3) {
        out += `<circle cx="${cx - 9}" cy="${dotY}" r="3" fill="var(--primary)"/><circle cx="${cx}" cy="${dotY}" r="3" fill="var(--primary)"/><circle cx="${cx + 9}" cy="${dotY}" r="3" fill="var(--primary)"/>`;
      }
    });
    return svgBox(out, 300, 232);
  }

  function svgXorQuadrants() {
    // 4 bits: [TL, TR, BL, BR]
    const cells = [
      [1, 1, 1, 0], [0, 1, 0, 1], [1, 0, 1, 1],
      [1, 0, 1, 0], [1, 1, 0, 1], [0, 1, 1, 1],
      [1, 1, 1, 0], [1, 0, 1, 1], null
    ];
    let out = "";
    cells.forEach((bits, idx) => {
      const r = Math.floor(idx / 3);
      const c = idx % 3;
      const x = 15 + c * 92;
      const y = 12 + r * 72;
      const cx = x + 41;
      const cy = y + 32;
      out += `<rect x="${x}" y="${y}" width="82" height="64" rx="10" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
      if (!bits) {
        out += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">?</text>`;
        return;
      }
      const coords = [
        [cx - 18, cy - 18],
        [cx, cy - 18],
        [cx - 18, cy],
        [cx, cy]
      ];
      bits.forEach((on, bi) => {
        const [bx, by] = coords[bi];
        out += `<rect x="${bx}" y="${by}" width="18" height="18" fill="${on ? "var(--primary)" : "transparent"}" stroke="var(--text)" stroke-width="1.5"/>`;
      });
    });
    return svgBox(out, 300, 232);
  }

  function svgCountTriangles() {
    // Large triangle A(150,18), B(40,170), C(260,170)
    // Mid horizontal cut at y=94 -> x from 95 to 205
    // Rays from A to D(113,170) and E(187,170)
    const out = `
      <polygon points="150,18 40,170 260,170" fill="var(--bg-soft)" stroke="var(--text)" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="95" y1="94" x2="205" y2="94" stroke="var(--primary)" stroke-width="2.2"/>
      <line x1="150" y1="18" x2="113" y2="170" stroke="var(--text)" stroke-width="2"/>
      <line x1="150" y1="18" x2="187" y2="170" stroke="var(--text)" stroke-width="2"/>
    `;
    return svgBox(out, 300, 190);
  }

  function svgCubeNet() {
    const faces = [
      { x: 96, y: 12, label: "1" },
      { x: 46, y: 62, label: "2" },
      { x: 96, y: 62, label: "3" },
      { x: 146, y: 62, label: "4" },
      { x: 196, y: 62, label: "5" },
      { x: 96, y: 112, label: "6" }
    ];
    let out = "";
    faces.forEach((f) => {
      out += `<rect x="${f.x}" y="${f.y}" width="50" height="50" fill="${f.label === "2" ? "var(--primary-soft)" : "var(--bg-soft)"}" stroke="var(--text)" stroke-width="2"/>`;
      out += `<text x="${f.x + 25}" y="${f.y + 32}" text-anchor="middle" font-size="18" font-weight="800" fill="${f.label === "2" ? "var(--primary)" : "var(--text)"}">${f.label}</text>`;
    });
    return svgBox(out, 290, 174);
  }

  function svgRobotPath() {
    const out = `
      <defs>
        <pattern id="smallGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect x="24" y="16" width="216" height="144" fill="url(#smallGrid)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <circle cx="72" cy="136" r="6" fill="var(--success)"/>
      <text x="72" y="155" text-anchor="middle" font-size="11" font-weight="700" fill="var(--success)">Xuất phát (0,0)</text>
      <line x1="72" y1="136" x2="72" y2="64" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="4,3"/>
      <polygon points="72,56 67,67 77,67" fill="var(--primary)"/>
      <text x="58" y="102" font-size="11" font-weight="700" fill="var(--primary)">Bắc</text>
    `;
    return svgBox(out, 264, 174);
  }

  function svgPizzaCuts() {
    const out = `
      <circle cx="80" cy="76" r="56" fill="var(--warning-soft)" stroke="var(--warning)" stroke-width="3"/>
      <line x1="36" y1="40" x2="124" y2="112" stroke="var(--text)" stroke-width="2"/>
      <line x1="124" y1="40" x2="36" y2="112" stroke="var(--text)" stroke-width="2"/>
      <text x="80" y="152" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-muted)">Ví dụ 2 nhát cắt = 4 miếng</text>
      <circle cx="230" cy="76" r="56" fill="var(--bg-soft)" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="5,4"/>
      <text x="230" y="83" text-anchor="middle" font-size="22" font-weight="800" fill="var(--primary)">3 nhát = ?</text>
    `;
    return svgBox(out, 310, 166);
  }

  // Helper to build IQ option cleanly
  function iqOpts(correctIdx, textsAndFeedback) {
    return textsAndFeedback.map((item, idx) => {
      const isCorrect = idx === correctIdx;
      return {
        text: item.t,
        isCorrect,
        score: isCorrect ? 4 : 1,
        feedback: item.f || (isCorrect ? "Chính xác! Bạn đã tìm ra đúng quy luật cốt lõi." : "Chưa chính xác. Hãy xem phần giải thích từng bước để nắm rõ phương pháp.")
      };
    });
  }

  const IQ_TESTS = [
    {
      id: "iq-comprehensive",
      testType: "iq",
      title: "Đề Chuẩn IQ Toàn Diện (Mensa & Raven Tổng Hợp)",
      shortTitle: "Chuẩn IQ Toàn Diện",
      category: "iq-comprehensive",
      categoryLabel: "IQ Toàn diện",
      level: "Tiêu chuẩn",
      durationMinutes: 15,
      icon: "🧠",
      accentColor: "#6366f1",
      description:
        "Bộ đề chuẩn đo 5 năng lực cốt lõi của trí thông minh nhận thức: Logic suy luận, Quy luật số học, Ma trận hình ảnh Raven, Phân tích ngôn ngữ và Chống bẫy tư duy.",
      tags: ["15 câu hỏi", "5 trụ cột IQ", "Có hình SVG"],
      questions: [
        {
          id: "iqc-01",
          dimension: "logical_reasoning",
          context: "Suy luận mệnh đề",
          difficultyWeight: 1,
          question:
            "Biết rằng: 'Tất cả hoa hồng đều có gai' và 'Một số loài hoa trong vườn không có gai'. Kết luận nào sau đây CHẮC CHẮN đúng?",
          options: iqOpts(2, [
            { t: "Tất cả các loài hoa trong vườn đều không phải hoa hồng." },
            { t: "Trong vườn chắc chắn có ít nhất một bông hoa hồng." },
            { t: "Một số loài hoa trong vườn không phải là hoa hồng.", f: "Chính xác! Những bông không có gai không thể là hoa hồng." },
            { t: "Mọi loài hoa có gai trong vườn đều là hoa hồng." }
          ]),
          explanation:
            "Nếu mọi hoa hồng đều có gai, thì một bông hoa KHÔNG có gai chắc chắn không thể là hoa hồng. Tuy nhiên, vườn vẫn có thể có hoa hồng bên cạnh các loài hoa khác, nên không thể kết luận toàn bộ vườn không có hoa hồng."
        },
        {
          id: "iqc-02",
          dimension: "logical_reasoning",
          context: "Sắp xếp thứ tự",
          difficultyWeight: 2,
          question:
            "Bốn bạn An, Bình, Chi, Dũng chạy thi (không có đồng hạng). Biết: An về đích trước Bình; Chi không về nhất và cũng không về cuối; Dũng về ngay sau Bình. Thứ tự từ hạng 1 đến hạng 4 là:",
          options: iqOpts(1, [
            { t: "An – Bình – Dũng – Chi" },
            { t: "An – Chi – Bình – Dũng", f: "Chuẩn xác! Đây là hoán vị duy nhất thỏa mãn cả 3 điều kiện." },
            { t: "Chi – An – Bình – Dũng" },
            { t: "An – Bình – Chi – Dũng" }
          ]),
          explanation:
            "Dũng về ngay sau Bình nên cặp (Bình, Dũng) đứng liền nhau. Vì Chi không đứng 1 và không đứng 4, (Bình, Dũng) không thể đứng ở (2, 3) vì khi đó An đứng 1 và Chi sẽ bị đẩy xuống 4. Vậy (Bình, Dũng) phải ở (3, 4), An ở 1 và Chi ở 2."
        },
        {
          id: "iqc-03",
          dimension: "logical_reasoning",
          context: "Loại trừ nhãn sai",
          difficultyWeight: 3,
          question:
            "Có 3 chiếc hộp kín đều bị dán nhãn SAI hoàn toàn: Hộp 1 dán 'Táo', Hộp 2 dán 'Cam', Hộp 3 dán 'Táo & Cam'. Bạn chỉ được thò tay lấy đúng 1 quả từ 1 hộp duy nhất để suy ra nhãn đúng cho cả 3 hộp. Bạn chọn hộp nào?",
          options: iqOpts(3, [
            { t: "Mở Hộp 1 (dán nhãn 'Táo')." },
            { t: "Mở Hộp 2 (dán nhãn 'Cam')." },
            { t: "Không thể xác định chắc chắn chỉ với 1 lần lấy." },
            { t: "Mở Hộp 3 (dán nhãn 'Táo & Cam').", f: "Tuyệt vời! Mở hộp hỗn hợp là chìa khóa duy nhất giải bài toán trong 1 bước." }
          ]),
          explanation:
            "Vì cả 3 nhãn đều sai, Hộp 3 (dán 'Táo & Cam') chắc chắn chỉ chứa 100% Táo hoặc 100% Cam. Nếu bạn rút ra quả Táo từ Hộp 3, thì Hộp 3 là Táo; Hộp 2 (dán 'Cam' bị sai) không thể là Cam hay Táo nên phải là 'Táo & Cam', và Hộp 1 còn lại là Cam."
        },
        {
          id: "iqc-04",
          dimension: "numerical_pattern",
          context: "Dãy số quy luật",
          difficultyWeight: 1,
          question: "Tìm số tiếp theo trong dãy số sau: 2, 6, 12, 20, 30, ?",
          options: iqOpts(0, [
            { t: "42", f: "Chính xác! Hiệu giữa các số tăng đều +4, +6, +8, +10, +12." },
            { t: "38" },
            { t: "40" },
            { t: "44" }
          ]),
          explanation:
            "Hiệu các số liên tiếp là: 6-2=4, 12-6=6, 20-12=8, 30-20=10. Bước tiếp theo cộng thêm 12: 30 + 12 = 42 (hoặc theo công thức n×(n+1): 6×7 = 42)."
        },
        {
          id: "iqc-05",
          dimension: "numerical_pattern",
          context: "Cấp số biến đổi",
          difficultyWeight: 2,
          question: "Số nào thích hợp điền vào dấu hỏi chấm: 3, 5, 9, 17, 33, ?",
          options: iqOpts(2, [
            { t: "49" },
            { t: "63" },
            { t: "65", f: "Chính xác! Khoảng cách nhân đôi sau mỗi bước (+2, +4, +8, +16, +32)." },
            { t: "66" }
          ]),
          explanation:
            "Mỗi bước cộng thêm lũy thừa của 2: +2, +4, +8, +16, nên bước tiếp theo cộng 32: 33 + 32 = 65 (tương đương công thức: số sau = 2 × số trước - 1)."
        },
        {
          id: "iqc-06",
          dimension: "numerical_pattern",
          context: "Quy luật cặp số",
          difficultyWeight: 3,
          question:
            "Cho các phép biến đổi theo quy luật ẩn: (2, 3) → 13; (3, 4) → 25; (4, 5) → 41. Hỏi (5, 6) → ?",
          options: iqOpts(1, [
            { t: "55" },
            { t: "61", f: "Xuất sắc! Quy luật là bình phương hai số cộng lại: 5² + 6² = 61." },
            { t: "59" },
            { t: "65" }
          ]),
          explanation:
            "Ta có 2² + 3² = 4 + 9 = 13; 3² + 4² = 9 + 16 = 25; 4² + 5² = 16 + 25 = 41. Vậy (5, 6) cho kết quả 5² + 6² = 25 + 36 = 61."
        },
        {
          id: "iqc-07",
          dimension: "spatial_visual",
          context: "Ma trận hướng xoay",
          difficultyWeight: 1,
          question: "Quan sát quy luật xoay của mũi tên trong ma trận 3×3 dưới đây. Ô dấu '?' là mũi tên nào?",
          svgDiagram: svgArrowMatrix(),
          options: iqOpts(3, [
            { t: "Mũi tên hướng thẳng lên trên (↑)" },
            { t: "Mũi tên hướng chéo lên bên phải (↗)" },
            { t: "Mũi tên hướng thẳng xuống dưới (↓)" },
            { t: "Mũi tên hướng thẳng sang trái (←)", f: "Chính xác! Mỗi ô sang phải xoay 90° cùng chiều kim đồng hồ." }
          ]),
          explanation:
            "Xét theo từng hàng từ trái sang phải, mũi tên xoay 90° theo chiều kim đồng hồ: Hàng 3 có → (90°), ↓ (180°), nên ô cuối cùng xoay thêm 90° thành ← (270°). Xét theo cột dọc cũng tăng đúng 45° mỗi hàng."
        },
        {
          id: "iqc-08",
          dimension: "spatial_visual",
          context: "Ma trận Raven 2 thuộc tính",
          difficultyWeight: 2,
          question: "Hình nào còn thiếu ở góc dưới bên phải trong ma trận dưới đây?",
          svgDiagram: svgShapeFillMatrix(),
          options: iqOpts(0, [
            { t: "Hình tam giác tô đặc hoàn toàn", f: "Chính xác! Hàng 3 quy định hình tam giác, cột 3 quy định tô đặc." },
            { t: "Hình tam giác rỗng có 1 chấm tròn ở giữa" },
            { t: "Hình tròn tô đặc hoàn toàn" },
            { t: "Hình vuông tô đặc hoàn toàn" }
          ]),
          explanation:
            "Theo hàng ngang: Hàng 1 toàn hình tròn, Hàng 2 toàn hình vuông, Hàng 3 toàn hình tam giác. Theo cột dọc: Cột 1 rỗng không chấm, Cột 2 rỗng có chấm giữa, Cột 3 tô đặc. Vậy ô (3, 3) là hình tam giác tô đặc."
        },
        {
          id: "iqc-09",
          dimension: "spatial_visual",
          context: "Ma trận hợp nét hình học",
          difficultyWeight: 3,
          question: "Dựa vào quy luật biến đổi từ Cột 1 và Cột 2 sang Cột 3, hình nào thích hợp ở vị trí '?'?",
          svgDiagram: svgUnionMatrix(),
          options: iqOpts(2, [
            { t: "Chỉ là hình vuông rỗng không có nét bên trong" },
            { t: "Hình vuông có dấu chéo chữ X bên trong" },
            { t: "Hình vuông bị chia thành 4 ô nhỏ bởi dấu cộng (+) bên trong", f: "Chính xác! Cột 3 là phép hợp chồng hai hình ở Cột 1 và Cột 2." },
            { t: "Hình dấu cộng (+) nằm ngoài hình vuông" }
          ]),
          explanation:
            "Cột 3 là kết quả chồng khít (hợp nét) của Cột 1 và Cột 2: Hàng 1 (│ + ─ = +); Hàng 2 (/ + \\ = ×); Hàng 3 (Hình vuông □ + Dấu cộng + = Hình vuông có dấu cộng chia 4 ô bên trong)."
        },
        {
          id: "iqc-10",
          dimension: "verbal_analytic",
          context: "Quan hệ tương đồng",
          difficultyWeight: 1,
          question: "Chọn từ phù hợp nhất cho phép đối chiếu: TÁC GIẢ : BẢN THẢO :: KIẾN TRÚC SƯ : ?",
          options: iqOpts(1, [
            { t: "Viên gạch" },
            { t: "Bản vẽ thiết kế", f: "Chính xác! Bản thảo là sản phẩm thiết kế ban đầu của tác giả, tương ứng bản vẽ thiết kế của kiến trúc sư." },
            { t: "Ngôi nhà đã xây" },
            { t: "Cây thước kẻ" }
          ]),
          explanation:
            "Tác giả trực tiếp tạo ra bản thảo (bản thiết kế nội dung trước khi in thành sách), tương tự kiến trúc sư trực tiếp tạo ra bản vẽ thiết kế trước khi thi công thành công trình."
        },
        {
          id: "iqc-11",
          dimension: "verbal_analytic",
          context: "Phân loại khái niệm",
          difficultyWeight: 2,
          question: "Từ nào KHÔNG cùng bản chất hình học với ba từ còn lại?",
          options: iqOpts(3, [
            { t: "Hình tam giác" },
            { t: "Hình vuông" },
            { t: "Hình thang" },
            { t: "Hình lập phương", f: "Chính xác! Hình lập phương là khối 3D, trong khi 3 hình còn lại là hình phẳng 2D." }
          ]),
          explanation:
            "Tam giác, hình vuông và hình thang đều là các đa giác phẳng trong không gian 2 chiều (2D). Hình lập phương là khối đa diện 3 chiều (3D)."
        },
        {
          id: "iqc-12",
          dimension: "verbal_analytic",
          context: "Giải mã ký tự",
          difficultyWeight: 3,
          question: "Trong một quy ước mật mã, từ MIND được viết thành NJOE. Theo quy luật đó, từ BRAIN sẽ được viết thành gì?",
          options: iqOpts(0, [
            { t: "CSBJO", f: "Chuẩn xác! Mỗi chữ cái dịch tiến lên 1 bậc trong bảng chữ cái." },
            { t: "CSBIO" },
            { t: "AQZHM" },
            { t: "CTBJO" }
          ]),
          explanation:
            "M→N (+1), I→J (+1), N→O (+1), D→E (+1). Áp dụng tịnh tiến +1 cho từng chữ của BRAIN: B→C, R→S, A→B, I→J, N→O, tạo thành CSBJO."
        },
        {
          id: "iqc-13",
          dimension: "working_memory",
          context: "Bẫy trực giác CRT",
          difficultyWeight: 1,
          question:
            "Một chiếc vợt và một quả bóng có tổng giá 110.000đ. Biết chiếc vợt đắt hơn quả bóng đúng 100.000đ. Hỏi quả bóng giá bao nhiêu?",
          options: iqOpts(2, [
            { t: "10.000đ" },
            { t: "15.000đ" },
            { t: "5.000đ", f: "Tuyệt vời! Bạn không bị sập bẫy trực giác 10.000đ." },
            { t: "20.000đ" }
          ]),
          explanation:
            "Đặt giá bóng là x, giá vợt là x + 100.000. Ta có x + (x + 100.000) = 110.000 → 2x = 10.000 → x = 5.000đ (vợt giá 105.000đ, chênh lệch đúng 100.000đ). Nếu bóng giá 10.000đ thì vợt sẽ là 110.000đ và tổng thành 120.000đ."
        },
        {
          id: "iqc-14",
          dimension: "working_memory",
          context: "Xử lý song song",
          difficultyWeight: 2,
          question: "Nếu 5 chiếc máy mất đúng 5 phút để tạo ra 5 linh kiện, thì 100 chiếc máy mất bao lâu để tạo ra 100 linh kiện?",
          options: iqOpts(1, [
            { t: "100 phút" },
            { t: "5 phút", f: "Chính xác! Mỗi máy tự làm 1 linh kiện hết 5 phút nên 100 máy chạy song song cũng chỉ mất 5 phút." },
            { t: "20 phút" },
            { t: "1 phút" }
          ]),
          explanation:
            "5 máy làm 5 linh kiện trong 5 phút nghĩa là mỗi máy mất 5 phút để hoàn thành 1 linh kiện. Khi 100 máy cùng vận hành song song, sau đúng 5 phút sẽ thu được 100 linh kiện."
        },
        {
          id: "iqc-15",
          dimension: "working_memory",
          context: "Tăng trưởng hàm mũ",
          difficultyWeight: 3,
          question:
            "Một đám bèo trên mặt hồ mỗi ngày nở rộng gấp đôi diện tích ngày hôm trước. Đến ngày thứ 48 thì đám bèo phủ kín hoàn toàn mặt hồ. Hỏi đến ngày thứ bao nhiêu đám bèo phủ được đúng một nửa mặt hồ?",
          options: iqOpts(3, [
            { t: "Ngày thứ 24" },
            { t: "Ngày thứ 46" },
            { t: "Ngày thứ 12" },
            { t: "Ngày thứ 47", f: "Chuẩn xác! Ngày 47 phủ nửa hồ để ngày 48 nhân đôi lên thành cả hồ." }
          ]),
          explanation:
            "Vì diện tích tăng gấp đôi mỗi ngày, nên lùi lại 1 ngày trước khi đầy hoàn toàn (ngày 48) tức là ngày thứ 47 đám bèo phủ đúng 1/2 mặt hồ."
        }
      ]
    },
    {
      id: "iq-number-logic",
      title: "Đỉnh Cao Quy Luật Số Học & Suy Luận Logic",
      shortTitle: "Số Học & Logic Suy Luận",
      category: "iq-logic",
      categoryLabel: "IQ Logic & Số học",
      level: "Nâng cao",
      durationMinutes: 12,
      icon: "🔢",
      accentColor: "#0ea5e9",
      description:
        "Thử thách chuyên sâu về dãy số đa tầng, tam giác số, ma trận thời gian, suy luận thật-giả và bài toán tính toán tốc độ.",
      tags: ["12 câu hỏi", "Toán tư duy", "Logic mệnh đề"],
      questions: [
        {
          id: "iqn-01",
          dimension: "numerical_pattern",
          context: "Dãy số Fibonacci",
          difficultyWeight: 1,
          question: "Tìm số tiếp theo trong dãy: 1, 1, 2, 3, 5, 8, 13, ?",
          options: iqOpts(2, [
            { t: "18" },
            { t: "20" },
            { t: "21", f: "Chính xác! Mỗi số bằng tổng hai số liền trước: 8 + 13 = 21." },
            { t: "24" }
          ]),
          explanation:
            "Đây là dãy Fibonacci kinh điển: 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13, 8+13=21."
        },
        {
          id: "iqn-02",
          dimension: "numerical_pattern",
          context: "Cấp số kết hợp",
          difficultyWeight: 2,
          question: "Số nào điền vào dấu '?' trong dãy: 4, 9, 19, 39, 79, ?",
          options: iqOpts(0, [
            { t: "159", f: "Chính xác! Công thức: số sau = số trước × 2 + 1." },
            { t: "149" },
            { t: "158" },
            { t: "160" }
          ]),
          explanation:
            "4×2 + 1 = 9; 9×2 + 1 = 19; 19×2 + 1 = 39; 39×2 + 1 = 79; vậy 79×2 + 1 = 159 (hoặc hiệu số tăng gấp đôi: +5, +10, +20, +40, +80)."
        },
        {
          id: "iqn-03",
          dimension: "numerical_pattern",
          context: "Tam giác quy luật",
          difficultyWeight: 3,
          question: "Quan sát quy luật liên hệ giữa 3 số ở các đỉnh và số ở tâm mỗi tam giác. Số '?' bằng bao nhiêu?",
          svgDiagram: svgNumberTriangles(),
          options: iqOpts(3, [
            { t: "32" },
            { t: "35" },
            { t: "41" },
            { t: "37", f: "Tuyệt vời! Số ở tâm = (Đỉnh trên × Đỉnh trái) + Đỉnh phải = 6×5 + 7 = 37." }
          ]),
          explanation:
            "Tam giác 1: (4 × 3) + 2 = 14. Tam giác 2: (5 × 4) + 3 = 23. Áp dụng cho Tam giác 3: (6 × 5) + 7 = 30 + 7 = 37."
        },
        {
          id: "iqn-04",
          dimension: "numerical_pattern",
          context: "Dãy số đan xen",
          difficultyWeight: 3,
          question: "Tìm số còn thiếu trong dãy đan xen: 10, 12, 15, 11, 20, 10, 25, ?",
          options: iqOpts(1, [
            { t: "30" },
            { t: "9", f: "Xuất sắc! Dãy vị trí chẵn giảm dần 1 đơn vị: 12, 11, 10, 9." },
            { t: "11" },
            { t: "8" }
          ]),
          explanation:
            "Tách thành 2 dãy xen kẽ nhau: Vị trí lẻ (1, 3, 5, 7) là 10, 15, 20, 25 (+5 mỗi bước). Vị trí chẵn (2, 4, 6, 8) là 12, 11, 10, ? (-1 mỗi bước), nên số thứ 8 là 9."
        },
        {
          id: "iqn-05",
          dimension: "logical_reasoning",
          context: "Ghép cặp dữ kiện",
          difficultyWeight: 2,
          question:
            "Ba bạn Minh, Nam, Phong mặc 3 chiếc áo màu Đỏ, Xanh, Vàng (mỗi người 1 màu). Biết: Minh không mặc áo Đỏ; người mặc áo Vàng không phải Nam; Phong mặc áo Xanh. Hỏi Minh mặc áo màu gì?",
          options: iqOpts(2, [
            { t: "Màu Đỏ" },
            { t: "Màu Xanh" },
            { t: "Màu Vàng", f: "Chính xác! Phong mặc Xanh, Nam không mặc Vàng nên Nam mặc Đỏ và Minh mặc Vàng." },
            { t: "Không đủ dữ kiện xác định" }
          ]),
          explanation:
            "Phong mặc áo Xanh, nên Minh và Nam chia nhau hai màu Đỏ và Vàng. Vì Nam không mặc Vàng nên Nam mặc Đỏ. Suy ra Minh mặc áo Vàng (khớp luôn điều kiện Minh không mặc Đỏ)."
        },
        {
          id: "iqn-06",
          dimension: "logical_reasoning",
          context: "Đảo Thật – Dối",
          difficultyWeight: 3,
          question:
            "Trên hòn đảo chỉ có Người Thật (luôn nói thật) và Người Dối (luôn nói dối). Bạn gặp 2 người là A và B. A tuyên bố: 'Cả hai chúng tôi đều là Người Dối'. Khẳng định nào đúng?",
          options: iqOpts(0, [
            { t: "A là Người Dối, B là Người Thật.", f: "Đỉnh cao! Một Người Thật không thể tự nhận mình là Người Dối, nên câu nói của A sai và B phải là Người Thật." },
            { t: "Cả A và B đều là Người Dối." },
            { t: "A là Người Thật, B là Người Dối." },
            { t: "Cả A và B đều là Người Thật." }
          ]),
          explanation:
            "Giả sử A là Người Thật thì câu 'Cả hai đều là Người Dối' sẽ mâu thuẫn ngay với chính A. Vậy A chắc chắn là Người Dối. Do A nói dối nên mệnh đề 'cả hai đều là Người Dối' bị sai, tức là B không thể là Người Dối — vậy B phải là Người Thật."
        },
        {
          id: "iqn-07",
          dimension: "logical_reasoning",
          context: "Logic điều kiện",
          difficultyWeight: 2,
          question: "Cho mệnh đề đúng: 'Nếu trời mưa thì mặt đường ướt'. Hiện tại quan sát thấy mặt đường KHÔNG ướt. Kết luận nào chắc chắn đúng?",
          options: iqOpts(3, [
            { t: "Trời có thể vừa mưa nhẹ xong." },
            { t: "Hôm nay chắc chắn có nắng to." },
            { t: "Đường không ướt không liên quan đến chuyện mưa." },
            { t: "Hiện tại trời chắc chắn không mưa.", f: "Chính xác! Đây là quy tắc phản đảo (Modus Tollens)." }
          ]),
          explanation:
            "Theo quy tắc logic phản đảo: từ 'Mưa → Đường ướt', nếu 'Không ướt' thì chắc chắn 'Không mưa' (vì hễ có mưa thì đường đã phải ướt)."
        },
        {
          id: "iqn-08",
          dimension: "spatial_visual",
          context: "Lưới số 3×3",
          difficultyWeight: 2,
          question: "Tìm giá trị thay thế cho dấu '?' trong bảng số 3×3 dưới đây:",
          svgDiagram: svgNumberGrid(),
          options: iqOpts(1, [
            { t: "6" },
            { t: "8", f: "Chính xác! Cột 1 + Cột 2 = Cột 3, nên 12 + 8 = 20." },
            { t: "9" },
            { t: "10" }
          ]),
          explanation:
            "Ở mỗi hàng, tổng hai ô đầu bằng ô cuối: Hàng 1 (7 + 4 = 11), Hàng 2 (9 + 5 = 14), nên Hàng 3 là 12 + ? = 20 → ? = 8."
        },
        {
          id: "iqn-09",
          dimension: "spatial_visual",
          context: "Quy luật đồng hồ",
          difficultyWeight: 3,
          question: "Quan sát kim giờ và kim phút của 3 chiếc đồng hồ đầu tiên để chọn giờ đúng cho chiếc đồng hồ thứ tư:",
          svgDiagram: svgClocks(),
          options: iqOpts(2, [
            { t: "06:30" },
            { t: "07:00" },
            { t: "06:45", f: "Chính xác! Mỗi chiếc đồng hồ cộng thêm đúng 2 giờ 15 phút." },
            { t: "07:15" }
          ]),
          explanation:
            "Khoảng thời gian tăng đều giữa các đồng hồ là +2 giờ 15 phút: 12:00 → 02:15 → 04:30 → 06:45."
        },
        {
          id: "iqn-10",
          dimension: "verbal_analytic",
          context: "Mã hóa chữ – số",
          difficultyWeight: 2,
          question: "Quy ước theo thứ tự bảng chữ cái tiếng Anh: A = 1, B = 2, C = 3, ..., Z = 26. Tổng giá trị của từ DATA là bao nhiêu?",
          options: iqOpts(0, [
            { t: "26", f: "Chính xác! D(4) + A(1) + T(20) + A(1) = 26." },
            { t: "24" },
            { t: "28" },
            { t: "30" }
          ]),
          explanation:
            "D đứng thứ 4, A đứng thứ 1, T đứng thứ 20 (sau R=18, S=19), A đứng thứ 1. Tổng: 4 + 1 + 20 + 1 = 26."
        },
        {
          id: "iqn-11",
          dimension: "working_memory",
          context: "Toán chuyển động",
          difficultyWeight: 2,
          question:
            "Một đoàn tàu dài 100 mét chạy đều với vận tốc 20 m/s đi xuyên qua một đường hầm dài 300 mét. Tính từ lúc đầu tàu chạm cửa hầm đến lúc đuôi tàu thoát hẳn khỏi hầm hết bao nhiêu giây?",
          options: iqOpts(1, [
            { t: "15 giây" },
            { t: "20 giây", f: "Chính xác! Tổng quãng đường tàu cần đi là 300m + 100m = 400m." },
            { t: "10 giây" },
            { t: "25 giây" }
          ]),
          explanation:
            "Khi đầu tàu ra tới cửa bên kia, phần thân tàu dài 100m vẫn còn nằm trong hầm. Do đó tổng quãng đường đầu tàu đi được là 300 + 100 = 400 mét. Thời gian: 400 / 20 = 20 giây."
        },
        {
          id: "iqn-12",
          dimension: "working_memory",
          context: "Đếm số trận đấu",
          difficultyWeight: 3,
          question:
            "Một giải đấu loại trực tiếp (thua 1 trận là bị loại ngay) có tổng cộng 64 tay vợt tham gia. Ban tổ chức cần sắp xếp tất cả bao nhiêu trận đấu để tìm ra đúng 1 nhà vô địch?",
          options: iqOpts(3, [
            { t: "32 trận" },
            { t: "64 trận" },
            { t: "62 trận" },
            { t: "63 trận", f: "Tuyệt vời! Mỗi trận loại đúng 1 người, cần loại 63 người nên phải có 63 trận." }
          ]),
          explanation:
            "Có thể cộng theo vòng (32 + 16 + 8 + 4 + 2 + 1 = 63) hoặc tư duy ngược siêu nhanh: mỗi trận loại đúng 1 tay vợt; từ 64 người để còn lại 1 nhà vô địch phải loại 63 người, tương ứng đúng 63 trận."
        }
      ]
    },
    {
      id: "iq-spatial-matrix",
      title: "Thị Giác Không Gian & Ma Trận Hình Học (Visual IQ)",
      shortTitle: "Không Gian & Ma Trận Hình",
      category: "iq-spatial",
      categoryLabel: "IQ Không gian",
      level: "Chuyên sâu",
      durationMinutes: 12,
      icon: "📐",
      accentColor: "#10b981",
      description:
        "Đánh giá khả năng tưởng tượng 2D/3D trực quan với sơ đồ SVG: xoay hình, phản xạ gương, phép toán ma trận XOR, gấp khối lập phương và đếm hình học.",
      tags: ["12 câu hỏi", "Hình vẽ SVG", "Tư duy 3D"],
      questions: [
        {
          id: "iqs-01",
          dimension: "spatial_visual",
          context: "Xoay hình ngược chiều",
          difficultyWeight: 1,
          question: "Chữ L có chấm tròn ở đầu thanh đứng đang xoay ngược chiều kim đồng hồ 90° qua mỗi bước. Bước 4 là hình nào?",
          svgDiagram: svgLShapeRotation(),
          options: iqOpts(1, [
            { t: "Giống hệt Bước 1 (thanh đứng ở bên trái, chấm ở trên)" },
            { t: "Thanh ngang hướng sang phải với chấm tròn nằm ở đầu phải, thanh ngắn gập lên trên", f: "Chính xác! Xoay ngược chiều kim đồng hồ 3 lần 90° tương đương xoay thuận 90° từ Bước 1." },
            { t: "Giống hệt Bước 2" },
            { t: "Thanh đứng hướng xuống dưới, chấm tròn ở dưới cùng" }
          ]),
          explanation:
            "Mỗi bước xoay ngược chiều kim đồng hồ 90°: Bước 1 (0°), Bước 2 (-90°: thanh dài nằm ngang bên dưới, chấm bên trái), Bước 3 (-180°: úp ngược, chấm ở dưới phải), Bước 4 (-270° = +90°: xoay 90° thuận chiều so với Bước 1, chấm nằm ở đầu bên phải)."
        },
        {
          id: "iqs-02",
          dimension: "spatial_visual",
          context: "Phản xạ qua trục gương",
          difficultyWeight: 2,
          question: "Hình bên trái được soi qua trục gương thẳng đứng ở giữa. Ảnh phản chiếu bên phải sẽ như thế nào?",
          svgDiagram: svgMirrorF(),
          options: iqOpts(0, [
            { t: "Chữ F quay ngược sang trái, hai nét ngang hướng về trục gương, chấm tròn nằm phía dưới gần trục gương", f: "Chính xác! Phép đối xứng trục đứng đảo chiều trái-phải nhưng giữ nguyên trên-dưới." },
            { t: "Chữ F lật ngược đầu xuống dưới, chấm tròn nằm phía trên" },
            { t: "Giữ nguyên hình chữ F ban đầu nhưng chấm tròn chuyển sang bên trái" },
            { t: "Chữ F quay ngược sang trái nhưng chấm tròn nằm ở phía ngoài cùng bên phải" }
          ]),
          explanation:
            "Phản xạ qua gương thẳng đứng giữ nguyên chiều trên–dưới và đảo ngược khoảng cách trái–phải. Vì hai đầu nét ngang và chấm tròn của hình gốc đều hướng gần về phía trục gương, nên ảnh phản chiếu cũng có hai nét ngang và chấm tròn hướng sát vào trục gương (quay sang trái)."
        },
        {
          id: "iqs-03",
          dimension: "spatial_visual",
          context: "Ma trận Latin 2 lớp",
          difficultyWeight: 2,
          question: "Tìm hình còn thiếu ở vị trí '?' dựa trên quy luật hình dáng và số chấm tròn:",
          svgDiagram: svgLatinShapeMatrix(),
          options: iqOpts(2, [
            { t: "Hình vuông có 2 chấm tròn" },
            { t: "Hình tam giác có 1 chấm tròn" },
            { t: "Hình vuông có 1 chấm tròn ở giữa", f: "Chuẩn xác! Hàng 3 và Cột 3 đều thiếu hình vuông và số chấm bằng 1." },
            { t: "Hình lục giác có 1 chấm tròn" }
          ]),
          explanation:
            "Mỗi hàng và mỗi cột đều chứa đủ 3 loại hình {Tam giác, Vuông, Lục giác} và đủ 3 số lượng chấm {1, 2, 3}. Hàng 3 đã có Lục giác (2 chấm) và Tam giác (3 chấm), nên ô cuối cùng phải là Hình vuông có 1 chấm."
        },
        {
          id: "iqs-04",
          dimension: "spatial_visual",
          context: "Ma trận phép toán XOR",
          difficultyWeight: 3,
          question:
            "Quan sát các ô vuông nhỏ được tô màu ở Cột 1, Cột 2 và kết quả ở Cột 3. Hãy tìm đúng trạng thái của ô '?' dưới cùng bên phải:",
          svgDiagram: svgXorQuadrants(),
          options: iqOpts(3, [
            { t: "Tô màu cả 4 ô vuông nhỏ" },
            { t: "Chỉ tô 2 ô phía bên trái" },
            { t: "Tô 3 ô (chỉ chừa ô trên bên phải)" },
            { t: "Chỉ tô 2 ô phía bên phải (trên-phải và dưới-phải)", f: "Xuất sắc! Quy luật là phép XOR: hai ô trùng màu ở Cột 1 & 2 sẽ triệt tiêu ở Cột 3." }
          ]),
          explanation:
            "Quy luật phép loại trừ (XOR): ở mỗi vị trí góc, nếu CHỈ CÓ Cột 1 hoặc Cột 2 được tô màu thì Cột 3 được tô; nếu cả hai cùng tô hoặc cùng trống thì Cột 3 để trống. Hàng 3 có Cột 1 tô (Trên-Trái, Trên-Phải, Dưới-Trái) và Cột 2 tô (Trên-Trái, Dưới-Trái, Dưới-Phải). Hai vị trí trùng là Trên-Trái và Dưới-Trái bị triệt tiêu, còn lại Trên-Phải và Dưới-Phải được tô."
        },
        {
          id: "iqs-05",
          dimension: "spatial_visual",
          context: "Đếm hình hệ thống",
          difficultyWeight: 3,
          question: "Có tổng cộng bao nhiêu hình tam giác trong hình vẽ bên dưới?",
          svgDiagram: svgCountTriangles(),
          options: iqOpts(1, [
            { t: "8 hình tam giác" },
            { t: "12 hình tam giác", f: "Chính xác! Tầng trên có 6 tam giác nhỏ và cả hình cao có thêm 6 tam giác lớn." },
            { t: "10 hình tam giác" },
            { t: "15 hình tam giác" }
          ]),
          explanation:
            "Xét các tam giác nhận đỉnh trên cùng làm đỉnh chung: đáy ngang ở giữa cắt 4 tia xuất phát từ đỉnh nên tạo ra C(4,2) = 6 tam giác tầng trên; đáy ngang dưới cùng cũng cắt đúng 4 tia đó nên tạo ra thêm 6 tam giác kích thước đầy đủ. Tổng cộng: 6 + 6 = 12 hình tam giác."
        },
        {
          id: "iqs-06",
          dimension: "logical_reasoning",
          context: "Gấp khối lập phương",
          difficultyWeight: 2,
          question: "Khi gấp tấm bìa chữ thập dưới đây thành một khối lập phương hoàn chỉnh, mặt đối diện với mặt số 2 là mặt số mấy?",
          svgDiagram: svgCubeNet(),
          options: iqOpts(2, [
            { t: "Mặt số 5" },
            { t: "Mặt số 6" },
            { t: "Mặt số 4", f: "Chính xác! Mặt 3 làm đáy, mặt 2 gập lên bên trái đối diện mặt 4 gập lên bên phải." },
            { t: "Mặt số 1" }
          ]),
          explanation:
            "Giữ mặt số 3 làm đáy: mặt 2 gập đứng bên trái, mặt 4 gập đứng bên phải nên 2 đối diện 4. (Tương tự 1 đối diện 6, và 3 đối diện 5)."
        },
        {
          id: "iqs-07",
          dimension: "logical_reasoning",
          context: "Suy luận góc nhìn",
          difficultyWeight: 2,
          question:
            "Trong một căn phòng hình vuông có 4 góc. Ở mỗi góc có 1 con mèo ngồi, và trước mặt mỗi con mèo lại có đúng 3 con mèo khác. Hỏi trong phòng có tất cả bao nhiêu con mèo?",
          options: iqOpts(0, [
            { t: "4 con mèo", f: "Chính xác! 4 con ngồi ở 4 góc nhìn vào trung tâm nên con nào cũng thấy 3 con kia." },
            { t: "12 con mèo" },
            { t: "16 con mèo" },
            { t: "7 con mèo" }
          ]),
          explanation:
            "Chỉ có đúng 4 con mèo ngồi tại 4 góc phòng; mỗi con nhìn vào phòng đều thấy 3 con mèo ở 3 góc còn lại."
        },
        {
          id: "iqs-08",
          dimension: "numerical_pattern",
          context: "Xoay khối xúc xắc 3D",
          difficultyWeight: 2,
          question:
            "Một viên xúc xắc chuẩn (tổng hai mặt đối diện luôn bằng 7) đang đặt trên bàn với mặt trên là 2, mặt hướng về phía bạn là 3 và mặt bên phải là 1. Nếu bạn lật xúc xắc về phía trước 90° (1 lần) rồi lật sang bên phải 90° (1 lần), mặt trên cùng lúc này là số mấy?",
          options: iqOpts(3, [
            { t: "1" },
            { t: "4" },
            { t: "5" },
            { t: "6", f: "Xuất sắc! Mặt bên trái ban đầu là 7 - 1 = 6; bước lật sang phải đưa chính mặt trái này lên đỉnh." }
          ]),
          explanation:
            "Ban đầu mặt bên phải là 1 nên mặt bên trái đối diện là 7 - 1 = 6. Khi lật về phía trước 90°, hai mặt trái/phải giữ nguyên vị trí (vẫn là 6 và 1). Sau đó lật sang phải 90°, mặt bên trái (số 6) được xoay lên nằm ở mặt trên cùng."
        },
        {
          id: "iqs-09",
          dimension: "numerical_pattern",
          context: "Khối lập phương sơn màu",
          difficultyWeight: 3,
          question:
            "Một khối lập phương lớn kích thước 3 × 3 × 3 (gồm 27 khối nhỏ) được sơn đỏ toàn bộ 6 mặt ngoài, sau đó cắt rời thành 27 khối đơn vị. Hỏi có bao nhiêu khối nhỏ được sơn ĐÚNG 2 mặt?",
          options: iqOpts(1, [
            { t: "8 khối" },
            { t: "12 khối", f: "Chính xác! Mỗi cạnh trong 12 cạnh của khối lập phương có đúng 1 khối nằm giữa hai góc." },
            { t: "6 khối" },
            { t: "16 khối" }
          ]),
          explanation:
            "Các khối được sơn đúng 2 mặt nằm ở giữa các cạnh (không tính góc). Hình lập phương có 12 cạnh, với kích thước 3×3×3 thì mỗi cạnh có 3 - 2 = 1 khối ở giữa. Tổng cộng: 12 × 1 = 12 khối."
        },
        {
          id: "iqs-10",
          dimension: "verbal_analytic",
          context: "Định hướng la bàn",
          difficultyWeight: 2,
          question:
            "Bạn đang quay mặt thẳng về hướng Bắc. Bạn xoay 90° theo chiều kim đồng hồ, sau đó xoay ngược chiều kim đồng hồ 180°, rồi lại xoay 90° theo chiều kim đồng hồ. Cuối cùng bạn nhìn về hướng nào?",
          options: iqOpts(0, [
            { t: "Hướng Bắc", f: "Chính xác! +90° - 180° + 90° = 0°, quay về đúng hướng Bắc ban đầu." },
            { t: "Hướng Đông" },
            { t: "Hướng Tây" },
            { t: "Hướng Nam" }
          ]),
          explanation:
            "Bắt đầu từ Bắc → xoay +90° thành Đông → xoay -180° thành Tây → xoay +90° quay trở lại đúng hướng Bắc."
        },
        {
          id: "iqs-11",
          dimension: "working_memory",
          context: "Tọa độ di chuyển",
          difficultyWeight: 2,
          question:
            "Một robot xuất phát tại (0, 0) quay mặt về hướng Bắc. Robot thực hiện liên tiếp: Đi thẳng 3 bước → Rẽ phải 90° → Đi thẳng 4 bước → Rẽ phải 90° → Đi thẳng 3 bước. Khoảng cách đường chim bay từ vị trí cuối về (0, 0) là bao nhiêu bước?",
          svgDiagram: svgRobotPath(),
          options: iqOpts(2, [
            { t: "3 bước" },
            { t: "5 bước" },
            { t: "4 bước", f: "Chính xác! Robot kết thúc tại tọa độ (4, 0), cách gốc (0, 0) đúng 4 bước." },
            { t: "10 bước" }
          ]),
          explanation:
            "(0, 0) đi Bắc 3 bước → (0, 3); rẽ phải đi Đông 4 bước → (4, 3); rẽ phải đi Nam 3 bước → (4, 0). Khoảng cách từ (4, 0) về (0, 0) là 4 bước."
        },
        {
          id: "iqs-12",
          dimension: "working_memory",
          context: "Tối ưu phép cân",
          difficultyWeight: 3,
          question:
            "Có 12 đồng xu bề ngoài giống hệt nhau, trong đó có đúng 1 đồng xu giả nhẹ hơn các đồng còn lại. Với một chiếc cân thăng bằng 2 đĩa, cần tối thiểu bao nhiêu lần cân để CHẮC CHẮN tìm ra đồng xu giả trong mọi trường hợp?",
          options: iqOpts(1, [
            { t: "2 lần cân" },
            { t: "3 lần cân", f: "Chính xác! Chia 3 nhóm (4-4-4) rồi thu hẹp dần giúp chắc chắn tìm ra trong đúng 3 lần cân." },
            { t: "4 lần cân" },
            { t: "6 lần cân" }
          ]),
          explanation:
            "Lần 1: đặt 4 vs 4 lên cân (nếu bằng nhau thì xu giả nằm trong 4 xu còn lại; nếu lệch thì nằm ở đĩa nhẹ hơn) → còn 4 xu. Lần 2: cân 2 vs 2 từ 4 xu đó → còn 2 xu nhẹ hơn. Lần 3: cân 1 vs 1 → tìm ra xu giả. (Vì mỗi lần cân 2 đĩa cho tối đa 3 nhánh kết quả, 3² = 9 < 12 nên không thể đảm bảo chỉ trong 2 lần)."
        }
      ]
    },
    {
      id: "iq-quick-brain",
      title: "Test Nhanh IQ 5 Phút: Phản Xạ Não Bộ & Chống Bẫy Tư Duy",
      shortTitle: "Test Nhanh IQ 5 Phút",
      category: "iq-quick",
      categoryLabel: "IQ Nhanh 5 phút",
      level: "Nhanh gọn",
      durationMinutes: 5,
      icon: "⚡",
      accentColor: "#ec4899",
      description:
        "11 câu hỏi cô đọng đánh giá tốc độ xử lý, khả năng né bẫy trực giác (Cognitive Reflection Test), suy luận gia phả và toán mẹo thực tế trong 5 phút.",
      tags: ["11 câu hỏi", "5 phút", "Chống bẫy tư duy"],
      questions: [
        {
          id: "iqb-01",
          dimension: "working_memory",
          context: "Thứ hạng tức thời",
          difficultyWeight: 1,
          question: "Bạn tham gia một cuộc đua chạy và vượt qua người đang chạy ở vị trí thứ 2. Lúc này bạn đang ở vị trí thứ mấy?",
          options: iqOpts(1, [
            { t: "Thứ nhất" },
            { t: "Thứ 2", f: "Chính xác! Vượt qua người thứ 2 tức là bạn thế đúng vị trí thứ 2 của họ." },
            { t: "Thứ 3" },
            { t: "Thứ 4" }
          ]),
          explanation:
            "Nếu bạn vượt qua người đang đứng thứ 2, bạn chiếm chỗ thứ 2 của họ (người đó lùi xuống thứ 3). Muốn lên thứ nhất bạn phải vượt thêm người dẫn đầu nữa."
        },
        {
          id: "iqb-02",
          dimension: "working_memory",
          context: "Đọc kỹ ngôn từ",
          difficultyWeight: 2,
          question: "Một trang trại có 17 con cừu. Một cơn bão ập tới khiến tất cả trừ 9 con đều chạy mất. Hỏi trang trại còn lại bao nhiêu con cừu?",
          options: iqOpts(2, [
            { t: "8 con" },
            { t: "17 con" },
            { t: "9 con", f: "Chuẩn xác! Cụm từ 'tất cả trừ 9 con' nghĩa là đúng 9 con ở lại." },
            { t: "0 con" }
          ]),
          explanation:
            "Câu hỏi không yêu cầu làm phép trừ 17 - 9! 'Tất cả trừ 9 con chạy mất' có nghĩa là 8 con chạy mất và đúng 9 con vẫn còn lại."
        },
        {
          id: "iqb-03",
          dimension: "working_memory",
          context: "Khoảng thời gian",
          difficultyWeight: 3,
          question: "Bác sĩ kê cho bạn 3 viên thuốc và dặn: 'Cứ cách 30 phút uống 1 viên'. Hỏi từ lúc uống viên đầu tiên đến lúc uống xong viên thứ 3 mất tổng cộng bao nhiêu phút?",
          options: iqOpts(0, [
            { t: "60 phút", f: "Chính xác! Phút 0 uống viên 1, phút 30 uống viên 2, phút 60 uống viên 3." },
            { t: "90 phút" },
            { t: "45 phút" },
            { t: "30 phút" }
          ]),
          explanation:
            "3 viên thuốc chỉ có 2 khoảng nghỉ ở giữa: 0 phút (viên 1) → 30 phút (viên 2) → 60 phút (viên 3). Tổng thời gian là 60 phút."
        },
        {
          id: "iqb-04",
          dimension: "logical_reasoning",
          context: "Logic ngôn từ",
          difficultyWeight: 1,
          question: "Theo lịch dương hiện hành, trong một năm bình thường có bao nhiêu tháng có 28 ngày?",
          options: iqOpts(3, [
            { t: "Chỉ có 1 tháng (Tháng 2)" },
            { t: "7 tháng" },
            { t: "Không có tháng nào ngoài tháng 2" },
            { t: "Cả 12 tháng", f: "Chính xác! Tháng nào trong năm cũng đều có ngày 28 (tối thiểu 28 ngày)." }
          ]),
          explanation:
            "Câu hỏi là 'có 28 ngày' chứ không phải 'chỉ có đúng 28 ngày'. Vì tháng nào cũng dài từ 28 đến 31 ngày nên cả 12 tháng đều có 28 ngày."
        },
        {
          id: "iqb-05",
          dimension: "logical_reasoning",
          context: "Suy luận hệ phương trình",
          difficultyWeight: 2,
          question:
            "Trong một gia đình, mỗi người con gái có số anh/em trai bằng đúng số chị/em gái của mình. Nhưng mỗi người con trai lại có số chị/em gái GẤP ĐÔI số anh/em trai của mình. Gia đình có bao nhiêu con trai và con gái?",
          options: iqOpts(1, [
            { t: "2 con trai và 4 con gái" },
            { t: "3 con trai và 4 con gái", f: "Tuyệt vời! 3 trai và 4 gái thỏa mãn cả hai điều kiện." },
            { t: "2 con trai và 3 con gái" },
            { t: "4 con trai và 4 con gái" }
          ]),
          explanation:
            "Kiểm chứng nhanh: Nếu có 3 trai và 4 gái, mỗi bạn gái có 3 chị/em gái và 3 anh/em trai (bằng nhau ✓); mỗi bạn trai có 4 chị/em gái và 2 anh/em trai (gấp đôi ✓)."
        },
        {
          id: "iqb-06",
          dimension: "logical_reasoning",
          context: "Suy luận gia phả",
          difficultyWeight: 3,
          question:
            "Anh Tùng (là nam) chỉ vào một bức ảnh chân dung và nói: 'Bố của người trong ảnh là con trai duy nhất của bố tôi'. Người trong bức ảnh là ai đối với anh Tùng?",
          options: iqOpts(2, [
            { t: "Bố của anh Tùng" },
            { t: "Chính anh Tùng" },
            { t: "Con của anh Tùng", f: "Chính xác! 'Con trai duy nhất của bố tôi' chính là anh Tùng." },
            { t: "Anh trai của anh Tùng" }
          ]),
          explanation:
            "Vì anh Tùng là nam và bố anh chỉ có một con trai duy nhất, nên 'con trai duy nhất của bố tôi' chính là bản thân anh Tùng. Thay vào câu nói: 'Bố của người trong ảnh là anh Tùng' → người trong ảnh là con của anh Tùng."
        },
        {
          id: "iqb-07",
          dimension: "numerical_pattern",
          context: "Bẫy vận tốc trung bình",
          difficultyWeight: 2,
          question:
            "Một chiếc xe đi từ A đến B với vận tốc 40 km/h, sau đó quay về từ B về A trên đúng quãng đường cũ với vận tốc 60 km/h. Vận tốc trung bình cho cả hành trình đi và về là bao nhiêu?",
          options: iqOpts(0, [
            { t: "48 km/h", f: "Chính xác! Thời gian đi lâu hơn thời gian về nên vận tốc trung bình không phải 50 km/h." },
            { t: "50 km/h" },
            { t: "52 km/h" },
            { t: "45 km/h" }
          ]),
          explanation:
            "Giả sử quãng đường AB dài 120 km: lượt đi hết 120/40 = 3 giờ, lượt về hết 120/60 = 2 giờ. Tổng quãng đường 240 km đi trong 5 giờ → Vận tốc trung bình = 240 / 5 = 48 km/h."
        },
        {
          id: "iqb-08",
          dimension: "numerical_pattern",
          context: "Bẫy phần trăm kép",
          difficultyWeight: 3,
          question:
            "Một món hàng niêm yết 1.000.000đ. Tuần trước cửa hàng tăng giá 20% so với niêm yết. Tuần này cửa hàng lại giảm 20% trên mức giá đang bán. Giá hiện tại là bao nhiêu?",
          options: iqOpts(3, [
            { t: "1.000.000đ" },
            { t: "980.000đ" },
            { t: "1.040.000đ" },
            { t: "960.000đ", f: "Chuẩn xác! 20% của 1.200.000đ lớn hơn 20% của 1.000.000đ nên giá cuối giảm xuống 960.000đ." }
          ]),
          explanation:
            "Sau khi tăng 20%: 1.000.000 × 1,2 = 1.200.000đ. Giảm 20% trên giá mới: 1.200.000 × 0,8 = 960.000đ."
        },
        {
          id: "iqb-09",
          dimension: "verbal_analytic",
          context: "Quan hệ phát triển",
          difficultyWeight: 2,
          question: "Chọn cặp từ đồng cấu trúc quan hệ nhất với cặp mẫu: HẠT GIỐNG : CÂY CỔ THỤ :: ?",
          options: iqOpts(1, [
            { t: "Bánh mì : Lò nướng" },
            { t: "Ý tưởng : Phát minh vĩ đại", f: "Chính xác! Mầm khởi đầu phát triển thành thành quả hoàn chỉnh lớn lao." },
            { t: "Cành cây : Lá xanh" },
            { t: "Nước uống : Cái cốc" }
          ]),
          explanation:
            "Hạt giống là mầm khởi nguyên phát triển dần theo thời gian thành cây cổ thụ lớn lao; tương tự, ý tưởng ban đầu được nuôi dưỡng phát triển thành phát minh vĩ đại."
        },
        {
          id: "iqb-10",
          dimension: "verbal_analytic",
          context: "Phân loại thiên thể",
          difficultyWeight: 3,
          question: "Thiên thể nào KHÔNG cùng nhóm phân loại khoa học với 3 thiên thể còn lại?",
          options: iqOpts(2, [
            { t: "Sao Hỏa" },
            { t: "Sao Kim" },
            { t: "Mặt Trăng", f: "Chính xác! Mặt Trăng là vệ tinh tự nhiên quay quanh Trái Đất, còn 3 thiên thể kia là hành tinh." },
            { t: "Sao Mộc" }
          ]),
          explanation:
            "Sao Hỏa, Sao Kim và Sao Mộc đều là các hành tinh quay trực tiếp quanh Mặt Trời. Mặt Trăng là vệ tinh tự nhiên quay quanh Trái Đất."
        },
        {
          id: "iqb-11",
          dimension: "spatial_visual",
          context: "Cắt hình tối ưu",
          difficultyWeight: 2,
          question:
            "Với một chiếc bánh pizza hình tròn đặt phẳng trên bàn (không chồng các miếng lên nhau), bằng đúng 3 nhát cắt thẳng xuyên qua bánh, bạn có thể tạo ra TỐI ĐA bao nhiêu miếng?",
          svgDiagram: svgPizzaCuts(),
          options: iqOpts(3, [
            { t: "6 miếng" },
            { t: "8 miếng" },
            { t: "5 miếng" },
            { t: "7 miếng", f: "Xuất sắc! Nhát cắt thứ 3 không đi qua giao điểm cũ sẽ cắt qua 2 đường trước và chia thêm 3 miếng (4 + 3 = 7)." }
          ]),
          explanation:
            "1 nhát cắt tạo 2 miếng. Nhát 2 cắt ngang nhát 1 tạo 4 miếng. Nhát 3 đặt lệch đi để cắt cả hai đường cũ tại 2 điểm phân biệt sẽ đi qua 3 miền và chia mỗi miền làm đôi, tạo thêm 3 miếng → tối đa 4 + 3 = 7 miếng."
        }
      ]
    }
  ];

  // Ensure all IQ tests carry explicit testType and merge into window.EQ_DATA safely
  IQ_TESTS.forEach((test) => {
    test.testType = "iq";
  });
  DATA.IQ_DIMENSIONS = IQ_DIMENSIONS;
  DATA.IQ_LEVELS = IQ_LEVELS;
  DATA.IQ_TESTS = IQ_TESTS;
  DATA.TESTS = DATA.TESTS.concat(IQ_TESTS);
})();
