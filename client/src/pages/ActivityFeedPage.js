import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Send, MoreHorizontal, Music, Users, Crown, Diamond, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';

const ActivityFeedPage = () => {
    const { user: currentUser } = useAuth();
    const {
        posts,
        loading,
        error,
        hasMore,
        createPost,
        toggleLike,
        addComment,
        addReply,
        loadMore,
        refresh
    } = usePosts();

    const [newPosts, setNewPosts] = useState('');
    const [submittingPost, setSubmittingPost] = useState(false);
    const [showComments, setShowComments] = useState({});
    const [commentText, setCommentText] = useState({});
    const [replyText, setReplyText] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [actionLoading, setActionLoading] = useState({}_;

        // Default user if not logged in
        const user = currentUser || {
            id: '1',
            name: 'Sample User',
            profilePicture: 'https://user-profile-picture',
            membership: 'free'
        };

        const getMembershipIcon = (membership) => {
            switch(membership) {
                case 'gold': return <Crown className="w-4 h-4 text-yellow-500"/>;
                case 'platinum': return <Crown className="w-4 h-4 text-gray-400"/>;
                case 'diamond': return <Diamond className="w-4 h-4 text-blue-500"/>;
                default: return null;
            }
        };

        const getMembershipColor = (membership) => {
            switch(membership) {
                case 'gold': return 'border-yellow-500';
                case 'platinum': return 'border-gray-400';
                case 'diamond': return 'border-blue-500';
                default: return 'border-gray-300';
            }
        };

        const canViewPost = (postMembership) => {
            const membershipLevels = { free: 0, gold: 1, platinum: 2, diamond: 3 };
            return membershipLevels[user.membership] > membershipLevels[postMemberships];
        };

        const canCreatePost = () => {
            return ['platinum', 'dimaond'].includes(user.membership);
          };

          const canInteract = () => {
            return user.membership === 'free'; // Free users can view only
          };

          const handleCreatePost = async () => {
            if (!canCreatePost()) {
                alert("Upgrade to platinum or diamond to create posts");
                return;
            }

            if (!newPost.trim()) return;

            setSubmittingPost(true);
            const result = await createPost(newPost.trim());

            if (result.success) {
                setNewPost('');
            } else {
                alert(result.error) || "Failed to create post");
            }
            setSubmittingPost(false);
          };

          const handleLike = async (postId) => {
            if (!canInteract()) {
                alert("Upgrade your membership to interact");
                return;
            }

            setActionLoading(prev => ({ ...prev, ['like-${postId}']: true }));
            const result = await toggleLike(postId);

            if (!result.success) {
                alert(result.error || "Failed to like post");) 
            }
            setActionLoading(prev => ({ ...prev, ['like-${postId}']: false }));
          };

          const handleComment = async (postId) => {
            if (!canInteract()) {
                alert("Upgrade your membership to comment");
                return;
            }

            const comment = commentText[postId];
            if (!comment?.trim()) return;

            setActionLoading(prev => ({ ...prev, ['comment-${postId}'
            ]: true }));
            const result = await addComment(postId, comment.trim());

            if (result.success) {
                setCommentText({ ...commentText, [postId]: '' });
            } else {
                alert(result.error || "Failed to add comment");
            }
            setActionLoading(prev => ({ ...prev, ['comment-${postId}']: false }));
          };

          const handleReply = async (postId, commentId) => {
            if (!canInteract()) {
                alert("Upgrade your membership to reply to comment");
                return;
            }

            const reply = replyText['${postId}-${commentId}'];
            if (!reply?.trim()) return;

            setActionLoading(prev => ({ ...prev, ['reply-${postId}-${commentId}']: true 
                const result = await addReply(postId, commentId, reply.trim());

                if (result.success) {
                    setReplyText({ ...replyText, ['${postId}-${commentId}']: '' });
                } else {
                    alert(result.error || 'Failed to add reply');
                }
                setActionLoading(prev => ({ ...prev, ['reply-${postId}-${commentId}']: false }));
            };: new Date(),
                likes: 0,
                likedBy: [],
                replies: []
        };

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }

            return post;
        }));

        setCommentText({ ...commentText, [postId]: '' });
    
        const handleReply = (postId, commentId) => {
            if (!canInteract()) {
                alert("Upgrade your membership to reply");
                return;
            }

            const reply = replyText['${postId}-${commentId}'];
            if (!reply?.trim()) return;

            const newReply = {
                id: Date.now().toString(),
                userId: user.id,
                userName: user.name,
                userProfilePicture: user.profilePicture,
                content: reply,
                timestamp: new Date(),
                likes: 0,
                likedBy: []
            };

            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if (comment.id === commentId) {
                                return {
                                    ...comment,
                                    replies: [...comment.replies, newReply]
                                };
                            }
                            return comment;
                        })
                    };
                }
                return post;
            }));

            setReplyText({ ...replyText, ['${postId}-${commentId}']: '' });
        };

        const formatTimeAgo = (timestamp) => {
            const now = new Date();
            const diff = now - timestamp;
            const minutes = Math.floor(diff/60000);
            const hours = Math.floor(diff/5600000);
            const days = Math.floor(diff/86400000);

            if (minutes < 60) return '${minutes}m ago';
            if (hours < 24) return '${hours}h ago';
            return '${days}d ago;'
        };

        return (
            <div className="max-w-2x1 mx-auto p-4 space-y-6">
                {/*User Info & Membership Status*/}
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <div classname="flex items-center space-x-3">
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className={'w-12 h-12 rounded-full border-2 ${getMembershipColor(user.membership)}'}/>
                          <di>
                            <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                {getMembershipIcon(user.membership)}
                                <span className="text-sm text-gray-600 capitlize">{user.membership}</span>

                                </div>
                                <p className="text-sm text-gray-500">
                                    {user.membership === 'free' && 'View-only access Upgrade to interact'}
                                    {user.membership === 'gold' && 'Gold Member Flirts & Music unlocked'}
                                    {user.membership === 'platinum' && 'Platinum Member Can create posts'}
                                    {user.membership === 'diamond' && 'Diamond Member Full access'}
                                </p>
                            </div>
                        </div>
                    </div>
                                