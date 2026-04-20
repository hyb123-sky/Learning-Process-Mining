// Chapter 2 — View の構造とナビゲーション
// 本章の到達点: View → Tab → Sheet → Component の階層を理解し、
// 主要 Component の種類と用途を識別でき、ブックマーク・Last Refresh など
// Consumer が日常的に使うナビゲーション機能を操作できる。

(function () {
  const ch = {
    id: 'ch02',
    idx: 2,
    duration_min: 24,
    insight: 420,
    crest: null,

    title: {
      ja: 'View の構造とナビゲーション',
      en: 'View Structure and Navigation',
    },
    summary: {
      ja: 'View は Tab・Sheet・Component の階層で構成される。Consumer はこの階層を辿りながら KPI Tile・Process Explorer・Variant Explorer・OLAP Table などのコンポーネントを操作する。本章では各 Component の役割と、ブックマーク・URL 共有・Last Refresh といった日常的なナビゲーション機能を学ぶ。',
    },
    objectives: [
      { ja: 'View → Tab → Sheet → Component の階層構造を説明できる。' },
      { ja: '主要 Component（KPI Tile / Table / Chart / Process Explorer / Variant Explorer / Selection / OLAP Table）を識別できる。' },
      { ja: 'Tab 切り替えとコンポーネント間のデータ連動の仕組みを述べられる。' },
      { ja: 'Bookmark を使って View の状態を保存・共有できる。' },
      { ja: 'Last Refresh 表示の意味と確認手順を理解する。' },
    ],

    body: [
      {
        type: 'para',
        ja: 'View は単一の画面ではなく、複数の Tab（タブ）を持つ画面群として設計されることが多い。各 Tab は一つの Sheet（シート）を表示し、Sheet の上に複数の Component（コンポーネント）が配置される。Consumer はこの階層を辿りながら、知りたい角度のプロセス情報へ到達する。',
      },

      { type: 'h2', ja: 'View の階層構造' },
      {
        type: 'list',
        items: [
          { ja: 'View — Consumer がブラウザで開く画面単位の最上位。' },
          { ja: 'Tab — View の上部に並ぶナビゲーション要素。クリックで Sheet が切り替わる。' },
          { ja: 'Sheet — 一つの Tab に対応する作業面。Component を配置するキャンバス。' },
          { ja: 'Component — Sheet 上の個々の部品（KPI Tile・Chart・Table など）。' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        ja: '【試験ヒント】「View と Sheet と Component を逆順で説明している選択肢」がよく出題される。最上位は必ず View、最小単位は必ず Component。',
      },

      { type: 'h2', ja: '主要 Component 一覧' },
      {
        type: 'para',
        ja: '次の表は本試験で頻出する Component。それぞれが「単一指標を見せるのか」「分布を見せるのか」「プロセスを見せるのか」を意識して覚える。',
      },
      {
        type: 'table',
        headers: [{ja:'Component'}, {ja:'主用途'}, {ja:'典型的な表示'}],
        rows: [
          [{ja:'KPI Tile'}, {ja:'単一指標の値・目標・トレンドを示す'}, {ja:'数値 + ターゲット + 前期比'}],
          [{ja:'Single KPI'}, {ja:'KPI Tile の簡易版・大きな数値表示'}, {ja:'数値のみ'}],
          [{ja:'Column / Bar Chart'}, {ja:'カテゴリ別の値の比較'}, {ja:'棒グラフ'}],
          [{ja:'Line Chart'}, {ja:'時系列の推移を示す'}, {ja:'折れ線'}],
          [{ja:'Pie / Donut'}, {ja:'構成比を示す'}, {ja:'円グラフ'}],
          [{ja:'Sankey'}, {ja:'フロー量を示す（活動間の流量など）'}, {ja:'帯状フロー図'}],
          [{ja:'Process Explorer'}, {ja:'プロセスフローを可視化'}, {ja:'Activity（ノード）+ Transition（矢印）'}],
          [{ja:'Variant Explorer'}, {ja:'活動順序のパターン分布を示す'}, {ja:'Variant ごとの帯リスト'}],
          [{ja:'OLAP Table'}, {ja:'多次元クロス集計を表形式で示す'}, {ja:'ピボット表'}],
          [{ja:'Selection / Filter Component'}, {ja:'画面全体の絞り込み条件を入力'}, {ja:'ドロップダウン・スライダー'}],
        ],
      },

      { type: 'h2', ja: 'Tab とコンポーネントのデータ連動' },
      {
        type: 'para',
        ja: '同一 View 内の Component は同じ Knowledge Model と同じ現在のフィルター（Selection）状態を共有する。あるコンポーネント上で「特定 Variant をクリックして絞り込む」と、その絞り込みは同じ Sheet 上の他の KPI Tile や Process Explorer にも伝播し、表示が連動して更新される。Tab 間でも基本的に Selection は引き継がれる（View 単位でリセットしない限り）。',
      },
      {
        type: 'callout',
        variant: 'warn',
        ja: '【よくある誤解】「ある Tab で絞り込んだ条件は、その Tab を離れた瞬間に消える」と覚えてはならない。Selection は View 単位で保持されるため、別の Tab に移っても効いている。',
      },

      { type: 'h2', ja: 'ブックマーク（Bookmark）' },
      {
        type: 'para',
        ja: 'Bookmark は「現在の View の状態（適用されているフィルター・Selection・Tab 位置）」を名前付きで保存する機能である。Consumer は自分用の Personal Bookmark を作って素早く前回状態を再現したり、URL や Bookmark 共有機能で同僚に「この絞り込み状態の View」を渡したりできる。',
      },
      {
        type: 'term',
        en: 'Bookmark',
        ja: 'ブックマーク',
        gloss_ja:
          'View 上の絞り込み状態を保存する機能。Personal Bookmark（個人用）と Shared Bookmark（共有用）がある。',
      },
      {
        type: 'callout',
        variant: 'info',
        ja: '【ヒント】「同僚と同じ画面状態を共有したい」シナリオでの正解は通常 Bookmark もしくは状態を含む URL の共有。「View をエクスポートして PDF を送る」「Studio で View を複製する」といった選択肢は不正解になりやすい。',
      },

      { type: 'h2', ja: 'Last Refresh — データ鮮度の確認' },
      {
        type: 'para',
        ja: '多くの View にはヘッダー付近またはコンポーネントのツールチップに「Last Refresh（最終更新時刻）」が表示される。Consumer は数値を解釈する前に必ずこの時刻を確認し、業務上要求される鮮度（例：日次・週次）と整合しているかを判定する。Last Refresh は背後の Data Model 更新時刻であり、View を開いた時刻ではない点に注意する。',
      },
      {
        type: 'pql',
        code: '// Component のツールチップ例（イメージ）\nLast Data Refresh: 2026-04-19 03:14 UTC\nKnowledge Model: O2C_KM v3.4 (published 2026-04-15)',
        caption_ja:
          'Last Refresh と KM のバージョン表示の典型例。Consumer は両方を「数値を信用してよいか」の根拠として使う。',
      },

      { type: 'h2', ja: 'View 全画面表示・印刷・エクスポート' },
      {
        type: 'para',
        ja: 'View 単位の全画面表示（Fullscreen）、コンポーネント単位の拡大、PDF エクスポート、表データの CSV / XLSX 出力など、Consumer 向けの軽い出力機能が用意されている。これらは Consumer 権限の範囲内で使える機能である一方、KPI 定義やデータ構造を変える操作は含まれない点を区別して覚える。',
      },

      {
        type: 'quote',
        ja: '「View は組み立てない。読む。」',
        cite: '— Consumer 視点の鉄則',
      },
    ],

    trial: {
      passing: 0.7,
      questions: [
        {
          id: 'ch02-q1',
          type: 'mcq',
          difficulty: 'easy',
          tags: ['hierarchy'],
          prompt_ja: 'View の構造を上位から下位の順に並べたとき、正しい順序はどれか。',
          options: [
            { id: 'a', ja: 'Component → Sheet → Tab → View' },
            { id: 'b', ja: 'View → Tab → Sheet → Component' },
            { id: 'c', ja: 'Tab → View → Component → Sheet' },
            { id: 'd', ja: 'View → Sheet → Component → Tab' },
          ],
          correct: 'b',
          explain_ja:
            '最上位が View、その下に Tab（複数）→ Sheet → Component（部品）。試験では順序逆転の引っ掛け選択肢が頻出。',
        },

        {
          id: 'ch02-q2',
          type: 'mcq',
          difficulty: 'easy',
          tags: ['component'],
          prompt_ja: '「単一の指標を、現在値・目標・トレンドとともに見せる」ことを最も得意とするコンポーネントはどれか。',
          options: [
            { id: 'a', ja: 'Process Explorer' },
            { id: 'b', ja: 'KPI Tile' },
            { id: 'c', ja: 'OLAP Table' },
            { id: 'd', ja: 'Sankey' },
          ],
          correct: 'b',
          explain_ja:
            'KPI Tile は単一指標の値・目標・トレンドを集約表示する代表的コンポーネント。Process Explorer はプロセスフロー、OLAP Table は多次元クロス、Sankey はフロー量。',
        },

        {
          id: 'ch02-q3',
          type: 'multi',
          difficulty: 'med',
          tags: ['component'],
          prompt_ja: '次のうち「プロセスフロー（活動順序）」を可視化する目的に最も合うコンポーネントをすべて選べ。',
          options: [
            { id: 'a', ja: 'Process Explorer' },
            { id: 'b', ja: 'Variant Explorer' },
            { id: 'c', ja: 'Pie Chart' },
            { id: 'd', ja: 'Line Chart' },
          ],
          correct: ['a', 'b'],
          explain_ja:
            'Process Explorer は活動と遷移をネットワーク図で示し、Variant Explorer は活動順序のパターンを分布で示す。Pie Chart は構成比、Line Chart は時系列で、いずれも「順序」自体は表現しない。',
        },

        {
          id: 'ch02-q4',
          type: 'mcq',
          difficulty: 'med',
          tags: ['component-data-flow'],
          prompt_ja: 'ある Sheet 上で Variant Explorer の特定 Variant をクリックして絞り込んだ。同じ Sheet 上の KPI Tile の値はどう振る舞うか。',
          options: [
            { id: 'a', ja: '影響を受けず元の全体値のままになる。' },
            { id: 'b', ja: '絞り込まれた Variant に対応するケースだけで再計算され、表示が更新される。' },
            { id: 'c', ja: 'KPI Tile の値はキャッシュされており次回データ更新まで変わらない。' },
            { id: 'd', ja: '絞り込みは KPI Tile に伝わらず、別途同じフィルターを KPI 側でも設定する必要がある。' },
          ],
          correct: 'b',
          explain_ja:
            '同一 Sheet（および View）内の Component は現在の Selection を共有するため、Variant Explorer の絞り込みは KPI Tile・Process Explorer など他コンポーネントへ自動的に伝播する。',
        },

        {
          id: 'ch02-q5',
          type: 'truefalse',
          difficulty: 'med',
          tags: ['tab-selection'],
          prompt_ja: 'ある Tab 上で適用したフィルター（Selection）は、別の Tab に切り替えるとリセットされて消える。',
          options: [
            { id: 'true', ja: '正しい' },
            { id: 'false', ja: '誤り' },
          ],
          correct: 'false',
          explain_ja:
            'Selection は View 単位で保持されるため、Tab を切り替えても消えない。明示的にクリアするか Bookmark で別状態に切り替える必要がある。',
        },

        {
          id: 'ch02-q6',
          type: 'mcq',
          difficulty: 'easy',
          tags: ['bookmark'],
          prompt_ja: 'Bookmark 機能の説明として最も適切なものはどれか。',
          options: [
            { id: 'a', ja: 'View に新しい KPI を追加して保存する機能。' },
            { id: 'b', ja: '現在の View の状態（フィルター・Selection・Tab 位置）を名前付きで保存する機能。' },
            { id: 'c', ja: 'View 自体を別ユーザーへ複製する機能。' },
            { id: 'd', ja: 'Knowledge Model のバージョンを固定する機能。' },
          ],
          correct: 'b',
          explain_ja:
            'Bookmark は View の現在の絞り込み状態を保存・再現するための Consumer 機能。KPI 追加・KM バージョン固定は Publisher 権限の話で別概念。',
        },

        {
          id: 'ch02-q7',
          type: 'mcq',
          difficulty: 'med',
          tags: ['bookmark', 'sharing'],
          prompt_ja: '【シナリオ】「自分が今絞り込んでいる View の状態を、まったく同じ条件で同僚に見てもらいたい」。最も推奨される手段はどれか。',
          options: [
            { id: 'a', ja: '画面を PDF にエクスポートしてメール添付する。' },
            { id: 'b', ja: 'View をスクリーンショットして Slack に貼る。' },
            { id: 'c', ja: 'Bookmark を作って共有するか、現在の状態を含む View URL を送る。' },
            { id: 'd', ja: 'Studio で View を複製して同僚を Publisher として招待する。' },
          ],
          correct: 'c',
          explain_ja:
            'Bookmark もしくは状態付き URL の共有が最もスマート。PDF/スクリーンショットは静的で同僚側で再操作できないし、d は完全に Publisher 領域の作業で過剰。',
        },

        {
          id: 'ch02-q8',
          type: 'mcq',
          difficulty: 'med',
          tags: ['refresh'],
          prompt_ja: 'View ヘッダーに「Last Refresh: 2026-04-19 03:14 UTC」と表示されていた。この時刻が指す意味として正しいものはどれか。',
          options: [
            { id: 'a', ja: 'Consumer がこの View を最後に開いた時刻。' },
            { id: 'b', ja: '背後の Data Model が最後に更新された時刻。' },
            { id: 'c', ja: 'Publisher がこの View を最後に Publish した時刻。' },
            { id: 'd', ja: 'KPI Tile のキャッシュが最後にクリアされた時刻。' },
          ],
          correct: 'b',
          explain_ja:
            'Last Refresh は背後の Data Model（Data Job 実行結果）の最終更新時刻。View を開いたタイミングや Publish タイミングとは別物。',
        },

        {
          id: 'ch02-q9',
          type: 'mcq',
          difficulty: 'hard',
          tags: ['component', 'olap'],
          prompt_ja: '「ベンダー × 月別の支払金額を、行と列の両方で集計して比較したい」。Consumer が選ぶべき最も適したコンポーネントはどれか。',
          options: [
            { id: 'a', ja: 'KPI Tile' },
            { id: 'b', ja: 'Process Explorer' },
            { id: 'c', ja: 'OLAP Table' },
            { id: 'd', ja: 'Variant Explorer' },
          ],
          correct: 'c',
          explain_ja:
            'OLAP Table は行・列・指標の多次元クロス集計に最適。KPI Tile は単一値、Process Explorer はフロー、Variant Explorer は順序パターン用。',
        },

        {
          id: 'ch02-q10',
          type: 'mcq',
          difficulty: 'hard',
          tags: ['scenario', 'consumer-actions'],
          prompt_ja: '【シナリオ】Consumer が View を開くと、KPI Tile の数値が直感に反して低い。原因の切り分けとして「最初に行うべき確認」を順序立てたとき、最も適切な手順はどれか。',
          options: [
            { id: 'a', ja: 'まず KPI 式が正しいか Knowledge Model を編集して確認する。' },
            { id: 'b', ja: 'まず Last Refresh と現在の Selection / フィルター状態を確認し、それらが想定と一致しているかを見る。' },
            { id: 'c', ja: 'まず Data Pool の取り込みログを確認する。' },
            { id: 'd', ja: 'まず View を再 Publish するよう Publisher に依頼する。' },
          ],
          correct: 'b',
          explain_ja:
            'Consumer の責任範囲は「データ鮮度」と「絞り込み状態」までの確認。a・c・d はいずれも Publisher / 管理者領域で、Consumer の最初の手として不適切。',
        },
      ],
    },
  };

  if (window.PFContent && window.PFContent.quests && window.PFContent.quests['use-and-interpret-views']) {
    window.PFContent.quests['use-and-interpret-views'].registerChapter(ch);
  } else {
    window.PFContent = window.PFContent || { quests: {} };
    window.PFContent.quests = window.PFContent.quests || {};
    window.PFContent.quests['use-and-interpret-views'] =
      window.PFContent.quests['use-and-interpret-views'] || { id: 'use-and-interpret-views', chapters: [] };
    window.PFContent.quests['use-and-interpret-views'].chapters.push(ch);
  }
})();
