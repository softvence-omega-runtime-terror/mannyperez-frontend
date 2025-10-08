import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';
import { BsCameraVideo } from 'react-icons/bs';
import { RiDashboardFill } from "react-icons/ri";

interface StatItem {
  id: string;
  label: string;
  value: number;
  icon?: 'up' | 'down' | 'dollar';
  color?: 'blue' | 'red' | 'green';
}

interface QuickStatsProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { id: '1', label: 'Active Listings', value: 24, icon: 'up', color: 'blue' },
  { id: '2', label: 'Upcoming Lists', value: 2, icon: 'down', color: 'red' },
  { id: '3', label: 'Sales This Week', value: 1200, icon: 'dollar', color: 'green' },
];

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  icon?: 'success' | 'view' | 'like';
  color?: 'green' | 'blue' | 'pink';
}

export interface QuickStatsWithActivityProps extends QuickStatsProps {
  activities?: ActivityItem[];
}



const getIconComponent = (iconType?: string) => {
  switch (iconType) {
    case 'up':
      return <RiDashboardFill className="size-6 " />;
    case 'down':
      return <BsCameraVideo className=" size-6" />;
    case 'dollar':
      return <DollarSign className=" size-6" />;
    default:
      return <TrendingUp className=" size-6" />;
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



export default function QuickStats({ stats = defaultStats }: QuickStatsWithActivityProps) {
  return (
    <div className="">
    <Card className="w-full">
      <CardHeader className="">
        <h3 className="">Quick Stats</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center justify-between border border-border px-4 py-3 rounded-xl">
            <div className=''>
              <p className="text-lg text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold">
                {stat.icon === 'dollar' ? `$${stat.value.toLocaleString()}` : stat.value}
              </p>
            </div>
            <div className={`rounded-full p-4 ${getColorClasses(stat.color)}`}>
              {getIconComponent(stat.icon)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
    </div>
  )
}
