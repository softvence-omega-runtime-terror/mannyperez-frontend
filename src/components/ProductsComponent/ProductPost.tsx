import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Eye, Heart, MessageCircle, ShoppingBag, Send } from 'lucide-react';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import PrimaryButton from '@/reuseableComponents/PrimaryButton';
import { useCommentOnProductMutation, useCommentReplyMutation, useGetMyProductsQuery, useLikeCommentMutation, useLikeProductMutation } from '@/store/services/productsApi';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
  likes?: string[];
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
  const { data: apiResp } = useGetMyProductsQuery();
  const [likeProduct, { isLoading }] = useLikeProductMutation();
  const [likeComment] = useLikeCommentMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [commentOnProduct] = useCommentOnProductMutation();
  const [commentReply] = useCommentReplyMutation();
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [commentLikeLoading, setCommentLikeLoading] = useState<Record<string, boolean>>({});

  const handleLike = async (id?: string) => {
    if (!id) return;
    try {
      await likeProduct(id).unwrap();
      // optional: you could show a small toast here or rely on re-fetch
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  // helper to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // helper to format ISO timestamps into relative time or short date
  const formatTimestamp = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;

    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 7 * 86400) return `${Math.floor(diffSec / 86400)}d ago`;

    // otherwise show short date; hide year if same year
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    if (d.getFullYear() !== now.getFullYear()) (opts as any).year = "numeric";
    return d.toLocaleDateString(undefined, opts);
  };

  const handleCommentSubmit = async (productId?: string, onCommentProp?: (c: string) => void) => {
    if (!productId) return;
    const text = (commentText[productId] || '').trim();
    if (!text) return;
    try {
      await commentOnProduct({ id: productId, comment: text }).unwrap();
      setCommentText((prev) => ({ ...prev, [productId]: '' }));
      if (onCommentProp) onCommentProp(text);
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  const handleReplyToggle = (commentId?: string) => {
    if (!commentId) return;
    setReplyOpen((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReplySubmit = async (commentId?: string) => {
    if (!commentId) return;
    const text = (replyText[commentId] || '').trim();
    if (!text) return;
    try {
      await commentReply({ id: commentId, comment: text }).unwrap();
      setReplyText((prev) => ({ ...prev, [commentId]: '' }));
      setReplyOpen((prev) => ({ ...prev, [commentId]: false }));
    } catch (err) {
      console.error('Reply failed', err);
    }
  };

  const handleLikeComment = async (commentId?: string) => {
    if (!commentId) return;
    setCommentLikeLoading((prev) => ({ ...prev, [commentId]: true }));
    try {
      await likeComment(commentId).unwrap();
    } catch (err) {
      console.error('Like comment failed', err);
    } finally {
      setCommentLikeLoading((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  // transform API product shape into the post shape used by this component
  const transform = (item: any) => {
    const title = item?.productInformation?.title || '';
    const description = item?.productInformation?.description || '';
    const tags = item?.productInformation?.tags || [];
    const images = item?.images || [];
    const priceVal = item?.pricingAndInventory?.[0]?.price;
    const price = priceVal !== undefined ? `$${priceVal}` : '';
    const stats = {
      views: item?.socialDetails?.views || 0,
      likes: item?.socialDetails?.likes || 0,
      comments: Array.isArray(item?.socialDetails?.comments)
        ? item.socialDetails.comments.length
        : 0,
      orders: 0,
    };
    const comments = (item?.socialDetails?.comments || []).map((c: any, idx: number) => {
      const user = c.userId || c.author || {};
      const author = user.name || user.userName || user.fullName || c.author || 'User';
      const authorAvatar = user.img || user.avatar || undefined;
      const content = c.message || c.content || c.text || '';
      const id = c._id || c.id || `${item._id}-c-${idx}`;
      const timestamp = c.createdAt || c.timestamp || '';
      // map replies (API may use 'replays' or 'replies')
      const rawReplies = c.replays || c.replies || [];
      const replies = Array.isArray(rawReplies)
        ? rawReplies.map((r: any, rIdx: number) => {
            const rUser = r.userId || r.author || {};
            const rAuthor = rUser.name || rUser.userName || rUser.fullName || r.author || 'User';
            const rAuthorAvatar = rUser.img || rUser.avatar || undefined;
            const rContent = r.message || r.content || r.text || '';
            const rId = r._id || r.id || `${id}-r-${rIdx}`;
            const rTimestamp = r.createdAt || r.timestamp || '';
            return {
              id: rId,
              author: rAuthor,
              authorAvatar: rAuthorAvatar,
              content: rContent,
              timestamp: rTimestamp,
              likes: Array.isArray(r.likes) ? r.likes : [],
            };
          })
        : [];

      return {
        id,
        author,
        authorAvatar,
        content,
        timestamp,
        replies,
        likes: Array.isArray(c.likes) ? c.likes : [],
      };
    });

    const seller = item?.sellerId;
    const authorName = seller?.fullName || seller?.name || seller?.userName || seller || 'Seller';
    const authorAvatar = seller?.img || seller?.avatar || undefined;

    return {
      id: item._id,
      author: authorName,
      authorAvatar,
      timestamp: item.createdAt,
      title,
      description,
      images,
      price,
      tags,
      stats,
      comments,
    };
  };

  const apiArray = (apiResp as any)?.data;
  const items: any[] = Array.isArray(apiArray) && apiArray.length > 0 ? apiArray.map(transform) : [post];

  // If the API returned an empty array explicitly, show a friendly empty state
  const apiReturnedEmpty = Array.isArray(apiArray) && apiArray.length === 0;

  const isImageUrl = (url?: string) => {
    if (!url) return false;
    return /\.(jpe?g|png|webp|gif|svg|bmp)(\?|$)/i.test(url);
  };

  if (apiReturnedEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg font-semibold">No products available</p>
        <p className="text-sm text-muted-foreground mt-2">You haven't added any products yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((p: any, idx: number) => (
        <Card key={p.id || idx} className="w-full shadow-md">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {p.authorAvatar && isImageUrl(p.authorAvatar) ? (
                    <AvatarImage src={p.authorAvatar} alt={p.author} />
                  ) : (
                    <AvatarFallback>{(p.author || 'U').charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{p.author}</p>
                  <p className="text-xs text-muted-foreground">{formatTimestamp(p.timestamp)}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 ">
            <div className='space-y-2'>
              <h5 className="font-semibold">{p.title}</h5>
              <p className="text-lg text-gray-600">{p.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {p.images.map((image: string, index: number) => (
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
              {p.tags.map((tag: string, index: number) => (
                <span key={index} className="text-sm text-gray-600 hover:underline cursor-pointer border-border px-4 py-2 rounded-sm bg-gray-100">
                  {tag}
                </span>
              ))}
            </div>

            <div className="sm:flex space-y-2 sm:space-y-0 items-center justify-between pt-2">
              <p className="text-2xl font-semibold">{p.price}</p>
              <div className="flex gap-2">
                <PrimaryButton type="Outline" title='Edit' className='border border-border text-gray-600 px-4 py-3 rounded-sm font-normal' />
                <PrimaryButton type="Outline" title='Delete' className='px-4 py-3 rounded-sm font-normal' />
                <PrimaryButton type="Primary" title='Promote' className='px-4 py-3 rounded-sm bg-[#229ECF] font-normal' />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground border-t">
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors py-2">
                <Eye className="h-4 w-4" />
                {formatNumber(p.stats.views)}
              </button>
              <button
                className="flex items-center gap-1.5 hover:text-red-600 transition-colors py-2"
                onClick={() => handleLike(p.id)}
                disabled={isLoading}
              >
                <Heart className="h-4 w-4" />
                {formatNumber(p.stats.likes)}
              </button>
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors py-2">
                <MessageCircle className="h-4 w-4" />
                {formatNumber(p.stats.comments)}
              </button>
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors py-2">
                <ShoppingBag className="h-4 w-4" />
                {p.stats.orders} order
              </button>
            </div>
            <div className="pt-0">
              <div className="flex items-center w-full gap-2">
                <Avatar className="h-8 w-8">
                  {p.authorAvatar && isImageUrl(p.authorAvatar) ? (
                    <AvatarImage src={p.authorAvatar} alt="You" />
                  ) : (
                    <AvatarFallback>Y</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={commentText[p.id] || ''}
                    onChange={(e) => setCommentText((prev) => ({ ...prev, [p.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(p.id, onComment)}
                    className="flex-1 border border-border px-4 py-6 rounded-full"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleCommentSubmit(p.id, onComment)}
                    disabled={!((commentText[p.id] || '').trim())}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              {p.comments.map((comment: Comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    {comment.authorAvatar && isImageUrl(comment.authorAvatar) ? (
                      <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                    ) : (
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex gap-4 mt-1 px-3 items-center">
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        {formatTimestamp(comment.timestamp)}
                      </button>
                      <button
                        className={`text-xs flex items-center gap-1 ${comment.likes?.includes(user?._id || user?.id || '') ? 'text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => handleLikeComment(comment.id)}
                        disabled={!!commentLikeLoading[comment.id]}
                      >
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes?.length ?? 0} </span>
                      </button>
                      <button
                        className="text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => handleReplyToggle(comment.id)}
                      >
                        Reply
                      </button>
                    </div>
                    {replyOpen[comment.id] && (
                      <div className="mt-2 flex items-center gap-2 px-3">
                        <Input
                          size={"sm" as any}
                          placeholder="Write a reply..."
                          value={replyText[comment.id] || ''}
                          onChange={(e) => setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit(comment.id)}
                          className="flex-1 border border-border px-3 py-2 rounded-full"
                        />
                        <Button size="icon" onClick={() => handleReplySubmit(comment.id)} disabled={!((replyText[comment.id] || '').trim())}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {/* Render replies if any */}
                    {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                      <div className="mt-3 ml-12 space-y-3">
                        {comment.replies.map((rep: Comment) => (
                          <div key={rep.id} className="flex gap-3 items-start">
                            <Avatar className="h-7 w-7">
                              {rep.authorAvatar && isImageUrl(rep.authorAvatar) ? (
                                <AvatarImage src={rep.authorAvatar} alt={rep.author} />
                              ) : (
                                <AvatarFallback>{(rep.author || 'U').charAt(0)}</AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <div className="bg-muted rounded-lg px-3 py-2">
                                <p className="font-semibold text-sm">{rep.author}</p>
                                <p className="text-sm">{rep.content}</p>
                              </div>
                              <div className="flex gap-4 mt-1 px-3">
                                <button className="text-xs text-muted-foreground hover:text-foreground">
                                  {formatTimestamp(rep.timestamp)}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>

        </Card>
      ))}
    </div>
  );
}