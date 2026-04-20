// Chapter 1 — Celonis Views の概要
// 本章の到達点: View / Analysis / App の用語を区別し、Publisher と Consumer の
// 立場の違いを理解し、View が Celonis Platform 上のどこに存在するかを説明できる。

(function () {
  const ch = {
    id: 'ch01',
    idx: 1,
    duration_min: 22,
    insight: 380,
    crest: null, // 章単独の勋章なし。クエスト全章合格で Shield を獲得。

    title: {
      ja: 'Celonis Views の概要',
      en: 'Overview of Celonis Views',
    },
    summary: {
      ja: 'Celonis における View（ビュー）の定義、Analysis や App との違い、Publisher と Consumer の立場、View がプラットフォーム上のどこに置かれるか、そして公開とデータ更新の基本サイクルを学ぶ。本認定試験の「土台」となる章である。',
    },
    objectives: [
      { ja: 'View・Analysis・App の三つの用語を区別して説明できる。' },
      { ja: 'Publisher（公開者）と Consumer（利用者）の責任範囲を述べられる。' },
      { ja: 'View が Studio Package・Apps Space・Homepage のどこに置かれるかを説明できる。' },
      { ja: 'Knowledge Model（KM）と View の関係を理解する。' },
      { ja: 'View の Draft / Published 状態とデータ更新タイミングの基本を述べられる。' },
    ],

    body: [
      {
        type: 'para',
        ja: 'Celonis における View（ビュー）とは、プロセスマイニングの分析結果をビジネスユーザーへ届けるための画面単位である。Studio で構築されたのち Apps Space に公開（publish）され、Consumer は Web ブラウザから開いて、KPI Tile・Process Explorer・Variant Explorer などの Component を通じてプロセスの実態を読み解く。本認定試験「Use and Interpret Views」が問うのは、View を構築するスキル（build）ではなく、公開済みの View を正しく操作し正しく解釈するスキル（use & interpret）である。',
      },

      { type: 'h2', ja: 'この章で身につけること' },
      {
        type: 'list',
        items: [
          { ja: 'View・Analysis・App の用語を区別する。' },
          { ja: 'Publisher と Consumer、それぞれの責任を述べる。' },
          { ja: 'View が置かれる三つの場所を挙げる。' },
          { ja: 'Knowledge Model と View の関係を理解する。' },
          { ja: '公開（Publish）とデータ更新（Refresh）の違いを説明する。' },
        ],
      },

      { type: 'h2', ja: 'View・Analysis・App の違い' },
      {
        type: 'para',
        ja: 'Celonis には類似した三つの用語が存在し、試験では頻繁に区別が問われる。最も基本的な単位は View であり、Analysis は旧来（Celonis 4 系）の同等概念、App はそれらをまとめた製品パッケージである。',
      },
      {
        type: 'term',
        en: 'View',
        ja: 'ビュー',
        gloss_ja:
          '現行の Celonis Platform（EMS / Celonis Platform）における Consumer 向け画面単位。Studio で構築し、Apps Space に Publish して提供する。Knowledge Model の上に構築される。',
      },
      {
        type: 'term',
        en: 'Analysis',
        ja: 'アナリシス',
        gloss_ja:
          'Celonis 4 系で使われていた旧来の Consumer 画面単位。現行の View に機能統合が進んでいるが、既存資産として残るケースもあり、用語として試験に登場する可能性がある。',
      },
      {
        type: 'term',
        en: 'App',
        ja: 'アプリ',
        gloss_ja:
          '一つ以上の View・Knowledge Model・Action Flow などをひとまとめにしたビジネスソリューション単位。Apps Space で配布される最上位の製品パッケージ。',
      },
      {
        type: 'table',
        headers: [
          { ja: '観点' }, { ja: 'View' }, { ja: 'Analysis' }, { ja: 'App' },
        ],
        rows: [
          [{ja:'位置づけ'}, {ja:'現行の画面単位'}, {ja:'旧来の画面単位'}, {ja:'画面群を束ねた製品'}],
          [{ja:'構築場所'}, {ja:'Studio Package'}, {ja:'Studio Package（Legacy）'}, {ja:'Studio Package + Apps Space'}],
          [{ja:'公開先'}, {ja:'Apps Space'}, {ja:'Apps Space（Legacy）'}, {ja:'Apps Space'}],
          [{ja:'依存'}, {ja:'Knowledge Model'}, {ja:'Data Model 直結（旧）'}, {ja:'View ＋ KM ＋ Flows'}],
          [{ja:'試験範囲'}, {ja:'◎ 中心'}, {ja:'△ 用語のみ'}, {ja:'○ 関連'}],
        ],
      },

      { type: 'h2', ja: 'Publisher と Consumer' },
      {
        type: 'para',
        ja: 'Celonis の利用者は大きく二つの立場に分かれる。Publisher は Studio で View を構築・公開する役割（Analyst・Implementation Professional 等）、Consumer は公開された View を Apps Space で開いて意思決定に使う役割（業務部門ユーザー）である。本試験は完全に Consumer 視点で出題される。',
      },
      {
        type: 'callout',
        variant: 'info',
        ja: '【試験ヒント】「View を作る」「KPI を新規に追加する」「Knowledge Model を編集する」のような操作は Publisher の作業であり、Consumer の選択肢としては不正解になることが多い。Consumer がやるのは「開く・見る・絞り込む・解釈する・共有する」までである。',
      },

      { type: 'h2', ja: 'View が存在する場所' },
      {
        type: 'para',
        ja: 'Consumer の視点で View に到達する経路は次の三つがある。試験では「ある View をどこで見つけるか」「Studio と Apps Space の違い」が問われる。',
      },
      {
        type: 'list',
        items: [
          { ja: 'Apps Space — 公開済みの View や App を Consumer が利用するための表示領域。最も典型的なアクセス先。' },
          { ja: 'Homepage — ユーザーごとにブックマークやお気に入りの View を集約した起点画面。' },
          { ja: 'Studio Package — Publisher が編集中（Draft）の View が置かれる開発エリア。Consumer は通常ここを直接触らない。' },
        ],
      },

      { type: 'h2', ja: 'View と Knowledge Model の関係' },
      {
        type: 'para',
        ja: 'View はそれ単体では機能せず、必ず Knowledge Model（KM）の上に構築される。Knowledge Model は KPI 定義・ディメンション・属性・Record（業務オブジェクト）などの「データ意味層」を担い、View はそれを可視化する「画面層」である。Consumer 視点では KM を編集することはないが、画面に出る KPI 名称や数値の出所を理解するために KM の存在を意識しておく必要がある。',
      },
      {
        type: 'term',
        en: 'Knowledge Model (KM)',
        ja: 'ナレッジモデル',
        gloss_ja:
          'View が参照するデータ意味層。KPI・属性・Record を定義する。複数の View が同一の KM を共有することで、組織横断で同じ指標定義を保証できる。',
      },

      { type: 'h2', ja: 'View ライフサイクル — Draft と Published' },
      {
        type: 'para',
        ja: 'Studio 上の View は Draft（下書き）の状態で編集され、Publisher が明示的に Publish した時点で Apps Space の Consumer に公開される。Consumer が Apps Space で目にするのは常に「最後に公開されたバージョン」であり、Studio 上の最新編集状態が即座に反映されるわけではない。',
      },
      {
        type: 'callout',
        variant: 'warn',
        ja: '【よくある誤答】「Publisher が Studio で変更を保存すれば Consumer の画面にすぐ反映される」と覚えてはならない。Consumer 側に反映されるのは Publish 操作の後である。',
      },

      { type: 'h2', ja: 'データ更新（Refresh）の基本' },
      {
        type: 'para',
        ja: 'View に表示される数値は、背後の Data Model がいつ最後に更新されたかに依存する。Data Model の更新は Data Job のスケジュールに従って実行され、View 自身を「開く」操作はデータ更新を引き起こさない。多くの View には「Last Refresh」表示があり、Consumer はその時刻を見て鮮度を判断する。',
      },
      {
        type: 'quote',
        ja: '「View は窓である。窓を開けても、空模様（データ）が変わるわけではない。」',
        cite: '— 試験対策の基本姿勢',
      },
    ],

    trial: {
      passing: 0.7,
      questions: [
        {
          id: 'ch01-q1',
          type: 'mcq',
          difficulty: 'easy',
          tags: ['definition', 'view'],
          prompt_ja: 'Celonis Platform における「View」の説明として最も適切なものはどれか。',
          options: [
            { id: 'a', ja: 'プロセスマイニング用に最適化されたデータベースエンジン。' },
            { id: 'b', ja: 'Studio で構築され、Apps Space に公開される Consumer 向けの画面単位。' },
            { id: 'c', ja: 'Data Model に直接 SQL を発行する管理者向けツール。' },
            { id: 'd', ja: 'Action Flow を起動するための API エンドポイント。' },
          ],
          correct: 'b',
          explain_ja:
            'View は Knowledge Model の上に構築され Apps Space で Consumer が利用する画面単位。a は Data Pool / Data Model、c は Studio の Data Explorer 等、d は別機能の説明。',
        },

        {
          id: 'ch01-q2',
          type: 'mcq',
          difficulty: 'easy',
          tags: ['view-vs-analysis'],
          prompt_ja: '「Analysis」と「View」の関係として正しいものはどれか。',
          options: [
            { id: 'a', ja: 'Analysis は View の上位概念で、複数の View を束ねたものである。' },
            { id: 'b', ja: 'Analysis は Celonis 4 系の旧来概念で、現行の同等機能は View に統合されつつある。' },
            { id: 'c', ja: 'Analysis は View をエクスポートした Excel ファイルの呼称である。' },
            { id: 'd', ja: 'Analysis と View は完全に同義で、地域によって呼び方が異なるだけ。' },
          ],
          correct: 'b',
          explain_ja:
            'Analysis は旧 Celonis 4 系の Consumer 画面単位。現行プラットフォームでは機能統合が進み、新規構築は View で行うのが標準。',
        },

        {
          id: 'ch01-q3',
          type: 'mcq',
          difficulty: 'med',
          tags: ['publisher-consumer'],
          prompt_ja: '次のうち Publisher の責任に該当するものはどれか。',
          options: [
            { id: 'a', ja: '公開済み View を開いて KPI を解釈する。' },
            { id: 'b', ja: 'Knowledge Model に新しい KPI を定義する。' },
            { id: 'c', ja: '画面上のフィルターを操作して特定ベンダーのケースを絞り込む。' },
            { id: 'd', ja: 'View の現在のフィルター状態をブックマークして同僚と共有する。' },
          ],
          correct: 'b',
          explain_ja:
            'KPI 定義の追加・編集は Knowledge Model 側の作業で Publisher の責任。a・c・d は Consumer の操作。',
        },

        {
          id: 'ch01-q4',
          type: 'mcq',
          difficulty: 'med',
          tags: ['publisher-consumer'],
          prompt_ja: 'Consumer が「View に表示される KPI の値が想定と違う」と気づいた場合、最初に取るべき行動として最も適切なものはどれか。',
          options: [
            { id: 'a', ja: 'Studio に入って Knowledge Model の KPI 式を編集する。' },
            { id: 'b', ja: 'Last Refresh 時刻と現在のフィルター状態を確認する。' },
            { id: 'c', ja: 'Data Pool を再構築する。' },
            { id: 'd', ja: 'Apps Space から該当 View を削除する。' },
          ],
          correct: 'b',
          explain_ja:
            'Consumer の最初の確認はデータ鮮度（Last Refresh）と現在の絞り込み（フィルター/Selection）。それでも疑わしい場合のみ Publisher / 管理者に連絡する。a・c・d はいずれも Consumer 権限外。',
        },

        {
          id: 'ch01-q5',
          type: 'multi',
          difficulty: 'med',
          tags: ['locations'],
          prompt_ja: '公開済みの View に Consumer がアクセスできる場所として正しいものをすべて選べ。',
          options: [
            { id: 'a', ja: 'Apps Space' },
            { id: 'b', ja: 'Homepage' },
            { id: 'c', ja: 'Studio Package（Draft 編集ビュー）' },
            { id: 'd', ja: '共有された View URL の直接リンク' },
          ],
          correct: ['a', 'b', 'd'],
          explain_ja:
            'Studio Package は Publisher の編集領域であり、Consumer の通常アクセス先ではない。Apps Space・Homepage・直接リンクの三つが Consumer の正規ルート。',
        },

        {
          id: 'ch01-q6',
          type: 'mcq',
          difficulty: 'med',
          tags: ['knowledge-model'],
          prompt_ja: 'View と Knowledge Model（KM）の関係について正しいものはどれか。',
          options: [
            { id: 'a', ja: 'View は KM を内部に持ち、View ごとに KPI 定義が独立している。' },
            { id: 'b', ja: 'View は KM の上に構築され、複数の View が同一 KM を共有することができる。' },
            { id: 'c', ja: 'KM は View を公開するための転送プロトコルである。' },
            { id: 'd', ja: 'View 利用のためには Consumer が KM を毎回手動でロードする必要がある。' },
          ],
          correct: 'b',
          explain_ja:
            'KM はデータ意味層（KPI、属性、Record の定義）。同一 KM を複数 View が共有することで指標定義の一貫性が保たれる。',
        },

        {
          id: 'ch01-q7',
          type: 'mcq',
          difficulty: 'easy',
          tags: ['app-vs-view'],
          prompt_ja: 'App と View の関係として最も適切な記述はどれか。',
          options: [
            { id: 'a', ja: 'View は App の中に含まれ、App は複数の View・KM・Action Flow をまとめたもの。' },
            { id: 'b', ja: 'App は View の旧名称である。' },
            { id: 'c', ja: 'App は単一の View のショートカットを指す。' },
            { id: 'd', ja: 'App と View は機能的に同一で、命名規約だけが異なる。' },
          ],
          correct: 'a',
          explain_ja:
            'App は複数の View・Knowledge Model・Action Flow などを束ねたビジネスソリューションの単位。View はそれを構成する画面単位。',
        },

        {
          id: 'ch01-q8',
          type: 'truefalse',
          difficulty: 'med',
          tags: ['publish'],
          prompt_ja: 'Publisher が Studio 上で View を編集して保存した瞬間、Apps Space の Consumer 画面にも変更が即座に反映される。',
          options: [
            { id: 'true', ja: '正しい' },
            { id: 'false', ja: '誤り' },
          ],
          correct: 'false',
          explain_ja:
            'Consumer に変更が反映されるのは Publish 操作の後。Studio 上での保存は Draft の更新でしかなく、公開バージョンには影響しない。',
        },

        {
          id: 'ch01-q9',
          type: 'mcq',
          difficulty: 'hard',
          tags: ['refresh'],
          prompt_ja: 'View に表示されている数値の鮮度（いつ時点のデータか）について、正しい記述はどれか。',
          options: [
            { id: 'a', ja: 'Consumer が View を開いた瞬間に毎回データが再計算されるため、表示は常に最新である。' },
            { id: 'b', ja: '数値は背後の Data Model の最終更新時刻に依存し、View 自体を開く操作はデータ更新を引き起こさない。' },
            { id: 'c', ja: 'View の数値はリアルタイムストリームで更新され、画面更新は不要である。' },
            { id: 'd', ja: '数値は Publisher が手動で更新ボタンを押した時のみ反映される。' },
          ],
          correct: 'b',
          explain_ja:
            'Data Model は Data Job のスケジュールに従って更新される。View 表示はその更新結果を読み出しているだけで、View の開閉や更新ボタンが Data Job をキックするわけではない。多くの View には Last Refresh 表示がある。',
        },

        {
          id: 'ch01-q10',
          type: 'mcq',
          difficulty: 'hard',
          tags: ['scenario', 'consumer-role'],
          prompt_ja: '【シナリオ】調達部門の Consumer が View を開き、「自部署の KPI は表示されているが、別部署 KPI も同じ View に追加してほしい」と感じた。Consumer が取るべき正しい行動は次のうちどれか。',
          options: [
            { id: 'a', ja: 'Studio で当該 View を開き、新しい KPI Tile を直接ドラッグして追加する。' },
            { id: 'b', ja: '既存の View 上のフィルターを使って自部署と別部署を切り替えて表示する設定を試す。それでも不足なら、必要な KPI と業務文脈を整理して Publisher に依頼する。' },
            { id: 'c', ja: 'Apps Space で View を複製し、複製先で KPI を新規追加する。' },
            { id: 'd', ja: '既存 View をエクスポートして Excel 上で別部署 KPI を計算した上で、結果を View に再アップロードする。' },
          ],
          correct: 'b',
          explain_ja:
            'Consumer の権限内で対応できるのは「既存機能（フィルター/Selection 等）の活用」までで、KPI 追加や View 構造変更は Publisher の責任。まず既存機能で代替できないか確認し、必要な要件を Publisher に伝えるのが正解。',
        },
      ],
    },
  };

  // 登録
  if (window.PFContent && window.PFContent.quests && window.PFContent.quests['use-and-interpret-views']) {
    window.PFContent.quests['use-and-interpret-views'].registerChapter(ch);
  } else {
    // index.js が未ロードの場合のフォールバック
    window.PFContent = window.PFContent || { quests: {} };
    window.PFContent.quests = window.PFContent.quests || {};
    window.PFContent.quests['use-and-interpret-views'] =
      window.PFContent.quests['use-and-interpret-views'] || { id: 'use-and-interpret-views', chapters: [] };
    window.PFContent.quests['use-and-interpret-views'].chapters.push(ch);
  }
})();
