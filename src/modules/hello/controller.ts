import http from "../../utils/http";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../exceptions/HttpException";

export async function hello(req: Request, res: Response, next: NextFunction) {
  try {
    const { text, response_url } = req.body;
    if (!response_url) {
      throw new ValidationError('"text" field is required');
    }
    res.sendStatus(204);
    if (text.toLowerCase() === "hello") {
      await http({
        method: "POST",
        url: response_url,
        data: {
          blocks: [
            {
              type: "section",
              text: {
                type: "plain_text",
                text: "Welcome. How are you doing?",
              },
              accessory: {
                type: "radio_buttons",
                action_id: "Welcome. How are you doing?",
                options: [
                  {
                    value: "Doing Well",
                    text: {
                      type: "plain_text",
                      text: "Doing Well",
                    },
                  },
                  {
                    value: "Neutral",
                    text: {
                      type: "plain_text",
                      text: "Neutral",
                    },
                  },
                  {
                    value: "Feeling Lucky",
                    text: {
                      type: "plain_text",
                      text: "Feeling Lucky",
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    } else {
      await http({
        method: "POST",
        url: response_url,
        data: {
          text: "Did you mean to say hello?",
        },
      });
    }
  } catch (error) {
    next(error);
  }
}
