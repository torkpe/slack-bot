import mongoose from "mongoose";
import http from "../../utils/http";
import { NextFunction, Request, Response } from "express";

const modelName = "interactions";

export async function addInteraction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.sendStatus(204);
    const payload = JSON.parse(req.body.payload);
    const question = "What are your favorite hobbies?";
    const action = payload.actions[0];

    await mongoose.connection.db.collection(modelName).insertOne({
      userId: payload.user.id,
      question: action.action_id,
      answer: action.selected_option.value,
    });

    if (payload.actions[0].action_id === question) {
      await http({
        method: "POST",
        url: payload.response_url,
        data: {
          text: "Thank you",
        },
      });
      return;
    }

    await http({
      method: "POST",
      url: payload.response_url,
      data: {
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: question,
            },
            accessory: {
              type: "radio_buttons",
              action_id: question,
              options: [
                {
                  value: "Football",
                  text: {
                    type: "plain_text",
                    text: "Football",
                  },
                },
                {
                  value: "Music",
                  text: {
                    type: "plain_text",
                    text: "Music",
                  },
                },
                {
                  value: "Sleep",
                  text: {
                    type: "plain_text",
                    text: "Sleep",
                  },
                },
                {
                  value: "Movies",
                  text: {
                    type: "plain_text",
                    text: "Movies",
                  },
                },
                {
                  value: "Basketball",
                  text: {
                    type: "plain_text",
                    text: "Basketball",
                  },
                },
              ],
            },
          },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getInteractions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const interactions = await mongoose.connection.db
      .collection(modelName)
      .find()
      .toArray();

    res.status(200).json({
      data: interactions
    });
  } catch (error) {
    next(error);
  }
}
