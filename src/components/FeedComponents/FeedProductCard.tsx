import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Heart, MessageCircle, Send } from "lucide-react";
import { FeedProduct, Comment, Replay } from "./FeaturedPost";
import { useAppSelector } from "@/store/hooks";
import {
  useLikeProductMutation,
  useLikeCommentMutation,
  useCommentOnProductMutation,
  useCommentReplyMutation,
  useViewProductMutation,
} from "@/store/services/productsApi";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface FeedProductCardProps {
  product: FeedProduct;
  onBuyNow?: (product: FeedProduct) => void;
}

const FeedProductCard: React.FC<FeedProductCardProps> = ({ product, onBuyNow }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  // State
  const [comments, setComments] = useState<Comment[]>(product.socialDetails?.comments || []);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyOpen, setReplyOpen] = useState<Record<string, boolean>>({});
  const [commentLikeLoading, setCommentLikeLoading] = useState<Record<string, boolean>>({});
  const [localLikes, setLocalLikes] = useState<number>(product.likes || 0);
  const [localIsLiked, setLocalIsLiked] = useState<boolean>(product.isLiked || false);
  const [localViews, setLocalViews] = useState<number>(product.socialDetails?.viewers?.length || 0);

  const viewedRef = useRef<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mutations
  const [likeProduct, { isLoading }] = useLikeProductMutation();
  const [likeComment] = useLikeCommentMutation();
  const [commentOnProduct] = useCommentOnProductMutation();
  const [commentReply] = useCommentReplyMutation();
  const [viewProduct] = useViewProductMutation();

  const seller = product.sellerId || {};

  const isImageUrl = (url?: string) => url ? /\.(jpe?g|png|webp|gif|svg|bmp)(\?|$)/i.test(url) : false;

  const formatNumber = (num: number) => (num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString());

  const renderPriceRange = (pricing: FeedProduct["pricingAndInventory"]) => {
    if (!pricing || pricing.length === 0) return "$0";
    const prices = pricing.map((p) => p.price || 0);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} - $${max}`;
  };

  // Intersection Observer for views
  const initObserver = useCallback(() => {
    if (observerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).dataset.productId;
          if (!id || viewedRef.current[id]) return;
          viewedRef.current[id] = true;
          viewProduct(id)
            .then(() => setLocalViews((prev) => prev + 1))
            .catch((err) => console.error("View API failed", err));
        });
      },
      { threshold: 0.5 }
    );
  }, [viewProduct]);

  useEffect(() => {
    initObserver();
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [initObserver]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCardRef = (_id: string) => (el: HTMLElement | null) => {
    if (!el) return;
    initObserver();
    observerRef.current?.observe(el);
  };

  // Handlers
  const handleLikeProduct = async () => {
    if (!user) return;
    try {
      setLocalIsLiked((prev) => !prev);
      setLocalLikes((prev) => prev + (localIsLiked ? -1 : 1));
      await likeProduct(product._id).unwrap();
    } catch {
      setLocalIsLiked((prev) => !prev);
      setLocalLikes((prev) => prev + (localIsLiked ? 1 : -1));
    }
  };

  const handleCommentSubmit = async () => {
    const text = (commentText[product._id] || "").trim();
    if (!text) return;
    try {
      await commentOnProduct({ id: product._id, comment: text }).unwrap();
      setCommentText((prev) => ({ ...prev, [product._id]: "" }));
      setComments((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          userId: {
            _id: user?._id || "",
            name: user?.name || "You",
            // @ts-expect-error is safe
            userName: user?.userName || "",
            img: user?.img || null,
          },
          message: text,
          likes: [],
          replays: [],
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyToggle = (id: string) =>
    setReplyOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleReplySubmit = async (commentId: string) => {
    const text = (replyText[commentId] || "").trim();
    if (!text) return;
    try {
      await commentReply({ id: commentId, comment: text }).unwrap();
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setReplyOpen((prev) => ({ ...prev, [commentId]: false }));
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? {
                ...c,
                replays: [...(c.replays || []), {
                  _id: Date.now().toString(),
                  userId: {
                    _id: user?._id || "",
                    name: user?.name || "You",
                           // @ts-expect-error is safe
                    userName: user?.userName || "",
                    img: user?.img || null,
                  },
                  message: text,
                  likes: [],
                }],
              }
            : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    setCommentLikeLoading((prev) => ({ ...prev, [commentId]: true }));
    try {
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? {
                ...c,
                likes: c.likes.includes(user?._id || "")
                  ? c.likes.filter((id) => id !== user?._id)
                  : [...c.likes, user?._id || ""],
              }
            : c
        )
      );
      await likeComment(commentId).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setCommentLikeLoading((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const ReplyItem = ({ reply }: { reply: Replay }) => (
    <div className="flex gap-3">
      <Avatar className="w-7 h-7">
        {reply.userId.img && isImageUrl(reply.userId.img) ? (
          <AvatarImage src={reply.userId.img} alt={reply.userId.name} />
        ) : (
          <AvatarFallback>{reply.userId.name.charAt(0)}</AvatarFallback>
        )}
      </Avatar>
      <div>
        <div className="bg-gray-100 rounded-lg px-3 py-2">
          <p className="font-semibold text-sm">{reply.userId.name}</p>
          <p className="text-sm">{reply.message}</p>
        </div>
      </div>
    </div>
  );

  const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8">
        {comment.userId.img && isImageUrl(comment.userId.img) ? (
          <AvatarImage src={comment.userId.img} alt={comment.userId.name} />
        ) : (
          <AvatarFallback>{comment.userId.name.charAt(0)}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg px-3 py-2">
          <p className="font-semibold text-sm">{comment.userId.name}</p>
          <p className="text-sm">{comment.message}</p>
        </div>
        <div className="flex gap-4 mt-1 text-xs text-gray-500">
          <button
            className={`flex items-center gap-1 ${
              comment.likes.includes(user?._id || "") ? "text-red-600" : "hover:text-gray-700"
            }`}
            onClick={() => handleLikeComment(comment._id)}
            disabled={!!commentLikeLoading[comment._id]}
          >
            <Heart className="w-3 h-3" /> {comment.likes.length || 0}
          </button>
          <button onClick={() => handleReplyToggle(comment._id)}>Reply</button>
        </div>

        {replyOpen[comment._id] && (
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Write a reply..."
              value={replyText[comment._id] || ""}
              onChange={(e) => setReplyText((prev) => ({ ...prev, [comment._id]: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleReplySubmit(comment._id)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-full"
            />
            <Button size="icon" onClick={() => handleReplySubmit(comment._id)} disabled={!(replyText[comment._id] || "").trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}

        {comment.replays?.length > 0 && (
          <div className="ml-10 mt-2 space-y-2">
            {comment.replays.map((r) => (
              <ReplyItem key={r._id} reply={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div data-product-id={product._id} ref={handleCardRef(product._id)} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            {seller.img && isImageUrl(seller.img) ? <AvatarImage src={seller.img} alt={seller.name} /> : <AvatarFallback>{(seller.name || "S")[0]}</AvatarFallback>}
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{seller.name || "Unknown Seller"}</p>
            <p className="text-xs text-gray-500">{seller.businessName || ""}</p>
          </div>
        </div>
        <span className="px-3 py-1 text-sm font-semibold bg-yellow-400 rounded-lg">Featured Post</span>
      </div>

      {/* TITLE + DESCRIPTION */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">{product.productInformation?.title}</h2>
      <p className="text-sm text-gray-700 mb-4">{product.productInformation?.description}</p>

      {/* IMAGES */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {product.images?.slice(0, 3).map((img, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden">
            <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition" />
          </div>
        ))}
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.productInformation?.tags?.map((tag, i) => (
          <span key={i} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">#{tag}</span>
        ))}
      </div>

      {/* PRICE + ACTIONS */}
      <div className="flex items-center justify-between py-2 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-900">{renderPriceRange(product.pricingAndInventory)}</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700" onClick={() => onBuyNow?.(product)}>Buy Now</button>
          <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50" onClick={() => navigate(`/feed/messages/${seller._id}/${product._id}`)}>Message</button>
        </div>
      </div>

      {/* STATS */}
      <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm border-t border-gray-100 pt-2">
        <button className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors duration-200" onClick={handleLikeProduct} disabled={isLoading}>
          {localIsLiked ? <BsHeartFill size={20} className="animate-pulse" /> : <BsHeart size={20} className="hover:scale-110 transition-transform duration-200" />}
          <span className="text-sm font-medium">{formatNumber(localLikes)}</span>
        </button>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> {comments.length}
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" /> {formatNumber(localViews)}
        </div>
      </div>

      {/* COMMENT INPUT */}
      <div className="flex items-center gap-2 mt-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.img || "/dummy/user.jpg"} alt="You" />
        </Avatar>
        <Input placeholder="Write a comment..." value={commentText[product._id] || ""} onChange={(e) => setCommentText((prev) => ({ ...prev, [product._id]: e.target.value }))} onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()} className="flex-1 border border-gray-300 px-4 py-2 rounded-full" />
        <Button size="icon" onClick={handleCommentSubmit} disabled={!(commentText[product._id] || "").trim()}><Send className="w-4 h-4" /></Button>
      </div>

      {/* COMMENTS */}
      <div className="mt-4 space-y-3">
        {comments.map((c) => <CommentItem key={c._id} comment={c} />)}
      </div>
    </div>
  );
};

export default FeedProductCard;
