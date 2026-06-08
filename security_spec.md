# Firebase Security Specification - Selam Tutoring

## Data Invariants
1. A **Lead** can be created by any visitor but only managed by an admin.
2. A **Subscription** can only be created and modified by an admin.
3. A **Session** must have a valid studentId and tutorId.
4. **User** profiles are strictly isolated; users cannot change their own roles.

## Protected Collections
- `/users/{userId}`: User profiles.
- `/leads/{leadId}`: Trial booking requests.
- `/subscriptions/{subId}`: Student payment plans.
- `/sessions/{sessionId}`: Tutoring sessions.

## The "Dirty Dozen" Payloads (Deny List)
1. **Identity Spoofing**: A parent trying to update their role to 'admin'.
2. **Lead Privacy**: A non-admin trying to list all trial bookings.
3. **Session Tampering**: A student trying to change their session status to 'missed' for a tutor.
4. **Subscription Theft**: A parent trying to create a free 'intensive' subscription for themselves.
5. **PII Leak**: An authenticated tutor trying to read a parent's email without being assigned.
6. **Orphaned Lead**: Creating a lead with a 1MB string as a name.
7. **Role Escalation**: A newUser setting `role: 'admin'` during creation.
8. **Stat Shortcut**: Marking a lead as `converted` without admin privilege.
9. **Timestamp Spoofing**: Setting a `createdAt` in the future for a lead.
10. **ID Poisoning**: Injecting non-alphanumeric characters into a studentId.
11. **Blanket Query**: Authenticated user trying to `get` all leads.
12. **System Field Update**: Tutor trying to modify the `nextPaymentDate` on a subscription.

## Test Runner (Draft)
The tests will verify that all above scenarios return `PERMISSION_DENIED`.
