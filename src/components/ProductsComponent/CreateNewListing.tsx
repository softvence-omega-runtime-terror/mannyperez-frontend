import { Calendar, Plus } from "lucide-react";



const CreateNewListing = () => {
     const actions = [
    {
      id: 1,
      icon: Plus,
      iconBg: 'bg-[#D82479]',
      title: 'Create New Listing',
      description: 'Add products with proof photos',
      href: '/listing/create'
    },
    {
      id: 2,
      icon: Calendar,
      iconBg: 'bg-[#229ECF]',
      title: 'Book Live Slot',
      description: 'Schedule live selling session',
      href: '/live/book'
    }
  ];

  return (
    <div className="lg:flex space-y-6 lg:space-y-0 gap-6 w-full">
      {
        actions.map((item)=>(
            <div className="border w-full px-8 py-16 rounded-2xl grid place-content-center place-items-center bg-white">
                <div className={`size-14 rounded-full mb-8 ${item.iconBg} grid place-items-center`}>
                {<item.icon className="text-white"/>}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        ))
      }
    </div>
  );
};

export default CreateNewListing;