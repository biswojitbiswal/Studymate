import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const sessionService = {

  // 1️⃣ Private session request (student or tutor)
  createPrivateRequest: (data) =>
    api.post(API.SESSION.CREATE_PRIVATE, data),

  // 2️⃣ Get sessions of a class (sessions tab in class details page)
  getByClass: (params) =>
    api.get(API.SESSION.GET_BY_ID, { params }),

  // 3️⃣ Cancel session
  cancel: (sessionId) =>
    api.patch(`${API.SESSION.CANCELLATION}/${sessionId}`),

  // 4️⃣ Tutor approves session
  approve: (sessionId) =>
    api.patch(`${API.SESSION.APPROVE}/${sessionId}`),

  // 5️⃣ Tutor rejects session
  reject: (sessionId) =>
    api.patch(`${API.SESSION.REJECT}/${sessionId}`),

  // 6️⃣ Reschedule session
  reschedule: (sessionId, data) =>
    api.patch(`${API.SESSION.RESCHEDULE}/${sessionId}`, data),

  // 7️⃣ Tutor creates extra class session
  createExtra: (data) =>
    api.post(API.SESSION.CREATE_EXTRA, data),

  // 8️⃣ Tutor creates doubt session
  createDbout: (data) =>
    api.post(API.SESSION.CREATE_DBOUT, data),

  // 9️⃣ Dashboard upcoming sessions
  getUpcoming: () =>
    api.get(API.SESSION.GET_UPCOMING),
};
