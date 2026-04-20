# content/

PathForge の学習教材データ。各クエスト（認定試験）はディレクトリ単位で管理する。

## 構成

```
content/
  quests/
    use-and-interpret-views/      Celonis "Use and Interpret Views" 認定試験
      index.js                    クエスト・メタ情報（タイトル、章一覧、勋章マップ）
      ch01.js ... ch08.js         各章本文 + Trial 問題
      mock-exam.js                15 問模擬試験
```

## データ・スキーマ

### Quest（`index.js`）

```js
window.PFContent.quests['use-and-interpret-views'] = {
  id, slug, crest,
  title:    { ja, en },
  subtitle: { ja, en },
  cert_url, est_hours, total_insight, passing_score,
  chapters: [],   // ch01.js 等が push する
};
```

### Chapter（`ch0N.js`）

```js
{
  id, idx, duration_min, insight, crest,
  title:      { ja, en },
  summary:    { ja },
  objectives: [{ ja }],
  body: [
    { type:'para',    ja },
    { type:'h2',      ja },
    { type:'list',    items:[{ja}] },
    { type:'term',    en, ja, gloss_ja },
    { type:'callout', variant:'info'|'warn'|'success', ja },
    { type:'table',   headers:[{ja}], rows:[[{ja}]] },
    { type:'pql',     code, caption_ja },
    { type:'quote',   ja, cite },
  ],
  trial: {
    passing: 0.7,
    questions: [
      {
        id, type:'mcq'|'multi'|'truefalse',
        prompt_ja,
        options: [{ id:'a', ja }, ...],
        correct: 'b' | ['a','c'] | true,
        explain_ja,
        difficulty: 'easy'|'med'|'hard',
        tags: ['view','publisher'],
      }
    ]
  }
}
```

## 言語

本クエストは **日本語が一次言語**。英語術語は文中括弧で残す（例：「ビュー（View）」）。
将来 EN / ZH を追加する場合は `prompt_ja` → `prompt_en` のように key を増やす。
