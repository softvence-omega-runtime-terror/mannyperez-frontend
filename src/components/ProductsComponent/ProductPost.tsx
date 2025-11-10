import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Eye, Heart, MessageCircle, ShoppingBag, Send } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/reuseableComponents/PrimaryButton';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
}

interface SocialPostCardProps {
  post?: {
    id: string;
    author: string;
    authorAvatar?: string;
    timestamp: string;
    title: string;
    description: string;
    images: string[];
    price: string;
    tags: string[];
    stats: {
      views: number;
      likes: number;
      comments: number;
      orders: number;
    };
    comments: Comment[];
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onPromote?: () => void;
  onLike?: () => void;
  onComment?: (comment: string) => void;
}

const defaultPost = {
  id: '1',
  author: 'CraftyBuyer',
  authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  timestamp: '12 hours ago',
  title: 'Holographic Sticker Sheets - Various Designs',
  description: 'High-quality glitter DTF transfers perfect for t-shirts, hoodies, and accessories. Easy to apply with heat press. Vibrant colors and excellent durability. Bulk discounts available for orders over 10 sheets!',
  images: [
    'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/6590918/pexels-photo-6590918.jpeg?auto=compress&cs=tinysrgb&w=400',
  ],
  price: '$8 per sheet',
  tags: ['#fabricdestash', '#cottonrolls', '#livesale'],
  stats: {
    views: 3200,
    likes: 234,
    comments: 89,
    orders: 5,
  },
  comments: [
    {
      id: '1',
      author: 'CraftyBuyer',
      authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Do you offer international shipping? These look amazing!',
      timestamp: '2h ago',
    },
    {
      id: '2',
      author: 'CraftyBuyer',
      authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Do you offer international shipping? These look amazing!',
      timestamp: '2h ago',
    },
  ],
};

export default function ProductPost({
  post = defaultPost,
  // onEdit,
  // onDelete,
  // onPromote,
  onLike,
  onComment,
}: SocialPostCardProps) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (commentText.trim() && onComment) {
      onComment(commentText);
      setCommentText('');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 ">
        <div className='space-y-2'>
          <h5 className="font-semibold">{post.title}</h5>
          <p className="text-lg text-gray-600">{post.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {post.images.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-sm text-gray-600 hover:underline cursor-pointer border-border px-4 py-2 rounded-sm bg-gray-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="sm:flex space-y-2 sm:space-y-0 items-center justify-between pt-2">
          <p className="text-2xl font-semibold">{post.price}</p>
          <div className="flex gap-2">
            <PrimaryButton type="Outline" title='Edit' className='border border-border text-gray-600 px-4 py-3 rounded-sm font-normal'/>
            <PrimaryButton type="Outline" title='Delete' className='px-4 py-3 rounded-sm font-normal'/>
            <PrimaryButton type="Primary" title='Promote' className='px-4 py-3 rounded-sm bg-[#229ECF] font-normal'/>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground border-t">
          <button className="flex items-center gap-1.5 hover:text-foreground transition-colors py-2">
            <Eye className="h-4 w-4" />
            {formatNumber(post.stats.views)}
          </button>
          <button
            className="flex items-center gap-1.5 hover:text-red-600 transition-colors py-2"
            onClick={onLike}
          >
            <Heart className="h-4 w-4" />
            {formatNumber(post.stats.likes)}
          </button>
          <button className="flex items-center gap-1.5 hover:text-foreground transition-colors py-2">
            <MessageCircle className="h-4 w-4" />
            {formatNumber(post.stats.comments)}
          </button>
          <button className="flex items-center gap-1.5 hover:text-foreground transition-colors py-2">
            <ShoppingBag className="h-4 w-4" />
            {post.stats.orders} order
          </button>
        </div>
          <div className="pt-0">
        <div className="flex items-center w-full gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.authorAvatar} alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              className="flex-1 border border-border px-4 py-6 rounded-full"
            />
            <Button
              size="icon"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
        <div className="space-y-3 pt-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <p className="font-semibold text-sm">{comment.author}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <div className="flex gap-4 mt-1 px-3">
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    {comment.timestamp}
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Like
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Reply
                  </button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

    </Card>
  );
}