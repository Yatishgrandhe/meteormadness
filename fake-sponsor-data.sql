-- Fake sponsorship data for TSA website
-- Run this SQL in your Supabase SQL Editor after the main schema has been created

-- Insert fake sponsor submissions with realistic data
INSERT INTO sponsor_submissions (company_name, contact_name, email, phone, sponsorship_level, message, status, created_at) VALUES

-- Platinum Level Sponsors
('TechCorp Solutions', 'Sarah Johnson', 'sarah.johnson@techcorp.com', '(555) 123-4567', 'Platinum', 'We are excited to support the next generation of technology leaders. Our company believes in fostering innovation and creativity in STEM education.', 'confirmed', NOW() - INTERVAL '5 days'),

('InnovateTech Industries', 'Michael Chen', 'm.chen@innovatetech.com', '(555) 234-5678', 'Platinum', 'As a leading technology company, we are proud to sponsor CATA TSA. We look forward to seeing the amazing projects and innovations from your students.', 'contacted', NOW() - INTERVAL '3 days'),

-- Gold Level Sponsors
('Future Systems Inc', 'Emily Rodriguez', 'emily.rodriguez@futuresystems.com', '(555) 345-6789', 'Gold', 'Supporting education and technology is at the core of our company values. We are thrilled to be part of this initiative.', 'confirmed', NOW() - INTERVAL '7 days'),

('Digital Dynamics', 'David Kim', 'david.kim@digitaldynamics.com', '(555) 456-7890', 'Gold', 'We believe in empowering students with the tools and knowledge they need to succeed in the digital age. Happy to support TSA!', 'new', NOW() - INTERVAL '1 day'),

('CyberTech Solutions', 'Lisa Wang', 'lisa.wang@cybertech.com', '(555) 567-8901', 'Gold', 'Our company is committed to supporting STEM education and fostering the next generation of cybersecurity professionals.', 'contacted', NOW() - INTERVAL '4 days'),

-- Silver Level Sponsors
('CodeCraft Studios', 'James Thompson', 'james.thompson@codecraft.com', '(555) 678-9012', 'Silver', 'As a software development company, we understand the importance of hands-on learning. Excited to support your TSA chapter!', 'confirmed', NOW() - INTERVAL '6 days'),

('DataFlow Technologies', 'Maria Garcia', 'maria.garcia@dataflow.com', '(555) 789-0123', 'Silver', 'We specialize in data analytics and are passionate about supporting students who are interested in data science and technology.', 'new', NOW() - INTERVAL '2 days'),

('CloudBase Systems', 'Robert Lee', 'robert.lee@cloudbase.com', '(555) 890-1234', 'Silver', 'Cloud computing is the future, and we want to help students understand its potential. Proud to sponsor CATA TSA!', 'contacted', NOW() - INTERVAL '8 days'),

('AI Innovations Lab', 'Jennifer Brown', 'jennifer.brown@aiinnovations.com', '(555) 901-2345', 'Silver', 'Artificial intelligence is transforming our world. We are excited to support students who are exploring this fascinating field.', 'new', NOW() - INTERVAL '12 hours'),

-- Bronze Level Sponsors
('StartupTech Ventures', 'Alex Martinez', 'alex.martinez@startuptech.com', '(555) 012-3456', 'Bronze', 'As a startup, we understand the importance of innovation and creativity. We are happy to support young entrepreneurs and technologists.', 'confirmed', NOW() - INTERVAL '9 days'),

('GreenTech Solutions', 'Amanda Wilson', 'amanda.wilson@greentech.com', '(555) 123-4567', 'Bronze', 'Sustainability and technology go hand in hand. We are proud to support students who are working on environmentally conscious projects.', 'new', NOW() - INTERVAL '6 hours'),

('MobileFirst Apps', 'Kevin Zhang', 'kevin.zhang@mobilefirst.com', '(555) 234-5678', 'Bronze', 'Mobile technology is everywhere, and we want to help students understand how to create amazing mobile experiences.', 'contacted', NOW() - INTERVAL '10 days'),

('WebDev Masters', 'Rachel Davis', 'rachel.davis@webdevmasters.com', '(555) 345-6789', 'Bronze', 'Web development is a crucial skill in today''s digital world. We are excited to support students who are learning to build the web.', 'new', NOW() - INTERVAL '3 hours'),

-- Other Level Sponsors
('Local Business Association', 'Tom Anderson', 'tom.anderson@localbiz.com', '(555) 456-7890', 'Other', 'Our local business community is proud to support the talented students at CATA. We believe in investing in our future workforce.', 'confirmed', NOW() - INTERVAL '11 days'),

('Community Foundation', 'Susan Taylor', 'susan.taylor@communityfoundation.org', '(555) 567-8901', 'Other', 'Education is the foundation of a strong community. We are honored to support the Technology Student Association at CATA.', 'contacted', NOW() - INTERVAL '13 days'),

('Parent-Teacher Organization', 'Mark Johnson', 'mark.johnson@catapto.org', '(555) 678-9012', 'Other', 'As parents, we are thrilled to see our children engaged in technology and innovation. We are proud to support this program.', 'new', NOW() - INTERVAL '1 hour'),

('Alumni Network', 'Jessica Park', 'jessica.park@cataalumni.com', '(555) 789-0123', 'Other', 'As CATA alumni working in tech, we want to give back to the program that helped shape our careers. Go TSA!', 'confirmed', NOW() - INTERVAL '14 days'),

-- Additional recent submissions
('RoboTech Industries', 'Carlos Mendez', 'carlos.mendez@robotech.com', '(555) 890-1234', 'Gold', 'Robotics and automation are the future of industry. We are excited to support students who are exploring these cutting-edge technologies.', 'new', NOW() - INTERVAL '30 minutes'),

('VR Experience Labs', 'Nicole Foster', 'nicole.foster@vrexperience.com', '(555) 901-2345', 'Silver', 'Virtual and augmented reality are opening up new possibilities in education and entertainment. We are proud to support TSA students.', 'new', NOW() - INTERVAL '15 minutes'),

('Blockchain Solutions', 'Daniel Kim', 'daniel.kim@blockchainsolutions.com', '(555) 012-3456', 'Other', 'Blockchain technology is revolutionizing how we think about data and transactions. We want to help students understand its potential.', 'new', NOW() - INTERVAL '5 minutes');

-- Verify the data was inserted correctly
SELECT 
    COUNT(*) as total_submissions,
    COUNT(*) FILTER (WHERE status = 'new') as new_submissions,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_submissions,
    COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_submissions,
    COUNT(*) FILTER (WHERE sponsorship_level = 'Platinum') as platinum_sponsors,
    COUNT(*) FILTER (WHERE sponsorship_level = 'Gold') as gold_sponsors,
    COUNT(*) FILTER (WHERE sponsorship_level = 'Silver') as silver_sponsors,
    COUNT(*) FILTER (WHERE sponsorship_level = 'Bronze') as bronze_sponsors,
    COUNT(*) FILTER (WHERE sponsorship_level = 'Other') as other_sponsors
FROM sponsor_submissions;
