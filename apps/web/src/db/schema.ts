// // import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// // export const users = pgTable('users', {
// //   id: uuid('id').defaultRandom().primaryKey(),
// //   name: text('name'),
// //   email: text('email').notNull().unique(),
// //   createdAt: timestamp('created_at').defaultNow().notNull(),
// // });

// // export const files = pgTable('files', {
// //   id: uuid('id').defaultRandom().primaryKey(),
// //   userId: uuid('user_id').references(() => users.id).notNull(),
// //   filename: text('filename').notNull(),
// //   fileType: text('file_type').notNull(),
// //   fileUrl: text('file_url').notNull(),
// //   createdAt: timestamp('created_at').defaultNow().notNull(),
// // });



// // drizzle/schema.ts
// import { pgTable, serial, text, varchar,uuid, timestamp, integer, boolean, uniqueIndex } from 'drizzle-orm/pg-core';
// import { sql } from 'drizzle-orm';

// export const notes = pgTable('notes', {
//     id: uuid('id').defaultRandom().primaryKey(),
//     userId: uuid('user_id').references(() => users.id).notNull(),
//     title: text('title').notNull(),
//     content: text('content').notNull(),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//     updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// // User table
// export const users = pgTable('users', {
//   id: varchar('id', { length: 191 }).primaryKey().default(sql`gen_random_uuid()`), // Using uuid as primary key
//   name: text('name'),
//   email: text('email').unique().notNull(),
//   emailVerified: timestamp('email_verified', { withTimezone: true }),
//   image: text('image'),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

// // Account table
// export const accounts = pgTable('accounts', {
//   userId: varchar('user_id', { length: 191 }).notNull(),
//   type: text('type').notNull(),
//   provider: text('provider').notNull(),
//   providerAccountId: text('provider_account_id').notNull(),
//   refreshToken: text('refresh_token'),
//   accessToken: text('access_token'),
//   expiresAt: integer('expires_at'),
//   tokenType: text('token_type'),
//   scope: text('scope'),
//   idToken: text('id_token'),
//   sessionState: text('session_state'),
  
//   // Composite primary key
//   //   primary: primaryKey('provider', 'providerAccountId'),
// }, (table) => {
//     return {
//         pk: uniqueIndex('accounts_provider_providerAccountId').on(table.provider, table.providerAccountId),
//     };
// });

// // Session table
// export const sessions = pgTable('sessions', {
//     sessionToken: text('session_token').unique().notNull(),
//     userId: varchar('user_id', { length: 191 }).notNull(),
//     expires: timestamp('expires', { withTimezone: true }).notNull(),
// });

// // VerificationToken table
// export const verificationTokens = pgTable('verification_tokens', {
//     identifier: text('identifier').notNull(),
//   token: text('token').unique().notNull(),
//   expires: timestamp('expires', { withTimezone: true }).notNull(),
  
//   // Composite primary key
//   //   primary: primaryKey('identifier', 'token'),
// }, (table) => {
//     return {
//         pk: uniqueIndex('verification_tokens_identifier_token').on(table.identifier, table.token),
//     };
// });

// // Authenticator table
// export const authenticators = pgTable('authenticators', {
//     id: varchar('id', { length: 191 }).primaryKey().default(sql`gen_random_uuid()`), // Using uuid as primary key
//     credentialID: text('credential_id').unique().notNull(),
//     userId: varchar('user_id', { length: 191 }).notNull(),
//     providerAccountId: text('provider_account_id').notNull(),
//     credentialPublicKey: text('credential_public_key').notNull(),
//     counter: integer('counter').notNull(),
//     credentialDeviceType: text('credential_device_type').notNull(),
//     credentialBackedUp: boolean('credential_backed_up').notNull(),
//     transports: text('transports'),
// });

// export const files = pgTable('files', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   userId: uuid('user_id').references(() => users.id).notNull(),
//   filename: text('filename').notNull(),
//   fileType: text('file_type').notNull(),
//   fileUrl: text('file_url').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

import { pgTable, serial, text, varchar, uuid, timestamp, integer, boolean, uniqueIndex, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// User table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(), // Use UUID for consistency
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { withTimezone: true }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Files table
export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(), // Correct foreign key reference
  filename: text('filename').notNull(),
  fileType: text('file_type').notNull(),
  fileUrl: text('file_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notes table
export const notes = pgTable('notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(), // Correct foreign key reference
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Account table
export const accounts = pgTable('accounts', {
  userId: uuid('user_id').references(() => users.id).notNull(), // Correct foreign key reference
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),

  // Composite unique constraint
}, (table) => {
  return {
    pk: uniqueIndex('accounts_provider_providerAccountId').on(table.provider, table.providerAccountId),
  };
});

// Session table
export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').unique().notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(), // Correct foreign key reference
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

// VerificationToken table
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').unique().notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),

  // Composite unique constraint
}, (table) => {
  return {
    pk: uniqueIndex('verification_tokens_identifier_token').on(table.identifier, table.token),
  };
});

// Authenticator table
export const authenticators = pgTable('authenticators', {
  id: uuid('id').defaultRandom().primaryKey(), // Using UUID for consistency
  credentialID: text('credential_id').unique().notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(), // Correct foreign key reference
  providerAccountId: text('provider_account_id').notNull(),
  credentialPublicKey: text('credential_public_key').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credential_device_type').notNull(),
  credentialBackedUp: boolean('credential_backed_up').notNull(),
  transports: text('transports'),
});
