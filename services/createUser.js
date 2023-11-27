export const createUser = async (
  client,
  userId,
  email,
  name,
  profile_picture
) => {
  await client.query(
    `
        INSERT INTO users (user_id, email, name, profile_picture)
            VALUES ($1, $2, $3, $4)
    `,
    [userId, email, name, profile_picture]
  );
};
