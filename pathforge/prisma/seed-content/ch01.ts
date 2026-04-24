export const CH01_MDX = `## Celonis Views とは何か

<Term word="View" reading="ビュー" /> とは、Celonis Platform 上で公開されたインタラクティブな分析インターフェースです。ビジネスユーザーが KPI・プロセスフロー・ケース詳細を閲覧し、自分でフィルタを適用してインサイトを得るために使用します。

View は Publisher (分析者) によって Studio 内で設計され、Consumer (ビジネスユーザー) に対して公開されます。Consumer は View を編集できず、閲覧と Selection (フィルタ選択) のみが可能です。

## View と Analysis と App の違い

<Callout type="exam">
**試験頻出**: View・Analysis・App の区別を明確に説明できること。混同すると失点しやすい。
</Callout>

<CompareTable
  headers={['項目', 'View', 'Analysis (旧)', 'App']}
  rows={[
    ['対象ユーザー', 'Business User (Consumer)', 'Analyst (Publisher)', 'Business User'],
    ['編集可能性', '閲覧のみ', '編集可能', '閲覧のみ'],
    ['配置場所', 'Studio, App, Shared Space', 'Studio (レガシー)', 'Navigator / Marketplace'],
    ['構成要素', 'Tab → Sheet → Component', 'Sheet → Component', '複数の View + Action Flow'],
  ]}
/>

View は Celonis の最新世代の可視化機能であり、旧来の Analysis を置き換える位置付けです。App はさらに上位の概念で、複数の View と Action Flow を束ねたビジネスソリューション単位です。

## Publisher と Consumer の役割

View のライフサイクルには二つの役割があります。

<Term word="Publisher" reading="パブリッシャー" /> は Studio 内で View を作成・編集し、Knowledge Model に接続して KPI とコンポーネントを配置します。公開 (Publish) 操作を行う権限を持ちます。

<Term word="Consumer" reading="コンシューマー" /> は公開された View を閲覧し、Selection を通じてフィルタを適用します。View 自体の構造やクエリ定義を変更することはできません。

<Callout type="tip">
実務では同一人物が両方の役割を兼ねることが多いですが、権限モデル上は分離されています。試験では「Consumer が View を編集できるか」という問いに対して「できない」が正解です。
</Callout>

## View が配置される三つの場所

View は以下の三つのスペースに配置されます。

- **Studio**: Publisher が View を設計・編集する作業空間。ドラフトと Published 両方が存在。
- **App**: 複数の View と Action Flow をパッケージ化したビジネスソリューション。Marketplace や内部配布で利用。
- **Shared Space**: 特定のユーザーグループに直接共有された View のコレクション。

## Knowledge Model との関係

View 自体はデータを保持しません。すべての KPI・ディメンション・プロセス定義は <Term word="Knowledge Model" reading="ナレッジモデル" /> (KM) に格納され、View は KM のオブジェクトを参照して描画します。

KM が更新されると、それを参照するすべての View に変更が波及します。これは一貫性を保つ強力な仕組みですが、同時に KM の変更は慎重に行う必要があります。

## Publish ライフサイクル

View のライフサイクルは次のステージで構成されます。

1. **Draft**: Publisher が Studio 内で編集中。Consumer には見えない。
2. **Published**: 公開され Consumer がアクセス可能。Draft と Published は独立したスナップショット。
3. **Consumed**: Consumer が View を開いて閲覧している状態。

Publisher が Draft を編集しても、Published 版は影響を受けません。明示的に再 Publish するまで Consumer は旧バージョンを見続けます。

## Last Refresh の意味

View の右上に表示される <Term word="Last Refresh" reading="ラスト リフレッシュ" /> は、View の公開時刻ではなく、**データソースからデータモデルへの最終ロード時刻**を示します。

<Callout type="warning">
Last Refresh が古い場合、View 自体は新しくてもデータは古い可能性があります。KPI が期待と異なるとき、まず Last Refresh を確認してください。
</Callout>
`;

