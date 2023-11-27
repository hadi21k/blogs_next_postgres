export const findUser = async (client, email) => {
  return await client.query(
    `
            SELECT * FROM users
                WHERE email = $1
        `,
    [email]
  );
};
