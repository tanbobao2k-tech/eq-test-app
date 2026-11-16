(function () {
  "use strict";

  const DATA = window.EQ_DATA;
  if (!DATA) {
    throw new Error("EQ_DATA is not loaded.");
  }

  const STORAGE_KEYS = {
    HISTORY: "eq_test_history_v1",
    THEME: "eq_compass_theme_v1"
  };

  const DIMENSION_ORDER = [
    "self_awareness",
    "self_regulation",
    "motivation",
    "empathy",
    "social_skills"
  ];

  const LETTERS = ["A", "B", "C", "D"];

  const state = {
    view: "home",
    mode: "standard",
    timerEnabled: true,
    activeCategory: "all",
    searchQuery: "",
    theme: "light",
    history: [],

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
    btnOpenHistory: document.getElementById("btn-open-history"),
    btnOpenGuide: document.getElementById("btn-open-guide"),
    btnToggleTheme: document.getElementById("btn-toggle-theme"),
    themeIcon: document.getElementById("theme-icon"),
    historyCountBadge: document.getElementById("history-count-badge"),

    btnQuickStart: document.getElementById("btn-quick-start"),
    btnStart5Min: document.getElementById("btn-start-5min"),
    statCompletedCount: document.getElementById("stat-completed-count"),
    statAvgEq: document.getElementById("stat-avg-eq"),
    statLatestRank: document.getElementById("stat-latest-rank"),
    statTopDim: document.getElementById("stat-top-dim"),

    modeStandardBtn: document.getElementById("mode-standard-btn"),
    modePracticeBtn: document.getElementById("mode-practice-btn"),
    modeHint: document.getElementById("mode-hint"),
    toggleTimerLimit: document.getElementById("toggle-timer-limit"),

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
    optionsList: document.getElementById("options-list"),

    practiceFeedback: document.getElementById("practice-feedback"),
    feedbackScorePill: document.getElementById("feedback-score-pill"),
    feedbackVerdict: document.getElementById("feedback-verdict"),
    feedbackPersonal: document.getElementById("feedback-personal"),
    feedbackExplanation: document.getElementById("feedback-explanation"),

    btnPrevQuestion: document.getElementById("btn-prev-question"),
    btnNextQuestion: document.getElementById("btn-next-question"),
    btnSubmitInline: document.getElementById("btn-submit-inline"),

    paletteCounter: document.getElementById("palette-counter"),
    paletteGrid: document.getElementById("palette-grid"),
    btnSubmitQuiz: document.getElementById("btn-submit-quiz"),

    // Result
    resultTestName: document.getElementById("result-test-name"),
    resultTimestamp: document.getElementById("result-timestamp"),
    resultTimeSpent: document.getElementById("result-time-spent"),
    btnCopyResult: document.getElementById("btn-copy-result"),
    btnPrintResult: document.getElementById("btn-print-result"),
    btnRetakeTest: document.getElementById("btn-retake-test"),
    btnBackToHub: document.getElementById("btn-back-to-hub"),

    eqScoreRing: document.getElementById("eq-score-ring"),
    resultEqIndex: document.getElementById("result-eq-index"),
    resultRawScore: document.getElementById("result-raw-score"),
    resultPctScore: document.getElementById("result-pct-score"),
    resultLevelBadge: document.getElementById("result-level-badge"),
    resultLevelTitle: document.getElementById("result-level-title"),
    resultLevelSummary: document.getElementById("result-level-summary"),
    resultLevelAdvice: document.getElementById("result-level-advice"),
    spectrumMarker: document.getElementById("spectrum-marker"),
    spectrumMarkerVal: document.getElementById("spectrum-marker-val"),

    eqRadarCanvas: document.getElementById("eq-radar-canvas"),
    strengthIcon: document.getElementById("strength-icon"),
    strengthName: document.getElementById("strength-name"),
    strengthScore: document.getElementById("strength-score"),
    strengthDesc: document.getElementById("strength-desc"),
    growthIcon: document.getElementById("growth-icon"),
    growthName: document.getElementById("growth-name"),
    growthScore: document.getElementById("growth-score"),
    growthDesc: document.getElementById("growth-desc"),

    dimensionsBreakdown: document.getElementById("dimensions-breakdown"),
    reviewFilters: document.getElementById("review-filters"),
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

    guideModal: document.getElementById("guide-modal"),
    guideModalContent: document.getElementById("guide-modal-content"),

    toast: document.getElementById("app-toast")
  };

  // ==================== HELPERS ====================
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
    if (state.toastTimer) {
      clearTimeout(state.toastTimer);
    }
    els.toast.textContent = message;
    els.toast.classList.remove("hidden");
    state.toastTimer = setTimeout(() => {
      els.toast.classList.add("hidden");
    }, 2800);
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
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history.slice(0, 50)));
    } catch (_err) {
      // Ignore storage quota issues safely
    }
  }

  function loadTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === "dark" || saved === "light") {
        state.theme = saved;
      }
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
    if (el) {
      el.classList.remove("hidden");
    }
  }

  function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
      el.classList.add("hidden");
    }
  }

  function isAnyModalOpen() {
    return (
      !els.submitConfirmModal.classList.contains("hidden") ||
      !els.exitConfirmModal.classList.contains("hidden") ||
      !els.historyModal.classList.contains("hidden") ||
      !els.guideModal.classList.contains("hidden")
    );
  }

  // ==================== HOME VIEW RENDERING ====================
  function updateUserStats() {
    els.historyCountBadge.textContent = String(state.history.length);
    els.statCompletedCount.textContent = String(state.history.length);

    if (state.history.length === 0) {
      els.statAvgEq.textContent = "--";
      els.statLatestRank.textContent = "Chưa có dữ liệu";
      els.statTopDim.textContent = "Chưa có dữ liệu";
      return;
    }

    const totalEq = state.history.reduce((sum, item) => sum + (item.eqIndex || 0), 0);
    const avgEq = Math.round(totalEq / state.history.length);
    els.statAvgEq.textContent = String(avgEq);

    const latest = state.history[0];
    const latestLevel = DATA.EQ_LEVELS.find((lvl) => lvl.id === latest.levelId) || DATA.EQ_LEVELS[2];
    els.statLatestRank.textContent = `${latestLevel.badge} (EQ ${latest.eqIndex})`;

    // Aggregate average dimension pct across history
    const dimTotals = {};
    const dimCounts = {};
    DIMENSION_ORDER.forEach((d) => {
      dimTotals[d] = 0;
      dimCounts[d] = 0;
    });

    state.history.forEach((item) => {
      if (!item.dimPcts) return;
      DIMENSION_ORDER.forEach((d) => {
        if (typeof item.dimPcts[d] === "number") {
          dimTotals[d] += item.dimPcts[d];
          dimCounts[d] += 1;
        }
      });
    });

    let bestDimId = null;
    let bestDimAvg = -1;
    DIMENSION_ORDER.forEach((d) => {
      if (dimCounts[d] > 0) {
        const avg = dimTotals[d] / dimCounts[d];
        if (avg > bestDimAvg) {
          bestDimAvg = avg;
          bestDimId = d;
        }
      }
    });

    if (bestDimId) {
      const dim = DATA.DIMENSIONS[bestDimId];
      els.statTopDim.textContent = `${dim.icon} ${dim.shortName} (${Math.round(bestDimAvg)}%)`;
    } else {
      els.statTopDim.textContent = "Chưa có dữ liệu";
    }
  }

  function getBestRecordForTest(testId) {
    const matches = state.history.filter((h) => h.testId === testId);
    if (matches.length === 0) return null;
    return matches.reduce((best, cur) => (cur.eqIndex > best.eqIndex ? cur : best), matches[0]);
  }

  function renderTestsGrid() {
    const query = state.searchQuery.trim().toLowerCase();
    const filtered = DATA.TESTS.filter((test) => {
      const matchCategory = state.activeCategory === "all" || test.category === state.activeCategory;
      if (!matchCategory) return false;
      if (!query) return true;
      const haystack = `${test.title} ${test.description} ${test.categoryLabel} ${test.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query);
    });

    els.testsGrid.innerHTML = "";
    els.testsEmptyState.classList.toggle("hidden", filtered.length > 0);

    filtered.forEach((test) => {
      const best = getBestRecordForTest(test.id);
      const card = document.createElement("article");
      card.className = "test-card";
      card.style.setProperty("--card-accent", test.accentColor);

      const bestBadgeHtml = best
        ? `<span class="badge-best">Kỷ lục: EQ ${best.eqIndex} (${best.pct}%)</span>`
        : "";

      const tagsHtml = test.tags.map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join("");

      card.innerHTML = `
        <div class="test-card-top">
          <div class="test-icon-wrap">${test.icon}</div>
          <div class="test-badges">
            <span class="badge-level">${escapeHtml(test.categoryLabel)} • ${escapeHtml(test.level)}</span>
            ${bestBadgeHtml}
          </div>
        </div>
        <h3 class="test-card-title">${escapeHtml(test.title)}</h3>
        <p class="test-card-desc">${escapeHtml(test.description)}</p>
        <div class="test-meta-row">
          <span>📝 ${test.questions.length} câu tình huống</span>
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

  function getOptionScoreLabel(score) {
    if (score === 4) return { label: "Phản ứng tối ưu (4/4đ)", cls: "score-4" };
    if (score === 3) return { label: "Ứng xử tích cực (3/4đ)", cls: "score-3" };
    if (score === 2) return { label: "Chưa thực sự hiệu quả (2/4đ)", cls: "score-2" };
    return { label: "Phản ứng cảm tính (1/4đ)", cls: "score-1" };
  }

  function renderQuizQuestion() {
    const test = state.currentTest;
    if (!test) return;

    const total = test.questions.length;
    const idx = state.currentIndex;
    const q = test.questions[idx];
    const dim = DATA.DIMENSIONS[q.dimension];
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

    // Render options
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
          btn.classList.add(`practice-score-${opt.score}`);
        }
      } else if (state.mode === "practice" && hasAnswered && opt.score === 4) {
        btn.classList.add("practice-score-4");
      }

      const showScoreTag =
        state.mode === "practice" && hasAnswered && (isSelected || opt.score === 4);
      const scoreTagHtml = showScoreTag
        ? `<span class="option-score-tag">${opt.score}/4đ</span>`
        : "";

      btn.innerHTML = `
        <span class="option-letter">${LETTERS[optIdx]}</span>
        <span class="option-text">${escapeHtml(opt.text)}</span>
        ${scoreTagHtml}
      `;

      btn.addEventListener("click", () => selectOption(optIdx));
      els.optionsList.appendChild(btn);
    });

    // Render instant feedback if practice mode & answered
    if (state.mode === "practice" && hasAnswered) {
      const chosen = q.options[selectedOptIdx];
      const meta = getOptionScoreLabel(chosen.score);
      els.practiceFeedback.classList.remove("hidden");
      els.feedbackScorePill.textContent = `${chosen.score}/4 điểm`;
      els.feedbackScorePill.className = `feedback-score-pill ${meta.cls}`;
      els.feedbackVerdict.textContent = meta.label;
      els.feedbackPersonal.textContent = chosen.feedback;
      els.feedbackExplanation.textContent = q.explanation;
    } else {
      els.practiceFeedback.classList.add("hidden");
    }

    // Navigation buttons
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
    if (state.flags.has(state.currentIndex)) {
      state.flags.delete(state.currentIndex);
    } else {
      state.flags.add(state.currentIndex);
    }
    renderQuizQuestion();
    renderPalette();
  }

  function requestSubmitQuiz() {
    const test = state.currentTest;
    if (!test) return;

    const missing = [];
    for (let i = 0; i < test.questions.length; i++) {
      if (state.answers[i] === undefined) {
        missing.push(i);
      }
    }

    if (missing.length === 0) {
      finalizeQuiz();
      return;
    }

    els.confirmMissingText.textContent = `Bạn còn ${missing.length} câu chưa chọn đáp án. Hãy bấm vào số câu bên dưới để hoàn thành, hoặc nộp bài luôn (câu bỏ trống được tính 1 điểm tối thiểu).`;
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
  function evaluateSubmission(test, answersMap, timeSpentSeconds, mode, timestampIso) {
    const totalQ = test.questions.length;
    const minScore = totalQ * 1;
    const maxScore = totalQ * 4;

    const dimStats = {};
    DIMENSION_ORDER.forEach((dimId) => {
      dimStats[dimId] = { score: 0, min: 0, max: 0, count: 0 };
    });

    let rawScore = 0;
    const questionDetails = test.questions.map((q, idx) => {
      const chosenIdx = answersMap[idx];
      const chosenOption = chosenIdx !== undefined ? q.options[chosenIdx] : null;
      const optimalIdx = q.options.findIndex((o) => o.score === 4);
      const optimalOption = q.options[optimalIdx];
      const earned = chosenOption ? chosenOption.score : 1;

      rawScore += earned;
      const dStat = dimStats[q.dimension];
      dStat.score += earned;
      dStat.min += 1;
      dStat.max += 4;
      dStat.count += 1;

      return {
        index: idx,
        question: q,
        chosenIdx,
        chosenOption,
        optimalIdx,
        optimalOption,
        earned
      };
    });

    const ratio = maxScore > minScore ? (rawScore - minScore) / (maxScore - minScore) : 0;
    const pct = Math.round(ratio * 100);
    const eqIndex = Math.round(55 + ratio * 90);
    const level = DATA.EQ_LEVELS.find((lvl) => pct >= lvl.minPct) || DATA.EQ_LEVELS[DATA.EQ_LEVELS.length - 1];

    const dimensions = DIMENSION_ORDER.map((dimId) => {
      const meta = DATA.DIMENSIONS[dimId];
      const stat = dimStats[dimId];
      const dimRatio = stat.max > stat.min ? (stat.score - stat.min) / (stat.max - stat.min) : 0;
      const dimPct = Math.round(dimRatio * 100);
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

    const activeDims = dimensions.filter((d) => d.count > 0);
    const sortedByPctDesc = activeDims.slice().sort((a, b) => b.pct - a.pct);
    const topStrength = sortedByPctDesc[0];
    const growthArea = sortedByPctDesc[sortedByPctDesc.length - 1];

    return {
      test,
      timestamp: timestampIso || new Date().toISOString(),
      timeSpentSeconds,
      mode,
      rawScore,
      minScore,
      maxScore,
      pct,
      eqIndex,
      level,
      dimensions,
      topStrength,
      growthArea,
      questionDetails,
      answers: { ...answersMap }
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
      testTitle: result.test.shortTitle || result.test.title,
      timestamp: result.timestamp,
      timeSpentSeconds: result.timeSpentSeconds,
      mode: result.mode,
      rawScore: result.rawScore,
      maxScore: result.maxScore,
      pct: result.pct,
      eqIndex: result.eqIndex,
      levelId: result.level.id,
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

    // Concentric pentagon grid rings
    const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
    rings.forEach((r) => {
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

      // Scale label on top axis
      ctx.fillStyle = subLabelColor;
      ctx.font = "600 10px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.round(r * 100)}%`, cx + 16, cy - radius * r + 4);
    });

    // Axes lines
    for (let i = 0; i < count; i++) {
      const outer = getPoint(i, 1);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(outer.x, outer.y);
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Benchmark 75% dashed polygon
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

    // User EQ polygon
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

    // Vertex dots and axis labels
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

      // Label outside pentagon
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
    const filtered = result.questionDetails.filter((item) => {
      if (state.reviewFilter === "optimal") return item.earned === 4;
      if (state.reviewFilter === "improve") return item.earned < 4;
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
      const dim = DATA.DIMENSIONS[q.dimension];
      const scoreMeta = getOptionScoreLabel(item.earned);
      const card = document.createElement("article");
      card.className = "review-card";

      const chosenText = item.chosenOption
        ? `${LETTERS[item.chosenIdx]}. ${item.chosenOption.text}`
        : "Bạn chưa chọn đáp án cho câu này (tính 1 điểm tối thiểu).";
      const chosenFeedback = item.chosenOption
        ? item.chosenOption.feedback
        : "Hãy cân nhắc hoàn thành đủ các câu để kết quả phản ánh chính xác nhất.";

      const optimalBlock =
        item.earned < 4
          ? `
          <div class="review-answer-box optimal-choice">
            <div class="review-box-label">
              <span>✅ Cách ứng xử tối ưu nhất</span>
              <span>4/4 điểm</span>
            </div>
            <div>${escapeHtml(LETTERS[item.optimalIdx] + ". " + item.optimalOption.text)}</div>
          </div>
        `
          : "";

      card.innerHTML = `
        <div class="review-card-top">
          <div class="question-badges">
            <span class="q-index-badge">Câu ${item.index + 1}</span>
            <span class="q-context-badge">${escapeHtml(q.context)}</span>
            <span class="q-dim-badge">${dim.icon} ${escapeHtml(dim.shortName)}</span>
          </div>
          <span class="feedback-score-pill ${scoreMeta.cls}">${item.earned}/4 điểm</span>
        </div>
        <h4 class="review-q-title">${escapeHtml(q.question)}</h4>
        <div class="review-answer-box user-choice">
          <div class="review-box-label">
            <span>Lựa chọn của bạn</span>
            <span>${escapeHtml(scoreMeta.label)}</span>
          </div>
          <div>${escapeHtml(chosenText)}</div>
          <p class="review-feedback-note">${escapeHtml(chosenFeedback)}</p>
        </div>
        ${optimalBlock}
        <div class="review-insight">
          <strong>💡 Góc nhìn tâm lý học:</strong> ${escapeHtml(q.explanation)}
        </div>
      `;
      els.reviewList.appendChild(card);
    });
  }

  function renderResultView(result) {
    els.resultTestName.textContent = result.test.title;
    els.resultTimestamp.textContent = formatDateTime(result.timestamp);
    els.resultTimeSpent.textContent = `Thời gian: ${formatDuration(result.timeSpentSeconds)}`;

    els.resultEqIndex.textContent = String(result.eqIndex);
    els.resultRawScore.textContent = `${result.rawScore} / ${result.maxScore} điểm`;
    els.resultPctScore.textContent = `${result.pct}% tối ưu`;

    const ringDeg = Math.round((result.pct / 100) * 360);
    els.eqScoreRing.style.setProperty("--ring-deg", `${ringDeg}deg`);
    els.eqScoreRing.style.setProperty("--ring-color", result.level.color);

    els.resultLevelBadge.textContent = `${result.level.badge} • Phổ EQ ${result.level.eqRange}`;
    els.resultLevelBadge.style.background = `${result.level.color}20`;
    els.resultLevelBadge.style.color = result.level.color;
    els.resultLevelTitle.textContent = result.level.title;
    els.resultLevelSummary.textContent = result.level.summary;
    els.resultLevelAdvice.textContent = result.level.advice;

    const markerPct = Math.min(98, Math.max(2, ((result.eqIndex - 55) / 90) * 100));
    els.spectrumMarker.style.left = `${markerPct}%`;
    els.spectrumMarkerVal.textContent = String(result.eqIndex);

    drawRadarChart(result.dimensions);

    // Highlights
    const s = result.topStrength;
    els.strengthIcon.textContent = s.meta.icon;
    els.strengthName.textContent = s.meta.name;
    els.strengthScore.textContent = `${s.pct}% (${s.score}/${s.max} điểm)`;
    els.strengthDesc.textContent = s.evaluation;

    const g = result.growthArea;
    els.growthIcon.textContent = g.meta.icon;
    els.growthName.textContent = g.meta.name;
    els.growthScore.textContent = `${g.pct}% (${g.score}/${g.max} điểm)`;
    els.growthDesc.textContent = g.evaluation;

    // 5 Dimensions breakdown
    els.dimensionsBreakdown.innerHTML = "";
    result.dimensions.forEach((dim) => {
      const card = document.createElement("div");
      card.className = "dim-item";
      const tipsHtml = dim.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join("");
      card.innerHTML = `
        <div class="dim-item-top">
          <div class="dim-title-group">
            <span class="dim-icon">${dim.meta.icon}</span>
            <h4>${escapeHtml(dim.meta.name)}</h4>
          </div>
          <div class="dim-score-meta">
            <span class="dim-tier-pill ${dim.tier}">${dim.tierLabel}</span>
            <span class="dim-pct">${dim.pct}% (${dim.score}/${dim.max}đ)</span>
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

    // Review filters reset & list
    Array.from(els.reviewFilters.querySelectorAll(".filter-pill")).forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.reviewFilter === state.reviewFilter);
    });
    renderReviewList(result);
  }

  function copyResultSummary() {
    const r = state.currentResult;
    if (!r) return;

    const dimLines = r.dimensions
      .map((d) => `- ${d.meta.shortName}: ${d.pct}% (${d.tierLabel})`)
      .join("\n");

    const summary = [
      `🧭 KẾT QUẢ TRẮC NGHIỆM EQ — ${r.test.title}`,
      `• Chỉ số EQ quy đổi: ${r.eqIndex} (Thang 55–145) | Điểm: ${r.rawScore}/${r.maxScore} (${r.pct}%)`,
      `• Xếp loại: ${r.level.badge} — ${r.level.title}`,
      `• Điểm mạnh nổi bật: ${r.topStrength.meta.name} (${r.topStrength.pct}%)`,
      `• Cần ưu tiên rèn luyện: ${r.growthArea.meta.name} (${r.growthArea.pct}%)`,
      ``,
      `📊 Chi tiết 5 trụ cột:`,
      dimLines
    ].join("\n");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(summary)
        .then(() => showToast("Đã sao chép tóm tắt kết quả vào clipboard!"))
        .catch(() => showToast("Không thể truy cập clipboard tự động, vui lòng thử In/Lưu PDF."));
    } else {
      showToast("Trình duyệt không hỗ trợ sao chép tự động.");
    }
  }

  // ==================== HISTORY & GUIDE MODALS ====================
  function renderHistoryModal() {
    els.historyList.innerHTML = "";
    els.btnClearHistory.classList.toggle("hidden", state.history.length === 0);

    if (state.history.length === 0) {
      els.historyList.innerHTML = `
        <div class="empty-state">
          <div class="empty-emoji">📭</div>
          <h4>Bạn chưa có bài làm nào được lưu</h4>
          <p>Hãy chọn một bộ đề trên trang chủ và hoàn thành để lưu hồ sơ EQ của bạn.</p>
        </div>
      `;
      return;
    }

    state.history.forEach((item) => {
      const level = DATA.EQ_LEVELS.find((l) => l.id === item.levelId) || DATA.EQ_LEVELS[2];
      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `
        <div>
          <h4 class="history-item-title">${escapeHtml(item.testTitle)}</h4>
          <div class="history-item-meta">
            ${formatDateTime(item.timestamp)} • Thời gian ${formatDuration(item.timeSpentSeconds)} • Điểm ${item.rawScore}/${item.maxScore} (${item.pct}%)
          </div>
        </div>
        <div class="history-item-right">
          <span class="history-eq-badge" style="color: ${level.color}; background: ${level.color}20;">
            EQ ${item.eqIndex}
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

    state.currentResult = reconstructed;
    state.reviewFilter = "all";
    closeModal("history-modal");
    renderResultView(reconstructed);
    switchView("result");
  }

  function renderGuideModal() {
    const pillarsHtml = DIMENSION_ORDER.map((id) => {
      const dim = DATA.DIMENSIONS[id];
      return `
        <div class="guide-pillar-card" style="border-left: 4px solid ${dim.color}">
          <h4>${dim.icon} ${escapeHtml(dim.name)}</h4>
          <p>${escapeHtml(dim.description)}</p>
        </div>
      `;
    }).join("");

    els.guideModalContent.innerHTML = `
      <p style="margin-top:0">
        Theo mô hình của nhà tâm lý học <strong>Daniel Goleman</strong>, Trí tuệ Cảm xúc (EQ) không phải năng khiếu bẩm sinh cố định mà gồm <strong>5 trụ cột năng lực có thể rèn luyện</strong>:
      </p>
      ${pillarsHtml}
      <div class="guide-pillar-card">
        <h4>📏 Cách quy đổi điểm số trong EQ Compass</h4>
        <p>
          Mỗi câu tình huống gồm 4 phương án ứng xử tương ứng từ <strong>1 đến 4 điểm</strong> (từ phản xạ cảm tính đến ứng xử thấu cảm, xây dựng). Tổng điểm được chuẩn hóa sang tỷ lệ phần trăm (%) và quy đổi lên phổ <strong>EQ 55 – 145</strong>, kèm biểu đồ Radar 5 trục để bạn phát hiện nhanh điểm mạnh và trụ cột cần bồi đắp.
        </p>
      </div>
    `;
  }

  // ==================== EVENT LISTENERS ====================
  function bindEvents() {
    els.navHomeBtn.addEventListener("click", () => {
      if (state.view === "quiz") requestExitQuiz();
      else switchView("home");
    });

    els.btnNavTests.addEventListener("click", () => {
      if (state.view === "quiz") requestExitQuiz();
      else switchView("home");
    });

    els.btnToggleTheme.addEventListener("click", toggleTheme);

    els.btnOpenHistory.addEventListener("click", () => {
      renderHistoryModal();
      openModal("history-modal");
    });

    els.btnOpenGuide.addEventListener("click", () => {
      renderGuideModal();
      openModal("guide-modal");
    });

    els.btnQuickStart.addEventListener("click", () => startTest("goleman-comprehensive"));
    els.btnStart5Min.addEventListener("click", () => startTest("quick-daily"));

    // Mode switch
    [els.modeStandardBtn, els.modePracticeBtn].forEach((btn) => {
      btn.addEventListener("click", () => {
        state.mode = btn.dataset.mode;
        els.modeStandardBtn.classList.toggle("active", state.mode === "standard");
        els.modePracticeBtn.classList.toggle("active", state.mode === "practice");
        els.modeHint.textContent =
          state.mode === "practice"
            ? "Sau khi chọn đáp án mỗi câu, bạn sẽ xem được ngay điểm số (1–4đ) và góc nhìn tâm lý học."
            : "Làm liền mạch toàn bộ đề, chấm điểm và phân tích tổng thể ở cuối bài.";
      });
    });

    els.toggleTimerLimit.addEventListener("change", (e) => {
      state.timerEnabled = Boolean(e.target.checked);
    });

    // Category filters
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
      state.activeCategory = "all";
      state.searchQuery = "";
      els.testSearchInput.value = "";
      Array.from(els.categoryFilters.querySelectorAll(".filter-pill")).forEach((p) => {
        p.classList.toggle("active", p.dataset.category === "all");
      });
      renderTestsGrid();
    });

    // Delegated test start button
    els.testsGrid.addEventListener("click", (e) => {
      const startBtn = e.target.closest("[data-start-test]");
      if (!startBtn) return;
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
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    els.btnForceSubmit.addEventListener("click", finalizeQuiz);
    els.btnConfirmExit.addEventListener("click", () => {
      closeModal("exit-confirm-modal");
      stopTimer();
      switchView("home");
    });

    // History modal actions
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

    // Result actions
    els.btnCopyResult.addEventListener("click", copyResultSummary);
    els.btnPrintResult.addEventListener("click", () => window.print());
    els.btnRetakeTest.addEventListener("click", () => {
      if (state.currentResult) {
        startTest(state.currentResult.test.id);
      }
    });
    els.btnBackToHub.addEventListener("click", () => switchView("home"));

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
    loadHistory();
    updateUserStats();
    renderTestsGrid();
    bindEvents();
  }

  init();
})();

