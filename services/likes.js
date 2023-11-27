const getLikedBlogs = async (client, userId) => {
  return await client.query(
    `
        SELECT blog_id FROM likes 
          WHERE user_id = $1
      `,
    [userId]
  );
};

const insertIntoLikes = async (client, blog_id, user_id) => {
  return await client.query(
    `
        INSERT INTO likes (blog_id, user_id)
          VALUES ($1, $2)
    `,
    [blog_id, user_id]
  );
};

const deleteLike = async (client, blog_id, user_id) => {
  await client.query(
    `
            DELETE FROM likes
            WHERE blog_id = $1 AND user_id = $2
        `,
    [blog_id, user_id]
  );
};

export { getLikedBlogs, insertIntoLikes, deleteLike };
