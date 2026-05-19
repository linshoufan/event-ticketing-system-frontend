import type { Ticket } from "../types"

export const MOCK_TICKETS: Ticket[] = [
  {
    ticketId: "tk_001",
    eventId: "ev_001",
    eventName: "夏日烤肉趴",
    eventStartTime: "2025-07-15T18:00:00Z",
    eventEndTime: "2025-07-15T22:00:00Z",
    eventLocation: "台北辦公室頂樓",
    latitude: 25.0478,
    longitude: 121.5319,
    checkinRadiusMeters: 200,
    status: "unused",
    checkinAvailable: true,
  },
  {
    ticketId: "tk_002",
    eventId: "ev_002",
    eventName: "音樂欣賞之夜",
    eventStartTime: "2025-08-01T19:00:00Z",
    eventEndTime: "2025-08-01T22:00:00Z",
    eventLocation: "台北國家音樂廳",
    latitude: 25.0478,
    longitude: 121.5319,
    checkinRadiusMeters: 200,
    status: "invalid",
    checkinAvailable: false,
  },
]