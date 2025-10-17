import Wrapper from "../layout/Wrapper";
import SearchInput from "../landing/SectionComponents/SearchInput";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";

const statsData = [
  { id: 1, value: "2847", label: "Active Sellers" },
  { id: 2, value: "98.5%", label: "Satisfaction Rate" },
  { id: 3, value: "45k+", label: "Products Listed" },
  { id: 4, value: "156", label: "Countries" },
];

export function VerifiedSellers() {
  const handleSearch = () => {};
  return (
    <section className="w-full bg-background-secondary py-12 px-4 sm:py-16 md:py-20 lg:py-24">
      <Wrapper>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="size-10 sm:size-14 border rounded-full">
              <img src="/public/verified.svg" alt="" />
            </div>
            <h1 className="">
              Verified <span className="text-accent">Sellers</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto px-4 text-pretty">
            Browse trusted sellers with verified badges and explore their
            premium listings. Connect with top-rated professionals in DTF,
            sublimation, vinyl, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">
            <SearchInput placeholder="Search sellers" onSearch={handleSearch} />
            <PrimaryButton type="Primary" title="Search" className=" w-full sm:w-fit px-8" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6  max-w-4/5 mx-auto">
          {statsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                {item.value}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
