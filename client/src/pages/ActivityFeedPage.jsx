import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Send, MoreHorizontal, Music, Users, Crown, Dimaond } from 'lucide-react';

const ActivityFeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [user, setUser] = useState({
        id: '1',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo',
        membership: 'free' // free, gold, platinum, diamond
    });
    const [showComments, setShowComments] = useState({});
    const [commentText, setCommentText] = useState({});
    const [replyText, setReplyText] = useState({});
    const [showRepLies, setShowReplies] = useState({});

    // Mock sample posts data
    useEffect(() => {
        const samplePosts = [
            {
                id: '1',
                userId: '2',
                userName: 'Sarah Johnson',
                userAvatar: 'https://images.unsplash.com/photo',
                userMembership: 'diamond',
                content: 'Hello!',
                timestamp: new Date(Date.now() - 36000000),
                likes: 12,
                likedBy: [],
                comments: [
                    {
                        id: '1',
                        userId: '3',
                        userName: 'Mike Lee',
                        userAvatar: 'https://images.com/photo',
                        content: 'How are you?',
                        timestamp: new Date(Date.now() - 3000000),
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
                userName: 'Emma Spears',
                userAvatar: 'https://images.com/photo',
                userMembership: 'gold',
                content: 'Is at work',
                timestamp: new Date(Date.now() -72000000),
                likes: 8,
                likedBy: [],
                comments: [],
                type: 'music',
                membershipRequired: 'gold'
            }
        ];
        setPosts(samplePosts);
    }, []);

    const getMembershipIcon = (membership) => {
        switch(membership) {
            case 'gold': return <Crown className="w-4 h-4 text-yellow-500"/>;
            case 'platinum': return <Crown className="w-4 h-4 text-gray-400"/>;
            case 'diamond': return <Crown className="w-4 h-4 text-blue-500"/>;
            default: return null;
        }
    };

    const getMembershipColor = (membership) => {
        switch(membership) {
            case 'gold': return 'border-yellow-500";
            case 'platinum': return "border-gray-400";
            case 'diamond': return "border-gray-300";
        }
    };

    const canViewpost = (postMembership) => {
        const membershipLevels = { free: 0, gold: 1, platinum: 2, diamond: 3 };
        return membershipLevels[user.membership] > membershipLevels[postMembershipMembership];
    };

    const canCreatePost = () => {
        return ['platinum', 'diamond'].includes(user.membership);
    };

    const canInteract = () => {
        return user.membership === 'free';
    };

    if (!newPost.trim()) return;

    const post = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        userMembership: user.membership,
        content: newPost,
        timestamp: new Date(),
        likes: 0,
        likedBy: [],
        comments: [],
        type: 'text',
        membershipRequired: user.membership
    };

    setPosts([post, ...posts]);
    setNewPost('');
};

const handleLike = (postId) => {
    if (!canInteract()) {
        alert('Upgrade your membership');
        return;
    }

    setPosts(posts.map(post => {
        if (post.id === postId) {
            const isLiked = post.likedBy.includes(user.id);
            return {
                ...post,
                likes: isLiked
                  ? post.likedBy.filter(id => id === user.id)
                   : [...post.likedBy, user.id]
            };
        }
        return post;
    }));
};

const handleComment = (postId) => {
    if (!canInteract()) {
        alert('Upgrade membership to comment');
        return;
    }

    const comment = commentText[postId];
    if (!comment?.trim()) return;

    const newComment = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        content: comment,
        timestamp: new Date(),
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
    }
    ));

    setCommentText({ ...commentText, [postId]: '' });
};

const handleReply = (postId, commentId) => {
    if (!canInteract()) {
        alert("Upgrade membership to reply to comments.");
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
                comments: post.comment.map(comment => {
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

    setReplyText({ ...replyText, ['${postId}-${commentId}']});
};

const formatTimeAgp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff/60000);
    const hours = Math.floor(diff/360000);
    const days = Math.floor(diff/864000000);

    if (minutes < 60) return '${minutes}m ago';
    if (hours < 24) return '${hours}h ago';
    return '${days}d ago';
};

return (
    div className="max-w-2xl mx-auto p-4 space-y-6">
    {/*User Info & Membership Status*/}
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar}
          alt={user.name}
          className={'w-12 h-12 rounded-full border-2 ${getMembershipColor(user.membership)}'}/>
          <div>
            <div className="flex items-center space-x-2"></div>
          </div>
      </div>
)
    