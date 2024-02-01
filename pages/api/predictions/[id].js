import Replicate from "replicate";
import db from "../../../lib/db";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const prediction = await replicate.predictions.get(req.query.id);
    res.end(JSON.stringify(prediction));
  } else if (req.method === "PUT") {
    const { data, error } = await db
      .from("predictions")
      .update({ submission_id: req.body.submission_id })
      .eq("id", req.query.id);

    if (error) {
      console.log("error updating prediction ", error);
      console.log("body: ", req.body);
      return res.status(500).json({ error: error.message });
    }

    console.log("prediction updated!", data);

    res.end(JSON.stringify(data));
  }
}
