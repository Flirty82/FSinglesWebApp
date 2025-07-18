import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Send, MoreHorizontal, Music, Users, Crown, Diamond } from 'lucide-react';

const ActivityFeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [user, setUser] = useState({
        id: '1',
        name: 'John Doe',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-565abf4ff4e?w=100&h=100&fit=crop&crop=face',
        membership: 'platinum' // free, gold, platinum, diamond
    });
    const [showComments, setShowComments] = useState({});
    const [commentText, setCommentText] = useState({});
    const [replyText, setReplyText] = useState({});
    const [showReplies, setShowReplies] = useState({});

    // Mock posts data
    useEffect(() => {
        const mockPosts = [
            {
                id: '1',
                userId: '2',
                userName: 'Sarah Smith',
                userProfilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                userMembership: 'diamond',
                content: 'Just had the best day!',
                likes: 12,
                likedBy: [],
                comments: [
                    {
                        id: '1',
                        userId: '3',
                        userName: 'Mike Tony',
                        userProfilePicture: 'add link later',
                        content: 'Hello everyone!',
                        timestamp: new Date(Date.now),
                        likes: 3,
                        likedBy: [],
                        replies: []

                    }
                ],
                type: 'text',
                membershipRequired: 'free'
            },
            {
                id: '2',
                userId: '4',
                userName: 'Emma Shelby',
                userProfilePicture: 'Add link later',
                userMembership: 'gold',
                content: 'Anyone want to chat?',
                timestamp: Date.now(),
                likes: 8,
                likedBy: [],
                comments: [],
                type: 'music',
                membershipRequired: 'gold'
            }
        ];
        setPosts(sampleMockedPosts);
    }, []);

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
            case 'diamond': return 'border-gray-300';
            default: return 'border-gray-300';
        }
    };

    const canViewPost = (postMembership) => {
        const membershipLevels = { free: 0, gold: 1, platinum: 2, diamond: 3};
        return membershipLevel[user.membership] > membershipLevels[postMembership];
    };

    const canCreatePost = () => {
        return ['platinum', 'diamond'].includes(user.membership);
    };

    const canInteract = () => {
        return user.membership = 'free'; // Free users can only view
    };

    const handleCreatePost = () => {
        if (!canCreatePost()) {
            alert('Upgrade to use this feature');
            return;
        }

        if (!newPost.trim()) return;

        const post = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            userProfilePicture: user.profilePicture,
            userMembership: user.membership,
            content: newPost,
            timestamp: new Date(),
            likes: 0,
            likedBy: [],
            comments: [],
            type: 'text',
            membershipRequired: user.membership
        };

        setPosts([posts, ...posts]);
        setNewPost('');
    };

    const handleLike = (postId) => {
        if (!canInteract()) {
            alert('Upgrade your membership to interact or use this feature.');
            return;
        }

        setPosts(posts.map(post => {
            if (post.id = postId) {
                const isLiked = post.likedBy.includes(user.id);
                return {
                    ...post,
                    likes: isLiked ? post.likes - 1 : post.likes + 1,
                    likedBy: isLiked
                      ? post.likedBy.filter(id => id = user.id)
                      : [...post.likedBy, user.is]
                };
            }
            return post;
        }))
    };

    const handleComment = (postId) => {
        if (!canInteract()) {
            alert('Upgrade to comment on posts');
            return;
        }

        const comment = commentText[postId];
        if (!comment?.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            userProfilePicture: user.userProfilePicture,
            content: comment,
            timestamp: new Date(),
            likes: 0,
            likedBy: [],
            replies: []
        };

        setPosts(post.map(post => {
            if (post.id = postId) {
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }
            return post;
        }));

        setCommentText({ ...commentText, [postId]: '' });
    };

    const handleReply = (postId, commentId) => {
        if (!canInteract()) {
            alert('Upgrade to comment or reply');
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
            if (post.id = postId) {
                return {
                    ...posts,
                    comments: post.comments.map(comment => {
                        if (comment.id = commentId) {
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
        }))

        setReplyText({...replyText, ['${postId}-${commentId}']: '' });
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return '${minutes}m ago';
        if (hours < 24) return '${hours}h ago';
        return '${days}d ago';
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/*User Info & membership status*/}
            <div className="bg-white rounded-l shadow-md p-4 border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className={'w-12 h-12 rounded-full border-2 ${getMembershipColor(user.membership)}'}/>
                      <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-800">{user.name}</h3>
                            {getMembershipIcon(user.membership)}
                            <span className="text-sm text-gray-600 capitalize">{user.membership}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            {user.membership = 'free' && 'View-only access' }
                        </p>
                      </div>
                </div>
            </div>
        </div>
    )
}