export const CH01_QUESTIONS = [
  {
    order: 1,
    type: 'mcq',
    stem_ja: 'Celonis における View の主な目的として、最も適切なものはどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'データソースから生データを抽出して ETL 処理を行う' },
      { key: 'B', text_ja: 'ビジネスユーザーがプロセスインサイトを消費するためのインタラクティブな分析インターフェースを提供する' },
      { key: 'C', text_ja: 'データソースへの書き戻し (Write-back) を実行する' },
      { key: 'D', text_ja: 'ユーザー権限とロールを管理する' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'View は Consumer (ビジネスユーザー) がプロセスインサイトを閲覧するためのインターフェースです。ETL はデータモデル層、書き戻しは Action Flow、権限管理は Team Settings の役割です。',
    difficulty: 'easy',
    tags: JSON.stringify(['definition', 'view']),
  },
  {
    order: 2,
    type: 'mcq',
    stem_ja: 'View と従来の Analysis の違いとして、最も正しい説明はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'View は編集可能、Analysis は閲覧のみ' },
      { key: 'B', text_ja: 'View は Consumer 向けの公開インターフェース、Analysis は Publisher 向けの編集ツール' },
      { key: 'C', text_ja: '両者は同義であり機能的に差異はない' },
      { key: 'D', text_ja: 'Analysis はモバイル専用、View はデスクトップ専用' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'View は Consumer 向けに公開された閲覧インターフェース。Analysis は Publisher が Studio で編集する旧来のツールであり、View がその後継にあたります。',
    difficulty: 'medium',
    tags: JSON.stringify(['view-vs-analysis']),
  },
  {
    order: 3,
    type: 'mcq',
    stem_ja: 'Publisher が果たす主な責任として、正しいものはどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'データモデルの物理ストレージを管理する' },
      { key: 'B', text_ja: 'Studio 内で View を設計し、KM に接続して公開する' },
      { key: 'C', text_ja: '公開された View のフィルタのみを調整する' },
      { key: 'D', text_ja: 'ライセンスと課金を管理する' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'Publisher は Studio 内で View を作成・編集し、Knowledge Model に接続して Publish 操作を行います。物理ストレージは Admin、ライセンス管理は Team Owner の役割です。',
    difficulty: 'easy',
    tags: JSON.stringify(['roles', 'publisher']),
  },
  {
    order: 4,
    type: 'mcq',
    stem_ja: 'Consumer が公開された View に対して実行できる操作はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'View のレイアウトを変更して保存する' },
      { key: 'B', text_ja: 'Knowledge Model の KPI 定義を書き換える' },
      { key: 'C', text_ja: 'Selection (フィルタ選択) を適用してデータを絞り込む' },
      { key: 'D', text_ja: '新しい Component を Tab に追加する' },
    ]),
    correctKeys: JSON.stringify(['C']),
    explain_ja:
      'Consumer は閲覧と Selection 適用のみ可能です。レイアウト変更・KPI 定義・Component 追加はすべて Publisher の権限領域です。',
    difficulty: 'medium',
    tags: JSON.stringify(['roles', 'consumer']),
  },
  {
    order: 5,
    type: 'mcq',
    stem_ja: 'View が配置され得る場所として正しいのはどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'Data Integration のみ' },
      { key: 'B', text_ja: 'Studio / App / Shared Space' },
      { key: 'C', text_ja: 'Team Settings のみ' },
      { key: 'D', text_ja: 'Action Flow 内部のみ' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'View は Studio (編集)、App (パッケージ化されたビジネスソリューション)、Shared Space (直接共有) の三つの場所に配置されます。',
    difficulty: 'medium',
    tags: JSON.stringify(['view-location']),
  },
  {
    order: 6,
    type: 'mcq',
    stem_ja: 'View と Knowledge Model (KM) の関係について、正しい説明はどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'View はデータを独自に保持し、KM とは独立している' },
      { key: 'B', text_ja: 'View は KM のオブジェクトと KPI を参照して描画される' },
      { key: 'C', text_ja: 'KM を更新しても View には影響しない' },
      { key: 'D', text_ja: 'KM は View 公開後に自動生成される' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'View 自体はデータを保持せず、すべての KPI・ディメンション・プロセス定義を KM から参照します。KM の更新はそれを参照するすべての View に影響します。',
    difficulty: 'medium',
    tags: JSON.stringify(['knowledge-model']),
  },
  {
    order: 7,
    type: 'mcq',
    stem_ja: 'App と View の関係として、正しいものはどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'App は単一の View と同義である' },
      { key: 'B', text_ja: 'App は複数の View と Action Flow を束ねたビジネスソリューション単位である' },
      { key: 'C', text_ja: 'View は App 内でのみ動作する' },
      { key: 'D', text_ja: 'App は Consumer 専用で Publisher は利用できない' },
    ]),
    correctKeys: JSON.stringify(['B']),
    explain_ja:
      'App は複数の View と Action Flow をパッケージ化した上位の単位で、Marketplace や内部配布で利用されます。View は App の外でも動作します。',
    difficulty: 'medium',
    tags: JSON.stringify(['app']),
  },
  {
    order: 8,
    type: 'mcq',
    stem_ja: 'Publisher が Draft を編集中のとき、Consumer 側の挙動として正しいものはどれか。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'Consumer は Draft の編集内容をリアルタイムで見る' },
      { key: 'B', text_ja: 'Consumer は View にアクセスできなくなる' },
      { key: 'C', text_ja: 'Consumer は直前に Publish された版を見続ける' },
      { key: 'D', text_ja: 'Consumer は自動的に Published 版に昇格する' },
    ]),
    correctKeys: JSON.stringify(['C']),
    explain_ja:
      'Draft と Published は独立したスナップショットです。Publisher が再 Publish するまで Consumer は既存の Published 版を閲覧し続けます。',
    difficulty: 'hard',
    tags: JSON.stringify(['publish-lifecycle']),
  },
  {
    order: 9,
    type: 'multi_select',
    stem_ja: 'View の "Last Refresh" に関する記述として正しいものをすべて選択してください。',
    options: JSON.stringify([
      { key: 'A', text_ja: 'データソースからデータモデルへの最終ロード時刻を示す' },
      { key: 'B', text_ja: 'View が Publish された時刻を示す' },
      { key: 'C', text_ja: '古い Last Refresh は View のデータが古い可能性を示唆する' },
      { key: 'D', text_ja: 'Consumer が View を最後に開いた時刻を示す' },
      { key: 'E', text_ja: 'KPI が期待値と異なる場合、最初に確認すべき指標の一つである' },
    ]),
    correctKeys: JSON.stringify(['A', 'C', 'E']),
    explain_ja:
      'Last Refresh はデータロード時刻を示し、データの鮮度指標です。View の Publish 時刻や Consumer のアクセス時刻ではありません。KPI 異常の排查では真っ先に確認すべき指標です。',
    difficulty: 'hard',
    tags: JSON.stringify(['last-refresh', 'data-freshness']),
  },
  {
    order: 10,
    type: 'true_false',
    stem_ja: 'Consumer は公開された View のレイアウトや KPI 定義を自由に編集・保存できる。',
    options: JSON.stringify([
      { key: 'T', text_ja: '正しい (True)' },
      { key: 'F', text_ja: '誤り (False)' },
    ]),
    correctKeys: JSON.stringify(['F']),
    explain_ja:
      '誤りです。Consumer は閲覧と Selection 適用のみ可能で、レイアウトや KPI 定義の編集は Publisher の権限です。',
    difficulty: 'easy',
    tags: JSON.stringify(['roles', 'permissions']),
  },
];
