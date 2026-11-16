(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  if (!DATA) {
    throw new Error("EQ_DATA is not loaded.");
  }

  const STORAGE_KEYS = {
    HISTORY: "eq_test_history_v1",
    THEME: "eq_compass_theme_v1",
    PLAYER_NAME: "eq_compass_player_name_v1"
  };

  const EQ_DIMENSION_ORDER = [
    "self_awareness",
    "self_regulation",
    "motivation",
    "empathy",
    "social_skills"
  ];

  const IQ_DIMENSION_ORDER = [
    "logical_reasoning",
    "numerical_pattern",
    "spatial_visual",
    "verbal_analytic",
    "working_memory"
  ];

  const PERSONALITY_DIMENSION_ORDER = [
    "openness",
    "conscientiousness",
    "extraversion",
    "agreeableness",
    "stability"
  ];

  const LETTERS = ["A", "B", "C", "D"];

  const COMMUNITY_BENCHMARKS = [
    { name: "Minh Quân", type: "iq", score: 136, label: "Top 2% • Chuẩn IQ" },
    { name: "Thảo Vy", type: "eq", score: 134, label: "Xuất sắc • EQ Toàn diện" },
    { name: "Hoàng Nam", type: "personality", score: 131, label: "Kiến Trúc Sư Chiến Lược" },
    { name: "Khánh Linh", type: "eq", score: 126, label: "EQ Cao • Giao tiếp tinh tế" },
    { name: "Đức Anh", type: "iq", score: 124, label: "IQ Cao • Logic & Số học" },
    { name: "Bảo Ngọc", type: "personality", score: 121, label: "Nhà Sáng Tạo Nhân Văn" },
    { name: "Tuấn Kiệt", type: "iq", score: 112, label: "IQ Khá • Không gian 3D" },
    { name: "Lan Phương", type: "eq", score: 109, label: "EQ Khá • Công sở" }
  ];

  const state = {
    view: "home",
    mode: "standard",
    timerEnabled: true,
    activeDomain: "all",
    activeCategory: "all",
    searchQuery: "",
    theme: "light",
    playerName: "",
    history: [],
    leaderboardFilter: "all",

    // Active quiz session
    currentTest: null,
    currentIndex: 0,
    answers: {},
    flags: new Set(),
    elapsedSeconds: 0,
    remainingSeconds: 0,
    timerId: null,

    // Active result
    currentResult: null,
    reviewFilter: "all",
    toastTimer: null
  };

  // ==================== DOM CACHE ====================
  const els = {
    homeView: document.getElementById("home-view"),
    quizView: document.getElementById("quiz-view"),
    resultView: document.getElementById("result-view"),

    navHomeBtn: document.getElementById("nav-home-btn"),
    btnNavTests: document.getElementById("btn-nav-tests"),
    btnOpenLeaderboard: document.getElementById("btn-open-leaderboard"),
    btnOpenHistory: document.getElementById("btn-open-history"),
    btnOpenGuide: document.getElementById("btn-open-guide"),
    btnToggleTheme: document.getElementById("btn-toggle-theme"),
    themeIcon: document.getElementById("theme-icon"),
    historyCountBadge: document.getElementById("history-count-badge"),

    btnQuickStart: document.getElementById("btn-quick-start"),
    btnQuickStartIq: document.getElementById("btn-quick-start-iq"),
    btnQuickStartPersonality: document.getElementById("btn-quick-start-personality"),
    btnStart5Min: document.getElementById("btn-start-5min"),
    statCompletedCount: document.getElementById("stat-completed-count"),
    statAvgEq: document.getElementById("stat-avg-eq"),
    statAvgIq: document.getElementById("stat-avg-iq"),
    statAvgPersonality: document.getElementById("stat-avg-personality"),
    statDualProfile: document.getElementById("stat-dual-profile"),

    modeStandardBtn: document.getElementById("mode-standard-btn"),
    modePracticeBtn: document.getElementById("mode-practice-btn"),
    modeHint: document.getElementById("mode-hint"),
    toggleTimerLimit: document.getElementById("toggle-timer-limit"),

    domainTabs: document.getElementById("domain-tabs"),
    categoryFilters: document.getElementById("category-filters"),
    testSearchInput: document.getElementById("test-search-input"),
    testsGrid: document.getElementById("tests-grid"),
    testsEmptyState: document.getElementById("tests-empty-state"),
    btnResetFilters: document.getElementById("btn-reset-filters"),

    // Quiz
    btnExitQuiz: document.getElementById("btn-exit-quiz"),
    quizTestTitle: document.getElementById("quiz-test-title"),
    quizModeBadge: document.getElementById("quiz-mode-badge"),
    quizProgressText: document.getElementById("quiz-progress-text"),
    quizAnsweredPct: document.getElementById("quiz-answered-pct"),
    quizTimerPill: document.getElementById("quiz-timer-pill"),
    quizTimerDisplay: document.getElementById("quiz-timer-display"),
    quizProgressBar: document.getElementById("quiz-progress-bar"),

    qIndexBadge: document.getElementById("q-index-badge"),
    qContextBadge: document.getElementById("q-context-badge"),
    qDimBadge: document.getElementById("q-dim-badge"),
    btnFlagQuestion: document.getElementById("btn-flag-question"),
    flagLabel: document.getElementById("flag-label"),
    questionText: document.getElementById("question-text"),
    questionVisual: document.getElementById("question-visual"),
    optionsList: document.getElementById("options-list"),

    practiceFeedback: document.getElementById("practice-feedback"),
    feedbackScorePill: document.getElementById("feedback-score-pill"),
    feedbackVerdict: document.getElementById("feedback-verdict"),
    feedbackPersonal: document.getElementById("feedback-personal"),
    feedbackInsightLabel: document.getElementById("feedback-insight-label"),
    feedbackExplanation: document.getElementById("feedback-explanation"),

    btnPrevQuestion: document.getElementById("btn-prev-question"),
    btnNextQuestion: document.getElementById("btn-next-question"),
    btnSubmitInline: document.getElementById("btn-submit-inline"),

    paletteCounter: document.getElementById("palette-counter"),
    paletteGrid: document.getElementById("palette-grid"),
    btnSubmitQuiz: document.getElementById("btn-submit-quiz"),

    // Result
    sharedResultBanner: document.getElementById("shared-result-banner"),
    sharedBannerText: document.getElementById("shared-banner-text"),
    btnTrySharedTest: document.getElementById("btn-try-shared-test"),
    resultTestName: document.getElementById("result-test-name"),
    resultTimestamp: document.getElementById("result-timestamp"),
    resultTimeSpent: document.getElementById("result-time-spent"),
    btnShareLink: document.getElementById("btn-share-link"),
    btnDownloadCard: document.getElementById("btn-download-card"),
    btnCopyResult: document.getElementById("btn-copy-result"),
    btnPrintResult: document.getElementById("btn-print-result"),
    btnRetakeTest: document.getElementById("btn-retake-test"),
    btnBackToHub: document.getElementById("btn-back-to-hub"),

    eqScoreRing: document.getElementById("eq-score-ring"),
    eqRingLabel: document.getElementById("eq-ring-label"),
    eqRingSub: document.getElementById("eq-ring-sub"),
    resultEqIndex: document.getElementById("result-eq-index"),
    resultRawScore: document.getElementById("result-raw-score"),
    resultPctScore: document.getElementById("result-pct-score"),
    resultLevelBadge: document.getElementById("result-level-badge"),
    resultLevelTitle: document.getElementById("result-level-title"),
    resultLevelSummary: document.getElementById("result-level-summary"),
    archetypeBox: document.getElementById("archetype-box"),
    archetypeName: document.getElementById("archetype-name"),
    archetypeMbti: document.getElementById("archetype-mbti"),
    archetypeSummary: document.getElementById("archetype-summary"),
    archetypeCareers: document.getElementById("archetype-careers"),
    resultLevelAdvice: document.getElementById("result-level-advice"),
    spectrumLabelLow: document.getElementById("spectrum-label-low"),
    spectrumLabelMid: document.getElementById("spectrum-label-mid"),
    spectrumLabelHigh: document.getElementById("spectrum-label-high"),
    spectrumMarker: document.getElementById("spectrum-marker"),
    spectrumMarkerVal: document.getElementById("spectrum-marker-val"),

    radarTitle: document.getElementById("radar-title"),
    radarSubtitle: document.getElementById("radar-subtitle"),
    radarUserLabel: document.getElementById("radar-user-label"),
    eqRadarCanvas: document.getElementById("eq-radar-canvas"),
    strengthIcon: document.getElementById("strength-icon"),
    strengthName: document.getElementById("strength-name"),
    strengthScore: document.getElementById("strength-score"),
    strengthDesc: document.getElementById("strength-desc"),
    growthIcon: document.getElementById("growth-icon"),
    growthName: document.getElementById("growth-name"),
    growthScore: document.getElementById("growth-score"),
    growthDesc: document.getElementById("growth-desc"),

    dimensionsSectionTitle: document.getElementById("dimensions-section-title"),
    dimensionsSectionSubtitle: document.getElementById("dimensions-section-subtitle"),
    dimensionsBreakdown: document.getElementById("dimensions-breakdown"),
    reviewSection: document.getElementById("review-section"),
    reviewSectionTitle: document.getElementById("review-section-title"),
    reviewSectionSubtitle: document.getElementById("review-section-subtitle"),
    reviewFilters: document.getElementById("review-filters"),
    reviewFilterOptimalBtn: document.getElementById("review-filter-optimal-btn"),
    reviewFilterImproveBtn: document.getElementById("review-filter-improve-btn"),
    reviewList: document.getElementById("review-list"),

    // Modals
    submitConfirmModal: document.getElementById("submit-confirm-modal"),
    confirmMissingText: document.getElementById("confirm-missing-text"),
    missingQuestionChips: document.getElementById("missing-question-chips"),
    btnForceSubmit: document.getElementById("btn-force-submit"),

    exitConfirmModal: document.getElementById("exit-confirm-modal"),
    btnConfirmExit: document.getElementById("btn-confirm-exit"),

    historyModal: document.getElementById("history-modal"),
    historyList: document.getElementById("history-list"),
    btnClearHistory: document.getElementById("btn-clear-history"),

    leaderboardModal: document.getElementById("leaderboard-modal"),
    playerNameInput: document.getElementById("player-name-input"),
    btnSavePlayerName: document.getElementById("btn-save-player-name"),
    leaderboardFilters: document.getElementById("leaderboard-filters"),
    leaderboardList: document.getElementById("leaderboard-list"),

    guideModal: document.getElementById("guide-modal"),
    guideModalContent: document.getElementById("guide-modal-content"),

    toast: document.getElementById("app-toast")
  };

  // ==================== HELPERS ====================
  function getTestType(test) {
    if (!test) return "eq";
    if (test.testType === "iq" || test.testType === "personality" || test.testType === "eq") {
      return test.testType;
    }
    return "eq";
  }

  function getTestConfig(test) {
    const tType = getTestType(test);
    if (tType === "iq") {
      return {
        testType: "iq",
        dimensionsMap: DATA.IQ_DIMENSIONS,
        dimensionOrder: IQ_DIMENSION_ORDER,
        levels: DATA.IQ_LEVELS,
        minIndex: 70,
        maxIndex: 145,
        indexLabel: "CHỈ SỐ IQ",
        shortLabel: "IQ",
        badgeText: "IQ"
      };
    }
    if (tType === "personality") {
      return {
        testType: "personality",
        dimensionsMap: DATA.PERSONALITY_DIMENSIONS,
        dimensionOrder: PERSONALITY_DIMENSION_ORDER,
        levels: DATA.PERSONALITY_LEVELS,
        minIndex: 60,
        maxIndex: 145,
        indexLabel: "CHỈ SỐ OCEAN",
        shortLabel: "OCEAN",
        badgeText: "TÍNH CÁCH"
      };
    }
    return {
      testType: "eq",
      dimensionsMap: DATA.DIMENSIONS,
      dimensionOrder: EQ_DIMENSION_ORDER,
      levels: DATA.EQ_LEVELS,
      minIndex: 55,
      maxIndex: 145,
      indexLabel: "CHỈ SỐ EQ",
      shortLabel: "EQ",
      badgeText: "EQ"
    };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDuration(totalSec) {
    const safe = Math.max(0, Math.floor(totalSec));
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function formatDateTime(isoString) {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch (_err) {
      return isoString;
    }
  }

  function showToast(message) {
    if (state.toastTimer) clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.remove("hidden");
    state.toastTimer = setTimeout(() => {
      els.toast.classList.add("hidden");
    }, 3000);
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      const parsed = raw ? JSON.parse(raw) : [];
      state.history = Array.isArray(parsed) ? parsed : [];
    } catch (_err) {
      state.history = [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history.slice(0, 60)));
    } catch (_err) {
      // Ignore quota errors
    }
  }

  function loadPlayerName() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLAYER_NAME);
      state.playerName = saved ? saved.trim() : "";
    } catch (_err) {
      state.playerName = "";
    }
    if (els.playerNameInput) {
      els.playerNameInput.value = state.playerName;
    }
  }

  function savePlayerName(name) {
    state.playerName = String(name || "").trim().slice(0, 30);
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYER_NAME, state.playerName);
    } catch (_err) {
      // Ignore
    }
  }

  function loadTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === "dark" || saved === "light") state.theme = saved;
    } catch (_err) {
      state.theme = "light";
    }
    applyTheme();
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    els.themeIcon.textContent = state.theme === "dark" ? "☀️" : "🌙";
    if (state.view === "result" && state.currentResult) {
      drawRadarChart(state.currentResult.dimensions);
    }
  }

  function toggleTheme() {
    state.theme = state.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    } catch (_err) {
      // Ignore
    }
    applyTheme();
  }

  // ==================== VIEW NAVIGATION ====================
  function switchView(viewName) {
    state.view = viewName;
    els.homeView.classList.toggle("hidden", viewName !== "home");
    els.homeView.classList.toggle("active", viewName === "home");

    els.quizView.classList.toggle("hidden", viewName !== "quiz");
    els.quizView.classList.toggle("active", viewName === "quiz");

    els.resultView.classList.toggle("hidden", viewName !== "result");
    els.resultView.classList.toggle("active", viewName === "result");

    els.btnNavTests.classList.toggle("active", viewName === "home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove("hidden");
  }

  function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add("hidden");
  }

  function isAnyModalOpen() {
    return (
      !els.submitConfirmModal.classList.contains("hidden") ||
      !els.exitConfirmModal.classList.contains("hidden") ||
      !els.historyModal.classList.contains("hidden") ||
      !els.leaderboardModal.classList.contains("hidden") ||
      !els.guideModal.classList.contains("hidden")
    );
  }

  // ==================== HOME VIEW & TRIANGLE PROFILE ====================
  function getHistoryItemType(item) {
    if (item.testType === "iq" || item.testType === "personality" || item.testType === "eq") {
      return item.testType;
    }
    const found = DATA.TESTS.find((t) => t.id === item.testId);
    if (found) return getTestType(found);
    const id = String(item.testId || "");
    if (id.startsWith("iq-")) return "iq";
    if (id.startsWith("ocean-") || id.startsWith("mbti-") || id.startsWith("career-")) return "personality";
    return "eq";
  }

  function getHistoryScoreIndex(item) {
    return typeof item.scoreIndex === "number" ? item.scoreIndex : item.eqIndex;
  }

  function computeTriangleProfileTitle(avgEq, avgIq, archetypeName) {
    const hasEq = avgEq !== null;
    const hasIq = avgIq !== null;
    const hasPers = Boolean(archetypeName);

    if (hasEq && hasIq && hasPers) {
      if (avgEq >= 115 && avgIq >= 115) return `👑 Thủ Lĩnh Toàn Tài • ${archetypeName}`;
      if (avgEq >= 100 && avgIq >= 100) return `🌟 Tam Giác Cân Bằng • ${archetypeName}`;
      return `🚀 Khai Phá Toàn Diện • ${archetypeName}`;
    }

    const missing = [];
    if (!hasEq) missing.push("EQ");
    if (!hasIq) missing.push("IQ");
    if (!hasPers) missing.push("Tính cách");
    if (missing.length === 3) return "Làm đủ EQ, IQ & Tính cách để mở khóa";
    return `Cần thêm ${missing.join(" + ")} để mở khóa`;
  }

  function updateUserStats() {
    els.historyCountBadge.textContent = String(state.history.length);
    els.statCompletedCount.textContent = String(state.history.length);

    const eqItems = state.history.filter((h) => getHistoryItemType(h) === "eq");
    const iqItems = state.history.filter((h) => getHistoryItemType(h) === "iq");
    const persItems = state.history.filter((h) => getHistoryItemType(h) === "personality");

    const avgEq =
      eqItems.length > 0
        ? Math.round(eqItems.reduce((s, x) => s + (getHistoryScoreIndex(x) || 0), 0) / eqItems.length)
        : null;
    const avgIq =
      iqItems.length > 0
        ? Math.round(iqItems.reduce((s, x) => s + (getHistoryScoreIndex(x) || 0), 0) / iqItems.length)
        : null;

    let latestArchetype = null;
    if (persItems.length > 0) {
      latestArchetype = persItems[0].archetypeName || "Đã định vị";
    }

    els.statAvgEq.textContent = avgEq !== null ? String(avgEq) : "--";
    els.statAvgIq.textContent = avgIq !== null ? String(avgIq) : "--";
    els.statAvgPersonality.textContent = latestArchetype || "Chưa làm bài";
    els.statDualProfile.textContent = computeTriangleProfileTitle(avgEq, avgIq, latestArchetype);
  }

  function getBestRecordForTest(testId) {
    const matches = state.history.filter((h) => h.testId === testId);
    if (matches.length === 0) return null;
    return matches.reduce(
      (best, cur) => (getHistoryScoreIndex(cur) > getHistoryScoreIndex(best) ? cur : best),
      matches[0]
    );
  }

  function syncCategoryPillsVisibility() {
    const pills = Array.from(els.categoryFilters.querySelectorAll(".filter-pill"));
    pills.forEach((pill) => {
      const cat = pill.dataset.category;
      if (cat === "all") {
        pill.classList.remove("hidden");
        return;
      }
      const isIqCat = cat.startsWith("iq-");
      const isPersCat = cat.startsWith("personality-");
      const isEqCat = !isIqCat && !isPersCat;
      const show =
        state.activeDomain === "all" ||
        (state.activeDomain === "iq" && isIqCat) ||
        (state.activeDomain === "personality" && isPersCat) ||
        (state.activeDomain === "eq" && isEqCat);
      pill.classList.toggle("hidden", !show);
    });
  }

  function syncDomainCounts() {
    const counts = { all: DATA.TESTS.length, eq: 0, iq: 0, personality: 0 };
    DATA.TESTS.forEach((t) => {
      const k = getTestType(t);
      if (counts[k] !== undefined) counts[k] += 1;
    });
    const elAll = document.getElementById("tab-count-all");
    const elEq = document.getElementById("tab-count-eq");
    const elIq = document.getElementById("tab-count-iq");
    const elPers = document.getElementById("tab-count-personality");
    if (elAll) elAll.textContent = String(counts.all);
    if (elEq) elEq.textContent = String(counts.eq);
    if (elIq) elIq.textContent = String(counts.iq);
    if (elPers) elPers.textContent = String(counts.personality);
  }

  function renderTestsGrid() {
    syncCategoryPillsVisibility();
    const query = state.searchQuery.trim().toLowerCase();
    const typeOrder = { eq: 0, iq: 1, personality: 2 };
    const filtered = DATA.TESTS.filter((test) => {
      const tType = getTestType(test);
      if (state.activeDomain !== "all" && tType !== state.activeDomain) return false;
      if (state.activeCategory !== "all" && test.category !== state.activeCategory) return false;
      if (!query) return true;
      const haystack = `${tType} ${test.title} ${test.description} ${test.categoryLabel} ${test.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query);
    }).sort((a, b) => (typeOrder[getTestType(a)] || 0) - (typeOrder[getTestType(b)] || 0));

    els.testsGrid.innerHTML = "";
    els.testsEmptyState.classList.toggle("hidden", filtered.length > 0);

    filtered.forEach((test) => {
      const tType = getTestType(test);
      const cfg = getTestConfig(test);
      const best = getBestRecordForTest(test.id);
      const card = document.createElement("article");
      card.className = "test-card";
      card.style.setProperty("--card-accent", test.accentColor);

      const bestBadgeHtml = best
        ? `<span class="badge-best">Kỷ lục: ${cfg.shortLabel} ${getHistoryScoreIndex(best)} (${best.pct}%)</span>`
        : "";

      const tagsHtml = test.tags.map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join("");
      const unitHint =
        tType === "iq" ? "câu đố logic" : tType === "personality" ? "câu trắc nghiệm" : "câu tình huống";

      card.innerHTML = `
        <div class="test-card-top">
          <div class="test-icon-wrap">${test.icon}</div>
          <div class="test-badges">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
              <span class="badge-type-pill ${tType}">${cfg.badgeText}</span>
              <span class="badge-level">${escapeHtml(test.categoryLabel)} • ${escapeHtml(test.level)}</span>
            </div>
            ${bestBadgeHtml}
          </div>
        </div>
        <h3 class="test-card-title">${escapeHtml(test.title)}</h3>
        <p class="test-card-desc">${escapeHtml(test.description)}</p>
        <div class="test-meta-row">
          <span>📝 ${test.questions.length} ${unitHint}</span>
          <span>⏱️ ${test.durationMinutes} phút</span>
        </div>
        <div class="test-tags">${tagsHtml}</div>
        <button type="button" class="btn btn-primary btn-block" data-start-test="${escapeHtml(test.id)}">
          ${best ? "🔄 Làm lại bộ đề này" : "▶ Bắt đầu làm bài"}
        </button>
      `;
      els.testsGrid.appendChild(card);
    });
  }

  // ==================== QUIZ SESSION ====================
  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimerUI() {
    if (state.timerEnabled) {
      els.quizTimerDisplay.textContent = formatDuration(state.remainingSeconds);
      els.quizTimerPill.classList.toggle("warning", state.remainingSeconds <= 60);
    } else {
      els.quizTimerDisplay.textContent = formatDuration(state.elapsedSeconds);
      els.quizTimerPill.classList.remove("warning");
    }
  }

  function startTimer() {
    stopTimer();
    updateTimerUI();
    state.timerId = setInterval(() => {
      state.elapsedSeconds += 1;
      if (state.timerEnabled) {
        state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
        updateTimerUI();
        if (state.remainingSeconds === 0) {
          stopTimer();
          showToast("Hết giờ làm bài! Hệ thống đang chấm điểm bài làm của bạn...");
          finalizeQuiz();
        }
      } else {
        updateTimerUI();
      }
    }, 1000);
  }

  function startTest(testId) {
    const test = DATA.TESTS.find((t) => t.id === testId);
    if (!test) return;

    stopTimer();
    state.currentTest = test;
    state.currentIndex = 0;
    state.answers = {};
    state.flags = new Set();
    state.elapsedSeconds = 0;
    state.remainingSeconds = test.durationMinutes * 60;

    els.quizTestTitle.textContent = test.title;
    els.quizModeBadge.textContent =
      state.mode === "practice"
        ? "📖 Chế độ Luyện tập tương tác"
        : "🎯 Chế độ Đánh giá chuẩn";

    switchView("quiz");
    renderQuizQuestion();
    renderPalette();
    startTimer();
  }

  function getScaleScoreLabel(score, testType) {
    if (testType === "personality") {
      if (score === 4) return { label: "Biểu đạt rất mạnh (4/4đ)", cls: "score-4" };
      if (score === 3) return { label: "Biểu đạt khá rõ (3/4đ)", cls: "score-3" };
      if (score === 2) return { label: "Biểu đạt trung bình (2/4đ)", cls: "score-2" };
      return { label: "Thiên hướng đối lập (1/4đ)", cls: "score-1" };
    }
    if (score === 4) return { label: "Phản ứng tối ưu (4/4đ)", cls: "score-4" };
    if (score === 3) return { label: "Ứng xử tích cực (3/4đ)", cls: "score-3" };
    if (score === 2) return { label: "Chưa thực sự hiệu quả (2/4đ)", cls: "score-2" };
    return { label: "Phản ứng cảm tính (1/4đ)", cls: "score-1" };
  }

  function renderQuizQuestion() {
    const test = state.currentTest;
    if (!test) return;

    const cfg = getTestConfig(test);
    const total = test.questions.length;
    const idx = state.currentIndex;
    const q = test.questions[idx];
    const dim = cfg.dimensionsMap[q.dimension];
    const answeredCount = Object.keys(state.answers).length;
    const pctDone = Math.round((answeredCount / total) * 100);

    els.quizProgressText.textContent = `Câu ${idx + 1} / ${total}`;
    els.quizAnsweredPct.textContent = `${pctDone}% đã chọn`;
    els.quizProgressBar.style.width = `${pctDone}%`;

    els.qIndexBadge.textContent = `Câu ${idx + 1} / ${total}`;
    els.qContextBadge.textContent = q.context;
    els.qDimBadge.textContent = `${dim.icon} ${dim.shortName}`;
    els.qDimBadge.classList.toggle("hidden", state.mode !== "practice");

    const isFlagged = state.flags.has(idx);
    els.btnFlagQuestion.classList.toggle("flagged", isFlagged);
    els.btnFlagQuestion.setAttribute("aria-pressed", String(isFlagged));
    els.flagLabel.textContent = isFlagged ? "Đã đánh dấu" : "Đánh dấu xem lại";

    els.questionText.textContent = q.question;

    if (q.svgDiagram) {
      els.questionVisual.innerHTML = q.svgDiagram;
      els.questionVisual.classList.remove("hidden");
    } else {
      els.questionVisual.innerHTML = "";
      els.questionVisual.classList.add("hidden");
    }

    const selectedOptIdx = state.answers[idx];
    const hasAnswered = selectedOptIdx !== undefined;
    els.optionsList.innerHTML = "";

    q.options.forEach((opt, optIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.setAttribute("role", "radio");
      const isSelected = selectedOptIdx === optIdx;
      btn.setAttribute("aria-checked", String(isSelected));

      if (isSelected) {
        btn.classList.add("selected");
        if (state.mode === "practice") {
          btn.classList.add(
            cfg.testType === "iq"
              ? opt.isCorrect
                ? "practice-score-4"
                : "practice-score-1"
              : `practice-score-${opt.score}`
          );
        }
      } else if (state.mode === "practice" && hasAnswered) {
        const isBest = cfg.testType === "iq" ? opt.isCorrect : opt.score === 4;
        if (isBest && cfg.testType !== "personality") btn.classList.add("practice-score-4");
      }

      let scoreTagHtml = "";
      if (state.mode === "practice" && hasAnswered) {
        if (cfg.testType === "iq") {
          if (opt.isCorrect) scoreTagHtml = `<span class="option-score-tag">✓ Đúng</span>`;
          else if (isSelected) scoreTagHtml = `<span class="option-score-tag">✕ Sai</span>`;
        } else if (isSelected || (cfg.testType === "eq" && opt.score === 4)) {
          scoreTagHtml = `<span class="option-score-tag">${opt.score}/4đ</span>`;
        }
      }

      btn.innerHTML = `
        <span class="option-letter">${LETTERS[optIdx]}</span>
        <span class="option-text">${escapeHtml(opt.text)}</span>
        ${scoreTagHtml}
      `;

      btn.addEventListener("click", () => selectOption(optIdx));
      els.optionsList.appendChild(btn);
    });

    if (state.mode === "practice" && hasAnswered) {
      const chosen = q.options[selectedOptIdx];
      els.practiceFeedback.classList.remove("hidden");
      if (cfg.testType === "iq") {
        els.feedbackScorePill.textContent = chosen.isCorrect ? "Chính xác ✓" : "Chưa đúng ✕";
        els.feedbackScorePill.className = `feedback-score-pill ${chosen.isCorrect ? "score-4" : "score-1"}`;
        els.feedbackVerdict.textContent = chosen.isCorrect
          ? "Tuyệt vời! Bạn đã giải đúng câu này."
          : "Chưa chính xác — hãy xem lời giải từng bước bên dưới.";
        els.feedbackInsightLabel.textContent = "📐 Lời giải chi tiết:";
      } else if (cfg.testType === "personality") {
        const meta = getScaleScoreLabel(chosen.score, "personality");
        els.feedbackScorePill.textContent = `${chosen.score}/4 điểm`;
        els.feedbackScorePill.className = `feedback-score-pill ${meta.cls}`;
        els.feedbackVerdict.textContent = meta.label;
        els.feedbackInsightLabel.textContent = "🎭 Phân tích tính cách:";
      } else {
        const meta = getScaleScoreLabel(chosen.score, "eq");
        els.feedbackScorePill.textContent = `${chosen.score}/4 điểm`;
        els.feedbackScorePill.className = `feedback-score-pill ${meta.cls}`;
        els.feedbackVerdict.textContent = meta.label;
        els.feedbackInsightLabel.textContent = "💡 Góc nhìn tâm lý học:";
      }
      els.feedbackPersonal.textContent = chosen.feedback;
      els.feedbackExplanation.textContent = q.explanation;
    } else {
      els.practiceFeedback.classList.add("hidden");
    }

    els.btnPrevQuestion.disabled = idx === 0;
    const isLast = idx === total - 1;
    els.btnNextQuestion.classList.toggle("hidden", isLast);
    els.btnSubmitInline.classList.toggle("hidden", !isLast);
  }

  function renderPalette() {
    const test = state.currentTest;
    if (!test) return;

    const total = test.questions.length;
    const answeredCount = Object.keys(state.answers).length;
    els.paletteCounter.textContent = `${answeredCount} / ${total} đã chọn`;
    els.paletteGrid.innerHTML = "";

    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "palette-item";
      btn.textContent = String(i + 1);
      btn.title = `Đi tới câu ${i + 1}`;
      if (state.answers[i] !== undefined) btn.classList.add("answered");
      if (state.flags.has(i)) btn.classList.add("flagged");
      if (i === state.currentIndex) btn.classList.add("current");

      btn.addEventListener("click", () => {
        state.currentIndex = i;
        renderQuizQuestion();
        renderPalette();
      });
      els.paletteGrid.appendChild(btn);
    }
  }

  function selectOption(optIdx) {
    state.answers[state.currentIndex] = optIdx;
    renderQuizQuestion();
    renderPalette();
  }

  function toggleFlagCurrent() {
    if (state.flags.has(state.currentIndex)) state.flags.delete(state.currentIndex);
    else state.flags.add(state.currentIndex);
    renderQuizQuestion();
    renderPalette();
  }

  function requestSubmitQuiz() {
    const test = state.currentTest;
    if (!test) return;

    const missing = [];
    for (let i = 0; i < test.questions.length; i++) {
      if (state.answers[i] === undefined) missing.push(i);
    }

    if (missing.length === 0) {
      finalizeQuiz();
      return;
    }

    const fallbackNote =
      getTestType(test) === "iq"
        ? "câu bỏ trống không được tính điểm"
        : "câu bỏ trống được tính 1 điểm tối thiểu";
    els.confirmMissingText.textContent = `Bạn còn ${missing.length} câu chưa chọn đáp án. Hãy bấm vào số câu bên dưới để hoàn thành, hoặc nộp bài luôn (${fallbackNote}).`;
    els.missingQuestionChips.innerHTML = "";
    missing.forEach((qIdx) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "missing-chip";
      chip.textContent = `Câu ${qIdx + 1}`;
      chip.addEventListener("click", () => {
        closeModal("submit-confirm-modal");
        state.currentIndex = qIdx;
        renderQuizQuestion();
        renderPalette();
      });
      els.missingQuestionChips.appendChild(chip);
    });

    openModal("submit-confirm-modal");
  }

  function requestExitQuiz() {
    if (Object.keys(state.answers).length === 0) {
      stopTimer();
      switchView("home");
      return;
    }
    openModal("exit-confirm-modal");
  }

  // ==================== SCORING & EVALUATION ENGINE ====================
  function buildDimensionsResult(cfg, dimStats, overridesDimPcts) {
    return cfg.dimensionOrder.map((dimId, idx) => {
      const meta = cfg.dimensionsMap[dimId];
      const stat = dimStats ? dimStats[dimId] : { score: 0, max: 100, count: 1 };
      let dimPct = 0;
      if (overridesDimPcts) {
        dimPct = Number(overridesDimPcts[idx] || 0);
      } else if (cfg.testType === "iq") {
        dimPct = stat.count > 0 ? Math.round((stat.score / stat.count) * 100) : 0;
      } else {
        dimPct = stat.max > stat.min ? Math.round(((stat.score - stat.min) / (stat.max - stat.min)) * 100) : 0;
      }

      const tier = dimPct >= 75 ? "high" : dimPct >= 50 ? "medium" : "low";
      const tierLabel = tier === "high" ? "Vững vàng" : tier === "medium" ? "Khá ổn" : "Cần bồi đắp";
      return {
        id: dimId,
        meta,
        score: stat.score,
        max: stat.max,
        count: stat.count,
        pct: dimPct,
        tier,
        tierLabel,
        evaluation: meta.evaluations[tier],
        tips: meta.tips
      };
    });
  }

  function evaluateSubmission(test, answersMap, timeSpentSeconds, mode, timestampIso) {
    const cfg = getTestConfig(test);
    const totalQ = test.questions.length;

    const dimStats = {};
    cfg.dimensionOrder.forEach((dimId) => {
      dimStats[dimId] = { score: 0, min: 0, max: 0, count: 0 };
    });

    let rawScore = 0;
    let weightedEarned = 0;
    let weightedMax = 0;

    const questionDetails = test.questions.map((q, idx) => {
      const chosenIdx = answersMap[idx];
      const chosenOption = chosenIdx !== undefined ? q.options[chosenIdx] : null;
      const optimalIdx =
        cfg.testType === "iq"
          ? q.options.findIndex((o) => o.isCorrect)
          : q.options.findIndex((o) => o.score === 4);
      const optimalOption = q.options[optimalIdx];
      const weight = q.difficultyWeight || 1;
      const dStat = dimStats[q.dimension];

      let earned = 0;
      let isCorrect = false;
      if (cfg.testType === "iq") {
        isCorrect = Boolean(chosenOption && chosenOption.isCorrect);
        earned = isCorrect ? 1 : 0;
        rawScore += earned;
        weightedMax += weight;
        if (isCorrect) weightedEarned += weight;

        dStat.score += earned;
        dStat.max += 1;
        dStat.count += 1;
      } else {
        earned = chosenOption ? chosenOption.score : 1;
        rawScore += earned;
        dStat.score += earned;
        dStat.min += 1;
        dStat.max += 4;
        dStat.count += 1;
      }

      return {
        index: idx,
        question: q,
        chosenIdx,
        chosenOption,
        optimalIdx,
        optimalOption,
        earned,
        isCorrect
      };
    });

    const minScore = cfg.testType === "iq" ? 0 : totalQ * 1;
    const maxScore = cfg.testType === "iq" ? totalQ : totalQ * 4;

    let pct = 0;
    let scoreIndex = cfg.minIndex;
    if (cfg.testType === "iq") {
      pct = totalQ > 0 ? Math.round((rawScore / totalQ) * 100) : 0;
      const wRatio = weightedMax > 0 ? weightedEarned / weightedMax : 0;
      scoreIndex = Math.round(cfg.minIndex + wRatio * (cfg.maxIndex - cfg.minIndex));
    } else {
      const ratio = maxScore > minScore ? (rawScore - minScore) / (maxScore - minScore) : 0;
      pct = Math.round(ratio * 100);
      scoreIndex = Math.round(cfg.minIndex + ratio * (cfg.maxIndex - cfg.minIndex));
    }

    const level = cfg.levels.find((lvl) => pct >= lvl.minPct) || cfg.levels[cfg.levels.length - 1];
    const dimensions = buildDimensionsResult(cfg, dimStats, null);
    const activeDims = dimensions.filter((d) => d.count > 0);
    const sortedByPctDesc = activeDims.slice().sort((a, b) => b.pct - a.pct);
    const topStrength = sortedByPctDesc[0];
    const growthArea = sortedByPctDesc[sortedByPctDesc.length - 1];
    const archetype =
      cfg.testType === "personality" && typeof DATA.getPersonalityArchetype === "function"
        ? DATA.getPersonalityArchetype(dimensions)
        : null;

    return {
      test,
      testType: cfg.testType,
      cfg,
      timestamp: timestampIso || new Date().toISOString(),
      timeSpentSeconds,
      mode,
      rawScore,
      minScore,
      maxScore,
      pct,
      scoreIndex,
      eqIndex: scoreIndex,
      level,
      archetype,
      dimensions,
      topStrength,
      growthArea,
      questionDetails,
      answers: { ...answersMap },
      isShared: false
    };
  }

  function finalizeQuiz() {
    stopTimer();
    closeModal("submit-confirm-modal");

    const result = evaluateSubmission(
      state.currentTest,
      state.answers,
      state.elapsedSeconds,
      state.mode,
      new Date().toISOString()
    );

    const dimPcts = {};
    result.dimensions.forEach((d) => {
      dimPcts[d.id] = d.pct;
    });

    const record = {
      id: `res_${Date.now()}`,
      testId: result.test.id,
      testType: result.testType,
      testTitle: result.test.shortTitle || result.test.title,
      timestamp: result.timestamp,
      timeSpentSeconds: result.timeSpentSeconds,
      mode: result.mode,
      rawScore: result.rawScore,
      maxScore: result.maxScore,
      pct: result.pct,
      scoreIndex: result.scoreIndex,
      eqIndex: result.scoreIndex,
      levelId: result.level.id,
      archetypeName: result.archetype ? result.archetype.name : undefined,
      answers: result.answers,
      dimPcts
    };

    state.history.unshift(record);
    saveHistory();
    updateUserStats();
    renderTestsGrid();

    state.currentResult = result;
    state.reviewFilter = "all";
    renderResultView(result);
    switchView("result");
  }

  // ==================== SHAREABLE URL ENCODING ====================
  function encodeSharePayload(obj) {
    const json = JSON.stringify(obj);
    const utf8 = unescape(encodeURIComponent(json));
    return btoa(utf8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodeSharePayload(token) {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "===".slice((b64.length + 3) % 4);
    const utf8 = atob(padded);
    const json = decodeURIComponent(escape(utf8));
    return JSON.parse(json);
  }

  function buildShareUrl(result) {
    const payload = {
      n: state.playerName || "Người bạn trên Compass",
      t: result.test.id,
      s: result.scoreIndex,
      r: result.rawScore,
      m: result.maxScore,
      p: result.pct,
      d: result.dimensions.map((dim) => dim.pct),
      ts: result.timestamp,
      sec: result.timeSpentSeconds
    };
    const token = encodeSharePayload(payload);
    const base =
      window.location && window.location.protocol && window.location.protocol.startsWith("http")
        ? `${window.location.origin}${window.location.pathname}`
        : window.location
          ? window.location.href.split("?")[0]
          : "";
    return `${base}?share=${token}`;
  }

  function copyShareLink() {
    const r = state.currentResult;
    if (!r) return;
    const url = buildShareUrl(r);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => showToast("Đã sao chép Link chia sẻ kết quả! Ai mở link cũng xem được."))
        .catch(() => showToast("Không thể tự sao chép link. Vui lòng thử Tải thẻ PNG."));
    } else {
      showToast("Trình duyệt không hỗ trợ sao chép tự động.");
    }
  }

  function tryOpenSharedFromUrl() {
    try {
      const search = window.location ? window.location.search : "";
      if (!search) return false;
      const params = new URLSearchParams(search);
      const token = params.get("share");
      if (!token) return false;

      const payload = decodeSharePayload(token);
      const test = DATA.TESTS.find((t) => t.id === payload.t);
      if (!test) return false;

      const cfg = getTestConfig(test);
      const pct = Number(payload.p) || 0;
      const scoreIndex = Number(payload.s) || cfg.minIndex;
      const level = cfg.levels.find((lvl) => pct >= lvl.minPct) || cfg.levels[cfg.levels.length - 1];
      const dimensions = buildDimensionsResult(cfg, null, payload.d || []);
      const sorted = dimensions.slice().sort((a, b) => b.pct - a.pct);
      const archetype =
        cfg.testType === "personality" && typeof DATA.getPersonalityArchetype === "function"
          ? DATA.getPersonalityArchetype(dimensions)
          : null;

      const sharedResult = {
        test,
        testType: cfg.testType,
        cfg,
        timestamp: payload.ts || new Date().toISOString(),
        timeSpentSeconds: Number(payload.sec) || 0,
        mode: "standard",
        rawScore: Number(payload.r) || 0,
        minScore: cfg.testType === "iq" ? 0 : test.questions.length,
        maxScore: Number(payload.m) || test.questions.length,
        pct,
        scoreIndex,
        eqIndex: scoreIndex,
        level,
        archetype,
        dimensions,
        topStrength: sorted[0],
        growthArea: sorted[sorted.length - 1],
        questionDetails: [],
        answers: {},
        isShared: true,
        sharedBy: payload.n || "Bạn bè"
      };

      state.currentResult = sharedResult;
      renderResultView(sharedResult);
      switchView("result");
      return true;
    } catch (_err) {
      return false;
    }
  }

  function clearShareQueryParam() {
    if (window.history && window.history.replaceState && window.location && window.location.search.includes("share=")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  // ==================== RESULT VIEW & RADAR CHART ====================
  function drawRadarChart(dimensions) {
    const canvas = els.eqRadarCanvas;
    if (!canvas || !canvas.getContext) return;

    const cssWidth = 440;
    const cssHeight = 360;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const isDark = state.theme === "dark";
    const gridColor = isDark ? "rgba(148, 163, 184, 0.22)" : "rgba(100, 116, 139, 0.22)";
    const axisColor = isDark ? "rgba(148, 163, 184, 0.35)" : "rgba(100, 116, 139, 0.3)";
    const labelColor = isDark ? "#e2e8f0" : "#1e293b";
    const subLabelColor = isDark ? "#94a3b8" : "#64748b";

    const cx = cssWidth / 2;
    const cy = cssHeight / 2 + 10;
    const radius = 114;
    const count = dimensions.length;
    const startAngle = -Math.PI / 2;

    function getPoint(index, ratioVal) {
      const angle = startAngle + (index * 2 * Math.PI) / count;
      return {
        x: cx + Math.cos(angle) * radius * ratioVal,
        y: cy + Math.sin(angle) * radius * ratioVal,
        angle
      };
    }

    [0.2, 0.4, 0.6, 0.8, 1.0].forEach((r) => {
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const pt = getPoint(i, r);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = subLabelColor;
      ctx.font = "600 10px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.round(r * 100)}%`, cx + 16, cy - radius * r + 4);
    });

    for (let i = 0; i < count; i++) {
      const outer = getPoint(i, 1);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(outer.x, outer.y);
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const pt = getPoint(i, 0.75);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    dimensions.forEach((dim, i) => {
      const valRatio = Math.max(0.08, dim.pct / 100);
      const pt = getPoint(i, valRatio);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fillStyle = isDark ? "rgba(99, 102, 241, 0.34)" : "rgba(79, 70, 229, 0.25)";
    ctx.fill();
    ctx.strokeStyle = isDark ? "#818cf8" : "#4f46e5";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    dimensions.forEach((dim, i) => {
      const valRatio = Math.max(0.08, dim.pct / 100);
      const pt = getPoint(i, valRatio);

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = dim.meta.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isDark ? "#111827" : "#ffffff";
      ctx.stroke();

      const lblPt = getPoint(i, 1.24);
      ctx.fillStyle = labelColor;
      ctx.font = "700 12px 'Be Vietnam Pro', sans-serif";
      const cos = Math.cos(lblPt.angle);
      if (Math.abs(cos) < 0.2) ctx.textAlign = "center";
      else if (cos > 0) ctx.textAlign = "left";
      else ctx.textAlign = "right";

      const yOffset = i === 0 ? -8 : 2;
      ctx.fillText(`${dim.meta.icon} ${dim.meta.shortName}`, lblPt.x, lblPt.y + yOffset);
      ctx.fillStyle = dim.meta.color;
      ctx.font = "800 11.5px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`${dim.pct}%`, lblPt.x, lblPt.y + yOffset + 15);
    });
  }

  function renderReviewList(result) {
    const isIq = result.testType === "iq";
    const isPers = result.testType === "personality";
    const filtered = result.questionDetails.filter((item) => {
      if (state.reviewFilter === "optimal") return isIq ? item.isCorrect : item.earned === 4;
      if (state.reviewFilter === "improve") return isIq ? !item.isCorrect : item.earned < 4;
      return true;
    });

    els.reviewList.innerHTML = "";
    if (filtered.length === 0) {
      els.reviewList.innerHTML = `
        <div class="empty-state">
          <p>Không có câu hỏi nào thuộc nhóm lọc này.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((item) => {
      const q = item.question;
      const dim = result.cfg.dimensionsMap[q.dimension];
      const card = document.createElement("article");
      card.className = "review-card";

      let scoreBadgeText = "";
      let scoreBadgeCls = "";
      let userLabelText = "";
      if (isIq) {
        scoreBadgeText = item.isCorrect ? "✓ Đúng (+1)" : "✕ Chưa đúng";
        scoreBadgeCls = item.isCorrect ? "score-4" : "score-1";
        userLabelText = item.isCorrect ? "Chính xác" : "Chưa đúng";
      } else {
        const meta = getScaleScoreLabel(item.earned, result.testType);
        scoreBadgeText = `${item.earned}/4 điểm`;
        scoreBadgeCls = meta.cls;
        userLabelText = meta.label;
      }

      const chosenText = item.chosenOption
        ? `${LETTERS[item.chosenIdx]}. ${item.chosenOption.text}`
        : isIq
          ? "Bạn chưa chọn đáp án cho câu này (0 điểm)."
          : "Bạn chưa chọn đáp án cho câu này (tính 1 điểm tối thiểu).";
      const chosenFeedback = item.chosenOption
        ? item.chosenOption.feedback
        : "Hãy hoàn thành đầy đủ các câu để kết quả đánh giá sát thực tế nhất.";

      const needShowOptimal = isIq ? !item.isCorrect : (!isPers && item.earned < 4);
      const optimalHeader = isIq ? "✅ Đáp án chính xác" : "✅ Cách ứng xử tối ưu nhất";
      const optimalRight = isIq ? "Đúng" : "4/4 điểm";

      const optimalBlock = needShowOptimal
        ? `
          <div class="review-answer-box optimal-choice">
            <div class="review-box-label">
              <span>${optimalHeader}</span>
              <span>${optimalRight}</span>
            </div>
            <div>${escapeHtml(LETTERS[item.optimalIdx] + ". " + item.optimalOption.text)}</div>
          </div>
        `
        : "";

      const visualBlock = q.svgDiagram ? `<div class="review-visual">${q.svgDiagram}</div>` : "";
      const insightPrefix = isIq
        ? "📐 Lời giải chi tiết:"
        : isPers
          ? "🎭 Phân tích tính cách:"
          : "💡 Góc nhìn tâm lý học:";

      card.innerHTML = `
        <div class="review-card-top">
          <div class="question-badges">
            <span class="q-index-badge">Câu ${item.index + 1}</span>
            <span class="q-context-badge">${escapeHtml(q.context)}</span>
            <span class="q-dim-badge">${dim.icon} ${escapeHtml(dim.shortName)}</span>
          </div>
          <span class="feedback-score-pill ${scoreBadgeCls}">${scoreBadgeText}</span>
        </div>
        <h4 class="review-q-title">${escapeHtml(q.question)}</h4>
        ${visualBlock}
        <div class="review-answer-box user-choice">
          <div class="review-box-label">
            <span>Lựa chọn của bạn</span>
            <span>${escapeHtml(userLabelText)}</span>
          </div>
          <div>${escapeHtml(chosenText)}</div>
          <p class="review-feedback-note">${escapeHtml(chosenFeedback)}</p>
        </div>
        ${optimalBlock}
        <div class="review-insight">
          <strong>${insightPrefix}</strong> ${escapeHtml(q.explanation)}
        </div>
      `;
      els.reviewList.appendChild(card);
    });
  }

  function renderResultView(result) {
    const isIq = result.testType === "iq";
    const isPers = result.testType === "personality";
    const cfg = result.cfg;

    // Shared link banner
    if (result.isShared) {
      els.sharedResultBanner.classList.remove("hidden");
      els.sharedBannerText.textContent = `${result.sharedBy} đã đạt ${cfg.shortLabel} ${result.scoreIndex} (${result.pct}%) ở bộ đề "${result.test.shortTitle || result.test.title}".`;
    } else {
      els.sharedResultBanner.classList.add("hidden");
    }

    els.resultTestName.textContent = result.test.title;
    els.resultTimestamp.textContent = formatDateTime(result.timestamp);
    els.resultTimeSpent.textContent = `Thời gian: ${formatDuration(result.timeSpentSeconds)}`;

    els.eqRingLabel.textContent = cfg.indexLabel;
    els.eqRingSub.textContent = `Thang ${cfg.minIndex}–${cfg.maxIndex}`;
    els.resultEqIndex.textContent = String(result.scoreIndex);
    els.resultRawScore.textContent = isIq
      ? `${result.rawScore} / ${result.maxScore} câu đúng`
      : `${result.rawScore} / ${result.maxScore} điểm`;
    els.resultPctScore.textContent = isIq
      ? `${result.pct}% chính xác`
      : isPers
        ? `${result.pct}% hòa hợp`
        : `${result.pct}% tối ưu`;

    const ringDeg = Math.round((result.pct / 100) * 360);
    els.eqScoreRing.style.setProperty("--ring-deg", `${ringDeg}deg`);
    els.eqScoreRing.style.setProperty("--ring-color", result.level.color);

    els.resultLevelBadge.textContent = `${result.level.badge} • Phổ ${cfg.shortLabel} ${result.level.eqRange}`;
    els.resultLevelBadge.style.background = `${result.level.color}20`;
    els.resultLevelBadge.style.color = result.level.color;
    els.resultLevelTitle.textContent = result.level.title;
    els.resultLevelSummary.textContent = result.level.summary;
    els.resultLevelAdvice.textContent = result.level.advice;

    // Archetype box for Personality
    if (isPers && result.archetype) {
      els.archetypeBox.classList.remove("hidden");
      els.archetypeName.textContent = `🎭 Hình mẫu: ${result.archetype.name}`;
      els.archetypeMbti.textContent = `MBTI tương ứng: ${result.archetype.mbtiHint}`;
      els.archetypeSummary.textContent = result.archetype.summary;
      els.archetypeCareers.innerHTML =
        `<span style="font-size:0.78rem;font-weight:700;color:var(--text-muted);align-self:center;">💼 Nghề hợp:</span>` +
        result.archetype.careers.map((c) => `<span class="career-chip">${escapeHtml(c)}</span>`).join("");
    } else {
      els.archetypeBox.classList.add("hidden");
    }

    if (isIq) {
      els.spectrumLabelLow.textContent = "70 (Cần rèn luyện)";
      els.spectrumLabelMid.textContent = "108 (Chuẩn mực)";
      els.spectrumLabelHigh.textContent = "145 (Xuất sắc)";
    } else if (isPers) {
      els.spectrumLabelLow.textContent = "60 (Tự phát)";
      els.spectrumLabelMid.textContent = "103 (Cân bằng)";
      els.spectrumLabelHigh.textContent = "145 (Toàn diện)";
    } else {
      els.spectrumLabelLow.textContent = "55 (Cần rèn luyện)";
      els.spectrumLabelMid.textContent = "100 (Trung bình - Khá)";
      els.spectrumLabelHigh.textContent = "145 (Xuất sắc)";
    }

    const span = cfg.maxIndex - cfg.minIndex;
    const markerPct = Math.min(98, Math.max(2, ((result.scoreIndex - cfg.minIndex) / span) * 100));
    els.spectrumMarker.style.left = `${markerPct}%`;
    els.spectrumMarkerVal.textContent = String(result.scoreIndex);

    els.radarTitle.textContent = isIq
      ? "Biểu Đồ Radar 5 Năng Lực Nhận Thức IQ"
      : isPers
        ? "Biểu Đồ Radar 5 Trục Tính Cách OCEAN"
        : "Biểu Đồ Radar 5 Trụ Cột EQ";
    els.radarSubtitle.textContent = "So sánh hồ sơ của bạn với ngưỡng cân bằng chuẩn (75%)";
    els.radarUserLabel.textContent = isIq
      ? "Hồ sơ IQ"
      : isPers
        ? "Hồ sơ Tính cách"
        : "Hồ sơ EQ";

    drawRadarChart(result.dimensions);

    const scoreFmt = (d) =>
      result.isShared
        ? `${d.pct}%`
        : isIq
          ? `${d.pct}% (${d.score}/${d.max} câu đúng)`
          : `${d.pct}% (${d.score}/${d.max} điểm)`;

    const s = result.topStrength;
    els.strengthIcon.textContent = s.meta.icon;
    els.strengthName.textContent = s.meta.name;
    els.strengthScore.textContent = scoreFmt(s);
    els.strengthDesc.textContent = s.evaluation;

    const g = result.growthArea;
    els.growthIcon.textContent = g.meta.icon;
    els.growthName.textContent = g.meta.name;
    els.growthScore.textContent = scoreFmt(g);
    els.growthDesc.textContent = g.evaluation;

    els.dimensionsSectionTitle.textContent = isIq
      ? "Phân Tích Chi Tiết 5 Trụ Cột Tư Duy & Bài Tập Rèn Luyện"
      : isPers
        ? "Phân Tích Chi Tiết 5 Trục Tính Cách & Gợi Ý Phát Triển"
        : "Phân Tích Chi Tiết Từng Trụ Cột & Bài Tập Thực Hành";
    els.dimensionsSectionSubtitle.textContent = isIq
      ? "Đánh giá từng năng lực nhận thức kèm phương pháp rèn luyện não bộ"
      : isPers
        ? "Giải mã xu hướng hành vi và cách phát huy tối đa thế mạnh tự nhiên"
        : "Đánh giá sâu từng năng lực cảm xúc kèm hành động cải thiện thiết thực";

    els.dimensionsBreakdown.innerHTML = "";
    result.dimensions.forEach((dim) => {
      const card = document.createElement("div");
      card.className = "dim-item";
      const tipsHtml = dim.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join("");
      const rightStat = result.isShared
        ? `${dim.pct}%`
        : isIq
          ? `${dim.pct}% (${dim.score}/${dim.max} đúng)`
          : `${dim.pct}% (${dim.score}/${dim.max}đ)`;
      card.innerHTML = `
        <div class="dim-item-top">
          <div class="dim-title-group">
            <span class="dim-icon">${dim.meta.icon}</span>
            <h4>${escapeHtml(dim.meta.name)}</h4>
          </div>
          <div class="dim-score-meta">
            <span class="dim-tier-pill ${dim.tier}">${dim.tierLabel}</span>
            <span class="dim-pct">${rightStat}</span>
          </div>
        </div>
        <div class="dim-bar-track">
          <div class="dim-bar-fill" style="width: ${dim.pct}%; background: ${dim.meta.color};"></div>
        </div>
        <p class="dim-eval-text">${escapeHtml(dim.evaluation)}</p>
        <ul class="dim-tips">${tipsHtml}</ul>
      `;
      els.dimensionsBreakdown.appendChild(card);
    });

    if (result.isShared || result.questionDetails.length === 0) {
      els.reviewSection.classList.add("hidden");
    } else {
      els.reviewSection.classList.remove("hidden");
      els.reviewSectionTitle.textContent = isIq
        ? "Xem Lại Đáp Án & Lời Giải Từng Bước"
        : isPers
          ? "Xem Lại Lựa Chọn & Phân Tích Tính Cách Từng Câu"
          : "Xem Lại Đáp Án & Góc Nhìn Tâm Lý Từng Câu";
      els.reviewSectionSubtitle.textContent = isIq
        ? "Đối chiếu lựa chọn của bạn với đáp án chuẩn và công thức giải nhanh"
        : isPers
          ? "Chi tiết xu hướng phản hồi của bạn trong từng tình huống"
          : "Đối chiếu lựa chọn của bạn với cách ứng xử tối ưu (4/4 điểm)";
      els.reviewFilterOptimalBtn.textContent = isIq ? "Trả lời đúng (✓)" : isPers ? "Mức cao (4/4đ)" : "Tối ưu (4/4đ)";
      els.reviewFilterImproveBtn.textContent = isIq ? "Trả lời sai (✕)" : isPers ? "Mức khác (< 4đ)" : "Cần lưu ý (< 4đ)";

      Array.from(els.reviewFilters.querySelectorAll(".filter-pill")).forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.reviewFilter === state.reviewFilter);
      });
      renderReviewList(result);
    }
  }

  function downloadResultCardPng() {
    const r = state.currentResult;
    if (!r) return;

    const canvas = document.createElement("canvas");
    if (!canvas.getContext) {
      showToast("Trình duyệt không hỗ trợ xuất ảnh Canvas.");
      return;
    }

    const W = 1080;
    const H = 640;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, W, H);
    if (r.testType === "iq") {
      grad.addColorStop(0, "#0f172a");
      grad.addColorStop(0.55, "#1e1b4b");
      grad.addColorStop(1, "#0369a1");
    } else if (r.testType === "personality") {
      grad.addColorStop(0, "#2e1065");
      grad.addColorStop(0.55, "#4c1d95");
      grad.addColorStop(1, "#be185d");
    } else {
      grad.addColorStop(0, "#1e1b4b");
      grad.addColorStop(0.55, "#312e81");
      grad.addColorStop(1, "#0284c7");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(36, 34, W - 72, H - 68, 24);
    else ctx.rect(36, 34, W - 72, H - 68);
    ctx.fill();
    ctx.stroke();

    const ownerName = r.isShared ? r.sharedBy : state.playerName || "Hồ sơ cá nhân";
    ctx.fillStyle = "#e0e7ff";
    ctx.font = "700 20px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(`🧭 EQ & IQ COMPASS • ${ownerName.toUpperCase()}`, 72, 86);

    ctx.fillStyle = "rgba(226, 232, 240, 0.8)";
    ctx.font = "500 17px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(formatDateTime(r.timestamp), W - 72, 86);
    ctx.textAlign = "left";

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 30px 'Be Vietnam Pro', sans-serif";
    const titleShort = r.test.title.length > 52 ? r.test.title.slice(0, 50) + "…" : r.test.title;
    ctx.fillText(titleShort, 72, 138);

    const cx = 210;
    const cy = 345;
    const rad = 112;

    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 18;
    ctx.stroke();

    const endAng = -Math.PI / 2 + (Math.max(5, r.pct) / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, -Math.PI / 2, endAng);
    ctx.strokeStyle = r.level.color || "#10b981";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "700 17px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(r.cfg.indexLabel, cx, cy - 36);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 68px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(String(r.scoreIndex), cx, cy + 28);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 16px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(`${r.pct}% (${r.rawScore}/${r.maxScore})`, cx, cy + 62);
    ctx.textAlign = "left";

    const rx = 385;
    ctx.fillStyle = r.level.color || "#10b981";
    ctx.font = "800 20px 'Be Vietnam Pro', sans-serif";
    ctx.fillText(r.archetype ? `🎭 ${r.archetype.name} (${r.archetype.mbtiHint})` : r.level.badge, rx, 208);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 24px 'Be Vietnam Pro', sans-serif";
    const lvlTitle = r.level.title.length > 44 ? r.level.title.slice(0, 42) + "…" : r.level.title;
    ctx.fillText(lvlTitle, rx, 244);

    let by = 294;
    const barW = 585;
    r.dimensions.forEach((dim) => {
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "600 17px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`${dim.meta.icon} ${dim.meta.shortName}`, rx, by);

      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 17px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`${dim.pct}%`, rx + barW, by);
      ctx.textAlign = "left";

      by += 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(rx, by, barW, 12, 6);
      else ctx.rect(rx, by, barW, 12);
      ctx.fill();

      ctx.fillStyle = dim.meta.color;
      ctx.beginPath();
      const fillW = Math.max(12, (dim.pct / 100) * barW);
      if (ctx.roundRect) ctx.roundRect(rx, by, fillW, 12, 6);
      else ctx.rect(rx, by, fillW, 12);
      ctx.fill();

      by += 38;
    });

    ctx.fillStyle = "rgba(226, 232, 240, 0.72)";
    ctx.font = "500 15px 'Be Vietnam Pro', sans-serif";
    ctx.fillText("Làm bài miễn phí tại: tanbobao2k-tech.github.io/eq-test-app", 72, H - 56);

    if (typeof canvas.toDataURL === "function") {
      const link = document.createElement("a");
      link.download = `ket-qua-${r.test.id}.png`;
      link.href = canvas.toDataURL("image/png");
      if (typeof link.click === "function") link.click();
      showToast("Đã tạo và tải xuống thẻ kết quả PNG!");
    }
  }

  function copyResultSummary() {
    const r = state.currentResult;
    if (!r) return;

    const dimLines = r.dimensions
      .map((d) => `- ${d.meta.shortName}: ${d.pct}% (${d.tierLabel})`)
      .join("\n");

    const unit = r.testType === "iq" ? "câu đúng" : "điểm";
    const lines = [
      `🧭 KẾT QUẢ ${r.cfg.shortLabel} — ${r.test.title}`,
      `• Chỉ số ${r.cfg.shortLabel}: ${r.scoreIndex} (Thang ${r.cfg.minIndex}–${r.cfg.maxIndex}) | Kết quả: ${r.rawScore}/${r.maxScore} ${unit} (${r.pct}%)`,
      `• Xếp loại: ${r.level.badge} — ${r.level.title}`
    ];
    if (r.archetype) {
      lines.push(`• Hình mẫu: ${r.archetype.name} (${r.archetype.mbtiHint})`);
    }
    lines.push(
      `• Điểm mạnh nổi bật: ${r.topStrength.meta.name} (${r.topStrength.pct}%)`,
      `• Cần chú ý: ${r.growthArea.meta.name} (${r.growthArea.pct}%)`,
      ``,
      `📊 Chi tiết 5 trụ cột:`,
      dimLines
    );

    const summary = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(summary)
        .then(() => showToast("Đã sao chép tóm tắt kết quả vào clipboard!"))
        .catch(() => showToast("Không thể truy cập clipboard tự động."));
    } else {
      showToast("Trình duyệt không hỗ trợ sao chép tự động.");
    }
  }

  // ==================== LEADERBOARD, HISTORY & GUIDE MODALS ====================
  function renderLeaderboardModal() {
    if (els.playerNameInput) {
      els.playerNameInput.value = state.playerName;
    }

    const userName = state.playerName || "Bạn (Chưa đặt tên)";
    const userBestByType = {};
    ["eq", "iq", "personality"].forEach((tType) => {
      const items = state.history.filter((h) => getHistoryItemType(h) === tType);
      if (items.length > 0) {
        const best = items.reduce(
          (b, c) => (getHistoryScoreIndex(c) > getHistoryScoreIndex(b) ? c : b),
          items[0]
        );
        userBestByType[tType] = {
          name: userName,
          type: tType,
          score: getHistoryScoreIndex(best),
          label: `${best.testTitle} (${best.pct}%)`,
          isUser: true
        };
      }
    });

    const combined = COMMUNITY_BENCHMARKS.map((b) => ({ ...b, isUser: false }));
    Object.values(userBestByType).forEach((u) => combined.push(u));

    const filtered = combined
      .filter((entry) => state.leaderboardFilter === "all" || entry.type === state.leaderboardFilter)
      .sort((a, b) => b.score - a.score);

    els.leaderboardList.innerHTML = "";
    filtered.forEach((entry, idx) => {
      const rank = idx + 1;
      const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;
      const typeTag = entry.type === "iq" ? "IQ" : entry.type === "personality" ? "OCEAN" : "EQ";
      const row = document.createElement("div");
      row.className = `leaderboard-row ${entry.isUser ? "is-user" : ""}`;
      row.innerHTML = `
        <div class="lb-left">
          <span class="lb-rank">${medal}</span>
          <div>
            <div class="lb-name">${escapeHtml(entry.name)} ${entry.isUser ? "(Bạn)" : ""}</div>
            <div class="lb-sub">${escapeHtml(entry.label)}</div>
          </div>
        </div>
        <div class="lb-right">
          <span class="badge-type-pill ${entry.type}">${typeTag}</span>
          <strong class="lb-score">${entry.score}</strong>
        </div>
      `;
      els.leaderboardList.appendChild(row);
    });
  }

  function renderHistoryModal() {
    els.historyList.innerHTML = "";
    els.btnClearHistory.classList.toggle("hidden", state.history.length === 0);

    if (state.history.length === 0) {
      els.historyList.innerHTML = `
        <div class="empty-state">
          <div class="empty-emoji">📭</div>
          <h4>Bạn chưa có bài làm nào được lưu</h4>
          <p>Hãy chọn một bộ đề EQ, IQ hoặc Tính cách trên trang chủ để bắt đầu.</p>
        </div>
      `;
      return;
    }

    state.history.forEach((item) => {
      const tType = getHistoryItemType(item);
      const levels =
        tType === "iq"
          ? DATA.IQ_LEVELS
          : tType === "personality"
            ? DATA.PERSONALITY_LEVELS
            : DATA.EQ_LEVELS;
      const level = levels.find((l) => l.id === item.levelId) || levels[2];
      const idxScore = getHistoryScoreIndex(item);
      const unitLabel = tType === "iq" ? "câu" : "đ";
      const badgeLabel = tType === "personality" ? "OCEAN" : tType.toUpperCase();

      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `
        <div>
          <h4 class="history-item-title">
            <span class="badge-type-pill ${tType}">${badgeLabel}</span>
            ${escapeHtml(item.testTitle)}
          </h4>
          <div class="history-item-meta">
            ${formatDateTime(item.timestamp)} • Thời gian ${formatDuration(item.timeSpentSeconds)} • ${item.rawScore}/${item.maxScore} ${unitLabel} (${item.pct}%)
          </div>
        </div>
        <div class="history-item-right">
          <span class="history-eq-badge" style="color: ${level.color}; background: ${level.color}20;">
            ${badgeLabel} ${idxScore}
          </span>
          <button type="button" class="btn btn-secondary btn-sm" data-view-history="${escapeHtml(item.id)}">
            Xem đánh giá
          </button>
        </div>
      `;
      els.historyList.appendChild(row);
    });
  }

  function openHistoryRecord(recordId) {
    const rec = state.history.find((h) => h.id === recordId);
    if (!rec) return;
    const test = DATA.TESTS.find((t) => t.id === rec.testId);
    if (!test) {
      showToast("Không tìm thấy dữ liệu bộ đề cho bản ghi này.");
      return;
    }

    const reconstructed = evaluateSubmission(
      test,
      rec.answers || {},
      rec.timeSpentSeconds || 0,
      rec.mode || "standard",
      rec.timestamp
    );

    clearShareQueryParam();
    state.currentResult = reconstructed;
    state.reviewFilter = "all";
    closeModal("history-modal");
    renderResultView(reconstructed);
    switchView("result");
  }

  function renderGuideModal() {
    const renderCards = (order, map) =>
      order
        .map((id) => {
          const dim = map[id];
          return `
            <div class="guide-pillar-card" style="border-left: 4px solid ${dim.color}">
              <h4>${dim.icon} ${escapeHtml(dim.name)}</h4>
              <p>${escapeHtml(dim.description)}</p>
            </div>
          `;
        })
        .join("");

    els.guideModalContent.innerHTML = `
      <div class="guide-section-title">🧭 5 Trụ cột Trí tuệ Cảm xúc (EQ — Phổ 55–145)</div>
      ${renderCards(EQ_DIMENSION_ORDER, DATA.DIMENSIONS)}
      <div class="guide-section-title" style="margin-top:16px">🧠 5 Trụ cột Tư duy Nhận thức (IQ — Phổ 70–145)</div>
      ${renderCards(IQ_DIMENSION_ORDER, DATA.IQ_DIMENSIONS)}
      <div class="guide-section-title" style="margin-top:16px">🎭 5 Trục Tính Cách Quốc Tế Big Five OCEAN (Phổ 60–145)</div>
      ${renderCards(PERSONALITY_DIMENSION_ORDER, DATA.PERSONALITY_DIMENSIONS)}
    `;
  }

  // ==================== EVENT LISTENERS ====================
  function bindEvents() {
    els.navHomeBtn.addEventListener("click", () => {
      if (state.view === "quiz") requestExitQuiz();
      else {
        clearShareQueryParam();
        switchView("home");
      }
    });

    els.btnNavTests.addEventListener("click", () => {
      if (state.view === "quiz") requestExitQuiz();
      else {
        clearShareQueryParam();
        switchView("home");
      }
    });

    els.btnToggleTheme.addEventListener("click", toggleTheme);

    els.btnOpenLeaderboard.addEventListener("click", () => {
      renderLeaderboardModal();
      openModal("leaderboard-modal");
    });

    els.btnOpenHistory.addEventListener("click", () => {
      renderHistoryModal();
      openModal("history-modal");
    });

    els.btnOpenGuide.addEventListener("click", () => {
      renderGuideModal();
      openModal("guide-modal");
    });

    els.btnQuickStart.addEventListener("click", () => startTest("goleman-comprehensive"));
    els.btnQuickStartIq.addEventListener("click", () => startTest("iq-comprehensive"));
    els.btnQuickStartPersonality.addEventListener("click", () => startTest("ocean-bigfive"));
    els.btnStart5Min.addEventListener("click", () => {
      if (state.activeDomain === "iq") startTest("iq-quick-brain");
      else if (state.activeDomain === "personality") startTest("career-compass");
      else startTest("quick-daily");
    });

    [els.modeStandardBtn, els.modePracticeBtn].forEach((btn) => {
      btn.addEventListener("click", () => {
        state.mode = btn.dataset.mode;
        els.modeStandardBtn.classList.toggle("active", state.mode === "standard");
        els.modePracticeBtn.classList.toggle("active", state.mode === "practice");
        els.modeHint.textContent =
          state.mode === "practice"
            ? "Sau khi chọn đáp án mỗi câu, bạn sẽ xem được ngay kết quả và lời giải chi tiết."
            : "Làm liền mạch toàn bộ đề, chấm điểm và phân tích tổng thể ở cuối bài.";
      });
    });

    els.toggleTimerLimit.addEventListener("change", (e) => {
      state.timerEnabled = Boolean(e.target.checked);
    });

    els.domainTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".domain-tab");
      if (!tab) return;
      state.activeDomain = tab.dataset.domain;
      state.activeCategory = "all";
      Array.from(els.domainTabs.querySelectorAll(".domain-tab")).forEach((t) => {
        t.classList.toggle("active", t === tab);
      });
      Array.from(els.categoryFilters.querySelectorAll(".filter-pill")).forEach((p) => {
        p.classList.toggle("active", p.dataset.category === "all");
      });
      renderTestsGrid();
    });

    els.categoryFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      state.activeCategory = btn.dataset.category;
      Array.from(els.categoryFilters.querySelectorAll(".filter-pill")).forEach((p) => {
        p.classList.toggle("active", p === btn);
      });
      renderTestsGrid();
    });

    els.testSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderTestsGrid();
    });

    els.btnResetFilters.addEventListener("click", () => {
      state.activeDomain = "all";
      state.activeCategory = "all";
      state.searchQuery = "";
      els.testSearchInput.value = "";
      Array.from(els.domainTabs.querySelectorAll(".domain-tab")).forEach((t) => {
        t.classList.toggle("active", t.dataset.domain === "all");
      });
      Array.from(els.categoryFilters.querySelectorAll(".filter-pill")).forEach((p) => {
        p.classList.toggle("active", p.dataset.category === "all");
      });
      renderTestsGrid();
    });

    els.testsGrid.addEventListener("click", (e) => {
      const startBtn = e.target.closest("[data-start-test]");
      if (!startBtn) return;
      clearShareQueryParam();
      startTest(startBtn.dataset.startTest);
    });

    // Quiz actions
    els.btnExitQuiz.addEventListener("click", requestExitQuiz);
    els.btnFlagQuestion.addEventListener("click", toggleFlagCurrent);

    els.btnPrevQuestion.addEventListener("click", () => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        renderQuizQuestion();
        renderPalette();
      }
    });

    els.btnNextQuestion.addEventListener("click", () => {
      if (state.currentTest && state.currentIndex < state.currentTest.questions.length - 1) {
        state.currentIndex += 1;
        renderQuizQuestion();
        renderPalette();
      }
    });

    els.btnSubmitInline.addEventListener("click", requestSubmitQuiz);
    els.btnSubmitQuiz.addEventListener("click", requestSubmitQuiz);

    // Modals close buttons
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
    });

    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.classList.add("hidden");
      });
    });

    els.btnForceSubmit.addEventListener("click", finalizeQuiz);
    els.btnConfirmExit.addEventListener("click", () => {
      closeModal("exit-confirm-modal");
      stopTimer();
      switchView("home");
    });

    els.historyList.addEventListener("click", (e) => {
      const viewBtn = e.target.closest("[data-view-history]");
      if (!viewBtn) return;
      openHistoryRecord(viewBtn.dataset.viewHistory);
    });

    els.btnClearHistory.addEventListener("click", () => {
      state.history = [];
      saveHistory();
      updateUserStats();
      renderTestsGrid();
      renderHistoryModal();
      showToast("Đã xóa toàn bộ lịch sử làm bài.");
    });

    // Leaderboard events
    els.btnSavePlayerName.addEventListener("click", () => {
      savePlayerName(els.playerNameInput.value);
      renderLeaderboardModal();
      showToast("Đã lưu tên hiển thị của bạn trên Bảng xếp hạng!");
    });

    els.leaderboardFilters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lb-filter]");
      if (!btn) return;
      state.leaderboardFilter = btn.dataset.lbFilter;
      Array.from(els.leaderboardFilters.querySelectorAll(".filter-pill")).forEach((p) => {
        p.classList.toggle("active", p === btn);
      });
      renderLeaderboardModal();
    });

    // Result actions
    els.btnTrySharedTest.addEventListener("click", () => {
      if (state.currentResult) {
        const tid = state.currentResult.test.id;
        clearShareQueryParam();
        startTest(tid);
      }
    });
    els.btnShareLink.addEventListener("click", copyShareLink);
    els.btnDownloadCard.addEventListener("click", downloadResultCardPng);
    els.btnCopyResult.addEventListener("click", copyResultSummary);
    els.btnPrintResult.addEventListener("click", () => window.print());
    els.btnRetakeTest.addEventListener("click", () => {
      if (state.currentResult) {
        clearShareQueryParam();
        startTest(state.currentResult.test.id);
      }
    });
    els.btnBackToHub.addEventListener("click", () => {
      clearShareQueryParam();
      switchView("home");
    });

    els.reviewFilters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-review-filter]");
      if (!btn || !state.currentResult) return;
      state.reviewFilter = btn.dataset.reviewFilter;
      Array.from(els.reviewFilters.querySelectorAll(".filter-pill")).forEach((p) => {
        p.classList.toggle("active", p === btn);
      });
      renderReviewList(state.currentResult);
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal("submit-confirm-modal");
        closeModal("exit-confirm-modal");
        closeModal("history-modal");
        closeModal("leaderboard-modal");
        closeModal("guide-modal");
        return;
      }

      if (state.view !== "quiz" || !state.currentTest || isAnyModalOpen()) return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

      const key = e.key.toLowerCase();
      if (["1", "2", "3", "4"].includes(key)) {
        selectOption(Number(key) - 1);
      } else if (["a", "b", "c", "d"].includes(key)) {
        selectOption(["a", "b", "c", "d"].indexOf(key));
      } else if (e.key === "ArrowLeft" && state.currentIndex > 0) {
        e.preventDefault();
        state.currentIndex -= 1;
        renderQuizQuestion();
        renderPalette();
      } else if (
        e.key === "ArrowRight" &&
        state.currentIndex < state.currentTest.questions.length - 1
      ) {
        e.preventDefault();
        state.currentIndex += 1;
        renderQuizQuestion();
        renderPalette();
      }
    });
  }

  // ==================== INIT ====================
  function init() {
    loadTheme();
    loadPlayerName();
    loadHistory();
    syncDomainCounts();
    updateUserStats();
    renderTestsGrid();
    bindEvents();
    tryOpenSharedFromUrl();
  }

  init();
})();
