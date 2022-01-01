/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getMovies(req, res);
    }

    case "POST": {
      return addMovie(req, res);
    }

    // case "PUT": {
    //   return updateMovie(req, res);
    // }

    case "DELETE": {
      return deleteMovie(req, res);
    }
  }
}

async function getMovies(req, res) {
  const { db } = await connectToDatabase();
  const movies = await db.collection("movies").find({}).toArray();

  res.json(movies);
}

async function addMovie(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("movies").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Post added successfully",
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
    await db.collection("movies").deleteOne({
      _id: new ObjectId(req.body),
    });

    // returning a message
    return res.json({
      message: "Movie deleted successfully",
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

// async function updateMovie(req, res) {
//   try {
//     // connect to the database
//     let { db } = await connectToDatabase();

//     console.log(req.body);

//     // update the published status of the post
//     await db.collection("movies").updateOne(
//       {
//         _id: new ObjectId(req.body._id),
//       },
//       { $set: req.body }
//     );

//     // return a message
//     return res.json({
//       message: "Movie updated successfully",
//       success: true,
//     });
//   } catch (error) {
//     // return an error
//     return res.json({
//       message: new Error(error).message,
//       success: false,
//     });
//   }
// }
