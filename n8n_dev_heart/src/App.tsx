

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = 'https://lddwifpwltvxbamtpgzt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZHdpZnB3bHR2eGJhbXRwZ3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMTI0ODksImV4cCI6MjA1ODU4ODQ4OX0.UyREfrhYEy9IFg9Shhd8VU7N9l65zRtDF6HV1mo0nNI';
const supabase = createClient(supabaseUrl, supabaseKey);

const PostsList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) throw error;
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="mb-4 p-4 border rounded-lg shadow">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </li>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </ul>
    </div>
  );
};

export default PostsList;
