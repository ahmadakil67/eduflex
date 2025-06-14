import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

// 3. DiscussionForum Component: Consumes AuthContext and handles forum logic
const DiscussionForum = () => {
  const { user, loadingAuth } = useContext(AuthContext); // Accessing the user and loadingAuth from AuthContext

  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(false); // For API requests
  const [replyContentMap, setReplyContentMap] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [editPostId, setEditPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'votes'

  // Helper function to format time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // Fetch posts from the API
  useEffect(() => {
    if (loadingAuth) return; // Wait for authentication to be ready

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/discussions');
        let fetchedPosts = response.data;

        // Apply sorting client-side
        if (sortOrder === 'newest') {
          fetchedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else if (sortOrder === 'votes') {
          fetchedPosts.sort((a, b) => b.votes - a.votes);
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [sortOrder, loadingAuth]); // Re-fetch when sortOrder or auth loading state changes

  // Add a new post
  const addPost = async () => {
    if (!newPostContent.trim() || !user) return; // Ensure user is available

    setLoading(true);
    const newPost = {
      content: newPostContent,
      author: user.displayName,
      authorId: user.userId,
      timestamp: new Date().toISOString(),
      votes: 0,
      replies: [],
    };

    try {
      const response = await axios.post('http://localhost:3000/discussions', newPost);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      setNewPostContent('');
    } catch (error) {
      console.error('Error adding post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a reply to a post
  const addReply = async (postId) => {
    const replyContent = replyContentMap[postId];
    if (!replyContent || !replyContent.trim() || !user) return;

    setLoading(true);
    const reply = {
      content: replyContent,
      author: user.displayName,
      authorId: user.userId,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.put(`http://localhost:3000/discussions/reply/${postId}`, reply);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? response.data : post
        )
      );
      setReplyContentMap(prev => ({ ...prev, [postId]: '' }));
      setShowReplyInput(prev => ({ ...prev, [postId]: false }));
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setLoading(false);
    }
  };

  // Upvote a post
  const upvotePost = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/discussions/vote/${postId}`);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? response.data : post
        )
      );
    } catch (error) {
      console.error('Error upvoting post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit a post
  const editPost = async (postId) => {
    if (!editPostContent.trim() || !user) return;

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/discussions/${postId}`, { content: editPostContent });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? response.data : post
        )
      );
      setEditPostId(null);
      setEditPostContent('');
    } catch (error) {
      console.error('Error editing post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/discussions/${postId}`);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a reply
  const deleteReply = async (postId, replyIndex) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;

    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3000/discussions/reply/${postId}/${replyIndex}`);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? response.data : post
        )
      );
    } catch (error) {
      console.error('Error deleting reply:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Community Discussion Forum
        </h2>

        {/* Current User Info */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <p className="text-gray-700 text-lg">
            Welcome, <span className="font-semibold">{user?.displayName || 'Guest'}</span>!
          </p>
          <p className="text-sm text-gray-600">
            User ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded-md text-xs">{user?.userId || 'N/A'}</span>
          </p>
        </div>

        {/* Create a new post */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 resize-y focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            rows="4"
            placeholder="Share your thoughts or ask a question..."
            maxLength="500"
            disabled={loading}
          />
          <button
            onClick={addPost}
            disabled={!newPostContent.trim() || loading || !user}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? 'Posting...' : 'Post New Discussion'}
          </button>
        </div>

        {/* Sorting Options */}
        <div className="mb-6 flex justify-end items-center">
          <label htmlFor="sortOrder" className="text-gray-700 mr-2">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="votes">Most Voted</option>
          </select>
        </div>

        {/* Display posts in scrollable container */}
        <div className="max-h-[500px] overflow-y-auto">
          {loading && posts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">No posts yet. Be the first to create one!</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                  {/* Edit Post UI */}
                  {editPostId === post._id ? (
                    <div>
                      <textarea
                        value={editPostContent}
                        onChange={(e) => setEditPostContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 resize-y focus:ring-purple-500 focus:border-purple-500"
                        rows="3"
                        maxLength="500"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editPost(post._id)}
                          disabled={!editPostContent.trim() || loading}
                          className="bg-purple-600 text-white p-2 rounded-md font-medium hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => { setEditPostId(null); setEditPostContent(''); }}
                          className="bg-gray-400 text-white p-2 rounded-md font-medium hover:bg-gray-500 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Post UI
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-gray-800 leading-tight pr-4">{post.content}</h4>
                        <div className="flex-shrink-0 flex flex-col items-center ml-4">
                          <button
                            onClick={() => upvotePost(post._id)}
                            className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="Upvote"
                            disabled={loading}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a.75.75 0 01-.75-.75V5.612L5.29 9.79a.75.75 0 11-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.178V17.25c0 .414-.336.75-.75.75z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="text-lg font-bold text-blue-700 mt-1">{post.votes}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Posted by <span className="font-medium">{post.author}</span> ({timeAgo(post.timestamp)})
                      </p>

                      {/* Post Actions */}
                      {user?.userId === post.authorId && (
                        <div className="flex space-x-3 mb-4 border-b pb-4 border-gray-100">
                          <button
                            onClick={() => { setEditPostId(post._id); setEditPostContent(post.content); }}
                            className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deletePost(post._id)}
                            className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {/* Replies Section */}
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h5 className="font-semibold text-gray-700 mb-3 text-lg">Replies ({post.replies?.length || 0}):</h5>
                        <div className="space-y-4">
                          {post.replies && post.replies.length > 0 ? (
                            post.replies.map((reply, index) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                                <p className="text-gray-800">{reply.content}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  — <span className="font-medium">{reply.author}</span> ({timeAgo(reply.timestamp)})
                                </p>
                                {user?.userId === reply.authorId && (
                                  <div className="mt-2">
                                    <button
                                      onClick={() => deleteReply(post._id, index)}
                                      className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200 font-medium"
                                      disabled={loading}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">No replies yet. Be the first to reply!</p>
                          )}
                        </div>

                        {/* Add Reply Input */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => setShowReplyInput(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
                            className="text-blue-600 hover:underline text-sm mb-3 focus:outline-none"
                            disabled={loading}
                          >
                            {showReplyInput[post._id] ? 'Hide Reply Input' : 'Add a Reply'}
                          </button>

                          {showReplyInput[post._id] && (
                            <>
                              <textarea
                                value={replyContentMap[post._id] || ''}
                                onChange={(e) => setReplyContentMap(prev => ({ ...prev, [post._id]: e.target.value }))}
                                placeholder="Write your reply here..."
                                className="w-full p-3 border border-gray-300 rounded-lg mb-3 resize-y focus:ring-green-500 focus:border-green-500"
                                rows="3"
                                maxLength="300"
                                disabled={loading}
                              />
                              <button
                                onClick={() => addReply(post._id)}
                                disabled={!replyContentMap[post._id]?.trim() || loading || !user}
                                className="bg-green-600 text-white p-2 rounded-md font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                              >
                                {loading ? 'Replying...' : 'Submit Reply'}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
