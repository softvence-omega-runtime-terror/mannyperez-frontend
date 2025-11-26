import { useGetAllIncidentsQuery } from "@/store/services/admin/allIncidentsApi";
import { useGetAllLiveEventsQuery } from "@/store/services/admin/allLiveEventsApi";
import { useGetAllUsersQuery } from "@/store/services/admin/allUsers";

export default function AdminDashboard() {
    // users
  const { data: userData, isLoading } = useGetAllUsersQuery();
  console.log(userData)
//   incidents 
   const { data: AllIncidents } = useGetAllIncidentsQuery();
//    live events 
  const { data:AllLiveEvents } = useGetAllLiveEventsQuery();
  const LiveEnevts = AllLiveEvents?.data?.length ?? 0;

    const totalIncidents = AllIncidents?.data?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, Admin!
        </h1>
        <p className="text-gray-500">Here’s your overview for today.</p>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-5 border">
          <h3 className="text-sm text-gray-500">Total Users</h3>

          <p className="text-3xl font-bold mt-2">
            {isLoading ? "..." : userData?.data?.length ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5 border">
          <h3 className="text-sm text-gray-500">Live Listings</h3>
          <p className="text-3xl font-bold mt-2">{LiveEnevts}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5 border">
          <h3 className="text-sm text-gray-500">Open Incidents</h3>
          <p className="text-3xl font-bold mt-2">{totalIncidents}</p>
        </div>
      </div>
    </div>
  );
}
