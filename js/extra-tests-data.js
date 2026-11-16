(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  if (!DATA) {
    throw new Error("EQ_DATA must be loaded before extra-tests-data.js.");
  }

  // ==================== BALANCED OPTION HELPERS ====================
  const PERMS = [
    [3, 1, 4, 2],
    [4, 2, 1, 3],
    [1, 4, 2, 3],
    [2, 3, 1, 4],
    [4, 1, 3, 2],
    [2, 4, 3, 1],
    [1, 3, 4, 2],
    [3, 2, 1, 4]
  ];

  let seqIdx = 0;
  function scaleOpts(byScoreMap) {
    const order = PERMS[seqIdx % PERMS.length];
    seqIdx++;
    return order.map((sc) => ({
      text: byScoreMap[sc].t,
      score: sc,
      feedback: byScoreMap[sc].f
    }));
  }

  function iqOpts(correctIdx, items) {
    return items.map((item, idx) => {
      const isCorrect = idx === correctIdx;
      return {
        text: item.t,
        isCorrect,
        score: isCorrect ? 4 : 1,
        feedback:
          item.f ||
          (isCorrect
            ? "Chính xác! Bạn đã phân tích đúng quy luật."
            : "Chưa chính xác. Hãy xem phần giải thích từng bước bên dưới.")
      };
    });
  }

  // ==================== SVG HELPERS FOR EXTRA IQ ====================
  function svgWrap(inner, w = 320, h = 200) {
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="iq-svg" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  function svgSymbolEquations() {
    const out = `
      <rect x="14" y="12" width="292" height="172" rx="12" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <text x="160" y="48" text-anchor="middle" font-size="18" font-weight="800" fill="var(--text)">★  +  ★  =  14</text>
      <text x="160" y="84" text-anchor="middle" font-size="18" font-weight="800" fill="var(--text)">★  +  ▲  =  19</text>
      <text x="160" y="120" text-anchor="middle" font-size="18" font-weight="800" fill="var(--text)">▲  −  ●  =  4</text>
      <line x1="44" y1="136" x2="276" y2="136" stroke="var(--border-strong)" stroke-width="1.2"/>
      <text x="160" y="166" text-anchor="middle" font-size="19" font-weight="800" fill="var(--primary)">( ★ × ● ) − ▲  =  ?</text>
    `;
    return svgWrap(out, 320, 196);
  }

  function svgPigpenCipher() {
    // 3x3 grid A..I on left; 3 cipher symbols for I, C, E on right
    let out = "";
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const x = 18 + c * 36;
        const y = 24 + r * 36;
        out += `<rect x="${x}" y="${y}" width="36" height="36" fill="var(--bg-soft)" stroke="var(--border)" stroke-width="1"/>`;
        out += `<text x="${x + 18}" y="${y + 24}" text-anchor="middle" font-size="15" font-weight="800" fill="var(--text)">${letters[r * 3 + c]}</text>`;
      }
    }
    // Outer grid lines emphasizing inner borders
    out += `<line x1="54" y1="24" x2="54" y2="132" stroke="var(--text)" stroke-width="2.5"/>`;
    out += `<line x1="90" y1="24" x2="90" y2="132" stroke="var(--text)" stroke-width="2.5"/>`;
    out += `<line x1="18" y1="60" x2="126" y2="60" stroke="var(--text)" stroke-width="2.5"/>`;
    out += `<line x1="18" y1="96" x2="126" y2="96" stroke="var(--text)" stroke-width="2.5"/>`;
    out += `<text x="72" y="154" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-muted)">Bảng mã khóa</text>`;

    // Symbol 1: I (top & left)
    out += `<path d="M168,94 L168,58 L204,58" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    // Symbol 2: C (left & bottom)
    out += `<path d="M222,58 L222,94 L258,94" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    // Symbol 3: E (full square)
    out += `<rect x="276" y="58" width="36" height="36" fill="none" stroke="var(--primary)" stroke-width="4"/>`;
    out += `<text x="240" y="132" text-anchor="middle" font-size="13" font-weight="800" fill="var(--primary)">Từ 3 ký tự = ?</text>`;
    return svgWrap(out, 332, 168);
  }

  function svgBalanceScale() {
    const out = `
      <rect x="12" y="10" width="316" height="148" rx="12" fill="var(--bg-soft)" stroke="var(--border-strong)" stroke-width="1.5"/>
      <text x="170" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="var(--text)">⚖️  1 Hình Vuông  =  2 Hình Tròn</text>
      <text x="170" y="80" text-anchor="middle" font-size="16" font-weight="800" fill="var(--text)">⚖️  1 Tam Giác  =  1 Vuông + 1 Tròn</text>
      <line x1="36" y1="100" x2="304" y2="100" stroke="var(--border-strong)" stroke-width="1.2"/>
      <text x="170" y="132" text-anchor="middle" font-size="17" font-weight="800" fill="var(--primary)">⚖️  2 Tam Giác  =  ? Hình Tròn</text>
    `;
    return svgWrap(out, 340, 170);
  }

  function svgSpinnerWheel() {
    // 8 equal sectors: 3x +20k, 1x +100k, 4x 0d
    const cx = 100;
    const cy = 96;
    const r = 78;
    const labels = ["+20k", "0đ", "+20k", "0đ", "+100k", "0đ", "+20k", "0đ"];
    const colors = [
      "var(--info-soft)",
      "var(--bg-muted)",
      "var(--info-soft)",
      "var(--bg-muted)",
      "var(--warning-soft)",
      "var(--bg-muted)",
      "var(--info-soft)",
      "var(--bg-muted)"
    ];
    let out = "";
    for (let i = 0; i < 8; i++) {
      const a1 = (i * 45 - 90) * (Math.PI / 180);
      const a2 = ((i + 1) * 45 - 90) * (Math.PI / 180);
      const am = ((i + 0.5) * 45 - 90) * (Math.PI / 180);
      const x1 = cx + Math.cos(a1) * r;
      const y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * r;
      const y2 = cy + Math.sin(a2) * r;
      const lx = cx + Math.cos(am) * (r * 0.65);
      const ly = cy + Math.sin(am) * (r * 0.65) + 4;
      out += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0,1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${colors[i]}" stroke="var(--text)" stroke-width="1.5"/>`;
      out += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="800" fill="var(--text)">${labels[i]}</text>`;
    }
    out += `<circle cx="${cx}" cy="${cy}" r="6" fill="var(--primary)"/>`;
    out += `<text x="242" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">8 ô bằng nhau:</text>`;
    out += `<text x="242" y="96" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--info)">• 3 ô: +20.000đ</text>`;
    out += `<text x="242" y="118" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--warning)">• 1 ô: +100.000đ</text>`;
    out += `<text x="242" y="140" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--text-muted)">• 4 ô: 0đ</text>`;
    return svgWrap(out, 320, 192);
  }

  function svgShortestGraph() {
    // Nodes: S(42,100), A(142,46), B(142,154), C(238,100), E(310,100)
    // Edges: S->A (4), S->B (2), B->A (1), A->C (3), B->C (6), C->E (2), A->E (7)
    const edges = [
      [42, 100, 142, 46, "4", 84, 62],
      [42, 100, 142, 154, "2", 84, 142],
      [142, 154, 142, 46, "1", 128, 104],
      [142, 46, 238, 100, "3", 192, 62],
      [142, 154, 238, 100, "6", 194, 142],
      [238, 100, 310, 100, "2", 274, 90],
      [142, 46, 310, 100, "7", 232, 56]
    ];
    let out = "";
    edges.forEach(([x1, y1, x2, y2, w, lx, ly]) => {
      out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--border-strong)" stroke-width="2.4"/>`;
      out += `<circle cx="${lx}" cy="${ly}" r="11" fill="var(--bg-elevated)" stroke="var(--border-strong)" stroke-width="1"/>`;
      out += `<text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="12" font-weight="800" fill="var(--primary)">${w}</text>`;
    });
    const nodes = [
      [42, 100, "S", "var(--success)"],
      [142, 46, "A", "var(--primary)"],
      [142, 154, "B", "var(--primary)"],
      [238, 100, "C", "var(--primary)"],
      [310, 100, "E", "var(--danger)"]
    ];
    nodes.forEach(([nx, ny, lbl, col]) => {
      out += `<circle cx="${nx}" cy="${ny}" r="17" fill="${col}"/>`;
      out += `<text x="${nx}" y="${ny + 5}" text-anchor="middle" font-size="14" font-weight="800" fill="#ffffff">${lbl}</text>`;
    });
    return svgWrap(out, 350, 196);
  }

  function svgGridPaths() {
    // 3x2 cells => 4x3 vertices; from bottom-left (0,0) to top-right (3,2)
    let out = "";
    for (let c = 0; c <= 3; c++) {
      const x = 60 + c * 64;
      out += `<line x1="${x}" y1="30" x2="${x}" y2="150" stroke="var(--border-strong)" stroke-width="2"/>`;
    }
    for (let r = 0; r <= 2; r++) {
      const y = 30 + r * 60;
      out += `<line x1="60" y1="${y}" x2="252" y2="${y}" stroke="var(--border-strong)" stroke-width="2"/>`;
    }
    out += `<circle cx="60" cy="150" r="11" fill="var(--success)"/>`;
    out += `<text x="60" y="154" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">A</text>`;
    out += `<circle cx="252" cy="30" r="11" fill="var(--danger)"/>`;
    out += `<text x="252" y="34" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">B</text>`;
    out += `<text x="156" y="176" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text-muted)">Chỉ đi Sang Phải (→) hoặc Lên Trên (↑) từ A đến B</text>`;
    return svgWrap(out, 320, 188);
  }

  // ==================== EXTRA TESTS (4 EQ + 4 IQ + 3 PERSONALITY) ====================
  const EXTRA_EQ_TESTS = [
    {
      id: "eq-negotiation-sales",
      testType: "eq",
      title: "EQ Đàm Phán, Bán Hàng & Thuyết Phục Đối Tác",
      shortTitle: "EQ Đàm Phán & Thuyết Phục",
      category: "workplace",
      categoryLabel: "Công sở",
      level: "Chuyên sâu",
      durationMinutes: 10,
      icon: "🤝",
      accentColor: "#0ea5e9",
      description:
        "Đo lường độ nhạy bén khi thương lượng giá, xử lý từ chối, đọc vị nhu cầu ngầm của khách hàng và giữ bình tĩnh trước áp lực chốt hợp đồng.",
      tags: ["12 câu hỏi", "Đàm phán & Sales", "Thuyết phục"],
      questions: [
        {
          id: "ns-01",
          dimension: "empathy",
          context: "Khách chê giá đắt",
          question:
            "Khi bạn vừa báo giá sản phẩm/dịch vụ, khách hàng nói ngay: 'Bên kia bán rẻ hơn bên em tận 20% đấy!'. Bạn đáp lại thế nào?",
          options: scaleOpts({
            4: { t: "Ghi nhận quan tâm về ngân sách của khách, hỏi nhẹ xem ngoài mức giá thì điều gì ở giải pháp bên kia làm anh/chị thấy hấp dẫn và phân tích phần giá trị chênh lệch cốt lõi.", f: "Xuất sắc! Không phòng thủ mà khơi mở tiêu chí giá trị thực sự của khách." },
            3: { t: "Liệt kê ngay danh sách các tính năng vượt trội bên mình để chứng minh tiền nào của nấy.", f: "Có lý lẽ rõ ràng, nhưng hỏi nhu cầu thật của khách trước sẽ thuyết phục hơn." },
            2: { t: "Vội vàng xin giảm giá ngay 10–15% để giữ khách kẻo mất đơn.", f: "Nhượng bộ quá nhanh khiến khách nghi ngờ giá trị thật ban đầu." },
            1: { t: "Phản bác: 'Hàng rẻ bên đó chắc chắn chất lượng kém hoặc cắt xén bảo hành thôi anh/chị ạ'.", f: "Chê bai đối thủ trực diện thường gây phản cảm và thiếu chuyên nghiệp." }
          }),
          explanation: "Câu nói 'đắt quá' thường là lớp vỏ thăm dò. Người đàm phán giỏi đặt câu hỏi để khám phá ưu tiên thật (chất lượng, hậu mãi, tiến độ) trước khi nói tới giá."
        },
        {
          id: "ns-02",
          dimension: "self_regulation",
          context: "Khoảng lặng thương lượng",
          question:
            "Sau khi bạn đưa ra đề xuất hợp tác cuối cùng, đối tác bỗng im lặng hoàn toàn suốt gần 20 giây và nhìn chăm chú vào bản hợp đồng. Bạn làm gì?",
          options: scaleOpts({
            4: { t: "Giữ nét mặt bình thản, mỉm cười nhẹ và kiên nhẫn chờ đợi trong im lặng để đối tác suy nghĩ trọn vẹn.", f: "Bản lĩnh đàm phán đỉnh cao! Không tự phá vỡ khoảng lặng quyền lực." },
            3: { t: "Hỏi nhẹ nhàng sau 10 giây: 'Anh/chị có cần em làm rõ thêm điều khoản nào không ạ?'", f: "Lịch sự và hỗ trợ, dù chờ thêm chút nữa sẽ giữ vị thế tốt hơn." },
            2: { t: "Sốt ruột nói liên tục thêm nhiều khuyến mãi phụ để lấp khoảng trống im lặng.", f: "Sự hồi hộp khiến bạn tự nhượng bộ khi đối phương còn chưa mở lời từ chối." },
            1: { t: "Căng thẳng hỏi dồn: 'Sao anh/chị im thế, có chỗ nào không hài lòng à?'", f: "Tạo áp lực không cần thiết lên không gian suy nghĩ của đối tác." }
          }),
          explanation: "Trong đàm phán, ai sợ im lặng người đó thường nhượng bộ trước. Giữ bình tĩnh trong khoảng lặng thể hiện sự tự tin vào giá trị đề xuất."
        },
        {
          id: "ns-03",
          dimension: "social_skills",
          context: "Khách đòi hỏi quá giới hạn",
          question:
            "Một khách hàng lớn muốn ký hợp đồng nhưng yêu cầu thêm nhiều hạng mục ngoài phạm vi miễn phí. Bạn từ chối mà vẫn giữ đơn hàng thế nào?",
          options: scaleOpts({
            4: { t: "Công nhận mong muốn tối ưu hiệu quả của khách, tách rõ các hạng mục miễn phí có thể tặng thêm và báo chi phí ưu đãi minh bạch cho phần mở rộng lớn.", f: "Kỹ năng 'Cho có điều kiện' (Give-Get) tuyệt vời!" },
            3: { t: "Nói rõ quy định công ty không hỗ trợ miễn phí phần đó, mong khách thông cảm.", f: "Rõ ràng nhưng hơi cứng, thiếu phương án thay thế giữ thiện chí." },
            2: { t: "Gật đầu nhận làm miễn phí hết cho xong hợp đồng rồi về phòng than thở với đội kỹ thuật.", f: "Tự phá vỡ lợi nhuận và đẩy áp lực quá tải về cho đội ngũ." },
            1: { t: "Trả lời gắt: 'Anh/chị đòi hỏi thế bên em lỗ vốn à, làm sao làm được!'", f: "Cách từ chối gay gắt dễ làm hỏng không khí hợp tác." }
          }),
          explanation: "Nguyên tắc vàng thương lượng: không bao giờ nói 'Không' trơ trọi và không bao giờ nhượng bộ miễn phí — luôn đổi một thiện chí lấy một cam kết tương xứng."
        },
        {
          id: "ns-04",
          dimension: "self_awareness",
          context: "Tự ái khi bị từ chối",
          question:
            "Bạn dành 2 tuần chuẩn bị hồ sơ chào thầu nhưng cuối buổi đối tác thông báo chọn đơn vị khác. Cảm giác hụt hẫng dâng lên. Bạn tự điều chỉnh ra sao?",
          options: scaleOpts({
            4: { t: "Nhận diện cảm giác thất vọng tự nhiên, tách biệt giữa 'giải pháp lần này chưa khớp' và 'năng lực bản thân', rồi lịch sự xin 5 phút phản hồi để rút kinh nghiệm.", f: "Tự nhận thức sắc bén và cầu tiến!" },
            3: { t: "Buồn một buổi tối rồi sáng hôm sau quay lại gọi cho khách hàng tiếp theo trong danh sách.", f: "Ổn định và kiên trì, thêm bước hỏi lý do trượt sẽ tiến bộ rất nhanh." },
            2: { t: "Tự nghi ngờ bản thân vô dụng, không muốn đi gặp khách mới trong nhiều ngày.", f: "Đồng nhất một lần trượt đơn với giá trị bản thân làm tê liệt hành động." },
            1: { t: "Khó chịu nói với đồng nghiệp rằng đối tác 'không biết nhìn hàng chất lượng'.", f: "Phóng chiếu cái tôi ra ngoài làm mất cơ hội nhìn thấy điểm cần cải thiện." }
          }),
          explanation: "Trong bán hàng và đàm phán, bị từ chối là dữ liệu thị trường, không phải sự phủ nhận nhân cách của bạn."
        },
        {
          id: "ns-05",
          dimension: "motivation",
          context: "Giữ lửa giữa tháng ế ẩm",
          question:
            "Đã giữa tháng mà doanh số/tiến độ kết nối đối tác mới chỉ đạt 20% mục tiêu, các khách tiềm năng đều trả lời chậm. Bạn giữ động lực thế nào?",
          options: scaleOpts({
            4: { t: "Rà soát lại chất lượng kịch bản tiếp cận và nguồn khách hàng, tập trung hoàn thành kỷ luật số cuộc gọi/gặp gỡ chất lượng mỗi ngày.", f: "Động lực nội tại vững chắc — tập trung vào hành động kiểm soát được!" },
            3: { t: "Tự động viên mình cố thêm chút nữa, hy vọng cuối tháng khách tự quay lại chốt.", f: "Giữ tinh thần tốt nhưng cần điều chỉnh chủ động phễu khách hàng." },
            2: { t: "Làm việc uể oải vì nghĩ tháng này chắc chắn không đạt chỉ tiêu rồi.", f: "Bỏ cuộc sớm làm mất cả cơ hội lội ngược dòng ở nửa cuối tháng." },
            1: { t: "Đổ lỗi do thị trường năm nay quá tệ và ngồi lướt mạng cho hết giờ.", f: "Tâm lý bất lực khiến phong độ sụt giảm hoàn toàn." }
          }),
          explanation: "Khi kết quả đầu ra chậm, người có động lực nội tại cao chuyển trọng tâm sang tối ưu hóa chất lượng và tần suất hành động đầu vào."
        },
        {
          id: "ns-06",
          dimension: "empathy",
          context: "Đọc vị do dự của khách",
          question:
            "Khách hàng khen sản phẩm rất hay nhưng cứ hẹn 'để anh/chị bàn lại thêm với nội bộ rồi trả lời sau' tới lần thứ hai. Bạn đọc ra điều gì?",
          options: scaleOpts({
            4: { t: "Nhận ra có một rào cản ẩn chưa được nói ra (ngân sách, người duyệt khác hoặc rủi ro chuyển đổi), nhẹ nhàng hỏi thăm để cùng khách tháo gỡ nút thắt thật sự.", f: "Đọc vị tinh tế! Chạm đúng nỗi lo ẩn sau lời khen xã giao." },
            3: { t: "Hỏi lịch hẹn cụ thể ngày giờ tuần tới sẽ gọi lại hỏi thăm tiến độ.", f: "Bám sát chuyên nghiệp, thêm câu hỏi dò rào cản thật sẽ hiệu quả hơn." },
            2: { t: "Tin là khách chắc chắn sắp mua nên ngồi chờ tin vui mà không hỏi thêm.", f: "Quá lạc quan trước dấu hiệu trì hoãn lịch sự." },
            1: { t: "Nhắn tin hối thúc liên tục mỗi ngày khiến khách thấy bị làm phiền.", f: "Ép tiến độ khi chưa gỡ vướng mắc chỉ khiến khách chặn liên lạc." }
          }),
          explanation: "Lời hẹn lửng sau lần khen ngợi thường che giấu một nỗi sợ rủi ro nào đó. Đặt câu hỏi an toàn giúp khách chia sẻ rào cản thật."
        },
        {
          id: "ns-07",
          dimension: "social_skills",
          context: "Thuyết trình trước nhiều phe",
          question:
            "Bạn thuyết trình giải pháp trước 2 người quyết định bên khách hàng: Giám đốc Tài chính (lo chi phí) và Trưởng phòng Vận hành (lo tính tiện dụng). Bạn trình bày thế nào?",
          options: scaleOpts({
            4: { t: "Dành phần đầu nói về bài toán hoàn vốn (ROI) cho Giám đốc Tài chính và phần sau đi thẳng vào tính dễ dùng, tiết kiệm giờ công cho Trưởng phòng Vận hành.", f: "Giao tiếp tùy biến theo khán giả (Audience Empathy) cực kỳ sắc sảo!" },
            3: { t: "Trình bày đầy đủ slide chuẩn từ đầu đến cuối thật tự tin để hai bên tự chọn phần cần nghe.", f: "Bài bản nhưng chưa tối ưu hóa điểm chạm riêng của từng người quyết định." },
            2: { t: "Chỉ tập trung nói chuyện với người chức cao hơn và gần như lờ đi các câu hỏi vận hành.", f: "Bỏ qua người dùng trực tiếp dễ khiến dự án bị chặn ở bước triển khai." },
            1: { t: "Nói thật nhiều thuật ngữ kỹ thuật cao siêu để cả hai bên thấy bên mình chuyên nghiệp.", f: "Thuật ngữ rườm rà tạo khoảng cách với người ra quyết định kinh doanh." }
          }),
          explanation: "Thuyết phục thành công không phải nói thứ bạn muốn khoe, mà là nói đúng mối quan tâm sống còn của từng người ngồi trong phòng."
        },
        {
          id: "ns-08",
          dimension: "self_regulation",
          context: "Khách hủy kèo phút chót",
          question:
            "Bạn chạy xe 40 phút giữa trời nắng đến điểm hẹn thì đối tác nhắn tin báo bận đột xuất xin dời sang tuần sau. Bạn phản hồi sao?",
          options: scaleOpts({
            4: { t: "Hít thở hạ nhiệt cơn bực, nhắn lịch sự thông cảm cho việc đột xuất của họ, đề xuất đổi thành buổi gọi ngắn 15 phút online hoặc chốt khung giờ chắc chắn tuần tới rồi tranh thủ xử lý việc gần khu vực đó.", f: "Điềm tĩnh, chuyên nghiệp và biến thời gian trống thành cơ hội!" },
            3: { t: "Nhắn 'Vâng không sao ạ, hẹn anh/chị tuần sau' rồi chạy thẳng về văn phòng với tâm trạng hụt hẫng.", f: "Giữ thái độ tốt, chỉ cần chốt lại lịch mới rõ ràng hơn." },
            2: { t: "Nhắn giọng trách móc: 'Em chạy cả tiếng tới nơi rồi anh/chị mới báo hủy là sao?'", f: "Trút bực dọc ngay lúc đó làm mất thiện cảm dài lâu." },
            1: { t: "Hủy luôn toàn bộ hợp tác với khách đó vì thấy bị thiếu tôn trọng.", f: "Phản ứng bốc đồng dễ đánh mất khách hàng tiềm năng chỉ vì một sự cố đột xuất." }
          }),
          explanation: "Sự bình tĩnh trước những pha 'bể kèo' bất ngờ tạo ấn tượng trưởng thành mạnh mẽ và giữ cánh cửa hợp tác luôn mở."
        },
        {
          id: "ns-09",
          dimension: "empathy",
          context: "Lắng nghe câu chuyện khách hàng",
          question:
            "Trong cuộc gặp đầu tiên với khách hàng mới, họ mất 10 phút đầu kể say sưa về khó khăn lịch sử hình thành công ty của họ. Bạn hành xử thế nào?",
          options: scaleOpts({
            4: { t: "Chăm chú lắng nghe, gật đầu và đặt 1–2 câu hỏi tinh tế ghi nhận nỗ lực của họ trước khi khéo léo dẫn nối vào giải pháp phù hợp.", f: "Xây dựng thiện cảm sâu sắc! Khách hàng mua hàng từ người hiểu câu chuyện của họ." },
            3: { t: "Lắng nghe lịch sự chờ họ nói xong rồi mở ngay laptop trình bày sản phẩm.", f: "Lịch sự ở mức cơ bản, kết nối câu chuyện vừa nghe với giải pháp sẽ tinh tế hơn." },
            2: { t: "Ngắt lời nhẹ sau 2 phút vì sợ hết thời gian trình bày slide của mình.", f: "Cướp lời người đang chia sẻ niềm tự hào cá nhân làm giảm sự gắn kết." },
            1: { t: "Vừa nghe vừa cúi xuống bấm điện thoại kiểm tra tin nhắn.", f: "Thiếu hiện diện hoàn toàn trong giao tiếp trực tiếp." }
          }),
          explanation: "Trong giao tiếp xây dựng niềm tin, để đối tác kể câu chuyện của họ là khoản đầu tư cảm xúc sinh lời cao nhất."
        },
        {
          id: "ns-10",
          dimension: "self_awareness",
          context: "Nhận diện điểm yếu thương lượng",
          question:
            "Bạn nhận thấy dạo này mình thường chốt hợp đồng xong mới phát hiện đã lỡ hứa quá nhiều điều kiện khó cho đội vận hành. Bạn tự soi lại điều gì?",
          options: scaleOpts({
            4: { t: "Nhận ra mình đang quá nôn nóng muốn làm hài lòng khách để chốt nhanh nên bỏ qua bước kiểm tra tính khả thi cùng đội kỹ thuật.", f: "Tự nhận thức chính xác gốc rễ hành vi!" },
            3: { t: "Quyết định lần sau sẽ đọc kỹ hợp đồng hơn trước khi ký.", f: "Đúng hướng, nhận rõ tâm lý 'sợ mất đơn' bên trong sẽ giúp sửa triệt để hơn." },
            2: { t: "Nghĩ tại đội vận hành làm việc chậm chạp chứ mình đàm phán vậy là bình thường.", f: "Đổ lỗi cho bộ phận khác làm rạn nứt nội bộ." },
            1: { t: "Thấy áy náy nhưng vẫn tiếp tục hứa đại để giữ doanh số cá nhân.", f: "Ưu tiên lợi ích ngắn hạn phá hỏng uy tín dài hạn của cả công ty." }
          }),
          explanation: "Tự nhận ra tâm lý 'nôn nóng chiều khách' giúp bạn tạo cơ chế kiểm tra chéo trước khi cam kết chính thức."
        },
        {
          id: "ns-11",
          dimension: "motivation",
          context: "Chăm sóc sau bán hàng",
          question:
            "Khách hàng đã ký hợp đồng và thanh toán xong xuôi. Một tháng sau bạn có chủ động liên hệ lại không?",
          options: scaleOpts({
            4: { t: "Chủ động hỏi thăm trải nghiệm thực tế và gửi thêm 1 mẹo sử dụng hiệu quả dù không có khoản hoa hồng phát sinh ngay.", f: "Tư duy giá trị dài hạn! Khách hàng hài lòng sẽ giới thiệu thêm nhiều hợp đồng mới." },
            3: { t: "Nhắn hỏi thăm khi gần tới hạn gia hạn hoặc có chương trình mới để bán thêm.", f: "Ổn nhưng hơi nặng tính giao dịch." },
            2: { t: "Chỉ trả lời khi khách chủ động gọi lên báo lỗi.", f: "Chăm sóc bị động khiến khách thấy bị bỏ rơi sau khi đã trả tiền." },
            1: { t: "Xong đơn là bàn giao hết cho bộ phận hỗ trợ, không liên quan tới mình nữa.", f: "Đánh mất tài sản quan hệ quý giá nhất sau bán hàng." }
          }),
          explanation: "Động lực phục vụ dài hạn biến giao dịch một lần thành mối quan hệ đối tác tin cậy nhiều năm."
        },
        {
          id: "ns-12",
          dimension: "social_skills",
          context: "Xử lý sai sót giao hàng",
          question:
            "Bên bạn lỡ giao trễ tiến độ cho đối tác quan trọng làm ảnh hưởng kế hoạch khai trương của họ. Bạn xử lý cuộc gọi thông báo thế nào?",
          options: scaleOpts({
            4: { t: "Chủ động gọi báo sớm ngay khi biết nguy cơ trễ, xin lỗi thẳng thắn không vòng vo và đưa sẵn phương án bù đắp/giao trước phần lõi để họ kịp khai trương.", f: "Trách nhiệm và chủ động giải quyết khủng hoảng mẫu mực!" },
            3: { t: "Gọi xin lỗi chân thành và hứa sẽ cố gắng giao nhanh nhất trong vài ngày tới.", f: "Trung thực, nhưng cần kèm phương án giảm thiểu thiệt hại cụ thể cho họ." },
            2: { t: "Đợi sát giờ giao mới nhắn tin báo kẹt xe xin dời lịch.", f: "Báo muộn tước mất thời gian xoay xở của đối tác." },
            1: { t: "Tắt máy tránh nghe điện thoại vì sợ bị đối tác mắng.", f: "Trốn tránh khủng hoảng phá hủy hoàn toàn lòng tin." }
          }),
          explanation: "Cách xử lý khi xảy ra lỗi quyết định 80% việc đối tác có ở lại với bạn lần sau hay không: báo sớm + nhận lỗi thẳng + mang sẵn giải pháp."
        }
      ]
    },
    {
      id: "eq-parenting-family",
      testType: "eq",
      title: "EQ Gia Đình, Làm Cha Mẹ & Kết Nối Thế Hệ (Gen Z)",
      shortTitle: "EQ Gia Đình & Thế Hệ",
      category: "relationship",
      categoryLabel: "Tình cảm",
      level: "Thực tế",
      durationMinutes: 10,
      icon: "🏡",
      accentColor: "#ec4899",
      description:
        "Đánh giá khả năng lắng nghe không áp đặt, thiết lập kỷ luật tích cực, thấu hiểu áp lực giữa các thế hệ và xây dựng sự an toàn cảm xúc trong mái ấm.",
      tags: ["12 câu hỏi", "Gia đình & Con cái", "Kết nối thế hệ"],
      questions: [
        {
          id: "pf-01",
          dimension: "empathy",
          context: "Con cái/Em nhỏ làm sai",
          question:
            "Con bạn (hoặc em nhỏ trong nhà) hoảng hốt làm vỡ chiếc bình hoa bạn rất quý khi đang chạy chơi. Bạn phản ứng thế nào trong 10 giây đầu?",
          options: scaleOpts({
            4: { t: "Kiểm tra ngay xem bé có bị mảnh vỡ cắt vào tay không trước, đợi bé hoàn hồn rồi mới cùng bé dọn dẹp và dặn dò cách chạy chơi an toàn.", f: "Thấu cảm tuyệt vời! An toàn và cảm xúc của trẻ luôn đứng trước món đồ vỡ." },
            3: { t: "Hít sâu nén giận, bảo bé đứng yên tránh mảnh vỡ rồi tự lẳng lặng đi quét dọn.", f: "Kiềm chế rất tốt; cho bé cùng tham gia khắc phục hậu quả nhẹ nhàng sẽ giúp trẻ học trách nhiệm." },
            2: { t: "Quát mắng ầm ĩ vì tiếc cái bình rồi bắt bé úp mặt vào tường.", f: "Cơn giận lấn át khiến trẻ sợ hãi và sau này dễ giấu lỗi." },
            1: { t: "Than vãn suốt buổi rằng 'nuôi con/em chỉ tổ phá hoại'.", f: "Lời nói gắn nhãn tiêu cực gây tổn thương lòng tự trọng của trẻ rất lâu." }
          }),
          explanation: "Trẻ nhỏ học cách xử lý sai lầm thông qua phản ứng của người lớn. Khi bạn giữ bình tĩnh và dạy cách khắc phục, trẻ học được trách nhiệm thay vì nỗi sợ."
        },
        {
          id: "pf-02",
          dimension: "self_regulation",
          context: "Bài tập buổi tối",
          question:
            "Bạn hướng dẫn em nhỏ/con làm một bài toán cơ bản 4 lần mà bé vẫn làm sai đúng chỗ đó và bắt đầu khóc mếu. Lúc này bạn xử lý cơn cáu thế nào?",
          options: scaleOpts({
            4: { t: "Nhận ra cả hai đang quá căng, chủ động dừng lại 5 phút uống nước/ôm nhẹ bé rồi đổi sang ví dụ trực quan đơn giản hơn hoặc tạm nghỉ hôm sau giảng lại.", f: "Làm chủ cảm xúc tuyệt vời! Não bộ đang sợ hãi không thể tiếp thu kiến thức." },
            3: { t: "Kiên nhẫn thở dài giảng lại thêm lần thứ 5 thật chậm bằng giọng hơi nghiêm.", f: "Kiềm chế tốt, tạm dừng 5 phút giải tỏa căng thẳng sẽ hiệu quả hơn nhiều." },
            2: { t: "Đập bàn quát: 'Đầu óc để đi đâu thế mà giảng mãi không hiểu?!'", f: "Áp lực la mắng làm hệ thần kinh trẻ đóng băng hoàn toàn." },
            1: { t: "Làm hộ luôn cho xong bài rồi đi ngủ cho đỡ bực.", f: "Né tránh bực dọc bằng cách làm thay lấy mất cơ hội tự học của trẻ." }
          }),
          explanation: "Khi đứa trẻ đã bật khóc và bạn đã muốn hét lên, hiệu suất học bằng 0. Tạm dừng để hạ nhiệt hệ thần kinh cả hai là lựa chọn khôn ngoan nhất."
        },
        {
          id: "pf-03",
          dimension: "social_skills",
          context: "Khác biệt lối sống với người trẻ",
          question:
            "Người trẻ (em/con/cháu Gen Z) chia sẻ muốn thử theo đuổi một ngành nghề sáng tạo mới mẻ mà bạn thấy hơi bấp bênh. Bạn trò chuyện thế nào?",
          options: scaleOpts({
            4: { t: "Tò mò lắng nghe cách bạn ấy hình dung về nghề đó, chia sẻ trung thực những băn khoăn thực tế của bạn và cùng bàn phương án thử nghiệm an toàn có mốc đánh giá.", f: "Đối thoại liên thế hệ mẫu mực! Tôn trọng ước mơ nhưng vẫn đồng hành thực tế." },
            3: { t: "Khuyên nhẹ nên chọn nghề truyền thống ổn định hơn rồi làm nghề kia tay trái.", f: "Lời khuyên thận trọng có thiện chí, lắng nghe sâu góc nhìn của người trẻ trước sẽ gắn kết hơn." },
            2: { t: "Gạt phắt ngay: 'Nghề vớ vẩn đó không nuôi nổi thân đâu, nghe lời người lớn đi!'", f: "Áp đặt quyền uy khiến người trẻ thu mình và ngừng chia sẻ tâm sự." },
            1: { t: "Bảo 'Thích làm gì thì làm, sau này khổ tự chịu đừng kêu tôi'.", f: "Buông lời lạnh lùng tạo khoảng cách cảm xúc sâu sắc." }
          }),
          explanation: "Thay vì đóng vai 'người phán quyết', làm 'người đồng hành phản biện xây dựng' giúp thế hệ trẻ vừa giữ đam mê vừa có tư duy quản trị rủi ro."
        },
        {
          id: "pf-04",
          dimension: "empathy",
          context: "Cha mẹ lớn tuổi lặp lời",
          question:
            "Bố mẹ ở quê gọi điện nhắc đi nhắc lại chuyện ăn uống, mặc ấm hoặc hỏi thăm những câu giống hệt tuần trước làm bạn hơi sốt ruột giữa giờ làm. Bạn đáp sao?",
          options: scaleOpts({
            4: { t: "Hiểu rằng đó là cách bố mẹ tìm cớ để được nghe giọng con cái cho đỡ nhớ, trả lời ấm áp ngắn gọn và hẹn tối gọi video nói chuyện kỹ hơn.", f: "Thấu cảm sâu sắc! Nhìn thấy tình yêu phía sau sự lặp lại." },
            3: { t: "Vâng dạ nhanh rồi nói đang họp bận cúp máy trước.", f: "Lịch sự ngắn gọn; một câu hẹn tối gọi lại sẽ khiến bố mẹ ấm lòng cả ngày." },
            2: { t: "Thở dài cáu kỉnh: 'Mẹ hỏi mãi câu đó từ tuần trước rồi, con biết tự lo mà!'", f: "Lời nói vô tình làm bố mẹ hụt hẫng và ngại gọi điện làm phiền con." },
            1: { t: "Thấy số bố mẹ gọi trong giờ là tắt máy luôn tối mới nhắn tin ngắn.", f: "Thiếu kết nối ấm áp khiến khoảng cách thế hệ xa dần." }
          }),
          explanation: "Nhiều câu hỏi vụn vặt của cha mẹ lớn tuổi thực chất chỉ mang một thông điệp duy nhất: 'Bố mẹ nhớ con và muốn biết con ổn'."
        },
        {
          id: "pf-05",
          dimension: "self_awareness",
          context: "Nhận ra vòng lặp gia đình",
          question:
            "Bạn bất ngờ nhận ra mình vừa dùng đúng giọng điệu gay gắt hoặc câu nói chê bai mà ngày xưa bố mẹ từng nói khiến bạn tổn thương. Bạn làm gì?",
          options: scaleOpts({
            4: { t: "Giật mình nhận ra 'mình đang lặp lại khuôn mẫu cũ', dừng lại ngay và chủ động xin lỗi/điều chỉnh để cắt đứt vòng lặp tổn thương thế hệ.", f: "Tỉnh thức tự nhận thức đỉnh cao! Dũng cảm phá bỏ vết xe đổ cũ." },
            3: { t: "Thầm ghi nhớ lần sau sẽ cố gắng bớt nói câu đó lại.", f: "Có ý thức tự sửa tốt, thừa nhận ngay lúc đó còn giúp hàn gắn tức thì." },
            2: { t: "Tự bào chữa: 'Ngày xưa mình bị nói thế mãi có sao đâu, giờ mới nên người'.", f: "Hợp thức hóa tổn thương cũ khiến nó tiếp tục truyền sang thế hệ sau." },
            1: { t: "Không để ý và coi đó là cách dạy dỗ hiển nhiên trong nhà.", f: "Hành xử theo quán tính vô thức." }
          }),
          explanation: "Tự nhận ra di sản cảm xúc chưa lành từ quá khứ là bước ngoặt lớn nhất để xây dựng một gia đình hạnh phúc hơn."
        },
        {
          id: "pf-06",
          dimension: "motivation",
          context: "Giữ nghi thức gắn kết nhà",
          question:
            "Cả gia đình ai cũng bận rộn việc riêng và buổi tối mạnh ai nấy ôm điện thoại một góc. Bạn chủ động tạo thay đổi thế nào?",
          options: scaleOpts({
            4: { t: "Khởi xướng một nghi thức nhỏ vui vẻ (ví dụ 30 phút ăn tối không điện thoại hoặc tối thứ Sáu xem phim/chơi cờ cùng nhau) với thái độ mời gọi thoải mái.", f: "Động lực vun đắp gia đình tuyệt vời!" },
            3: { t: "Thỉnh thoảng cuối tuần rủ cả nhà đi ăn hàng một bữa cho đổi gió.", f: "Thiện chí tốt, duy trì những khoảnh khắc nhỏ hằng ngày sẽ tạo gắn bó sâu hơn." },
            2: { t: "Chép miệng than thở: 'Nhà này giờ như cái nhà trọ, chẳng ai nói với ai câu nào!'", f: "Than phiền tạo cảm giác tội lỗi mà không mang lại giải pháp kết nối vui vẻ." },
            1: { t: "Cũng cầm điện thoại lướt tiếp cho khỏe thân.", f: "Thụ động để sự xa cách trở thành thói quen." }
          }),
          explanation: "Sự gắn kết gia đình không tự nhiên mà có giữa thời đại màn hình — nó cần người chủ động tạo ra những khoảnh khắc không áp lực."
        },
        {
          id: "pf-07",
          dimension: "social_skills",
          context: "Thống nhất cách dạy con",
          question:
            "Bạn và bạn đời/ông bà bất đồng quan điểm dạy trẻ ngay trước mặt đứa trẻ (một người cấm, một người bênh). Bạn xử lý tình huống lúc đó ra sao?",
          options: scaleOpts({
            4: { t: "Không tranh cãi trước mặt trẻ; tạm thống nhất giữ nguyên ranh giới nhẹ nhàng rồi đợi khi riêng tư mới cùng người lớn trao đổi thẳng thắn trên tinh thần tôn trọng.", f: "Nguyên tắc vàng giáo dục gia đình! Bảo vệ sự nhất quán trước mặt trẻ." },
            3: { t: "Nhường người lớn tuổi/bạn đời giải quyết lúc đó để tránh cãi nhau rồi thôi không nhắc lại.", f: "Giữ hòa khí tạm thời, nhưng bàn lại riêng sau để thống nhất vẫn rất cần thiết." },
            2: { t: "Tranh luận tay đôi ngay tại chỗ xem cách của ai đúng khoa học hơn.", f: "Trẻ sẽ bối rối và học cách lợi dụng khe hở giữa hai người lớn." },
            1: { t: "Nói mát: 'Đấy cứ chiều thế đi rồi sau này hư đừng đổ tại tôi'.", f: "Châm biếm làm rạn nứt sự đồng hành của cha mẹ." }
          }),
          explanation: "Sự bất đồng công khai trước mặt trẻ làm xói mòn cảm giác an toàn của cả nhà. Luôn giữ mặt trận thống nhất trước trẻ và thảo luận riêng sau."
        },
        {
          id: "pf-08",
          dimension: "self_regulation",
          context: "Áp lực so sánh con nhà người ta",
          question:
            "Bạn nghe hàng xóm hoặc họ hàng khoe con cái họ đạt giải cao, lương khủng trong khi người nhà mình bình thường hơn. Bạn kiểm soát tâm lý thế nào?",
          options: scaleOpts({
            4: { t: "Mỉm cười chúc mừng họ thật lòng, giữ vững sự trân trọng với tiến bộ và nhịp phát triển riêng của người thân mình mà không mang áp lực so sánh về nhà.", f: "Nội tâm vững vàng và bao dung!" },
            3: { t: "Hơi chạnh lòng một chút nhưng nhắc mình không nên nói chuyện này ra làm người nhà buồn.", f: "Kiểm soát hành vi tốt!" },
            2: { t: "Về nhà hỏi dồn: 'Sao con nhà người ta giỏi thế mà mình cứ lẹt đẹt mãi vậy?'", f: "Mang cơn sốt ruột bên ngoài về làm tổn thương lòng tự tin của người thân." },
            1: { t: "Khó chịu kiếm cớ chê bai thành tích nhà kia chỉ là học vẹt hoặc gặp may.", f: "Phản ứng phòng vệ tiêu cực." }
          }),
          explanation: "Bảo vệ người thân khỏi cơn bão so sánh bên ngoài là biểu hiện cao của bản lĩnh làm cha mẹ và người trụ cột."
        },
        {
          id: "pf-09",
          dimension: "empathy",
          context: "Lắng nghe chuyện tuổi mới lớn",
          question:
            "Con/em đang tuổi thiếu niên tâm sự một rắc rối tình cảm hoặc bạn bè khá ngây ngô dưới góc nhìn người lớn. Bạn đáp lại thế nào?",
          options: scaleOpts({
            4: { t: "Lắng nghe nghiêm túc không cười cợt hay phán xét, công nhận chuyện đó rất quan trọng với em ở tuổi này rồi nhẹ nhàng hỏi suy nghĩ hướng giải quyết của em.", f: "Tuyệt vời! Giữ được cánh cửa tin cậy để trẻ tiếp tục tâm sự chuyện lớn hơn." },
            3: { t: "An ủi 'tuổi này chuyện nhỏ ấy mà' rồi đưa ngay lời khuyên người lớn.", f: "Có ý an ủi nhưng dễ làm trẻ thấy vấn đề của mình bị coi nhẹ." },
            2: { t: "Cười ồ lên: 'Trẻ con vắt mũi chưa sạch đã yêu đương giận dỗi, lo học đi!'", f: "Chế giễu khiến trẻ đóng sập cánh cửa chia sẻ mãi mãi." },
            1: { t: "Cấm đoán tịch thu điện thoại và rà soát tin nhắn của trẻ ngay.", f: "Phản ứng kiểm soát cực đoan gây phản kháng ngầm." }
          }),
          explanation: "Nếu bạn cười nhạo những vấn đề nhỏ của trẻ lúc 13 tuổi, trẻ sẽ không bao giờ dám kể cho bạn những khủng hoảng lớn lúc 18 tuổi."
        },
        {
          id: "pf-10",
          dimension: "self_awareness",
          context: "Nhận diện kỳ vọng áp đặt",
          question:
            "Bạn rất muốn con/người thân theo đuổi một con đường an toàn mà bạn đặt sẵn, nhưng thấy họ cứ miễn cưỡng không vui. Bạn tự hỏi mình điều gì?",
          options: scaleOpts({
            4: { t: "Tự vấn thẳng: 'Mình đang muốn điều này vì hạnh phúc thực sự của họ, hay để thỏa mãn nỗi sợ an toàn và sĩ diện của chính mình?'", f: "Tự nhận thức sâu sắc và dũng cảm!" },
            3: { t: "Nghĩ rằng người đi trước có kinh nghiệm nên định hướng vậy là tốt cho họ rồi.", f: "Kinh nghiệm tốt nhưng cần đối chiếu với năng lực và hạnh phúc riêng của người trẻ." },
            2: { t: "Thấy buồn vì nghĩ mình hy sinh cả đời mà họ không biết nghe lời.", f: "Đồng nhất tình yêu với sự kiểm soát." },
            1: { t: "Kiên quyết ép theo bằng được vì 'sau này lớn lên sẽ cảm ơn mình'.", f: "Áp đặt kỳ vọng dễ dẫn tới nuối tiếc và oán trách kéo dài." }
          }),
          explanation: "Phân biệt 'điều tốt cho họ' với 'nỗi lo của chính mình' giúp tình thương gia đình không biến thành chiếc lồng."
        },
        {
          id: "pf-11",
          dimension: "motivation",
          context: "Làm mới hôn nhân/gia đình bận rộn",
          question:
            "Sau nhiều năm chung sống với lịch trình đưa đón con, cơm nước, hóa đơn lặp lại, bạn làm gì để không khí nhà không bị khô cứng?",
          options: scaleOpts({
            4: { t: "Chủ động giữ những cử chỉ trân trọng nhỏ hằng ngày (cảm ơn việc vặt, hỏi thăm cảm xúc cuối ngày, tạo buổi hẹn riêng thỉnh thoảng) để nuôi dưỡng tình cảm.", f: "Động lực vun đắp bền bỉ và ấm áp!" },
            3: { t: "Chỉ đợi tới sinh nhật hoặc kỷ niệm ngày cưới mới mua quà chúc mừng.", f: "Giữ dịp lễ tốt, bổ sung kết nối nhỏ hằng ngày sẽ bền chặt hơn." },
            2: { t: "Nghĩ đã là vợ chồng/người nhà lâu năm rồi thì không cần khách sáo cảm ơn nữa.", f: "Coi sự hy sinh của người thân là điều hiển nhiên làm tình cảm nguội dần." },
            1: { t: "Chấp nhận gia đình nào lâu năm cũng nhàm chán vậy thôi.", f: "Tư duy buông xuôi làm giảm hạnh phúc dài hạn." }
          }),
          explanation: "Những lời cảm ơn và sự quan tâm vi mô mỗi ngày là chất kết dính mạnh nhất của gia đình hạnh phúc."
        },
        {
          id: "pf-12",
          dimension: "social_skills",
          context: "Góp ý với anh chị em ruột",
          question:
            "Một người anh/chị/em ruột trong nhà có thói quen mượn đồ hoặc nhờ vả tiện tay mà ít giữ gìn, làm bạn khá phiền lòng. Bạn nói chuyện thế nào?",
          options: scaleOpts({
            4: { t: "Chọn lúc vui vẻ nói thẳng nhẹ nhàng nhưng rõ ràng về nguyên tắc đồ cá nhân để anh/chị/em hiểu và tôn trọng ranh giới mà vẫn giữ trọn tình cảm ruột thịt.", f: "Giao tiếp thẳng thắn nhưng ấm áp!" },
            3: { t: "Cất kỹ đồ đạc vào tủ khóa lại không nói gì để khỏi mất lòng.", f: "Tránh va chạm nhưng dễ gây nghi kỵ ngầm trong nhà." },
            2: { t: "Mượn cớ cãi nhau chuyện khác rồi lôi tật xấu đó ra mắng một trận.", f: "Dồn nén rồi nổ lớn dễ làm sứt mẻ tình cảm gia đình." },
            1: { t: "Đi mách bố mẹ hoặc kể xấu với họ hàng để gây sức ép.", f: "Lôi bên thứ ba vào làm câu chuyện trở nên nặng nề." }
          }),
          explanation: "Ngay cả với người thân ruột thịt, giao tiếp rõ ràng ranh giới sớm giúp tình cảm bền lâu và thoải mái hơn sự chịu đựng."
        }
      ]
    },
    {
      id: "eq-digital-social",
      testType: "eq",
      title: "EQ Thời Đại Số & Văn Hóa Ứng Xử Mạng Xã Hội",
      shortTitle: "EQ Thời Đại Số & MXH",
      category: "social",
      categoryLabel: "Giao tiếp & Thấu cảm",
      level: "Hiện đại",
      durationMinutes: 8,
      icon: "📱",
      accentColor: "#10b981",
      description:
        "Kiểm tra sự tinh tế khi giao tiếp qua tin nhắn văn bản, xử lý drama mạng xã hội, tôn trọng quyền riêng tư số và giữ tỉnh táo trước tin giả gây phẫn nộ.",
      tags: ["10 câu hỏi", "Mạng xã hội", "Giao tiếp Online"],
      questions: [
        {
          id: "ds-01",
          dimension: "self_regulation",
          context: "Tin gây phẫn nộ (Rage Bait)",
          question:
            "Bạn thấy một đoạn video ngắn cắt ghép gây bức xúc mạnh trên mạng xã hội kèm hàng nghìn bình luận chửi bới. Bạn làm gì?",
          options: scaleOpts({
            4: { t: "Dừng lại kiểm chứng nguồn gốc và bối cảnh đầy đủ trước khi tin hay bình luận, không chia sẻ khi chưa rõ thực hư.", f: "Tỉnh táo số tuyệt vời! Không để cảm xúc bị thuật toán câu view dắt mũi." },
            3: { t: "Cảm thấy hơi bực trong lòng nhưng lướt qua không bình luận gì.", f: "Kiềm chế hành động tốt, tập thói quen kiểm tra bối cảnh sẽ sắc bén hơn." },
            2: { t: "Nhấn chia sẻ ngay lên trang cá nhân kèm dòng trạng thái phẫn nộ.", f: "Tiếp tay lan truyền thông tin cắt ghép thiếu kiểm chứng." },
            1: { t: "Vào bình luận chửi rủa thậm tệ nhân vật trong video để xả bức xúc.", f: "Tham gia bạo lực mạng theo hiệu ứng đám đông." }
          }),
          explanation: "Mạng xã hội tối ưu hóa cho cảm xúc phẫn nộ. Khoảng dừng kiểm chứng giúp bạn không trở thành công cụ lan truyền tin sai lệch."
        },
        {
          id: "ds-02",
          dimension: "empathy",
          context: "Đọc hiểu tin nhắn ngắn",
          question:
            "Đồng nghiệp hoặc người yêu trả lời tin nhắn của bạn bằng đúng 2 chữ 'Ừm.' hoặc 'Ok.' kèm dấu chấm cuối câu. Bạn diễn giải thế nào?",
          options: scaleOpts({
            4: { t: "Hiểu rằng văn bản thiếu tông giọng nên chưa vội suy diễn là họ đang giận, kiểm tra bối cảnh bận rộn hoặc gọi/hỏi nhẹ nếu cần xác nhận.", f: "Tinh tế và tỉnh táo trước 'ảo giác giọng điệu' trong tin nhắn!" },
            3: { t: "Hơi chột dạ một chút nhưng tự nhủ chắc họ đang vội đánh máy.", f: "Tự điều chỉnh suy nghĩ rất hợp lý." },
            2: { t: "Nhắn hỏi gắt ngay: 'Thái độ gì mà nhắn cụt lủn thế? Giận gì à?'", f: "Suy diễn vội dễ tạo ra cuộc cãi vã không có thật." },
            1: { t: "Ghét lây rồi cố tình nhắn lại cục cằn hơn cho bõ ghét.", f: "Phóng đại hiểu lầm trên không gian số." }
          }),
          explanation: "Khi thiếu ánh mắt và âm lượng giọng nói, não bộ thường mặc định suy diễn tin nhắn ngắn mang thái độ tiêu cực."
        },
        {
          id: "ds-03",
          dimension: "social_skills",
          context: "Nhóm chat công việc/lớp",
          question:
            "Trong nhóm chat 30 người có một cuộc tranh cãi bắt đầu lạc đề và căng thẳng vào lúc tối muộn. Bạn xử lý thế nào?",
          options: scaleOpts({
            4: { t: "Tóm tắt ngắn mục tiêu chung để hạ nhiệt nhóm và đề nghị hai người liên quan nhắn riêng hoặc hẹn sáng mai trao đổi trực tiếp 10 phút.", f: "Điều phối không gian số cực kỳ khéo léo!" },
            3: { t: "Tắt thông báo nhóm đó đi ngủ cho yên chuyện.", f: "Bảo vệ giấc ngủ cá nhân ổn, nhưng nếu là người liên quan thì điều hướng khéo sẽ tốt hơn." },
            2: { t: "Nhảy vào đổ thêm dầu tranh luận xem ai đúng ai sai tới tận nửa đêm.", f: "Kéo dài xung đột gây phiền nhiễu cả tập thể." },
            1: { t: "Gửi meme cười cợt châm chọc cho tình hình thêm kịch tính.", f: "Đùa cợt lúc căng thẳng dễ làm mọi người nổi giận." }
          }),
          explanation: "Chuyển xung đột từ nhóm chat đông người sang đối thoại 1-1 trực tiếp luôn giải quyết vấn đề nhanh gấp 10 lần."
        },
        {
          id: "ds-04",
          dimension: "self_awareness",
          context: "So sánh ảo trên MXH",
          question:
            "Sau 30 phút lướt bảng tin toàn thấy ảnh du lịch sang chảnh và thành tựu lung linh của người khác, bạn thấy tâm trạng mình tụt dốc rõ rệt. Bạn làm gì?",
          options: scaleOpts({
            4: { t: "Nhận diện ngay 'thuật toán đang cho mình xem phần nổi đẹp nhất của đời người khác', cất điện thoại và quay về làm 1 hoạt động thực tế nạp lại niềm vui cho mình.", f: "Tự nhận thức số rất lành mạnh!" },
            3: { t: "Hủy theo dõi bớt vài tài khoản khoe mẽ cho đỡ chướng mắt.", f: "Lọc bảng tin là giải pháp tốt, hiểu cơ chế tâm lý bên trong giúp bền vững hơn." },
            2: { t: "Tiếp tục lướt thêm 2 tiếng nữa trong cảm giác chán nản, tự ti.", f: "Vòng lặp tiêu thụ thụ động làm kiệt quệ tinh thần." },
            1: { t: "Cố chụp một tấm ảnh sống ảo hoặc mua sắm quá tay để đăng lại cho bằng bạn bằng bè.", f: "Chạy đua hình ảnh ảo bào mòn hạnh phúc thật." }
          }),
          explanation: "Nhận ra cảm giác hụt hẫng sau khi lướt mạng là tín hiệu để quay về với đời sống thực tế."
        },
        {
          id: "ds-05",
          dimension: "empathy",
          context: "Quyền riêng tư hình ảnh",
          question:
            "Bạn chụp được một tấm ảnh nhóm rất đẹp nhưng bạn thấy một người bạn đứng cạnh trong ảnh trông hơi dìm hàng/nhắm mắt. Bạn làm gì trước khi đăng?",
          options: scaleOpts({
            4: { t: "Gửi ảnh cho bạn ấy xem trước hoặc chọn tấm khác cả nhóm đều ổn, tôn trọng cảm giác thoải mái của bạn bè.", f: "Sự tinh tế và tôn trọng quyền riêng tư tuyệt vời!" },
            3: { t: "Dùng sticker che nhẹ hoặc chỉnh chút cho đỡ lộ rồi vẫn đăng lên vì mình đẹp quá.", f: "Có để ý tới bạn nhưng hỏi trước vẫn lịch sự hơn." },
            2: { t: "Đăng thẳng lên luôn và tag tên họ vào kèm câu đùa hài hước về biểu cảm của họ.", f: "Vui cho mình nhưng dễ làm bạn kia ngượng ngùng trước bạn bè chung." },
            1: { t: "Cắt phăng mặt bạn ấy ra khỏi ảnh rồi đăng một mình mà không nói câu nào.", f: "Thái độ hơi thiếu tinh tế với người đi cùng." }
          }),
          explanation: "Tôn trọng hình ảnh cá nhân của người khác trên không gian mạng là thước đo lịch thiệp thời đại số."
        },
        {
          id: "ds-06",
          dimension: "motivation",
          context: "Tiêu thụ nội dung có chủ đích",
          question:
            "Bạn sử dụng điện thoại và mạng xã hội mỗi ngày theo thói quen nào?",
          options: scaleOpts({
            4: { t: "Chủ động chọn lọc theo dõi các nguồn kiến thức chất lượng, giới hạn khung giờ lướt giải trí để giữ sự tập trung cho mục tiêu thật.", f: "Làm chủ công cụ số phục vụ mục tiêu sống!" },
            3: { t: "Vừa lướt giải trí vừa lưu lại một vài bài viết hay để cuối tuần đọc.", f: "Khá cân bằng nếu bạn thực sự quay lại đọc và áp dụng." },
            2: { t: "Mở mắt dậy là lướt 1 tiếng, cứ 10 phút làm việc lại cầm điện thoại mở vô thức.", f: "Thói quen phân mảnh sự chú ý làm giảm sâu năng lực tập trung." },
            1: { t: "Dành 5–6 tiếng mỗi ngày lướt video ngắn liên tục mà không nhớ mình đã xem gì.", f: "Tiêu hao thời gian và năng lượng trí óc quá mức." }
          }),
          explanation: "Kiểm soát sự chú ý số giúp bảo toàn động lực nội tại cho những mục tiêu dài hạn ngoài đời thực."
        },
        {
          id: "ds-07",
          dimension: "social_skills",
          context: "Gửi email/tin nhắn nhờ hỗ trợ",
          question:
            "Bạn nhắn tin hỏi một chuyên gia hoặc đàn anh mà bạn ít quen biết để xin tư vấn nghề nghiệp. Bạn viết tin nhắn đầu tiên thế nào?",
          options: scaleOpts({
            4: { t: "Chào hỏi lịch sự, tự giới thiệu ngắn 1 dòng, nêu rõ câu hỏi cụ thể gọn gàng và thể hiện sự trân trọng thời gian của họ (không ép trả lời ngay).", f: "Giao tiếp số chuyên nghiệp — tỷ lệ được phản hồi cực cao!" },
            3: { t: "Nhắn một câu 'Anh ơi cho em hỏi chút ạ?' rồi ngồi đợi họ 'Ừ em nói đi' mới nhắn tiếp nội dung.", f: "Kiểu nhắn 'Hello rồi chờ' (No Hello) gây mất nhịp cho người bận rộn." },
            2: { t: "Gửi một bức tường chữ dài 5 trang kể toàn bộ cuộc đời mình mà không có câu hỏi rõ ràng.", f: "Quá dài và thiếu trọng tâm khiến người đọc ngợp." },
            1: { t: "Gọi video trực tiếp luôn dù chưa từng hẹn trước.", f: "Gọi đột ngột với người ít quen thiếu tôn trọng không gian riêng tư." }
          }),
          explanation: "Tin nhắn tôn trọng thời gian người nhận luôn ngắn gọn, rõ ngữ cảnh và gói trọn câu hỏi trong 1 lượt gửi."
        },
        {
          id: "ds-08",
          dimension: "self_regulation",
          context: "Tránh gửi nhầm lúc nóng",
          question:
            "Bạn đang bực mình chuyện công việc và gõ một tin nhắn dài than phiền sếp/khách hàng để gửi cho bạn thân. Bạn kiểm soát rủi ro số thế nào?",
          options: scaleOpts({
            4: { t: "Hạn chế tuyệt đối việc viết chữ nhạy cảm nói xấu người khác lên tin nhắn; gọi điện hoặc đợi gặp trực tiếp để chia sẻ mang tính giải pháp an toàn.", f: "Tỉnh táo số xuất sắc! Tin nhắn chụp màn hình rất dễ gây tai họa sự nghiệp." },
            3: { t: "Kiểm tra thật kỹ tên người nhận 3 lần trước khi bấm gửi cho bạn thân.", f: "Cẩn thận nhưng nội dung dạng văn bản vẫn tiềm ẩn rủi ro lộ thông tin." },
            2: { t: "Nhắn vội vàng kèm ảnh chụp màn hình nội bộ khi đang tức tối.", f: "Rủi ro gửi nhầm cửa sổ chat rất cao khi đang kích động." },
            1: { t: "Đăng bóng gió lên story ở chế độ bạn bè thân thiết.", f: "Không có vùng nào thực sự kín trên mạng xã hội." }
          }),
          explanation: "Nguyên tắc an toàn cảm xúc thời đại số: đừng viết bất cứ điều gì lên tin nhắn mà bạn sẽ xấu hổ nếu cả công ty đọc được."
        },
        {
          id: "ds-09",
          dimension: "self_awareness",
          context: "Hội chứng FOMO tin tức",
          question:
            "Một ngày cuối tuần bạn thử cất điện thoại 4 tiếng để đi dạo hoặc đọc sách. Cảm giác đầu tiên xuất hiện là gì?",
          options: scaleOpts({
            4: { t: "Ban đầu hơi bồn chồn quen tay tìm máy, nhưng nhận ra cảm giác đó và nhanh chóng tận hưởng sự tự do, đầu óc nhẹ nhõm hẳn.", f: "Nhận thức rõ sự lệ thuộc nhẹ của não và chủ động làm chủ lại!" },
            3: { t: "Hơi sốt ruột sợ lỡ tin nhắn công việc nên thỉnh thoảng liếc đồng hồ một chút.", f: "Khá bình thường nếu bạn đặt sẵn lịch thông báo khẩn." },
            2: { t: "Bứt rứt không chịu nổi, chỉ 20 phút là phải mở máy lên kiểm tra xem có ai nhắn gì không.", f: "Mức độ lệ thuộc kích thích dopamine tức thời khá cao." },
            1: { t: "Cảm thấy lo lắng hoảng hốt như bị cô lập khỏi thế giới.", f: "Hội chứng sợ bỏ lỡ (FOMO) đang chi phối mạnh sự bình an của bạn." }
          }),
          explanation: "Khả năng ở yên một mình không cần màn hình là chỉ dấu quan trọng của sự tự chủ tâm trí."
        },
        {
          id: "ds-10",
          dimension: "motivation",
          context: "Học tập qua cộng đồng online",
          question:
            "Khi tham gia một nhóm học tập hoặc cộng đồng chuyên môn online, bạn đóng góp thế nào?",
          options: scaleOpts({
            4: { t: "Không chỉ tải tài liệu miễn phí mà còn chia sẻ kinh nghiệm thực tế và trả lời giúp các bạn mới để cùng phát triển.", f: "Tinh thần cộng đồng tích cực và chủ động!" },
            3: { t: "Thỉnh thoảng bấm thích bài viết hay và lưu tài liệu về đọc.", f: "Tham gia lành mạnh ở mức thụ hưởng." },
            2: { t: "Chỉ vào xin tài liệu rồi thoát im lặng, không bao giờ cảm ơn người chia sẻ.", f: "Thiếu tương tác ghi nhận công sức người khác." },
            1: { t: "Vào bình luận chê bai kiến thức của người chia sẻ để thể hiện mình giỏi hơn.", f: "Thái độ tiêu cực làm nản lòng những người đóng góp." }
          }),
          explanation: "Cách bạn tương tác trong cộng đồng tri thức tạo nên uy tín cá nhân bền vững trên môi trường số."
        }
      ]
    },
    {
      id: "eq-crisis-healing",
      testType: "eq",
      title: "EQ Vượt Qua Biến Cố, Tự Trắc Ẩn & Chữa Lành Nội Tâm",
      shortTitle: "EQ Tự Trắc Ẩn & Chữa Lành",
      category: "resilience",
      categoryLabel: "Kiểm soát cảm xúc",
      level: "Sâu sắc",
      durationMinutes: 8,
      icon: "🌱",
      accentColor: "#f59e0b",
      description:
        "Khám phá cách bạn đối thoại với chính mình khi vấp ngã lớn, lòng tự trắc ẩn (Self-compassion), khả năng buông bỏ hối tiếc và tái thiết tinh thần.",
      tags: ["10 câu hỏi", "Tự trắc ẩn", "Chữa lành & Phục hồi"],
      questions: [
        {
          id: "ch-01",
          dimension: "self_awareness",
          context: "Tiếng nói chỉ trích bên trong",
          question:
            "Khi bạn mắc một sai lầm ngớ ngẩn gây thiệt hại nhỏ, giọng nói bên trong đầu bạn thường nói gì với chính bạn?",
          options: scaleOpts({
            4: { t: "'Mình vừa sơ suất thật và thấy hơi tiếc, nhưng ai cũng có lúc sai — mình sửa ngay lỗi này và đặt quy tắc tránh lặp lại'.", f: "Lòng tự trắc ẩn (Self-compassion) tuyệt vời! Nghiêm túc sửa sai mà không tự hành hạ." },
            3: { t: "'Thôi lỡ rồi, rút kinh nghiệm lần sau cẩn thận hơn vậy'.", f: "Khá bình tĩnh và hướng về phía trước." },
            2: { t: "'Sao mình ngu ngốc thế, việc cỏn con thế này cũng làm hỏng!'", f: "Tự sỉ vả bản thân chỉ làm tăng căng thẳng mà không giúp giải quyết lỗi." },
            1: { t: "'Mình chẳng bao giờ làm nên trò trống gì cả, bỏ hết đi cho rồi'.", f: "Khái quát hóa tiêu cực đánh sập toàn bộ động lực sống." }
          }),
          explanation: "Tự trắc ẩn không phải nuông chiều bản thân, mà là đối xử với chính mình bằng sự tử tế và khách quan giống như bạn an ủi một người bạn thân."
        },
        {
          id: "ch-02",
          dimension: "self_regulation",
          context: "Đối diện nỗi buồn lớn",
          question:
            "Khi vừa trải qua một mất mát hoặc chia tay đau buồn, bạn cho phép cảm xúc đó hiện diện thế nào?",
          options: scaleOpts({
            4: { t: "Chấp nhận mình đang đau buồn như một tiến trình tự nhiên, cho phép bản thân khóc/nghỉ ngơi và tìm sự nâng đỡ từ người tin cậy thay vì gồng giả vờ mạnh mẽ.", f: "Chữa lành lành mạnh! Cảm xúc được thừa nhận mới có thể đi qua." },
            3: { t: "Cố gắng lao đầu vào công việc bận rộn tối ngày để không có thời gian nghĩ tới nỗi buồn.", f: "Đánh lạc hướng giúp vượt qua giai đoạn sốc đầu, nhưng cảm xúc chưa xử lý vẫn cần được đối diện." },
            2: { t: "Cấm bản thân khóc vì nghĩ khóc là yếu đuối, khóa chặt cảm xúc lại.", f: "Đè nén cảm xúc đau buồn thường chuyển hóa thành mệt mỏi cơ thể hoặc cáu gắt." },
            1: { t: "Đắm chìm vào thói quen tự hủy hoại (thức trắng đêm, uống rượu, bỏ ăn) nhiều tuần liền.", f: "Phản ứng tự làm đau thêm làm kéo dài tổn thương." }
          }),
          explanation: "Chữa lành bắt đầu từ việc cho phép mình làm một con người bình thường biết đau trước mất mát, đồng thời vẫn giữ nhịp chăm sóc cơ bản cho bản thân."
        },
        {
          id: "ch-03",
          dimension: "motivation",
          context: "Bắt đầu lại từ con số 0",
          question:
            "Sau một dự án kinh doanh hoặc hướng đi tâm huyết kéo dài 2 năm bị thất bại hoàn toàn, bạn nhìn lại quãng thời gian đó ra sao?",
          options: scaleOpts({
            4: { t: "Nhìn thấy bài học, kỹ năng và bản lĩnh mình đã tích lũy được suốt 2 năm qua — đó là vốn liếng quý để đứng dậy đi bước tiếp theo khôn ngoan hơn.", f: "Khả năng tái khung ý nghĩa (Reframing) đỉnh cao!" },
            3: { t: "Tạm nghỉ ngơi vài tháng cho nguôi ngoai rồi kiếm một công việc an toàn làm lại từ đầu.", f: "Lựa chọn phục hồi an toàn và hợp lý." },
            2: { t: "Coi 2 năm đó là khoảng thời gian vứt đi hoàn toàn vô nghĩa và hối hận mãi.", f: "Phủ nhận toàn bộ nỗ lực quá khứ làm mất tự tin bước tiếp." },
            1: { t: "Khẳng định từ nay sẽ không bao giờ dám tin vào điều gì hay nỗ lực hết mình nữa.", f: "Đóng cửa trái tim để tránh đau nhưng cũng đóng luôn cơ hội hạnh phúc." }
          }),
          explanation: "Thất bại chỉ thực sự mất trắng khi bạn từ chối rút ra giá trị trưởng thành từ hành trình đã đi."
        },
        {
          id: "ch-04",
          dimension: "empathy",
          context: "Chia sẻ với người đang khủng hoảng",
          question:
            "Một người bạn thân vừa mất việc hoặc gặp biến cố gia đình nặng nề. Câu nói nào bạn chọn khi đến thăm họ?",
          options: scaleOpts({
            4: { t: "'Chắc lúc này cậu đang chông chênh lắm. Mình ở đây ngồi với cậu nhé, khi nào muốn tâm sự hay cần phụ việc gì cụ thể cứ bảo mình.'", f: "Thấu cảm sâu sắc và ấm áp! Không phán xét hay sáo rỗng." },
            3: { t: "'Thôi đừng buồn nữa, trong cái rủi có cái may, rồi chuyện gì cũng qua hết mà!'", f: "Lời động viên quen miệng nhưng đôi khi làm người đang đau thấy bị gạt nhẹ nỗi đau." },
            2: { t: "'Tại hồi trước mình khuyên cậu đừng làm thế mà cậu không nghe đấy!'", f: "Đổ lỗi lúc người ta đang ngã là nhát dao đau nhất." },
            1: { t: "Ngại không biết nói gì nên tránh mặt hẳn luôn một thời gian dài.", f: "Sự vắng mặt lúc khó khăn dễ tạo cảm giác bị bỏ rơi." }
          }),
          explanation: "Đôi khi sự hiện diện lặng lẽ và câu 'Tôi ở đây bên bạn' có sức chữa lành lớn hơn mọi bài diễn văn khuyên nhủ."
        },
        {
          id: "ch-05",
          dimension: "social_skills",
          context: "Nhờ giúp đỡ khi yếu lòng",
          question:
            "Khi bạn đang kiệt sức tinh thần và không tự xoay xở nổi nữa, thái độ của bạn với việc nhờ người thân/chuyên gia giúp đỡ là gì?",
          options: scaleOpts({
            4: { t: "Mạnh dạn mở lời chia sẻ trung thực tình trạng của mình với người tin cậy hoặc chuyên gia tâm lý vì biết tìm hỗ trợ là hành động dũng cảm.", f: "Chín chắn và biết cách kết nối nguồn lực hỗ trợ!" },
            3: { t: "Nhắn tin bóng gió mong người thân tự đoán ra để hỏi thăm mình.", f: "Người thân khó đọc suy nghĩ nếu bạn không nói rõ nhu cầu hỗ trợ." },
            2: { t: "Cố tỏ ra hoàn toàn ổn trước mặt mọi người vì sợ bị đánh giá là yếu đuối.", f: "Gồng mình quá sức dễ dẫn tới sụp đổ đột ngột." },
            1: { t: "Trút giận vô cớ lên người thân vì nghĩ 'chẳng ai hiểu hay quan tâm tới mình'.", f: "Mong đợi người khác tự hiểu trong im lặng chỉ gây mâu thuẫn." }
          }),
          explanation: "Chấp nhận sự yếu lòng đúng lúc và chủ động tìm điểm tựa là dấu hiệu của sức mạnh tâm lý trưởng thành."
        },
        {
          id: "ch-06",
          dimension: "self_awareness",
          context: "Nhận diện nhu cầu nghỉ ngơi",
          question:
            "Ngày Chủ nhật bạn không làm gì nhiều ngoài việc nghỉ ngơi và đọc sách, bỗng có cảm giác áy náy rằng mình đang 'lười biếng lãng phí thời gian'. Bạn xử lý suy nghĩ này thế nào?",
          options: scaleOpts({
            4: { t: "Nhận ra đó là áp lực 'độc hại phải luôn năng suất', tự nhắc mình rằng nghỉ ngơi có chủ đích chính là cách bảo dưỡng cỗ máy hiệu suất.", f: "Tự nhận thức cân bằng tuyệt vời!" },
            3: { t: "Thấy hơi áy náy nên cố mở máy làm thêm 1 tiếng buổi tối cho đỡ cắn rứt.", f: "Để cảm giác tội lỗi cắt ngang thời gian phục hồi." },
            2: { t: "Tắt sách đi ép mình dọn dẹp và làm bù việc suốt cuối tuần dù người rất mệt.", f: "Không cho phép bản thân được nghỉ trọn vẹn." },
            1: { t: "Vừa nằm nghỉ vừa tự trách mình kém cỏi suốt cả ngày.", f: "Nghỉ ngơi kèm tự trách khiến năng lượng chẳng hề hồi phục." }
          }),
          explanation: "Nghỉ ngơi không phải phần thưởng sau khi kiệt sức; đó là phần bắt buộc của quá trình làm việc bền vững."
        },
        {
          id: "ch-07",
          dimension: "self_regulation",
          context: "Chấp nhận điều không thể đổi",
          question:
            "Một sự việc không mong muốn đã xảy ra trong quá khứ và không có cách nào quay ngược thời gian sửa lại. Bạn xử lý tâm trí mình thế nào?",
          options: scaleOpts({
            4: { t: "Thực hành 'Chấp nhận triệt để' phần sự thật đã qua, rút gọn bài học cần nhớ và dồn toàn bộ năng lượng vào hành động tốt nhất cho hiện tại.", f: "Trí tuệ buông bỏ vững vàng!" },
            3: { t: "Cố gắng không nhắc tới chuyện cũ nữa nhưng mỗi lần có ai gợi lại vẫn thấy nhói.", f: "Đang trong quá trình nguôi ngoai dần." },
            2: { t: "Suốt ngày lặp lại câu 'Giá như hồi đó mình chọn khác đi thì giờ đã...' trong tiếc nuối.", f: "Sống trong quá khứ giả định rút cạn sức sống hiện tại." },
            1: { t: "Tự trừng phạt mình bằng cách từ chối mọi niềm vui mới vì thấy mình không xứng đáng.", f: "Mắc kẹt trong mặc cảm quá khứ." }
          }),
          explanation: "Đau khổ = Nỗi đau thực tế × Sự chống cự sự thật. Chấp nhận sự việc đã qua giúp giảm đi một nửa gánh nặng tinh thần."
        },
        {
          id: "ch-08",
          dimension: "empathy",
          context: "Tha thứ cho chính mình",
          question:
            "Bạn từng vô tình làm tổn thương một người trong quá khứ (nay đã xin lỗi hoặc không còn cơ hội gặp lại). Bạn đối diện với ký ức đó thế nào?",
          options: scaleOpts({
            4: { t: "Thừa nhận phiên bản trẻ dại ngày xưa đã làm tốt nhất theo nhận thức lúc đó, biến sự ân hận thành lời hứa sống tử tế hơn với những người hiện tại.", f: "Bao dung với quá khứ và chuyển hóa thành lòng tử tế hôm nay!" },
            3: { t: "Hơi áy náy mỗi khi nhớ tới nhưng vẫn sống bình thường.", f: "Tâm lý tự nhiên khá ổn định." },
            2: { t: "Chối bỏ hoàn toàn rằng ngày xưa mình chẳng làm gì sai cả.", f: "Phủ nhận quá khứ cản trở sự trưởng thành cảm xúc." },
            1: { t: "Ôm mặc cảm tội lỗi dai dẳng suốt nhiều năm không dám tiến tới tương lai.", f: "Tự giam mình trong lỗi lầm đã qua." }
          }),
          explanation: "Tha thứ cho chính mình giúp bạn giải phóng năng lượng để trao đi phiên bản tốt đẹp hơn ở hiện tại."
        },
        {
          id: "ch-09",
          dimension: "motivation",
          context: "Tìm lại ý nghĩa nhỏ",
          question:
            "Trong giai đoạn cuộc sống xám xịt và không có tin vui nào lớn, điều gì giúp bạn giữ được nhịp sống tích cực mỗi ngày?",
          options: scaleOpts({
            4: { t: "Trân trọng các 'neo bình yên' nhỏ hằng ngày (ly cà phê sáng, 15 phút phơi nắng, cuộc trò chuyện ấm áp, 1 trang sách hay) và từng bước nhỏ đều đặn.", f: "Sức bền nội tại sâu sắc và thực tế!" },
            3: { t: "Chờ đợi một sự kiện lớn hoặc kỳ nghỉ dài sắp tới để lấy lại tinh thần.", f: "Dễ mệt mỏi nếu kỳ nghỉ còn xa." },
            2: { t: "Sống qua ngày đoạn tháng như robot không cảm xúc.", f: "Trạng thái chai lì cảm xúc cần được đánh thức nhẹ nhàng." },
            1: { t: "Buông xuôi mọi thói quen sinh hoạt lành mạnh vì thấy chẳng có ý nghĩa gì.", f: "Thiếu điểm tựa thói quen làm tinh thần tụt nhanh hơn." }
          }),
          explanation: "Những niềm vui vi mô hằng ngày là chiếc phao nâng tinh thần qua những giai đoạn trống trải."
        },
        {
          id: "ch-10",
          dimension: "social_skills",
          context: "Bảo vệ năng lượng khi phục hồi",
          question:
            "Khi bạn đang mệt mỏi cần tĩnh dưỡng, một người bạn lại rủ đi tụ tập chỗ ồn ào hoặc muốn trút hàng giờ chuyện tiêu cực lên bạn. Bạn giao tiếp thế nào?",
          options: scaleOpts({
            4: { t: "Chân thành chia sẻ 'Hôm nay pin năng lượng mình hơi cạn nên xin phép nghỉ ngơi hẹn hôm khác tụi mình gặp nhé' — tử tế nhưng vững vàng.", f: "Ranh giới chăm sóc bản thân tuyệt vời!" },
            3: { t: "Nói dối là đang bị ốm sốt để khỏi phải giải thích nhiều.", f: "Giữ được không gian nghỉ nhưng nói chân thành nhẹ nhàng sẽ tự nhiên hơn." },
            2: { t: "Miễn cưỡng đi theo ngồi chịu trận cho bạn vui rồi về kiệt sức nặng hơn.", f: "Chiều lòng người khác trên sức chịu đựng của mình." },
            1: { t: "Cáu gắt bảo bạn kia phiền phức suốt ngày chỉ biết rủ rê than vãn.", f: "Bảo vệ ranh giới bằng sự gay gắt làm tổn thương tình bạn." }
          }),
          explanation: "Biết nói 'Không' dịu dàng khi pin cảm xúc yếu là kỹ năng sống còn để bảo vệ quá trình chữa lành."
        }
      ]
    }
  ];

  // Store temporarily on window hook before appending IQ + Personality in part 2
  DATA.EXTRA_TEMP_TESTS = EXTRA_EQ_TESTS;
  DATA.EXTRA_HELPERS = { scaleOpts, iqOpts, svgSymbolEquations, svgPigpenCipher, svgBalanceScale, svgSpinnerWheel, svgShortestGraph, svgGridPaths };
})();

