export const CH02_MDX = `## View の階層構造

Celonis View は四層の階層で構成されています。

<CompareTable
  headers={['層', '役割']}
  rows={[
    ['View', 'Tab の集合を束ねる最上位コンテナ'],
    ['Tab', 'トピック別にシートをグループ化する水平タブ'],
    ['Sheet', 'コンポーネントを配置する縦長キャンバス'],
    ['Component', 'KPI Tile・Process Explorer などの可視化単位'],
  ]}
/>

Publisher は Tab を作成してトピックを分割し、各 Tab 内に Sheet を配置、Sheet 上にコンポーネントを並べます。Consumer は Tab を切り替えながら情報を消費します。

## 主要 Component 一覧

<Callout type="exam">
**試験頻出**: 各 Component の目的を一目で判別できること。試験ではスクリーンショットから名前を問う形式が多い。
</Callout>

- **KPI Tile**: 単一の数値指標を大きく表示。Target と Trend を併記可能。
- **Process Explorer**: Activity と Transition のグラフでプロセスフロー全体を可視化。
- **Variant Explorer**: プロセスバリアント (経路パターン) の頻度分布を表示。
- **OLAP Table**: 多次元集計テーブル。行列に Dimension を配置。
- **Column Chart / Line Chart / Bar Chart**: 伝統的な統計グラフ。
- **Sankey**: 流量とフロー分岐を帯で表現。
- **Funnel**: ステップ間の脱落率を段階的に表示。

## Selection の伝播

<Term word="Selection" reading="セレクション" /> とは、Consumer が View 上で適用するフィルタ選択のことです。例えば Process Explorer 上で特定の Activity をクリックすると、その Activity が Selection として View 全体に適用されます。

Selection の伝播範囲は以下のルールで決まります。

1. **Tab 跨ぎで維持**: 同一 View 内で Tab を切り替えても Selection は保持されます。
2. **View を離れるとリセット**: 別の View に移動すると Selection はクリアされます。
3. **Component Filter 優先**: 個別の Component に Publisher が設定した Component Filter は、Selection に加えて常に適用されます。

<Callout type="tip">
Consumer が「このフィルタが外れない」と困っているケースは、多くの場合 Publisher が Component Filter を設定しているためです。Component レベルの設定は Publisher のみが解除できます。
</Callout>

## Bookmark の役割

<Term word="Bookmark" reading="ブックマーク" /> は、現在の Selection 状態を URL パラメータとして保存する機能です。Consumer は Bookmark を作成して自分専用のフィルタ状態を保存でき、URL を共有することで他の Consumer にも同じ Selection を再現させられます。

Bookmark はあくまで Selection のスナップショットであり、View 自体の構造を変更するものではありません。

## Fullscreen と Export

Component には以下の操作が用意されています。

- **Fullscreen**: 個別 Component を全画面表示。プレゼンテーションや詳細確認に使用。
- **Export**: Component のデータを PDF / Excel / Image 形式で出力。OLAP Table は CSV 出力も可能。

Export されるデータは、エクスポート時点で適用されている Selection が反映された結果セットです。

## Last Refresh と Current Filter の違い

Consumer が View を開いたとき、右上には二つの情報が表示されます。

<CompareTable
  headers={['項目', 'Last Refresh', 'Current Filter']}
  rows={[
    ['意味', 'データモデルへのロード時刻', 'View に適用されている Selection'],
    ['更新タイミング', 'データ抽出ジョブ完了時', 'Consumer が Selection を変更するたび'],
    ['KPI 異常時の確認', '最初に見る', 'その後で確認する'],
  ]}
/>

## KPI 異常時の排查順序

KPI 値が期待と異なる場合、以下の順序で確認します。

1. **Last Refresh**: データが最新か。古い場合は Administrator に連絡。
2. **Current Filter (Selection)**: 意図しないフィルタが適用されていないか。
3. **Component Filter**: Publisher が設定した固定フィルタがないか。
4. **Knowledge Model 定義**: KPI の計算式そのものに問題がないか (Publisher に確認)。
5. **データモデル**: 元データに欠損や異常値がないか (Administrator / Data Engineer 領域)。

<Callout type="warning">
Consumer が自力で解決できるのは 1〜2 までです。3 以降は Publisher や Administrator のサポートが必要になります。
</Callout>
`;

