import { baseApi } from "../baseApi";

export interface ReportedBy {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Incident {
  _id: string;
  reportedTo: string | null;
  reportedBy: ReportedBy;
  incidentType: string;
  contextType: string;
  contextId: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  contextData: any | null;
}

export interface AllIncidentsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Incident[];
}

export const incidentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all incidents
    getAllIncidents: builder.query<AllIncidentsResponse, void>({
      query: () => ({
        url: "/incidents",
        method: "GET",
      }),
      providesTags: ["Incidents"],
    }),
  }),
});

export const { useGetAllIncidentsQuery } = incidentsApi;
