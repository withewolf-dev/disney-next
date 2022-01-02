/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getMovie(req, res);
    }

    // case "POST": {
    //   return addPost(req, res);
    // }

    case "PUT": {
      return updateMovie(req, res);
    }

    case "DELETE": {
      return deleteMovie(req, res);
    }
  }
}

async function updateMovie(req, res) {
  const { movieId } = req.query;

  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection("movies").updateOne(
      {
        _id: new ObjectId(movieId),
      },
      { $set: JSON.parse(req.body) }
    );

    // return a message
    return res.json({
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deleteMovie(req, res) {
  try {
    // Connecting to the database
    let { db } = await connectToDatabase();

    // Deleting the post
    await db.collection("posts").deleteOne({
      _id: new ObjectId(req.body),
    });

    // returning a message
    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getMovie(req, res) {
  const { movieId } = req.query;

  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    const movie = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(movieId) });

    // return a message
    res.json({ movie });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
