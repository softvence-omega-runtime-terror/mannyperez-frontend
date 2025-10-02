import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import Marquee from "react-fast-marquee"

interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  content: string
}



const testimonials = [
    {
      id: "1",
      name: "Michael Torres",
      role: "Craft Enthusiast",
      avatar: "/man.jpg",
      rating: 5.0,
      content:
        "The live events are amazing! I've found so many unique DTF designs and saved tons of money. The sellers are super responsive too.",
    },
    {
      id: "2",
      name: "Sophia Martinez",
      role: "DTF Seller",
      avatar: "/diverse-woman-portrait.png",
      rating: 5.0,
      content:
        "As a seller, this platform has been incredible for my business. The verification system builds trust and the live events boost my sales significantly.",
    },
    {
      id: "3",
      name: "Emily Chen",
      role: "Small Business Owner",
      avatar: "/woman-business.jpg",
      rating: 5.0,
      content:
        "I love the community aspect! I've learned so much from other crafters and discovered new techniques. The quality of products is consistently high.",
    },
    {
      id: "4",
      name: "David Johnson",
      role: "Vinyl Enthusiast",
      avatar: "/man-casual.jpg",
      rating: 5.0,
      content:
        "Best platform for finding quality vinyl and DTF supplies. The live sales are exciting and I always find great deals. Highly recommend!",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      role: "Craft Store Owner",
      avatar: "/professional-woman.png",
      rating: 5.0,
      content:
        "This has transformed how I source products for my store. The variety is incredible and the seller verification gives me peace of mind.",
    },
    {
      id: "6",
      name: "James Wilson",
      role: "DIY Creator",
      avatar: "/man-creative.jpg",
      rating: 5.0,
      content:
        "The community here is so supportive and helpful. I've connected with amazing sellers and learned new crafting techniques. Love it!",
    },
  ]


export function TestimonialsSlider() {
  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-10 xl:py-20 bg-gray-50">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="">
            Join Our <span className="text-accent">Community</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Connect with fellow crafters and sellers in our vibrant community.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="space-y-6 overflow-hidden">
          {/* Top Row - Scrolls Left to Right */}
        <Marquee direction="right">
          <div className="relative">
            <div className="flex gap-4 md:gap-6 animate-scroll-left">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`top-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </Marquee>

          {/* Bottom Row - Scrolls Right to Left */}
          <Marquee>
          <div className="relative">
            <div className="flex gap-4 md:gap-6 animate-scroll-right">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`bottom-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
          </Marquee>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex-shrink-0 w-[350px] sm:w-[400px] p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
          <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.role}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{testimonial.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Testimonial Content */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{testimonial.content}</p>
    </Card>
  )
}
