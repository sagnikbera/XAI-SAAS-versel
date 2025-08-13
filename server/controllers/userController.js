import sql from "../configs/db.js";

//! Get all creation of particular user
export const getUserCreations = async (req, res) => {
  try {
    const { useId } = req.auth();

    const creations = await sql`
                                SELECT * FROM creations
                                WHERE user_id = ${useId}
                                ORDER BY created_at DESC
                                `;
    res.json({
      success: true,
      creations: creations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//! Get all published creations
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
                                SELECT * FROM creations
                                WHERE publish = true
                                ORDER BY created_at DESC
                                `;
    res.json({
      success: true,
      creations: creations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//! Like dislike
export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body();

    const [creation] = await sql`
                                SELECT * FROM creations
                                WHERE id = ${id}
                                `;
    if (!creation) {
      return res.json({
        success: false,
        message: "Creation not found",
      });
    }

    const currentLikes = creation.like;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if(currentLikes.includes(userIdStr)) {
        updatedLikes = currentLikes.filter((user)=> {
            user !== userIdStr
        });
        message = 'Creation Unliked!'
    }else {
        updatedLikes = [...currentLikes , userIdStr];
        message = 'Creation Liked!'
    }

    const formattedArray = `{
        ${updatedLikes.json(',')}
    }`


    await sql`
            UPDATE creations
            SET likes = ${formattedArray}::text[]
            WHERE id = ${id}
            `;

    res.json({
      success: true,
      message : message
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
