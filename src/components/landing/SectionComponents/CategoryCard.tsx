import React from 'react'

interface CategoryCard {
    label: string,
    img: string,
}

interface CategoryCardProps {
    item: CategoryCard
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
    const { img, label } = props.item
    
    return (
        <div className='border-2 rounded-xl grid place-content-center place-items-center gap-3 sm:gap-4 w-full h-full py-6 sm:py-8 lg:py-10 hover:bg-accent-foreground hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer'>
            {/* Icon Container */}
            <div className="size-12 sm:size-14 lg:size-16 bg-primary-foreground grid place-content-center rounded-full group-hover:bg-background-secondary transition-colors duration-300 shadow-sm">
                <img 
                    src={img} 
                    alt={`${label} icon`} 
                    className='size-5 sm:size-6 lg:size-7 object-contain'
                />
            </div>
            
            {/* Label */}
            <h5 className='font-semibold text-sm sm:text-base lg:text-lg text-center px-2'>
                {label}
            </h5>
        </div>
    )
}

export default CategoryCard