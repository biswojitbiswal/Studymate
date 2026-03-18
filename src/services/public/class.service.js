import api from "@/lib/api-client";
import { API } from "@/lib/endpoint";
import qs from 'qs';

export const commonClassService = {
  getAllBrowseClass: (params) =>
    api.get(API.BROWSE_CLASSES, {
      params,
      paramsSerializer: {
        serialize: (params) =>
          qs.stringify(params, {
            arrayFormat: "repeat",
            skipNulls: true,
          }),
      },
    }),

  getBwoseClassById: (id) =>
    api.get(`${API.BROWSE_CLASSES_BY_ID}/${id}`),
};
