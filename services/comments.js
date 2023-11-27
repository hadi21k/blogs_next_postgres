const getAllComments = async (client, blog_id) => {
  return await client.query(
    `
        SELECT * FROM comments c
        INNER JOIN users u ON u.user_id = c.user_id
        WHERE blog_id = $1
        ORDER BY c.date DESC
    `,
    [blog_id]
  );
};

export { getAllComments };
