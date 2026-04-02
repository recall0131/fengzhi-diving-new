CREATE TABLE IF NOT EXISTS page_hero (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lang VARCHAR(5) DEFAULT 'zh',
  hero_title VARCHAR(200),
  hero_subtitle VARCHAR(200),
  hero_image VARCHAR(500),
  hero_image_alt VARCHAR(200),
  hero_cta_text VARCHAR(100),
  hero_cta_link VARCHAR(200),
  hero_cta2_text VARCHAR(100),
  hero_cta2_link VARCHAR(200),
  hero_status VARCHAR(20) DEFAULT 'DRAFT',
  hero_sort INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_intro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intro_lang VARCHAR(5) DEFAULT 'zh',
  intro_title VARCHAR(200),
  intro_subtitle VARCHAR(200),
  intro_content TEXT,
  intro_image VARCHAR(500),
  intro_image_alt VARCHAR(200),
  intro_btn_text VARCHAR(100),
  intro_btn_link VARCHAR(200),
  intro_status VARCHAR(20) DEFAULT 'DRAFT',
  intro_sort INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_feature (
  id INT AUTO_INCREMENT PRIMARY KEY,
  feature_lang VARCHAR(5) DEFAULT 'zh',
  feature_title VARCHAR(200),
  feature_subtitle VARCHAR(200),
  feature_icon VARCHAR(100),
  feature_image VARCHAR(500),
  feature_description TEXT,
  feature_status VARCHAR(20) DEFAULT 'DRAFT',
  feature_sort INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_cta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cta_lang VARCHAR(5) DEFAULT 'zh',
  cta_title VARCHAR(200),
  cta_subtitle VARCHAR(200),
  cta_btn_text VARCHAR(100),
  cta_btn_link VARCHAR(200),
  cta_status VARCHAR(20) DEFAULT 'DRAFT',
  cta_sort INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_navigation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nav_name VARCHAR(100),
  nav_url VARCHAR(200),
  nav_order INT DEFAULT 0,
  nav_position VARCHAR(20) DEFAULT 'header',
  nav_lang VARCHAR(5) DEFAULT 'zh',
  nav_status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_code VARCHAR(50),
  page_lang VARCHAR(5) DEFAULT 'zh',
  page_title VARCHAR(200),
  page_content TEXT,
  page_seo_title VARCHAR(200),
  page_seo_description TEXT,
  page_seo_keywords VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE,
  config_value TEXT,
  config_lang VARCHAR(5) DEFAULT 'zh',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(50) UNIQUE,
  course_lang VARCHAR(5) DEFAULT 'zh',
  course_name VARCHAR(200),
  course_tag VARCHAR(50),
  course_description TEXT,
  course_image VARCHAR(500),
  course_image_alt VARCHAR(200),
  course_price VARCHAR(50),
  course_days VARCHAR(50),
  course_status INT DEFAULT 1,
  course_sort INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
