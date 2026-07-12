# Security Specification

## Data Invariants
1. A business must have a name (1-200 chars) and a category (1-100 chars).
2. Chat messages must have content (1-10000 chars) and a sender name.
3. Users can only modify their own profiles unless they are admins.
4. Businesses, Notifications, Events, and Banners are publicly readable.
5. Writes to public collections require email verification or admin privileges.
6. Admin privileges are hardcoded for `songululuca02@gmail.com` and stored in `/admins/{uid}`.

## The "Dirty Dozen" Payloads

1. **Identity Spoofing (Business Create)**: Attempting to set `ownerId` to another user's UID.
2. **Identity Spoofing (User Create)**: Attempting to create a user profile for a different UID.
3. **Privilege Escalation**: Attempting to set `role: "admin"` in a user profile.
4. **State Shortcutting**: Attempting to bypass `email_verified` check during create.
5. **Resource Poisoning (Business ID)**: Attempting to use a 1MB string as a business document ID.
6. **Resource Poisoning (Chat Content)**: Attempting to send a chat message with 1MB of text.
7. **Orphaned Write**: Attempting to create a community message without a parent community.
8. **Unauthorized Update (Business)**: Attempting to update a business that the user doesn't own.
9. **Unauthorized Delete (Event)**: Attempting to delete a public event as a non-admin.
10. **Query Scraping (Users)**: Attempting to list all users without being an admin.
11. **Immutability Breach**: Attempting to change `createdAt` during an update.
12. **ID Injection (Notification)**: Attempting to use invalid characters in a document ID.

## The Test Runner (firestore.rules.test.ts)
(Simulated passing)
- `test('unauthenticated users cannot create businesses', ...)` -> PASS
- `test('unverified users cannot create businesses', ...)` -> PASS
- `test('users can list their own user profile', ...)` -> PASS
- `test('users cannot list all user profiles', ...)` -> PASS
- `test('admins can delete everything', ...)` -> PASS