export const CH02_QUESTIONS = [
  {
    order: 1,
    type: 'mcq',
    stem_ja: 'Celonis View の階層構造として、正しい順序はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'View → Sheet → Tab → Component' },
      { key: 'B', text_ja: 'View → Tab → Sheet → Component' },
      { key: 'C', text_ja: 'Tab → View → Component → Sheet' },
      { key: 'D', text_ja: 'Component → Sheet → Tab → View' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      '正しい階層は View → Tab → Sheet → Component です。最上位が View、次にトピック分割の Tab、配置キャンバスの Sheet、個別可視化単位の Component です。',
    difficulty: 'easy',
    tags: JSON.stringify(['hierarchy']),
  },
  {
    order: 2,
    type: 'mcq',
    stem_ja: '単一の数値指標を Target と Trend 付きで表示する Component はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'Process Explorer' },
      { key: 'B', text_ja: 'Variant Explorer' },
      { key: 'C', text_ja: 'KPI Tile' },
      { key: 'D', text_ja: 'Sankey' },
    ]),
    correctKeys: JSON.stringify(['C']),
    explain_ja:
      'KPI Tile は単一の数値指標 (例: Throughput Time) を Target と Trend と併せて大きく表示する Component です。',
    difficulty: 'easy',
    tags: JSON.stringify(['component', 'kpi-tile']),
  },
  {
    order: 3,
    type: 'mcq',
    stem_ja: 'プロセスバリアント (経路パターン) の頻度分布を可視化するのに適した Component はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'Column Chart' },
      { key: 'B', text_ja: 'Variant Explorer' },
      { key: 'C', text_ja: 'OLAP Table' },
      { key: 'D', text_ja: 'Funnel' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'Variant Explorer は、ケースがたどる経路パターン (Variant) を頻度順にリスト表示し、バリアント間の差分を分析するための専用 Component です。',
    difficulty: 'medium',
    tags: JSON.stringify(['component', 'variant-explorer']),
  },
  {
    order: 4,
    type: 'mcq',
    stem_ja: 'Activity と Transition のグラフでプロセスフロー全体を可視化する Component はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'Process Explorer' },
      { key: 'B', text_ja: 'Sankey' },
      { key: 'C', text_ja: 'Line Chart' },
      { key: 'D', text_ja: 'Funnel' },
    ]),
    correctKeys: JSON.stringify(['A']),
    explain_ja:
      'Process Explorer は Activity をノード、Transition をエッジとして描画し、プロセスフロー全体を可視化するための中心的な Component です。',
    difficulty: 'easy',
    tags: JSON.stringify(['component', 'process-explorer']),
  },
  {
    order: 5,
    type: 'mcq',
    stem_ja: 'Consumer が同一 View 内で Tab を切り替えた場合、適用中の Selection はどうなるか。',
    options: JSON.stringify([
      { key: 'A', text_ja: '完全にリセットされる' },
      { key: 'B', text_ja: 'Tab を跨いで保持される' },
      { key: 'C', text_ja: 'Tab 切り替え時に確認ダイアログが表示される' },
      { key: 'D', text_ja: '最初の Tab でのみ有効になる' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'Selection は同一 View 内で Tab を跨いで保持されます。別の View に移動すると初めてリセットされます。',
    difficulty: 'medium',
    tags: JSON.stringify(['selection', 'tab']),
  },
  {
    order: 6,
    type: 'mcq',
    stem_ja: 'Consumer が Selection で除外しようとしても特定のフィルタが外れない場合、最も可能性が高い原因はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'データモデルが壊れている' },
      { key: 'B', text_ja: 'Publisher が Component Filter を設定している' },
      { key: 'C', text_ja: 'Consumer のブラウザキャッシュが原因' },
      { key: 'D', text_ja: 'Last Refresh が古い' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'Publisher が個別 Component に Component Filter を設定している場合、Consumer の Selection に加えて常に適用されます。解除できるのは Publisher のみです。',
    difficulty: 'hard',
    tags: JSON.stringify(['selection', 'component-filter']),
  },
  {
    order: 7,
    type: 'mcq',
    stem_ja: 'Bookmark の役割として最も正しい説明はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'View の構造 (Tab・Sheet・Component) を保存する' },
      { key: 'B', text_ja: '現在の Selection 状態を URL パラメータとして保存し、共有を可能にする' },
      { key: 'C', text_ja: 'Knowledge Model の定義をバックアップする' },
      { key: 'D', text_ja: 'データモデルのスナップショットを保存する' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'Bookmark は Selection 状態のスナップショットを URL に保存する機能で、共有や個人保存に利用されます。View の構造や KM・データモデルは変更しません。',
    difficulty: 'medium',
    tags: JSON.stringify(['bookmark']),
  },
  {
    order: 8,
    type: 'mcq',
    stem_ja: 'KPI Tile の値が期待値と異なる場合、Consumer が最初に確認すべき指標はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'Knowledge Model の KPI 計算式' },
      { key: 'B', text_ja: 'Last Refresh (データの鮮度)' },
      { key: 'C', text_ja: 'データモデルの物理構造' },
      { key: 'D', text_ja: 'Team Settings の権限' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      '排查順序の第一歩は Last Refresh の確認です。データが古ければ KPI も古い値を返します。その後に Current Filter、Component Filter、KM 定義の順に確認します。',
    difficulty: 'medium',
    tags: JSON.stringify(['troubleshooting', 'last-refresh']),
  },
  {
    order: 9,
    type: 'multi_select',
    stem_ja: 'OLAP Table に関する記述として正しいものをすべて選択してください。',
    options: JSON.stringify([
      { key: 'A', text_ja: '多次元集計テーブルであり、行と列に Dimension を配置する' },
      { key: 'B', text_ja: 'CSV 形式で Export 可能である' },
      { key: 'C', text_ja: 'プロセスフロー全体を可視化するための主要 Component である' },
      { key: 'D', text_ja: 'Consumer が行と列の Dimension を自由に差し替えられる' },
      { key: 'E', text_ja: 'Export されるデータには現在の Selection が反映される' },
    ]),
    correctKeys: JSON.stringify(['A', 'B', 'E']),
    explain_ja:
      'OLAP Table は多次元集計テーブル (A) で、CSV Export に対応 (B)、Export 時には現在の Selection が反映 (E) されます。プロセスフロー可視化は Process Explorer の役割 (C は誤)、Dimension の差し替えは Publisher の権限 (D は誤) です。',
    difficulty: 'hard',
    tags: JSON.stringify(['component', 'olap-table', 'export']),
  },
  {
    order: 10,
    type: 'true_false',
    stem_ja: 'Bookmark は View の構造 (Tab・Sheet・Component 配置) を変更する機能である。',
    options: JSON.stringify([
      { key: 'T', text_ja: '正しい (True)' },
      { key: 'F', text_ja: '誤り (False)' },
    ]),
    correctKeys: JSON.stringify(['F']),
    explain_ja:
      '誤りです。Bookmark は Selection 状態のスナップショットを保存する機能であり、View の構造自体は変更しません。構造変更は Publisher の役割です。',
    difficulty: 'easy',
    tags: JSON.stringify(['bookmark', 'selection']),
  },
];
