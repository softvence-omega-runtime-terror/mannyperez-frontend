import React from 'react'

interface CategoryCard {
    label:string,
    img:string,
}

interface CategoryCardProps{
    item:CategoryCard
}



const CategoryCard : React.FC<CategoryCardProps> = (props) => {
    const {img, label} = props.item
  return (
    <div className='border-2 rounded-xl grid place-content-center place-items-center gap-4 w-full h-full py-8'>
        <div className="size-12 bg-primary-foreground grid place-content-center rounded-full">
        <img src={img} alt="" className='size-6'/>
        </div>
        <h5 className='font-semibold'>{label}</h5>
    </div>
  )
}

export default CategoryCard
