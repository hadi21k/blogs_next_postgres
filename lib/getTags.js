const { default: connectToDB } = require("@/config/connectToDB");
import { unstable_cache } from "next/cache";

const getTags = unstable_cache(async () => {
  try {
    const client = await connectToDB();

    const { rows } = await client.query(`
            SELECT * FROM blogs_tag 
        `);

    await client.end();
    return rows;
  } catch (err) {
    console.log(err.message);
    return null;
  }
});

export default getTags;
