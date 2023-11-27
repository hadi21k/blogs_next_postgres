const getAllBlogs = async (client) => {
  return await client.query(
    `
        SELECT * FROM blogs b
          INNER JOIN users u ON b.user_id = u.user_id
            ORDER BY b.blog_id DESC
    `
  );
};

const getBlogById = async (client, blog_id) => {
  return await client.query(
    `
        SELECT * FROM blogs b
          INNER JOIN users u ON b.user_id = u.user_id
            WHERE b.blog_id = $1
    `,
    [blog_id]
  );
};

const getBlogsByUserId = async (client, userId) => {
  return await client.query(
    `
        SELECT * FROM blogs b
          INNER JOIN users u ON b.user_id = u.user_id
            WHERE b.user_id = $1
              ORDER BY b.blog_id DESC
    `,
    [userId]
  );
};

const insertIntoBlogs = async (
  client,
  blog_id,
  user_id,
  title,
  content,
  tag_name,
  minutes
) => {
  await client.query(
    `
            INSERT INTO blogs (blog_id, user_id, title, content, read_time, tag_name)
            VALUES ($1, $2, $3, $4, $5, $6)
        `,
    [blog_id, user_id, title, content, minutes, tag_name]
  );
};

const updateBlogById = async (client, blog_id, title, tag, content) => {
  await client.query(
    `
                UPDATE blogs
                    SET title = $1, content = $2, tag_name = $3
                    WHERE blogs.blog_id = $4
            `,
    [title, content, tag, blog_id]
  );
};

const deleteBlogById = async (client, blog_id) => {
  await client.query(
    `
            DELETE FROM blogs
            WHERE blog_id = $1
        `,
    [blog_id]
  );
};

const combineBlogs = (blogs, savedBlogs, likedBlogs) => {
  const savedBlogIds = savedBlogs.rows.map((row) => row.blog_id);
  const likedBlogIds = likedBlogs.rows.map((row) => row.blog_id);

  return blogs.rows.map((blog) => {
    const isLikedByCurrentUser = likedBlogIds.includes(blog.blog_id);
    const isSavedByCurrentUser = savedBlogIds.includes(blog.blog_id);
    return {
      ...blog,
      isLikedByCurrentUser,
      isSavedByCurrentUser,
    };
  });
};

export {
  getAllBlogs,
  getBlogById,
  getBlogsByUserId,
  combineBlogs,
  insertIntoBlogs,
  updateBlogById,
  deleteBlogById,
};
