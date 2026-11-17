(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  if (!DATA) {
    throw new Error("EQ_DATA must be loaded before features.js.");
  }

  const STORAGE = {
    STREAK: "eq_compass_streak_v1",
    PLAN_7DAY: "eq_compass_7day_plan_v1",
    BRAIN_GYM: "eq_compass_braingym_v1"
  };

  // ==================== 1. DAILY MIX GENERATOR ====================
  function shuffleArr(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function createRandomMixTest(targetDomain) {
    const domain = ["eq", "iq", "personality"].includes(targetDomain) ? targetDomain : "eq";
    const poolTests = DATA.TESTS.filter((t) => (t.testType || "eq") === domain);
    const dimMap =
      domain === "iq"
        ? DATA.IQ_DIMENSIONS
        : domain === "personality"
          ? DATA.PERSONALITY_DIMENSIONS
          : DATA.DIMENSIONS;
    const dimKeys = Object.keys(dimMap);

    const byDim = {};
    dimKeys.forEach((k) => {
      byDim[k] = [];
    });

    poolTests.forEach((t) => {
      t.questions.forEach((q) => {
        if (byDim[q.dimension]) {
          byDim[q.dimension].push(q);
        }
      });
    });

    const picked = [];
    dimKeys.forEach((k) => {
      const shuffled = shuffleArr(byDim[k]);
      picked.push(...shuffled.slice(0, 2));
    });

    const finalQuestions = shuffleArr(picked);
    const metaByDomain = {
      eq: {
        title: "Đề Ngẫu Nhiên EQ (Daily Mix 10 Câu)",
        shortTitle: "Daily Mix EQ",
        icon: "🎲",
        accentColor: "#6366f1",
        categoryLabel: "Ngẫu nhiên EQ",
        description: "10 tình huống EQ rút ngẫu nhiên (2 câu mỗi trụ cột) từ kho 116 câu EQ."
      },
      iq: {
        title: "Đề Ngẫu Nhiên IQ (Daily Mix 10 Câu)",
        shortTitle: "Daily Mix IQ",
        icon: "🎲",
        accentColor: "#0ea5e9",
        categoryLabel: "Ngẫu nhiên IQ",
        description: "10 câu đố IQ rút ngẫu nhiên (2 câu mỗi năng lực) từ kho 90 câu IQ."
      },
      personality: {
        title: "Đề Ngẫu Nhiên Tính Cách OCEAN (Daily Mix 10 Câu)",
        shortTitle: "Daily Mix OCEAN",
        icon: "🎲",
        accentColor: "#8b5cf6",
        categoryLabel: "Ngẫu nhiên Tính cách",
        description: "10 câu hỏi tính cách rút ngẫu nhiên (2 câu mỗi trục OCEAN) từ kho 70 câu."
      }
    }[domain];

    return {
      id: `mix-${domain}-${Date.now()}`,
      isDailyMix: true,
      testType: domain,
      title: metaByDomain.title,
      shortTitle: metaByDomain.shortTitle,
      category: "mix",
      categoryLabel: metaByDomain.categoryLabel,
      level: "Ngẫu nhiên",
      durationMinutes: 10,
      icon: metaByDomain.icon,
      accentColor: metaByDomain.accentColor,
      description: metaByDomain.description,
      tags: ["10 câu ngẫu nhiên", "Đủ 5 trụ cột", "Mới mỗi lần chơi"],
      questions: finalQuestions
    };
  }

  function rebuildMixTestFromIds(domain, questionIds) {
    const qLookup = new Map();
    DATA.TESTS.forEach((t) => {
      t.questions.forEach((q) => qLookup.set(q.id, q));
    });
    const questions = (questionIds || []).map((id) => qLookup.get(id)).filter(Boolean);
    if (questions.length === 0) return null;
    const base = createRandomMixTest(domain);
    base.id = `mix-${domain}-custom`;
    base.questions = questions;
    return base;
  }

  // ==================== 2. STREAK SYSTEM ====================
  function getLocalDateKey(dateObj) {
    const d = dateObj || new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function loadStreak() {
    let data = { current: 0, best: 0, lastDate: "", totalActivities: 0 };
    try {
      const raw = localStorage.getItem(STORAGE.STREAK);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          data = { ...data, ...parsed };
        }
      }
    } catch (_e) {
      // Ignore
    }

    const today = getLocalDateKey(new Date());
    const yestDate = new Date();
    yestDate.setDate(yestDate.getDate() - 1);
    const yesterday = getLocalDateKey(yestDate);

    if (data.lastDate && data.lastDate !== today && data.lastDate !== yesterday) {
      data.current = 0;
    }
    return data;
  }

  function recordDailyActivity() {
    const data = loadStreak();
    const today = getLocalDateKey(new Date());
    const yestDate = new Date();
    yestDate.setDate(yestDate.getDate() - 1);
    const yesterday = getLocalDateKey(yestDate);

    if (data.lastDate === today) {
      data.totalActivities = (data.totalActivities || 0) + 1;
    } else if (data.lastDate === yesterday) {
      data.current = (data.current || 0) + 1;
      data.best = Math.max(data.best || 0, data.current);
      data.lastDate = today;
      data.totalActivities = (data.totalActivities || 0) + 1;
    } else {
      data.current = 1;
      data.best = Math.max(data.best || 0, 1);
      data.lastDate = today;
      data.totalActivities = (data.totalActivities || 0) + 1;
    }

    try {
      localStorage.setItem(STORAGE.STREAK, JSON.stringify(data));
    } catch (_e) {
      // Ignore
    }
    return data;
  }

  // ==================== 3. ACHIEVEMENT BADGES (8 BADGES) ====================
  function loadBrainGymRecords() {
    const def = { memory: 0, stroop: 0, math: 0 };
    try {
      const raw = localStorage.getItem(STORAGE.BRAIN_GYM);
      if (raw) return { ...def, ...JSON.parse(raw) };
    } catch (_e) {
      // Ignore
    }
    return def;
  }

  function saveBrainGymRecord(gameKey, score) {
    const rec = loadBrainGymRecords();
    const isNewBest = score > (rec[gameKey] || 0);
    if (isNewBest) {
      rec[gameKey] = score;
      try {
        localStorage.setItem(STORAGE.BRAIN_GYM, JSON.stringify(rec));
      } catch (_e) {
        // Ignore
      }
    }
    return { records: rec, isNewBest };
  }

  function computeAchievements(history, streakData, brainGymRecords) {
    const list = history || [];
    const getType = (h) => {
      if (h.testType) return h.testType;
      const found = DATA.TESTS.find((t) => t.id === h.testId);
      return found ? found.testType || "eq" : "eq";
    };
    const eqDone = new Set(list.filter((h) => getType(h) === "eq").map((h) => h.testId));
    const iqItems = list.filter((h) => getType(h) === "iq");
    const persItems = list.filter((h) => getType(h) === "personality");
    const maxIq = iqItems.reduce((m, h) => Math.max(m, h.scoreIndex || h.eqIndex || 0), 0);
    const maxPct = list.reduce((m, h) => Math.max(m, h.pct || 0), 0);
    const hasAllThree = eqDone.size > 0 && iqItems.length > 0 && persItems.length > 0;
    const hasChallengeWin = list.some((h) => h.challengeWon);
    const gymAllPlayed =
      (brainGymRecords.memory || 0) > 0 &&
      (brainGymRecords.stroop || 0) > 0 &&
      (brainGymRecords.math || 0) > 0;

    return [
      {
        id: "first_step",
        icon: "🌱",
        title: "Bước Chân Đầu Tiên",
        desc: "Hoàn thành ít nhất 1 bài trắc nghiệm bất kỳ.",
        unlocked: list.length >= 1
      },
      {
        id: "eq_explorer",
        icon: "🧭",
        title: "Thám Hiểm Cảm Xúc",
        desc: "Hoàn thành tối thiểu 3 bộ đề EQ khác nhau.",
        unlocked: eqDone.size >= 3
      },
      {
        id: "iq_master",
        icon: "🧠",
        title: "Trí Tuệ Sắc Bén",
        desc: "Đạt chỉ số IQ từ 125 trở lên trong một bài thi IQ.",
        unlocked: maxIq >= 125
      },
      {
        id: "ocean_complete",
        icon: "🎭",
        title: "Thấu Hiểu Bản Thân",
        desc: "Hoàn thành ít nhất 1 bài trắc nghiệm Tính cách.",
        unlocked: persItems.length >= 1
      },
      {
        id: "triangle_hero",
        icon: "👑",
        title: "Tam Giác Toàn Tài",
        desc: "Hoàn thành cả 3 mảng: EQ, IQ và Tính cách.",
        unlocked: hasAllThree
      },
      {
        id: "streak_3",
        icon: "🔥",
        title: "Ngọn Lửa Bền Bỉ",
        desc: "Duy trì chuỗi rèn luyện từ 3 ngày trở lên.",
        unlocked: (streakData.best || 0) >= 3
      },
      {
        id: "brain_athlete",
        icon: "🎮",
        title: "Vận Động Viên Não Bộ",
        desc: "Chơi và ghi điểm kỷ lục ở cả 3 mini-game Brain Gym.",
        unlocked: gymAllPlayed
      },
      {
        id: "duelist",
        icon: "⚔️",
        title: "Bản Lĩnh Đỉnh Cao",
        desc: "Thắng 1 trận thách đấu 1v1 hoặc đạt điểm bài thi ≥ 90%.",
        unlocked: hasChallengeWin || maxPct >= 90
      }
    ];
  }

  // ==================== 4. 7-DAY PERSONALIZED PLAN (15 DIMENSIONS) ====================
  const SEVEN_DAY_PLANS = {
    self_awareness: [
      "Ngày 1: Gọi tên chính xác 3 cảm xúc bạn trải qua trong ngày bằng từ cụ thể (thất vọng, nôn nóng, nhẹ nhõm...).",
      "Ngày 2: Ghi lại 1 tình huống làm bạn khó chịu nhất và tách riêng 'Sự kiện thật' khỏi 'Suy diễn trong đầu'.",
      "Ngày 3: Check-in cơ thể 2 lần (trưa & tối): vai có gồng không, nhịp thở nông hay sâu?",
      "Ngày 4: Viết ra 3 giá trị cá nhân quan trọng nhất giúp bạn ra quyết định khi phân vân.",
      "Ngày 5: Quan sát phản xạ phòng vệ của bản thân khi nhận một lời góp ý nhỏ.",
      "Ngày 6: Nhờ 1 người tin cậy chia sẻ 1 điểm mạnh và 1 điểm mù của bạn khi bận rộn.",
      "Ngày 7: Tổng kết tuần: nhận diện khung giờ nào bạn minh mẫn nhất và khung giờ nào dễ cáu nhất."
    ],
    self_regulation: [
      "Ngày 1: Áp dụng quy tắc 'Khoảng dừng 6 giây' trước khi trả lời mọi tin nhắn gây bực mình.",
      "Ngày 2: Tập thở hộp (Box Breathing 4-4-4-4) trong 3 phút giữa buổi chiều căng thẳng.",
      "Ngày 3: Khi thấy nóng mặt, xin tạm hoãn trao đổi 10 phút đi uống nước rồi mới quay lại nói.",
      "Ngày 4: Thử bỏ điện thoại ở phòng khác 30 phút trước giờ ngủ để hạ nhiệt kích thích não.",
      "Ngày 5: Viết nháp câu trả lời giận dữ ra giấy/ghi chú rồi xóa đi trước khi viết bản bình tĩnh để gửi.",
      "Ngày 6: Đối mặt một sự cố nhỏ bất ngờ với câu hỏi: 'Phương án B khả thi ngay lúc này là gì?'",
      "Ngày 7: Tự đánh giá lại 1 tình huống tuần qua mà bạn giữ bình tĩnh tốt hơn trước đây."
    ],
    motivation: [
      "Ngày 1: Viết ra lý do thực sự ('Why') đằng sau mục tiêu bạn đang theo đuổi tuần này.",
      "Ngày 2: Chia 1 công việc bạn đang ngại bắt đầu thành phiên bản siêu nhỏ làm trong đúng 10 phút.",
      "Ngày 3: Khi gặp lỗi, đổi câu hỏi tự trách thành: '1 bài học cụ thể rút ra từ lần này là gì?'",
      "Ngày 4: Ghi nhận 3 chiến thắng vi mô của bản thân trước khi kết thúc ngày làm việc.",
      "Ngày 5: Tối ưu một thao tác lặp đi lặp lại trong công việc để tăng chất lượng đầu ra.",
      "Ngày 6: Học hỏi quy trình thành công của 1 người bạn ngưỡng mộ thay vì tự so sánh áp lực.",
      "Ngày 7: Đặt 1 cột mốc đo lường rõ ràng cho tuần tiếp theo gắn với chuẩn mực cá nhân."
    ],
    empathy: [
      "Ngày 1: Trong 1 cuộc trò chuyện hôm nay, lắng nghe trọn vẹn 2 phút đầu mà không ngắt lời hay khuyên bảo.",
      "Ngày 2: Thực hành câu phản chiếu cảm xúc: 'Nghe có vẻ bạn đang thấy khá áp lực về việc đó...'.",
      "Ngày 3: Quan sát ngôn ngữ cơ thể và tông giọng của người đối diện thay vì chỉ nghe nội dung chữ.",
      "Ngày 4: Khi ai đó nổi nóng vô cớ, tự nhắc: 'Có thể họ đang mang một áp lực không liên quan đến mình'.",
      "Ngày 5: Hỏi thăm riêng 1 người đồng nghiệp/bạn bè gần đây bỗng trở nên ít nói hơn thường lệ.",
      "Ngày 6: Thử bảo vệ góc nhìn của người có ý kiến trái ngược với bạn trong 2 phút để hiểu lý lẽ của họ.",
      "Ngày 7: Gửi 1 tin nhắn cảm ơn chân thành tới một người thân vì điều nhỏ họ làm cho bạn tuần này."
    ],
    social_skills: [
      "Ngày 1: Gửi một lời khen/ghi nhận cụ thể về hành động tốt của đồng nghiệp hoặc người thân.",
      "Ngày 2: Áp dụng thông điệp 'Tôi cảm thấy...' khi nêu một mong muốn thay vì quy chụp 'Bạn luôn...'.",
      "Ngày 3: Thực hành từ chối lịch sự 1 yêu cầu vượt quá quỹ thời gian của bạn kèm phương án thay thế.",
      "Ngày 4: Chủ động bắt chuyện làm quen hoặc kết nối lại với 1 mối quan hệ lâu chưa hỏi thăm.",
      "Ngày 5: Dùng cấu trúc SBI (Tình huống – Hành vi – Tác động) để góp ý xây dựng cho một vấn đề nhỏ.",
      "Ngày 6: Tóm tắt điểm đồng thuận chung trong một cuộc thảo luận nhóm bất đồng ý kiến.",
      "Ngày 7: Rà soát các cam kết thời gian tuần tới và chủ động báo sớm nếu có nguy cơ thay đổi."
    ],
    logical_reasoning: [
      "Ngày 1: Giải 2 câu đố suy luận mệnh đề Nếu–Thì và tập viết phản đảo (Modus Tollens).",
      "Ngày 2: Tập vẽ bảng ma trận loại trừ (✓ / ✕) cho một bài toán ghép cặp 4 đối tượng.",
      "Ngày 3: Đọc một bài báo tranh luận và gạch chân các giả định ngầm tác giả chưa chứng minh.",
      "Ngày 4: Bắt lỗi ít nhất 1 ngụy biện logic (Công kích cá nhân hoặc Người rơm) trong bình luận mạng.",
      "Ngày 5: Giải một câu đố đảo Thật–Dối (Knights & Knaves) bằng phương pháp giả sử phản chứng.",
      "Ngày 6: Luyện đọc kỹ các từ giới hạn: 'tất cả', 'một số', 'chỉ khi', 'ít nhất' trước khi kết luận.",
      "Ngày 7: Tự làm lại một bộ đề IQ Logic trên EQ & IQ Compass để đo mức tăng tốc độ suy luận."
    ],
    numerical_pattern: [
      "Ngày 1: Luyện nhận diện hiệu số bậc 1 và bậc 2 cho 5 dãy số bất kỳ.",
      "Ngày 2: Thực hành tính nhẩm nhanh 5 phép tính tỷ lệ phần trăm tăng–giảm kép trong đầu.",
      "Ngày 3: Ôn công thức vận tốc trung bình hai chiều (trung bình điều hòa) và chuyển động tương đối.",
      "Ngày 4: Giải 3 câu đố quy luật bảng số 3×3 hoặc tam giác số.",
      "Ngày 5: Luyện giải 2 bài toán xác suất cơ bản và kỳ vọng toán học.",
      "Ngày 6: Khi đọc tin tức kinh tế, tập kiểm tra cả số % lẫn số tuyệt đối mẫu số gốc.",
      "Ngày 7: Thi thử lại đề IQ Số học & Xác suất để kiểm chứng độ chính xác."
    ],
    spatial_visual: [
      "Ngày 1: Giải 3 câu ma trận hình học Raven 3×3 bằng cách tách riêng hình dáng – số chấm – góc xoay.",
      "Ngày 2: Tập tưởng tượng xoay 90°/180° một chữ cái bất đối xứng qua trục gương trong đầu.",
      "Ngày 3: Chơi 10 phút game Ma Trận Trí Nhớ (Memory Matrix) trong Brain Gym.",
      "Ngày 4: Giải 2 bài toán gấp khối lập phương từ hình trải phẳng (Cube Net).",
      "Ngày 5: Tập đếm hình tam giác/hình vuông có hệ thống theo từng kích thước và tầng.",
      "Ngày 6: Tự vẽ sơ đồ đường đi ngắn nhất hoặc sơ đồ tư duy không dùng chữ dài.",
      "Ngày 7: Làm lại bộ đề Visual IQ để kiểm tra độ nhạy không gian 2D & 3D."
    ],
    verbal_analytic: [
      "Ngày 1: Luyện 5 cặp từ tương đồng (A : B :: C : ?) bằng cách đặt thành một câu quan hệ chức năng rõ ràng.",
      "Ngày 2: Giải 2 câu mật mã dịch chuyển ký tự (Caesar / Atbash).",
      "Ngày 3: Tóm tắt một bài viết dài 1.000 chữ thành đúng 3 câu súc tích giữ nguyên ý lõi.",
      "Ngày 4: Luyện phân biệt nguyên nhân trực tiếp và tương quan trùng hợp trong 2 tình huống đời thực.",
      "Ngày 5: Tìm 3 cặp khái niệm hay bị dùng nhầm (ví dụ: hiệu quả vs hiệu suất, cần vs đủ).",
      "Ngày 6: Chơi 3 ván Bẫy Màu Chữ Stroop trong Brain Gym để tách xung đột ngữ nghĩa–thị giác.",
      "Ngày 7: Đọc lại phần giải thích các câu Ngôn ngữ & Phản biện để tổng hợp mẫu tư duy."
    ],
    working_memory: [
      "Ngày 1: Khi giải bài toán mẹo (CRT), luôn dừng 3 giây thay ngược kết quả vào đề trước khi chốt.",
      "Ngày 2: Chơi 3 ván Ma Trận Trí Nhớ trong Brain Gym, đặt mục tiêu vượt cấp 4.",
      "Ngày 3: Tập nhẩm chuỗi 5 số ngẫu nhiên rồi đọc ngược lại từ cuối lên đầu.",
      "Ngày 4: Chơi 3 ván Phản Xạ Tính Nhẩm 30 giây trong Brain Gym để tăng tốc xử lý ngắn hạn.",
      "Ngày 5: Luyện giải bài toán tối ưu chia bước (bài toán qua cầu hoặc cân xu chia 3).",
      "Ngày 6: Tắt bớt tab trình duyệt và làm đơn nhiệm một việc khó trong 25 phút liên tục.",
      "Ngày 7: Làm lại đề Test Nhanh IQ 5 Phút và so sánh tốc độ phản xạ."
    ],
    openness: [
      "Ngày 1: Đọc 15 phút về một chủ đề hoàn toàn ngoài chuyên môn quen thuộc của bạn.",
      "Ngày 2: Thử đi một cung đường khác tới nơi làm việc hoặc gọi một món ăn chưa từng thử.",
      "Ngày 3: Khi họp nhóm, đặt một câu hỏi 'Nếu chúng ta thử đảo ngược quy trình này thì sao?'",
      "Ngày 4: Thực hành ghi chú 3 ý tưởng tự do mỗi ngày không phán xét tính khả thi ngay lập tức.",
      "Ngày 5: Áp dụng 1 công cụ AI hoặc phần mềm mới vào một tác vụ nhỏ hằng ngày.",
      "Ngày 6: Trao đổi góc nhìn với 1 người làm ngành nghề khác hẳn bạn.",
      "Ngày 7: Tổng hợp 1 ý tưởng sáng tạo khả thi nhất tuần để thử nghiệm vào tuần sau."
    ],
    conscientiousness: [
      "Ngày 1: Chọn ra đúng 3 việc quan trọng nhất cần xong hôm nay trước khi mở email/mạng xã hội.",
      "Ngày 2: Dọn gọn bàn làm việc và sắp xếp lại 1 thư mục tài liệu lộn xộn trên máy tính.",
      "Ngày 3: Thực hiện 2 phiên làm việc sâu 25 phút (Pomodoro) không chạm điện thoại.",
      "Ngày 4: Hoàn thành một đầu việc nhỏ bị trì hoãn lâu nay trong vòng 15 phút.",
      "Ngày 5: Kiểm tra kỹ 100% lỗi chính tả, số liệu trước khi bấm gửi bất kỳ báo cáo nào.",
      "Ngày 6: Lập quỹ dự phòng/lịch nhắc cho 3 mốc hẹn quan trọng tuần tới.",
      "Ngày 7: Đánh giá tỷ lệ hoàn thành mục tiêu tuần và tinh chỉnh lịch thực tế hơn."
    ],
    extraversion: [
      "Ngày 1: Chủ động mở lời chào ấm áp và hỏi thăm 2 người đồng nghiệp/hàng xóm.",
      "Ngày 2: Đóng góp ít nhất 1 ý kiến xây dựng rõ ràng trong buổi thảo luận nhóm.",
      "Ngày 3: Thiết kế sự cân bằng giữa 1 buổi tương tác nhóm và 1 giờ yên tĩnh nạp năng lượng.",
      "Ngày 4: Chia sẻ 1 bài học hay hoặc thành quả nhỏ với cộng đồng/bạn bè.",
      "Ngày 5: Chuẩn bị trước 2 câu hỏi mở thú vị để kết nối tự nhiên khi gặp người mới.",
      "Ngày 6: Gọi điện trò chuyện chất lượng 15 phút với một người bạn lâu chưa gặp.",
      "Ngày 7: Ghi lại bối cảnh giao tiếp nào khiến bạn thấy tràn đầy năng lượng nhất."
    ],
    agreeableness: [
      "Ngày 1: Thực hiện 1 hành động hỗ trợ nhỏ tự phát cho người xung quanh mà không cần nhờ vả.",
      "Ngày 2: Trước khi phản biện ý kiến ai đó, nói rõ 1 điểm hợp lý trong quan điểm của họ.",
      "Ngày 3: Bao dung bỏ qua 1 sai sót vô ý nhỏ của người phục vụ hoặc đồng nghiệp.",
      "Ngày 4: Luyện nói 'Không' nhẹ nhàng nhưng dứt khoát nếu bị nhờ việc quá sức.",
      "Ngày 5: Ghi công rõ ràng người đã giúp đỡ bạn trong một công việc chung.",
      "Ngày 6: Đặt câu hỏi tìm giải pháp đôi bên cùng thắng trong một bất đồng nhỏ.",
      "Ngày 7: Tự đánh giá cân bằng giữa lòng tốt với người khác và sự chăm sóc chính mình."
    ],
    stability: [
      "Ngày 1: Chia danh sách lo âu thành 2 cột: 'Kiểm soát được' và 'Ngoài tầm kiểm soát'.",
      "Ngày 2: Vận động thể chất nhẹ 20 phút (đi bộ nhanh, giãn cơ) để giải tỏa cortisol.",
      "Ngày 3: Ngừng kiểm tra tin tức tiêu cực hoặc biến động thị trường liên tục mỗi giờ.",
      "Ngày 4: Thực hành viết câu tự trấn an thực tế khi lỡ mắc lỗi nhỏ thay vì tự dằn vặt.",
      "Ngày 5: Dành 15 phút buổi tối viết ra giấy những điều còn lấn cấn để ngủ sâu hơn.",
      "Ngày 6: Giữ nguyên nhịp độ bình tĩnh khi một kế hoạch nhỏ bị trễ hoặc thay đổi phút chót.",
      "Ngày 7: Tổng kết 3 tình huống bạn đã xử lý vững vàng hơn trong tuần qua."
    ]
  };

  function getAllDimensionsList() {
    const out = [];
    Object.values(DATA.DIMENSIONS).forEach((d) => out.push({ ...d, group: "EQ" }));
    Object.values(DATA.IQ_DIMENSIONS).forEach((d) => out.push({ ...d, group: "IQ" }));
    Object.values(DATA.PERSONALITY_DIMENSIONS).forEach((d) => out.push({ ...d, group: "OCEAN" }));
    return out;
  }

  function loadPlanProgress() {
    try {
      const raw = localStorage.getItem(STORAGE.PLAN_7DAY);
      return raw ? JSON.parse(raw) : {};
    } catch (_e) {
      return {};
    }
  }

  function togglePlanDay(dimId, dayIdx) {
    const all = loadPlanProgress();
    if (!Array.isArray(all[dimId])) all[dimId] = [];
    const pos = all[dimId].indexOf(dayIdx);
    if (pos >= 0) all[dimId].splice(pos, 1);
    else all[dimId].push(dayIdx);
    try {
      localStorage.setItem(STORAGE.PLAN_7DAY, JSON.stringify(all));
    } catch (_e) {
      // Ignore
    }
    return all[dimId];
  }

  function drawProgressLineChart(canvas, history, isDark) {
    if (!canvas || !canvas.getContext) return;
    const cssWidth = 660;
    const cssHeight = 230;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = "100%";
    canvas.style.maxWidth = `${cssWidth}px`;
    canvas.style.height = "auto";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const textColor = isDark ? "#cbd5e1" : "#475569";
    const gridColor = isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(100, 116, 139, 0.18)";

    const recent = (history || []).slice(0, 12).reverse();
    if (recent.length === 0) {
      ctx.fillStyle = textColor;
      ctx.font = "600 14px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Chưa có dữ liệu bài thi. Hoàn thành 1 bài để xem biểu đồ tiến bộ!", cssWidth / 2, cssHeight / 2);
      return;
    }

    const padL = 44;
    const padR = 24;
    const padT = 26;
    const padB = 34;
    const plotW = cssWidth - padL - padR;
    const plotH = cssHeight - padT - padB;
    const minY = 50;
    const maxY = 150;

    [60, 80, 100, 120, 140].forEach((val) => {
      const y = padT + plotH - ((val - minY) / (maxY - minY)) * plotH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(cssWidth - padR, y);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = "600 11px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(String(val), padL - 8, y + 4);
    });

    const pts = recent.map((item, idx) => {
      const score = typeof item.scoreIndex === "number" ? item.scoreIndex : item.eqIndex || 100;
      const clamped = Math.min(maxY, Math.max(minY, score));
      const x = recent.length === 1 ? padL + plotW / 2 : padL + (idx / (recent.length - 1)) * plotW;
      const y = padT + plotH - ((clamped - minY) / (maxY - minY)) * plotH;
      return { x, y, score, type: item.testType || "eq" };
    });

    if (pts.length > 1) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, padT + plotH);
      pts.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length - 1].x, padT + plotH);
      ctx.closePath();
      ctx.fillStyle = isDark ? "rgba(99, 102, 241, 0.22)" : "rgba(79, 70, 229, 0.14)";
      ctx.fill();

      ctx.beginPath();
      pts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = isDark ? "#818cf8" : "#4f46e5";
      ctx.lineWidth = 2.8;
      ctx.stroke();
    }

    pts.forEach((p, idx) => {
      const dotColor = p.type === "iq" ? "#0ea5e9" : p.type === "personality" ? "#8b5cf6" : "#10b981";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isDark ? "#111827" : "#ffffff";
      ctx.stroke();

      ctx.fillStyle = isDark ? "#f1f5f9" : "#0f172a";
      ctx.font = "700 11px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(p.score), p.x, p.y - 10);

      ctx.fillStyle = textColor;
      ctx.font = "600 10px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`#${idx + 1}`, p.x, padT + plotH + 18);
    });
  }

  // ==================== 5. BRAIN GYM MINI-GAMES ENGINE ====================
  function createBrainGymController(onRecordActivity) {
    let activeGame = "memory";
    let memState = { level: 1, score: 0, lives: 3, targets: [], found: [], phase: "idle", timer: null };
    let stroopState = { score: 0, combo: 0, timeLeft: 30, running: false, timer: null, currentInkKey: null };
    let mathState = { score: 0, combo: 0, timeLeft: 30, running: false, timer: null, answer: 0 };

    const STROOP_COLORS = [
      { key: "red", name: "ĐỎ", hex: "#ef4444" },
      { key: "blue", name: "XANH DƯƠNG", hex: "#3b82f6" },
      { key: "green", name: "XANH LÁ", hex: "#10b981" },
      { key: "amber", name: "VÀNG", hex: "#f59e0b" },
      { key: "purple", name: "TÍM", hex: "#8b5cf6" }
    ];

    function stopAllTimers() {
      if (memState.timer) { clearTimeout(memState.timer); memState.timer = null; }
      if (stroopState.timer) { clearInterval(stroopState.timer); stroopState.timer = null; }
      if (mathState.timer) { clearInterval(mathState.timer); mathState.timer = null; }
      stroopState.running = false;
      mathState.running = false;
    }

    function updateBestDisplays() {
      const rec = loadBrainGymRecords();
      const elMem = document.getElementById("gym-best-memory");
      const elStr = document.getElementById("gym-best-stroop");
      const elMath = document.getElementById("gym-best-math");
      if (elMem) elMem.textContent = String(rec.memory || 0);
      if (elStr) elStr.textContent = String(rec.stroop || 0);
      if (elMath) elMath.textContent = String(rec.math || 0);
    }

    // --- Memory Matrix ---
    function renderMemoryBoard() {
      const grid = document.getElementById("mem-grid");
      const lvlEl = document.getElementById("mem-level");
      const scoreEl = document.getElementById("mem-score");
      const livesEl = document.getElementById("mem-lives");
      if (!grid) return;

      if (lvlEl) lvlEl.textContent = String(memState.level);
      if (scoreEl) scoreEl.textContent = String(memState.score);
      if (livesEl) livesEl.textContent = "❤️".repeat(Math.max(0, memState.lives)) || "💔";

      grid.innerHTML = "";
      for (let i = 0; i < 16; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mem-cell";
        btn.dataset.cellIdx = String(i);
        if (memState.phase === "memorize" && memState.targets.includes(i)) {
          btn.classList.add("lit");
        } else if (memState.found.includes(i)) {
          btn.classList.add("found");
        }
        grid.appendChild(btn);
      }
    }

    function startMemoryLevel() {
      if (memState.timer) clearTimeout(memState.timer);
      const count = Math.min(9, 2 + memState.level);
      const indices = shuffleArr(Array.from({ length: 16 }, (_, i) => i)).slice(0, count);
      memState.targets = indices;
      memState.found = [];
      memState.phase = "memorize";
      const statusEl = document.getElementById("mem-status");
      if (statusEl) statusEl.textContent = `Ghi nhớ ${count} ô màu xanh trong 1,2 giây...`;
      renderMemoryBoard();

      memState.timer = setTimeout(() => {
        memState.phase = "recall";
        if (statusEl) statusEl.textContent = `Bấm lại đúng ${count} ô vừa sáng!`;
        renderMemoryBoard();
      }, 1200);
    }

    function startMemoryGame() {
      memState = { level: 1, score: 0, lives: 3, targets: [], found: [], phase: "idle", timer: null };
      startMemoryLevel();
    }

    function handleMemoryCellClick(cellIdx) {
      if (memState.phase !== "recall") return;
      if (memState.found.includes(cellIdx)) return;

      const statusEl = document.getElementById("mem-status");
      if (memState.targets.includes(cellIdx)) {
        memState.found.push(cellIdx);
        memState.score += 20 * memState.level;
        renderMemoryBoard();
        if (memState.found.length === memState.targets.length) {
          memState.level += 1;
          saveBrainGymRecord("memory", memState.score);
          updateBestDisplays();
          if (typeof onRecordActivity === "function") onRecordActivity();
          if (statusEl) statusEl.textContent = `Tuyệt vời! Chuẩn bị lên Cấp ${memState.level}...`;
          memState.phase = "pause";
          memState.timer = setTimeout(startMemoryLevel, 650);
        }
      } else {
        memState.lives -= 1;
        const { isNewBest } = saveBrainGymRecord("memory", memState.score);
        updateBestDisplays();
        renderMemoryBoard();
        if (memState.lives <= 0) {
          memState.phase = "over";
          if (typeof onRecordActivity === "function") onRecordActivity();
          if (statusEl) {
            statusEl.textContent = `Hết lượt! Tổng điểm: ${memState.score}${isNewBest ? " (Kỷ lục mới!)" : ""}. Bấm Bắt đầu lại để chơi tiếp.`;
          }
        } else if (statusEl) {
          statusEl.textContent = `Nhầm ô rồi! Còn ${memState.lives} tim — chọn tiếp các ô đúng.`;
        }
      }
    }

    // --- Stroop Test ---
    function nextStroopRound() {
      const wordObj = STROOP_COLORS[Math.floor(Math.random() * STROOP_COLORS.length)];
      let inkObj = STROOP_COLORS[Math.floor(Math.random() * STROOP_COLORS.length)];
      if (inkObj.key === wordObj.key) {
        inkObj = STROOP_COLORS[(STROOP_COLORS.indexOf(wordObj) + 1) % STROOP_COLORS.length];
      }
      stroopState.currentInkKey = inkObj.key;

      const wordEl = document.getElementById("stroop-word");
      if (wordEl) {
        wordEl.textContent = wordObj.name;
        wordEl.style.color = inkObj.hex;
      }
      const optsEl = document.getElementById("stroop-options");
      if (optsEl) {
        optsEl.innerHTML = STROOP_COLORS.map(
          (c) => `<button type="button" class="stroop-btn" data-stroop-key="${c.key}" style="border-color:${c.hex};">${c.name}</button>`
        ).join("");
      }
    }

    function updateStroopStats() {
      const s = document.getElementById("stroop-score");
      const t = document.getElementById("stroop-timer");
      const c = document.getElementById("stroop-combo");
      if (s) s.textContent = String(stroopState.score);
      if (t) t.textContent = `${stroopState.timeLeft}s`;
      if (c) c.textContent = `x${Math.min(4, 1 + Math.floor(stroopState.combo / 3))}`;
    }

    function startStroopGame() {
      if (stroopState.timer) clearInterval(stroopState.timer);
      stroopState = { score: 0, combo: 0, timeLeft: 30, running: true, timer: null, currentInkKey: null };
      const statusEl = document.getElementById("stroop-status");
      if (statusEl) statusEl.textContent = "Chọn đúng MÀU MỰC đang tô chữ (đừng đọc nghĩa chữ)!";
      updateStroopStats();
      nextStroopRound();

      stroopState.timer = setInterval(() => {
        stroopState.timeLeft = Math.max(0, stroopState.timeLeft - 1);
        updateStroopStats();
        if (stroopState.timeLeft === 0) {
          clearInterval(stroopState.timer);
          stroopState.timer = null;
          stroopState.running = false;
          const { isNewBest } = saveBrainGymRecord("stroop", stroopState.score);
          updateBestDisplays();
          if (typeof onRecordActivity === "function") onRecordActivity();
          if (statusEl) {
            statusEl.textContent = `Hết giờ! Bạn đạt ${stroopState.score} điểm${isNewBest ? " (Kỷ lục mới!)" : ""}.`;
          }
        }
      }, 1000);
    }

    function handleStroopChoice(key) {
      if (!stroopState.running) return;
      if (key === stroopState.currentInkKey) {
        stroopState.combo += 1;
        const mult = Math.min(4, 1 + Math.floor(stroopState.combo / 3));
        stroopState.score += 10 * mult;
      } else {
        stroopState.combo = 0;
        stroopState.score = Math.max(0, stroopState.score - 5);
      }
      updateStroopStats();
      nextStroopRound();
    }

    // --- Speed Math ---
    function nextMathRound() {
      const ops = ["+", "-", "×"];
      const op = ops[Math.floor(Math.random() * ops.length)];
      let a = 0;
      let b = 0;
      let ans = 0;
      if (op === "+") {
        a = 12 + Math.floor(Math.random() * 48);
        b = 11 + Math.floor(Math.random() * 39);
        ans = a + b;
      } else if (op === "-") {
        a = 25 + Math.floor(Math.random() * 65);
        b = 8 + Math.floor(Math.random() * (a - 10));
        ans = a - b;
      } else {
        a = 4 + Math.floor(Math.random() * 12);
        b = 3 + Math.floor(Math.random() * 11);
        ans = a * b;
      }
      mathState.answer = ans;

      const qEl = document.getElementById("math-question");
      if (qEl) qEl.textContent = `${a} ${op} ${b} = ?`;

      const choices = new Set([ans]);
      const offsets = [-10, -4, -2, -1, 1, 2, 4, 10];
      while (choices.size < 4) {
        const delta = offsets[Math.floor(Math.random() * offsets.length)];
        const cand = ans + delta;
        if (cand >= 0) choices.add(cand);
      }
      const opts = shuffleArr([...choices]);
      const optsEl = document.getElementById("math-options");
      if (optsEl) {
        optsEl.innerHTML = opts
          .map((v) => `<button type="button" class="math-opt-btn" data-math-val="${v}">${v}</button>`)
          .join("");
      }
    }

    function updateMathStats() {
      const s = document.getElementById("math-score");
      const t = document.getElementById("math-timer");
      const c = document.getElementById("math-combo");
      if (s) s.textContent = String(mathState.score);
      if (t) t.textContent = `${mathState.timeLeft}s`;
      if (c) c.textContent = `x${Math.min(4, 1 + Math.floor(mathState.combo / 3))}`;
    }

    function startMathGame() {
      if (mathState.timer) clearInterval(mathState.timer);
      mathState = { score: 0, combo: 0, timeLeft: 30, running: true, timer: null, answer: 0 };
      const statusEl = document.getElementById("math-status");
      if (statusEl) statusEl.textContent = "Tính nhanh nhất có thể trong 30 giây!";
      updateMathStats();
      nextMathRound();

      mathState.timer = setInterval(() => {
        mathState.timeLeft = Math.max(0, mathState.timeLeft - 1);
        updateMathStats();
        if (mathState.timeLeft === 0) {
          clearInterval(mathState.timer);
          mathState.timer = null;
          mathState.running = false;
          const { isNewBest } = saveBrainGymRecord("math", mathState.score);
          updateBestDisplays();
          if (typeof onRecordActivity === "function") onRecordActivity();
          if (statusEl) {
            statusEl.textContent = `Hết giờ! Bạn đạt ${mathState.score} điểm${isNewBest ? " (Kỷ lục mới!)" : ""}.`;
          }
        }
      }, 1000);
    }

    function handleMathChoice(val) {
      if (!mathState.running) return;
      if (Number(val) === mathState.answer) {
        mathState.combo += 1;
        const mult = Math.min(4, 1 + Math.floor(mathState.combo / 3));
        mathState.score += 15 * mult;
      } else {
        mathState.combo = 0;
        mathState.score = Math.max(0, mathState.score - 5);
      }
      updateMathStats();
      nextMathRound();
    }

    function switchGame(tabKey) {
      activeGame = tabKey;
      ["memory", "stroop", "math"].forEach((k) => {
        const panel = document.getElementById(`gym-panel-${k}`);
        if (panel) panel.classList.toggle("hidden", k !== tabKey);
      });
      const tabs = document.querySelectorAll("[data-gym-tab]");
      tabs.forEach((b) => b.classList.toggle("active", b.dataset.gymTab === tabKey));
    }

    return {
      stopAllTimers,
      updateBestDisplays,
      switchGame,
      startMemoryGame,
      handleMemoryCellClick,
      startStroopGame,
      handleStroopChoice,
      startMathGame,
      handleMathChoice,
      getActiveGame: () => activeGame
    };
  }

  window.EQ_FEATURES = {
    createRandomMixTest,
    rebuildMixTestFromIds,
    loadStreak,
    recordDailyActivity,
    loadBrainGymRecords,
    computeAchievements,
    SEVEN_DAY_PLANS,
    getAllDimensionsList,
    loadPlanProgress,
    togglePlanDay,
    drawProgressLineChart,
    createBrainGymController
  };
})();
