import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAdmin } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  // Require admin auth
  const auth = verifyAdmin(req);
  if (!auth.authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();

  // Clear existing data
  db.exec('DELETE FROM enrollments; DELETE FROM equipment; DELETE FROM travel_packages; DELETE FROM destinations; DELETE FROM courses;');

  // Seed courses
  const courses = [
    { name_zh: 'PADI 开放水域潜水员 (OWD)', name_en: 'PADI Open Water Diver (OWD)', short_desc_zh: '开启您的潜水之旅，全球认可', short_desc_en: 'Start your diving journey with worldwide recognition', description_zh: '开启您的潜水之旅，全球认可。完成此课程后，您将能够在开放水域独立潜水，最大深度18米。', description_en: 'Start your diving journey with worldwide recognition. After completing this course, you can dive independently in open water up to 18 meters.', price: 2800, duration: '4天', duration_en: '4 Days', level: 'beginner', level_zh: '入门', hero_image: '/images/hero-instructor.jpg', featured: 1, sort_order: 1 },
    { name_zh: 'PADI 进阶开放水域潜水员 (AOWD)', name_en: 'PADI Advanced Open Water (AOWD)', short_desc_zh: '提升潜水技能，探索更深的水域', short_desc_en: 'Elevate your diving skills and explore deeper sites', description_zh: '提升您的潜水技能，探索更深的水域和更有挑战性的潜点。完成课程后，最大深度可达30米。', description_en: 'Elevate your diving skills and explore deeper, more challenging sites. Max depth increases to 30 meters upon completion.', price: 2200, duration: '3天', duration_en: '3 Days', level: 'intermediate', level_zh: '进阶', hero_image: '/images/course-aow.jpg', featured: 1, sort_order: 2 },
    { name_zh: 'PADI 救援潜水员 (Rescue)', name_en: 'PADI Rescue Diver (Rescue)', short_desc_zh: '学习紧急救援，成为更安全的潜水员', short_desc_en: 'Learn emergency rescue and become a safer diver', description_zh: '学习如何识别和处理潜水紧急情况，成为更安全的潜水员。此课程是成为PADI专业潜水员的第一步。', description_en: 'Learn to identify and handle diving emergencies, becoming a safer diver. This is the first step toward becoming a PADI professional.', price: 1800, duration: '5天', duration_en: '5 Days', level: 'advanced', level_zh: '专业', hero_image: '/images/hero-rescue.jpg', featured: 0, sort_order: 3 },
    { name_zh: 'PADI 紧急第一反应 (EFR)', name_en: 'PADI Emergency First Response (EFR)', short_desc_zh: '心肺复苏和急救技能', short_desc_en: 'Learn CPR and first aid skills', description_zh: '学习心肺复苏和急救技能，适用于所有潜水员和非潜水员。', description_en: 'Learn CPR and first aid skills. Open to both divers and non-divers.', price: 980, duration: '1天', duration_en: '1 Day', level: 'beginner', level_zh: '入门', hero_image: '/images/hero-diver.jpg', featured: 0, sort_order: 4 },
    { name_zh: 'PADI 潜水长 (Divemaster)', name_en: 'PADI Divemaster', short_desc_zh: '成为PADI专业潜水员的起点', short_desc_en: 'First step to becoming a PADI professional', description_zh: '成为PADI专业潜水员的起点，可独立带领潜水员进行潜水活动。', description_en: 'The first step to becoming a PADI professional. Can lead certified divers on diving activities independently.', price: 8800, duration: '7天+', duration_en: '7+ Days', level: 'professional', level_zh: '专业', hero_image: '/images/hero-instructor.jpg', featured: 0, sort_order: 5 },
  ];

  const insertCourse = db.prepare(`
    INSERT INTO courses (name_zh, name_en, short_desc_zh, short_desc_en, description_zh, description_en, price, duration, duration_en, level, level_zh, hero_image, featured, sort_order)
    VALUES (@name_zh, @name_en, @short_desc_zh, @short_desc_en, @description_zh, @description_en, @price, @duration, @duration_en, @level, @level_zh, @hero_image, @featured, @sort_order)
  `);

  for (const c of courses) {
    insertCourse.run(c);
  }

  // Seed destinations
  const destinations = [
    { name_zh: '帕劳蓝洞', name_en: 'Palau Blue Hole', location: '帕劳', location_en: 'Palau', description_zh: '世界顶级潜水圣地，壮观的蓝洞和丰富的海洋生物。蓝洞是潜水员必去的朝圣地。', description_en: 'World-class dive site: spectacular blue hole and rich marine life. The blue hole is a pilgrimage site for divers.', hero_image: '/images/hero-coron.jpg', featured: 1, sort_order: 1 },
    { name_zh: '马尔代夫', name_en: 'Maldives', location: '印度洋', location_en: 'Indian Ocean', description_zh: '热带天堂，清澈的海水和绚丽的珊瑚礁。环礁众多，是世界上最适合潜水的地方之一。', description_en: 'Tropical paradise with crystal-clear waters and coral reefs. Numerous atolls make it one of the best diving destinations in the world.', hero_image: '/images/hero-maldives.jpg', featured: 1, sort_order: 2 },
    { name_zh: '大堡礁', name_en: 'Great Barrier Reef', location: '澳大利亚', location_en: 'Australia', description_zh: '世界最大的珊瑚礁系统，独特的海洋生态系统。长达2300公里，是潜水者的终极梦想。', description_en: "World's largest coral reef system with unique marine ecosystem. Spanning 2,300km — the ultimate dream for divers.", hero_image: '/images/dest-gbr.jpg', featured: 1, sort_order: 3 },
    { name_zh: '科隆沉船', name_en: 'Coron Shipwrecks', location: '菲律宾巴拉望', location_en: 'Palawan, Philippines', description_zh: '二战沉船潜水的终极目的地。多艘日本战舰沉没于此，水下遗迹保存完好。', description_en: 'The ultimate WWII shipwreck diving destination. Several Japanese warships rest here, perfectly preserved.', hero_image: '/images/hero-coron.jpg', featured: 0, sort_order: 4 },
    { name_zh: '冲绳', name_en: 'Okinawa', location: '日本冲绳', location_en: 'Okinawa, Japan', description_zh: '青洞蓝光与座头鲸同游。独特的蓝洞潜点和冬季鲸鲨相遇让人难忘。', description_en: 'Blue Hole magic and humpback whale encounters. The unique Blue Hole and winter whale shark meetings are unforgettable.', hero_image: '/images/hero-okinawa.jpg', featured: 0, sort_order: 5 },
    { name_zh: '三亚', name_en: 'Sanya', location: '中国海南', location_en: 'Hainan, China', description_zh: '离家最近的潜水天堂。丰富的软珊瑚和热带鱼群，适合各级别潜水员。', description_en: "The closest dive paradise to home. Rich soft corals and tropical fish, suitable for all levels.", hero_image: '/images/hero-sanya.jpg', featured: 0, sort_order: 6 },
  ];

  const insertDest = db.prepare(`
    INSERT INTO destinations (name_zh, name_en, location, location_en, description_zh, description_en, hero_image, featured, sort_order)
    VALUES (@name_zh, @name_en, @location, @location_en, @description_zh, @description_en, @hero_image, @featured, @sort_order)
  `);

  for (const d of destinations) {
    insertDest.run(d);
  }

  // Seed travel packages (linked to destinations)
  const travelPackages = [
    { destination_id: 1, name_zh: '帕劳5天4晚潜水套餐', name_en: 'Palau 5D4N Dive Package', description_zh: '帕劳经典潜水行程，包含4次船潜，探访蓝洞和德国水道', description_en: 'Classic Palau diving itinerary with 4 boat dives visiting Blue Hole and German Channel', price: 12800, duration: '5天4晚', duration_en: '5D4N', includes_zh: '4次船潜+蓝洞潜水、全套装备、4晚住宿、每日早餐', includes_en: '4 boat dives including Blue Hole, full gear rental, 4 nights accommodation, daily breakfast', hero_image: '/images/hero-coron.jpg', featured: 1, sort_order: 1 },
    { destination_id: 2, name_zh: '马尔代夫7天船宿潜水', name_en: 'Maldives 7D Liveaboard', description_zh: '马尔代夫船宿潜水之旅，环礁巡游，最佳潜点全覆盖', description_en: 'Maldives liveaboard diving — cruise the atolls and hit the best dive sites', price: 18800, duration: '7天6晚', duration_en: '7D6N', includes_zh: '6晚船宿、每日3次潜水、全套装备、餐食', includes_en: '6 nights on boat, 3 dives daily, full gear rental, all meals', hero_image: '/images/hero-maldives.jpg', featured: 1, sort_order: 2 },
    { destination_id: 3, name_zh: '大堡礁船宿潜水8天', name_en: 'GBR 8D Liveaboard Expedition', description_zh: '深入大堡礁核心区域，探索原始珊瑚礁和深海海洋生物', description_en: 'Deep dive into the heart of the GBR — pristine reefs and pelagic marine life', price: 22000, duration: '8天7晚', duration_en: '8D7N', includes_zh: '7晚船宿、每日3-4潜、深潜装备、专业向导', includes_en: '7 nights liveaboard, 3-4 dives daily, deep diving gear, expert guide', hero_image: '/images/dest-gbr.jpg', featured: 0, sort_order: 3 },
  ];

  const insertTravel = db.prepare(`
    INSERT INTO travel_packages (destination_id, name_zh, name_en, description_zh, description_en, price, duration, duration_en, includes_zh, includes_en, hero_image, featured, sort_order)
    VALUES (@destination_id, @name_zh, @name_en, @description_zh, @description_en, @price, @duration, @duration_en, @includes_zh, @includes_en, @hero_image, @featured, @sort_order)
  `);

  for (const t of travelPackages) {
    insertTravel.run(t);
  }

  const count = {
    courses: (db.prepare('SELECT COUNT(*) as c FROM courses').get() as any).c,
    destinations: (db.prepare('SELECT COUNT(*) as c FROM destinations').get() as any).c,
    travel: (db.prepare('SELECT COUNT(*) as c FROM travel_packages').get() as any).c,
  };

  return NextResponse.json({ ok: true, message: '数据初始化完成', ...count });
}
