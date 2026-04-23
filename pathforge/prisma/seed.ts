import { PrismaClient } from '@prisma/client';
import { CURRENT_USER_ID } from '../src/lib/constants';
import { CH01_MDX, CH01_QUESTIONS } from './seed-content/ch01';
import { CH02_MDX, CH02_QUESTIONS } from './seed-content/ch02';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning existing data...');
  await prisma.question.deleteMany();
  await prisma.chapterProgress.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.quest.deleteMany();
  await prisma.trail.deleteMany();
  await prisma.userStats.deleteMany();

  console.log('🌿 Creating Trail...');
  const trail = await prisma.trail.create({
    data: {
      slug: 'celonis-technical-expert',
      title_ja: 'Celonis Technical Expert',
      title_en: 'Celonis Technical Expert',
      description_ja: 'Celonis 認定試験の Technical Expert 資格取得を目指す学習パス。',
      description_en: 'Learning path toward the Celonis Technical Expert credential.',
      icon: 'shield',
      order: 0,
    },
  });

  console.log('⚔️ Creating Quest...');
  const quest = await prisma.quest.create({
    data: {
      slug: 'use-and-interpret-views',
      title_ja: 'Use and Interpret Views',
      title_en: 'Use and Interpret Views',
      description_ja:
        'Celonis Platform 上で公開された View を正しく操作し、KPI・Process Explorer・Variant Explorer などのコンポーネントを通じてプロセスの実態を読み解く力を養う。',
      description_en:
        'Master reading Celonis Views, KPIs, Process Explorer, and Variant Explorer components.',
      trailId: trail.id,
      order: 0,
      estimatedMinutes: 180,
      crestName: 'Shield of Insight',
      crestIcon: 'shield',
    },
  });

  console.log('📖 Creating Chapter 1...');
  const ch1 = await prisma.chapter.create({
    data: {
      slug: 'ch01-views-overview',
      title_ja: 'Celonis Views の概要',
      title_en: 'Celonis Views Overview',
      questId: quest.id,
      order: 0,
      contentMdx: CH01_MDX,
      estimatedMinutes: 22,
      insightReward: 380,
    },
  });

  for (const q of CH01_QUESTIONS) {
    await prisma.question.create({ data: { ...q, chapterId: ch1.id } });
  }
  console.log(`  ✅ Ch1 + ${CH01_QUESTIONS.length} questions`);

  console.log('📖 Creating Chapter 2...');
  const ch2 = await prisma.chapter.create({
    data: {
      slug: 'ch02-view-structure',
      title_ja: 'View の構造とナビゲーション',
      title_en: 'View Structure and Navigation',
      questId: quest.id,
      order: 1,
      contentMdx: CH02_MDX,
      estimatedMinutes: 24,
      insightReward: 420,
    },
  });

  for (const q of CH02_QUESTIONS) {
    await prisma.question.create({ data: { ...q, chapterId: ch2.id } });
  }
  console.log(`  ✅ Ch2 + ${CH02_QUESTIONS.length} questions`);

  console.log('👤 Creating UserStats...');
  await prisma.userStats.create({
    data: { userId: CURRENT_USER_ID },
  });

  console.log('🔓 Unlocking Ch1...');
  await prisma.chapterProgress.create({
    data: {
      userId: CURRENT_USER_ID,
      chapterId: ch1.id,
      status: 'available',
    },
  });

  console.log('✨ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
