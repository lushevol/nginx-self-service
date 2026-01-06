import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const changeRequests = sqliteTable('change_requests', {
  id: text('id').primaryKey(),
  team: text('team').notNull(),
  environment: text('environment').notNull(),
  upstreamsConfig: text('upstreams_config').notNull(),
  locationsConfig: text('locations_config').notNull(),
  status: text('status').notNull().default('PENDING'), // PENDING, SUBMITTED, FAILED
  prId: text('pr_id'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
