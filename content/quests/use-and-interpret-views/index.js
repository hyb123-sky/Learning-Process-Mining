// PathForge — Quest meta: Celonis "Use and Interpret Views" qualification exam
// Reference: https://academy.celonis.com/courses/use-and-interpret-views-qualification-exam

(function () {
  window.PFContent = window.PFContent || { quests: {} };
  window.PFContent.quests = window.PFContent.quests || {};

  const quest = {
    id: 'use-and-interpret-views',
    slug: 'use-and-interpret-views',
    crest: 'shield', // 全章合格で Shield of Conformance
    cert_url: 'https://academy.celonis.com/courses/use-and-interpret-views-qualification-exam',

    title: {
      ja: 'Use and Interpret Views',
      en: 'Use and Interpret Views',
    },
    subtitle: {
      ja: 'Celonis Views 解釈 認定試験対策',
      en: 'Celonis View Consumer Certification Prep',
    },
    description_ja:
      'Celonis Platform 上で公開された View（ビュー）を正しく操作し、KPI・Process Explorer・Variant Explorer などのコンポーネントを通じてプロセスの実態を読み解く力を養う。本クエストは Celonis Academy が提供する「Use and Interpret Views」認定試験に対応し、合格点を狙うのではなく高得点で抜けることを目的とする。',

    // 章の総量と報酬は ch0N.js が push 後に index.js 側で集計してもよい
    est_hours: 4,
    total_chapters: 8,
    total_insight: 2800,
    passing_score: 0.7,
    target_score: 0.9, // 高得点合格目標

    // 章スロット（各 ch0N.js が登録）
    chapters: [],
    mock_exam: null,

    // 章一覧の表示用マップ（章ファイル未ロード時のプレースホルダ）
    chapter_index: [
      { id: 'ch01', idx: 1, title_ja: 'Celonis Views の概要' },
      { id: 'ch02', idx: 2, title_ja: 'View の構造とナビゲーション' },
      { id: 'ch03', idx: 3, title_ja: 'フィルターと選択（Selections）' },
      { id: 'ch04', idx: 4, title_ja: 'Process Explorer の読み方' },
      { id: 'ch05', idx: 5, title_ja: 'Variant Explorer と Conformance' },
      { id: 'ch06', idx: 6, title_ja: 'KPI と可視化コンポーネントの解釈' },
      { id: 'ch07', idx: 7, title_ja: 'ドリルダウンとケース分析' },
      { id: 'ch08', idx: 8, title_ja: '試験対策と模擬試験' },
    ],
  };

  // 章ファイルが後から読み込まれるため、register API を提供
  quest.registerChapter = function (chapter) {
    const i = quest.chapters.findIndex((c) => c.id === chapter.id);
    if (i >= 0) quest.chapters[i] = chapter;
    else quest.chapters.push(chapter);
    quest.chapters.sort((a, b) => a.idx - b.idx);
  };
  quest.registerMockExam = function (exam) {
    quest.mock_exam = exam;
  };

  window.PFContent.quests[quest.id] = quest;
})();
