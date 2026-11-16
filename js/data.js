(function () {
  const DIMENSIONS = {
    self_awareness: {
      id: "self_awareness",
      name: "Tự nhận thức cảm xúc",
      shortName: "Tự nhận thức",
      icon: "🪞",
      color: "#6366f1",
      description:
        "Khả năng nhận diện chính xác cảm xúc của bản thân ngay khi nó xuất hiện, hiểu rõ nguyên nhân gốc rễ, giới hạn và giá trị cốt lõi của chính mình.",
      evaluations: {
        high: "Bạn có khả năng quan sát nội tâm sắc bén. Bạn nhận ra sớm những tín hiệu cảm xúc dù là tinh tế nhất và hiểu rõ điều gì đang kích hoạt phản ứng của mình, từ đó giữ được sự tỉnh táo khi ra quyết định.",
        medium: "Bạn nhận biết được các cảm xúc lớn (vui, giận, buồn, lo) nhưng đôi khi vẫn bị cuốn theo tâm trạng nhất thời trước khi kịp gọi tên nguyên nhân thật sự đằng sau.",
        low: "Bạn thường chỉ nhận ra cảm xúc của mình sau khi đã phản ứng hoặc khi căng thẳng tích tụ quá mức. Việc dành vài phút tự vấn mỗi ngày sẽ giúp bạn kết nối lại với thế giới nội tâm."
      },
      tips: [
        "Thực hành 'Gọi tên cảm xúc cụ thể' thay vì chỉ nói 'tôi thấy tệ' — hãy phân biệt giữa thất vọng, tủi thân, bất lực hay ghen tị.",
        "Ghi nhật ký kích hoạt (Trigger Log) trong 7 ngày: mỗi khi tâm trạng tụt dốc, ghi lại sự kiện, suy nghĩ tự động và phản ứng cơ thể.",
        "Xin phản hồi trung thực từ 1–2 người tin cậy về điểm mù hành vi của bạn khi đang căng thẳng."
      ]
    },
    self_regulation: {
      id: "self_regulation",
      name: "Tự kiểm soát & Điều tiết",
      shortName: "Tự kiểm soát",
      icon: "⚖️",
      color: "#0ea5e9",
      description:
        "Khả năng làm chủ xung động, giữ bình tĩnh dưới áp lực cao, không để cơn giận hay nỗi sợ dẫn dắt hành động và linh hoạt thích nghi với biến cố.",
      evaluations: {
        high: "Bạn sở hữu 'khoảng dừng vàng' đáng nể giữa kích thích và phản ứng. Ngay cả trong tình huống bị khiêu khích hoặc khủng hoảng, bạn vẫn điều tiết được tông giọng và hành xử chừng mực.",
        medium: "Trong phần lớn trường hợp bạn giữ được bình tĩnh, nhưng khi gặp áp lực dồn dập hoặc bị chạm vào tự ái cá nhân, bạn vẫn có lúc phản ứng vội vàng.",
        low: "Cảm xúc tiêu cực dễ bùng phát thành lời nói gay gắt, quyết định bốc đồng hoặc thu mình né tránh. Rèn luyện kỹ thuật hạ nhiệt sinh lý trước khi phản hồi là ưu tiên hàng đầu."
      },
      tips: [
        "Áp dụng quy tắc 'Khoảng dừng 6 giây' hoặc hít thở 4-7-8 trước khi trả lời tin nhắn/email khiến bạn bực bội.",
        "Tách biệt sự kiện khách quan khỏi câu chuyện bạn tự diễn giải trong đầu (ví dụ: sếp góp ý về file báo cáo ≠ sếp ghét bạn).",
        "Khi thấy nhịp tim tăng và giọng nói căng lên, hãy chủ động xin tạm hoãn cuộc trao đổi 15 phút để lấy lại cân bằng."
      ]
    },
    motivation: {
      id: "motivation",
      name: "Động lực nội tại",
      shortName: "Động lực",
      icon: "🔥",
      color: "#f59e0b",
      description:
        "Sức bền tinh thần, tinh thần chủ động tiến lên vì giá trị thực chất thay vì chỉ chạy theo khen thưởng bên ngoài, và khả năng giữ lạc quan thực tế trước thất bại.",
      evaluations: {
        high: "Bạn có ngọn lửa nội tâm bền bỉ. Thay vì đổ lỗi hoàn cảnh khi gặp trở ngại, bạn nhìn thất bại như dữ liệu để hiệu chỉnh hướng đi và truyền năng lượng tích cực cho người xung quanh.",
        medium: "Bạn có tinh thần cầu tiến khi mọi thứ thuận lợi, nhưng dễ chững lại hoặc hoài nghi bản thân nếu thiếu sự công nhận từ bên ngoài hay gặp chuỗi thất bại liên tiếp.",
        low: "Động lực của bạn phụ thuộc khá nhiều vào tâm trạng và hoàn cảnh tức thời. Bạn dễ bỏ cuộc giữa chừng hoặc rơi vào trạng thái trì hoãn phòng vệ khi thấy mục tiêu quá khó."
      },
      tips: [
        "Chia mục tiêu lớn thành các cột mốc 15–30 phút để não bộ liên tục nhận được tín hiệu tiến bộ nhỏ.",
        "Chuyển câu hỏi khi gặp lỗi từ 'Tại sao mình kém thế?' sang 'Mình rút ra được 1 quy tắc nào từ lần này?'.",
        "Tìm lại lý do cốt lõi ('Why') gắn với giá trị cá nhân cho những công việc lặp lại hằng ngày."
      ]
    },
    empathy: {
      id: "empathy",
      name: "Thấu cảm & Đọc vị",
      shortName: "Thấu cảm",
      icon: "🤝",
      color: "#10b981",
      description:
        "Khả năng đặt mình vào góc nhìn của người khác, lắng nghe điều chưa được nói ra qua ngữ điệu và ánh mắt, đồng thời tôn trọng cảm xúc của họ mà không phán xét.",
      evaluations: {
        high: "Bạn có trực giác cảm xúc tinh tế và khả năng lắng nghe sâu. Người khác thường cảm thấy được an toàn, thấu hiểu và không bị phán xét khi trò chuyện cùng bạn.",
        medium: "Bạn biết quan tâm đến người thân quen, nhưng đôi khi vẫn vội đưa ra lời khuyên hoặc áp đặt góc nhìn logic của mình lên nỗi buồn của người khác trước khi lắng nghe đủ.",
        low: "Bạn thường tập trung quá nhanh vào 'đúng – sai' hoặc giải pháp kỹ thuật mà bỏ lỡ tín hiệu cảm xúc của đối phương, dễ khiến người đối diện thấy bị lạnh nhạt hoặc áp đặt."
      },
      tips: [
        "Trong 2 phút đầu khi ai đó tâm sự, hãy chỉ lắng nghe và phản chiếu lại cảm xúc của họ ('Nghe có vẻ bạn đang rất áp lực...') thay vì vội khuyên bảo.",
        "Quan sát 3 kênh đồng thời khi giao tiếp: nội dung lời nói, tốc độ/âm lượng giọng nói và tư thế cơ thể.",
        "Thử đặt câu hỏi mở 'Điều gì khiến bạn lo lắng nhất lúc này?' để mở khóa góc nhìn của đối phương."
      ]
    },
    social_skills: {
      id: "social_skills",
      name: "Kỹ năng xã hội & Giao tiếp",
      shortName: "Kỹ năng xã hội",
      icon: "🌐",
      color: "#ec4899",
      description:
        "Năng lực kết nối con người, truyền đạt ranh giới rõ ràng nhưng tôn trọng, hóa giải xung đột theo hướng đôi bên cùng thắng và tạo dựng niềm tin bền vững.",
      evaluations: {
        high: "Bạn là người kết nối khéo léo và đáng tin cậy. Bạn biết cách nói những điều khó nghe một cách xây dựng, giữ hòa khí tập thể mà vẫn bảo vệ được nguyên tắc của mình.",
        medium: "Bạn giao tiếp lịch sự trong môi trường quen thuộc, nhưng vẫn còn lúng túng khi phải xử lý xung đột trực diện, từ chối yêu cầu quá đáng hoặc kết nối với người có cá tính mạnh.",
        low: "Bạn dễ gặp va chạm trong giao tiếp nhóm hoặc chọn cách im lặng chịu đựng rồi bùng nổ sau. Học công thức giao tiếp phi bạo lực (NVC) sẽ cải thiện rõ rệt các mối quan hệ của bạn."
      },
      tips: [
        "Sử dụng cấu trúc phản hồi SBI (Tình huống – Hành vi – Tác động) kết hợp thông điệp 'Tôi cảm thấy...' thay vì quy chụp 'Bạn luôn luôn...'.",
        "Học cách từ chối kèm giải pháp thay thế hoặc khung thời gian cụ thể để giữ ranh giới mà vẫn giữ thiện chí.",
        "Chủ động ghi nhận cụ thể công sức của đồng đội/người thân đúng lúc thay vì chỉ lên tiếng khi có sai sót."
      ]
    }
  };

  const EQ_LEVELS = [
    {
      id: "master",
      minPct: 85,
      eqRange: "130 – 145",
      badge: "Cấp độ 5/5 • Xuất sắc",
      title: "Bậc Thầy Thấu Cảm & Bản Lĩnh Cảm Xúc",
      color: "#10b981",
      summary:
        "Bạn sở hữu trí tuệ cảm xúc vượt trội. Bạn vừa hiểu rõ thế giới nội tâm của chính mình, vừa tinh tế nắm bắt trạng thái của người đối diện để xử lý các tình huống nhạy cảm một cách điềm tĩnh, nhân văn và hiệu quả.",
      advice:
        "Điểm mạnh lớn nhất của bạn là tạo ra sự an toàn tâm lý cho tập thể và các mối quan hệ. Hãy tiếp tục rèn luyện ranh giới cá nhân để không bị quá tải khi trở thành điểm tựa cảm xúc cho quá nhiều người xung quanh."
    },
    {
      id: "high",
      minPct: 72,
      eqRange: "115 – 129",
      badge: "Cấp độ 4/5 • EQ Cao",
      title: "Tinh Tế, Vững Vàng & Giao Tiếp Khéo Léo",
      color: "#6366f1",
      summary:
        "Bạn có nền tảng EQ rất tốt. Trong phần lớn các tình huống công việc và đời sống, bạn biết cách kiểm soát cái tôi, lắng nghe có chọn lọc và chọn phương án ứng xử hài hòa giữa lý trí và tình cảm.",
      advice:
        "Bạn đã vượt qua ngưỡng phản xạ bản năng thông thường. Hãy tập trung trau dồi thêm 1–2 trụ cột còn hơi chênh lệch trên biểu đồ Radar để đạt sự ổn định ngay cả trong các khủng hoảng áp lực cực đại."
    },
    {
      id: "moderate",
      minPct: 58,
      eqRange: "100 – 114",
      badge: "Cấp độ 3/5 • EQ Khá",
      title: "Cân Bằng Tốt Nhưng Vẫn Có Điểm Chạm Nhạy Cảm",
      color: "#0ea5e9",
      summary:
        "Bạn đạt mức trí tuệ cảm xúc khá và đủ linh hoạt để thích nghi với môi trường sống thường ngày. Tuy nhiên, khi gặp các tình huống bị đụng chạm tự ái, áp lực thời gian hoặc xung đột lợi ích trực tiếp, phản ứng của bạn đôi lúc vẫn nghiêng về phòng vệ hoặc né tránh.",
      advice:
        "Hãy xem kỹ phần giải thích các câu chưa đạt 4/4 điểm bên dưới. Chỉ cần điều chỉnh thói quen ở 'khoảng dừng trước khi phản hồi' và lắng nghe sâu hơn, chỉ số EQ của bạn sẽ bứt phá rất nhanh."
    },
    {
      id: "developing",
      minPct: 42,
      eqRange: "85 – 99",
      badge: "Cấp độ 2/5 • Trung bình",
      title: "Cảm Xúc Dẫn Dắt Lý Trí Ở Nhiều Tình Huống",
      color: "#f59e0b",
      summary:
        "Bạn có thiện chí trong giao tiếp nhưng thường hành xử theo phản xạ thói quen: hoặc kìm nén quá mức để giữ hòa khí giả tạo, hoặc dễ bộc phát bực dọc khi mất kiên nhẫn. Điều này đôi khi khiến bạn kiệt sức hoặc gây hiểu lầm không đáng có.",
      advice:
        "Tin tốt là EQ hoàn toàn có thể rèn luyện được như cơ bắp. Hãy bắt đầu từ trụ cột có điểm thấp nhất của bạn bằng 1 bài thực hành nhỏ mỗi ngày trong 2 tuần."
    },
    {
      id: "foundation",
      minPct: 0,
      eqRange: "55 – 84",
      badge: "Cấp độ 1/5 • Cần rèn luyện",
      title: "Dễ Dao Động Cảm Xúc & Phản Ứng Bản Năng",
      color: "#ef4444",
      summary:
        "Hiện tại bạn đang gặp khá nhiều khó khăn trong việc gọi tên cảm xúc, hạ nhiệt căng thẳng và đọc vị tâm lý người khác. Những áp lực tích tụ có thể đang khiến bạn phản ứng gay gắt hoặc thu mình lại quá mức.",
      advice:
        "Đừng tự trách bản thân — việc bạn làm bài đánh giá này đã là bước tự nhận thức đầu tiên rất đáng quý. Hãy ưu tiên luyện tập 2 kỹ năng nền tảng: hít thở tạo khoảng dừng 6 giây và lắng nghe không ngắt lời."
    }
  ];

  const TESTS = [
    {
      id: "goleman-comprehensive",
      title: "Đề Chuẩn Toàn Diện (Mô Hình 5 Trụ Cột Daniel Goleman)",
      shortTitle: "Chuẩn Toàn Diện 5 Trụ Cột",
      category: "comprehensive",
      categoryLabel: "Toàn diện",
      level: "Tiêu chuẩn",
      durationMinutes: 15,
      icon: "🧭",
      accentColor: "#6366f1",
      description:
        "Bộ đề tiêu chuẩn đánh giá cân bằng cả 5 trụ cột trí tuệ cảm xúc của Daniel Goleman thông qua 15 tình huống thực tế từ công việc, gia đình đến nội tâm cá nhân.",
      tags: ["15 câu hỏi", "5 trụ cột EQ", "Đo chuẩn tổng quát"],
      questions: [
        {
          id: "gc-01",
          dimension: "self_awareness",
          context: "Nhận diện tâm trạng",
          question:
            "Buổi sáng đi làm, bạn bỗng thấy rất cáu kỉnh và dễ gắt gỏng với đồng nghiệp dù chưa có sự cố nào xảy ra. Bạn sẽ làm gì đầu tiên?",
          options: [
            {
              text: "Nhận ra mình đang không ổn nên nhắn tin tâm sự ngay với bạn thân để xả bớt khó chịu.",
              score: 3,
              feedback: "Biết nhận ra trạng thái bất ổn và tìm hỗ trợ là tốt, nhưng tự rà soát nguyên nhân trước sẽ chủ động hơn."
            },
            {
              text: "Tự nhủ hôm nay 'sao ai cũng phiền phức thế' và giữ bộ mặt lạnh lùng cả buổi sáng.",
              score: 1,
              feedback: "Bạn đang phóng chiếu cảm xúc tiêu cực bên trong ra những người xung quanh."
            },
            {
              text: "Tạm dừng 2 phút, tự hỏi xem tối qua mình có ngủ kém, lo lắng việc gì chưa giải quyết hay đang bị áp lực ngầm nào không.",
              score: 4,
              feedback: "Tuyệt vời! Bạn chủ động truy tìm nguồn gốc cảm xúc thay vì để nó điều khiển hành vi."
            },
            {
              text: "Cố gắng lờ đi, cắm đầu vào làm việc thật nhanh để khỏi phải nói chuyện với ai.",
              score: 2,
              feedback: "Kìm nén hoặc né tránh chỉ che giấu tạm thời, cảm xúc chưa được giải mã vẫn dễ bùng phát về sau."
            }
          ],
          explanation:
            "Tự nhận thức bắt đầu từ việc tách mình ra quan sát cảm xúc như một tín hiệu dữ liệu. Khi tìm ra nguyên nhân (thiếu ngủ, lo âu tồn đọng), bạn lập tức giảm được nguy cơ trút giận nhầm chỗ."
        },
        {
          id: "gc-02",
          dimension: "self_awareness",
          context: "Phản hồi năng lực",
          question:
            "Trong buổi đánh giá định kỳ, quản lý nhận xét bạn 'làm việc rất chăm chỉ nhưng đôi khi bảo thủ khi nhận góp ý mới'. Cảm giác nhói lên trong lòng. Bạn xử lý nội tâm thế nào?",
          options: [
            {
              text: "Ghi nhận cảm giác tự ái vừa xuất hiện, hít sâu và tự hỏi: 'Có 2–3 tình huống cụ thể nào gần đây khiến sếp thấy mình bảo thủ không?'",
              score: 4,
              feedback: "Xuất sắc! Bạn vừa chấp nhận cảm xúc tự nhiên, vừa chuyển hóa thành câu hỏi phản tư khách quan."
            },
            {
              text: "Cảm thấy buồn cả ngày và bắt đầu nghi ngờ rằng mình chẳng có năng lực gì cả.",
              score: 2,
              feedback: "Bạn đang đồng nhất một góp ý hành vi cụ thể với toàn bộ giá trị bản thân."
            },
            {
              text: "Nghĩ thầm sếp không hiểu hết công sức của mình nên nói vậy cho có lệ, rồi bỏ qua không nghĩ tới nữa.",
              score: 1,
              feedback: "Phản ứng phủ nhận hoàn toàn khiến bạn bỏ lỡ cơ hội nhìn thấy điểm mù của bản thân."
            },
            {
              text: "Tỏ ra đồng tình ngay trước mặt sếp cho xong chuyện, nhưng trong lòng vẫn thấy ấm ức.",
              score: 3,
              feedback: "Giữ thái độ lịch sự là điểm cộng, nhưng nếu không tự đối thoại thật với chính mình thì sự ấm ức vẫn tồn tại."
            }
          ],
          explanation:
            "Người có tự nhận thức cao không miễn nhiễm với tự ái, nhưng họ nhận ra 'à, cái tôi của mình đang bị chạm vào' và tách nó ra để lọc lấy phần thông tin hữu ích từ góp ý."
        },
        {
          id: "gc-03",
          dimension: "self_awareness",
          context: "Giới hạn cá nhân",
          question:
            "Dạo gần đây bạn nhận lời giúp đỡ quá nhiều người đến mức cuối tuần vẫn phải thức khuya làm bù việc của mình và thấy kiệt sức. Bạn nhận thức vấn đề này ra sao?",
          options: [
            {
              text: "Cảm thấy bực bội và thầm trách những người kia ích kỷ, toàn đùn đẩy việc cho mình.",
              score: 1,
              feedback: "Đổ lỗi hoàn toàn cho người khác khiến bạn mất quyền kiểm soát ranh giới của chính mình."
            },
            {
              text: "Nhận ra mình đang sợ làm người khác phật lòng nên không dám nói 'không', và điều đó đang bào mòn sức khỏe tinh thần của chính mình.",
              score: 4,
              feedback: "Rất sâu sắc! Bạn nhìn thẳng vào động cơ tâm lý ngầm ('sợ mất lòng') thay vì chỉ than mệt."
            },
            {
              text: "Tự trách mình kém cỏi vì quản lý thời gian dở nên mới không làm xuể từng đó việc.",
              score: 2,
              feedback: "Vấn đề cốt lõi ở đây là ranh giới cảm xúc, không đơn thuần là kỹ năng quản lý thời gian."
            },
            {
              text: "Thấy mình đang quá tải nên quyết định tuần sau sẽ bớt nhận việc hơn một chút.",
              score: 3,
              feedback: "Nhận ra sự quá tải là bước đúng, tuy nhiên hiểu rõ nỗi sợ bên trong mới giúp bạn thay đổi bền vững."
            }
          ],
          explanation:
            "Hiểu rõ vì sao mình khó từ chối (nhu cầu được yêu mến, sợ xung đột) là chìa khóa của tự nhận thức. Chỉ khi gọi đúng tên rào cản nội tâm, bạn mới thiết lập được ranh giới lành mạnh."
        },
        {
          id: "gc-04",
          dimension: "self_regulation",
          context: "Khiêu khích bằng tin nhắn",
          question:
            "Bạn nhận được một tin nhắn từ đối tác hoặc đồng nghiệp với giọng điệu khá gay gắt, quy chụp lỗi chậm tiến độ cho bạn dù nguyên nhân đến từ phía họ. Bạn phản ứng thế nào?",
          options: [
            {
              text: "Không trả lời luôn trong suốt 2 ngày để họ tự hiểu là mình đang rất bực.",
              score: 2,
              feedback: "Chiến tranh lạnh (im lặng trừng phạt) không giải quyết được vấn đề công việc."
            },
            {
              text: "Hít thở sâu rồi nhắn một câu ngắn gọn: 'Mình đã nhận thông tin, để mình kiểm tra lại mốc thời gian rồi phản hồi bạn trong 30 phút nữa'.",
              score: 3,
              feedback: "Cách trì hoãn văn minh rất tốt; chỉ cần đảm bảo sau đó bạn trình bày lại bằng chứng rõ ràng, không né tránh."
            },
            {
              text: "Gọi điện hoặc nhắn lại ngay lập tức để chỉnh đốn thái độ của họ cho ra nhẽ.",
              score: 1,
              feedback: "Phản ứng khi cơn giận đang ở đỉnh dễ làm leo thang xung đột và tạo bằng chứng bất lợi."
            },
            {
              text: "Soạn sẵn một tin nhắn phản bác cực gắt để xả cơn giận nhưng chưa gửi, đặt điện thoại xuống 15 phút cho dịu lại rồi mới viết lại câu trả lời kèm dữ liệu đối chiếu.",
              score: 4,
              feedback: "Chuẩn mực! Bạn giải tỏa xung động an toàn và phản hồi bằng sự điềm tĩnh chuyên nghiệp."
            }
          ],
          explanation:
            "Điều tiết cảm xúc không phải là đè nén sự bức xúc, mà là trì hoãn hành động cho đến khi vỏ não trước trán (lý trí) lấy lại quyền kiểm soát từ hạch hạnh nhân (cơn giận)."
        },
        {
          id: "gc-05",
          dimension: "self_regulation",
          context: "Biến cố kế hoạch",
          question:
            "Bạn chuẩn bị rất kỹ cho một buổi thuyết trình quan trọng, nhưng sát giờ bắt đầu thì file trình chiếu bị lỗi font và mất kết nối máy chiếu. Bạn làm gì?",
          options: [
            {
              text: "Giữ nụ cười điềm tĩnh, hít một hơi chậm, chủ động trò chuyện giao lưu nhanh với khán giả để dẫn nhập trong lúc chờ chuyển sang bản PDF dự phòng.",
              score: 4,
              feedback: "Bản lĩnh tuyệt vời! Sự bình tĩnh của bạn biến sự cố kỹ thuật thành điểm cộng về phong thái."
            },
            {
              text: "Hoảng loạn trong vài giây, than phiền liên tục với bộ phận kỹ thuật làm cả phòng thêm căng thẳng.",
              score: 1,
              feedback: "Sự hoảng loạn lan truyền rất nhanh và làm giảm uy tín của chính người thuyết trình."
            },
            {
              text: "Xin phép mọi người tạm dừng 3 phút để bình tĩnh xử lý kỹ thuật rồi mới bắt đầu nói.",
              score: 3,
              feedback: "Xử lý thực tế và ổn định; chủ động kết nối với khán giả trong lúc chờ sẽ còn tinh tế hơn."
            },
            {
              text: "Cố gắng giữ mặt bình thường nhưng giọng nói run và đọc vội cho hết phần trình bày vì mất tinh thần.",
              score: 2,
              feedback: "Bạn cố kiểm soát bề ngoài nhưng chưa kịp neo lại nhịp thở và sự tập trung bên trong."
            }
          ],
          explanation:
            "Khả năng thích ứng linh hoạt (Adaptability) thuộc nhóm Tự kiểm soát: khi ngoại cảnh đổi đột ngột, người có EQ cao chuyển năng lượng từ lo âu sang phương án B ngay lập tức."
        },
        {
          id: "gc-06",
          dimension: "self_regulation",
          context: "Cám dỗ buông xuôi",
          question:
            "Một ngày làm việc quá mệt mỏi, bạn tự hứa tối nay sẽ tập thể dục và ngủ sớm, nhưng về nhà bạn chỉ muốn lướt điện thoại tới 1 giờ sáng và ăn đồ ngọt cho bõ tức. Bạn xử lý cơn xung động này ra sao?",
          options: [
            {
              text: "Ép bản thân tập đúng bài nặng 1 tiếng dù đầu óc quay cuồng, xong kiệt sức thêm.",
              score: 2,
              feedback: "Kỷ luật cứng nhắc thiếu lắng nghe cơ thể dễ dẫn tới phản tác dụng và bỏ cuộc sớm."
            },
            {
              text: "Chấp nhận mình đang mệt thật, chọn phiên bản nhẹ nhàng nhất: giãn cơ 10 phút hoặc đi bộ quanh nhà thay vì tự ép quá mức rồi bỏ hẳn.",
              score: 4,
              feedback: "Điều tiết thông minh! Bạn thương lượng linh hoạt với cơ thể mà vẫn giữ được kỷ luật cốt lõi."
            },
            {
              text: "Cất điện thoại sang phòng khác và đi ngủ sớm luôn để phục hồi, hẹn mai tập bù.",
              score: 3,
              feedback: "Kiểm soát xung động tốt và biết ưu tiên giấc ngủ phục hồi."
            },
            {
              text: "Tự nhủ 'kệ đi, đời có mấy khi', lướt điện thoại tới khuya rồi sáng hôm sau lại hối hận.",
              score: 1,
              feedback: "Tìm kiếm dopamine tức thời khi mệt mỏi thường dẫn đến vòng lặp kiệt sức ngày hôm sau."
            }
          ],
          explanation:
            "Tự kiểm soát lành mạnh không phải là sự hà khắc cực đoan, mà là điều chỉnh kỳ vọng linh hoạt theo mức năng lượng thực tế để duy trì thói quen dài hạn."
        },
        {
          id: "gc-07",
          dimension: "motivation",
          context: "Thất bại bất ngờ",
          question:
            "Bạn nộp hồ sơ cho một vị trí hoặc dự án mơ ước sau nhiều tuần chuẩn bị, nhưng nhận lại thư từ chối lạnh lùng không kèm lý do. Tâm thế của bạn trong 48 giờ tới là gì?",
          options: [
            {
              text: "Nghĩ rằng mọi thứ đều có 'chạy chọt' sẵn rồi, cố gắng nữa cũng vô ích thôi.",
              score: 1,
              feedback: "Tư duy nạn nhân giúp bảo vệ cái tôi tức thời nhưng đóng sập cơ hội phát triển."
            },
            {
              text: "Động viên bản thân 'không sao, cái này không hợp thì tìm cái khác' rồi nộp tiếp hàng loạt hồ sơ y hệt.",
              score: 3,
              feedback: "Lạc quan và kiên trì là tốt, nhưng thiếu bước phân tích rút kinh nghiệm sẽ dễ lặp lại điểm yếu cũ."
            },
            {
              text: "Cho phép mình buồn một buổi tối, sau đó chủ động rà soát lại hồ sơ, gửi email lịch sự xin góp ý để nâng cấp bản thân cho cơ hội kế tiếp.",
              score: 4,
              feedback: "Động lực nội tại tuyệt vời! Bạn dung hòa giữa cảm xúc thật và tư duy tăng trưởng."
            },
            {
              text: "Buồn bã mất động lực cả tuần và không muốn nộp thêm bất cứ đâu nữa.",
              score: 2,
              feedback: "Nỗi sợ bị từ chối lần hai đang níu chân bạn lại."
            }
          ],
          explanation:
            "Động lực nội tại bền vững gắn liền với 'lạc quan thực tế': đối diện nỗi thất vọng, học từ sai sót và chủ động tìm phản hồi để cải tiến lần sau."
        },
        {
          id: "gc-08",
          dimension: "motivation",
          context: "Công việc nhàm chán",
          question:
            "Bạn được giao phụ trách một đầu việc lặp đi lặp lại, ít được chú ý và sếp ít khi khen thưởng trực tiếp. Bạn duy trì phong độ thế nào?",
          options: [
            {
              text: "Làm chỉn chu theo đúng yêu cầu rồi tranh thủ đề xuất với sếp xin nhận thêm phần việc mới thử thách hơn.",
              score: 3,
              feedback: "Rất chủ động! Kết hợp thêm việc cải tiến chính quy trình hiện tại sẽ chứng minh năng lực thuyết phục hơn nữa."
            },
            {
              text: "Chịu đựng làm cho tròn trách nhiệm nhưng lúc nào cũng đếm ngược tới giờ tan ca với tâm trạng chán nản.",
              score: 2,
              feedback: "Trách nhiệm giúp bạn hoàn thành việc, nhưng thiếu động lực nội tại dễ gây kiệt sức âm thầm."
            },
            {
              text: "Làm qua loa cho đủ KPI, có người nhắc mới chỉnh, vì thấy có làm tốt cũng chẳng ai ghi nhận.",
              score: 1,
              feedback: "Khi động lực hoàn toàn phụ thuộc lời khen bên ngoài, chất lượng và niềm vui nghề nghiệp sẽ sụt giảm nhanh."
            },
            {
              text: "Tự đặt ra chuẩn mực tối ưu cho riêng mình (ví dụ rút ngắn quy trình, tự động hóa bớt thao tác) để rèn tay nghề và thấy công việc có ý nghĩa.",
              score: 4,
              feedback: "Xuất sắc! Bạn tự tạo ra giá trị và niềm hứng khởi từ bên trong công việc."
            }
          ],
          explanation:
            "Người có động lực nội tại cao tìm thấy niềm tự hào trong chuẩn mực cá nhân và sự tiến bộ của chính mình, không đợi người khác giám sát mới làm tốt."
        },
        {
          id: "gc-09",
          dimension: "motivation",
          context: "So sánh với người khác",
          question:
            "Bạn lướt mạng xã hội và thấy một người bạn cùng xuất phát điểm vừa khoe thăng chức, thu nhập cao hoặc thành tựu lớn trong khi bạn vẫn đang chật vật. Phản ứng bên trong bạn là gì?",
          options: [
            {
              text: "Tắt máy, thấy tự ti và chán ghét con đường mình đang đi.",
              score: 2,
              feedback: "So sánh chặng giữa của mình với trang nổi bật nhất của người khác dễ làm tê liệt động lực."
            },
            {
              text: "Nghĩ thầm 'chắc lại làm màu hoặc gặp may thôi' để thấy bản thân dễ chịu hơn.",
              score: 1,
              feedback: "Hạ thấp thành công của người khác là cơ chế phòng vệ làm triệt tiêu động lực vươn lên."
            },
            {
              text: "Cảm thấy chạnh lòng một chút, nhưng nhanh chóng chuyển sang tò mò học hỏi xem lộ trình của họ có điểm gì mình áp dụng được cho mục tiêu riêng.",
              score: 4,
              feedback: "Quá tuyệt vời! Bạn biến cảm giác chạnh lòng tự nhiên thành nhiên liệu học hỏi."
            },
            {
              text: "Thả tim chúc mừng bạn, tự nhủ mỗi người có nhịp độ riêng rồi quay lại tập trung việc của mình.",
              score: 3,
              feedback: "Rất điềm đạm và lành mạnh! Chủ động học thêm bài học từ người đi trước sẽ giúp bạn tiến xa hơn nữa."
            }
          ],
          explanation:
            "Đố kỵ là cảm xúc rất con người, nhưng EQ cao giúp bạn nhận diện nó sớm và chuyển hóa thành sự ngưỡng mộ mang tính học hỏi thay vì tự ti hay cay nghiệt."
        },
        {
          id: "gc-10",
          dimension: "empathy",
          context: "Bạn thân tâm sự",
          question:
            "Một người bạn thân gọi điện kể lể trong nước mắt về việc vừa bị sếp mắng oan. Nghe câu chuyện, bạn nhận ra thực ra bạn mình cũng có phần lỗi sơ suất. Bạn sẽ đáp lại ra sao?",
          options: [
            {
              text: "Lắng nghe trọn vẹn, công nhận cảm giác tủi thân và sốc của bạn trước; đợi khi bạn dịu xuống mới khéo léo cùng nhìn lại tình huống để rút kinh nghiệm.",
              score: 4,
              feedback: "Thấu cảm đỉnh cao! Kết nối cảm xúc trước khi sửa chữa vấn đề là nguyên tắc vàng."
            },
            {
              text: "Im lặng nghe bạn khóc xong rồi an ủi: 'Thôi đừng buồn nữa, mai mời đi uống trà sữa cho quên đi'.",
              score: 3,
              feedback: "Rất ấm áp và biết lắng nghe, dù đôi khi câu 'đừng buồn nữa' hơi vội khép lại cảm xúc của họ."
            },
            {
              text: "Hùa theo mắng sếp của bạn thật thậm tệ để bạn thấy hả giận.",
              score: 2,
              feedback: "Đồng minh mù quáng giúp bạn ấy hả giận nhất thời nhưng không giúp bạn ấy trưởng thành hoặc nhìn rõ rủi ro."
            },
            {
              text: "Ngắt lời nhẹ nhàng để phân tích ngay: 'Nhưng mà công bằng mà nói, đoạn đó cậu gửi file trễ cũng là lỗi của cậu trước đấy'.",
              score: 1,
              feedback: "Đưa lý lẽ đúng sai ngay lúc người kia đang tổn thương sẽ khiến họ cảm thấy bị tấn công kép."
            }
          ],
          explanation:
            "Nguyên tắc cốt lõi của thấu cảm: 'Cảm xúc cần được lắng nghe trước khi lý trí sẵn sàng tiếp thu góp ý'. Công nhận nỗi đau không có nghĩa là đồng tình với cái sai."
        },
        {
          id: "gc-11",
          dimension: "empathy",
          context: "Tín hiệu ngầm",
          question:
            "Trong cuộc họp nhóm, một thành viên vốn rất năng nổ hôm nay lại ngồi im lặng, mắt nhìn xuống bàn và chỉ trả lời 'sao cũng được' khi được hỏi ý kiến. Bạn xử lý thế nào?",
          options: [
            {
              text: "Mừng thầm vì đỡ mất thời gian tranh luận và nhanh chóng chốt phương án theo số đông.",
              score: 1,
              feedback: "Bỏ qua sự bất thường của đồng đội dễ khiến mâu thuẫn âm ỉ tích tụ hoặc mất người tài."
            },
            {
              text: "Hỏi dồn ngay trước cả phòng: 'Sao hôm nay cậu cứ xị mặt ra thế? Có bất mãn gì à?'",
              score: 2,
              feedback: "Hỏi trực diện giữa đám đông dễ khiến đối phương phòng vệ và xấu hổ hơn."
            },
            {
              text: "Gọi tên họ trong cuộc họp để khuyến khích đóng góp thêm ý kiến cho vui vẻ.",
              score: 3,
              feedback: "Có ý tốt kéo họ vào cuộc, nhưng thăm hỏi riêng tư sẽ giúp chạm đúng vấn đề thực sự hơn."
            },
            {
              text: "Chú ý quan sát thái độ đó, kết thúc họp bạn chủ động rủ riêng họ đi pha cà phê và hỏi thăm nhẹ nhàng xem họ có đang vướng mắc hay mệt mỏi gì không.",
              score: 4,
              feedback: "Rất tinh tế! Bạn đọc được ngôn ngữ không lời và chọn không gian an toàn để kết nối."
            }
          ],
          explanation:
            "Hơn 70% tín hiệu cảm xúc nằm ở ngữ điệu và ngôn ngữ cơ thể. Nhận ra sự thay đổi nhịp độ của người khác và tiếp cận riêng tư thể hiện năng lực đọc vị tinh tế."
        },
        {
          id: "gc-12",
          dimension: "empathy",
          context: "Khác biệt thế hệ",
          question:
            "Bố mẹ bạn liên tục nhắc đi nhắc lại một lời khuyên cũ kỹ về chuyện nghề nghiệp hoặc hôn nhân khiến bạn rất ngột ngạt, dù bạn đã giải thích nhiều lần. Bạn nhìn nhận chuyện này thế nào?",
          options: [
            {
              text: "Kiên nhẫn giải thích lại bằng số liệu và xu hướng xã hội hiện đại để bố mẹ hiểu.",
              score: 3,
              feedback: "Lịch sự và có lý lẽ, nhưng đôi khi bố mẹ cần cảm giác an toàn về mặt cảm xúc hơn là số liệu logic."
            },
            {
              text: "Nhìn xuyên qua lời cằn nhằn để thấy nỗi lo âu và tình thương vụng về của bố mẹ, nhẹ nhàng cảm ơn sự quan tâm rồi chia sẻ kế hoạch cụ thể để bố mẹ yên tâm.",
              score: 4,
              feedback: "Thấu cảm sâu sắc! Khi chạm được vào nỗi lo gốc rễ của người lớn tuổi, căng thẳng giảm đi rất nhiều."
            },
            {
              text: "Bực bội cãi lại gay gắt rằng thời đại khác rồi, bố mẹ đừng can thiệp vào cuộc đời con nữa.",
              score: 1,
              feedback: "Phản ứng gay gắt khiến bố mẹ cảm thấy bị gạt bỏ và càng lo lắng, kiểm soát hơn."
            },
            {
              text: "Vâng dạ cho qua chuyện rồi làm theo ý mình, nhưng trong lòng thấy chán nản mỗi khi về nhà.",
              score: 2,
              feedback: "Giữ hòa khí bề mặt nhưng tạo ra khoảng cách ngầm giữa hai thế hệ."
            }
          ],
          explanation:
            "Thấu cảm giúp ta phân biệt 'hình thức thể hiện vụng về' với 'ý định sâu xa' (nỗi sợ con cái vất vả). Xoa dịu nỗi lo của đối phương hiệu quả hơn tranh thắng thua bằng lý lẽ."
        },
        {
          id: "gc-13",
          dimension: "social_skills",
          context: "Góp ý tế nhị",
          question:
            "Đồng nghiệp ngồi cạnh bạn có thói quen nói chuyện điện thoại riêng rất to giữa văn phòng yên tĩnh, làm ảnh hưởng đến sự tập trung của bạn và mọi người. Bạn nói với họ thế nào?",
          options: [
            {
              text: "Nhắn vào nhóm chat chung của công ty bóng gió về 'ý thức nơi công sở'.",
              score: 2,
              feedback: "Nói bóng gió công khai dễ làm đồng nghiệp mất mặt và nảy sinh thù địch ngầm."
            },
            {
              text: "Đợi lúc họ cúp máy, ghé sang nói nhỏ nhẹ với nụ cười thân thiện: 'Bạn ơi, chỗ này hơi vang nên mình khó tập trung làm báo cáo, phiền bạn ra sảnh nghe giúp mình nhé, cảm ơn bạn nhiều!'",
              score: 4,
              feedback: "Giao tiếp chuẩn mực! Trực tiếp, riêng tư, nêu rõ nhu cầu của mình mà vẫn giữ thể diện cho đối phương."
            },
            {
              text: "Đập bàn hoặc lườm nguýt rõ to để họ tự biết ý mà im lặng.",
              score: 1,
              feedback: "Giao tiếp thụ động – công kích (passive-aggressive) chỉ tạo bầu không khí ngột ngạt."
            },
            {
              text: "Đeo tai nghe chống ồn chịu đựng cho êm cửa êm nhà, dù vẫn rất khó chịu.",
              score: 3,
              feedback: "Giữ được hòa khí tạm thời nhưng về lâu dài ranh giới không được thiết lập sẽ khiến bạn ấm ức."
            }
          ],
          explanation:
            "Kỹ năng xã hội tốt kết hợp giữa sự thẳng thắn và tôn trọng: góp ý 1-1, tập trung vào tác động thực tế ('mình khó tập trung') thay vì phán xét nhân cách ('bạn vô ý thức')."
        },
        {
          id: "gc-14",
          dimension: "social_skills",
          context: "Hòa giải bất đồng",
          question:
            "Hai người bạn trong nhóm thân đang giận nhau gay gắt vì một hiểu lầm về tiền bạc khi đi du lịch chung, khiến cả nhóm rơi vào cảnh khó xử. Bạn sẽ đóng vai trò gì?",
          options: [
            {
              text: "Rủ cả nhóm đi ăn uống để làm loãng bầu không khí, mong hai người tự quên chuyện cũ.",
              score: 3,
              feedback: "Có thiện chí kết nối, nhưng hiểu lầm tài chính nếu không được làm rõ sẽ vẫn còn vướng mắc."
            },
            {
              text: "Nghe một bên kể xong rồi đứng ra kết luận bên kia sai, ép họ phải xin lỗi.",
              score: 1,
              feedback: "Thiên vị khi chưa nghe đủ hai tai sẽ đổ thêm dầu vào lửa."
            },
            {
              text: "Lập tức đứng ngoài cuộc hoàn toàn, bảo 'chuyện của hai đứa tự giải quyết, đừng lôi tôi vào'.",
              score: 2,
              feedback: "Giữ trung lập là tốt, nhưng từ chối hỗ trợ kết nối khi cả nhóm bị ảnh hưởng có thể bỏ lỡ cơ hội hàn gắn."
            },
            {
              text: "Lắng nghe riêng góc nhìn của từng người để gỡ phần cảm xúc, sau đó giúp hai bạn đối chiếu lại con số rõ ràng dựa trên thiện chí giữ tình bạn.",
              score: 4,
              feedback: "Kỹ năng điều phối xung đột xuất sắc! Tách cảm xúc khỏi sự kiện để tìm tiếng nói chung."
            }
          ],
          explanation:
            "Người có kỹ năng xã hội cao đóng vai trò cầu nối trung thực: không phán xét, lắng nghe đa chiều và đưa cuộc đối thoại về sự thật khách quan trên tinh thần xây dựng."
        },
        {
          id: "gc-15",
          dimension: "social_skills",
          context: "Từ chối khéo léo",
          question:
            "Một người quen lâu ngày không liên lạc bỗng nhắn tin hỏi vay một khoản tiền khá lớn, đúng lúc tài chính của bạn cũng đang eo hẹp. Bạn phản hồi sao cho giữ được ranh giới mà không quá sượng sùng?",
          options: [
            {
              text: "Thể hiện sự cảm thông với khó khăn của họ, từ chối rõ ràng dứt khoát do kế hoạch tài chính cá nhân đang khóa chặt, và gợi ý hướng hỗ trợ nhỏ trong khả năng (nếu có).",
              score: 4,
              feedback: "Ranh giới vàng! Vừa bảo vệ được tài chính cá nhân, vừa giữ trọn vẹn sự tử tế và tôn trọng."
            },
            {
              text: "Trả lời thẳng thừng ngắn ngủn: 'Không có đâu, dạo này tôi cũng đang nợ đầy đầu' rồi thôi.",
              score: 2,
              feedback: "Thẳng thắn là cần, nhưng cách diễn đạt hơi cộc dễ khiến đối phương thấy bị dội gáo nước lạnh."
            },
            {
              text: "Cố gắng bấm bụng vét hết tiền tiết kiệm cho mượn một nửa cho đỡ mang tiếng keo kiệt, xong về nhà lo sốt vó.",
              score: 3,
              feedback: "Tốt bụng nhưng thiếu ranh giới an toàn cho bản thân dễ dẫn đến tổn thương sau này."
            },
            {
              text: "Đã xem tin nhắn nhưng im lặng luôn không trả lời vì ngại nói từ chối.",
              score: 1,
              feedback: "Im lặng né tránh tạo cảm giác thiếu tôn trọng và khiến chính bạn cũng áy náy kéo dài."
            }
          ],
          explanation:
            "Từ chối rõ ràng là quyền lợi hợp pháp và là biểu hiện của giao tiếp trưởng thành. Sự kết hợp giữa 'từ chối dứt khoát + thái độ tôn trọng' giúp bảo vệ cả hai phía khỏi kỳ vọng sai."
        }
      ]
    },
    {
      id: "workplace-leadership",
      title: "EQ Công Sở & Bản Lĩnh Lãnh Đạo",
      shortTitle: "EQ Công Sở & Lãnh Đạo",
      category: "workplace",
      categoryLabel: "Công sở",
      level: "Nâng cao",
      durationMinutes: 12,
      icon: "💼",
      accentColor: "#0ea5e9",
      description:
        "Đo lường khả năng ứng xử chuyên nghiệp trong môi trường làm việc nhiều áp lực: xử lý xung đột nhóm, bị cướp công, đối thoại với sếp và dẫn dắt đồng đội.",
      tags: ["12 câu hỏi", "Công sở", "Quản trị & Giao tiếp"],
      questions: [
        {
          id: "wl-01",
          dimension: "self_regulation",
          context: "Bị cướp công trong cuộc họp",
          question:
            "Trong cuộc họp với ban giám đốc, một đồng nghiệp trình bày ý tưởng cốt lõi mà bạn đã vất vả nghiên cứu cả tuần như thể đó là sáng kiến của riêng họ. Bạn phản ứng ngay lúc đó thế nào?",
          options: [
            {
              text: "Cắt ngang gay gắt trước mặt sếp: 'Này, đó là ý tưởng tôi gửi cho anh tối qua mà, sao anh nhận vơ thế?'",
              score: 1,
              feedback: "Đối đầu căng thẳng công khai dễ khiến cuộc họp mất kiểm soát và bạn trông có vẻ thiếu chuyên nghiệp."
            },
            {
              text: "Giữ thái độ điềm tĩnh, mỉm cười tiếp lời: 'Rất vui vì bạn thấy đề xuất hôm qua mình gửi hữu ích! Để mình bổ sung thêm phần số liệu triển khai chi tiết mà mình đã chuẩn bị cho phương án này...'",
              score: 4,
              feedback: "Đỉnh cao bản lĩnh công sở! Vừa khẳng định quyền sở hữu một cách thanh lịch, vừa thể hiện năng lực dẫn dắt."
            },
            {
              text: "Đợi họp xong mới nhắn tin riêng cho đồng nghiệp đó chất vấn và yêu cầu lần sau phải ghi tên mình.",
              score: 3,
              feedback: "Cách trao đổi riêng là văn minh, nhưng tại thời điểm ban giám đốc đánh giá thì quyền ghi nhận đã trôi qua."
            },
            {
              text: "Im lặng nuốt giận cho qua luôn, rồi sau đó kể xấu đồng nghiệp này với cả phòng.",
              score: 2,
              feedback: "Nói sau lưng không giúp bạn lấy lại công sức mà còn làm xấu văn hóa nội bộ."
            }
          ],
          explanation:
            "Khi bị chạm vào quyền lợi ở nơi công sở, việc tiếp lời mang tính đóng góp giá trị giúp bạn vừa đòi lại công bằng một cách khéo léo, vừa giữ hình ảnh trưởng thành trước cấp trên."
        },
        {
          id: "wl-02",
          dimension: "empathy",
          context: "Nhân sự xuống tinh thần",
          question:
            "Một thành viên trong team vốn làm việc rất chắc tay nhưng 2 tuần gần đây liên tục mắc lỗi vặt và chậm deadline. Là người phụ trách hoặc đồng đội thân, bạn tiếp cận thế nào?",
          options: [
            {
              text: "Nhắn tin nhắc nhẹ: 'Dạo này thấy cậu hơi chểnh mảng đấy, cố tập trung lại nhé'.",
              score: 3,
              feedback: "Có nhắc nhở nhưng còn chung chung, chưa mở ra cuộc đối thoại để biết nguyên nhân thật."
            },
            {
              text: "Thương bạn ấy mệt nên tự ôm luôn phần việc sai sót về làm giúp mà không nói gì.",
              score: 2,
              feedback: "Làm thay không giúp bạn ấy nhận ra vấn đề và khiến chính bạn bị quá tải."
            },
            {
              text: "Mời họ nói chuyện riêng 1-1 ở không gian thoải mái, chia sẻ khách quan những lỗi gần đây và hỏi chân thành xem họ có đang gặp áp lực công việc hay biến cố gia đình nào không.",
              score: 4,
              feedback: "Tuyệt vời! Bạn kết hợp giữa tiêu chuẩn công việc rõ ràng và sự quan tâm chân thành tới con người."
            },
            {
              text: "Gửi email nhắc nhở chính thức kèm cảnh báo kỷ luật ngay theo đúng quy trình.",
              score: 1,
              feedback: "Cứng nhắc theo quy trình khi chưa tìm hiểu nguyên nhân có thể đẩy nhân sự giỏi rời đi."
            }
          ],
          explanation:
            "Khi một người vốn giỏi bỗng sa sút phong độ đột ngột, đằng sau thường có nguyên nhân (quá tải, khủng hoảng cá nhân, mất định hướng). Hỏi thăm 1-1 giúp xử lý tận gốc."
        },
        {
          id: "wl-03",
          dimension: "social_skills",
          context: "Phản hồi khó nghe",
          question:
            "Bạn cần góp ý cho một thành viên nhỏ tuổi hơn về việc thái độ giao tiếp của bạn ấy với khách hàng hơi thiếu kiên nhẫn. Bạn mở lời ra sao để bạn ấy tiếp thu thay vì phòng thủ?",
          options: [
            {
              text: "Nhắc thẳng giữa nhóm để mọi người cùng rút kinh nghiệm chung luôn.",
              score: 1,
              feedback: "Phê bình cá nhân trước tập thể làm tổn thương lòng tự trọng và kích hoạt tâm lý chống đối."
            },
            {
              text: "Gọi riêng vào phòng và bảo: 'Em cần kiên nhẫn hơn với khách hàng, thái độ như hôm nay là không đạt đâu'.",
              score: 3,
              feedback: "Biết gọi riêng là điểm cộng, nhưng dùng từ đánh giá chung chung dễ khiến người trẻ thấy bị áp lực."
            },
            {
              text: "Nói vòng vo rất lâu về tầm quan trọng của khách hàng mà không dám nhắc thẳng lỗi cụ thể.",
              score: 2,
              feedback: "Quá vòng vo khiến người nghe không biết mình cần sửa chính xác điều gì."
            },
            {
              text: "Khen một điểm tốt bạn ấy vừa làm, rồi nêu rõ tình huống cụ thể với khách hàng X, tác động tới trải nghiệm khách và cùng bạn ấy thảo luận cách xử lý tốt hơn cho lần sau.",
              score: 4,
              feedback: "Áp dụng xuất sắc mô hình phản hồi xây dựng: cụ thể hành vi, tôn trọng nhân cách, hướng tới giải pháp."
            }
          ],
          explanation:
            "Phản hồi hiệu quả luôn nhắm vào hành vi cụ thể ở một tình huống cụ thể, không dán nhãn tính cách, và mời người nghe cùng tìm cách cải thiện."
        },
        {
          id: "wl-04",
          dimension: "self_awareness",
          context: "Hội chứng kẻ mạo danh",
          question:
            "Bạn vừa được đề bạt lên vị trí phụ trách một dự án lớn hơn hẳn trước đây. Thay vì vui mừng, bạn lại thấy lo lắng tột độ và sợ mọi người phát hiện ra mình 'không giỏi như họ nghĩ'. Bạn đối diện ra sao?",
          options: [
            {
              text: "Cố tỏ ra mình biết tuốt mọi thứ và không dám hỏi bất kỳ ai vì sợ bị đánh giá là kém.",
              score: 2,
              feedback: "Che giấu sự chưa biết dễ dẫn đến sai sót lớn hơn ở vai trò quản lý."
            },
            {
              text: "Từ chối nhận dự án vì nghĩ mình chưa đủ hoàn hảo, đợi năm sau rồi tính.",
              score: 1,
              feedback: "Để nỗi sợ đánh giá cản bước sẽ khiến bạn bỏ lỡ cơ hội trưởng thành."
            },
            {
              text: "Tự động viên mình phải làm việc gấp đôi thời gian để bù lại sự thiếu tự tin.",
              score: 3,
              feedback: "Nỗ lực là tốt, nhưng hiểu rõ bản chất của hội chứng kẻ mạo danh sẽ giúp bạn bớt kiệt sức hơn."
            },
            {
              text: "Thừa nhận nỗi sợ này là phản ứng bình thường khi bước ra khỏi vùng an toàn, liệt kê rõ những gì mình đã làm tốt và những kỹ năng cần học bổ sung trong 30 ngày đầu.",
              score: 4,
              feedback: "Tự nhận thức xuất sắc! Bạn bóc tách được nỗi sợ mơ hồ thành kế hoạch hành động thực tế."
            }
          ],
          explanation:
            "Nhận diện được 'Imposter Syndrome' (Hội chứng kẻ mạo danh) giúp bạn hiểu cảm giác lo âu là dấu hiệu của sự mở rộng năng lực, chứ không phải bằng chứng của sự yếu kém."
        },
        {
          id: "wl-05",
          dimension: "motivation",
          context: "Khích lệ team kiệt sức",
          question:
            "Cả nhóm vừa chạy nước rút liên tục 3 tuần nhưng sản phẩm ra mắt vẫn bị khách hàng phản hồi nhiều lỗi, tinh thần anh em đang rệu rã. Bạn làm gì?",
          options: [
            {
              text: "Ghi nhận nỗ lực bền bỉ của cả nhóm trong 3 tuần qua, đứng ra cùng chịu trách nhiệm phần thiếu sót, tách nhỏ danh sách lỗi cần sửa và tổ chức lại nhịp làm việc hợp lý.",
              score: 4,
              feedback: "Bản lĩnh lãnh đạo truyền cảm hứng! Bạn bảo vệ tinh thần đội ngũ trước khi siết lại quy trình."
            },
            {
              text: "Cho mọi người nghỉ ngơi một buổi lấy lại sức rồi hôm sau họp lại rút kinh nghiệm.",
              score: 3,
              feedback: "Rất nhân văn và hợp lý; kết hợp thêm sự ghi nhận cụ thể sẽ thắp lại động lực mạnh mẽ hơn."
            },
            {
              text: "Truy trách nhiệm ngay xem khâu nào làm ẩu để quy lỗi cho rõ ràng.",
              score: 1,
              feedback: "Tìm người đổ lỗi khi tinh thần đang tụt dốc sẽ làm tan rã sự gắn kết của cả đội."
            },
            {
              text: "Nói mấy câu khẩu hiệu suông kiểu 'cố lên anh em ơi, không có gì phải buồn' rồi giao thêm việc ngay.",
              score: 2,
              feedback: "Lạc quan độc hại (toxic positivity) không giải quyết được sự mệt mỏi thực tế của nhân sự."
            }
          ],
          explanation:
            "Người dẫn dắt có EQ cao không phớt lờ thất bại cũng không chỉ trích mù quáng: họ công nhận công sức thực tế và biến khủng hoảng thành bài toán giải quyết theo từng bước nhỏ."
        },
        {
          id: "wl-06",
          dimension: "social_skills",
          context: "Giao tiếp với sếp khó tính",
          question:
            "Sếp của bạn là người rất nóng tính và hay thay đổi yêu cầu vào phút chót, khiến bạn nhiều lần phải làm lại báo cáo vào tối muộn. Bạn xử lý mối quan hệ công việc này thế nào?",
          options: [
            {
              text: "Phản kháng thẳng trong cuộc họp rằng sếp làm việc thiếu nhất quán, đổi xoành xoạch.",
              score: 1,
              feedback: "Công kích cá nhân sếp chỉ làm quan hệ đóng băng."
            },
            {
              text: "Cứ âm thầm làm lại mãi trong bực dọc cho tới khi không chịu nổi thì xin nghỉ việc đột ngột.",
              score: 2,
              feedback: "Chịu đựng mà không giao tiếp lại kỳ vọng khiến cả hai bên không bao giờ hiểu vướng mắc."
            },
            {
              text: "Chủ động xin sếp 10 phút đầu tuần để thống nhất tiêu chí đầu ra bằng văn bản/tin nhắn ngắn và xác nhận lại mức độ ưu tiên khi có yêu cầu mới phát sinh.",
              score: 4,
              feedback: "Quản trị cấp trên (Managing Up) rất chuyên nghiệp và khéo léo!"
            },
            {
              text: "Thẳng thắn trao đổi riêng với sếp về áp lực thời gian khi đổi yêu cầu gấp để xin giãn hạn nộp.",
              score: 3,
              feedback: "Rất tốt và trung thực! Thêm bước chốt tiêu chí sớm ngay từ đầu sẽ giảm hẳn số lần phải sửa."
            }
          ],
          explanation:
            "Thay vì chờ người khác thay đổi tính cách, người có kỹ năng xã hội cao thiết kế quy trình giao tiếp rõ ràng (chốt tiêu chí sớm, nêu rõ đánh đổi tiến độ khi thay đổi)."
        },
        {
          id: "wl-07",
          dimension: "self_awareness",
          context: "Phong cách ra quyết định",
          question:
            "Khi cả đội tranh luận nảy lửa về hai phương án và bạn là người quyết định cuối cùng, bạn nhận ra mình đang nghiêng về phương án A chỉ vì người đề xuất là đồng nghiệp thân. Bạn làm gì?",
          options: [
            {
              text: "Nhận diện ngay thiên kiến cảm tình của bản thân, tạm gác tên người đề xuất sang một bên và yêu cầu cả nhóm chấm điểm hai phương án theo 3 tiêu chí rủi ro – chi phí – hiệu quả.",
              score: 4,
              feedback: "Tự nhận thức xuất sắc! Nhận ra thiên kiến (bias) của chính mình là phẩm chất hiếm có của lãnh đạo."
            },
            {
              text: "Dùng quyền của mình chọn luôn phương án A cho nhanh, bảo vệ người quen trước đã.",
              score: 1,
              feedback: "Thiên vị cảm tính phá hủy niềm tin công bằng trong tập thể."
            },
            {
              text: "Sợ mang tiếng thiên vị nên cố tình chọn phương án B dù chưa chắc phương án B tốt hơn.",
              score: 2,
              feedback: "Phản ứng ngược lại thiên kiến cũng không dựa trên lý trí khách quan."
            },
            {
              text: "Hoãn quyết định lại thêm vài ngày để tự suy nghĩ thêm một mình.",
              score: 3,
              feedback: "Cẩn trọng là tốt, nhưng dùng tiêu chí khách quan minh bạch sẽ giúp tập thể đồng thuận hơn."
            }
          ],
          explanation:
            "Tự nhận thức trong lãnh đạo bao gồm việc soi thấy các thiên kiến vô thức (thiên vị người quen, cái tôi cá nhân) và dùng cơ chế khách quan để cân bằng lại."
        },
        {
          id: "wl-08",
          dimension: "self_regulation",
          context: "Khách hàng giận dữ",
          question:
            "Một khách hàng lớn gọi điện quát tháo nặng lời vì sản phẩm gặp sự cố đúng ngày quan trọng của họ, dù lỗi xuất phát từ khâu vận chuyển bên thứ ba. Bạn xử lý thế nào?",
          options: [
            {
              text: "Cũng căng thẳng cãi lại nếu khách dùng lời lẽ xúc phạm nặng nề.",
              score: 2,
              feedback: "Bị kéo vào cuộc đấu khẩu sẽ phá hỏng hoàn toàn cơ hội giữ khách hàng."
            },
            {
              text: "Xin lỗi liên tục nhưng lúng túng không đưa ra được phương án giải quyết rõ ràng.",
              score: 3,
              feedback: "Giữ bình tĩnh tốt, nhưng khách hàng cần thấy cả sự đồng cảm lẫn hướng xử lý cụ thể."
            },
            {
              text: "Giữ giọng trầm ấm, để khách xả hết bức xúc trong 1–2 phút, xác nhận lại vấn đề của họ và cam kết hành động khắc phục cụ thể ngay lập tức.",
              score: 4,
              feedback: "Xử lý khủng hoảng tuyệt vời! Hạ nhiệt cảm xúc trước, giải quyết sự cố ngay sau đó."
            },
            {
              text: "Ngắt lời ngay để giải thích rằng đây là lỗi của đơn vị vận chuyển chứ không phải bên bạn.",
              score: 1,
              feedback: "Đẩy trách nhiệm khi khách đang hoảng loạn chỉ khiến họ tức giận gấp đôi."
            }
          ],
          explanation:
            "Khi đối diện cơn giận của người khác, người làm chủ được mình không phản chiếu lại sự kích động mà giữ giọng điệu ổn định như một 'mỏ neo cảm xúc'."
        },
        {
          id: "wl-09",
          dimension: "motivation",
          context: "Thay đổi công nghệ",
          question:
            "Công ty áp dụng một quy trình và phần mềm mới khá phức tạp khiến tốc độ làm việc tuần đầu bị chậm lại rõ rệt và nhiều người phàn nàn. Thái độ của bạn là gì?",
          options: [
            {
              text: "Chấp nhận học theo hướng dẫn để hoàn thành công việc của mình cho đúng quy định.",
              score: 3,
              feedback: "Tinh thần hợp tác tốt; chủ động chia sẻ mẹo hay sẽ giúp bạn nâng tầm ảnh hưởng trong nhóm."
            },
            {
              text: "Chủ động dành thời gian làm quen hệ thống mới, ghi chú lại các mẹo sử dụng nhanh để chia sẻ cho đồng nghiệp và góp ý lỗi thực tế cho bộ phận kỹ thuật.",
              score: 4,
              feedback: "Tư duy chủ động tuyệt vời! Bạn biến giai đoạn khó khăn thành cơ hội tạo giá trị cho tập thể."
            },
            {
              text: "Miễn cưỡng dùng theo yêu cầu nhưng làm chậm lại và đợi có người chỉ từng bước.",
              score: 2,
              feedback: "Thụ động chờ đợi khiến quá trình thích nghi của chính bạn kéo dài hơn."
            },
            {
              text: "Tham gia hội than vãn cùng mọi người và tìm cách lách luật quay về dùng cách cũ.",
              score: 1,
              feedback: "Chống đối thay đổi làm bạn tụt lại phía sau và lan truyền năng lượng tiêu cực."
            }
          ],
          explanation:
            "Động lực nội tại và tư duy cầu tiến thể hiện rõ nhất khi môi trường thay đổi: thay vì tiêu tốn năng lượng phàn nàn, bạn đầu tư năng lượng vào việc làm chủ công cụ mới."
        },
        {
          id: "wl-10",
          dimension: "empathy",
          context: "Xung đột liên phòng ban",
          question:
            "Phòng Kinh doanh liên tục hối thúc Phòng Kỹ thuật giao tính năng gấp, trong khi Phòng Kỹ thuật bức xúc vì bị ép tiến độ phi thực tế. Bạn đứng giữa kết nối hai bên thế nào?",
          options: [
            {
              text: "Khuyên hai bên bình tĩnh nhường nhịn nhau một chút vì lợi ích công ty.",
              score: 3,
              feedback: "Có thiện chí hòa giải, nhưng cần chỉ rõ điểm chạm lợi ích và thứ tự ưu tiên cụ thể mới giải quyết được nút thắt."
            },
            {
              text: "Đứng về phía phòng của mình và chê trách phòng kia 'chẳng hiểu gì về chuyên môn'.",
              score: 1,
              feedback: "Tâm lý phe nhóm làm chia rẽ tổ chức và bế tắc mục tiêu chung."
            },
            {
              text: "Giúp mỗi bên hiểu áp lực thật của bên kia (áp lực doanh số vs rủi ro lỗi hệ thống), rồi dẫn dắt cả hai thống nhất thứ tự ưu tiên theo từng giai đoạn.",
              score: 4,
              feedback: "Thấu cảm chiến lược! Bạn chuyển cuộc chiến giữa hai phòng thành bài toán tối ưu chung cho khách hàng."
            },
            {
              text: "Chuyển tiếp y nguyên các tin nhắn căng thẳng qua lại giữa hai bên cho họ tự đấu với nhau.",
              score: 2,
              feedback: "Làm 'người đưa thư thụ động' dễ khuếch đại hiểu lầm."
            }
          ],
          explanation:
            "Thấu cảm trong tổ chức là khả năng 'dịch' ngôn ngữ áp lực của bộ phận này sang mối quan tâm của bộ phận kia để tìm ra giải pháp dung hòa."
        },
        {
          id: "wl-11",
          dimension: "social_skills",
          context: "Xây dựng mạng lưới",
          question:
            "Bạn mới chuyển sang môi trường làm việc mới được 2 tuần, chưa quen ai và thấy các nhóm đồng nghiệp cũ chơi khá khép kín. Bạn chủ động hòa nhập ra sao?",
          options: [
            {
              text: "Chủ động chào hỏi chân thành, lắng nghe văn hóa nhóm, đề nghị hỗ trợ nhỏ trong công việc và rủ 1–2 đồng nghiệp cùng dự án ăn trưa để tìm hiểu nhau tự nhiên.",
              score: 4,
              feedback: "Cách hòa nhập tinh tế! Từng bước xây dựng niềm tin qua tương tác nhỏ và sự chân thành."
            },
            {
              text: "Cố gắng chen vào mọi cuộc nói chuyện đùa cợt của nhóm cũ ngay lập tức để lấy lòng.",
              score: 2,
              feedback: "Quá vồ vập hoặc gượng ép dễ gây cảm giác thiếu tự nhiên."
            },
            {
              text: "Ngồi im ở bàn làm việc suốt ngày, nghĩ thầm 'ai cần thì tự ra bắt chuyện với mình'.",
              score: 1,
              feedback: "Sự khép kín thụ động dễ khiến người khác hiểu nhầm bạn khó gần."
            },
            {
              text: "Hỏi thăm công việc sếp giao là chính, đợi vài tháng quen dần rồi tính tiếp.",
              score: 3,
              feedback: "An toàn và lịch sự, nhưng chủ động mở kết nối nhỏ sớm sẽ giúp công việc trôi chảy hơn nhiều."
            }
          ],
          explanation:
            "Kỹ năng xã hội hiệu quả không cần phải ồn ào hướng ngoại; nó nằm ở sự chủ động ấm áp, quan tâm chân thành và nhịp độ tiếp cận tôn trọng không gian của người khác."
        },
        {
          id: "wl-12",
          dimension: "empathy",
          context: "Nhân sự mới lúng túng",
          question:
            "Một bạn thực tập sinh mới vào làm việc rất lúng túng, hỏi đi hỏi lại những thao tác cơ bản đúng lúc bạn đang bận. Bạn phản ứng thế nào?",
          options: [
            {
              text: "Thở dài tỏ vẻ khó chịu và bảo: 'Có thế mà cũng không tự tìm hiểu được à?'",
              score: 1,
              feedback: "Thái độ trịch thượng khiến người mới sợ hãi, giấu dốt và dễ gây lỗi nghiêm trọng về sau."
            },
            {
              text: "Hiểu cảm giác choáng ngợp ngày đầu đi làm, hẹn bạn ấy đúng 15 phút sau bạn xong việc sẽ ngồi chỉ hệ thống 1 lần và gửi tài liệu mẫu để bạn tự tra cứu.",
              score: 4,
              feedback: "Tuyệt vời! Bạn vừa giữ được sự thấu cảm với người mới, vừa bảo vệ được thời gian tập trung của bản thân."
            },
            {
              text: "Làm hộ luôn cho nhanh để đỡ mất thời gian chỉ dẫn.",
              score: 2,
              feedback: "Làm thay vừa mất thời gian của bạn vừa tước đi cơ hội học của bạn mới."
            },
            {
              text: "Dừng việc đang làm ngay để trả lời từng câu hỏi nhỏ dù công việc của mình đang gấp.",
              score: 3,
              feedback: "Rất nhiệt tình, tuy nhiên biết hẹn khung giờ cố định và hướng dẫn cách tự tra cứu sẽ hiệu quả hơn cho cả hai."
            }
          ],
          explanation:
            "Thấu cảm kết hợp ranh giới công việc giúp bạn hỗ trợ người khác mà không đánh mất nhịp độ làm việc của chính mình."
        }
      ]
    },
    {
      id: "relationship-love",
      title: "EQ Trong Tình Yêu, Gia Đình & Tri Kỷ",
      shortTitle: "EQ Tình Yêu & Gia Đình",
      category: "relationship",
      categoryLabel: "Tình cảm",
      level: "Thực tế",
      durationMinutes: 12,
      icon: "💞",
      accentColor: "#ec4899",
      description:
        "Khám phá cách bạn lắng nghe, giải quyết bất đồng, hóa giải chiến tranh lạnh, kiểm soát ghen tuông và nuôi dưỡng sự an toàn cảm xúc trong các mối quan hệ thân mật.",
      tags: ["12 câu hỏi", "Tình yêu & Gia đình", "Giao tiếp phi bạo lực"],
      questions: [
        {
          id: "rl-01",
          dimension: "social_skills",
          context: "Tranh cãi leo thang",
          question:
            "Bạn và người yêu/bạn đời đang cãi nhau về một thói quen sinh hoạt. Đối phương bắt đầu nói câu quy chụp: 'Lúc nào anh/em cũng chỉ biết nghĩ cho bản thân mình thôi!'. Bạn đáp lại thế nào?",
          options: [
            {
              text: "Bỏ ra ngoài đóng sầm cửa hoặc im lặng cả tuần cho đối phương tự suy nghĩ.",
              score: 2,
              feedback: "Rút lui cắt đứt kết nối mà không hẹn quay lại tạo ra cảm giác bị bỏ rơi rất lớn."
            },
            {
              text: "Cố gắng giải thích thật dài rằng bạn không hề ích kỷ và liệt kê hết những điều bạn đã hy sinh.",
              score: 3,
              feedback: "Bạn muốn chứng minh thiện chí, nhưng lúc cảm xúc đang cao thì giải thích lý lẽ thường không vào tai đối phương."
            },
            {
              text: "Phản công lại ngay: 'Thế còn anh/em thì sao? Hồi tháng trước ai mới là người ích kỷ?'",
              score: 1,
              feedback: "Lôi chuyện cũ ra tấn công ngược sẽ biến cuộc nói chuyện thành trận chiến ai thắng ai thua."
            },
            {
              text: "Hít sâu, không nhảy vào tranh luận từ 'lúc nào cũng': 'Mình thấy cả hai đang căng rồi. Có vẻ bạn đang thấy tủi thân vì việc vừa rồi. Mình nghỉ 15 phút uống nước rồi nói chuyện tiếp để tìm cách giải quyết nhé.'",
              score: 4,
              feedback: "Giao tiếp phi bạo lực chuẩn mực! Bạn hạ nhiệt chiến tranh, chạm tới cảm xúc thật và giữ cam kết đối thoại."
            }
          ],
          explanation:
            "Khi đối phương dùng từ tuyệt đối ('lúc nào cũng', 'chẳng bao giờ'), đó là tiếng kêu của cảm giác tổn thương chứ không phải sự thật thống kê. Hạ nhiệt và hẹn quay lại đối thoại là cách giữ gìn mối quan hệ bền vững nhất."
        },
        {
          id: "rl-02",
          dimension: "empathy",
          context: "Chia sẻ nỗi buồn",
          question:
            "Người thương của bạn đi làm về với gương mặt mệt mỏi và kể một chuyện ấm ức với đồng nghiệp. Bạn phản ứng thế nào để họ cảm thấy được nâng đỡ nhất?",
          options: [
            {
              text: "Ôm hoặc ngồi cạnh lắng nghe chăm chú, xác nhận cảm xúc của họ ('Nghe mệt mỏi thật đấy'), rồi hỏi nhỏ: 'Lúc này bạn muốn mình chỉ ngồi nghe hay muốn cùng bàn cách xử lý?'",
              score: 4,
              feedback: "Quá tinh tế! Câu hỏi 'muốn được lắng nghe hay muốn tìm giải pháp' giúp đáp ứng chính xác nhu cầu cảm xúc."
            },
            {
              text: "Bảo 'Chuyện nhỏ xíu ấy mà cũng để tâm làm gì cho mệt đầu, quên đi'.",
              score: 1,
              feedback: "Gạt nhẹ nỗi buồn của người thân khiến họ cảm thấy mình yếu đuối hoặc không được thấu hiểu."
            },
            {
              text: "Nghe một lúc rồi pha trò đùa để chọc cho họ cười quên chuyện buồn.",
              score: 3,
              feedback: "Có ý tốt làm dịu không khí, nhưng cần chắc chắn họ đã được giải tỏa nỗi ấm ức trước đã."
            },
            {
              text: "Lập tức liệt kê 5 bước chỉ họ cách đấu tranh lại đồng nghiệp đó.",
              score: 2,
              feedback: "Nhảy vào 'sửa chữa vấn đề' quá sớm đôi khi làm người kể thấy cảm xúc của mình chưa được lắng nghe."
            }
          ],
          explanation:
            "Mỗi người có nhu cầu khác nhau khi mệt mỏi: phần lớn cần được công nhận cảm xúc trước tiên trước khi sẵn sàng nghe phân tích giải pháp."
        },
        {
          id: "rl-03",
          dimension: "self_awareness",
          context: "Cảm giác ghen tuông",
          question:
            "Bạn thấy người yêu nhắn tin cười nói khá vui vẻ với một người bạn khác giới. Một luồng khó chịu và ghen tuông dâng lên trong bạn. Bước đầu tiên bạn làm là gì?",
          options: [
            {
              text: "Mặt nặng mày nhẹ, hỏi móc mỉa: 'Bạn thân thiết quá nhỉ, chắc vui hơn nói chuyện với tôi rồi'.",
              score: 2,
              feedback: "Nói mỉa giấu đi nỗi sợ thật và khiến đối phương rơi vào thế phòng thủ."
            },
            {
              text: "Tự quan sát xem cảm giác bất an đến từ hành động đáng ngờ thực tế hay từ nỗi sợ bị bỏ rơi bên trong mình, sau đó chia sẻ thẳng thắn nhưng nhẹ nhàng về cảm giác của bản thân.",
              score: 4,
              feedback: "Rất trưởng thành! Tự soi chiếu nỗi bất an trước khi đối thoại chân thành giúp mối quan hệ sâu sắc hơn."
            },
            {
              text: "Cố nén lại không nói gì vì sợ mình bị đánh giá là nhỏ nhen, hay ghen.",
              score: 3,
              feedback: "Kiềm chế không bùng nổ là tốt, nhưng giữ nỗi bất an một mình lâu ngày sẽ tạo khoảng cách."
            },
            {
              text: "Lén kiểm tra điện thoại của họ lúc họ đi tắm để tìm bằng chứng.",
              score: 1,
              feedback: "Xâm phạm quyền riêng tư phá vỡ nền tảng tin tưởng nhanh hơn bất cứ điều gì."
            }
          ],
          explanation:
            "Ghen tuông thường là lớp vỏ bọc của nỗi sợ mất kết nối hoặc thiếu an toàn nội tâm. Nói rõ nhu cầu được trấn an bằng thông điệp 'Tôi cảm thấy...' hiệu quả hơn việc buộc tội."
        },
        {
          id: "rl-04",
          dimension: "self_regulation",
          context: "Lỡ lời làm tổn thương",
          question:
            "Trong lúc mệt mỏi và mất bình tĩnh, bạn đã lỡ nói một câu khá nặng lời làm người thân rơi nước mắt. Vài phút sau bạn nhận ra mình đã quá đáng. Bạn làm gì?",
          options: [
            {
              text: "Sĩ diện không muốn xuống nước trước nên cứ im lặng chờ chuyện tự nguôi.",
              score: 1,
              feedback: "Đặt sĩ diện cao hơn tình cảm sẽ tích tụ những vết sẹo ngầm khó chữa."
            },
            {
              text: "Tỏ ra bình thường như chưa có gì xảy ra, mua đồ ăn về coi như tự huề.",
              score: 3,
              feedback: "Cử chỉ làm lành có thiện chí, nhưng một lời thừa nhận sai trực tiếp vẫn rất cần để đối phương cảm thấy được tôn trọng."
            },
            {
              text: "Chủ động xin lỗi chân thành, nhận trách nhiệm hoàn toàn về lời nói của mình mà không kèm chữ 'nhưng tại bạn...'.",
              score: 4,
              feedback: "Bản lĩnh thực sự! Lời xin lỗi không kèm biện minh giúp hàn gắn vết rạn nhanh nhất."
            },
            {
              text: "Giải thích: 'Tại lúc đó em mệt quá với anh nói khích trước nên em mới thế chứ bình thường đâu có vậy'.",
              score: 2,
              feedback: "Xin lỗi kèm từ 'nhưng/tại' thực chất đang đổ một phần lỗi sang người vừa bị tổn thương."
            }
          ],
          explanation:
            "Trong tình cảm, khả năng 'sửa chữa sau rạn nứt' (Repair Attempt) quan trọng hơn việc không bao giờ cãi nhau. Xin lỗi thẳng thắn thể hiện sự làm chủ cái tôi."
        },
        {
          id: "rl-05",
          dimension: "social_skills",
          context: "Nhu cầu không gian riêng",
          question:
            "Cuối tuần bạn rất cần khoảng 2 tiếng yên tĩnh một mình để nạp lại năng lượng, nhưng người yêu/gia đình lại muốn rủ bạn đi chơi cả ngày. Bạn giao tiếp thế nào?",
          options: [
            {
              text: "Bịa đại lý do có việc đột xuất ở công ty để trốn ở nhà một mình cho đỡ áy náy.",
              score: 3,
              feedback: "Giữ được không gian riêng nhưng dùng lời nói dối dễ tạo thói quen thiếu minh bạch."
            },
            {
              text: "Cố gắng chiều lòng đi cả ngày nhưng suốt buổi mặt mày ủ rũ, mệt mỏi, ít nói.",
              score: 2,
              feedback: "Chiều lòng trong trạng thái kiệt sức khiến cả hai đều không tận hưởng được thời gian bên nhau."
            },
            {
              text: "Gắt lên: 'Sao lúc nào cũng kè kè bên nhau thế, để người ta thở với chứ!'",
              score: 1,
              feedback: "Cách nói gây tổn thương mạnh, khiến người thân nghĩ bạn chán ghét họ."
            },
            {
              text: "Nói rõ ràng và ấm áp: 'Cuối tuần mình rất muốn dành thời gian bên bạn, sáng mình xin 2 tiếng nghỉ nạp năng lượng một chút rồi chiều 2h mình đi chơi trọn vẹn với nhau nhé!'",
              score: 4,
              feedback: "Tuyệt vời! Bạn vừa giữ được ranh giới chăm sóc bản thân, vừa khẳng định tình cảm để người kia không thấy bị hắt hủi."
            }
          ],
          explanation:
            "Trình bày nhu cầu cá nhân gắn với sự khẳng định cam kết tình cảm ('mình cần X để có thể hiện diện tốt hơn cùng bạn ở Y') là bí quyết giữ hòa khí của các cặp đôi bền vững."
        },
        {
          id: "rl-06",
          dimension: "motivation",
          context: "Nuôi dưỡng tình cảm dài lâu",
          question:
            "Sau giai đoạn nồng nhiệt ban đầu, mối quan hệ của bạn trở nên đều đều, ít nói chuyện sâu và dễ cáu vặt với nhau. Bạn chủ động làm gì?",
          options: [
            {
              text: "Than phiền rằng đối phương thay đổi, không còn lãng mạn như hồi mới quen nữa.",
              score: 2,
              feedback: "Chờ đợi đối phương tự thay đổi mà mình không gợi mở chỉ làm tăng thất vọng."
            },
            {
              text: "Nghĩ rằng chắc 'hết duyên' hoặc tình cảm phai nhạt rồi và bắt đầu buông xuôi, tìm niềm vui bên ngoài.",
              score: 1,
              feedback: "Nhầm lẫn giữa sự chuyển pha tự nhiên của gắn bó lâu dài với việc hết yêu."
            },
            {
              text: "Chủ động tạo những cuộc hẹn 'không điện thoại', cùng trò chuyện về mong muốn hiện tại và thử một trải nghiệm mới cùng nhau để làm mới kết nối.",
              score: 4,
              feedback: "Động lực vun đắp chủ động! Tình yêu dài lâu là một lựa chọn hành động mỗi ngày."
            },
            {
              text: "Chấp nhận cuộc sống lâu năm nào cũng nhạt vậy thôi, miễn không cãi nhau to là được.",
              score: 3,
              feedback: "Ổn định nhưng thiếu chất nuôi dưỡng có thể làm hai người dần trở thành 'bạn cùng phòng'."
            }
          ],
          explanation:
            "Động lực trong mối quan hệ thể hiện ở tinh thần chủ động đầu tư thời gian chất lượng thay vì mặc nhiên coi sự hiện diện của người thân là điều hiển nhiên."
        },
        {
          id: "rl-07",
          dimension: "empathy",
          context: "Khác biệt ngôn ngữ yêu thương",
          question:
            "Bạn thể hiện tình cảm bằng cách mua quà hoặc nói lời ngọt ngào, còn người kia ít nói nhưng lại hay âm thầm sửa đồ, dọn dẹp hoặc lo việc vặt giúp bạn. Bạn nhìn nhận sự khác biệt này ra sao?",
          options: [
            {
              text: "Hiểu rằng họ đang yêu bạn theo 'ngôn ngữ hành động', trân trọng điều họ làm và chia sẻ nhẹ nhàng về những cử chỉ nhỏ bạn mong muốn nhận được thêm.",
              score: 4,
              feedback: "Thấu cảm sâu sắc! Biết trân trọng cách yêu của họ và hướng dẫn nhẹ nhàng nhu cầu của mình."
            },
            {
              text: "Cũng làm lại các việc thực tế giống họ và bớt đòi hỏi lời nói lãng mạn đi.",
              score: 3,
              feedback: "Thích ứng tốt, nhưng đối thoại cởi mở để cả hai cùng hiểu ngôn ngữ của nhau sẽ trọn vẹn hơn."
            },
            {
              text: "Tự nhủ thôi tính họ vậy rồi chịu vậy, nhưng vẫn thầm chạnh lòng mỗi dịp lễ.",
              score: 2,
              feedback: "Chịu đựng mà không giao tiếp nhu cầu sẽ khiến sự chạnh lòng lớn dần."
            },
            {
              text: "Kết luận họ là người khô khan, vô tâm vì không nói được một câu yêu thương tử tế.",
              score: 1,
              feedback: "Chỉ công nhận ngôn ngữ yêu thương giống mình khiến bạn bỏ lỡ rất nhiều tình cảm thật của đối phương."
            }
          ],
          explanation:
            "Mỗi người trưởng thành trong một gia đình khác nhau nên có 'ngôn ngữ tình yêu' khác nhau. Nhận ra thiện ý đằng sau hành động khác biệt là nền tảng của sự gắn kết."
        },
        {
          id: "rl-08",
          dimension: "self_regulation",
          context: "Bất đồng quan điểm gia đình",
          question:
            "Trong bữa cơm gia đình, một người họ hàng bất ngờ hỏi những câu riêng tư kém duyên (chuyện lương bổng, lập gia đình, sinh con) với giọng chê bai. Bạn phản ứng thế nào?",
          options: [
            {
              text: "Nổi đóa cãi tay đôi ngay giữa mâm cơm khiến cả nhà sượng trân.",
              score: 1,
              feedback: "Phản ứng mạnh dễ làm không khí gia đình căng thẳng và câu chuyện bị đẩy đi xa mục đích."
            },
            {
              text: "Cười gượng trả lời đại cho qua rồi vào phòng ngồi khóc hoặc bực tức cả tuần.",
              score: 2,
              feedback: "Không bảo vệ được ranh giới tinh thần khiến bạn mang theo sự ấm ức kéo dài."
            },
            {
              text: "Trả lời ngắn gọn lịch sự rồi lảng sang việc bưng bê phụ giúp dưới bếp.",
              score: 3,
              feedback: "Cách rút lui an toàn và chừng mực."
            },
            {
              text: "Giữ nụ cười nhẹ nhàng, trả lời hài hước nhưng dứt khoát để khép chủ đề ('Cháu đang tận hưởng nhịp sống hiện tại lắm ạ, dạo này cô chú khỏe không?') rồi lái sang chuyện khác.",
              score: 4,
              feedback: "Khéo léo bậc thầy! Giữ trọn hòa khí gia đình mà vẫn bảo vệ vững ranh giới riêng tư."
            }
          ],
          explanation:
            "Kỹ năng 'chuyển hướng lịch sự' (Polite Deflection) kết hợp kiểm soát cảm xúc giúp bạn không bị cuốn vào sự soi mói của người khác."
        },
        {
          id: "rl-09",
          dimension: "social_skills",
          context: "Thiết lập thỏa thuận",
          question:
            "Bạn thấy mình đang phải gánh gần hết việc nhà dù cả hai đều đi làm cả ngày. Bạn mở lời nói chuyện với bạn đời/người ở cùng thế nào?",
          options: [
            {
              text: "Nhờ làm giúp từng việc vặt mỗi ngày một cách ngẫu hứng khi thấy mệt.",
              score: 3,
              feedback: "Có biết nhờ vả là tốt, nhưng phân công rõ ràng ngay từ đầu sẽ giảm hẳn áp lực phải nhắc nhở."
            },
            {
              text: "Chọn lúc cả hai thoải mái, dùng thông điệp 'Tôi': 'Dạo này làm xong việc nhà mình thấy khá đuối. Mình cùng ngồi liệt kê các đầu việc và chia lại lịch cho công bằng hơn nhé.'",
              score: 4,
              feedback: "Tuyệt vời! Nêu cảm giác thật của mình và mời đối phương cùng xây giải pháp, không công kích."
            },
            {
              text: "Im lặng làm nhưng cố tình quăng quật đồ đạc cho đối phương tự thấy có lỗi.",
              score: 1,
              feedback: "Bộc lộ bực dọc gián tiếp hiếm khi khiến người khác tự hiểu đúng ý, mà chỉ gây căng thẳng."
            },
            {
              text: "Trách móc gay gắt: 'Anh/em coi nhà này như khách sạn à, chẳng bao giờ đụng tay vào việc gì!'",
              score: 2,
              feedback: "Lời chỉ trích nặng nề làm người nghe phòng thủ và tranh cãi xem ai vất vả hơn."
            }
          ],
          explanation:
            "Thỏa thuận rõ ràng biến mâu thuẫn giữa 'người này chống lại người kia' thành 'hai người cùng hợp tác giải quyết danh sách việc chung'."
        },
        {
          id: "rl-10",
          dimension: "self_awareness",
          context: "Nhận diện kiểu gắn bó",
          question:
            "Mỗi khi người yêu nhắn tin trả lời chậm hơn bình thường vài tiếng, bạn lập tức nghĩ đến kịch bản xấu nhất là họ hết tình cảm hoặc đang giận mình. Bạn làm gì với suy nghĩ này?",
          options: [
            {
              text: "Giận lẫy, lúc họ nhắn lại thì cố tình không trả lời cho biết mặt.",
              score: 2,
              feedback: "Trả đũa cảm xúc tạo ra vòng lặp căng thẳng không hồi kết."
            },
            {
              text: "Nhận ra 'Não mình đang tự vẽ kịch bản lo âu dựa trên nỗi sợ cũ, chưa có bằng chứng thực tế', tự quay lại làm một việc mình thích và chờ họ rảnh phản hồi.",
              score: 4,
              feedback: "Tự nhận thức xuất sắc! Bạn tách được giả thuyết lo âu khỏi thực tế khách quan."
            },
            {
              text: "Nhắn liên tiếp 5–10 tin hỏi dồn 'Sao không trả lời?', 'Đang ở đâu với ai?'",
              score: 1,
              feedback: "Hành vi truy đuổi theo lo âu dễ khiến đối phương ngột ngạt và né tránh thêm."
            },
            {
              text: "Chịu đựng lo lắng suốt mấy tiếng nhưng cố gắng không nhắn thêm gì.",
              score: 3,
              feedback: "Kiềm chế được hành động bộc phát là tốt, kết hợp tự đối thoại làm dịu lo âu sẽ giúp bạn nhẹ nhõm hơn."
            }
          ],
          explanation:
            "Hiểu được cơ chế 'suy diễn thảm họa' khi lo âu giúp bạn không phản ứng quá mức trước những khoảng lặng bình thường trong cuộc sống của đối phương."
        },
        {
          id: "rl-11",
          dimension: "empathy",
          context: "Tha thứ thực chất",
          question:
            "Một người bạn thân từng lỡ lời làm bạn buồn rất lâu, nay họ chủ động hẹn gặp xin lỗi thật lòng. Bạn xử lý cảm xúc của mình ra sao?",
          options: [
            {
              text: "Nói 'không sao đâu, quên đi' ngay dù thực ra trong lòng vẫn còn hơi gợn.",
              score: 3,
              feedback: "Có thiện chí giảng hòa, nhưng nói nhẹ về điều từng khiến bạn buồn sẽ giúp gợn trong lòng tan hẳn."
            },
            {
              text: "Nhận lời tha thứ trên miệng nhưng lần nào gặp cũng nhắc lại lỗi cũ để họ nhớ.",
              score: 1,
              feedback: "Giữ lỗi cũ làm vũ khí khiến mối quan hệ không bao giờ thực sự bình thường lại được."
            },
            {
              text: "Cắt đứt luôn không cần nghe giải thích vì nguyên tắc sống là không tha thứ sai lầm.",
              score: 2,
              feedback: "Ranh giới quá cứng nhắc có thể khiến bạn mất đi những mối quan hệ đáng quý chỉ vì một lần sơ suất."
            },
            {
              text: "Lắng nghe lời xin lỗi, chia sẻ trung thực về điều đã làm mình tổn thương trước đây để khép lại trọn vẹn, và cho cả hai cơ hội xây dựng lại niềm tin từng bước.",
              score: 4,
              feedback: "Chín chắn và bao dung đúng mực! Tha thứ nhưng vẫn trung thực với cảm xúc của mình."
            }
          ],
          explanation:
            "Tha thứ lành mạnh không có nghĩa là giả vờ chưa từng đau; nó là bày tỏ sự thật một cách bình tĩnh và chọn buông bỏ quyền trừng phạt."
        },
        {
          id: "rl-12",
          dimension: "motivation",
          context: "Giữ bản sắc cá nhân",
          question:
            "Khi bước vào một mối quan hệ tình cảm sâu sắc, bạn thường có xu hướng phân bổ tâm trí cho công việc, sở thích riêng và bạn bè xung quanh thế nào?",
          options: [
            {
              text: "Vẫn duy trì đam mê, mục tiêu cá nhân và các kết nối bạn bè lành mạnh song song với việc đầu tư nghiêm túc cho mối quan hệ.",
              score: 4,
              feedback: "Cân bằng lý tưởng! Hai cá thể độc lập và hạnh phúc mới tạo nên mối quan hệ bền vững."
            },
            {
              text: "Giữ cuộc sống riêng rất kín, ít chia sẻ thế giới của mình với người yêu vì sợ mất tự do.",
              score: 2,
              feedback: "Độc lập quá mức trở thành phòng vệ, cản trở sự thân mật sâu sắc."
            },
            {
              text: "Cố gắng cân đối, nhưng nếu người yêu rủ là ưu tiên hủy hết lịch cá nhân ngay.",
              score: 3,
              feedback: "Nhiệt thành là đáng quý, nhưng giữ ổn định một vài nhịp sinh hoạt riêng vẫn rất cần thiết."
            },
            {
              text: "Dồn 100% thời gian và cảm xúc xoay quanh người yêu, bỏ hết bạn bè và sở thích cũ.",
              score: 1,
              feedback: "Đánh mất bản sắc cá nhân tạo áp lực khổng lồ lên đối phương và dễ sụp đổ nếu tình cảm lung lay."
            }
          ],
          explanation:
            "Động lực cá nhân lành mạnh giúp bạn đứng vững trên đôi chân của mình, yêu từ sự trọn vẹn chứ không phải từ sự thiếu thốn cần người khác lấp đầy."
        }
      ]
    },
    {
      id: "stress-resilience",
      title: "Quản Trị Áp Lực, Cơn Giận & Phục Hồi Tinh Thần",
      shortTitle: "Quản Trị Áp Lực & Cơn Giận",
      category: "resilience",
      categoryLabel: "Kiểm soát cảm xúc",
      level: "Chuyên sâu",
      durationMinutes: 10,
      icon: "🛡️",
      accentColor: "#f59e0b",
      description:
        "Kiểm tra sức bền tâm lý khi đối diện khủng hoảng bất ngờ, bị khiêu khích trực diện, áp lực kiệt sức (burnout) và cách bạn phục hồi sau vấp ngã.",
      tags: ["12 câu hỏi", "Áp lực & Cơn giận", "Phục hồi tinh thần"],
      questions: [
        {
          id: "sr-01",
          dimension: "self_regulation",
          context: "Phản xạ trước khiêu khích",
          question:
            "Trên mạng xã hội hoặc trong một nhóm bình luận công việc, có người dùng lời lẽ mỉa mai nặng nề nhắm vào quan điểm bạn chia sẻ. Nhịp tim bạn tăng nhanh. Bạn làm gì?",
          options: [
            {
              text: "Gõ ngay một bình luận dài vạch trần sự thiếu hiểu biết của họ để mọi người thấy ai mới đúng.",
              score: 1,
              feedback: "Lao vào tranh cãi lúc đang kích động hiếm khi thay đổi được người kia mà chỉ đốt năng lượng của bạn."
            },
            {
              text: "Đóng tab lại, đứng dậy đi uống một ngụm nước 10 phút; khi bình tĩnh mới đánh giá xem có cần phản hồi lịch sự bằng 1 câu ngắn hay lướt qua luôn.",
              score: 4,
              feedback: "Tuyệt vời! Bạn bảo vệ được bình yên tinh thần và không để người lạ kiểm soát cảm xúc của mình."
            },
            {
              text: "Cố tỏ ra bình thản trả lời lại một câu mỉa mai nhẹ thâm thúy cho bõ tức.",
              score: 3,
              feedback: "Ít gay gắt hơn chửi bới trực diện, nhưng vẫn đang nuôi dưỡng vòng xoáy hơn thua."
            },
            {
              text: "Xóa ngay bài viết của mình và tự trách sao mình dại dột đi chia sẻ để bị chửi.",
              score: 2,
              feedback: "Thu mình tự trách quá mức khiến bạn mất tự tin vào giá trị quan điểm cá nhân."
            }
          ],
          explanation:
            "Kẻ thắng trong một cuộc khiêu khích không phải người nói câu sau cùng, mà là người giữ được quyền kiểm soát năng lượng tinh thần của chính mình."
        },
        {
          id: "sr-02",
          dimension: "self_awareness",
          context: "Dấu hiệu kiệt sức (Burnout)",
          question:
            "Mấy tuần nay bạn ngủ dậy vẫn thấy mệt, việc nhỏ cũng dễ phát cáu và chẳng còn hứng thú với thứ mình từng thích. Bạn đối diện trạng thái này thế nào?",
          options: [
            {
              text: "Xin nghỉ phép 1 ngày đi chơi giải khuây nhưng sau đó lại quay về đúng lịch trình quá tải cũ.",
              score: 3,
              feedback: "Biết cho mình nghỉ ngơi là tốt, nhưng cần điều chỉnh cả gốc rễ phân bổ tải công việc."
            },
            {
              text: "Bỏ mặc mọi việc vài ngày nằm dài lướt điện thoại liên tục rồi lại lo âu vì việc chất đống.",
              score: 2,
              feedback: "Nghỉ ngơi thụ động kèm lo âu tội lỗi không giúp não bộ phục hồi thực sự."
            },
            {
              text: "Nhận diện đây là tín hiệu kiệt sức (burnout), rà soát xem yếu tố nào đang rút năng lượng mạnh nhất và chủ động cắt giảm bớt việc không thiết yếu để nghỉ phục hồi.",
              score: 4,
              feedback: "Tự nhận thức xuất sắc! Bạn lắng nghe cơ thể như một hệ thống cảnh báo thông minh."
            },
            {
              text: "Uống thêm thật nhiều cà phê, tự thúc ép 'mình yếu đuối quá, phải cày tiếp mới kịp người ta'.",
              score: 1,
              feedback: "Ép cơ thể chạy vượt ngưỡng báo động đỏ chỉ dẫn tới sụp đổ nặng hơn."
            }
          ],
          explanation:
            "Burnout không phải là lười biếng; đó là hậu quả của việc tiêu hao cảm xúc kéo dài mà thiếu tái tạo. Tự nhận thức sớm giúp bạn điều chỉnh trước khi cơ thể ép bạn dừng lại."
        },
        {
          id: "sr-03",
          dimension: "self_regulation",
          context: "Sự cố tài chính/vật chất",
          question:
            "Bạn vô tình làm rơi vỡ chiếc điện thoại mới mua hoặc làm mất một khoản tiền vừa rút ngay trước ngày có việc cần dùng. Bạn xử lý cơn hoảng loạn thế nào?",
          options: [
            {
              text: "Dằn vặt bản thân suốt cả tuần, cáu gắt với tất cả những ai hỏi thăm vì quá bực.",
              score: 1,
              feedback: "Tự trách và trút giận không lấy lại được món đồ mà chỉ làm tổn thất thêm tinh thần."
            },
            {
              text: "Gọi điện than vãn với người thân thật lâu để được an ủi rồi mới tính tiếp.",
              score: 3,
              feedback: "Tìm điểm tựa cảm xúc là tự nhiên, sau đó chuyển sang hành động khắc phục nhanh là ổn."
            },
            {
              text: "Cố gắng cười nói như không sao nhưng đêm về trằn trọc mất ngủ vì xót của.",
              score: 2,
              feedback: "Kìm nén cảm xúc xót xa khiến căng thẳng chuyển thành mất ngủ."
            },
            {
              text: "Cho phép mình tiếc nuối vài phút, hít thở sâu chấp nhận sự việc đã xảy ra rồi lập tức kiểm tra phương án dự phòng thực tế nhất (sao lưu dữ liệu, cân đối ngân sách).",
              score: 4,
              feedback: "Bình tĩnh đáng nể! Bạn dừng tổn thất thứ hai (tổn thất tinh thần) rất nhanh."
            }
          ],
          explanation:
            "Trong tâm lý học ứng phó khủng hoảng, mất mát đầu tiên là vật chất; mất mát thứ hai do hoảng loạn và dằn vặt là thứ ta hoàn toàn có thể kiểm soát."
        },
        {
          id: "sr-04",
          dimension: "motivation",
          context: "Vượt qua chuỗi thất bại",
          question:
            "Bạn liên tiếp gặp 3 trở ngại lớn trong một tháng (dự án bị hủy, sức khỏe trục trặc, hiểu lầm bạn bè). Cảm giác 'mọi thứ chống lại mình' ập tới. Điều gì giúp bạn đứng dậy?",
          options: [
            {
              text: "Gồng mình lao vào làm việc điên cuồng để quên đi cảm giác chán nản.",
              score: 2,
              feedback: "Làm việc quá sức để chạy trốn cảm xúc dễ dẫn tới kiệt quệ tiếp theo."
            },
            {
              text: "Tin rằng mình bị 'vận xui' bám đuổi nên thu mình lại, không dám thử thêm việc gì mới nữa.",
              score: 1,
              feedback: "Niềm tin bất lực tập nhiễm (Learned Helplessness) khiến bạn dừng bước."
            },
            {
              text: "Tự an ủi 'rồi mọi chuyện sẽ qua thôi' và chờ thời gian làm dịu mọi thứ.",
              score: 3,
              feedback: "Lạc quan giúp giữ tinh thần, kết hợp một hành động nhỏ chủ động sẽ tạo đà hồi phục nhanh hơn."
            },
            {
              text: "Tách 3 sự việc ra thành từng bài toán độc lập thay vì gộp chung thành 'đời mình thất bại', tập trung hoàn thành 1 bước nhỏ kiểm soát được ngay hôm nay.",
              score: 4,
              feedback: "Khả năng phục hồi (Resilience) tuyệt vời! Chia nhỏ khủng hoảng giúp lấy lại quyền làm chủ."
            }
          ],
          explanation:
            "Khả năng phục hồi tinh thần đến từ tư duy khu trú vấn đề: lỗi ở dự án này không có nghĩa là bạn hỏng toàn bộ cuộc đời. Lấy lại cảm giác kiểm soát từ một việc nhỏ sẽ kích hoạt lại động lực."
        },
        {
          id: "sr-05",
          dimension: "self_regulation",
          context: "Áp lực deadline chồng chất",
          question:
            "Chỉ còn 2 tiếng nữa đến hạn nộp bài/báo cáo quan trọng thì sếp hoặc khách hàng lại giao thêm một yêu cầu phát sinh gấp. Đầu óc bạn bắt đầu rối tung. Bạn làm gì?",
          options: [
            {
              text: "Dừng 60 giây hít thở chậm để sắp xếp lại đầu óc, trao đổi ngay với người giao việc về thứ tự ưu tiên hoặc xin lùi hạn hạng mục kém gấp hơn, rồi khóa thông báo làm dứt điểm từng phần.",
              score: 4,
              feedback: "Quản trị áp lực bậc thầy! Tái thương lượng kỳ vọng và tập trung đơn nhiệm."
            },
            {
              text: "Tắt hết tin nhắn để tập trung làm xong cái cũ trước rồi mới mở yêu cầu mới ra xem.",
              score: 3,
              feedback: "Giữ sự tập trung rất tốt; báo trước 1 câu về tiến độ với người giao sẽ chuyên nghiệp hơn."
            },
            {
              text: "Nhảy cóc làm mỗi thứ một tí trong hoảng loạn, cuối cùng không cái nào hoàn chỉnh kịp giờ.",
              score: 1,
              feedback: "Đa nhiệm trong hoảng loạn làm hiệu suất giảm mạnh và sai sót tăng vọt."
            },
            {
              text: "Gật đầu nhận hết trong lo âu rồi vừa làm vừa lầm bầm chửi thầm vì quá tải.",
              score: 2,
              feedback: "Không thương lượng thứ tự ưu tiên tạo áp lực không cần thiết lên chất lượng công việc."
            }
          ],
          explanation:
            "Dưới áp lực thời gian cao, 60 giây dừng lại để phân loại việc khẩn cấp và thương lượng kỳ vọng thực tế luôn tiết kiệm thời gian hơn việc cắm đầu chạy mù quáng."
        },
        {
          id: "sr-06",
          dimension: "motivation",
          context: "Đối diện nỗi sợ thất bại",
          question:
            "Bạn ấp ủ một ý tưởng hoặc kế hoạch thay đổi bản thân rất lâu, nhưng cứ đến lúc chuẩn bị bắt tay làm thật thì bạn lại nghĩ ra đủ lý do để trì hoãn sang tháng sau. Bạn xử lý ra sao?",
          options: [
            {
              text: "Chấp nhận chắc mình chưa 'đủ duyên' hoặc chưa đủ giỏi, cất kế hoạch vào ngăn kéo.",
              score: 1,
              feedback: "Chờ đợi sự hoàn hảo tuyệt đối là cách trì hoãn tinh vi nhất."
            },
            {
              text: "Tự mắng mình lười biếng vô dụng để ép bản thân phải có động lực.",
              score: 2,
              feedback: "Tự chỉ trích làm tăng cortisol và lo âu, khiến não càng muốn trì hoãn nhiều hơn."
            },
            {
              text: "Nhận ra trì hoãn thực chất là để né tránh nỗi sợ làm không hoàn hảo, rồi tự đặt 'phiên bản thử nghiệm 15 phút đầu tiên' thật nhẹ nhàng để phá băng.",
              score: 4,
              feedback: "Tuyệt vời! Hiểu cơ chế tâm lý của sự trì hoãn và dùng bước nhỏ để tạo đà."
            },
            {
              text: "Đi đọc thêm thật nhiều sách và video truyền cảm hứng cho tới khi thấy đủ tự tin.",
              score: 3,
              feedback: "Nạp kiến thức là tốt, nhưng chỉ hành động thực tế mới tạo ra sự tự tin bền vững."
            }
          ],
          explanation:
            "Trì hoãn không phải vấn đề quản lý thời gian mà là vấn đề điều tiết cảm xúc (né tránh cảm giác lo âu hoặc sợ kém cỏi). Giảm ngưỡng bắt đầu xuống nhỏ nhất là cách thắng nỗi sợ."
        },
        {
          id: "sr-07",
          dimension: "self_awareness",
          context: "Giận cá chém thớt",
          question:
            "Sau một ngày bị sếp mắng oan, bạn về nhà và thấy con cái/người thân làm đổ ly nước, bạn bỗng quát rất to vượt xa mức độ cần thiết. Ngay sau đó bạn nhận thức gì?",
          options: [
            {
              text: "Nhận ra ngay cơn giận đó thực ra tích tụ từ công ty chứ không phải từ ly nước, hít sâu xin lỗi người thân vì phản ứng quá mức và nói rõ mình vừa có một ngày căng thẳng.",
              score: 4,
              feedback: "Tự nhận thức và trách nhiệm cảm xúc tuyệt vời! Ngăn chặn vòng lặp tổn thương gia đình."
            },
            {
              text: "Cho rằng do người nhà hậu đậu nên bị mắng là đáng đời.",
              score: 1,
              feedback: "Hợp thức hóa việc trút giận sẽ tạo ra bầu không khí sợ hãi trong gia đình."
            },
            {
              text: "Bỏ vào phòng đóng cửa suốt tối vì thấy mình thật tệ hại.",
              score: 2,
              feedback: "Thu mình vào mặc cảm tội lỗi không giúp kết nối lại với người vừa bị quát."
            },
            {
              text: "Thấy hơi áy náy nhưng ngại xin lỗi nên lẳng lặng đi lau nhà cho qua.",
              score: 3,
              feedback: "Biết hối lỗi là tốt, nhưng nói một lời xin lỗi trực tiếp sẽ giúp người thân không thấy bị oan."
            }
          ],
          explanation:
            "Nhận ra cơ chế 'chuyển dịch cơn giận' (giận cá chém thớt) giúp bạn kịp thời xin lỗi và tách bạch ranh giới giữa áp lực công việc với sự bình yên của người thân."
        },
        {
          id: "sr-08",
          dimension: "empathy",
          context: "Đồng hành người đang hoảng loạn",
          question:
            "Một người bạn hoặc người thân đang rơi vào cơn hoảng loạn (tim đập nhanh, khóc nức nở, nói năng lộn xộn) trước một tin dữ. Bạn làm gì?",
          options: [
            {
              text: "Cũng hoảng loạn khóc òa theo họ vì quá thương cảm.",
              score: 2,
              feedback: "Đồng cảm quá mức đến mức mất tự chủ sẽ khiến cả hai cùng chìm vào hoảng loạn."
            },
            {
              text: "Để họ ngồi khóc một mình cho qua cơn rồi lát sau mới quay lại nói chuyện.",
              score: 3,
              feedback: "Cho không gian là tốt trong một số trường hợp, nhưng lúc hoảng loạn cấp tính thì sự hiện diện an toàn rất quan trọng."
            },
            {
              text: "Ở bên cạnh bằng sự hiện diện điềm tĩnh, nói giọng chậm và thấp, hướng dẫn họ hít thở cùng nhịp với mình và nắm tay/đưa ly nước ấm trước khi bàn chuyện tiếp.",
              score: 4,
              feedback: "Đồng điều tiết (Co-regulation) xuất sắc! Sự điềm tĩnh của bạn giúp hệ thần kinh của họ neo lại."
            },
            {
              text: "Nói to và gấp gáp: 'Bình tĩnh lại đi! Khóc lóc có giải quyết được gì đâu mà cứ cuống lên!'",
              score: 1,
              feedback: "Quát bảo người đang hoảng loạn 'bình tĩnh đi' chỉ làm hệ thần kinh của họ càng báo động mạnh hơn."
            }
          ],
          explanation:
            "Thấu cảm không có nghĩa là đánh mất sự bình tĩnh của mình theo người khác. Sự hiện diện vững chãi, giọng nói chậm rãi giúp hạ nhiệt hệ thần kinh của đối phương (Co-regulation)."
        },
        {
          id: "sr-09",
          dimension: "social_skills",
          context: "Thương lượng dưới áp lực",
          question:
            "Trong một buổi họp căng thẳng, hai phía không tìm được tiếng nói chung và không khí bắt đầu có dấu hiệu to tiếng công kích nhau. Bạn can thiệp thế nào?",
          options: [
            {
              text: "Pha một câu nói đùa để làm dịu không khí rồi chuyển sang mục khác.",
              score: 3,
              feedback: "Làm dịu không khí khá khéo, nhưng vấn đề cốt lõi vẫn cần được tóm tắt và chốt phương án."
            },
            {
              text: "Đề xuất tạm nghỉ 5 phút, tóm tắt lại điểm chung cả hai bên đều mong muốn đạt được, rồi mời từng bên nêu tối đa 2 ưu tiên cốt lõi.",
              score: 4,
              feedback: "Kỹ năng hạ nhiệt và điều phối xuất sắc! Đưa cuộc họp từ đấu khẩu về giải pháp."
            },
            {
              text: "Ngồi im lặng hoàn toàn chờ họ tự cãi xong rồi họp tiếp.",
              score: 2,
              feedback: "Thụ động để cuộc họp trượt dài trong căng thẳng làm mất thời gian và rạn nứt quan hệ."
            },
            {
              text: "To tiếng hơn nữa để át giọng mọi người và ép buộc theo ý mình.",
              score: 1,
              feedback: "Dùng âm lượng áp đảo chỉ phá hủy sự hợp tác lâu dài."
            }
          ],
          explanation:
            "Trong xung đột nóng, việc nhắc lại mục tiêu chung và tạo cấu trúc trao đổi ngắn gọn giúp kéo lý trí mọi người quay trở lại bàn đàm phán."
        },
        {
          id: "sr-10",
          dimension: "motivation",
          context: "Giữ kỷ luật khi kết quả chậm",
          question:
            "Bạn đang theo đuổi một mục tiêu dài hạn (học ngoại ngữ, rèn luyện sức khỏe, xây dựng sự nghiệp riêng) suốt 3 tháng nhưng chưa thấy kết quả bứt phá rõ rệt. Bạn nghĩ gì?",
          options: [
            {
              text: "Tạm nghỉ 1 tuần rồi rủ thêm bạn cùng làm cho vui hơn.",
              score: 3,
              feedback: "Tìm bạn đồng hành là mẹo hay để duy trì thói quen, kết hợp đo lường tiến bộ nhỏ sẽ rất vững."
            },
            {
              text: "Nghĩ rằng chắc mình không có năng khiếu ở lĩnh vực này nên bỏ dở tìm thứ khác nhanh ăn hơn.",
              score: 1,
              feedback: "Bỏ cuộc ngay trước ngưỡng tích lũy (Plateau of Latent Potential) là lý do phổ biến nhất khiến mục tiêu dang dở."
            },
            {
              text: "Hiểu rằng kết quả thường có độ trễ, đo lường lại các chỉ số tiến bộ nhỏ (độ đều đặn, kỹ năng cải thiện) và điều chỉnh phương pháp thay vì từ bỏ mục tiêu.",
              score: 4,
              feedback: "Sức bền nội tại (Grit) tuyệt vời! Kiên định với đích đến nhưng linh hoạt ở phương pháp."
            },
            {
              text: "Tiếp tục làm y hệt cách cũ một cách máy móc trong sự chán nản.",
              score: 2,
              feedback: "Kiên trì mà không đánh giá lại phương pháp dễ dẫn tới kiệt sức."
            }
          ],
          explanation:
            "Động lực nội tại bền vững biết phân biệt giữa 'chưa có kết quả lớn' và 'không có tiến bộ'. Ghi nhận các thắng lợi vi mô giúp não bộ tiếp tục tiết dopamine duy trì hành trình."
        },
        {
          id: "sr-11",
          dimension: "empathy",
          context: "Nhìn thấu sự nóng nảy của người khác",
          question:
            "Một đồng nghiệp vốn hiền lành hôm nay bỗng gắt gỏng vô cớ với bạn vì một chi tiết rất nhỏ. Bạn xử lý tình huống này thế nào?",
          options: [
            {
              text: "Nhận ra hành vi này khác thường so với tính cách của họ, giữ bình tĩnh không nhận sự công kích vào bản thân, xử lý xong việc trước rồi lát sau hỏi nhỏ xem họ có đang quá tải không.",
              score: 4,
              feedback: "Tuyệt vời! Bạn không 'uống nhầm cơn giận của người khác' và còn thể hiện sự bao dung tinh tế."
            },
            {
              text: "Giận dỗi tránh mặt họ cả tháng trời vì thấy bị xúc phạm.",
              score: 2,
              feedback: "Ôm hận vì một lần bộc phát nhất thời làm rạn nứt mối quan hệ tốt."
            },
            {
              text: "Gắt lại gấp đôi ngay lập tức để dạy cho họ bài học về thái độ.",
              score: 1,
              feedback: "Trả đũa ngay lập tức thổi bùng xích mích không đáng có."
            },
            {
              text: "Bỏ qua không nói gì và giữ khoảng cách lịch sự trong ngày hôm đó.",
              score: 3,
              feedback: "Kiềm chế rất tốt để tránh xung đột; thêm một lời hỏi thăm đúng lúc có thể hóa giải hoàn toàn."
            }
          ],
          explanation:
            "Quy tắc vàng của EQ: 'Cách người khác phản ứng thường phản ánh trạng thái bên trong của họ nhiều hơn là giá trị của bạn'. Không cá nhân hóa cơn giận nhất thời giúp bạn giữ được sự thanh thản."
        },
        {
          id: "sr-12",
          dimension: "social_skills",
          context: "Thiết lập ranh giới khi quá tải",
          question:
            "Bạn đã làm việc hết công suất từ sáng đến tối nhưng sếp hoặc khách hàng lại nhắn nhờ xử lý gấp một việc không khẩn cấp vào lúc 21h tối. Bạn hồi đáp ra sao?",
          options: [
            {
              text: "Chụp màn hình than phiền lên mạng xã hội về văn hóa bóc lột.",
              score: 1,
              feedback: "Than vãn công khai gây rủi ro nghề nghiệp lớn và không giải quyết được ranh giới giao tiếp."
            },
            {
              text: "Phản hồi lịch sự, rõ ràng: 'Em đã nhận thông tin. Hiện em đang hoàn tất công việc ngoài giờ, em xin phép ưu tiên xử lý việc này ngay đầu giờ sáng mai lúc 8h30 để đảm bảo chất lượng tốt nhất ạ.'",
              score: 4,
              feedback: "Ranh giới chuyên nghiệp mẫu mực! Tôn trọng, xác nhận đã nhận tin và chốt thời điểm xử lý rõ ràng."
            },
            {
              text: "Tức tối mở máy làm luôn tới nửa đêm rồi mang tâm trạng cay cú đi ngủ.",
              score: 2,
              feedback: "Tự phá vỡ ranh giới nghỉ ngơi khiến đối phương mặc định bạn luôn sẵn sàng 24/7."
            },
            {
              text: "Tắt thông báo, sáng hôm sau mới mở xem và trả lời.",
              score: 3,
              feedback: "Bảo vệ thời gian nghỉ tốt; phản hồi một câu xác nhận hẹn sáng mai sẽ tạo cảm giác an tâm hơn."
            }
          ],
          explanation:
            "Thiết lập ranh giới chuyên nghiệp không làm bạn kém nhiệt huyết; ngược lại, cam kết rõ mốc thời gian giúp đối phương tin cậy và tôn trọng nhịp sống của bạn."
        }
      ]
    },
    {
      id: "social-empathy",
      title: "Đọc Vị Tâm Lý & Tinh Tế Giao Tiếp Xã Hội",
      shortTitle: "Đọc Vị & Giao Tiếp Tinh Tế",
      category: "social",
      categoryLabel: "Giao tiếp & Thấu cảm",
      level: "Tinh tế",
      durationMinutes: 10,
      icon: "🎭",
      accentColor: "#10b981",
      description:
        "Đánh giá độ nhạy bén trước ngôn ngữ cơ thể, ẩn ý sau lời nói, khả năng giữ thể diện cho người khác và ứng xử khéo léo trong các tình huống xã giao khó xử.",
      tags: ["12 câu hỏi", "Đọc vị tâm lý", "Tinh tế ứng xử"],
      questions: [
        {
          id: "se-01",
          dimension: "empathy",
          context: "Đọc vị lời từ chối ngầm",
          question:
            "Bạn hào hứng rủ một người bạn đi ăn cuối tuần, nhưng bạn ấy trả lời chậm và nói: 'Ừa để xem cuối tuần có bận không rồi báo nhé', kèm giọng hơi ngập ngừng. Bạn hiểu tín hiệu này thế nào?",
          options: [
            {
              text: "Tự ái nghĩ thầm 'chắc nó khinh mình không muốn đi chơi với mình' rồi giận luôn.",
              score: 2,
              feedback: "Suy diễn tiêu cực dễ làm bạn mất đi sự thoải mái trong tình bạn."
            },
            {
              text: "Lờ đi không nhắc lại nữa và tự đi chơi một mình.",
              score: 3,
              feedback: "Tôn trọng không gian của bạn ấy là tốt, gửi thêm câu mở nhẹ nhàng sẽ ấm áp hơn."
            },
            {
              text: "Nhắn tin giục liên tục mỗi ngày 'Sao rồi, chốt đi chứ' để ép câu trả lời.",
              score: 1,
              feedback: "Thúc ép khi đối phương đang do dự chỉ tạo áp lực và khiến họ muốn né tránh hơn."
            },
            {
              text: "Nhận ra có thể bạn ấy đang bận, mệt hoặc ngại từ chối thẳng; nhắn nhẹ: 'Không sao đâu, cứ thoải mái sắp xếp lịch nha, lúc nào rảnh thì tụi mình hẹn sau cũng được!'",
              score: 4,
              feedback: "Quá tinh tế! Bạn cho đối phương một 'lối thoát êm ái' mà vẫn giữ nguyên thiện cảm."
            }
          ],
          explanation:
            "Trong văn hóa giao tiếp Á Đông, lời hứa lửng ('để xem đã') thường là cách từ chối nhẹ để giữ hòa khí. Người tinh tế biết mở lối thoát giúp đối phương không bị áy náy."
        },
        {
          id: "se-02",
          dimension: "social_skills",
          context: "Giữ thể diện tập thể",
          question:
            "Trong một bữa tiệc hoặc buổi họp đông người, một người quen vô tình phát âm sai tên thuật ngữ hoặc nói nhầm thông tin khá ngượng. Mọi người bắt đầu liếc nhìn nhau. Bạn làm gì?",
          options: [
            {
              text: "Tiếp lời tự nhiên để giữ mạch câu chuyện, khéo léo lồng lại thông tin đúng theo hướng bổ sung bình thường để cứu nguy thể diện cho họ.",
              score: 4,
              feedback: "Sự lịch thiệp đẳng cấp! Bạn bảo vệ lòng tự trọng cho đối phương một cách vô hình."
            },
            {
              text: "Cười phá lên chỉnh ngay giữa đám đông để thể hiện mình am hiểu hơn.",
              score: 1,
              feedback: "Làm người khác bẽ mặt nơi đông người tạo ra vết xước giao tiếp rất khó quên."
            },
            {
              text: "Giữ vẻ mặt bình thản lắng nghe như không có gì xảy ra để họ nói hết câu.",
              score: 3,
              feedback: "Rất lịch sự và tôn trọng! Nếu thông tin cần đính chính cho công việc thì góp ý riêng sau là chuẩn."
            },
            {
              text: "Cúi mặt xuống điện thoại cười tủm tỉm cho đỡ sượng.",
              score: 2,
              feedback: "Biểu cảm cười thầm càng làm người nói nhầm thêm bối rối."
            }
          ],
          explanation:
            "Đỉnh cao của tinh tế giao tiếp là khả năng giữ thể diện cho người khác khi họ lỡ bước, thay vì tận dụng sơ hở của họ để nâng mình lên."
        },
        {
          id: "se-03",
          dimension: "empathy",
          context: "Ngôn ngữ cơ thể trái lời nói",
          question:
            "Bạn hỏi đồng nghiệp 'Dạo này ổn không?', họ cười gượng nói 'Ổn lắm, bình thường mà!', nhưng vai thu lại, giọng nhỏ và mắt né tránh. Bạn xử lý thế nào?",
          options: [
            {
              text: "Gặng hỏi tới tấp trước mặt mọi người: 'Có chuyện gì giấu đúng không, nói thật đi!'",
              score: 2,
              feedback: "Ép người đang thu mình phải mở lòng ngay sẽ khiến họ đóng cửa chặt hơn."
            },
            {
              text: "Không vạch trần ngay ('Nhìn mặt có ổn đâu'), mà hạ giọng ấm áp: 'Nếu có lúc nào thấy ngợp hoặc cần người nghe thì cứ ới mình nhé, mình luôn sẵn sàng.'",
              score: 4,
              feedback: "Đọc vị tuyệt vời! Tôn trọng lớp phòng vệ hiện tại nhưng mở sẵn cánh cửa an toàn cho họ."
            },
            {
              text: "Mua tặng họ một ly nước hoặc thanh socola nhỏ để trên bàn cho họ vui lên.",
              score: 3,
              feedback: "Cử chỉ quan tâm rất dễ thương và không gây áp lực!"
            },
            {
              text: "Tin luôn câu 'ổn lắm' và kể tiếp chuyện vui của mình một cách hào hứng.",
              score: 1,
              feedback: "Chỉ nghe phần lời mà bỏ qua tín hiệu cơ thể khiến bạn bỏ lỡ lúc bạn bè cần giúp nhất."
            }
          ],
          explanation:
            "Khi lời nói và ngôn ngữ cơ thể mâu thuẫn, cơ thể luôn nói thật hơn. Tuy nhiên, tôn trọng nhịp độ mở lòng của đối phương mới là thấu cảm thực sự."
        },
        {
          id: "se-04",
          dimension: "social_skills",
          context: "Người bị bỏ rơi trong nhóm",
          question:
            "Trong buổi tụ tập nhóm bạn, có một người mới tham gia ngồi khá lẻ loi ở góc bàn vì mọi người đang say sưa nói toàn chuyện nội bộ cũ. Bạn làm gì?",
          options: [
            {
              text: "Mặc kệ, ai bảo họ ít nói thì tự chịu, mình cứ vui với nhóm bạn cũ trước.",
              score: 1,
              feedback: "Sự vô tâm tập thể dễ khiến người mới thấy lạc lõng và ngại gặp lại."
            },
            {
              text: "Tách hẳn ra ngồi nói chuyện riêng 1-1 với bạn mới đó suốt buổi.",
              score: 3,
              feedback: "Rất tốt bụng, nhưng kéo được họ hòa vào dòng chảy chung của cả nhóm sẽ còn tuyệt vời hơn."
            },
            {
              text: "Chủ động quay sang mỉm cười, giới thiệu ngắn bối cảnh câu chuyện cũ để họ hiểu mạch và đặt một câu hỏi mở liên quan đến sở thích của họ để kéo họ vào cuộc trò chuyện.",
              score: 4,
              feedback: "Kỹ năng kết nối đỉnh cao! Tạo cảm giác được chào đón tự nhiên mà không gượng gạo."
            },
            {
              text: "Chỉ gật đầu chào xã giao một lần lúc đầu buổi rồi thôi.",
              score: 2,
              feedback: "Lịch sự tối thiểu nhưng chưa đủ để giúp người mới hòa nhập."
            }
          ],
          explanation:
            "Người có kỹ năng xã hội tinh tế luôn có 'radar bao quát phòng': họ để ý ai đang bị đứng ngoài rìa cuộc vui và dùng câu dẫn bối cảnh để kết nối mọi người lại."
        },
        {
          id: "se-05",
          dimension: "self_awareness",
          context: "Kiểm soát nhu cầu chứng tỏ",
          question:
            "Khi đang nghe ai đó kể về chuyến du lịch hoặc thành tích của họ, bạn nhận ra mình đang ngứa ngáy muốn ngắt lời để kể câu chuyện hoành tráng hơn của mình. Bạn làm gì?",
          options: [
            {
              text: "Nghe hết rồi chia sẻ thêm trải nghiệm tương đồng của mình để đồng cảm với họ.",
              score: 3,
              feedback: "Chia sẻ điểm chung là tự nhiên, miễn là giữ trọng tâm công nhận trải nghiệm của họ trước."
            },
            {
              text: "Kiên nhẫn đợi họ nói hết câu cuối cùng rồi lập tức chuyển sang kể chuyện của mình cho bằng được.",
              score: 2,
              feedback: "Vẫn là lắng nghe để chờ tới lượt nói chứ chưa thực sự lắng nghe để hiểu họ."
            },
            {
              text: "Ngắt lời ngay: 'Ôi thế nhằm nhò gì, hồi trước tôi còn đi hẳn chỗ X đỉnh hơn nhiều!'",
              score: 1,
              feedback: "Cướp sân khấu (Conversational Narcissism) là lỗi giao tiếp khiến người đối diện mất hết hứng thú."
            },
            {
              text: "Nhận ra cái tôi muốn khoe của mình vừa trỗi dậy, mỉm cười gác nó sang một bên và đặt thêm câu hỏi để bạn ấy kể trọn vẹn niềm vui của họ.",
              score: 4,
              feedback: "Tự nhận thức và hào phóng cảm xúc xuất sắc! Nhường ánh đèn sân khấu cho người khác."
            }
          ],
          explanation:
            "Phân biệt giữa 'kết nối bằng điểm chung' và 'cạnh tranh câu chuyện'. Tự nhận ra cơn thèm được chú ý của bản thân giúp bạn trở thành người biết lắng nghe cuốn hút."
        },
        {
          id: "se-06",
          dimension: "social_skills",
          context: "Nhờ vả khéo léo",
          question:
            "Bạn cần nhờ một đồng nghiệp ở bộ phận khác hỗ trợ gấp một phần dữ liệu dù việc đó không nằm trong KPI bắt buộc của họ. Bạn mở lời thế nào?",
          options: [
            {
              text: "Ngại không dám nhờ trực tiếp nên đi vòng qua nhờ sếp ép xuống cho nhanh.",
              score: 2,
              feedback: "Vượt cấp gây áp lực từ trên xuống làm hỏng mối quan hệ ngang hàng."
            },
            {
              text: "Nhắn ngắn gọn: 'Gửi gấp giúp mình file X trước 3h chiều nay nhé, sếp đang cần'.",
              score: 1,
              feedback: "Ra lệnh khi đi nhờ vả, lại mượn danh sếp ép tiến độ, rất dễ gây phản cảm."
            },
            {
              text: "Hỏi thăm lịch sự, giải thích ngắn gọn tầm quan trọng của phần dữ liệu, chủ động làm sẵn phần khung để họ tốn ít công nhất và sẵn sàng linh hoạt hỗ trợ lại khi họ cần.",
              score: 4,
              feedback: "Giao tiếp hợp tác xuất sắc! Tôn trọng thời gian của người được nhờ và giảm tối đa ma sát."
            },
            {
              text: "Nhắn năn nỉ thật dài kèm nhiều icon cảm ơn nhờ họ giúp đỡ.",
              score: 3,
              feedback: "Thái độ lịch sự đáng mến; giúp họ tiết kiệm công sức bằng việc chuẩn bị sẵn đề bài sẽ hiệu quả hơn nữa."
            }
          ],
          explanation:
            "Muốn nhận được sự giúp đỡ nhiệt tình, hãy khiến việc giúp bạn trở nên dễ dàng, rõ ràng và mang lại cảm giác được trân trọng cho đối phương."
        },
        {
          id: "se-07",
          dimension: "empathy",
          context: "Nhận quà hoặc lời khen",
          question:
            "Một người lớn tuổi hoặc đồng nghiệp mới tặng bạn một món quà nhỏ hoặc dành cho bạn lời khen chân thành, dù món quà không quá đúng gu của bạn. Bạn đáp lại thế nào?",
          options: [
            {
              text: "Nhìn thấy tấm lòng phía sau món quà, mỉm cười cảm ơn cụ thể sự chu đáo của họ ('Cảm ơn bạn đã nhớ tới mình...') để họ cảm nhận được niềm vui khi tặng quà.",
              score: 4,
              feedback: "Tinh tế và ấm áp! Trân trọng ý định và công sức của người tặng."
            },
            {
              text: "Khen lại lịch sự xã giao rồi nhanh chóng tìm cách tặng lại thứ khác bằng giá trị cho khỏi mắc nợ.",
              score: 3,
              feedback: "Biết lịch sự đáp lễ, nhưng đón nhận thiện chí một cách tự nhiên và chân thành sẽ kết nối hơn."
            },
            {
              text: "Nói qua loa 'Ừ cảm ơn nhé' rồi cất vội đi như món đồ thừa.",
              score: 2,
              feedback: "Thái độ hờ hững làm người tặng hụt hẫng."
            },
            {
              text: "Nói thẳng: 'Ôi món này mình không thích màu/vị này đâu, lần sau đừng mua phí tiền'.",
              score: 1,
              feedback: "Sự thật thô bạo trong lúc nhận thiện chí làm tổn thương niềm vui cho đi của người khác."
            }
          ],
          explanation:
            "Biết đón nhận lòng tốt một cách trân trọng cũng là một biểu hiện cao của thấu cảm — giúp người tặng cảm thấy hành động quan tâm của họ có giá trị."
        },
        {
          id: "se-08",
          dimension: "self_regulation",
          context: "Tin đồn nơi công sở",
          question:
            "Giờ nghỉ trưa, vài đồng nghiệp rủ rỉ kể chuyện đồn thổi khá nhạy cảm về đời tư của một người không có mặt ở đó và hỏi ý kiến bạn. Bạn ứng xử thế nào?",
          options: [
            {
              text: "Góp thêm vài chi tiết mình nghe phong thanh được để hòa nhập với nhóm cho vui.",
              score: 1,
              feedback: "Tham gia thêu dệt tin đồn hủy hoại uy tín cá nhân và sự tin cậy của mọi người dành cho bạn."
            },
            {
              text: "Đứng dậy mắng thẳng nhóm kia là lắm chuyện, vô duyên.",
              score: 2,
              feedback: "Lên mặt đạo đức gay gắt dễ biến bạn thành mục tiêu cô lập tiếp theo."
            },
            {
              text: "Ngồi im cười trừ gật gù nghe hết từ đầu đến cuối dù không bình luận thêm.",
              score: 3,
              feedback: "Không nói thêm là tốt, nhưng chuyển hướng chủ đề khéo sẽ giúp bạn giữ khoảng cách sạch sẽ hơn."
            },
            {
              text: "Không phán xét dạy đời nhóm bạn, nhưng giữ trung lập điềm tĩnh ('Mình cũng không rõ thực hư thế nào nên không dám bàn') rồi khéo chuyển sang chủ đề khác hấp dẫn hơn.",
              score: 4,
              feedback: "Khéo léo tuyệt vời! Bảo vệ nguyên tắc đạo đức mà không khiến nhóm kia thấy bị lên lớp."
            }
          ],
          explanation:
            "Người khéo léo biết đặt ranh giới với chuyện thị phi mà không cần đối đầu đạo đức gay gắt — một câu trả lời trung lập và chuyển chủ đề là đủ."
        },
        {
          id: "se-09",
          dimension: "motivation",
          context: "Học hỏi từ người đối lập",
          question:
            "Bạn phải làm việc hoặc trao đổi với một người có tính cách rất khác biệt, thậm chí hơi khó ưa với bạn, nhưng họ lại cực kỳ giỏi ở một mảng chuyên môn. Thái độ của bạn ra sao?",
          options: [
            {
              text: "Cố gắng chịu đựng hợp tác cho xong việc, không thèm học hỏi hay trao đổi gì thêm.",
              score: 3,
              feedback: "Chuyên nghiệp ở mức cơ bản; cởi mở học hỏi phần tinh hoa chuyên môn của họ sẽ giúp bạn lợi hơn nhiều."
            },
            {
              text: "Tách bạch sự không hợp tính cách khỏi giá trị chuyên môn của họ, chủ động quan sát học hỏi điểm mạnh của họ và giữ giao tiếp chuyên nghiệp, vừa đủ ranh giới.",
              score: 4,
              feedback: "Tư duy cầu tiến và trưởng thành! Bạn khai thác được giá trị tích cực ở mọi môi trường."
            },
            {
              text: "Vì ghét tính cách họ nên phủ nhận luôn năng lực và từ chối hợp tác.",
              score: 1,
              feedback: "Để ác cảm cá nhân che mắt khiến bạn tự tước đi cơ hội nâng cấp bản thân."
            },
            {
              text: "Tìm cách soi mói lỗi nhỏ của họ để chứng minh họ cũng chẳng giỏi giang gì.",
              score: 2,
              feedback: "Tập trung tìm lỗi của người mình ghét chỉ làm mất thời gian của bạn."
            }
          ],
          explanation:
            "Động lực phát triển bản thân giúp người EQ cao vượt qua định kiến yêu-ghét thông thường để học được điều hay ngay cả từ những người khó tính nhất."
        },
        {
          id: "se-10",
          dimension: "self_awareness",
          context: "Lắng nghe hiệu ứng gương",
          question:
            "Bạn nhận thấy dạo này nhiều người xung quanh thường tỏ ra dè chừng, ít góp ý thẳng cho bạn mỗi khi bạn đề xuất ý tưởng. Bạn tự kiểm tra lại điều gì?",
          options: [
            {
              text: "Thấy buồn vì nghĩ mọi người không coi trọng mình hoặc làm việc hời hợt.",
              score: 2,
              feedback: "Tự buồn mà không kiểm tra tín hiệu giao tiếp của mình sẽ không thay đổi được bầu không khí."
            },
            {
              text: "Tự soi lại biểu cảm, tông giọng và phản ứng trước đây của mình khi nghe ý kiến trái chiều xem mình có vô tình ngắt lời, cau mày hay phòng thủ khiến người khác ngại nói thật không.",
              score: 4,
              feedback: "Tự phản tư bậc thầy! Nhìn mình qua tấm gương phản ứng của những người xung quanh."
            },
            {
              text: "Nghĩ rằng chắc do năng lực mình vượt trội quá nên mọi người nể sợ không dám ý kiến.",
              score: 1,
              feedback: "Ngộ nhận quyền lực hoặc năng lực rất dễ dẫn đến cô lập khỏi thông tin thực tế."
            },
            {
              text: "Khuyến khích mọi người bằng câu 'Cứ góp ý thoải mái đi' ở cuối buổi họp.",
              score: 3,
              feedback: "Mở lời là tốt, nhưng quan trọng nhất là thái độ đón nhận của bạn ngay lúc họ vừa cất lời."
            }
          ],
          explanation:
            "Cách người khác đối xử với bạn là phản chiếu từ cảm giác an toàn mà bạn tạo ra. Kiểm tra phản ứng vi mô của chính mình giúp mở khóa giao tiếp chân thực."
        },
        {
          id: "se-11",
          dimension: "self_regulation",
          context: "Kiểm soát câu nói đùa",
          question:
            "Bạn vừa nói một câu đùa tưởng là vui, nhưng thấy sắc mặt một người trong bàn hơi sầm xuống và họ im lặng hẳn. Bạn xử lý khoảnh khắc sượng này thế nào?",
          options: [
            {
              text: "Im lặng cả buổi sau đó vì quá ngượng ngùng, cuối buổi nhắn tin xin lỗi sau.",
              score: 3,
              feedback: "Có ý thức sửa sai rất tốt; xin lỗi gọn ngay tại chỗ hoặc nhắn riêng ngay sau đó đều đáng quý."
            },
            {
              text: "Chữa cháy bằng cách bảo: 'Úi giời đùa tí làm gì mà căng thế, nhạy cảm quá đấy!'",
              score: 1,
              feedback: "Đổ lỗi cho người nghe là 'nhạy cảm' sau khi làm họ tổn thương là cách dập lửa bằng xăng."
            },
            {
              text: "Lờ đi như không thấy, cười ha ha tiếp sang chuyện khác để che lấp.",
              score: 2,
              feedback: "Phớt lờ khiến người bị đùa chạm tự ái thấy mình không được tôn trọng."
            },
            {
              text: "Dừng lại ngay, thừa nhận ngắn gọn và chân thành: 'Ơ mình lỡ lời đùa hơi vô duyên rồi, cho mình xin lỗi nhé!' rồi chuyển sang hỏi thăm tự nhiên.",
              score: 4,
              feedback: "Bản lĩnh và tinh tế! Dám nhận lỗi ngay tức thì hóa giải 90% sự khó chịu."
            }
          ],
          explanation:
            "Khi câu đùa làm người khác mất vui, tác động thực tế quan trọng hơn ý định ban đầu. Không bao giờ nói 'làm gì mà căng thế' — một lời xin lỗi ngắn gọn thể hiện sự tự trọng cao."
        },
        {
          id: "se-12",
          dimension: "motivation",
          context: "Cho đi không vụ lợi",
          question:
            "Bạn có thông tin về một cơ hội việc làm hoặc học bổng rất tốt nhưng không phù hợp với lịch của bạn, trong khi một người quen đang rất cần. Bạn làm gì?",
          options: [
            {
              text: "Chủ động gửi ngay thông tin kèm vài gợi ý hữu ích giúp họ tăng tỷ lệ đậu, không đặt nặng việc họ phải trả ơn gì.",
              score: 4,
              feedback: "Tư duy dồi dào và kết nối bền vững! Giá trị cho đi chân thành tạo ra uy tín lâu dài."
            },
            {
              text: "Gửi cho họ nhưng dặn kỹ 'Sau này thành công nhớ hậu tạ tôi đấy nhé'.",
              score: 2,
              feedback: "Đặt điều kiện ngay khi chia sẻ làm giảm giá trị chân thành của cử chỉ."
            },
            {
              text: "Chia sẻ đại trà lên trang cá nhân để ai thấy thì tự đăng ký.",
              score: 3,
              feedback: "Rất tốt bụng! Gửi đích danh cho đúng người đang cần sẽ tạo sự kết nối sâu sắc hơn."
            },
            {
              text: "Giữ im lặng không chia sẻ vì nghĩ chẳng được lợi lộc gì hoặc sợ họ giỏi hơn mình.",
              score: 1,
              feedback: "Tư duy khan hiếm (sợ người khác hơn mình) thu hẹp mạng lưới cơ hội của chính bạn."
            }
          ],
          explanation:
            "Người có động lực và kỹ năng xã hội trưởng thành tin vào tư duy 'chiếc bánh mở rộng': giúp người khác thành công không làm mất phần của mình mà xây dựng mạng lưới niềm tin vô giá."
        }
      ]
    },
    {
      id: "quick-daily",
      title: "Trắc Nghiệm Nhanh 5 Phút: Phản Xạ Cảm Xúc Đời Thường",
      shortTitle: "Test Nhanh 5 Phút Đời Thường",
      category: "quick",
      categoryLabel: "Nhanh 5 phút",
      level: "Nhanh gọn",
      durationMinutes: 5,
      icon: "⚡",
      accentColor: "#8b5cf6",
      description:
        "9 tình huống ngắn gọn, gần gũi mỗi ngày (kẹt xe, trễ hẹn, dịch vụ kém, mạng xã hội...) giúp bạn kiểm tra nhanh độ cân bằng cảm xúc chỉ trong 5 phút.",
      tags: ["9 câu hỏi", "5 phút", "Kiểm tra nhanh"],
      questions: [
        {
          id: "qd-01",
          dimension: "self_regulation",
          context: "Kẹt xe giờ cao điểm",
          question:
            "Bạn đang vội đến buổi hẹn thì gặp cảnh kẹt xe cứng ngắc, lại có một người chen ngang tạt đầu xe rất ẩu làm bạn giật mình. Phản ứng tức thì của bạn là gì?",
          options: [
            {
              text: "Bấm còi inh ỏi, đuổi theo hét lên chửi bới cho bõ tức.",
              score: 1,
              feedback: "Cơn giận đường phố rất nguy hiểm và phá hỏng tâm trạng cả buổi của chính bạn."
            },
            {
              text: "Thở mạnh ra một hơi cho hạ nhịp tim, giữ khoảng cách an toàn, nhắn trước cho người hẹn báo sẽ trễ khoảng 10 phút rồi nghe một bản nhạc dịu.",
              score: 4,
              feedback: "Phản xạ bình tĩnh tuyệt vời! Chấp nhận thứ ngoài tầm kiểm soát và xử lý phần mình làm chủ được."
            },
            {
              text: "Thở dài ngán ngẩm nhưng cố gắng lái chậm lại cẩn thận cho tới nơi.",
              score: 3,
              feedback: "Kiềm chế hành vi rất an toàn! Nhắn báo trước cho người hẹn và buông bỏ sự bực bội sẽ trọn vẹn hơn."
            },
            {
              text: "Lẩm bẩm chửi thề một mình suốt quãng đường còn lại rồi mang bộ mặt hầm hầm vào buổi hẹn.",
              score: 2,
              feedback: "Mang cơn bực dọc từ ngoài đường vào cuộc gặp sẽ ảnh hưởng oan đến người đối diện."
            }
          ],
          explanation:
            "Sự cố giao thông là bài test kinh điển cho Tự kiểm soát: ta không thay đổi được dòng xe, nhưng ta quyết định hoàn toàn thái độ mình mang đến cuộc hẹn tiếp theo."
        },
        {
          id: "qd-02",
          dimension: "social_skills",
          context: "Dịch vụ nhà hàng chậm",
          question:
            "Bạn đi ăn tối cùng gia đình vào cuối tuần. Quán khá đông nên món ăn lên chậm hơn bình thường gần 40 phút và nhân viên phục vụ mang nhầm một món. Bạn xử lý thế nào?",
          options: [
            {
              text: "Hơi bực nhưng vẫn cười nói nhẹ nhàng nhờ bạn phục vụ đổi lại giúp và dặn làm nhanh chút.",
              score: 3,
              feedback: "Thái độ lịch sự rất đáng khen!"
            },
            {
              text: "Im lặng ăn đại món bị nhầm dù không thích, rồi về nhà lên mạng đánh giá 1 sao cho bõ tức.",
              score: 2,
              feedback: "Không phản hồi tại chỗ khiến nhân viên không có cơ hội sửa sai, còn bạn thì ấm ức."
            },
            {
              text: "Gọi nhân viên lại nói rõ ràng, lịch sự nhưng dứt khoát về món bị nhầm và hỏi chính xác thời gian món còn lại lên để gia đình chủ động.",
              score: 4,
              feedback: "Giao tiếp văn minh chuẩn mực! Bảo vệ quyền lợi khách hàng mà vẫn giữ thái độ tôn trọng."
            },
            {
              text: "Quát ầm lên gọi quản lý ra trách móc nhân viên vô dụng giữa quán.",
              score: 1,
              feedback: "Xả giận lên nhân viên đang chạy quá tải vừa thiếu nhân ái vừa làm bữa ăn gia đình mất vui."
            }
          ],
          explanation:
            "Cách một người đối xử với nhân viên phục vụ khi gặp trục trặc là thước đo trung thực nhất cho trí tuệ cảm xúc và sự tự tôn của họ."
        },
        {
          id: "qd-03",
          dimension: "empathy",
          context: "Bạn thân đi trễ",
          question:
            "Bạn hẹn một người bạn đi cà phê lúc 9h00, nhưng 9h25 bạn ấy mới tất tả chạy tới với vẻ mặt hớt hải xin lỗi vì kẹt việc đột xuất ở nhà. Bạn phản ứng ra sao?",
          options: [
            {
              text: "Khoanh tay mặt lạnh: 'Cậu luôn luôn trễ giờ thế đấy, tôi đợi dài cổ rồi, lần sau khỏi hẹn!'",
              score: 1,
              feedback: "Lời trách nặng nề ngay giây đầu gặp khiến cả buổi nói chuyện đóng băng."
            },
            {
              text: "Trách yêu một câu rồi chuyển sang chuyện khác trò chuyện bình thường.",
              score: 3,
              feedback: "Khá tự nhiên và thoải mái, nhắc thêm quy ước nhắn tin báo sớm nếu có sự cố là hoàn hảo."
            },
            {
              text: "Nói 'Không sao đâu' rất vui vẻ dù thực tế rất ghét chờ đợi và cứ ghim trong lòng.",
              score: 2,
              feedback: "Không bày tỏ mong muốn thật khiến đối phương tưởng bạn thực sự không phiền khi họ trễ."
            },
            {
              text: "Thấy bạn ấy đang hớt hải thật, mỉm cười bảo bạn ấy ngồi thở uống nước trước đã, sau đó nhẹ nhàng chia sẻ mong muốn lần sau nếu trễ thì nhắn sớm hơn để bạn chủ động.",
              score: 4,
              feedback: "Thấu cảm kết hợp ranh giới rõ ràng! Vừa giữ tình cảm, vừa nhắc khéo thói quen đúng giờ."
            }
          ],
          explanation:
            "Nhắc nhở ranh giới nhẹ nhàng sau khi đã hạ nhiệt cảm xúc ban đầu giúp mối quan hệ vừa giữ được sự tôn trọng thời gian, vừa giữ được sự ấm áp."
        },
        {
          id: "qd-04",
          dimension: "self_awareness",
          context: "Mua sắm theo cảm xúc",
          question:
            "Sau một ngày làm việc căng thẳng, bạn mở ứng dụng mua sắm và thấy mình sắp chốt đơn hàng loạt món đồ đắt tiền không thực sự cần thiết. Bạn nhận ra điều gì?",
          options: [
            {
              text: "Tắt ứng dụng nhưng bứt rứt khó chịu cả tối vì thấy mình sống quá kham khổ.",
              score: 2,
              feedback: "Ngăn hành động nhưng chưa tìm được cách giải tỏa stress lành mạnh thay thế."
            },
            {
              text: "Chốt đơn hết luôn với suy nghĩ 'làm cực khổ cả tháng rồi, cứ tiêu cho sướng đi'.",
              score: 1,
              feedback: "Tiêu tiền để chữa lành cơn stress ngắn hạn thường kéo theo stress tài chính dài hạn."
            },
            {
              text: "Chỉ mua 1 món rẻ nhất cho đỡ thèm rồi thoát app đi ngủ.",
              score: 3,
              feedback: "Kiểm soát thiệt hại khá tốt; áp dụng quy tắc chờ 24 giờ sẽ tối ưu hơn nữa."
            },
            {
              text: "Nhận ra mình đang dùng việc mua sắm để bù đắp cảm giác căng thẳng, bỏ tất cả vào giỏ hàng đợi 24 giờ sau mới quyết định và đi tắm nước ấm thư giãn.",
              score: 4,
              feedback: "Tự nhận thức xuất sắc! Nhận diện đúng nhu cầu thật đằng sau cơn thèm mua sắm."
            }
          ],
          explanation:
            "Nhiều thói quen bốc đồng (ăn đêm, mua sắm, lướt mạng vô thức) thực chất là tín hiệu cơ thể đang đói sự nghỉ ngơi hoặc an ủi, không phải đói vật chất."
        },
        {
          id: "qd-05",
          dimension: "motivation",
          context: "Hủy kế hoạch vì thời tiết",
          question:
            "Bạn hào hứng chuẩn bị cả tuần cho chuyến dã ngoại cuối tuần, nhưng sáng sớm trời đổ mưa tầm tã khiến cả kế hoạch ngoài trời bị hủy. Bạn xoay chuyển tâm trạng thế nào?",
          options: [
            {
              text: "Tiếc nuối vài phút, rồi nhanh chóng biến ngày mưa thành 'phương án B thú vị' (nấu món ngon, xem bộ phim để dành lâu nay hoặc rủ bạn qua nhà chơi boardgame).",
              score: 4,
              feedback: "Linh hoạt và lạc quan thực tế! Tự kiến tạo niềm vui từ điều kiện sẵn có."
            },
            {
              text: "Chấp nhận ở nhà dọn dẹp phòng ốc làm việc bù cho đỡ phí thời gian.",
              score: 3,
              feedback: "Thực tế và hiệu quả, cho phép mình tận hưởng chút thư giãn ngày mưa sẽ cân bằng hơn."
            },
            {
              text: "Nằm bẹp trên giường than trời trách đất, hủy luôn mọi hoạt động cả ngày hôm đó.",
              score: 1,
              feedback: "Để thời tiết quyết định hoàn toàn niềm vui cả ngày là trao quyền kiểm soát tâm trạng ra bên ngoài."
            },
            {
              text: "Cố gắng mặc áo mưa đi đại cho đỡ phí công chuẩn bị dù cả nhóm lạnh cóng và chán nản.",
              score: 2,
              feedback: "Cố chấp theo kế hoạch cũ không phù hợp thực tế làm giảm trải nghiệm của mọi người."
            }
          ],
          explanation:
            "Sự linh hoạt tâm lý (Psychological Flexibility) giúp bạn giữ vững năng lượng tích cực ngay cả khi những dự định đẹp đẽ nhất gặp trục trặc ngoài ý muốn."
        },
        {
          id: "qd-06",
          dimension: "empathy",
          context: "Bình luận trên mạng xã hội",
          question:
            "Bạn thấy một người quen đăng trạng thái tâm trạng khá rối bời và tiêu cực lúc nửa đêm, nhưng bài viết hơi mơ hồ không rõ chuyện gì. Bạn phản hồi thế nào?",
          options: [
            {
              text: "Bình luận công khai bên dưới: 'Lại làm sao đấy? Kể rõ ra xem nào cho mọi người hóng với'.",
              score: 1,
              feedback: "Tò mò công khai khiến người đang tổn thương thấy bị soi mói hơn là được quan tâm."
            },
            {
              text: "Thả biểu tượng mặt buồn (sad) rồi lướt qua tiếp.",
              score: 2,
              feedback: "Thể hiện sự chú ý nhẹ nhưng đôi khi hơi hời hợt với người đang thực sự cần kết nối."
            },
            {
              text: "Nhắn tin riêng nhẹ nhàng: 'Mình thấy bài đăng của bạn, không cần phải kể nếu chưa tiện đâu, chỉ muốn nhắn là nếu cần người nghe thì mình vẫn thức nha.'",
              score: 4,
              feedback: "Quá ấm áp và tinh tế! Trao sự hỗ trợ riêng tư không gây áp lực."
            },
            {
              text: "Bình luận động viên công khai: 'Cố lên nhé bạn ơi, mọi chuyện rồi sẽ ổn thôi!'",
              score: 3,
              feedback: "Thiện chí rất tốt; một tin nhắn riêng sẽ tạo không gian an toàn hơn nhiều."
            }
          ],
          explanation:
            "Khi ai đó phát tín hiệu cầu cứu cảm xúc vào ban đêm, một tin nhắn riêng ngắn gọn không ép buộc sẽ mang lại cảm giác được quan tâm thực sự."
        },
        {
          id: "qd-07",
          dimension: "self_awareness",
          context: "Năng lượng sau giao tiếp",
          question:
            "Bạn vừa đi dự một buổi gặp mặt đông người về và bỗng thấy người rã rời, chỉ muốn im lặng, dù buổi tiệc rất vui. Bạn hiểu điều gì về bản thân?",
          options: [
            {
              text: "Hiểu đây là nhịp năng lượng tự nhiên của bản thân sau tương tác cường độ cao, vui vẻ cho phép mình 1 khoảng lặng phục hồi mà không tự phán xét.",
              score: 4,
              feedback: "Tự nhận thức lành mạnh! Hiểu rõ cơ chế tiêu hao và sạc lại pin cảm xúc của chính mình."
            },
            {
              text: "Lo lắng nghĩ mình bị trầm cảm hoặc có vấn đề giao tiếp kém cỏi.",
              score: 1,
              feedback: "Hiểu nhầm nhu cầu nạp năng lượng tự nhiên thành khiếm khuyết tâm lý."
            },
            {
              text: "Tự ép mình nhận thêm lịch hẹn ngày mai để chứng minh mình là người hướng ngoại năng động.",
              score: 2,
              feedback: "Chạy theo hình mẫu không hợp nhịp sinh học dễ dẫn đến kiệt sức."
            },
            {
              text: "Đi ngủ sớm một giấc cho đỡ mệt mà không suy nghĩ nhiều.",
              score: 3,
              feedback: "Biết nghỉ ngơi kịp thời là tốt; hiểu rõ bản đồ năng lượng cá nhân sẽ giúp bạn sắp lịch thông minh hơn."
            }
          ],
          explanation:
            "Hiểu mình thuộc nhóm nạp năng lượng từ đám đông hay từ sự tĩnh lặng giúp bạn chủ động thiết kế lịch sinh hoạt phù hợp mà không cảm thấy tội lỗi."
        },
        {
          id: "qd-08",
          dimension: "social_skills",
          context: "Chia tiền sòng phẳng",
          question:
            "Đi ăn nhóm 6 người, một bạn đứng ra trả trước nhưng khi nhắn chia tiền vào nhóm lại tính nhầm thiếu hoặc bỏ sót khoản nhỏ khiến bạn thấy hơi lăn tăn. Bạn xử lý thế nào?",
          options: [
            {
              text: "Cứ chuyển đại theo con số họ nhắn dù biết sai, rồi lần sau tự né không đi chung nữa.",
              score: 2,
              feedback: "Né tránh giao tiếp thẳng thắn về con số dễ tạo khoảng cách không đáng có."
            },
            {
              text: "Nếu chênh lệch nhỏ thì vui vẻ chuyển dư thêm một chút coi như mời bạn ấy ly nước cảm ơn.",
              score: 3,
              feedback: "Rất hào phóng và dễ thương trong tình huống chênh nhỏ; nếu sai số lớn thì trao đổi nhẹ nhàng là chuẩn nhất."
            },
            {
              text: "Nhắn nhẹ với thái độ thoải mái, cảm ơn bạn đã đứng ra thanh toán hộ và chủ động chuyển phần đúng (hoặc nhắc khéo khoản sót bằng giọng vui vẻ để mọi người cùng sòng phẳng).",
              score: 4,
              feedback: "Rõ ràng, sòng phẳng và giữ trọn thiện chí!"
            },
            {
              text: "Im lặng ấm ức nhưng đi kể với một bạn khác trong nhóm là bạn kia tính toán dở.",
              score: 1,
              feedback: "Nói sau lưng về chuyện tiền bạc dễ phá hỏng tình bạn."
            }
          ],
          explanation:
            "Tiền bạc phân minh là nền tảng bảo vệ tình bạn lâu dài. Cách góp ý vui vẻ kèm lời cảm ơn người đứng ra ứng tiền giúp mọi người đều thoải mái."
        },
        {
          id: "qd-09",
          dimension: "self_regulation",
          context: "Khép lại một ngày tồi tệ",
          question:
            "Một ngày dài toàn chuyện bực mình sắp kết thúc. Trước khi đi ngủ, đầu óc bạn vẫn tua đi tua lại những câu nói khó chịu ban sáng. Bạn làm gì để không mang cơn bực qua ngày mai?",
          options: [
            {
              text: "Gọi điện tâm sự với bạn thân một chút cho nhẹ lòng rồi đi ngủ.",
              score: 3,
              feedback: "Giải tỏa với người tin cậy khá ổn, chỉ cần tránh sa đà vào việc kể đi kể lại quá khuya."
            },
            {
              text: "Viết nhanh 3 dòng cảm xúc ra giấy để 'đổ rác tâm trí', rút ra 1 bài học nếu có, rồi thực hiện nghi thức thư giãn (tắm ấm, hít thở sâu) để khép lại ngày cũ.",
              score: 4,
              feedback: "Tuyệt vời! Kỹ thuật xả tâm trí (Brain Dump) giúp não bộ an tâm buông xuống và ngủ sâu."
            },
            {
              text: "Mở phim hoặc lướt video ngắn liên tục cho tới lúc kiệt sức thiếp đi.",
              score: 2,
              feedback: "Gây tê bằng màn hình sáng làm giảm chất lượng giấc ngủ sâu."
            },
            {
              text: "Nằm nghĩ tới 2 giờ sáng xem đáng lẽ lúc đó mình phải cãi lại câu gì cho thật gắt.",
              score: 1,
              feedback: "Nhai lại cơn giận (Rumination) khiến não bộ sống lại nỗi bực đó hàng chục lần."
            }
          ],
          explanation:
            "Khả năng 'đóng nắp' một ngày căng thẳng quyết định tốc độ phục hồi cảm xúc của bạn. Đưa suy nghĩ ra khỏi đầu lên mặt giấy giúp ngắt vòng lặp nhai lại cơn giận."
        }
      ]
    }
  ];

  window.EQ_DATA = {
    DIMENSIONS: DIMENSIONS,
    EQ_LEVELS: EQ_LEVELS,
    TESTS: TESTS
  };
})();
