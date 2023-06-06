import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserService } from "../../application/services/UserService";
@Service()
export class UserController {
  @Inject()
  userService!: UserService;

  async sendMessage(req: Request, res: Response) {
    try {
      const { userId, message, category, phone } = req.body;
      const me = await this.userService.getUserById(userId?.toString());
      if (me) {
        const date = new Date();
        const response = await this.userService.sendMessage({
          userId,
          name: me?.name,
          email: me.email,
          message,
          category: Number(category),
          phone,
          date,
        });

        // Send the response
        return response
          ? res.status(200).send("ok")
          : res.status(500).send("Something was wrong, please try again later");
      }

      return res
        .status(500)
        .send("Something was wrong, please try again later");
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .send("Something was wrong, please try again later");
    }
  }
}
