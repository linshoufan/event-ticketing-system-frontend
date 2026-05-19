export const MOCK_USERS = [
  {
    userId: "u_abc123",
    username: "john.doe",
    role: "employee",
    registrationStatus: "active" as const,
    unlockAt: null,
  },
  {
    userId: "u_xyz789",
    username: "jane.smith",
    role: "hr",
    registrationStatus: "active" as const,
    unlockAt: null,
  },
  {
    userId: "u_locked01",
    username: "bob.wang",
    role: "employee",
    registrationStatus: "locked" as const,
    unlockAt: "2025-06-18T00:00:00Z",
  },
]