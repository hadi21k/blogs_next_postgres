const insertIntoSave = async (client, blog_id, user_id) => {
  await client.query(
    `
            INSERT INTO saves (blog_id, user_id)
            VALUES ($1, $2)
        `,
    [blog_id, user_id]
  );
};

const getSavedBlogs = async (client, userId) => {
  return await client.query(
    `
      SELECT blog_id FROM saves 
        WHERE user_id = $1
      `,
    [userId]
  );
};

const getAllSavedBlogsByUserId = async (client, userId) => {
  return await client.query(
    `
            SELECT * FROM saves s
            INNER JOIN users u on u.user_id = s.user_id
            INNER JOIN blogs b on b.blog_id = s.blog_id
            WHERE s.user_id = $1
        `,
    [userId]
  );
};

const deleteSave = async (client, blog_id, user_id) => {
  await client.query(
    `
            DELETE FROM saves
            WHERE blog_id = $1 AND user_id = $2
        `,
    [blog_id, user_id]
  );
};

export { insertIntoSave, getSavedBlogs, getAllSavedBlogsByUserId, deleteSave };
