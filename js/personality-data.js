(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  if (!DATA) {
    throw new Error("EQ_DATA must be loaded before personality-data.js.");
  }

  const PERSONALITY_DIMENSIONS = {
    openness: {
      id: "openness",
      name: "Cởi mở & Sáng tạo (Openness)",
      shortName: "Cởi mở Sáng tạo",
      icon: "🎨",
      color: "#8b5cf6",
      description:
        "Mức độ tò mò trí tuệ, trí tưởng tượng, sẵn sàng thử nghiệm cái mới và khả năng nhìn nhận vấn đề từ nhiều góc độ phi truyền thống.",
      evaluations: {
        high: "Bạn sở hữu trí tò mò mạnh mẽ và tư duy đa chiều. Bạn hứng thú với ý tưởng mới, nghệ thuật, công nghệ đột phá và ít bị bó buộc bởi lối mòn cũ.",
        medium: "Bạn biết cân bằng giữa sự đổi mới và tính thực tế. Bạn sẵn sàng tiếp thu cách làm mới khi thấy rõ lợi ích thiết thực nhưng vẫn trân trọng giá trị quen thuộc.",
        low: "Bạn thuộc tuýp thực tế, chuộng sự rõ ràng, cụ thể và các quy trình đã được kiểm chứng. Bạn phát huy tốt nhất trong môi trường có cấu trúc ổn định."
      },
      tips: [
        "Mỗi tuần thử đọc hoặc tìm hiểu 1 chủ đề nằm ngoài chuyên môn quen thuộc của bạn trong 20 phút.",
        "Khi brainstorm ý tưởng, hãy tách riêng giai đoạn 'tạo ý tưởng tự do' khỏi giai đoạn 'đánh giá tính khả thi'.",
        "Kết hợp với người có tính Tận tâm cao để biến các ý tưởng bay bổng thành kế hoạch triển khai cụ thể."
      ]
    },
    conscientiousness: {
      id: "conscientiousness",
      name: "Tận tâm & Kỷ luật (Conscientiousness)",
      shortName: "Tận tâm Kỷ luật",
      icon: "📋",
      color: "#0ea5e9",
      description:
        "Mức độ ngăn nắp, tinh thần trách nhiệm, khả năng lập kế hoạch dài hạn, giữ cam kết và theo đuổi mục tiêu đến cùng.",
      evaluations: {
        high: "Bạn cực kỳ đáng tin cậy, làm việc có hệ thống, giữ đúng hạn và luôn chủ động dự phòng rủi ro trước khi sự cố xảy ra.",
        medium: "Bạn hoàn thành tốt các trách nhiệm quan trọng và có kế hoạch cơ bản, dù đôi lúc vẫn để cảm hứng nhất thời làm xáo trộn lịch trình.",
        low: "Bạn thích sự linh hoạt tự phát hơn là lịch trình cứng nhắc. Tuy nhiên việc thiếu hệ thống nhắc việc dễ khiến bạn bỏ lỡ chi tiết hoặc nước đến chân mới nhảy."
      },
      tips: [
        "Áp dụng quy tắc '3 việc tối quan trọng' vào mỗi sáng thay vì ôm đồm danh sách dài bất tận.",
        "Đặt lịch nhắc cố định và chia nhỏ các đầu việc lớn thành khối 25 phút tập trung (Pomodoro).",
        "Cho phép bản thân một khoảng trống linh hoạt 15% trong lịch tuần để tránh bị căng cứng khi có biến cố."
      ]
    },
    extraversion: {
      id: "extraversion",
      name: "Hướng ngoại & Năng lượng Xã hội (Extraversion)",
      shortName: "Năng lượng Xã hội",
      icon: "⚡",
      color: "#f59e0b",
      description:
        "Xu hướng nạp năng lượng qua giao tiếp, sự chủ động dẫn dắt bầu không khí, tinh thần lạc quan và khả năng thể hiện bản thân trước tập thể.",
      evaluations: {
        high: "Bạn giàu năng lượng tương tác, dễ dàng kết nối với người lạ, thích làm việc nhóm sôi nổi và thường tự nhiên trở thành tâm điểm khuấy động tập thể.",
        medium: "Bạn mang nét 'Hướng trung' (Ambivert) linh hoạt: giao tiếp tốt khi công việc yêu cầu nhưng vẫn cần khoảng lặng riêng để suy ngẫm sâu.",
        low: "Bạn mang thiên hướng Hướng nội sâu sắc: lắng nghe kỹ, suy nghĩ thấu đáo trước khi nói và nạp lại năng lượng hiệu quả nhất trong không gian yên tĩnh."
      },
      tips: [
        "Tận dụng thế mạnh nhịp độ tự nhiên: nếu hướng nội, hãy chuẩn bị trước 2–3 ý chính trước cuộc họp; nếu hướng ngoại, hãy chú ý dành khoảng lặng cho người trầm hơn lên tiếng.",
        "Thiết kế lịch ngày xen kẽ giữa các khung giờ tương tác và khung giờ làm việc sâu (Deep Work).",
        "Chủ động duy trì 3–5 mối quan hệ chất lượng cao thay vì chỉ mở rộng kết nối bề mặt."
      ]
    },
    agreeableness: {
      id: "agreeableness",
      name: "Hòa đồng & Hợp tác (Agreeableness)",
      shortName: "Hòa đồng Hợp tác",
      icon: "🌿",
      color: "#10b981",
      description:
        "Thiện chí tin tưởng con người, sự tử tế, sẵn lòng hỗ trợ đồng đội và xu hướng tìm giải pháp hài hòa thay vì đối đầu gay gắt.",
      evaluations: {
        high: "Bạn ấm áp, giàu thiện chí và tạo được lòng tin nhanh chóng. Đồng đội luôn cảm thấy an tâm khi hợp tác cùng bạn.",
        medium: "Bạn biết giữ thái độ hợp tác và tôn trọng người khác nhưng vẫn sẵn sàng tranh luận thẳng thắn để bảo vệ nguyên tắc khi cần thiết.",
        low: "Bạn có cá tính độc lập, thẳng thắn, coi trọng sự thật khách quan và cạnh tranh công bằng hơn là giữ hòa khí bề mặt."
      },
      tips: [
        "Nếu chỉ số này rất cao, hãy luyện kỹ năng nói 'Không' sớm để tránh bị lợi dụng lòng tốt hoặc ôm việc quá sức.",
        "Nếu chỉ số này thấp hơn, hãy thêm một câu ghi nhận thiện chí của đối phương trước khi phản biện trực diện.",
        "Phân biệt giữa 'cứng rắn với vấn đề cần giải quyết' và 'mềm mỏng với con người'."
      ]
    },
    stability: {
      id: "stability",
      name: "Vững vàng & Điềm tĩnh (Emotional Stability)",
      shortName: "Vững vàng Tâm lý",
      icon: "🛡️",
      color: "#6366f1",
      description:
        "Khả năng giữ thăng bằng tâm lý trước biến động, ít bị chi phối bởi lo âu kéo dài, sự tự tin ổn định và tốc độ phục hồi cảm xúc.",
      evaluations: {
        high: "Bạn có nội tâm vững chãi, ít hoảng loạn khi khủng hoảng ập đến và đóng vai trò điểm tựa bình tĩnh cho tập thể.",
        medium: "Bạn giữ được cân bằng trong nhịp sống bình thường, nhưng trước những thay đổi đột ngột hoặc áp lực đánh giá cao, bạn vẫn cần thời gian để ổn định lại.",
        low: "Bạn có độ nhạy cảm cao với rủi ro và lời nhận xét xung quanh, dễ trăn trở lo âu. Điểm cộng của độ nhạy này là bạn rất cẩn trọng và sâu sắc nếu biết cách xả stress."
      },
      tips: [
        "Tách các lo lắng thành 2 cột: 'Kiểm soát được hôm nay' (hành động ngay) và 'Ngoài tầm kiểm soát' (tạm buông).",
        "Duy trì vận động thể chất nhẹ 20 phút mỗi ngày để giải phóng căng thẳng tích tụ trong hệ thần kinh.",
        "Thực hành tự đối thoại tích cực khi mắc lỗi thay vì chỉ trích bản thân khắc nghiệt."
      ]
    }
  };

  const PERSONALITY_LEVELS = [
    {
      id: "p_master",
      minPct: 85,
      eqRange: "130 – 145",
      badge: "Cấp độ 5/5 • Cân bằng Toàn diện",
      title: "Nhân Cách Trưởng Thành, Chủ Động & Tương Thích Cao",
      color: "#10b981",
      summary:
        "Hồ sơ tính cách của bạn cho thấy sự phát triển hài hòa hiếm có giữa tính kỷ luật, khả năng sáng tạo, tinh thần hợp tác và sự vững vàng tâm lý.",
      advice:
        "Bạn có thể thích nghi mượt mà trong nhiều vai trò từ chuyên gia độc lập đến quản lý đội nhóm. Hãy dựa vào Hình mẫu & Top ngành nghề gợi ý bên dưới để tối đa hóa thế mạnh tự nhiên của bạn."
    },
    {
      id: "p_high",
      minPct: 72,
      eqRange: "115 – 129",
      badge: "Cấp độ 4/5 • Bản sắc Rõ nét",
      title: "Phong Cách Cá Nhân Vững Vàng & Định Hướng Rõ Ràng",
      color: "#6366f1",
      summary:
        "Bạn hiểu rõ phong cách làm việc của mình và phát huy tốt các trục tính cách chủ đạo. Trong môi trường phù hợp, hiệu suất và sự gắn kết của bạn rất nổi bật.",
      advice:
        "Hãy tiếp tục đầu tư vào 2 trục tính cách mạnh nhất của bạn — đó là lợi thế cạnh tranh tự nhiên — đồng thời chú ý cân bằng trục có điểm thấp nhất để tránh điểm mù."
    },
    {
      id: "p_moderate",
      minPct: 56,
      eqRange: "100 – 114",
      badge: "Cấp độ 3/5 • Linh hoạt Thích nghi",
      title: "Tính Cách Đa Chiều, Cân Bằng Giữa Các Thái Cực",
      color: "#0ea5e9",
      summary:
        "Bạn không bị cực đoan ở một thái cực nào mà có xu hướng điều chỉnh hành vi tùy theo bối cảnh công việc và nhóm người xung quanh.",
      advice:
        "Tính linh hoạt giúp bạn làm cầu nối tốt giữa nhiều kiểu người khác nhau. Chọn môi trường công việc cho phép bạn vừa có quy trình rõ ràng vừa có không gian chủ động."
    },
    {
      id: "p_developing",
      minPct: 40,
      eqRange: "85 – 99",
      badge: "Cấp độ 2/5 • Thiên hướng Tự phát",
      title: "Cảm Tính Linh Hoạt, Cần Thêm Cấu Trúc Hỗ Trợ",
      color: "#f59e0b",
      summary:
        "Bạn thường hành động theo cảm hứng và trạng thái tức thời hơn là kế hoạch cố định. Điều này giúp bạn tự nhiên nhưng dễ mệt mỏi trong môi trường kỷ luật khắt khe.",
      advice:
        "Không có tính cách nào là 'xấu' — điều quan trọng là thiết kế thói quen nhắc việc nhẹ nhàng và chọn công việc phù hợp nhịp độ tự nhiên của bạn."
    },
    {
      id: "p_foundation",
      minPct: 0,
      eqRange: "60 – 84",
      badge: "Cấp độ 1/5 • Nhạy cảm & Cần điểm tựa",
      title: "Đang Tìm Kiếm Sự Ổn Định & Nhịp Điệu Riêng",
      color: "#ef4444",
      summary:
        "Bạn có xu hướng dè dặt trước thay đổi mới, dễ căng thẳng trước áp lực và thích giữ khoảng cách an toàn. Việc thiết lập thói quen nhỏ hằng ngày sẽ giúp bạn tự tin hơn nhiều.",
      advice:
        "Hãy bắt đầu từ môi trường ít biến động, chia nhỏ mục tiêu và hợp tác với những người bạn đồng hành đáng tin cậy để xây dựng từng cột mốc vững chắc."
    }
  ];

  // Keyed by alphabetically sorted top-2 dimensions: "dimA+dimB"
  const PERSONALITY_ARCHETYPES = {
    "conscientiousness+openness": {
      name: "Kiến Trúc Sư Chiến Lược",
      mbtiHint: "INTJ / ENTP",
      summary: "Vừa có tầm nhìn sáng tạo đột phá, vừa đủ kỷ luật để biến ý tưởng phức tạp thành hệ thống thực tế.",
      careers: ["Quản trị sản phẩm (Product Manager)", "Kiến trúc sư hệ thống / Phần mềm", "Chiến lược gia kinh doanh", "Nghiên cứu R&D"]
    },
    "extraversion+openness": {
      name: "Nhà Khởi Xướng Truyền Cảm Hứng",
      mbtiHint: "ENFP / ENTP",
      summary: "Tràn đầy ý tưởng mới mẻ và khả năng kết nối con người để biến tầm nhìn thành phong trào sôi nổi.",
      careers: ["Giám đốc Sáng tạo / Marketing", "Khởi nghiệp & Phát triển đối tác", "Đào tạo & Diễn giả", "Truyền thông đa phương tiện"]
    },
    "agreeableness+openness": {
      name: "Nhà Sáng Tạo Nhân Văn",
      mbtiHint: "INFP / INFJ",
      summary: "Kết hợp giữa trí tưởng tượng phong phú và trái tim thấu cảm sâu sắc với giá trị con người.",
      careers: ["Thiết kế trải nghiệm (UX/UI)", "Tâm lý học & Khai vấn (Coaching)", "Biên kịch / Sáng tác nội dung", "Giáo dục sáng tạo"]
    },
    "openness+stability": {
      name: "Nhà Tư Duy Độc Lập & Sâu Sắc",
      mbtiHint: "INTP / INFJ",
      summary: "Giữ được cái đầu lạnh và sự điềm tĩnh khi khám phá những bài toán mới mẻ, phức tạp hoặc chưa có tiền lệ.",
      careers: ["Khoa học dữ liệu & AI", "Tư vấn chiến lược độc lập", "Thiết kế kiến trúc / Nghệ thuật số", "Phân tích đầu tư"]
    },
    "conscientiousness+extraversion": {
      name: "Nhà Điều Hành Quyết Đoán",
      mbtiHint: "ENTJ / ESTJ",
      summary: "Mạnh mẽ trong việc tổ chức nguồn lực, dẫn dắt đội ngũ tiến về mục tiêu rõ ràng với tốc độ cao.",
      careers: ["Quản lý dự án (PMO) / Vận hành", "Lãnh đạo kinh doanh (Sales Lead)", "Quản trị doanh nghiệp", "Tổ chức sự kiện quy mô lớn"]
    },
    "agreeableness+conscientiousness": {
      name: "Người Dẫn Dắt Tận Tụy & Chuẩn Mực",
      mbtiHint: "ISFJ / ESFJ",
      summary: "Đáng tin cậy tuyệt đối, luôn giữ đúng cam kết đồng thời chăm lo tinh tế tới sự gắn kết của từng thành viên.",
      careers: ["Quản trị Nhân sự (HRBP)", "Chăm sóc khách hàng cao cấp", "Quản lý chất lượng / Giáo dục", "Điều phối cộng đồng"]
    },
    "conscientiousness+stability": {
      name: "Chiến Lược Gia Bản Lĩnh",
      mbtiHint: "ISTJ / ESTJ",
      summary: "Điềm tĩnh như tảng đá giữa khủng hoảng, làm việc bài bản, chính xác và không bao giờ bỏ dở trách nhiệm.",
      careers: ["Tài chính – Kiểm toán", "Kỹ sư hệ thống / An ninh mạng", "Luật & Tuân thủ", "Quản lý chuỗi cung ứng"]
    },
    "agreeableness+extraversion": {
      name: "Đại Sứ Kết Nối Cộng Đồng",
      mbtiHint: "ENFJ / ESFJ",
      summary: "Tỏa năng lượng ấm áp tự nhiên, có tài gắn kết các nhóm người khác biệt thành tập thể đồng lòng.",
      careers: ["Quan hệ công chúng (PR)", "Quản lý đối tác & Khách hàng", "Lãnh đạo đội nhóm / HR", "Tư vấn hướng nghiệp"]
    },
    "extraversion+stability": {
      name: "Thủ Lĩnh Năng Động Vững Vàng",
      mbtiHint: "ESTP / ENTJ",
      summary: "Dám dấn thân vào môi trường áp lực cao, phản ứng nhanh, tự tin đàm phán và truyền sự an tâm cho đồng đội.",
      careers: ["Phát triển thị trường (BD)", "Quản trị khủng hoảng & Truyền thông", "Kinh doanh Bất động sản / Tài chính", "Điều phối hiện trường"]
    },
    "agreeableness+stability": {
      name: "Chuyên Gia Điểm Tựa & Hòa Giải",
      mbtiHint: "ISFP / INFJ",
      summary: "Điềm đạm, bao dung và kiên nhẫn lắng nghe; luôn mang lại cảm giác an toàn tâm lý cho những người xung quanh.",
      careers: ["Tham vấn tâm lý / Công tác xã hội", "Y tế & Chăm sóc sức khỏe", "Giảng dạy & Mentor", "Nghiên cứu trải nghiệm người dùng"]
    }
  };

  function getPersonalityArchetype(dimensionsList) {
    const sorted = dimensionsList.slice().sort((a, b) => b.pct - a.pct);
    const top1 = sorted[0];
    const top2 = sorted[1];
    const key = [top1.id, top2.id].sort().join("+");
    return PERSONALITY_ARCHETYPES[key] || PERSONALITY_ARCHETYPES["conscientiousness+openness"];
  }

  // Helper to build 4 balanced options with varied order per question index
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

  let pSeq = 0;
  function pOpts(byScoreMap) {
    const order = PERMS[pSeq % PERMS.length];
    pSeq++;
    return order.map((sc) => ({
      text: byScoreMap[sc].t,
      score: sc,
      feedback: byScoreMap[sc].f
    }));
  }

  const PERSONALITY_TESTS = [
    {
      id: "ocean-bigfive",
      testType: "personality",
      title: "Khám Phá Tính Cách Chuẩn Big Five (Mô Hình OCEAN)",
      shortTitle: "Tính Cách Big Five (OCEAN)",
      category: "personality-ocean",
      categoryLabel: "Big Five OCEAN",
      level: "Tiêu chuẩn",
      durationMinutes: 10,
      icon: "🎭",
      accentColor: "#8b5cf6",
      description:
        "Bài đánh giá tính cách chuẩn tâm lý học hiện đại theo 5 trục OCEAN (Cởi mở, Tận tâm, Hướng ngoại, Hòa đồng, Vững vàng) kèm Hình mẫu & Top ngành nghề hợp nhất.",
      tags: ["15 câu hỏi", "Mô hình OCEAN", "Định vị Hình mẫu"],
      questions: [
        {
          id: "oc-01",
          dimension: "openness",
          context: "Tiếp cận cái mới",
          question: "Khi có một công cụ hoặc phương pháp làm việc hoàn toàn mới xuất hiện trong ngành của bạn, phản ứng tự nhiên của bạn là gì?",
          options: pOpts({
            4: { t: "Hào hứng tải về thử nghiệm ngay cuối tuần để khám phá xem nó mở ra khả năng mới nào.", f: "Chỉ số Cởi mở rất cao! Bạn yêu thích khám phá và cập nhật xu hướng sớm." },
            3: { t: "Đọc qua đánh giá tổng quan, nếu thấy hữu ích thật sự thì chủ động học áp dụng dần.", f: "Cởi mở có chọn lọc và thực tế." },
            2: { t: "Đợi đồng nghiệp dùng ổn định vài tháng rồi mới xem xét học theo.", f: "Thận trọng với cái mới, ưu tiên tính an toàn." },
            1: { t: "Thấy phiền phức vì phải thay đổi thói quen cũ vốn đang làm quen tay.", f: "Xu hướng ưa ổn định truyền thống, ngại thay đổi đột ngột." }
          }),
          explanation: "Trục Openness (Cởi mở) đo mức độ sẵn sàng bước ra khỏi vùng an toàn để thử nghiệm ý tưởng, công cụ và trải nghiệm mới."
        },
        {
          id: "oc-02",
          dimension: "openness",
          context: "Sở thích trí tuệ",
          question: "Khi rảnh rỗi 1 tiếng, bạn thường bị thu hút bởi hoạt động nào nhất?",
          options: pOpts({
            4: { t: "Đọc hoặc xem về một lĩnh vực hoàn toàn mới mẻ (triết học, nghệ thuật, công nghệ tương lai) và liên hệ với cuộc sống.", f: "Trí tò mò trí tuệ phong phú và tư duy liên ngành." },
            3: { t: "Tìm hiểu sâu hơn một mẹo hay hoặc kỹ năng mới bổ trợ cho sở thích hiện tại.", f: "Tinh thần học hỏi tốt và hướng tới ứng dụng." },
            2: { t: "Xem lại các nội dung giải trí quen thuộc để thư giãn đầu óc, không phải nghĩ ngợi nhiều.", f: "Nhu cầu nghỉ ngơi nhẹ nhàng, ít tìm kiếm kích thích trí tuệ mới." },
            1: { t: "Chủ yếu nghỉ ngơi thụ động hoặc lướt tin vặt, ít khi tò mò về các chủ đề trừu tượng.", f: "Thiên về lối sống thực tế đơn giản hơn là suy tư trừu tượng." }
          }),
          explanation: "Người có Openness cao thường tìm kiếm sự phong phú về mặt ý tưởng và thích các chủ đề mở rộng góc nhìn."
        },
        {
          id: "oc-03",
          dimension: "openness",
          context: "Giải quyết bài toán mở",
          question: "Khi gặp một vấn đề chưa có hướng dẫn mẫu sẵn, bạn cảm thấy thế nào?",
          options: pOpts({
            4: { t: "Thấy cực kỳ kích thích! Thử vẽ ra 3–4 hướng tiếp cận khác biệt xem hướng nào thú vị nhất.", f: "Sáng tạo và thoải mái với sự mơ hồ chưa định hình." },
            3: { t: "Tham khảo vài mô hình gần giống rồi tự biến tấu lại cho hợp hoàn cảnh của mình.", f: "Linh hoạt kết hợp giữa kinh nghiệm cũ và cải tiến mới." },
            2: { t: "Hơi lúng túng và cố tìm cho bằng được một quy trình chuẩn để làm theo cho chắc.", f: "Ưu tiên độ an toàn của quy chuẩn sẵn có." },
            1: { t: "Rất căng thẳng, chỉ muốn có người giao rõ từng bước A-B-C để làm theo.", f: "Không thoải mái với các bài toán thiếu cấu trúc rõ ràng." }
          }),
          explanation: "Khả năng tận hưởng sự mơ hồ và tự thiết kế lời giải mới là dấu ấn đặc trưng của tính Cởi mở sáng tạo."
        },
        {
          id: "oc-04",
          dimension: "conscientiousness",
          context: "Quản lý công việc",
          question: "Trước một dự án kéo dài 1 tháng, bạn thường tổ chức tiến độ của mình ra sao?",
          options: pOpts({
            4: { t: "Chia ngay thành từng cột mốc tuần/ngày rõ ràng, đặt nhắc lịch sớm để luôn xong trước hạn ít nhất 1 ngày.", f: "Tính Tận tâm & Kỷ luật cực kỳ xuất sắc!" },
            3: { t: "Lập danh sách các đầu việc chính và cố gắng bám theo để không bị trễ hạn chót.", f: "Có ý thức tổ chức tốt và giữ cam kết." },
            2: { t: "Làm lai rai theo cảm hứng tuần đầu rồi dồn tốc lực chạy nước rút ở tuần cuối.", f: "Phong cách làm việc theo cảm hứng, dễ áp lực ở phút chót." },
            1: { t: "Thường quên hạn hoặc để sát ngày mới bắt đầu cuống cuồng làm cho kịp.", f: "Cần bổ sung công cụ nhắc việc và chia nhỏ đầu việc để giảm áp lực." }
          }),
          explanation: "Trục Conscientiousness (Tận tâm) là chỉ báo mạnh nhất cho độ tin cậy nghề nghiệp và năng lực tự quản trị."
        },
        {
          id: "oc-05",
          dimension: "conscientiousness",
          context: "Chú ý tiểu tiết",
          question: "Khi chuẩn bị gửi một tài liệu hoặc sản phẩm cho khách hàng/sếp, bạn kiểm tra lại ở mức nào?",
          options: pOpts({
            4: { t: "Soát kỹ từ nội dung, số liệu, chính tả đến căn lề trình bày cho tới khi thật chỉn chu mới bấm gửi.", f: "Chuẩn mực cao và tỉ mỉ đáng tin cậy." },
            3: { t: "Kiểm tra các ý chính và con số quan trọng để không sai sót lớn rồi gửi.", f: "Thực tế, đảm bảo phần lõi chính xác." },
            2: { t: "Đọc lướt qua rất nhanh cho xong vì tin vào lần gõ đầu tiên của mình.", f: "Đôi khi dễ sót lỗi đánh máy hoặc chi tiết nhỏ." },
            1: { t: "Làm xong là gửi thẳng luôn, nếu sai gì người nhận báo rồi sửa sau.", f: "Hành động nhanh nhưng thiếu khâu kiểm tra chất lượng đầu ra." }
          }),
          explanation: "Sự cẩn trọng ở khâu hoàn thiện cuối cùng phản ánh mức độ tự trọng nghề nghiệp và tính kỷ luật cá nhân."
        },
        {
          id: "oc-06",
          dimension: "conscientiousness",
          context: "Giữ lời hứa nhỏ",
          question: "Nếu bạn lỡ hẹn gửi tài liệu cho ai đó vào lúc 14h nhưng đến 13h30 thấy có việc phát sinh không kịp, bạn làm gì?",
          options: pOpts({
            4: { t: "Chủ động nhắn báo trước lúc 13h30 kèm lý do ngắn và cam kết chính xác khung giờ mới sẽ gửi.", f: "Trách nhiệm và tôn trọng thời gian của người khác tuyệt đối!" },
            3: { t: "Cố gắng làm nhanh nhất có thể, trễ khoảng 15–20 phút rồi gửi kèm lời xin lỗi.", f: "Có thiện chí cố gắng nhưng báo trước sẽ chuyên nghiệp hơn." },
            2: { t: "Im lặng làm tiếp cho tới lúc xong hẳn mới gửi, hy vọng họ chưa cần ngay.", f: "Thiếu giao tiếp chủ động về kỳ vọng thời gian." },
            1: { t: "Tự nhủ có trễ nửa buổi cũng chẳng chết ai, lúc nào nhớ ra thì gửi.", f: "Xem nhẹ cam kết thời gian làm giảm uy tín cá nhân." }
          }),
          explanation: "Người tận tâm cao coi trọng chữ tín ở cả những cam kết nhỏ và chủ động quản trị kỳ vọng khi có biến cố."
        },
        {
          id: "oc-07",
          dimension: "extraversion",
          context: "Môi trường năng lượng",
          question: "Sau một tuần làm việc căng thẳng, buổi tối cuối tuần nào giúp bạn thấy 'đã' và hồi sức nhất?",
          options: pOpts({
            4: { t: "Tụ tập ăn uống, trò chuyện sôi nổi cùng đông bạn bè hoặc tham gia một sự kiện náo nhiệt.", f: "Bạn nạp năng lượng cực mạnh từ tương tác xã hội (Hướng ngoại rõ nét)." },
            3: { t: "Gặp gỡ nhóm nhỏ 2–3 người bạn thân vừa ăn vừa tâm sự sâu.", f: "Cân bằng giữa kết nối xã hội và chiều sâu trò chuyện." },
            2: { t: "Đi dạo hoặc xem phim một mình, thỉnh thoảng nhắn vài tin với người thân.", f: "Thiên hướng nạp năng lượng từ không gian cá nhân." },
            1: { t: "Đóng cửa ở nhà hoàn toàn một mình trong yên tĩnh, không gặp gỡ hay nói chuyện với ai.", f: "Hướng nội rõ rệt, cần tĩnh lặng tuyệt đối để sạc pin." }
          }),
          explanation: "Hướng ngoại và Hướng nội không phải giỏi hay dở giao tiếp, mà là nơi bạn lấy lại năng lượng tinh thần."
        },
        {
          id: "oc-08",
          dimension: "extraversion",
          context: "Trong đám đông lạ",
          question: "Khi bước vào một buổi hội thảo hoặc tiệc kết nối mà bạn chưa quen ai, bạn thường làm gì?",
          options: pOpts({
            4: { t: "Tự nhiên mỉm cười bắt chuyện làm quen với 3–4 người mới chỉ trong 15 phút đầu.", f: "Khả năng mở kết nối xã hội rất tự tin và linh hoạt!" },
            3: { t: "Tìm một người đứng gần hoặc có vẻ dễ mến để bắt đầu cuộc trò chuyện 1-1.", f: "Chủ động vừa phải và lịch thiệp." },
            2: { t: "Đứng gần bàn đồ ăn hoặc xem điện thoại, đợi ai đó bắt chuyện trước mới nói.", f: "Hơi dè dặt trong môi trường hoàn toàn xa lạ." },
            1: { t: "Cảm thấy khá ngột ngạt, cố ngồi góc khuất cho hết giờ rồi về sớm.", f: "Môi trường đông người lạ tiêu hao năng lượng của bạn rất nhanh." }
          }),
          explanation: "Sự chủ động mở lời trong môi trường mới phản ánh mức độ thoải mái với kích thích xã hội của trục Extraversion."
        },
        {
          id: "oc-09",
          dimension: "extraversion",
          context: "Thể hiện trong cuộc họp",
          question: "Khi làm việc nhóm, bạn thường đảm nhận vai trò giao tiếp nào?",
          options: pOpts({
            4: { t: "Chủ động điều phối, khuấy động không khí, phát biểu ý kiến và xung phong thuyết trình.", f: "Năng lượng dẫn dắt và biểu đạt nổi bật!" },
            3: { t: "Đóng góp ý kiến đều đặn khi đúng chủ đề thế mạnh và sẵn sàng thuyết trình khi được phân công.", f: "Cân bằng tốt giữa lắng nghe và đóng góp." },
            2: { t: "Thường nghe hết ý kiến mọi người rồi mới phát biểu ngắn gọn ở cuối buổi hoặc gửi ghi chú sau.", f: "Phong cách tư duy sâu trước khi phát biểu." },
            1: { t: "Ít khi lên tiếng trong cuộc họp, chỉ thích nhận phần việc độc lập về làm lặng lẽ.", f: "Ưu tiên làm việc độc lập hơn là tương tác nhóm trực tiếp." }
          }),
          explanation: "Thể hiện quan điểm chủ động và truyền năng lượng cho nhóm là biểu hiện tự nhiên của trục Hướng ngoại cao."
        },
        {
          id: "oc-10",
          dimension: "agreeableness",
          context: "Tinh thần hợp tác",
          question: "Khi một thành viên trong nhóm làm chậm phần việc chung khiến cả đội bị ảnh hưởng nhẹ, phản ứng đầu tiên của bạn là:",
          options: pOpts({
            4: { t: "Hỏi thăm xem họ đang kẹt ở đoạn nào để cùng tìm cách gỡ giúp, giữ tinh thần đồng đội tích cực.", f: "Chỉ số Hòa đồng & Hợp tác rất cao!" },
            3: { t: "Nhắc nhở lịch sự về mốc tiến độ và đề xuất chia lại phần việc cho kịp.", f: "Công bằng, tôn trọng và hướng tới giải pháp." },
            2: { t: "Thầm khó chịu và giữ khoảng cách lạnh nhạt với họ cho xong dự án.", f: "Giảm sự kết nối khi xảy ra trục trặc." },
            1: { t: "Chỉ trích gay gắt năng lực của họ trước nhóm để gây áp lực phải làm nhanh.", f: "Thẳng thắn kiểu đối đầu dễ gây sứt mẻ lòng tin đồng đội." }
          }),
          explanation: "Agreeableness (Hòa đồng) đo xu hướng đặt sự hợp tác, thiện chí và cảm giác an toàn chung lên trước việc hơn thua cá nhân."
        },
        {
          id: "oc-11",
          dimension: "agreeableness",
          context: "Tranh luận quan điểm",
          question: "Trong một cuộc tranh luận về ý tưởng mà bạn tin phương án của mình tốt hơn hẳn, bạn xử sự thế nào?",
          options: pOpts({
            4: { t: "Lắng nghe kỹ lý lẽ của đối phương trước, ghi nhận phần hợp lý của họ rồi mới trình bày nhẹ nhàng góc nhìn của mình.", f: "Tranh luận xây dựng, tôn trọng và thuyết phục!" },
            3: { t: "Trình bày rành mạch ưu nhược điểm của cả hai phương án để cả nhóm cùng bỏ phiếu.", f: "Khách quan và tôn trọng số đông." },
            2: { t: "Cố gắng bảo vệ bằng được ý kiến của mình và bác bỏ ngay mọi điểm yếu trong ý kiến người kia.", f: "Thiên về thắng thua quan điểm." },
            1: { t: "Dùng giọng điệu châm biếm rằng ý tưởng kia quá ngây thơ và thiếu thực tế.", f: "Giao tiếp cạnh tranh gay gắt dễ tạo đối kháng." }
          }),
          explanation: "Người hòa đồng cao vẫn có thể bảo vệ quan điểm sắc bén, nhưng luôn giữ thái độ tôn trọng nhân cách người đối diện."
        },
        {
          id: "oc-12",
          dimension: "agreeableness",
          context: "Niềm tin vào người khác",
          question: "Quan điểm mặc định của bạn khi mới tiếp xúc với một đồng nghiệp hoặc người hàng xóm mới là:",
          options: pOpts({
            4: { t: "Tin rằng đa số mọi người đều có thiện ý cho tới khi có hành động thực tế chứng minh ngược lại.", f: "Thiện chí mở lòng tạo dựng niềm tin nhanh." },
            3: { t: "Thân thiện, lịch sự nhưng vẫn giữ mức quan sát vừa phải trong thời gian đầu.", f: "Cân bằng lành mạnh giữa thiện chí và sự thận trọng." },
            2: { t: "Luôn giữ sự dè chừng cao độ vì sợ người lạ có ẩn ý lợi dụng.", f: "Hàng rào phòng vệ cao khiến việc kết nối chậm lại." },
            1: { t: "Mặc định mọi người đều chỉ nghĩ đến lợi ích riêng, không nên tin ai quá mức.", f: "Sự hoài nghi mạnh có thể khiến bạn bỏ lỡ nhiều mối quan hệ tốt." }
          }),
          explanation: "Mức độ tin tưởng tự nhiên vào thiện chí con người giúp hình thành mạng lưới hỗ trợ xã hội bền vững."
        },
        {
          id: "oc-13",
          dimension: "stability",
          context: "Trước biến cố bất ngờ",
          question: "Khi kế hoạch quan trọng bất ngờ đổ bể ngay sát giờ G (mất dữ liệu, hủy lịch, trục trặc đối tác), trạng thái bên trong bạn ra sao?",
          options: pOpts({
            4: { t: "Hơi giật mình vài giây rồi nhanh chóng giữ cái đầu lạnh, rà soát ngay phương án B để xử lý.", f: "Bản lĩnh tâm lý cực kỳ vững vàng!" },
            3: { t: "Lo lắng trong 5–10 phút đầu nhưng vẫn tự trấn tĩnh lại được để bắt tay khắc phục.", f: "Khả năng tự ổn định cảm xúc tốt." },
            2: { t: "Hoảng hốt khá lâu, tay chân run hoặc cáu bẳn khiến việc xử lý bị chậm lại.", f: "Căng thẳng cấp tính làm giảm tốc độ tư duy giải pháp." },
            1: { t: "Gần như tê liệt hoặc suy sụp, chỉ muốn bỏ cuộc và không nghĩ được cách gì.", f: "Dễ bị choáng ngợp bởi áp lực bất ngờ — cần rèn kỹ thuật neo bình tĩnh." }
          }),
          explanation: "Emotional Stability (Vững vàng tâm lý) thể hiện khả năng giữ hệ thần kinh ổn định khi ngoại cảnh biến động."
        },
        {
          id: "oc-14",
          dimension: "stability",
          context: "Áp lực đánh giá",
          question: "Sau khi nhận một lời góp ý hoặc điểm số không như kỳ vọng, tâm trạng của bạn thường kéo dài thế nào?",
          options: pOpts({
            4: { t: "Ghi nhận thông tin cần sửa, buồn nhẹ một chút rồi quay lại nhịp sống bình thường ngay trong ngày.", f: "Sức phục hồi cảm xúc rất nhanh và lành mạnh!" },
            3: { t: "Hơi suy nghĩ mất một buổi tối, hôm sau lên kế hoạch cải thiện là thấy ổn lại.", f: "Xử lý cảm xúc ổn định." },
            2: { t: "Cứ nghĩ đi nghĩ lại câu nói đó suốt nhiều ngày, mất tự tin khi làm việc tiếp.", f: "Xu hướng nhai lại suy nghĩ tiêu cực kéo dài." },
            1: { t: "Tự dằn vặt kéo dài cả tuần, tin rằng mình kém cỏi toàn diện.", f: "Độ nhạy tổn thương cao — cần tách biệt góp ý công việc khỏi giá trị bản thân." }
          }),
          explanation: "Người có độ vững vàng cao không xem một lời chê hay thất bại đơn lẻ là phán quyết về toàn bộ con người mình."
        },
        {
          id: "oc-15",
          dimension: "stability",
          context: "Lo âu thường nhật",
          question: "Trong một tuần bình thường không có biến cố lớn, tần suất bạn cảm thấy lo âu mơ hồ về tương lai ở mức nào?",
          options: pOpts({
            4: { t: "Rất hiếm — tôi tập trung vào những gì mình kiểm soát được hôm nay và ngủ khá ngon giấc.", f: "Nội tâm bình an và vững chãi!" },
            3: { t: "Thỉnh thoảng có lo nghĩ một chút vào tối muộn nhưng không ảnh hưởng sinh hoạt.", f: "Mức lo âu bình thường có thể kiểm soát." },
            2: { t: "Khá thường xuyên bồn chồn, hay lo xa đủ kịch bản xấu dù mọi thứ đang ổn.", f: "Não bộ thường xuyên bật chế độ cảnh giác cao." },
            1: { t: "Gần như ngày nào cũng căng thẳng lo âu, khó thư giãn hoàn toàn ngay cả ngày nghỉ.", f: "Mức độ căng thẳng nền cao — nên thực hành thư giãn và sắp xếp lại tải tinh thần." }
          }),
          explanation: "Sự ổn định cảm xúc nền giúp bạn tiết kiệm rất nhiều năng lượng tinh thần cho sáng tạo và tận hưởng cuộc sống."
        }
      ]
    },
    {
      id: "mbti-archetype",
      testType: "personality",
      title: "Giải Mã Khí Chất MBTI & Phong Cách Làm Việc",
      shortTitle: "Khí Chất MBTI & Phong Cách",
      category: "personality-mbti",
      categoryLabel: "Khí chất MBTI",
      level: "Thực tế",
      durationMinutes: 10,
      icon: "🧩",
      accentColor: "#ec4899",
      description:
        "Khám phá cách bạn thu nhận thông tin, ra quyết định, nạp năng lượng làm việc và tương tác đồng đội — quy chiếu giữa khí chất MBTI và 5 trục nhân cách.",
      tags: ["15 câu hỏi", "Khí chất MBTI", "Phong cách làm việc"],
      questions: [
        {
          id: "mb-01",
          dimension: "openness",
          context: "Cách học kỹ năng mới",
          question: "Khi học sử dụng một phần mềm hay thiết bị mới, bạn thích cách tiếp cận nào nhất?",
          options: pOpts({
            4: { t: "Hiểu bức tranh nguyên lý tổng thể đằng sau trước rồi tự mày mò khám phá các tính năng ẩn.", f: "Thiên hướng Trực giác (N) & Cởi mở khám phá." },
            3: { t: "Xem nhanh ví dụ ứng dụng thực tế rồi thử bấm luôn từng nút.", f: "Kết hợp linh hoạt giữa quan sát và thực hành." },
            2: { t: "Đọc đúng hướng dẫn từng bước Bước 1 → Bước 2 → Bước 3 và làm theo y hệt.", f: "Thiên hướng Giác quan (S) chuộng trình tự cụ thể." },
            1: { t: "Chỉ học đúng 2 nút cần dùng hằng ngày, các tính năng khác không muốn đụng vào.", f: "Rất thực dụng nhưng dễ bỏ qua công cụ tối ưu." }
          }),
          explanation: "Cách tiếp thu thông tin mới thể hiện sự khác biệt giữa tư duy nguyên lý mở rộng (N/Openness) và tư duy quy trình từng bước (S)."
        },
        {
          id: "mb-02",
          dimension: "openness",
          context: "Trò chuyện sâu sắc",
          question: "Bạn thấy hào hứng nhất khi nói chuyện với bạn bè về chủ đề nào?",
          options: pOpts({
            4: { t: "Những ý tưởng tương lai, giả thuyết 'nếu như...', tâm lý con người và ý nghĩa cuộc sống.", f: "Ưa thích chiều sâu ý niệm và khả năng tưởng tượng." },
            3: { t: "Cả trải nghiệm thực tế lẫn những dự định đổi mới sắp tới.", f: "Cân bằng giữa thực tại và tầm nhìn." },
            2: { t: "Chuyện ăn uống, mua sắm, kế hoạch cuối tuần cụ thể và chuyện thực tế quanh mình.", f: "Gắn kết với đời sống cụ thể hiện tại." },
            1: { t: "Chỉ nói chuyện công việc hoặc hỏi thăm xã giao ngắn gọn cho xong.", f: "Ít hứng thú với các chủ đề mở rộng." }
          }),
          explanation: "Những người cởi mở cao thường tìm thấy sự kết nối mạnh nhất qua các cuộc đối thoại về ý tưởng và tầm nhìn."
        },
        {
          id: "mb-03",
          dimension: "openness",
          context: "Tính linh hoạt phương án",
          question: "Khi đi du lịch cùng bạn bè, bạn thích kiểu lịch trình nào hơn?",
          options: pOpts({
            4: { t: "Chỉ đặt vé và chỗ ở, còn lại tùy hứng khám phá những góc phố lạ mới gặp trên đường.", f: "Tâm thế khám phá ngẫu hứng rất cao (P/Openness)." },
            3: { t: "Có danh sách 2–3 điểm chính mỗi ngày nhưng sẵn sàng đổi nếu thấy chỗ khác hay hơn.", f: "Cân bằng tuyệt vời giữa khung sườn và sự ngẫu hứng." },
            2: { t: "Lên lịch cố định từng giờ đi đâu, ăn quán nào và bám sát đúng lịch đó.", f: "Chuộng sự chắc chắn và dự đoán được." },
            1: { t: "Đi đúng những địa điểm nổi tiếng quen thuộc đã từng đi cho an toàn.", f: "Ưu tiên sự quen thuộc tuyệt đối." }
          }),
          explanation: "Thái độ với lịch trình du lịch phản chiếu rõ rệt nhu cầu tìm kiếm trải nghiệm mới mẻ của bạn."
        },
        {
          id: "mb-04",
          dimension: "conscientiousness",
          context: "Không gian làm việc",
          question: "Bàn làm việc hoặc thư mục lưu tài liệu trên máy tính của bạn thường trông như thế nào?",
          options: pOpts({
            4: { t: "Phân chia thư mục theo ngày/dự án rất khoa học, đặt tên file rõ ràng dễ tìm trong 3 giây.", f: "Tư duy hệ thống và kỷ luật tổ chức tuyệt vời!" },
            3: { t: "Tương đối gọn gàng ở các dự án chính, thỉnh thoảng cuối tuần dọn dẹp lại một lần.", f: "Kiểm soát trật tự ở mức tốt." },
            2: { t: "Hơi bừa bộn nhưng theo kiểu 'lộn xộn có trật tự' của riêng mình.", f: "Ưu tiên tốc độ hơn hình thức ngăn nắp." },
            1: { t: "Toàn lưu ngoài Desktop đặt tên kiểu 'final_final_2', lúc cần tìm mất cả buổi.", f: "Thói quen lưu trữ tự phát làm giảm hiệu suất đáng kể." }
          }),
          explanation: "Cách tổ chức không gian số và vật lý là tấm gương phản chiếu mức độ kỷ luật thầm lặng (Judging/Conscientiousness)."
        },
        {
          id: "mb-05",
          dimension: "conscientiousness",
          context: "Hoàn thành mục tiêu dài",
          question: "Khi tự đặt một mục tiêu cá nhân (học thêm chứng chỉ, tập gym, đọc sách), tỷ lệ bạn đi hết chặng đường là bao nhiêu?",
          options: pOpts({
            4: { t: "Trên 85% — đã xác định làm là theo dõi tiến độ từng tuần đến lúc cán đích.", f: "Tính kiên định và tự chủ cực cao!" },
            3: { t: "Khoảng 60–80% — hoàn thành được phần lớn nếu có lịch cố định.", f: "Sức bền tốt khi có cấu trúc hỗ trợ." },
            2: { t: "Khoảng 30–50% — rất hăng hái tuần đầu nhưng dễ nguội nếu bận việc khác.", f: "Động lực ban đầu mạnh hơn sức bền duy trì." },
            1: { t: "Thường bỏ dở ngay tuần thứ 2 vì đổi hứng sang mục tiêu mới.", f: "Cần rèn thói quen cam kết vi mô mỗi ngày." }
          }),
          explanation: "Khả năng đi tiếp sau khi cơn hứng thú ban đầu nguội đi chính là thước đo của sự Tận tâm."
        },
        {
          id: "mb-06",
          dimension: "conscientiousness",
          context: "Chuẩn bị trước cuộc họp",
          question: "Trước một buổi làm việc hoặc phỏng vấn quan trọng vào sáng mai, tối nay bạn làm gì?",
          options: pOpts({
            4: { t: "Kiểm tra lại toàn bộ tài liệu, chuẩn bị câu hỏi dự phòng, sạc đủ pin thiết bị và đi ngủ sớm.", f: "Chuẩn bị chủ động và chuyên nghiệp tuyệt đối." },
            3: { t: "Đọc lướt qua các gạch đầu dòng chính và chuẩn bị trang phục sẵn.", f: "Chuẩn bị gọn gàng đủ dùng." },
            2: { t: "Tin vào khả năng ứng biến tại chỗ của mình nên chỉ suy nghĩ sơ qua lúc ăn sáng.", f: "Ỷ lại vào khả năng ứng biến tức thời." },
            1: { t: "Vẫn thức khuya lướt mạng như mọi ngày, sáng mai tới đâu hay tới đó.", f: "Thiếu chuẩn bị dễ làm giảm phong độ ở thời điểm quyết định." }
          }),
          explanation: "Sự chuẩn bị trước là biểu hiện rõ nét của tư duy phòng ngừa rủi ro và tôn trọng cơ hội."
        },
        {
          id: "mb-07",
          dimension: "extraversion",
          context: "Nhịp độ ra quyết định nhóm",
          question: "Trong lúc brainstorm ý tưởng, bạn có thói quen suy nghĩ như thế nào?",
          options: pOpts({
            4: { t: "Nói thành lời ngay khi ý tưởng vừa lóe lên để cùng mọi người phát triển tiếp trên bảng.", f: "Tư duy tương tác ngoài (External Processing) đặc trưng của Hướng ngoại." },
            3: { t: "Suy nghĩ nháp 1–2 phút rồi chia sẻ cho nhóm cùng bàn.", f: "Linh hoạt cân bằng giữa suy nghĩ riêng và trao đổi." },
            2: { t: "Nghe hết mọi người nói rồi về bàn suy nghĩ kỹ trước khi nhắn ý kiến hoàn chỉnh.", f: "Tư duy chiều sâu nội tâm (Internal Processing)." },
            1: { t: "Ngại nói ý tưởng chưa chín trước nhóm nên thường giữ lại cho riêng mình.", f: "Rất kín tiếng — hãy thử chia sẻ ý tưởng thô với 1 người tin cậy trước." }
          }),
          explanation: "Người hướng ngoại thường 'nói để nghĩ rõ hơn', trong khi người hướng nội 'nghĩ thật rõ rồi mới nói'."
        },
        {
          id: "mb-08",
          dimension: "extraversion",
          context: "Làm việc từ xa (WFH)",
          question: "Nếu phải làm việc hoàn toàn tại nhà một mình trong 2 tuần liên tiếp không gặp đồng nghiệp, bạn thấy thế nào?",
          options: pOpts({
            4: { t: "Rất bức bối và tụt năng lượng; tôi cần ra quán cà phê đông người hoặc gọi video tán gẫu cho đỡ buồn.", f: "Nhu cầu tương tác trực tiếp rất cao." },
            3: { t: "Hơi thiếu không khí đồng đội một chút nhưng vẫn làm việc tốt nếu có họp online đều.", f: "Thích ứng linh hoạt." },
            2: { t: "Khá thoải mái vì tập trung sâu không bị ai làm phiền.", f: "Tận hưởng không gian làm việc độc lập." },
            1: { t: "Đúng thiên đường! Năng suất tăng vọt khi không phải giao tiếp xã giao hằng ngày.", f: "Hướng nội sâu sắc — làm việc độc lập phát huy tối đa sức mạnh." }
          }),
          explanation: "Mức độ cần tương tác trực tiếp giúp bạn chọn mô hình làm việc (văn phòng, hybrid hay remote) tối ưu nhất."
        },
        {
          id: "mb-09",
          dimension: "extraversion",
          context: "Kết bạn mới",
          question: "Trong năm vừa qua, mạng lưới quen biết mới của bạn mở rộng thế nào?",
          options: pOpts({
            4: { t: "Rất nhiều bạn và đối tác mới từ các sự kiện, câu lạc bộ và những cuộc trò chuyện ngẫu nhiên.", f: "Khả năng mở rộng mạng lưới xã hội rất tự nhiên!" },
            3: { t: "Có thêm vài người bạn mới cùng sở thích hoặc dự án chung.", f: "Mở rộng kết nối đều đặn có chọn lọc." },
            2: { t: "Chủ yếu vẫn chơi với nhóm bạn thân cũ từ nhiều năm trước.", f: "Ưu tiên chiều sâu và sự gắn bó lâu năm." },
            1: { t: "Gần như không kết bạn mới và cũng ít liên lạc với bạn cũ.", f: "Vòng kết nối rất thu hẹp — đôi khi một cộng đồng nhỏ cùng sở thích sẽ mang lại nhiều niềm vui." }
          }),
          explanation: "Độ rộng vòng kết nối xã hội là một chỉ dấu thực tế cho thấy hướng đầu tư năng lượng giao tiếp của bạn."
        },
        {
          id: "mb-10",
          dimension: "agreeableness",
          context: "Cân bằng Lý trí – Tình cảm",
          question: "Khi phải đưa ra một quyết định ảnh hưởng tới đồng nghiệp (ví dụ cắt giảm hạng mục hoặc chọn người đi công tác), bạn cân nhắc điều gì đầu tiên?",
          options: pOpts({
            4: { t: "Cân bằng giữa tiêu chí công việc rõ ràng và hoàn cảnh/cảm xúc của từng người để có cách truyền đạt nhân văn nhất.", f: "Dung hòa tuyệt vời giữa F (Feeling) và T (Thinking)!" },
            3: { t: "Ưu tiên hiệu quả công việc trước nhưng cố gắng hỗ trợ phần thiệt thòi cho người còn lại.", f: "Công bằng và có trách nhiệm." },
            2: { t: "Chỉ nhìn thuần túy vào con số hiệu suất, ai yếu hơn thì cắt không cần giải thích cảm xúc.", f: "Thiên hướng Lý trí cứng (T) — đôi lúc hơi lạnh lùng với người nghe." },
            1: { t: "Thấy thương người nào thì ưu tiên cho người đó dù hiệu quả công việc kém hơn.", f: "Cảm tính vị nể dễ làm ảnh hưởng sự công bằng chung." }
          }),
          explanation: "Trí tuệ nhân cách trưởng thành biết dùng lý trí để chọn phương án đúng và dùng sự hòa đồng/thấu cảm để triển khai phương án đó êm đẹp."
        },
        {
          id: "mb-11",
          dimension: "agreeableness",
          context: "Giúp đỡ không nằm trong trách nhiệm",
          question: "Khi thấy một đồng nghiệp đang loay hoay dọn đống tài liệu hoặc vật nặng trong lúc bạn không quá gấp, bạn làm gì?",
          options: pOpts({
            4: { t: "Bước tới phụ một tay ngay kèm lời hỏi thăm tự nhiên.", f: "Sự tử tế và tinh thần hỗ trợ phản xạ tự nhiên!" },
            3: { t: "Hỏi 'Có cần mình phụ một tay không?' rồi giúp nếu họ đồng ý.", f: "Lịch sự và sẵn lòng giúp đỡ." },
            2: { t: "Nhìn qua rồi đi tiếp vì nghĩ ai cũng có việc của người nấy.", f: "Khá tách biệt với xung quanh." },
            1: { t: "Thầm nghĩ sao họ không tự sắp xếp cho gọn trước đi rồi lơ luôn.", f: "Xu hướng phán xét thay vì sẻ chia." }
          }),
          explanation: "Những hành vi hỗ trợ tự phát trong việc nhỏ là chỉ dấu chân thực nhất của lòng tốt và tinh thần đồng đội."
        },
        {
          id: "mb-12",
          dimension: "agreeableness",
          context: "Đón nhận lỗi của người khác",
          question: "Nếu một nhân viên quán ăn hoặc tài xế giao hàng lỡ nhầm đơn của bạn nhưng họ lập tức xin lỗi rối rít, bạn phản ứng ra sao?",
          options: pOpts({
            4: { t: "Mỉm cười nhẹ nhàng: 'Không sao đâu bạn, ai cũng có lúc nhầm, mình đổi lại giúp nhau nhé'.", f: "Rộng lượng và kiểm soát tình huống rất đẹp!" },
            3: { t: "Nói ngắn gọn 'Nhờ bạn đổi lại đúng giúp mình nhanh chút nha' với giọng bình thường.", f: "Điềm tĩnh và rõ ràng." },
            2: { t: "Nhăn mặt tỏ vẻ khó chịu để họ thấy mình đang không hài lòng.", f: "Hơi căng thẳng dù đối phương đã nhận lỗi." },
            1: { t: "Mắng cho một trận cho nhớ lần sau khỏi làm ẩu.", f: "Thiếu bao dung trước sai sót nhỏ vô ý." }
          }),
          explanation: "Sự bao dung khi người khác đã nhận lỗi giúp giải tỏa căng thẳng cho cả hai phía."
        },
        {
          id: "mb-13",
          dimension: "stability",
          context: "Tự tin trước thử thách",
          question: "Khi được mời đảm nhận một vai trò hoàn toàn mới trước đám đông lớn, suy nghĩ đầu tiên của bạn là:",
          options: pOpts({
            4: { t: "'Đây là cơ hội tuyệt vời để thử sức và nâng tầm bản thân, mình sẽ chuẩn bị kỹ để làm tốt!'", f: "Tâm thế vững vàng và tự tin tích cực!" },
            3: { t: "Hơi hồi hộp một chút nhưng tin mình chuẩn bị kỹ là sẽ qua được.", f: "Lo lắng lành mạnh tạo động lực chuẩn bị." },
            2: { t: "Lo lắng suốt nhiều ngày về mọi kịch bản bị chê cười hoặc nói vấp.", f: "Nỗi sợ bị đánh giá chiếm khá nhiều tâm trí." },
            1: { t: "Từ chối ngay lập tức vì không chịu nổi áp lực ánh nhìn của đám đông.", f: "Cần từng bước làm quen với môi trường ít người trước để xây sự tự tin." }
          }),
          explanation: "Độ vững vàng tâm lý quyết định việc bạn nhìn thử thách như cơ hội hay mối đe dọa."
        },
        {
          id: "mb-14",
          dimension: "stability",
          context: "Thích ứng môi trường biến động",
          question: "Công ty thay đổi cơ cấu nhóm hoặc sếp mới có phong cách khác hẳn sếp cũ. Bạn mất bao lâu để bắt nhịp lại?",
          options: pOpts({
            4: { t: "Chỉ vài ngày — nhanh chóng quan sát kỳ vọng mới và điều chỉnh cách phối hợp hiệu quả.", f: "Khả năng thích ứng cực kỳ linh hoạt và ổn định!" },
            3: { t: "Khoảng 1–2 tuần làm quen dần rồi hoạt động bình thường.", f: "Tốc độ thích nghi tốt." },
            2: { t: "Mất hơn 1 tháng bực bội và nuối tiếc cách làm việc cũ.", f: "Khá nhạy cảm với sự thay đổi môi trường." },
            1: { t: "Cảm thấy bất an kéo dài và muốn nghỉ việc ngay vì không chịu nổi sự xáo trộn.", f: "Ưa ổn định tuyệt đối — dễ căng thẳng trong ngành biến động nhanh." }
          }),
          explanation: "Ổn định cảm xúc không phải là cứng nhắc, mà là giữ được tâm thế bình tĩnh để thích nghi nhanh với thay đổi."
        },
        {
          id: "mb-15",
          dimension: "stability",
          context: "Cân bằng tự đánh giá",
          question: "Khi nhìn lại chặng đường 1 năm qua của chính mình, cảm xúc chủ đạo của bạn thường là gì?",
          options: pOpts({
            4: { t: "Trân trọng những gì đã nỗ lực vượt qua, chấp nhận các thiếu sót như bài học và bình thản hướng tới năm mới.", f: "Sự điềm tĩnh và tự chấp nhận bản thân rất trưởng thành!" },
            3: { t: "Thấy hài lòng ở vài mảng và đặt mục tiêu sửa những mảng chưa ưng ý.", f: "Góc nhìn thực tế và cân bằng." },
            2: { t: "Chủ yếu nhìn thấy những mục tiêu chưa đạt được rồi thấy tiếc nuối, tự ti.", f: "Có xu hướng khắt khe quá mức với chính mình." },
            1: { t: "Thấy mình thật vô dụng và dậm chân tại chỗ so với bạn bè.", f: "Cần thực hành ghi nhận các tiến bộ nhỏ hằng ngày để nuôi dưỡng sự vững vàng." }
          }),
          explanation: "Cách bạn tự đánh giá bản thân cuối mỗi chu kỳ cho thấy độ bình an nội tâm và sự tự tin cốt lõi."
        }
      ]
    },
    {
      id: "career-compass",
      testType: "personality",
      title: "La Bàn Định Hướng Nghề Nghiệp & Thế Mạnh Bản Thân",
      shortTitle: "La Bàn Hướng Nghiệp",
      category: "personality-career",
      categoryLabel: "Hướng nghiệp",
      level: "Định hướng",
      durationMinutes: 7,
      icon: "🧭",
      accentColor: "#0ea5e9",
      description:
        "10 tình huống nghề nghiệp thực tế giúp soi chiếu xu hướng năng lực cốt lõi của bạn để gợi ý nhóm công việc và vai trò phát huy đúng sở trường nhất.",
      tags: ["10 câu hỏi", "Định hướng nghề", "Gợi ý vai trò"],
      questions: [
        {
          id: "cc-01",
          dimension: "openness",
          context: "Chọn loại dự án",
          question: "Nếu được tự chọn 1 trong 4 dự án sau với mức lương ngang nhau, bạn chọn dự án nào?",
          options: pOpts({
            4: { t: "Dự án R&D thử nghiệm một sản phẩm hoàn toàn mới chưa từng có trên thị trường.", f: "Đam mê khai phá và đổi mới sáng tạo rõ nét!" },
            3: { t: "Dự án cải tiến giao diện và trải nghiệm cho sản phẩm hiện có tốt hơn 30%.", f: "Thiên hướng tối ưu hóa sáng tạo." },
            2: { t: "Dự án vận hành quy trình chuẩn đã đóng gói sẵn để đảm bảo chạy ổn định hằng ngày.", f: "Phù hợp với vận hành chuẩn xác và ổn định." },
            1: { t: "Dự án nhập liệu và kiểm tra đối chiếu chứng từ lặp đi lặp lại theo mẫu cố định.", f: "Ưu tiên sự đơn giản, ít bất ngờ." }
          }),
          explanation: "Lựa chọn dự án khi thu nhập ngang nhau phản ánh trung thực nhất động lực nghề nghiệp tự nhiên của bạn."
        },
        {
          id: "cc-02",
          dimension: "openness",
          context: "Phong cách học tập",
          question: "Kiểu bài tập hoặc công việc nào khiến bạn dễ rơi vào trạng thái 'quên cả thời gian' (Flow) nhất?",
          options: pOpts({
            4: { t: "Thiết kế mô hình, viết lách sáng tạo hoặc tìm giải pháp mới cho một bài toán hóc búa.", f: "Bạn đạt trạng thái Flow cao nhất khi sáng tạo và giải bài toán mới!" },
            3: { t: "Phân tích dữ liệu, sắp xếp thông tin rời rạc thành bức tranh tổng thể dễ hiểu.", f: "Mạnh về tổng hợp và phân tích hệ thống." },
            2: { t: "Thực hiện các bước thao tác quen tay rõ ràng mà không phải suy nghĩ quá nhiều.", f: "Thoải mái với công việc mang tính thực thi quen thuộc." },
            1: { t: "Hiếm khi thấy hứng thú với việc gì, chủ yếu làm cho hết giờ quy định.", f: "Bạn có thể đang làm công việc chưa chạm đúng thế mạnh tự nhiên của mình." }
          }),
          explanation: "Trạng thái Flow xuất hiện khi thử thách trí tuệ khớp vừa vặn với sở thích và năng lực lõi của bạn."
        },
        {
          id: "cc-03",
          dimension: "conscientiousness",
          context: "Quản trị rủi ro",
          question: "Khi sắp ký duyệt hoặc ra mắt một sản phẩm mới, bạn thường đóng vai trò gì trong đội?",
          options: pOpts({
            4: { t: "Người rà soát danh sách kiểm tra cuối cùng (Checklist) để đảm bảo không sót bất kỳ lỗi kỹ thuật hay pháp lý nào.", f: "Tư duy kiểm soát chất lượng và độ tin cậy tuyệt vời!" },
            3: { t: "Người tổng hợp tiến độ các bộ phận để khớp lịch ra mắt đúng ngày.", f: "Mạnh về điều phối tiến độ." },
            2: { t: "Người góp ý tưởng bề mặt cho vui chứ ngại đọc kỹ các điều khoản chi tiết.", f: "Phù hợp khâu lên ý tưởng hơn là khâu kiểm soát chi tiết." },
            1: { t: "Để người khác kiểm hết, mình chỉ chờ tới ngày ra mắt chúc mừng thôi.", f: "Không hợp với các vai trò đòi hỏi kiểm soát chất lượng." }
          }),
          explanation: "Vai trò tự nhiên bạn hay nhận trước giờ G tiết lộ năng lực quản trị chất lượng của bạn."
        },
        {
          id: "cc-04",
          dimension: "conscientiousness",
          context: "Kỷ luật tự thân",
          question: "Nếu bạn làm nghề tự do (Freelancer) không có sếp giám sát giờ giấc, năng suất của bạn sẽ thế nào?",
          options: pOpts({
            4: { t: "Rất cao — tôi tự đặt giờ làm việc nghiêm túc mỗi ngày và giữ kỷ luật còn chặt hơn ở công ty.", f: "Kỷ luật nội tại cực mạnh, rất hợp tự chủ hoặc quản lý!" },
            3: { t: "Khá ổn nếu có cam kết deadline rõ ràng với khách hàng.", f: "Giữ cam kết tốt khi có cột mốc bên ngoài." },
            2: { t: "Thất thường — hôm làm 12 tiếng, hôm chơi cả ngày chẳng đụng vào việc.", f: "Hợp môi trường có đồng đội và nhịp làm việc chung." },
            1: { t: "Gần như không làm được việc nếu thiếu người nhắc nhở hằng ngày.", f: "Môi trường có cấu trúc và quản lý trực tiếp sẽ giúp bạn phát huy tốt hơn nhiều." }
          }),
          explanation: "Khả năng tự thúc đẩy khi không bị giám sát là yếu tố sống còn cho các vị trí độc lập hoặc lãnh đạo."
        },
        {
          id: "cc-05",
          dimension: "extraversion",
          context: "Tương tác khách hàng",
          question: "Bạn cảm thấy thế nào nếu công việc hằng ngày yêu cầu gặp gỡ, thuyết trình và đàm phán với 5–6 khách hàng mới mỗi ngày?",
          options: pOpts({
            4: { t: "Cực kỳ hào hứng! Tôi thích gặp gỡ con người, lắng nghe câu chuyện mới và thuyết phục họ.", f: "Rất hợp các vị trí đối ngoại, kinh doanh, PR hoặc dẫn dắt cộng đồng!" },
            3: { t: "Làm tốt nếu có sản phẩm tốt để chia sẻ, nhưng tối về cần nghỉ yên tĩnh.", f: "Phù hợp tư vấn chuyên sâu hoặc quản lý đối tác chọn lọc." },
            2: { t: "Làm được vài hôm nhưng sau đó sẽ thấy kiệt sức rất nhanh.", f: "Ưu tiên các công việc chuyên môn ít phải tiếp xúc dồn dập." },
            1: { t: "Ác mộng thực sự — tôi chỉ muốn làm việc với máy tính, dữ liệu hoặc thiết kế phía sau hậu trường.", f: "Tài năng của bạn tỏa sáng mạnh nhất ở các vai trò chuyên sâu phía sau (Deep Specialist)." }
          }),
          explanation: "Tỷ lệ tương tác người–người trong ngày là tiêu chí quan trọng hàng đầu để chọn nghề bền vững lâu dài."
        },
        {
          id: "cc-06",
          dimension: "extraversion",
          context: "Vai trò trong đội ngũ",
          question: "Trong một dự án nhóm mới thành lập, bạn thường tự nhiên bước vào vị trí nào?",
          options: pOpts({
            4: { t: "Người đứng ra kết nối mọi người, phân vai tổng thể và đại diện nhóm trình bày kết quả.", f: "Tố chất điều phối và đại diện nhóm nổi bật!" },
            3: { t: "Người giữ nhịp trao đổi giữa các thành viên để mọi người hiểu nhau.", f: "Cầu nối giao tiếp hiệu quả." },
            2: { t: "Người nhận một mảng chuyên môn khó và làm thật sâu để nộp lại cho nhóm.", f: "Thế mạnh chuyên gia độc lập (Individual Contributor)." },
            1: { t: "Người làm phần việc phụ nhỏ nhất và hạn chế phải họp hành trao đổi.", f: "Thích môi trường tối giản giao tiếp." }
          }),
          explanation: "Hiểu rõ mình hợp vai trò 'Người dẫn đường' hay 'Chuyên gia giải quyết phần lõi' giúp bạn chọn đúng lộ trình thăng tiến."
        },
        {
          id: "cc-07",
          dimension: "agreeableness",
          context: "Động lực giá trị",
          question: "Điều gì khiến bạn tự hào nhất sau khi hoàn thành một công việc?",
          options: pOpts({
            4: { t: "Nhìn thấy sản phẩm hoặc sự hỗ trợ của mình thực sự giúp cuộc sống/công việc của người khác tốt đẹp hơn.", f: "Động lực phụng sự và tạo tác động nhân văn rất mạnh!" },
            3: { t: "Cả nhóm đều vui vẻ ăn mừng vì cùng nhau vượt qua một thử thách lớn.", f: "Trân trọng tinh thần tập thể và thành công chung." },
            2: { t: "Đạt được con số doanh thu/KPI vượt trội để khẳng định vị thế cá nhân.", f: "Động lực thành tích và cạnh tranh cao." },
            1: { t: "Chỉ cần nhận đủ tiền công rồi xong việc, chẳng bận tâm tác động tới ai.", f: "Động lực thuần túy tài chính ngắn hạn." }
          }),
          explanation: "Động lực giá trị cốt lõi quyết định sự gắn bó lâu dài của bạn với ngành giáo dục, y tế, dịch vụ hay kinh doanh cạnh tranh."
        },
        {
          id: "cc-08",
          dimension: "agreeableness",
          context: "Giải quyết khiếu nại",
          question: "Nếu phải xử lý phản hồi khó tính của khách hàng hoặc đối tác đang bất mãn, bạn có lợi thế gì?",
          options: pOpts({
            4: { t: "Rất kiên nhẫn lắng nghe để họ dịu lại, thấu hiểu điểm nghẽn và tìm cách giải quyết đôi bên cùng hài lòng.", f: "Rất phù hợp các vai trò Quản lý khách hàng, Nhân sự, Tư vấn hoặc Điều phối!" },
            3: { t: "Giữ thái độ lịch sự đúng mực và xử lý theo đúng chính sách công bằng.", f: "Chuyên nghiệp và chuẩn mực." },
            2: { t: "Dễ mất kiên nhẫn nếu họ nói lòng vòng không đi thẳng vào logic vấn đề.", f: "Hợp làm việc với hệ thống kỹ thuật/dữ liệu hơn là dịch vụ trực tiếp." },
            1: { t: "Muốn tranh cãi tay đôi tới cùng để chứng minh mình đúng chứ không chịu nhún nhường.", f: "Nên tránh các công việc dịch vụ đòi hỏi xoa dịu cảm xúc cao." }
          }),
          explanation: "Kiên nhẫn và thiện chí trước phản ứng cảm xúc của người khác là năng lực vàng trong các ngành dịch vụ và quản trị con người."
        },
        {
          id: "cc-09",
          dimension: "stability",
          context: "Khả năng chịu áp lực KPI",
          question: "Môi trường làm việc nào giúp bạn phát huy phong độ cao nhất mà không bị kiệt sức?",
          options: pOpts({
            4: { t: "Ngay cả môi trường nhịp độ nhanh, thay đổi liên tục và KPI cao tôi vẫn giữ được sự điềm tĩnh và hiệu suất ổn định.", f: "Khả năng chịu nhiệt tuyệt vời cho các ngành tốc độ cao!" },
            3: { t: "Có áp lực mục tiêu rõ ràng nhưng vẫn giữ được ranh giới nghỉ ngơi hợp lý.", f: "Cân bằng hiệu suất bền vững." },
            2: { t: "Môi trường ít cạnh tranh gay gắt, tiến độ đều đặn dễ dự đoán.", f: "Phát huy tốt nhất trong môi trường ổn định, ít khủng hoảng bất ngờ." },
            1: { t: "Chỉ cần có áp lực đánh giá là tôi dễ rối trí và mất ngủ kéo dài.", f: "Nên ưu tiên các công việc nhịp độ êm dịu và rèn kỹ năng hạ nhiệt căng thẳng." }
          }),
          explanation: "Chọn môi trường có 'nhiệt độ áp lực' phù hợp giúp bạn phát triển đường dài mà không bị kiệt sức sớm."
        },
        {
          id: "cc-10",
          dimension: "stability",
          context: "Ra quyết định khi thiếu dữ liệu",
          question: "Khi phải đưa ra quyết định nghề nghiệp hoặc chọn phương án đầu tư mà chỉ mới có khoảng 70% thông tin, bạn phản ứng thế nào?",
          options: pOpts({
            4: { t: "Đánh giá nhanh kịch bản rủi ro xấu nhất có chịu được không rồi dứt khoát quyết định và linh hoạt chỉnh tiếp trên đường đi.", f: "Bản lĩnh ra quyết định dưới sự bất định rất tốt!" },
            3: { t: "Hỏi thêm ý kiến 1–2 người có kinh nghiệm rồi chốt phương án an toàn nhất.", f: "Thận trọng nhưng vẫn đủ quyết đoán." },
            2: { t: "Chần chừ mãi không dám chốt vì cứ sợ lỡ chọn sai thì ân hận.", f: "Nỗi sợ sai làm trôi mất nhiều cơ hội thời điểm." },
            1: { t: "Đẩy quyết định cho người khác chọn hộ để mình khỏi phải chịu trách nhiệm.", f: "Né tránh trách nhiệm ra quyết định khiến bạn khó tiến lên vị trí quản lý." }
          }),
          explanation: "Khả năng chịu đựng sự bất định và dám chịu trách nhiệm là phẩm chất phân biệt người thực thi và người dẫn dắt."
        }
      ]
    }
  ];

  DATA.PERSONALITY_DIMENSIONS = PERSONALITY_DIMENSIONS;
  DATA.PERSONALITY_LEVELS = PERSONALITY_LEVELS;
  DATA.PERSONALITY_ARCHETYPES = PERSONALITY_ARCHETYPES;
  DATA.getPersonalityArchetype = getPersonalityArchetype;
  DATA.PERSONALITY_TESTS = PERSONALITY_TESTS;
  DATA.TESTS = DATA.TESTS.concat(PERSONALITY_TESTS);
})();

