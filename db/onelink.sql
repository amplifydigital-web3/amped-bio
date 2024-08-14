-- onelink.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `littlelink_name` varchar(255) DEFAULT NULL,
  `littlelink_description` longtext DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `block` varchar(255) NOT NULL DEFAULT 'no',
  `remember_token` varchar(255) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `auth_as` int(11) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `reward_business_id` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  UNIQUE KEY (email),
  UNIQUE KEY (littlelink_name),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- onelink.buttons definition
CREATE TABLE `buttons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `alt` varchar(1024) DEFAULT NULL,
  `exclude` tinyint(4) NOT NULL DEFAULT 0,
  `group` varchar(255) DEFAULT NULL,
  `mb` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- failed_jobs definition

CREATE TABLE `failed_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `uuid` varchar(255) not null, 
  `connection` text not null, 
  `queue` text not null, 
  `payload` text not null, 
  `exception` text not null, 
  `failed_at` datetime default CURRENT_TIMESTAMP not null,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  UNIQUE KEY (`uuid`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- link_types definition

CREATE TABLE `link_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `typename` varchar(1024) not null, 
  `title` varchar(1024), 
  `description` varchar(1024), 
  `icon` varchar(1024) not null, 
  `params` varchar(1024), 
  `active` int1 not null default '1',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- onelink.links definition

CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `button_id` int(11) DEFAULT NULL,
  `link` longtext DEFAULT NULL,
  `title` longtext DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `click_number` int(11) NOT NULL DEFAULT 0,
  `up_link` varchar(255) NOT NULL DEFAULT 'no',
  `custom_css` varchar(255) NOT NULL DEFAULT '',
  `custom_icon` varchar(255) NOT NULL DEFAULT 'fa-external-link',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `button_id` (`button_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `links_fk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `links_fk_2` FOREIGN KEY (`button_id`) REFERENCES `buttons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- onelink.migrations definition

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `migration` varchar(1024) NOT NULL,
  `batch` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- pages definition

-- onelink.pages definition

CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `terms` text DEFAULT NULL,
  `privacy` text DEFAULT NULL,
  `contact` text DEFAULT NULL,
  `home_message` text DEFAULT NULL,
  `register` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- onelink.password_resets definition

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(1024) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- onelink.social_accounts definition

CREATE TABLE `social_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `provider_name` varchar(1024) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `provider_id` (`provider_id`) USING HASH,
  KEY `social_accounts_fk_1` (`user_id`),
  CONSTRAINT `social_accounts_fk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- onelink.visits definition

CREATE TABLE `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `primary_key` varchar(255) NOT NULL,
  `secondary_key` varchar(255) DEFAULT NULL,
  `score` int(11) NOT NULL,
  `list` text DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `primary_key` (`primary_key`,`secondary_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---
INSERT INTO onelink.users (name,email,email_verified_at,password,littlelink_name,littlelink_description,`role`,block,remember_token,theme,auth_as,provider,provider_id,image,reward_business_id,created_at,updated_at) VALUES
	 ('Viet Le','viet@oneiro.io','0001-01-01 00:00:00.000','$2y$10$D0F7w/pfF3MhHGds567xuOF1vpF3zpwFegVRAXxVKIg3LHf/4gPXe','oneiro','','admin','no',NULL,NULL,NULL,NULL,NULL,'{"checkmark":true,"disable-sharebtn":false,"links-new-tab":true}','0b576932-7678-41ad-9e96-c7b2aec4244e','2024-06-13 20:59:54.000','2024-06-18 19:09:29.000');

----
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('custom','Custom',1,'default',0,NULL,NULL),
	 ('custom_website','Custom Website',1,'default',0,NULL,NULL),
	 ('bandcamp','Bandcamp',0,'default',0,NULL,NULL),
	 ('buy me a coffee','Buy Me a Coffee',0,'default',0,NULL,NULL),
	 ('cashapp','Cash App',0,'default',0,NULL,NULL),
	 ('default email','Default Email',1,'default',0,NULL,NULL),
	 ('default email_alt','Default Email Alt',1,'default',0,NULL,NULL),
	 ('discord','Discord',0,'default',0,NULL,NULL),
	 ('facebook','Facebook',0,'default',0,NULL,NULL),
	 ('figma','Figma',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('github','GitHub',0,'default',0,NULL,NULL),
	 ('gitlab','GitLab',0,'default',0,NULL,NULL),
	 ('goodreads','Goodreads',0,'default',0,NULL,NULL),
	 ('instagram','Instagram',0,'default',0,NULL,NULL),
	 ('kit','Kit',0,'default',0,NULL,NULL),
	 ('linkedin','LinkedIn',0,'default',0,NULL,NULL),
	 ('mastodon','Mastodon',0,'default',0,NULL,NULL),
	 ('medium','Medium',0,'default',0,NULL,NULL),
	 ('messenger','Messenger',0,'default',0,NULL,NULL),
	 ('patreon','Patreon',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('paypal','PayPal',0,'default',0,NULL,NULL),
	 ('pinterest','Pinterest',0,'default',0,NULL,NULL),
	 ('reddit','Reddit',0,'default',0,NULL,NULL),
	 ('signal','Signal',0,'default',0,NULL,NULL),
	 ('skoob','Skoob',0,'default',0,NULL,NULL),
	 ('snapchat','Snapchat',0,'default',0,NULL,NULL),
	 ('soundcloud','SoundCloud',0,'default',0,NULL,NULL),
	 ('spotify','Spotify',0,'default',0,NULL,NULL),
	 ('steam','Steam',0,'default',0,NULL,NULL),
	 ('telegram','Telegram',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('tiktok','TikTok',0,'default',0,NULL,NULL),
	 ('tumblr','Tumblr',0,'default',0,NULL,NULL),
	 ('twitch','Twitch',0,'default',0,NULL,NULL),
	 ('twitter','Twitter',0,'default',0,NULL,NULL),
	 ('venmo','Venmo',0,'default',0,NULL,NULL),
	 ('vimeo','Vimeo',0,'default',0,NULL,NULL),
	 ('website','Website',1,'default',0,NULL,NULL),
	 ('whatsapp','WhatsApp',0,'default',0,NULL,NULL),
	 ('wordpress','WordPress',0,'default',0,NULL,NULL),
	 ('xing','Xing',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('youtube','YouTube',0,'default',0,NULL,NULL),
	 ('heading','Heading',1,'default',0,NULL,NULL),
	 ('space','Space',1,'default',0,NULL,NULL),
	 ('phone','Phone',1,'default',0,NULL,NULL),
	 ('trello','Trello',0,'default',0,NULL,NULL),
	 ('littlelink-custom','LittleLink Custom',1,'default',0,NULL,NULL),
	 ('space','Space',1,'default',0,NULL,NULL),
	 ('amazon','Amazon',0,'default',0,NULL,NULL),
	 ('appstore','App Store',0,'default',0,NULL,NULL),
	 ('apple-music','Apple Music',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('apple-podcasts','Apple Podcasts',0,'default',0,NULL,NULL),
	 ('briar','Briar',0,'default',0,NULL,NULL),
	 ('castopod','Castopod',0,'default',0,NULL,NULL),
	 ('codepen','CodePen',0,'default',0,NULL,NULL),
	 ('codeberg','Codeberg',0,'default',0,NULL,NULL),
	 ('cryptpad','CryptPad',0,'default',0,NULL,NULL),
	 ('dev-to','Dev.to',0,'default',0,NULL,NULL),
	 ('deezer','Deezer',0,'default',0,NULL,NULL),
	 ('epic-games','Epic Games',0,'default',0,NULL,NULL),
	 ('etsy','Etsy',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('firefox','Firefox',0,'default',0,NULL,NULL),
	 ('flickr','Flickr',0,'default',0,NULL,NULL),
	 ('funkwhale','Funkwhale',0,'default',0,NULL,NULL),
	 ('f-droid','F-Droid',0,'default',0,NULL,NULL),
	 ('itchio','Itch.io',0,'default',0,NULL,NULL),
	 ('humble-bundle','Humble Bundle',0,'default',0,NULL,NULL),
	 ('kickstarter','Kickstarter',0,'default',0,NULL,NULL),
	 ('ko-fi','Ko-fi',0,'default',0,NULL,NULL),
	 ('lemmy','Lemmy',0,'default',0,NULL,NULL),
	 ('letterboxd','Letterboxd',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('liberapay','Liberapay',0,'default',0,NULL,NULL),
	 ('matrix','Matrix',0,'default',0,NULL,NULL),
	 ('misskey','Misskey',0,'default',0,NULL,NULL),
	 ('notion','Notion',0,'default',0,NULL,NULL),
	 ('odysee','Odysee',0,'default',0,NULL,NULL),
	 ('openstreetmap','OpenStreetMap',0,'default',0,NULL,NULL),
	 ('owncast','Owncast',0,'default',0,NULL,NULL),
	 ('peertube','PeerTube',0,'default',0,NULL,NULL),
	 ('pixelfed','Pixelfed',0,'default',0,NULL,NULL),
	 ('piwigo','Piwigo',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('playstore','Play Store',0,'default',0,NULL,NULL),
	 ('pleroma','Pleroma',0,'default',0,NULL,NULL),
	 ('producthunt','Product Hunt',0,'default',0,NULL,NULL),
	 ('session','Session',0,'default',0,NULL,NULL),
	 ('strava','Strava',0,'default',0,NULL,NULL),
	 ('unity','Unity',0,'default',0,NULL,NULL),
	 ('unraid','Unraid',0,'default',0,NULL,NULL),
	 ('untappd','Untappd',0,'default',0,NULL,NULL),
	 ('upptime','Upptime',0,'default',0,NULL,NULL),
	 ('vrchat','VRChat',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('youtube-music','YouTube Music',0,'default',0,NULL,NULL),
	 ('all-inkl','All-Inkl',0,'default',0,NULL,NULL),
	 ('text','Text',1,'default',0,NULL,NULL),
	 ('icon','Icon',1,'default',0,NULL,NULL),
	 ('bookwyrm','Bookwyrm',0,'default',0,NULL,NULL),
	 ('vcard','vCard',1,'default',0,NULL,NULL),
	 ('apple-books','Apple Books',0,'default',0,NULL,NULL),
	 ('scribd','Scribd',0,'default',0,NULL,NULL),
	 ('linkstack','LinkStack',0,'default',0,NULL,NULL),
	 ('picarto','Picarto',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('trakt','Trakt',0,'default',0,NULL,NULL),
	 ('last-fm','Last.fm',0,'default',0,NULL,NULL),
	 ('itaku','Itaku',0,'default',0,NULL,NULL),
	 ('furaffinity','Furaffinity',0,'default',0,NULL,NULL),
	 ('bluesky','Bluesky',0,'default',0,NULL,NULL),
	 ('firefish','Firefish',0,'default',0,NULL,NULL),
	 ('streams','Streams',0,'default',0,NULL,NULL),
	 ('pronounspage','Pronouns.page',0,'default',0,NULL,NULL),
	 ('booth','BOOTH',0,'default',0,NULL,NULL),
	 ('hearthisat','HearThis.at',0,'default',0,NULL,NULL);
INSERT INTO buttons (name,alt,`exclude`,`group`,mb,created_at,updated_at) VALUES
	 ('throne','Throne',0,'default',0,NULL,NULL),
	 ('behance','Behance',0,'default',0,NULL,NULL),
	 ('gdrive','Google Drive',0,'default',0,NULL,NULL),
	 ('friendica','Friendi.ca',0,'default',0,NULL,NULL),
	 ('simplex','Simplex',0,'default',0,NULL,NULL);


---
INSERT INTO onelink.link_types (typename,title,description,icon,params,active,created_at,updated_at) VALUES
	 ('predefined','Predefined Site','Select from a list of predefined websites and have your link automatically styled using that sites brand colors and icon.','bi bi-boxes',NULL,1,NULL,NULL),
	 ('link','Custom Link','Create a Custom Link that goes to any website. Customize the button styling and icon, or use the favicon from the website as the button icon.','bi bi-link','[{
                "tag": "input",
                "id": "link_title",
                "for": "link_title",
                "label": "Link Title *",
                "type": "text",
                "name": "link_title",
                "class": "form-control",
                "tip": "Enter a title for this link",
                "required": "required"
            },
            {
                "tag": "input",
                "id": "link_url",
                "for": "link_url",
                "label": "Link Address *",
                "type": "text",
                "name": "link_url",
                "class": "form-control",
                "tip": "Enter the website address",
                "required": "required"
            }
            ]',1,NULL,NULL),
	 ('heading','Heading','Use headings to organize your links and separate them into groups.','bi bi-card-heading','[{
                "tag": "input",
                "id": "heading-text",
                "for": "link_title",
                "label": "Heading Text",
                "type": "text",
                "name": "link_title",
                "class": "form-control"
            }]',1,NULL,NULL),
	 ('spacer','Spacer','Add blank space to your list of links. You can choose how tall.','bi bi-distribute-vertical','[
    {
        "tag": "input",
        "type": "number",
        "min": "1","max":"10",
        "name": "spacer_size",
        "id": "spacer_size",
        "value": 3
    }
]',1,NULL,NULL),
	 ('text','Text','Add static text to your page that is not clickable.','bi bi-fonts','[{
                "tag": "textarea",
                "id": "static-text",
                "for": "static_text",
                "label": "Text",
                "name": "static_text",
                "class": "form-control"
            }
            ]',1,NULL,NULL),
	 ('email','E-Mail address','Add an email that opens a system dialog to compose a new email.','bi bi-envelope-fill',NULL,1,NULL,NULL),
	 ('telephone','Telephone number','Add a telephone number that opens a system dialog to initiate a phone call.','bi bi-telephone-fill',NULL,1,NULL,NULL),
	 ('vcard','Vcard','Create or upload an electronic business card.','bi bi-person-square',NULL,1,NULL,NULL);

---
INSERT INTO onelink.pages (terms,privacy,contact,home_message,register,created_at,updated_at) VALUES
	 ('
<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>1. AGREEMENT TO TERMS</strong></p>

<p>You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>

<p>Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time. We will alert you about any changes by updating the &ldquo;Last updated&rdquo; date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.</p>

<p>The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>2.&nbsp;INTELLECTUAL PROPERTY RIGHTS</strong></p>

<p><a href="https://linkstack.org/">LinkStack</a> is licensed under the GNU Affero General Public License v3.0.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>3.&nbsp;USER REPRESENTATIONS</strong></p>

<p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;&nbsp;(3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13;&nbsp;(5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.</p>

<p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).</p>

<p><strong>4.&nbsp;USER REGISTRATION</strong></p>

<p>You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>

<p><strong>5.&nbsp;PROHIBITED ACTIVITIES</strong></p>

<p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

<p>As a user of the Site, you agree not to:</p>

<ul>
	<li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
	<li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
	<li>Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li>
	<li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
	<li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
	<li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
	<li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
	<li>Engage in unauthorized framing of or linking to the Site.</li>
	<li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party&rsquo;s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.</li>
	<li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
	<li>Delete the copyright or other proprietary rights notice from any Content.</li>
	<li>Attempt to impersonate another user or person or use the username of another user.</li>
	<li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (&ldquo;gifs&rdquo;), 1&times;1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as &ldquo;spyware&rdquo; or &ldquo;passive collection mechanisms&rdquo; or &ldquo;pcms&rdquo;).</li>
	<li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
	<li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.</li>
	<li>Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.</li>
	<li>Copy or adapt the Site&rsquo;s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
	<li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.</li>
	<li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li>
	<li>Use a buying agent or purchasing agent to make purchases on the Site.</li>
	<li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
	<li>Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
</ul>

<p><strong>6.&nbsp;USER GENERATED CONTRIBUTIONS</strong></p>

<p>The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &quot;Contributions&quot;). Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:</p>

<ul>
	<li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
	<li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms of Use.</li>
	<li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use.</li>
	<li>Your Contributions are not false, inaccurate, or misleading.</li>
	<li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
	<li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
	<li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
	<li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
	<li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
	<li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
	<li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
	<li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
	<li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.</li>
</ul>

<p>Any use of the Site in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Site.</p>

<p><strong>7.&nbsp;CONTRIBUTION LICENSE</strong></p>

<p>By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.</p>

<p>This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.</p>

<p>We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.</p>

<p>We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Site; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.</p>

<p><strong>8.&nbsp;SUBMISSIONS</strong></p>

<p>You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site (&quot;Submissions&quot;) provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.</p>

<p><strong>9.&nbsp;THIRD-PARTY WEBSITE AND CONTENT</strong></p>

<p>The Site may contain (or you may be sent via the Site) links to other websites (&quot;Third-Party Websites&quot;) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (&quot;Third-Party Content&quot;). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Site or relating to any applications you use or install from the Site. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>10.&nbsp;SITE MANAGEMENT</strong></p>

<p>We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>11.&nbsp;TERM AND TERMINATION</strong></p>

<p>These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND&nbsp;ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>

<p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>12.&nbsp;MODIFICATIONS AND INTERRUPTIONS</strong></p>

<p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.</p>

<p>We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>13.&nbsp;DISCLAIMER</strong></p>

<p>THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE&rsquo;S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>14.&nbsp;LIMITATIONS OF LIABILITY</strong></p>

<p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>15.&nbsp;INDEMNIFICATION</strong></p>

<p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&rsquo; fees and expenses, made by any third party due to or arising out of: (1) your Contributions;&nbsp;(2) use of the Site; (3) breach of these Terms of Use; (4) any breach of your representations and warranties set forth in these Terms of Use; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p>

<p><strong><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAAAEZ0lGZwAAAAp8We1TAAAADGNtUFBKQ21wMDcxMgAAAAdPbbelAAAACklEQVQY02NgAAAAAgABmGNs1wAAAABJRU5ErkJggg==" style="height:1px; width:1px" /></strong><strong>16.&nbsp;USER DATA</strong></p>

<p>We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p>

<p><strong>17.&nbsp;MISCELLANEOUS</strong></p>

<p>These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.</p>
','
<p><strong>1. WHAT INFORMATION DO WE COLLECT?</strong></p>

<p><strong>Personal information you disclose to us</strong></p>

<p><strong><em>In Short:&nbsp;</em></strong><em>We collect personal information that you provide to us.</em></p>

<p>We collect personal information that you voluntarily provide to us when you register on the Services,&nbsp;express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>

<p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>

<ul>
	<li>names</li>
</ul>

<ul>
	<li>email addresses</li>
</ul>

<p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>

<p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

<p><strong>2. HOW DO WE PROCESS YOUR INFORMATION?</strong></p>

<p><strong><em>In Short:&nbsp;</em></strong><em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em></p>

<p><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>

<ul>
	<li><strong>To facilitate account creation and authentication and otherwise manage user accounts.&nbsp;</strong>We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
</ul>

<ul>
	<li><strong>To save or protect an individual&#39;s vital interest.</strong> We may process your information when necessary to save or protect an individual&rsquo;s vital interest, such as to prevent harm.</li>
</ul>

<p><strong>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</strong></p>

<p><strong><em>In Short:&nbsp;</em></strong><em>We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em></p>

<p><strong><em>If you are located in the EU or UK, this section applies to you.</em></strong></p>

<p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>

<ul>
	<li><strong>Consent.&nbsp;</strong>We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
</ul>

<ul>
	<li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
</ul>

<ul>
	<li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
</ul>

<p><strong><em>If you are located in Canada, this section applies to you.</em></strong></p>

<p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>

<p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>

<ul>
	<li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
</ul>

<ul>
	<li>For investigations and fraud detection and prevention</li>
</ul>

<ul>
	<li>For business transactions provided certain conditions are met</li>
</ul>

<ul>
	<li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
</ul>

<ul>
	<li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
</ul>

<ul>
	<li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
</ul>

<ul>
	<li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
</ul>

<ul>
	<li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
</ul>

<ul>
	<li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
</ul>

<ul>
	<li>If the collection is solely for journalistic, artistic, or literary purposes</li>
</ul>

<ul>
	<li>If the information is publicly available and is specified by the regulations</li>
</ul>

<p><strong>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</strong></p>

<p><strong><em>In Short:</em></strong><em>&nbsp;We do not disclose any personal information to any party under any circumstance.</em></p>

<p><strong>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</strong></p>

<p><strong><em>In Short:</em></strong><em>&nbsp;We do <strong>not</strong> use cookies and or other tracking technologies to collect and store your information.</em></p>

<p>We may use cookies to store site related information and preferences .</p>

<p><strong>6. HOW LONG DO WE KEEP YOUR INFORMATION?</strong></p>

<p><strong><em>In Short:&nbsp;</em></strong><em>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em></p>

<p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>

<p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

<p><strong>7. WHAT ARE YOUR PRIVACY RIGHTS?</strong></p>

<p><strong><em>In Short:</em></strong><em>&nbsp;In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information.&nbsp;You may review, change, or terminate your account at any time.</em></p>

<p>In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section &ldquo;<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&rdquo; below.</p>

<p>We will consider and act upon any request in accordance with applicable data protection laws.</p>

<p>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank">https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm</a>.</p>

<p>If you are located in Switzerland, the contact details for the data protection authorities are available here: <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank">https://www.edoeb.admin.ch/edoeb/en/home.html</a>.</p>

<p><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &quot;<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&quot; below.</p>

<p>However, please note that this will not affect the lawfulness of the processing before its withdrawal, nor when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>

<p><strong>Account Information</strong></p>

<p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>

<ul>
	<li>Contact us using the contact information provided.</li>
</ul>

<p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>

<p><strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt out of interest-based advertising by advertisers on our Services visit <a href="http://www.aboutads.info/choices/" target="_blank">http://www.aboutads.info/choices/</a>.</p>

<p><strong>8. CONTROLS FOR DO-NOT-TRACK FEATURES</strong></p>

<p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>

<p><strong>9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</strong></p>

<p><strong><em>In Short:&nbsp;</em></strong><em>Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em></p>

<p>California Civil Code Section 1798.83, also known as the &quot;Shine The Light&quot; law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>

<p>If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).</p>

<p><strong>10. DO WE MAKE UPDATES TO THIS NOTICE?</strong></p>

<p><strong><em>In Short:&nbsp;</em></strong><em>Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>

<p>We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>

<p><strong>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong></p>

<p>If you have questions or comments about this notice, you may email us through the means below.</p>

<p><strong>12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</strong></p>

<p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information contact us through the means below.</p>

<p>&nbsp;</p>
','
<p><strong><a href="https://linkstack.org/">LinkStack</a></strong> is a free, open source&nbsp;link&nbsp;sharing platform. We depend on community feedback to steadily improve this project.</p>

<p><strong>Feel free to send us your feedback!</strong></p>

<ul>
	<li>Join our <a href="https://discord.linkstack.org/">community Discord</a></li>
	<li>Join the <a href="https://github.com/linkstackorg/linkstack/discussions">discussion forum</a></li>
	<li>Request a feature and add it to the <a href="https://github.com/linkstackorg/linkstack/discussions/49">to-do list</a></li>
	<li>Write us an <a href="mailto:info@linkstack.org?subject=Inquiry%20about%20LinkStack">email</a></li>
</ul>

<p>If you&#39;re having any trouble or encountered a bug, feel free to <a href="https://github.com/linkstackorg/linkstack/issues">open an issue on GitHub</a>.</p>

<p>&nbsp;</p>
','default',NULL,NULL,NULL);


---

CREATE TABLE IF NOT EXISTS `user_wallets` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL COMMENT 'User ID',
  `wallet_address` varchar(42) NOT NULL COMMENT 'Wallet Address',
  `chain_id` int(11) NOT NULL DEFAULT 1 COMMENT 'Chain ID',
  `updated_by` varchar(68) DEFAULT NULL COMMENT 'Updated By',
  `updated_at` datetime DEFAULT NULL COMMENT 'Last Updated',
  `created_by` varchar(68) NOT NULL COMMENT 'Created By',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unq_csanalysiscode_category_code (`user_id`,`wallet_address`),
	CONSTRAINT `user_wallets_fk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  KEY `user_id` (`user_id`),
  KEY `wallet_address` (`wallet_address`),
  KEY `chain_id` (`chain_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;