CREATE TABLE `change_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`team` text NOT NULL,
	`environment` text NOT NULL,
	`upstreams_config` text NOT NULL,
	`locations_config` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`pr_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
