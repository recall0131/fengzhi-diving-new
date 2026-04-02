-- Migrate nav_status from INT to VARCHAR
-- 1 = ACTIVE, 0 = INACTIVE
ALTER TABLE page_navigation MODIFY nav_status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL;
UPDATE page_navigation SET nav_status = CASE WHEN nav_status = 1 THEN 'ACTIVE' ELSE 'INACTIVE' END;
