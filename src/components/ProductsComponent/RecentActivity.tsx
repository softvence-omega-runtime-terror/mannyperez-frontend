import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FaEye } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { ActivityItem } from "./QuickStats";

const defaultActivities: ActivityItem[] = [
  { id: '1', title: 'Order completed', timestamp: 'Just now', icon: 'success', color: 'green' },
  { id: '2', title: 'New listing view', timestamp: '5 min ago', icon: 'view', color: 'blue' },
  { id: '3', title: 'Product liked', timestamp: '10 min ago', icon: 'like', color: 'pink' },
];

const RecentActivity = ( ) => {
const getActivityIcon = (iconType?: string) => {
  switch (iconType) {
    case 'success':
      return <IoIosCheckmarkCircleOutline className="size-6" />;
    case 'view':
      return <FaEye className="size-6" />;
    case 'like':
      return <FcLike className="size-6 text-purple-700" />;
    default:
      return '•';
  }
};
const getColorClasses = (color?: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-100 text-blue-600';
    case 'red':
      return 'bg-red-100 text-red-600';
    case 'green':
      return 'bg-green-100 text-green-600';
    case 'pink':
      return 'bg-pink-100 text-pink-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};


  return (
    <div className="">
      <Card className="w-full">
      <CardHeader>
        <h3 className="">Recent Activity</h3>
      </CardHeader>
      <CardContent>
        <div className="">
          <div className="space-y-3">
            {defaultActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 border border-border px-4 py-3 rounded-xl">
                <div className={`flex size-12 items-center justify-center rounded-full text-sm ${getColorClasses(activity.color)}`}>
                  {getActivityIcon(activity.icon)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default RecentActivity;