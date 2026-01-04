import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";

export const aminClassService = {
  getAll: (params) =>
    api.get(API.ADMIN.CLASSES.GET, { params }),

  archive: (id) => 
    api.patch(`${API.ADMIN.CLASSES.ARCHIVE}/${id}`)
};