(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  const H = DATA.EXTRA_HELPERS;
  const { scaleOpts, iqOpts, svgSymbolEquations, svgPigpenCipher, svgBalanceScale, svgSpinnerWheel, svgShortestGraph, svgGridPaths } = H;

  const EXTRA_IQ_TESTS = [
    {
      id: "iq-crypto-code",
      testType: "iq",
      title: "IQ Mật Mã Học, Quy Luật Ký Tự & Giải Mã Hệ Thống",
      shortTitle: "IQ Mật Mã & Giải Mã",
      category: "iq-logic",
      categoryLabel: "IQ Số & Logic",
      level: "Chuyên sâu",
      durationMinutes: 10,
      icon: "🔐",
      accentColor: "#6366f1",
      description:
        "Thử thách tư duy giải mã với mật mã Caesar, Atbash, mã lưới Pigpen SVG, phá khóa 3 chữ số (Bulls & Cows), nhị phân và hệ phương trình ký hiệu.",
      tags: ["10 câu hỏi", "Mật mã & Ký tự", "Có hình SVG"],
      questions: [
        {
          id: "ic-01",
          dimension: "verbal_analytic",
          context: "Mật mã dịch chuyển Caesar",
          difficultyWeight: 1,
          question: "Theo một quy tắc dịch chữ cái, từ CAT được mã hóa thành ECV. Hỏi từ DOG được mã hóa thành gì?",
          options: iqOpts(1, [
            { t: "EPH" },
            { t: "FQI", f: "Chính xác! Mỗi chữ cái tiến thêm 2 bậc (D+2=F, O+2=Q, G+2=I)." },
            { t: "FPH" },
            { t: "GQI" }
          ]),
          explanation:
            "C→E (+2), A→C (+2), T→V (+2). Áp dụng cộng 2 bậc trong bảng chữ cái tiếng Anh cho DOG: D(4)→F(6), O(15)→Q(17), G(7)→I(9) → FQI."
        },
        {
          id: "ic-02",
          dimension: "verbal_analytic",
          context: "Mật mã đối xứng Atbash",
          difficultyWeight: 2,
          question:
            "Trong bảng mã đảo ngược đầu-cuối (A↔Z, B↔Y, C↔X, D↔W...), từ BAD được mã thành YZW. Hỏi từ CAB được mã thành gì?",
          options: iqOpts(2, [
            { t: "YXZ" },
            { t: "ZXY" },
            { t: "XZY", f: "Chính xác! C↔X, A↔Z, B↔Y ghép lại thành XZY." },
            { t: "WZY" }
          ]),
          explanation:
            "C đứng thứ 3 từ đầu ứng với X đứng thứ 3 từ cuối; A↔Z; B↔Y. Vậy CAB → XZY."
        },
        {
          id: "ic-03",
          dimension: "numerical_pattern",
          context: "Giải mã biểu tượng",
          difficultyWeight: 2,
          question: "Dựa vào 3 phương trình biểu tượng dưới đây, hãy tính giá trị của biểu thức cuối cùng:",
          svgDiagram: svgSymbolEquations(),
          options: iqOpts(0, [
            { t: "44", f: "Tuyệt vời! ★ = 7, ▲ = 12, ● = 8 nên (7 × 8) − 12 = 56 − 12 = 44." },
            { t: "48" },
            { t: "38" },
            { t: "52" }
          ]),
          explanation:
            "Từ dòng 1: ★ = 14 / 2 = 7. Từ dòng 2: ▲ = 19 − 7 = 12. Từ dòng 3: ● = 12 − 4 = 8. Thay vào biểu thức: (7 × 8) − 12 = 56 − 12 = 44."
        },
        {
          id: "ic-04",
          dimension: "numerical_pattern",
          context: "Phá khóa két sắt 3 số",
          difficultyWeight: 3,
          question:
            "Mật mã két sắt gồm 3 chữ số dựa trên 5 gợi ý: (682): 1 số đúng và đúng vị trí; (614): 1 số đúng nhưng sai vị trí; (206): 2 số đúng nhưng sai vị trí; (738): không có số nào đúng; (380): 1 số đúng nhưng sai vị trí. Mã đúng là:",
          options: iqOpts(3, [
            { t: "062" },
            { t: "012" },
            { t: "402" },
            { t: "042", f: "Đỉnh cao! Loại 7, 3, 8 trước rồi lần lượt khóa vị trí 0, 2 và 4 cho ra mã duy nhất 042." }
          ]),
          explanation:
            "Từ (738): loại 7, 3, 8. Từ (380): suy ra 0 đúng nhưng sai vị trí cuối; kết hợp (206) số 0 cũng sai ở giữa → 0 phải đứng ĐẦU (0 _ _). Từ (682): loại 8, vì vị trí đầu đã là 0 nên 6 bị loại và 2 đúng ở vị trí CUỐI (0 _ 2). Từ (614): loại 6, vì vị trí giữa không thể là 1 (đúng vị trí sẽ mâu thuẫn gợi ý) nên 4 là số giữa → 042."
        },
        {
          id: "ic-05",
          dimension: "logical_reasoning",
          context: "Phép toán ẩn ⊕",
          difficultyWeight: 2,
          question: "Biết phép toán ký hiệu ⊕ tuân theo quy luật: 3 ⊕ 4 = 15 và 5 ⊕ 2 = 15. Vậy 4 ⊕ 6 = ?",
          options: iqOpts(1, [
            { t: "24" },
            { t: "28", f: "Chính xác! Quy luật: a ⊕ b = a × b + a → 4 × 6 + 4 = 28." },
            { t: "30" },
            { t: "26" }
          ]),
          explanation:
            "Thử quy luật a × b + a: 3 × 4 + 3 = 15 ✓; 5 × 2 + 5 = 15 ✓. Áp dụng cho 4 ⊕ 6: 4 × 6 + 4 = 28."
        },
        {
          id: "ic-06",
          dimension: "logical_reasoning",
          context: "Hệ nhị phân 4-bit",
          difficultyWeight: 3,
          question:
            "Một hệ thống đèn 4 bóng mã hóa số theo chuẩn nhị phân: 0001 = 1, 0010 = 2, 0101 = 5, 1001 = 9. Hỏi chuỗi đèn 1101 biểu diễn số nào?",
          options: iqOpts(2, [
            { t: "11" },
            { t: "12" },
            { t: "13", f: "Chính xác! Các trọng số từ trái sang phải là 8, 4, 2, 1 → 8 + 4 + 0 + 1 = 13." },
            { t: "14" }
          ]),
          explanation:
            "Mỗi vị trí từ trái qua phải có giá trị 8, 4, 2, 1. Với 1101: 1×8 + 1×4 + 0×2 + 1×1 = 13."
        },
        {
          id: "ic-07",
          dimension: "spatial_visual",
          context: "Mật mã lưới Pigpen",
          difficultyWeight: 2,
          question: "Dựa vào bảng khóa 3×3 bên trái (vị trí đường viền quanh mỗi chữ cái), 3 ký hiệu màu xanh bên phải ghép thành từ gì?",
          svgDiagram: svgPigpenCipher(),
          options: iqOpts(0, [
            { t: "ICE", f: "Xuất sắc! Ký hiệu 1 là góc của chữ I, ký hiệu 2 là góc chữ C, ký hiệu 3 là ô kín chữ E." },
            { t: "ACE" },
            { t: "AGE" },
            { t: "DIE" }
          ]),
          explanation:
            "Nhìn bảng 3×3: chữ I ở góc dưới-phải có viền trên và trái (┌); chữ C ở góc trên-phải có viền trái và dưới (└); chữ E ở giữa có đủ 4 cạnh (□). Ghép 3 ký hiệu cho từ ICE."
        },
        {
          id: "ic-08",
          dimension: "spatial_visual",
          context: "Quy đổi cân bằng",
          difficultyWeight: 3,
          question: "Quan sát hai phép cân thăng bằng bên dưới. Cần bao nhiêu Hình Tròn để cân bằng với 2 Hình Tam Giác?",
          svgDiagram: svgBalanceScale(),
          options: iqOpts(3, [
            { t: "4 Hình Tròn" },
            { t: "5 Hình Tròn" },
            { t: "8 Hình Tròn" },
            { t: "6 Hình Tròn", f: "Chính xác! 1 Tam Giác = 1 Vuông + 1 Tròn = 3 Tròn → 2 Tam Giác = 6 Tròn." }
          ]),
          explanation:
            "1 Vuông = 2 Tròn. Thay vào cân 2: 1 Tam Giác = 2 Tròn + 1 Tròn = 3 Tròn. Vậy 2 Tam Giác = 2 × 3 = 6 Hình Tròn."
        },
        {
          id: "ic-09",
          dimension: "working_memory",
          context: "Kiểm tra điều kiện mã",
          difficultyWeight: 2,
          question: "Quy chuẩn mã hợp lệ gồm 4 chữ số sao cho TỔNG hai chữ số đầu tiên bằng TÍCH hai chữ số cuối cùng. Mã nào dưới đây HỢP LỆ?",
          options: iqOpts(1, [
            { t: "6243" },
            { t: "5433", f: "Chính xác! 5 + 4 = 9 và 3 × 3 = 9." },
            { t: "4524" },
            { t: "7125" }
          ]),
          explanation:
            "Kiểm tra nhanh từng mã: 6243 (6+2=8 ≠ 4×3=12); 5433 (5+4=9 = 3×3=9 ✓); 4524 (4+5=9 ≠ 2×4=8); 7125 (7+1=8 ≠ 2×5=10)."
        },
        {
          id: "ic-10",
          dimension: "working_memory",
          context: "Suy luận mật khẩu 4 số",
          difficultyWeight: 3,
          question:
            "Một mật khẩu gồm 4 chữ số KHÁC NHAU có tổng cả 4 chữ số bằng 20. Biết: chữ số thứ nhất gấp 3 lần chữ số thứ tư; chữ số thứ hai bằng (số thứ nhất − số thứ tư); chữ số thứ ba bằng (số thứ nhất + số thứ tư). Mật khẩu đó là:",
          options: iqOpts(2, [
            { t: "3241" },
            { t: "9632" },
            { t: "6482", f: "Chính xác! 6 = 3×2; 4 = 6−2; 8 = 6+2; và 6 + 4 + 8 + 2 = 20." },
            { t: "6284" }
          ]),
          explanation:
            "Gọi chữ số thứ tư là d: số thứ nhất = 3d, số thứ hai = 2d, số thứ ba = 4d. Tổng = 3d + 2d + 4d + d = 10d = 20 → d = 2. Suy ra 4 chữ số lần lượt là 6, 4, 8, 2 → 6482."
        }
      ]
    },
    {
      id: "iq-probability-data",
      testType: "iq",
      title: "IQ Xác Suất, Thống Kê & Tư Duy Dữ Liệu Thực Chiến",
      shortTitle: "IQ Xác Suất & Dữ Liệu",
      category: "iq-logic",
      categoryLabel: "IQ Số & Logic",
      level: "Nâng cao",
      durationMinutes: 10,
      icon: "📊",
      accentColor: "#0ea5e9",
      description:
        "Đo lường khả năng tính xác suất có điều kiện, kỳ vọng toán học trên vòng quay SVG, trung bình cộng và phát hiện bẫy suy luận thống kê (Base Rate & Correlation).",
      tags: ["10 câu hỏi", "Xác suất & Kỳ vọng", "Tư duy dữ liệu"],
      questions: [
        {
          id: "ip-01",
          dimension: "numerical_pattern",
          context: "Xác suất cơ bản",
          difficultyWeight: 1,
          question: "Tung một đồng xu cân đối 2 lần liên tiếp. Xác suất để CẢ 2 LẦN đều ra mặt Ngửa là bao nhiêu?",
          options: iqOpts(0, [
            { t: "25% (1/4)", f: "Chính xác! Có 4 kết quả đều khả năng {NN, NS, SN, SS}, chỉ có 1 trường hợp NN." },
            { t: "50% (1/2)" },
            { t: "33,3% (1/3)" },
            { t: "75% (3/4)" }
          ]),
          explanation:
            "Hai lần tung độc lập: (1/2) × (1/2) = 1/4 = 25%."
        },
        {
          id: "ip-02",
          dimension: "numerical_pattern",
          context: "Xác suất không hoàn lại",
          difficultyWeight: 2,
          question:
            "Trong túi có 3 viên bi Đỏ và 5 viên bi Xanh. Bạn rút ngẫu nhiên 1 viên không bỏ lại vào túi và thấy đó là bi Đỏ. Xác suất rút tiếp viên thứ 2 ra bi Xanh là bao nhiêu?",
          options: iqOpts(2, [
            { t: "5/8" },
            { t: "3/7" },
            { t: "5/7", f: "Chính xác! Sau khi lấy ra 1 bi Đỏ, trong túi còn lại 2 Đỏ + 5 Xanh = 7 bi." },
            { t: "1/2" }
          ]),
          explanation:
            "Vì không hoàn lại, sau lần rút thứ nhất chỉ còn 7 viên bi trong túi, trong đó có đủ 5 bi Xanh → xác suất = 5/7."
        },
        {
          id: "ip-03",
          dimension: "working_memory",
          context: "Tổ hợp xác suất độc lập",
          difficultyWeight: 2,
          question:
            "Một bài thi có 2 câu trắc nghiệm (mỗi câu có 4 đáp án A, B, C, D và chỉ 1 đáp án đúng). Nếu chọn bừa hoàn toàn cả 2 câu, xác suất ĐÚNG CẢ 2 CÂU là bao nhiêu?",
          options: iqOpts(1, [
            { t: "1/8" },
            { t: "1/16", f: "Chính xác! (1/4) × (1/4) = 1/16." },
            { t: "1/4" },
            { t: "1/12" }
          ]),
          explanation:
            "Xác suất đoán đúng mỗi câu là 1/4. Do 2 câu độc lập nhau, xác suất đúng đồng thời cả 2 câu là 1/4 × 1/4 = 1/16 (6,25%)."
        },
        {
          id: "ip-04",
          dimension: "working_memory",
          context: "Trung bình cộng biến động",
          difficultyWeight: 3,
          question:
            "Một nhóm gồm 5 người có tuổi trung bình là 24 tuổi. Khi thêm một người thứ 6 vào nhóm, tuổi trung bình của cả 6 người tăng lên thành 25 tuổi. Hỏi người thứ 6 bao nhiêu tuổi?",
          options: iqOpts(3, [
            { t: "26 tuổi" },
            { t: "28 tuổi" },
            { t: "29 tuổi" },
            { t: "30 tuổi", f: "Chuẩn xác! Tổng 6 người là 150 tuổi trừ tổng 5 người là 120 tuổi = 30 tuổi." }
          ]),
          explanation:
            "Tổng số tuổi 5 người ban đầu: 5 × 24 = 120. Tổng số tuổi 6 người lúc sau: 6 × 25 = 150. Tuổi người mới: 150 − 120 = 30 tuổi."
        },
        {
          id: "ip-05",
          dimension: "logical_reasoning",
          context: "Bẫy tỷ lệ gốc (Base Rate)",
          difficultyWeight: 2,
          question:
            "Bệnh hiếm X ảnh hưởng tới 1% dân số. Một bộ test có độ chính xác 99% (nếu mắc bệnh cho dương tính 99%, nếu khỏe mạnh vẫn có 1% báo nhầm dương tính). Nếu một người bình thường đi test ngẫu nhiên ra kết quả DƯƠNG TÍNH, khả năng họ thực sự mắc bệnh khoảng bao nhiêu?",
          options: iqOpts(1, [
            { t: "Khoảng 99%" },
            { t: "Khoảng 50%", f: "Tuyệt vời! Bạn đã tránh được bẫy tỷ lệ gốc (Base Rate Fallacy) nổi tiếng." },
            { t: "Khoảng 90%" },
            { t: "Khoảng 1%" }
          ]),
          explanation:
            "Xét 10.000 người: có 100 người bệnh thật (cho ~99 ca dương tính thật) và 9.900 người khỏe mạnh (1% báo nhầm = ~99 ca dương tính giả). Vậy trong số ~198 ca dương tính, chỉ có 99 người thực sự mắc bệnh → 99/198 = 50%!"
        },
        {
          id: "ip-06",
          dimension: "logical_reasoning",
          context: "Tổ hợp bắt tay",
          difficultyWeight: 3,
          question: "Trong phòng họp có 10 người, mỗi người đều bắt tay với tất cả những người còn lại đúng 1 lần. Có tất cả bao nhiêu cái bắt tay?",
          options: iqOpts(2, [
            { t: "90 cái" },
            { t: "100 cái" },
            { t: "45 cái", f: "Chính xác! C(10, 2) = 10 × 9 / 2 = 45 cái bắt tay." },
            { t: "55 cái" }
          ]),
          explanation:
            "Mỗi người trong 10 người bắt tay với 9 người kia = 90 lượt, nhưng mỗi cái bắt tay có 2 người tham gia nên phải chia 2: 10 × 9 / 2 = 45."
        },
        {
          id: "ip-07",
          dimension: "spatial_visual",
          context: "Phân phối tung 2 xúc xắc",
          difficultyWeight: 2,
          question: "Khi tung đồng thời 2 viên xúc xắc 6 mặt cân đối, tổng số chấm nào có XÁC SUẤT XUẤT HIỆN CAO NHẤT?",
          options: iqOpts(0, [
            { t: "Tổng bằng 7", f: "Chính xác! Có tới 6 cặp tạo ra 7 (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) chiếm 6/36 = 1/6." },
            { t: "Tổng bằng 6" },
            { t: "Tổng bằng 8" },
            { t: "Tất cả các tổng từ 2 đến 12 có xác suất bằng nhau" }
          ]),
          explanation:
            "Tổng bằng 2 hoặc 12 chỉ có 1/36 cơ hội, trong khi tổng bằng 7 nằm ở đỉnh phân phối đối xứng với 6 tổ hợp (6/36 = 16,7%), cao hơn 6 và 8 (chỉ có 5/36)."
        },
        {
          id: "ip-08",
          dimension: "spatial_visual",
          context: "Kỳ vọng vòng quay may mắn",
          difficultyWeight: 3,
          question: "Quan sát vòng quay chia 8 ô bằng nhau dưới đây. Giá trị kỳ vọng (trung bình toán học mỗi lượt quay) là bao nhiêu?",
          svgDiagram: svgSpinnerWheel(),
          options: iqOpts(2, [
            { t: "15.000đ" },
            { t: "30.000đ" },
            { t: "20.000đ", f: "Xuất sắc! Tổng giá trị 8 ô là (3×20k + 1×100k + 4×0) = 160k → 160k / 8 = 20.000đ." },
            { t: "40.000đ" }
          ]),
          explanation:
            "Kỳ vọng E = (3/8)×20.000 + (1/8)×100.000 + (4/8)×0 = (60.000 + 100.000) / 8 = 160.000 / 8 = 20.000đ."
        },
        {
          id: "ip-09",
          dimension: "verbal_analytic",
          context: "Lỗi suy luận dữ liệu",
          difficultyWeight: 2,
          question:
            "Một bài viết khẳng định: '100% các cụ thọ trên 95 tuổi đều từng uống nước lọc hằng ngày, vậy uống nước lọc là yếu tố quyết định giúp sống thọ trên 95 tuổi'. Sai lầm logic của kết luận này là gì?",
          options: iqOpts(3, [
            { t: "Vì nước lọc có chứa khoáng chất khác nhau." },
            { t: "Vì cỡ mẫu người trên 95 tuổi còn ít." },
            { t: "Vì tuổi thọ chỉ phụ thuộc vào di truyền." },
            { t: "Thiếu nhóm đối chứng: hầu hết mọi người không thọ tới 95 tuổi cũng đều uống nước lọc hằng ngày.", f: "Chính xác! Đặc điểm chung của cả hai nhóm không thể dùng làm nguyên nhân phân biệt." }
          ]),
          explanation:
            "Để chứng minh một yếu tố tạo nên sự khác biệt kết quả, cần so sánh tỷ lệ ở nhóm sống thọ và nhóm đối chứng không đạt mốc đó."
        },
        {
          id: "ip-10",
          dimension: "verbal_analytic",
          context: "Tương quan vs Nhân quả",
          difficultyWeight: 3,
          question:
            "Thống kê tại nhiều thành phố cho thấy những tháng doanh số bán kem (ice cream) tăng vọt cũng là những tháng số ca đuối nước tăng cao nhất. Giải thích khoa học chính xác nhất là:",
          options: iqOpts(1, [
            { t: "Ăn nhiều kem khiến người bơi dễ bị chuột rút." },
            { t: "Cả hai đều tăng do cùng một biến thứ ba tác động: thời tiết mùa hè nóng bức.", f: "Chính xác! Tương quan thống kê không đồng nghĩa quan hệ nhân quả trực tiếp." },
            { t: "Các cửa hàng kem thường mở cạnh hồ bơi." },
            { t: "Số liệu thống kê chắc chắn bị thu thập sai." }
          ]),
          explanation:
            "Mùa hè nắng nóng (biến nhiễu / confounding variable) vừa khiến người dân mua kem nhiều hơn vừa khiến nhiều người đi bơi hơn."
        }
      ]
    },
    {
      id: "iq-algorithmic-puzzle",
      testType: "iq",
      title: "IQ Tư Duy Thuật Toán, Tối Ưu Hóa & Lý Thuyết Trò Chơi",
      shortTitle: "IQ Thuật Toán & Tối Ưu",
      category: "iq-spatial",
      categoryLabel: "IQ Không gian",
      level: "Chuyên sâu",
      durationMinutes: 10,
      icon: "🕸️",
      accentColor: "#10b981",
      description:
        "Đánh giá tư duy hệ thống và tối ưu hóa: tìm đường đi ngắn nhất trên đồ thị SVG, đếm đường lưới Pascal, bài toán qua cầu, chiến thuật thắng tuyệt đối và tìm kiếm nhị phân.",
      tags: ["10 câu hỏi", "Đồ thị & Tối ưu", "Có hình SVG"],
      questions: [
        {
          id: "ia-01",
          dimension: "spatial_visual",
          context: "Đường đi ngắn nhất (Dijkstra)",
          difficultyWeight: 2,
          question: "Sơ đồ dưới đây ghi số phút đi chuyển giữa các trạm. Thời gian NGẮN NHẤT để đi từ S đến E là bao nhiêu phút?",
          svgDiagram: svgShortestGraph(),
          options: iqOpts(2, [
            { t: "9 phút (S → A → C → E)" },
            { t: "10 phút (S → B → C → E)" },
            { t: "8 phút (S → B → A → C → E)", f: "Tuyệt vời! Đi vòng qua B→A tốn 2+1=3 phút, nhanh hơn đi thẳng S→A (4 phút)!" },
            { t: "11 phút (S → A → E)" }
          ]),
          explanation:
            "S → B mất 2 phút, B → A mất 1 phút (tổng tới A chỉ mất 3 phút thay vì 4 phút đi thẳng). Tiếp tục A → C (3 phút) và C → E (2 phút) → tổng = 2 + 1 + 3 + 2 = 8 phút."
        },
        {
          id: "ia-02",
          dimension: "spatial_visual",
          context: "Đếm đường trên lưới",
          difficultyWeight: 3,
          question:
            "Trên lưới đường phố bên dưới, bạn đi từ điểm A đến điểm B với quy tắc chỉ được rẽ Sang Phải (→) hoặc đi Lên Trên (↑). Có tất cả bao nhiêu đường đi ngắn nhất khác nhau?",
          svgDiagram: svgGridPaths(),
          options: iqOpts(1, [
            { t: "6 đường đi" },
            { t: "10 đường đi", f: "Xuất sắc! Cần tổng cộng 5 bước gồm 3 bước sang phải và 2 bước lên trên: C(5, 2) = 10." },
            { t: "12 đường đi" },
            { t: "8 đường đi" }
          ]),
          explanation:
            "Từ A tới B luôn cần đúng 3 đoạn ngang (→) và 2 đoạn dọc (↑), tổng 5 bước. Số cách chọn vị trí cho 2 bước dọc trong 5 bước là C(5, 2) = (5 × 4) / 2 = 10 đường."
        },
        {
          id: "ia-03",
          dimension: "working_memory",
          context: "Bài toán qua cầu ban đêm",
          difficultyWeight: 3,
          question:
            "4 người A, B, C, D qua một cây cầu tối với tốc độ qua cầu lần lượt là 1, 2, 5 và 10 phút. Chỉ có 1 đèn pin và cầu chịu được tối đa 2 người đi cùng (tính theo tốc độ người chậm hơn). Thời gian TỐI THIỂU để cả 4 người qua cầu là bao nhiêu phút?",
          options: iqOpts(0, [
            { t: "17 phút", f: "Đỉnh cao tối ưu! Cho 5 và 10 đi cùng nhau ở lượt giữa thay vì tách lẻ sẽ tiết kiệm được thời gian." },
            { t: "19 phút" },
            { t: "15 phút" },
            { t: "21 phút" }
          ]),
          explanation:
            "Chiến thuật tối ưu: (1) A và B qua hết 2p; (2) A cầm đèn về hết 1p; (3) C(5) và D(10) cùng qua hết 10p; (4) B cầm đèn về hết 2p; (5) A và B cùng qua lại hết 2p. Tổng = 2 + 1 + 10 + 2 + 2 = 17 phút."
        },
        {
          id: "ia-04",
          dimension: "working_memory",
          context: "Chia 3 tìm đồng xu nặng",
          difficultyWeight: 2,
          question:
            "Có 81 đồng xu giống hệt nhau, trong đó có đúng 1 đồng giả NẶNG hơn các đồng khác. Với chiếc cân 2 đĩa, cần tối thiểu bao nhiêu lần cân để CHẮC CHẮN tìm ra đồng xu giả?",
          options: iqOpts(3, [
            { t: "9 lần cân" },
            { t: "5 lần cân" },
            { t: "6 lần cân" },
            { t: "4 lần cân", f: "Chính xác! Mỗi lần chia 3 phần bằng nhau thu hẹp không gian tìm kiếm xuống 1/3: 81 → 27 → 9 → 3 → 1." }
          ]),
          explanation:
            "Mỗi lần đặt 2 nhóm bằng nhau lên cân sẽ biết xu nặng nằm ở đĩa nặng hơn hay ở nhóm thứ 3 ngoài cân: 81 → 27 (lần 1) → 9 (lần 2) → 3 (lần 3) → 1 (lần 4). (3⁴ = 81)."
        },
        {
          id: "ia-05",
          dimension: "logical_reasoning",
          context: "Chiến thuật trò chơi Nim",
          difficultyWeight: 2,
          question:
            "Trên bàn có 22 viên sỏi. Hai người lần lượt bốc mỗi lượt 1, 2 hoặc 3 viên. Ai bốc được viên sỏi cuối cùng là người THẮNG. Bạn đi trước — lượt đầu tiên bạn phải bốc bao nhiêu viên để CHẮC CHẮN thắng?",
          options: iqOpts(2, [
            { t: "Bốc 1 viên" },
            { t: "Bốc 3 viên" },
            { t: "Bốc 2 viên", f: "Chuẩn xác! Bốc 2 viên để đưa về 20 (bội số của 4), sau đó luôn bốc bù (4 − số đối thủ bốc)." },
            { t: "Không thể chắc chắn thắng nếu đi trước" }
          ]),
          explanation:
            "Chu kỳ cộng mỗi cặp lượt là 1 + 3 = 4. Để thắng, bạn luôn đưa số sỏi còn lại về bội số của 4 (20, 16, 12, 8, 4, 0). Từ 22 viên, bốc ngay 2 viên còn 20; sau đó đối thủ bốc k thì bạn bốc (4 − k) là chắc chắn ăn viên cuối."
        },
        {
          id: "ia-06",
          dimension: "logical_reasoning",
          context: "Tìm kiếm nhị phân",
          difficultyWeight: 3,
          question:
            "Một số nguyên bí mật nằm trong khoảng từ 1 đến 1.000. Mỗi lần bạn đoán một số, hệ thống chỉ trả lời 'Lớn hơn', 'Nhỏ hơn' hoặc 'Đúng rồi'. Với chiến thuật tối ưu nhất, bạn cần TỐI ĐA bao nhiêu lần đoán để chắc chắn tìm ra số đó?",
          options: iqOpts(1, [
            { t: "500 lần" },
            { t: "10 lần", f: "Chính xác! Mỗi lần đoán đúng giữa khoảng sẽ loại bỏ một nửa ứng viên: 2¹⁰ = 1.024 > 1.000." },
            { t: "20 lần" },
            { t: "100 lần" }
          ]),
          explanation:
            "Theo thuật toán tìm kiếm nhị phân (Binary Search), mỗi lần đoán vào điểm giữa giúp chia đôi số lượng khả năng còn lại: 1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1, tối đa 10 lần."
        },
        {
          id: "ia-07",
          dimension: "numerical_pattern",
          context: "Ốc sên leo giếng",
          difficultyWeight: 2,
          question: "Một con ốc sên nằm dưới đáy giếng sâu 10 mét. Ban ngày nó bò lên được 3 mét, ban đêm ngủ quên lại trượt xuống 2 mét. Đến ngày thứ mấy ốc sên lên tới miệng giếng?",
          options: iqOpts(0, [
            { t: "Ngày thứ 8", f: "Chính xác! Hết ngày-đêm thứ 7 ốc sên ở độ cao 7m, sang ban ngày thứ 8 bò thêm 3m chạm đúng 10m!" },
            { t: "Ngày thứ 10" },
            { t: "Ngày thứ 9" },
            { t: "Ngày thứ 7" }
          ]),
          explanation:
            "Mỗi chu kỳ ngày-đêm đầy đủ tiến ròng 3 − 2 = 1 mét. Sau 7 ngày-đêm, ốc sên ở mức 7 mét. Sang ban ngày thứ 8, nó bò thêm 3 mét đạt đúng 10 mét (miệng giếng) và thoát ra ngoài, không bị trượt lại ban đêm nữa."
        },
        {
          id: "ia-08",
          dimension: "numerical_pattern",
          context: "100 chiếc tủ khóa",
          difficultyWeight: 3,
          question:
            "Có 100 tủ khóa đóng kín đánh số từ 1 đến 100. Người thứ 1 mở tất cả tủ (bội số của 1). Người thứ 2 đảo trạng thái (mở→đóng, đóng→mở) các tủ bội số của 2. Người thứ 3 đảo các tủ bội số của 3... cứ thế tới người thứ 100. Sau lượt cuối cùng có bao nhiêu tủ ĐANG MỞ?",
          options: iqOpts(3, [
            { t: "50 tủ" },
            { t: "25 tủ" },
            { t: "12 tủ" },
            { t: "10 tủ", f: "Xuất sắc! Chỉ các số chính phương (1, 4, 9, ..., 100) có số ước số lẻ nên giữ trạng thái MỞ." }
          ]),
          explanation:
            "Một chiếc tủ bị đảo trạng thái đúng bằng số ước nguyên dương của số thứ tự tủ đó. Hầu hết các số có các cặp ước đi đôi (số lần đảo chẵn → trở về ĐÓNG), duy nhất các số chính phương (1², 2², ..., 10²) có số ước lẻ nên kết thúc ở trạng thái MỞ. Từ 1 đến 100 có đúng 10 số chính phương."
        },
        {
          id: "ia-09",
          dimension: "verbal_analytic",
          context: "Tối ưu hóa tra cứu",
          difficultyWeight: 1,
          question:
            "Vì sao các từ điển giấy hoặc danh bạ lớn luôn sắp xếp dữ liệu theo thứ tự bảng chữ cái thay vì giữ nguyên thứ tự thêm vào?",
          options: iqOpts(2, [
            { t: "Để tiết kiệm mực in hơn." },
            { t: "Vì máy tính không lưu được dữ liệu chưa sắp xếp." },
            { t: "Để giảm thời gian tra cứu mỗi lần từ việc dò từng trang sang kỹ thuật mở đôi tìm kiếm cực nhanh.", f: "Chính xác! Tiền xử lý sắp xếp giúp giảm độ phức tạp tra cứu từ tuyến tính O(N) xuống logarit O(log N)." },
            { t: "Để đếm tổng số từ dễ hơn." }
          ]),
          explanation:
            "Khi dữ liệu đã có thứ tự, ta có thể nhảy thẳng vào giữa để thu hẹp nửa không gian tìm kiếm mỗi bước thay vì phải đọc tuần tự từ trang 1."
        },
        {
          id: "ia-10",
          dimension: "verbal_analytic",
          context: "Đường găng dự án (Critical Path)",
          difficultyWeight: 2,
          question:
            "Khi xây dựng một kế hoạch gồm nhiều đầu việc chạy song song nhưng có các bước phụ thuộc nhau, thời gian tối thiểu hoàn thành toàn bộ dự án phụ thuộc vào yếu tố nào?",
          options: iqOpts(1, [
            { t: "Tổng thời gian của tất cả các đầu việc cộng lại." },
            { t: "Chuỗi công việc phụ thuộc nối tiếp dài nhất từ lúc khởi đầu đến lúc kết thúc (Đường găng).", f: "Chính xác! Việc chạy song song không rút ngắn được đường găng nối tiếp dài nhất." },
            { t: "Đầu việc tốn ít thời gian nhất." },
            { t: "Số lượng nhân sự rảnh rỗi ở tuần đầu." }
          ]),
          explanation:
            "Nếu việc B bắt buộc chờ việc A xong mới làm được, thì chuỗi nối tiếp dài nhất (Critical Path) chính là nút cổ chai quyết định ngày hoàn thành sớm nhất của cả dự án."
        }
      ]
    },
    {
      id: "iq-verbal-critical",
      testType: "iq",
      title: "IQ Tư Duy Phản Biện, Bắt Lỗi Ngụy Biện & Suy Luận Sâu",
      shortTitle: "IQ Phản Biện & Ngụy Biện",
      category: "iq-comprehensive",
      categoryLabel: "IQ Toàn diện",
      level: "Nâng cao",
      durationMinutes: 10,
      icon: "⚖️",
      accentColor: "#f59e0b",
      description:
        "Kiểm tra khả năng phát hiện lỗi ngụy biện trong lập luận (Công kích cá nhân, Bù nhìn rơm, Thiên kiến kẻ sống sót), tìm giả định ngầm và suy luận logic chặt chẽ.",
      tags: ["10 câu hỏi", "Phản biện GMAT", "Bắt lỗi ngụy biện"],
      questions: [
        {
          id: "iv-01",
          dimension: "verbal_analytic",
          context: "Ngụy biện công kích cá nhân",
          difficultyWeight: 1,
          question:
            "Trong cuộc họp, anh A trình bày số liệu rằng quy trình hiện tại gây chậm 15%. Anh B phản bác: 'Cậu mới đi làm được 6 tháng, kinh nghiệm chưa bằng nửa tôi thì biết gì mà chê quy trình!'. Anh B mắc lỗi ngụy biện nào?",
          options: iqOpts(0, [
            { t: "Công kích cá nhân (Ad Hominem): nhắm vào thâm niên người nói thay vì kiểm chứng số liệu 15%.", f: "Chính xác! Tính đúng sai của số liệu độc lập với tuổi đời của người đưa ra số liệu." },
            { t: "Ngụy biện trượt dốc (Slippery Slope)." },
            { t: "Lập luận vòng tròn." },
            { t: "Anh B hoàn toàn không ngụy biện." }
          ]),
          explanation:
            "Công kích cá nhân xảy ra khi người phản biện bỏ qua nội dung lập luận/dữ liệu mà quay sang hạ thấp tư cách hoặc kinh nghiệm của người nói."
        },
        {
          id: "iv-02",
          dimension: "verbal_analytic",
          context: "Ngụy biện người rơm",
          difficultyWeight: 2,
          question:
            "Cô C đề xuất: 'Chúng ta nên dành 10% ngân sách tuần này nâng cấp hệ thống bảo mật'. Anh D đáp lại: 'Thế ý cô là bỏ mặc doanh số bán hàng và cho cả công ty ngừng tiếp thị để ngồi ngắm bảo mật à?'. Anh D đang dùng lỗi ngụy biện gì?",
          options: iqOpts(2, [
            { t: "Viện dẫn số đông." },
            { t: "Khái quát hóa vội vàng." },
            { t: "Ngụy biện người rơm (Straw Man): bóp méo đề xuất 10% thành kịch bản cực đoan rồi tấn công.", f: "Chuẩn xác! Anh D tự dựng lên một quan điểm cực đoan cô C không hề nói để dễ bề bác bỏ." },
            { t: "So sánh khập khiễng." }
          ]),
          explanation:
            "Ngụy biện Người rơm phóng đại hoặc bóp méo quan điểm vừa phải của đối phương thành một phiên bản cực đoan vô lý."
        },
        {
          id: "iv-03",
          dimension: "logical_reasoning",
          context: "Thiên kiến kẻ sống sót",
          difficultyWeight: 3,
          question:
            "Một trang tin đăng bài: 'Tất cả 5 tỷ phú công nghệ nổi tiếng này đều từng bỏ đại học giữa chừng, chứng tỏ bỏ đại học sẽ tăng cơ hội thành tỷ phú!'. Lỗ hổng lớn nhất của lập luận này là:",
          options: iqOpts(1, [
            { t: "Số 5 tỷ phú là chưa chẵn." },
            { t: "Thiên kiến kẻ sống sót (Survivorship Bias): chỉ nhìn vào vài người thành công nổi bật mà quên hàng triệu người bỏ đại học khác không thành công.", f: "Xuất sắc! Không tính đến mẫu số khổng lồ những người có cùng hành động nhưng thất bại." },
            { t: "Tỷ phú thường không thích học đại học." },
            { t: "Công nghệ thay đổi quá nhanh." }
          ]),
          explanation:
            "Survivorship Bias xảy ra khi ta rút kết luận từ nhóm 'sống sót/thành công' ít ỏi mà bỏ quên dữ liệu của số đông thất bại không xuất hiện trên mặt báo."
        },
        {
          id: "iv-04",
          dimension: "logical_reasoning",
          context: "Tìm giả định ngầm",
          difficultyWeight: 2,
          question:
            "Quảng cáo viết: 'Khách sạn chúng tôi trang bị đệm cao cấp nhất thế giới, vì thế bạn chắc chắn sẽ có một giấc ngủ sâu trọn vẹn khi nghỉ tại đây'. Lập luận này đang ngầm mặc định giả định nào?",
          options: iqOpts(3, [
            { t: "Khách sạn có rất nhiều phòng trống." },
            { t: "Giá phòng của khách sạn rất đắt đỏ." },
            { t: "Đệm cao cấp có tuổi thọ trên 10 năm." },
            { t: "Không có yếu tố nào khác (như tiếng ồn đường phố, ánh sáng, nhiệt độ phòng) làm phiền giấc ngủ của bạn.", f: "Chính xác! Đệm êm chỉ là một trong nhiều điều kiện của giấc ngủ sâu." }
          ]),
          explanation:
            "Giả định ngầm là mắt xích chưa được nói ra giúp kết luận đứng vững: đệm êm mới đủ đảm bảo ngủ sâu nếu các yếu tố khác (tiếng ồn, ánh sáng, căng thẳng) không phá hỏng giấc ngủ."
        },
        {
          id: "iv-05",
          dimension: "working_memory",
          context: "Bài toán 3 lời khai",
          difficultyWeight: 2,
          question:
            "Chỉ có đúng 1 trong 3 bạn An, Bình, Chi làm vỡ cốc. Khi hỏi, cả 3 trả lời như sau: An nói 'Tôi không làm vỡ'; Bình nói 'Chi làm vỡ'; Chi nói 'Bình nói dối'. Biết chỉ có ĐÚNG 1 người nói thật, hai người còn lại nói dối. Ai là người làm vỡ cốc?",
          options: iqOpts(0, [
            { t: "An là người làm vỡ cốc.", f: "Chính xác! Nếu An làm vỡ thì An nói dối, Bình nói dối (không phải Chi) và Chi nói thật (Bình nói dối) — khớp đúng 1 thật 2 dối!" },
            { t: "Bình là người làm vỡ cốc." },
            { t: "Chi là người làm vỡ cốc." },
            { t: "Không thể xác định." }
          ]),
          explanation:
            "Chú ý Bình và Chi nói hai câu trái ngược hoàn toàn ('Chi làm vỡ' vs 'Bình nói dối'), nên chắc chắn một trong hai người Bình hoặc Chi nói thật và người kia nói dối. Vì toàn bộ chỉ có đúng 1 người nói thật, nên người thứ ba (An) CHẮC CHẮN nói dối → An nói dối câu 'Tôi không làm vỡ' → An chính là người làm vỡ!"
        },
        {
          id: "iv-06",
          dimension: "working_memory",
          context: "Điều kiện cần và đủ",
          difficultyWeight: 3,
          question:
            "Quy định học bổng ghi: 'Chỉ những sinh viên có điểm trung bình từ 8,5 trở lên MỚI ĐƯỢC xét học bổng'. Biết Minh KHÔNG đạt điểm trung bình từ 8,5 trở lên, còn Lan CÓ điểm trung bình 9,0. Kết luận nào CHẮC CHẮN đúng?",
          options: iqOpts(2, [
            { t: "Lan chắc chắn nhận được học bổng." },
            { t: "Cả Minh và Lan đều được xét học bổng." },
            { t: "Minh chắc chắn không được xét học bổng; còn Lan đủ điều kiện xét nhưng chưa chắc đã nhận được.", f: "Tuyệt vời! Bạn phân biệt sắc bén giữa 'điều kiện cần' (chỉ khi...) và 'điều kiện đủ'." },
            { t: "Minh vẫn có thể nhận học bổng nếu có hoạt động ngoại khóa." }
          ]),
          explanation:
            "'Chỉ A mới được B' nghĩa là A là điều kiện CẦN: thiếu A (Minh < 8,5) thì chắc chắn không được xét; có A (Lan = 9,0) thì đạt điều kiện cần để xét, nhưng chưa khẳng định là điều kiện ĐỦ để chắc chắn trúng tuyển."
        },
        {
          id: "iv-07",
          dimension: "numerical_pattern",
          context: "Tỷ lệ tăng trưởng thực",
          difficultyWeight: 2,
          question:
            "Một cửa hàng tăng số lượng đơn hàng từ 2 đơn/ngày lên 4 đơn/ngày (tăng 100%), trong khi cửa hàng đối diện tăng từ 100 đơn lên 150 đơn/ngày (tăng 50%). Khi đánh giá quy mô tăng trưởng thực, nhận xét nào chuẩn xác?",
          options: iqOpts(1, [
            { t: "Cửa hàng 1 mở rộng được nhiều khách mới hơn hẳn cửa hàng 2." },
            { t: "Cửa hàng 1 có tốc độ % cao hơn do nền gốc quá nhỏ (chỉ thêm 2 đơn), còn cửa hàng 2 tăng lượng tuyệt đối gấp 25 lần (+50 đơn).", f: "Chính xác! Luôn đọc % kèm giá trị tuyệt đối và kích thước nền gốc." },
            { t: "Hai cửa hàng tăng trưởng hoàn toàn ngang nhau." },
            { t: "Số liệu % không có giá trị gì trong kinh doanh." }
          ]),
          explanation:
            "Phần trăm tăng trưởng rất dễ gây ảo giác khi mẫu số ban đầu quá nhỏ (Small Denominator Effect)."
        },
        {
          id: "iv-08",
          dimension: "numerical_pattern",
          context: "Nghịch lý Simpson",
          difficultyWeight: 3,
          question:
            "Bệnh viện A có tỷ lệ hồi phục cao hơn Bệnh viện B ở nhóm bệnh nhẹ (95% vs 90%) VÀ cao hơn ở cả nhóm bệnh nặng (60% vs 50%), nhưng tính gộp chung toàn bệnh viện thì tỷ lệ hồi phục tổng của A lại THẤP HƠN B. Điều này có thể xảy ra khi nào?",
          options: iqOpts(3, [
            { t: "Không bao giờ xảy ra được trong toán học." },
            { t: "Do nhân viên Bệnh viện A cộng sai phép tính." },
            { t: "Do Bệnh viện B có nhiều bác sĩ hơn." },
            { t: "Do Bệnh viện A tiếp nhận phần lớn là các ca bệnh nặng (tỷ lệ hồi phục vốn thấp hơn), còn B chủ yếu tiếp nhận ca nhẹ.", f: "Đỉnh cao! Đây chính là Nghịch lý Simpson (Simpson's Paradox) do khác biệt tỷ trọng mẫu." }
          ]),
          explanation:
            "Khi tỷ trọng nhóm phụ (ca nặng vs ca nhẹ) chênh lệch lớn giữa hai bệnh viện, trung bình cộng gộp chung có thể đảo ngược hoàn toàn so sánh ở từng nhóm con."
        },
        {
          id: "iv-09",
          dimension: "spatial_visual",
          context: "Sơ đồ tập hợp Venn",
          difficultyWeight: 2,
          question:
            "Một lớp có 40 học sinh, trong đó 25 bạn thích Toán, 20 bạn thích Văn và 5 bạn KHÔNG thích môn nào trong 2 môn trên. Hỏi có bao nhiêu bạn thích CẢ HAI môn Toán và Văn?",
          options: iqOpts(0, [
            { t: "10 bạn", f: "Chính xác! Số bạn thích ít nhất 1 môn = 40 − 5 = 35. Giao nhau = 25 + 20 − 35 = 10 bạn." },
            { t: "15 bạn" },
            { t: "5 bạn" },
            { t: "20 bạn" }
          ]),
          explanation:
            "Số học sinh thích Toán hoặc Văn = 40 − 5 = 35 bạn. Áp dụng nguyên lý bù trừ: |Toán ∩ Văn| = 25 + 20 − 35 = 10 bạn."
        },
        {
          id: "iv-10",
          dimension: "spatial_visual",
          context: "Sắp xếp bàn tròn",
          difficultyWeight: 3,
          question:
            "4 người A, B, C, D ngồi quanh một bàn tròn. Biết A ngồi đối diện B; C ngồi ngay bên tay phải của A. Hỏi D đang ngồi ở vị trí nào so với A?",
          options: iqOpts(2, [
            { t: "Ngồi đối diện A" },
            { t: "Ngồi ngay bên tay phải của A" },
            { t: "Ngồi ngay bên tay trái của A", f: "Chính xác! Đối diện A là B, bên phải A là C, vậy ghế còn lại bên trái A chính là D." },
            { t: "Chưa đủ dữ kiện xác định" }
          ]),
          explanation:
            "Bàn tròn 4 ghế cố định có 3 vị trí tương đối so với A: đối diện (B), bên phải (C), và bên trái (chắc chắn còn lại là D)."
        }
      ]
    }
  ];

  const EXTRA_PERSONALITY_TESTS = [
    {
      id: "leadership-style",
      testType: "personality",
      title: "Trắc Nghiệm Phong Cách Lãnh Đạo & Quản Trị Đội Ngũ",
      shortTitle: "Phong Cách Lãnh Đạo",
      category: "personality-career",
      categoryLabel: "Hướng nghiệp",
      level: "Chuyên sâu",
      durationMinutes: 8,
      icon: "👑",
      accentColor: "#8b5cf6",
      description:
        "Đo lường thiên hướng dẫn dắt tập thể của bạn qua 5 trục nhân cách: bạn là người truyền cảm hứng tầm nhìn, người thiết lập hệ thống kỷ luật hay người cố vấn gắn kết?",
      tags: ["10 câu hỏi", "Lãnh đạo", "Quản trị team"],
      questions: [
        {
          id: "ls-01",
          dimension: "openness",
          context: "Định hướng tầm nhìn mới",
          question: "Khi bắt đầu một quý mới, bạn ưu tiên điều gì đầu tiên cho đội ngũ của mình?",
          options: scaleOpts({
            4: { t: "Khơi gợi một tầm nhìn đột phá và khuyến khích anh em đề xuất ít nhất 1 thử nghiệm mới táo bạo.", f: "Phong cách Lãnh đạo Chuyển hóa (Transformational) truyền cảm hứng đổi mới!" },
            3: { t: "Rà soát mục tiêu cũ và cải tiến 1–2 quy trình giúp đội làm việc thông minh hơn.", f: "Cân bằng giữa đổi mới và tính khả thi." },
            2: { t: "Giữ nguyên cách làm ổn định quý trước, tránh xáo trộn mất thời gian.", f: "Ưu tiên sự ổn định an toàn." },
            1: { t: "Chỉ đợi cấp trên giao KPI xuống rồi chia đều cho mọi người làm.", f: "Thụ động chờ chỉ thị thay vì định hướng chủ động." }
          }),
          explanation: "Lãnh đạo có tính Cởi mở cao luôn nhìn ra cơ hội đổi mới trước khi thị trường buộc phải thay đổi."
        },
        {
          id: "ls-02",
          dimension: "openness",
          context: "Đón nhận ý tưởng ngược dòng",
          question: "Một nhân viên cấp dưới đề xuất một cách làm khá lạ lẫm ngược hẳn với kinh nghiệm lâu năm của bạn. Bạn làm gì?",
          options: scaleOpts({
            4: { t: "Lắng nghe tò mò và cho phép thử nghiệm quy mô nhỏ (Pilot) để dữ liệu thực tế trả lời thay vì bác bỏ bằng kinh nghiệm cũ.", f: "Tư duy mở xuất sắc — tạo văn hóa sáng tạo an toàn!" },
            3: { t: "Hỏi kỹ căn cứ của bạn ấy rồi cân nhắc xem có áp dụng được một phần nào không.", f: "Cởi mở có kiểm soát." },
            2: { t: "Bảo 'cách này rủi ro lắm, cứ làm theo lối cũ cho chắc ăn'.", f: "Kinh nghiệm cũ vô tình trở thành rào cản đổi mới." },
            1: { t: "Nhắc nhở rằng cấp dưới nên làm đúng quy trình có sẵn đừng nghĩ linh tinh.", f: "Dập tắt sự chủ động sáng tạo của nhân sự." }
          }),
          explanation: "Người dẫn dắt giỏi biến sự khác biệt quan điểm thành phòng thí nghiệm nhỏ an toàn."
        },
        {
          id: "ls-03",
          dimension: "conscientiousness",
          context: "Giao việc và theo dõi",
          question: "Khi giao một nhiệm vụ quan trọng cho thành viên trong nhóm, bạn làm thế nào?",
          options: scaleOpts({
            4: { t: "Thống nhất rõ tiêu chí đầu ra, nguồn lực hỗ trợ và mốc kiểm tra giữa kỳ rõ ràng ngay từ phút đầu.", f: "Quản trị kỷ luật và minh bạch kỳ vọng tuyệt vời!" },
            3: { t: "Giao đầu việc chính rồi thỉnh thoảng hỏi thăm xem xong chưa.", f: "Thiếu mốc kiểm tra sớm dễ phát hiện trễ vào phút chót." },
            2: { t: "Kiểm soát từng tiểu tiết mỗi 30 phút khiến nhân viên ngột ngạt.", f: "Quản trị vi mô (Micromanagement) làm giảm tính tự chủ của đội." },
            1: { t: "Giao miệng đại khái rồi quên luôn tới sát ngày giao khách mới giật mình hỏi.", f: "Thiếu hệ thống theo dõi gây rủi ro tiến độ lớn." }
          }),
          explanation: "Giao việc hiệu quả nằm ở việc làm rõ kết quả mong muốn + mốc kiểm tra định kỳ thay vì buông lỏng hoặc soi từng bước."
        },
        {
          id: "ls-04",
          dimension: "conscientiousness",
          context: "Làm gương kỷ luật",
          question: "Quan điểm của bạn về việc giữ chuẩn mực đúng giờ và lời hứa khi ở vai trò người dẫn dắt?",
          options: scaleOpts({
            4: { t: "Làm gương tuyệt đối từ việc nhỏ (đúng giờ họp, giữ đúng lời hứa thưởng/hỗ trợ) để xây uy tín tự nhiên cho cả đội.", f: "Lãnh đạo bằng tấm gương hành động!" },
            3: { t: "Cố gắng giữ đúng hẹn trong phần lớn thời gian trừ khi quá bận.", f: "Khá ổn định, giữ sự nhất quán sẽ tạo niềm tin cao hơn." },
            2: { t: "Cho rằng người làm sếp bận nhiều việc thì đi trễ hay đổi lịch phút chót là chuyện bình thường.", f: "Tiêu chuẩn kép làm xói mòn kỷ luật tập thể." },
            1: { t: "Ít khi để tâm đến giờ giấc hay quy ước nhỏ miễn xong việc là được.", f: "Dễ tạo văn hóa tùy tiện trong nhóm." }
          }),
          explanation: "Văn hóa đội ngũ không nằm trên khẩu hiệu treo tường mà nằm ở những hành vi người đứng đầu lặp lại mỗi ngày."
        },
        {
          id: "ls-05",
          dimension: "extraversion",
          context: "Truyền năng lượng tập thể",
          question: "Khi cả nhóm sắp bước vào một chiến dịch lớn đầy áp lực, bạn tạo không khí thế nào?",
          options: scaleOpts({
            4: { t: "Tổ chức buổi khởi động súc tích, kết nối từng thành viên và truyền năng lượng tự tin mạnh mẽ cho cả đội.", f: "Khả năng truyền lửa và tập hợp đội ngũ nổi bật!" },
            3: { t: "Gửi tin nhắn động viên ngắn gọn kèm kế hoạch chi tiết cho mọi người.", f: "Rõ ràng và thực tế." },
            2: { t: "Chỉ âm thầm gửi file phân công nhiệm vụ qua email mà không họp mặt.", f: "Đủ thông tin nhưng thiếu chất xúc tác gắn kết tinh thần." },
            1: { t: "Thẳng thừng cảnh báo mọi người rằng nếu thất bại đợt này sẽ bị trừ thưởng nặng.", f: "Dùng nỗi sợ tạo động lực ngắn hạn nhưng phá vỡ tinh thần cống hiến." }
          }),
          explanation: "Năng lượng của người đứng đầu thiết lập 'nhiệt độ cảm xúc' cho toàn bộ đội ngũ khi bước vào thử thách."
        },
        {
          id: "ls-06",
          dimension: "extraversion",
          context: "Đại diện bảo vệ đội ngũ",
          question: "Khi thành viên trong đội gặp mâu thuẫn quyền lợi hoặc bị phòng ban khác gây áp lực vô lý, bạn phản ứng ra sao?",
          options: scaleOpts({
            4: { t: "Chủ động đứng ra làm việc trực tiếp với lãnh đạo phòng kia bằng thái độ điềm tĩnh, quyết đoán để bảo vệ sự công bằng cho đội mình.", f: "Bản lĩnh người che chắn và bảo vệ đội ngũ!" },
            3: { t: "Nhắn tin góp ý nhẹ nhàng với bên kia để tìm hướng hòa giải.", f: "Thiện chí tốt." },
            2: { t: "Bảo nhân viên tự đi giải quyết lấy để tập làm quen áp lực.", f: "Bỏ rơi thành viên khi mất cân bằng quyền lực." },
            1: { t: "Hùa theo bên kia mắng luôn nhân viên mình cho giữ hòa khí với phòng khác.", f: "Đánh mất hoàn toàn lòng trung thành của đội ngũ." }
          }),
          explanation: "Nhân sự sẵn sàng đi cùng bạn qua bão tố khi họ biết bạn sẵn sàng đứng ra bảo vệ họ lúc cần thiết."
        },
        {
          id: "ls-07",
          dimension: "agreeableness",
          context: "Ghi nhận công lao",
          question: "Khi dự án của nhóm đạt thành tích xuất sắc và được ban giám đốc khen ngợi, bạn xử sự thế nào?",
          options: scaleOpts({
            4: { t: "Đặt ánh đèn sân khấu lên từng thành viên, nêu đích danh đóng góp cụ thể của mọi người trước ban giám đốc.", f: "Phẩm chất Lãnh đạo Phục vụ (Servant Leadership) tuyệt vời!" },
            3: { t: "Cảm ơn chung cả nhóm rồi nhận bằng khen đại diện.", f: "Lịch sự chuẩn mực, nêu tên đóng góp cụ thể sẽ tạo động lực mạnh hơn." },
            2: { t: "Nhấn mạnh phần công sức chỉ đạo sáng suốt của bản thân là chủ yếu.", f: "Cái tôi lớn làm giảm sự gắn bó của người làm thực tế." },
            1: { t: "Quên hẳn việc cảm ơn đội ngũ sau khi nhận thưởng xong.", f: "Thiếu ghi nhận làm nguội lửa cống hiến." }
          }),
          explanation: "Khi thắng lợi hãy nhìn ra cửa sổ (chia công cho đồng đội); khi gặp lỗi hãy nhìn vào gương (nhận trách nhiệm trước)."
        },
        {
          id: "ls-08",
          dimension: "agreeableness",
          context: "Phát triển nhân sự yếu",
          question: "Có một thành viên mới rất nhiệt tình nhưng kỹ năng hiện tại còn chậm so với mặt bằng chung. Bạn hỗ trợ thế nào?",
          options: scaleOpts({
            4: { t: "Tìm ra thế mạnh tự nhiên của bạn ấy, ghép cặp hướng dẫn sát sao 2 tuần và đặt lộ trình cải thiện từng bước rõ ràng.", f: "Tư duy phát triển con người (Coaching Mindset) xuất sắc!" },
            3: { t: "Gửi tài liệu tự học và dặn bạn ấy cố gắng xem lại vào buổi tối.", f: "Hỗ trợ cơ bản nhưng thiếu đồng hành." },
            2: { t: "Chỉ giao cho toàn việc vặt lặt vặt vì ngại hướng dẫn mất công.", f: "Lãng phí tiềm năng nhân sự." },
            1: { t: "Đề nghị cho nghỉ việc ngay tuần đầu vì thấy chậm.", f: "Thiếu kiên nhẫn phát triển đội ngũ." }
          }),
          explanation: "Người quản lý giỏi đặt đúng người vào đúng việc và kiên nhẫn mở khóa tiềm năng thay vì chỉ tìm người hoàn hảo sẵn."
        },
        {
          id: "ls-09",
          dimension: "stability",
          context: "Giữ nhịp khi khủng hoảng",
          question: "Sự cố nghiêm trọng xảy ra (sập hệ thống, khách lớn dọa hủy hợp đồng), cả phòng đang hoảng loạn tìm người đổ lỗi. Bạn hành động ra sao?",
          options: scaleOpts({
            4: { t: "Tuyên bố ngưng ngay việc đổ lỗi lúc này, giữ giọng bình tĩnh phân công 3 bước ứng cứu khẩn cấp và để phần rút kinh nghiệm sang ngày mai.", f: "Sự vững chãi tâm lý (Anchor) cực kỳ đáng nể trong bão tố!" },
            3: { t: "Hơi căng thẳng nhưng cố gắng tự nhảy vào sửa lỗi trực tiếp cùng anh em.", f: "Xông xáo nhiệt tình, nhớ phân điều phối rõ ràng để cả đội khỏi giẫm chân nhau." },
            2: { t: "Hoảng loạn quát tháo hỏi 'Đứa nào làm sập hệ thống thế này?!'", f: "Cơn giận lúc khủng hoảng làm cả đội sợ hãi và sửa lỗi chậm hơn." },
            1: { t: "Tắt máy hoặc đẩy hết trách nhiệm sang cấp dưới gánh hộ.", f: "Trốn tránh trách nhiệm phá hủy tư cách lãnh đạo." }
          }),
          explanation: "Trong khủng hoảng, hành động đầu tiên của lãnh đạo là làm ổn định hệ thần kinh tập thể."
        },
        {
          id: "ls-10",
          dimension: "stability",
          context: "Chịu trách nhiệm khi sai",
          question: "Chiến lược bạn phê duyệt cho nhóm không mang lại kết quả như mong đợi. Bạn đứng trước nhóm nói gì?",
          options: scaleOpts({
            4: { t: "Thẳng thắn nhận phần trách nhiệm định hướng thuộc về mình, cùng đội mổ xẻ dữ liệu khách quan để điều chỉnh hướng mới.", f: "Dám làm dám chịu — phẩm chất tạo niềm tin sâu sắc nhất!" },
            3: { t: "Nói nhẹ nhàng rằng thị trường đợt này khó nên cả nhóm cùng cố lại.", f: "Tránh đổ lỗi cho đội nhưng hơi né nhận trách nhiệm cá nhân." },
            2: { t: "Chê đội ngũ thực thi chưa tới nơi tới chốn nên kế hoạch hay của mình mới hỏng.", f: "Đẩy lỗi xuống dưới giết chết tinh thần chủ động." },
            1: { t: "Lờ đi coi như chưa từng có kế hoạch đó.", f: "Thiếu minh bạch làm mất uy tín." }
          }),
          explanation: "Nhận trách nhiệm không làm giảm uy tín của người đứng đầu — ngược lại, nó chứng minh bạn đủ vững vàng để dẫn dắt qua thử thách."
        }
      ]
    },
    {
      id: "money-mindset",
      testType: "personality",
      title: "Tâm Lý Học Tài Chính & Phong Cách Quản Trị Tiền Bạc",
      shortTitle: "Tâm Lý Tài Chính Cá Nhân",
      category: "personality-ocean",
      categoryLabel: "Big Five OCEAN",
      level: "Thực tế",
      durationMinutes: 8,
      icon: "💰",
      accentColor: "#0ea5e9",
      description:
        "Khám phá 'tính cách tiền bạc' ẩn bên trong bạn: thói quen chi tiêu – tiết kiệm, phản ứng trước biến động thị trường, tâm lý FOMO đầu tư và kỷ luật tự do tài chính.",
      tags: ["10 câu hỏi", "Tài chính cá nhân", "Chống FOMO"],
      questions: [
        {
          id: "mm-01",
          dimension: "conscientiousness",
          context: "Phân bổ thu nhập đầu tháng",
          question: "Ngay khi nhận lương hoặc khoản thu nhập hàng tháng, bước đầu tiên bạn thường làm là gì?",
          options: scaleOpts({
            4: { t: "Tự động trích ngay một tỷ lệ cố định vào quỹ tiết kiệm/đầu tư dài hạn trước, phần còn lại mới dùng chi tiêu.", f: "Nguyên tắc 'Trả cho mình trước' kỷ luật tuyệt vời!" },
            3: { t: "Chi tiêu hết các khoản thiết yếu trong tháng, cuối tháng dư bao nhiêu mới cất tiết kiệm.", f: "Ổn nhưng dễ bị chi tiêu phát sinh ăn mòn phần tiết kiệm." },
            2: { t: "Mua ngay những món đồ mình thích suốt tháng trước rồi phần còn lại tính sau.", f: "Ưu tiên hưởng thụ trước dễ rơi vào cảnh hết tiền cuối tháng." },
            1: { t: "Không hề ghi chép hay chia quỹ gì cả, tiêu tới lúc hết tiền thì thôi.", f: "Thiếu kiểm soát dòng tiền tiềm ẩn rủi ro lớn khi có sự cố." }
          }),
          explanation: "Kỷ luật tài chính nằm ở thứ tự ưu tiên dòng tiền ngay ngày đầu tiên nhận thu nhập."
        },
        {
          id: "mm-02",
          dimension: "stability",
          context: "Thị trường giảm mạnh",
          question: "Khi khoản đầu tư tích lũy dài hạn của bạn (chứng khoán, quỹ, tài sản) bất ngờ giảm giá 15% trong một tuần biến động, bạn làm gì?",
          options: scaleOpts({
            4: { t: "Giữ bình tĩnh kiểm tra lại giá trị cốt lõi ban đầu: nếu nền tảng không hỏng thì kiên định kế hoạch dài hạn, không bán tháo hoảng loạn.", f: "Tâm lý đầu tư vững vàng tuyệt đối!" },
            3: { t: "Hơi lo lắng mở bảng giá xem mỗi ngày nhưng vẫn cố gắng không đụng tay vào bán.", f: "Kiềm chế hành vi tốt, giảm tần suất xem bảng giá sẽ bớt stress hơn." },
            2: { t: "Hoảng loạn bán cắt lỗ toàn bộ ngay đáy vì sợ mất sạch, sau đó thị trường hồi phục lại tiếc.", f: "Cảm xúc sợ hãi điều khiển quyết định tài chính." },
            1: { t: "Vay nóng thêm tiền đập vào gỡ gạc ngay lập tức theo tâm lý đánh bạc.", f: "Dùng đòn bẩy gỡ thua lỗ rất nguy hiểm." }
          }),
          explanation: "Trong đầu tư, sự ổn định cảm xúc quan trọng hơn cả IQ toán học — không bán tháo lúc hoảng loạn giúp bảo vệ thành quả dài hạn."
        },
        {
          id: "mm-03",
          dimension: "openness",
          context: "Nâng cấp tri thức tài chính",
          question: "Bạn tiếp cận các kiến thức về quản lý tài chính, thuế và đầu tư mới như thế nào?",
          options: scaleOpts({
            4: { t: "Chủ động đọc sách tài chính uy tín, tìm hiểu bản chất dòng tiền và thử nghiệm từng bước nhỏ có kiểm soát.", f: "Tư duy mở kết hợp học hỏi bài bản!" },
            3: { t: "Thỉnh thoảng xem các kênh chia sẻ tài chính cá nhân phổ thông.", f: "Thói quen tốt để cập nhật kiến thức nền." },
            2: { t: "Nghĩ chuyện đầu tư rất phức tạp rủi ro nên chỉ cất tiền mặt trong nhà cho chắc.", f: "An toàn ngắn hạn nhưng lạm phát bào mòn sức mua dài hạn." },
            1: { t: "Nghe theo lời phím kèo nóng 'lãi gấp đôi trong 1 tháng' của người lạ trên mạng.", f: "Cởi mở thiếu kiểm chứng kiến thức dễ sập bẫy lừa đảo tài chính." }
          }),
          explanation: "Cởi mở học hỏi kiến thức nền giúp bạn nhận ra cơ hội thật và tránh xa các lời hứa lợi nhuận phi thực tế."
        },
        {
          id: "mm-04",
          dimension: "conscientiousness",
          context: "Quỹ dự phòng khẩn cấp",
          question: "Hiện tại bạn có chuẩn bị khoản quỹ dự phòng riêng (đủ sống 3–6 tháng khi mất thu nhập hoặc ốm đau đột xuất) không?",
          options: scaleOpts({
            4: { t: "Có sẵn tách biệt hoàn toàn với tiền đầu tư/chi tiêu để luôn an tâm trước mọi biến cố.", f: "Tư duy quản trị rủi ro cực kỳ chín chắn!" },
            3: { t: "Đang tích lũy dần được khoảng 1–2 tháng sinh hoạt phí.", f: "Đang đi đúng hướng rất tốt!" },
            2: { t: "Dồn hết tiền vào một kênh mạo hiểm, khi cần gấp phải rút lỗ hoặc vay tạm bạn bè.", f: "Thiếu lớp đệm an toàn dễ phá vỡ kế hoạch dài hạn." },
            1: { t: "Chưa bao giờ nghĩ đến chuyện làm quỹ dự phòng.", f: "Xây dựng quỹ dự phòng nhỏ là bước đầu tiên để giảm lo âu tiền bạc." }
          }),
          explanation: "Quỹ dự phòng là chiếc phanh an toàn giúp bạn không phải đưa ra quyết định hoảng loạn khi biến cố xảy ra."
        },
        {
          id: "mm-05",
          dimension: "stability",
          context: "Bẫy FOMO cơn sốt tài sản",
          question:
            "Bạn bè xung quanh đồng loạt khoe vừa trúng lớn từ một xu hướng đầu tư nóng hổi mới nổi và rủ bạn dồn hết vốn vào ngay kẻo lỡ. Bạn phản ứng thế nào?",
          options: scaleOpts({
            4: { t: "Chúc mừng bạn bè nhưng giữ cái đầu lạnh: chỉ đầu tư số tiền nhàn rỗi chấp nhận rủi ro vào thứ mình thực sự hiểu rõ, không chạy theo đám đông.", f: "Kháng thể chống FOMO cực mạnh!" },
            3: { t: "Thử bỏ vào một phần nhỏ (dưới 5% vốn) để tìm hiểu thị trường cho biết.", f: "Quản trị rủi ro hợp lý nếu biết dừng đúng giới hạn." },
            2: { t: "Sốt ruột sợ thua kém bạn bè nên vội vàng rút hết sổ tiết kiệm đổ vào theo.", f: "Tâm lý FOMO là nguyên nhân hàng đầu khiến nhiều người mua đúng đỉnh." },
            1: { t: "Đi vay mượn thêm để tất tay một phen đổi đời nhanh.", f: "Rủi ro mất trắng cực cao." }
          }),
          explanation: "Ổn định tâm lý tài chính giúp bạn nói được câu: 'Cơ hội này không thuộc vùng hiểu biết của mình, chúc bạn thành công'."
        },
        {
          id: "mm-06",
          dimension: "agreeableness",
          context: "Minh bạch tiền bạc với người thân",
          question: "Trong gia đình/cặp đôi gắn bó lâu dài, cách bạn trao đổi về kế hoạch chi tiêu và các khoản lớn ra sao?",
          options: scaleOpts({
            4: { t: "Trao đổi cởi mở, tôn trọng ngân sách chung và thỏa thuận rõ ngưỡng chi tiêu cá nhân để cả hai đều thoải mái không nghi kỵ.", f: "Hợp tác tài chính lành mạnh và tôn trọng!" },
            3: { t: "Thỉnh thoảng bàn bạc khi chuẩn bị mua món đồ lớn, còn lại tự lo phần mình.", f: "Khá ổn và tôn trọng riêng tư." },
            2: { t: "Lén giấu mua đồ đắt hoặc tự ý cho vay số tiền lớn rồi giấu kín người bạn đời.", f: "Thiếu minh bạch tài chính dễ tạo vết nứt niềm tin lớn." },
            1: { t: "Cãi nhau gay gắt mỗi lần nhắc tới tiền và kiểm soát từng đồng chi tiêu của đối phương.", f: "Biến tiền bạc thành công cụ kiểm soát gây ngột ngạt." }
          }),
          explanation: "Tiền bạc là chủ đề gây tranh cãi hàng đầu trong gia đình; minh bạch và tôn trọng giúp nó trở thành công cụ xây dựng tương lai chung."
        },
        {
          id: "mm-07",
          dimension: "extraversion",
          context: "Chi tiêu sĩ diện xã hội",
          question: "Khi đi ăn uống hoặc gặp mặt bạn bè có thu nhập cao hơn bạn nhiều, thói quen chi tiêu của bạn là:",
          options: scaleOpts({
            4: { t: "Vui vẻ hòa đồng bằng sự chân thành và gợi ý lựa chọn phù hợp túi tiền thực tế, không gồng mình vung tay quá trán để giữ thể diện.", f: "Tự tin nội tại vững vàng — không mua sự công nhận bằng nợ nần!" },
            3: { t: "Cố gắng theo sát nhịp nhóm thỉnh thoảng một bữa rồi tuần sau ăn uống tiết kiệm lại.", f: "Chấp nhận được ở tần suất thưa." },
            2: { t: "Luôn xung phong giành trả tiền hoặc mua đồ hiệu trả góp để trông thật hào phóng giàu có.", f: "Áp lực giữ hình ảnh bên ngoài bào mòn nền tảng tài chính thật." },
            1: { t: "Tránh gặp gỡ tất cả mọi người vì tự ti chuyện tiền bạc.", f: "Có thể giữ kết nối lành mạnh qua những hoạt động ít tốn kém." }
          }),
          explanation: "Sự tự tin thực sự đến từ giá trị bên trong, không cần chứng minh qua hóa đơn bữa tiệc."
        },
        {
          id: "mm-08",
          dimension: "openness",
          context: "Đầu tư vào bản thân",
          question: "Bạn có sẵn sàng chi tiền cho việc học thêm kỹ năng mới, sách hay hoặc chăm sóc sức khỏe phòng ngừa không?",
          options: scaleOpts({
            4: { t: "Xem tri thức và sức khỏe là tài sản sinh lời cao nhất nên luôn dành ngân sách hợp lý và đầu tư nghiêm túc.", f: "Tư duy tài sản vô hình sắc bén!" },
            3: { t: "Thỉnh thoảng mua khóa học hoặc khám sức khỏe khi thấy công ty hỗ trợ hoặc giảm giá.", f: "Khá hợp lý." },
            2: { t: "Tiết kiệm từng đồng không dám mua sách hay học thêm gì vì tiếc tiền trước mắt.", f: "Tiết kiệm quá mức vào phát triển năng lực làm chậm đà tăng thu nhập dài hạn." },
            1: { t: "Chỉ chi mạnh cho đồ tiêu dùng giảm giá trị nhanh (xe cộ, điện thoại đời mới) chứ hiếm khi chi cho học tập.", f: "Ưu tiên tiêu sản hơn tài sản phát triển bản thân." }
          }),
          explanation: "Năng lực tạo thu nhập và sức khỏe của chính bạn là cỗ máy tài chính quan trọng nhất."
        },
        {
          id: "mm-09",
          dimension: "agreeableness",
          context: "Cho vay và ranh giới tử tế",
          question: "Khi một người thân quen hỏi vay một khoản tiền khá lớn mà bạn biết họ hay chậm trả, bạn ứng xử thế nào?",
          options: scaleOpts({
            4: { t: "Chỉ cho vay hoặc tặng trong ngưỡng tiền mình sẵn sàng mất mà không ảnh hưởng gia đình, kèm thỏa thuận rõ ràng thời hạn hoặc từ chối khéo để giữ tình cảm.", f: "Vừa tử tế vừa giữ ranh giới tài chính thông minh!" },
            3: { t: "Cho mượn đại vì nể mặt rồi thấp thỏm lo lắng suốt nhiều tháng.", f: "Lòng tốt thiếu ranh giới dễ biến tình thân thành oán trách." },
            2: { t: "Chửi mắng họ không biết tự lo thân trước mặt nhiều người.", f: "Từ chối thiếu tế nhị làm tổn thương danh dự đối phương." },
            1: { t: "Vay thẻ tín dụng của mình đưa cho họ mượn để lấy tiếng tốt.", f: "Tự đẩy bản thân vào rủi ro nợ xấu hộ người khác." }
          }),
          explanation: "Giữ ranh giới tài chính rõ ràng là cách bảo vệ tình thân lâu dài nhất."
        },
        {
          id: "mm-10",
          dimension: "extraversion",
          context: "Thương lượng thu nhập/giá trị",
          question: "Khi nhận thấy đóng góp công việc của mình đã tăng rõ rệt trong năm qua, thái độ của bạn với việc trao đổi tăng lương hoặc mở rộng nguồn thu là:",
          options: scaleOpts({
            4: { t: "Chủ động tổng hợp các kết quả đo lường được và đặt lịch trao đổi thẳng thắn, chuyên nghiệp với cấp trên về mức đãi ngộ xứng đáng.", f: "Chủ động khẳng định giá trị bản thân rất tự tin và văn minh!" },
            3: { t: "Ngồi chờ tới đợt đánh giá cuối năm xem sếp có tự nhớ tăng cho không.", f: "Thụ động chờ ghi nhận dễ bị thiệt thòi quyền lợi." },
            2: { t: "Ngại nhắc tới tiền vì sợ bị mang tiếng thực dụng, rồi âm thầm bất mãn đi tìm việc khác.", f: "Không giao tiếp kỳ vọng làm mất cơ hội đôi bên cùng thắng." },
            1: { t: "Đòi tăng lương bằng giọng dọa nghỉ việc dù chưa chuẩn bị số liệu đóng góp.", f: "Đàm phán kiểu tối hậu thư dễ phản tác dụng." }
          }),
          explanation: "Chủ động trình bày giá trị đóng góp bằng dữ liệu là kỹ năng tài chính nghề nghiệp quan trọng."
        }
      ]
    },
    {
      id: "learning-creativity",
      testType: "personality",
      title: "Phong Cách Học Tập, Deep Work & Tư Duy Sáng Tạo",
      shortTitle: "Học Tập & Deep Work",
      category: "personality-mbti",
      categoryLabel: "Khí chất MBTI",
      level: "Ứng dụng",
      durationMinutes: 8,
      icon: "📚",
      accentColor: "#ec4899",
      description:
        "Tìm hiểu cách não bộ bạn tiếp thu kiến thức hiệu quả nhất: khả năng tập trung sâu (Deep Work), kết nối liên ngành sáng tạo và phản xạ ứng dụng thực tế.",
      tags: ["10 câu hỏi", "Học tập & Deep Work", "Tư duy sáng tạo"],
      questions: [
        {
          id: "lc-01",
          dimension: "openness",
          context: "Kết nối đa lĩnh vực",
          question: "Khi đọc một ý tưởng hay trong cuốn sách thuộc ngành khác (ví dụ sinh học, kiến trúc, âm nhạc), bạn thường làm gì?",
          options: scaleOpts({
            4: { t: "Liên tưởng ngay xem nguyên lý đó có thể áp dụng biến tấu thế nào vào công việc hiện tại của mình.", f: "Tư duy liên kết đa ngành — nguồn gốc của sáng tạo đột phá!" },
            3: { t: "Thấy thú vị và ghi chú lại một dòng để nhớ.", f: "Có thói quen lưu giữ tri thức tốt." },
            2: { t: "Đọc cho biết chứ nghĩ ngành khác thì chẳng liên quan gì tới việc của mình.", f: "Đóng khung kiến thức trong từng ngăn riêng biệt." },
            1: { t: "Không bao giờ đọc sách ngoài chuyên ngành hẹp của mình.", f: "Giới hạn nguồn nguyên liệu cho tư duy sáng tạo." }
          }),
          explanation: "Phần lớn các phát minh lớn ra đời từ việc mượn mô hình của lĩnh vực này áp dụng sang lĩnh vực khác."
        },
        {
          id: "lc-02",
          dimension: "conscientiousness",
          context: "Tập trung sâu (Deep Work)",
          question: "Khi cần học hoặc giải quyết một tài liệu khó trong 90 phút, bạn thiết kế môi trường thế nào?",
          options: scaleOpts({
            4: { t: "Bật chế độ Không làm phiền, tắt các tab mạng xã hội, đặt mục tiêu đầu ra rõ ràng và tập trung trọn vẹn một mạch.", f: "Kỷ luật Deep Work đỉnh cao!" },
            3: { t: "Cố gắng làm liên tục nhưng vẫn để chuông thông báo tin nhắn bên cạnh.", f: "Mỗi lần liếc thông báo mất 15–20 phút để não quay lại độ sâu cũ." },
            2: { t: "Vừa đọc tài liệu vừa mở thêm cửa sổ xem video giải trí chạy nền.", f: "Đa nhiệm ảo làm giảm mạnh khả năng ghi nhớ sâu." },
            1: { t: "Cứ 5 phút lại chuyển việc hoặc đứng dậy đi lại vì không ngồi yên nổi.", f: "Cần tập tăng dần ngưỡng tập trung từ 15 phút lên 25 phút." }
          }),
          explanation: "Chiều sâu của tri thức tỷ lệ thuận với số giờ bạn làm việc hoàn toàn không bị phân tâm."
        },
        {
          id: "lc-03",
          dimension: "openness",
          context: "Phương pháp ghi nhớ",
          question: "Cách học nào giúp bạn hiểu sâu và nhớ lâu nhất một khái niệm phức tạp?",
          options: scaleOpts({
            4: { t: "Tự diễn đạt lại khái niệm đó bằng ngôn ngữ đơn giản nhất hoặc vẽ sơ đồ tư duy (Kỹ thuật Feynman).", f: "Phương pháp học chủ động hiệu quả bậc nhất!" },
            3: { t: "Tóm tắt gạch đầu dòng các ý chính vào sổ ghi chú.", f: "Chủ động hệ thống hóa khá tốt." },
            2: { t: "Đọc đi đọc lại đoạn văn bản đó 5 lần và tô bút dạ quang gần hết trang.", f: "Học thụ động dễ tạo ảo giác 'đã biết' mà thực ra mau quên." },
            1: { t: "Học thuộc lòng từng chữ mà không cần hiểu bản chất vì sao lại thế.", f: "Ghi nhớ máy móc dễ bị bí khi đề đổi cách hỏi." }
          }),
          explanation: "Kỹ thuật Feynman chứng minh rằng nếu bạn chưa thể giải thích đơn giản một khái niệm cho người mới hiểu, tức là bạn chưa thực sự hiểu nó."
        },
        {
          id: "lc-04",
          dimension: "extraversion",
          context: "Học qua trao đổi nhóm",
          question: "Sau khi học xong một kỹ năng hoặc đọc xong một cuốn sách hay, bạn củng cố kiến thức bằng cách nào?",
          options: scaleOpts({
            4: { t: "Chủ động chia sẻ tóm tắt hoặc thảo luận tranh biện lại với bạn bè/đồng đội để kiểm tra các góc nhìn mình còn sót.", f: "Học qua giảng dạy và phản biện giúp nhớ tới 90% kiến thức!" },
            3: { t: "Viết một bài cảm nhận ngắn lưu trên blog hoặc ghi chú cá nhân.", f: "Tổng hợp bằng chữ viết rất tốt." },
            2: { t: "Đóng sách cất lên kệ và chuyển sang cuốn mới luôn không trao đổi với ai.", f: "Thiếu bước xuất ra (Output) làm kiến thức dễ trôi." },
            1: { t: "Giữ bí mật riêng không chia sẻ kiến thức hay cho ai vì sợ người khác biết giống mình.", f: "Tư duy khép kín làm mất cơ hội được người khác phản hồi bổ sung." }
          }),
          explanation: "Chia sẻ kiến thức cho người khác buộc não bộ phải sắp xếp lại cấu trúc logic một cách chặt chẽ nhất."
        },
        {
          id: "lc-05",
          dimension: "stability",
          context: "Kiên trì khi học thứ khó",
          question: "Trong tuần đầu tiên học một kỹ năng hoàn toàn mới (lập trình, ngoại ngữ, nhạc cụ), bạn liên tục làm sai và thấy mình chậm chạp. Bạn xử lý cảm giác này ra sao?",
          options: scaleOpts({
            4: { t: "Chấp nhận sự vụng về ban đầu là giai đoạn bắt buộc của đường cong học tập (Learning Curve), giữ nhịp luyện tập 30 phút mỗi ngày.", f: "Tư duy Tăng trưởng (Growth Mindset) vững vàng!" },
            3: { t: "Hơi nản vài hôm nhưng tự nhủ cố thêm 1–2 tuần nữa xem sao.", f: "Kiên trì tốt." },
            2: { t: "Bực bội bỏ ngang vì nghĩ 'mình không có năng khiếu bẩm sinh cho món này rồi'.", f: "Tư duy Cố định (Fixed Mindset) ngăn bạn vượt qua ngưỡng khởi đầu." },
            1: { t: "So sánh bài tập ngày thứ 3 của mình với chuyên gia 10 năm rồi thấy tự ti chán nản.", f: "So sánh thiếu công bằng giết chết niềm vui học tập." }
          }),
          explanation: "Cảm giác 'ngớ ngẩn và chậm chạp' trong những tuần đầu chính là bằng chứng cho thấy các khớp thần kinh mới đang được kết nối."
        },
        {
          id: "lc-06",
          dimension: "conscientiousness",
          context: "Biến kiến thức thành hành động",
          question: "Khi học được một mẹo hay hoặc nguyên tắc hiệu suất từ khóa học, thói quen của bạn là:",
          options: scaleOpts({
            4: { t: "Chọn ngay 1 hành động nhỏ nhất để áp dụng thử trong vòng 24 giờ tới và đo kết quả.", f: "Chuyển hóa tri thức thành năng lực thực chiến cực nhanh!" },
            3: { t: "Lưu vào danh sách 'Sẽ áp dụng sau' khi nào rảnh hơn.", f: "Thư mục 'để sau' thường dễ bị lãng quên." },
            2: { t: "Gật gù thấy rất hay xong hôm sau vẫn làm y như thói quen cũ.", f: "Hiểu lý thuyết nhưng thiếu cơ chế nhắc thực hành." },
            1: { t: "Tiếp tục đi mua thêm 5 khóa học nữa mà chưa áp dụng xong khóa đầu.", f: "Bẫy nghiện tiêu thụ kiến thức (Tutorial Hell)." }
          }),
          explanation: "Kiến thức chỉ thực sự trở thành sức mạnh khi được thử nghiệm bằng hành động nhỏ trong thế giới thực."
        },
        {
          id: "lc-07",
          dimension: "agreeableness",
          context: "Đón nhận góp ý sản phẩm sáng tạo",
          question: "Bạn vẽ một thiết kế hoặc viết một bài tâm huyết, nhưng đồng nghiệp góp ý thẳng rằng bố cục đoạn mở đầu hơi khó hiểu. Bạn tiếp nhận ra sao?",
          options: scaleOpts({
            4: { t: "Cảm ơn góp ý trung thực, hỏi thêm chỗ nào khiến họ khó hiểu để chỉnh sửa phiên bản mượt mà hơn cho người đọc.", f: "Tâm thế cởi mở và hợp tác đáng quý trong sáng tạo!" },
            3: { t: "Nghe xong gật đầu nhưng thầm nghĩ gu họ không hợp tác phẩm của mình.", f: "Bỏ qua góc nhìn người dùng thực tế." },
            2: { t: "Phản ứng phòng vệ giải thích dài dòng rằng họ chưa đọc kỹ nghệ thuật ẩn dụ của mình.", f: "Nếu phải giải thích mới hiểu thì sản phẩm giao tiếp chưa tối ưu." },
            1: { t: "Tự ái giận dỗi xóa bỏ luôn cả bài viết.", f: "Gắn cái tôi quá chặt vào bản nháp đầu tiên." }
          }),
          explanation: "Tác phẩm sáng tạo tốt nhất luôn ra đời từ sự kết hợp giữa cái nhìn say mê của tác giả và phản hồi khách quan của khán giả."
        },
        {
          id: "lc-08",
          dimension: "extraversion",
          context: "Tìm nguồn cảm hứng mới",
          question: "Khi bị bí ý tưởng hoàn toàn (Creative Block) trước màn hình trắng, cách nào giúp bạn khơi thông nhanh nhất?",
          options: scaleOpts({
            4: { t: "Chủ động đi trò chuyện nhanh với 1–2 người ở góc nhìn khác hoặc thay đổi không gian quan sát thế giới xung quanh để nạp chất liệu mới.", f: "Biết chủ động kích thích góc nhìn từ bên ngoài!" },
            3: { t: "Đứng dậy đi bộ 15 phút không nhìn màn hình để não tự kết nối trong nền.", f: "Tuyệt vời! Chế độ mặc định (Default Mode Network) rất hay nảy sáng kiến khi đi bộ." },
            2: { t: "Ngồi lì nhìn chằm chằm màn hình suốt 3 tiếng cho tới lúc kiệt sức.", f: "Ép não lúc kiệt ý tưởng chỉ tăng căng thẳng." },
            1: { t: "Sao chép y nguyên ý tưởng đầu tiên tìm thấy trên mạng cho xong việc.", f: "Đánh mất bản sắc và tư duy độc lập." }
          }),
          explanation: "Sáng tạo là kết quả của sự luân phiên giữa 'nạp chất liệu đa dạng' và 'cho não khoảng lặng ủ ý tưởng'."
        },
        {
          id: "lc-09",
          dimension: "stability",
          context: "Chống chủ nghĩa hoàn hảo tê liệt",
          question: "Bạn định viết một bài chia sẻ hoặc làm một dự án cá nhân, nhưng cứ thấy bản nháp đầu tiên chưa đủ xuất sắc nên chần chừ mãi không xuất bản. Bạn xử lý thế nào?",
          options: scaleOpts({
            4: { t: "Áp dụng nguyên tắc 'Xong trước, hoàn hảo sau' — cho phép bản nháp đầu tiên còn thô ráp ra đời để nhận phản hồi thật rồi nâng cấp dần.", f: "Vượt qua bẫy cầu toàn rất vững vàng!" },
            3: { t: "Sửa đi sửa lại thêm vài tuần tới khi thấy ổn 90% mới dám đăng.", f: "Cẩn trọng tốt nhưng đừng để sự cầu toàn trì hoãn quá lâu." },
            2: { t: "Xóa đi viết lại từ đầu 10 lần vẫn chưa ưng ý nên cất luôn vào thư mục nháp.", f: "Chủ nghĩa hoàn hảo đang ngăn bạn tiến bộ thực tế." },
            1: { t: "Sợ người khác chê cười nên quyết định không bao giờ làm sản phẩm cá nhân nữa.", f: "Nỗi sợ phán xét đánh bại tiềm năng sáng tạo." }
          }),
          explanation: "Phiên bản 1.0 ra mắt được ngoài đời luôn giá trị hơn phiên bản 10.0 hoàn hảo chỉ nằm trong trí tưởng tượng."
        },
        {
          id: "lc-10",
          dimension: "agreeableness",
          context: "Chia sẻ tài nguyên & ghi công",
          question: "Khi sử dụng lại một ý tưởng nền hoặc tài liệu tham khảo hay của đồng nghiệp để phát triển thành giải pháp mới, bạn xử sự thế nào?",
          options: scaleOpts({
            4: { t: "Chủ động ghi rõ nguồn cảm hứng và cảm ơn công sức người đặt nền móng trước mặt mọi người.", f: "Sự hào phóng và liêm chính trí tuệ đáng ngưỡng mộ!" },
            3: { t: "Nhắc sơ qua là mình có tham khảo nhiều nguồn trên mạng.", f: "Nên ghi nhận đích danh nếu có nguồn cụ thể." },
            2: { t: "Coi như toàn bộ ý tưởng từ gốc tới ngọn đều do mình tự nghĩ ra.", f: "Thiếu liêm chính trí tuệ làm mất niềm tin đồng đội." },
            1: { t: "Còn chê ngược bản gốc của họ sơ sài để tôn bản sửa của mình lên.", f: "Phá hủy môi trường cộng tác sáng tạo." }
          }),
          explanation: "Văn hóa ghi công sòng phẳng khuyến khích mọi người trong tập thể sẵn sàng chia sẻ những ý tưởng hay nhất của họ."
        }
      ]
    }
  ];

  // Merge all 11 new tests into window.EQ_DATA.TESTS
  const ALL_EXTRA = DATA.EXTRA_TEMP_TESTS.concat(EXTRA_IQ_TESTS, EXTRA_PERSONALITY_TESTS);
  DATA.TESTS = DATA.TESTS.concat(ALL_EXTRA);
  delete DATA.EXTRA_TEMP_TESTS;
  delete DATA.EXTRA_HELPERS;
})();
