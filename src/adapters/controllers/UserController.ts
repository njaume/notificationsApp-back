import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { Inject, Service } from "typedi";
@Service()
export class UserController {
  private userService: UserService;
  constructor(@Inject() userService: UserService) {
    this.userService = userService;
  }

  public async sendMessage(req: Request, res: Response) {
    try {
      const { userId, name, email, message, category, phone } = req.body;

      const date = new Date();
      const response = await this.userService.sendMessage({
        userId,
        name,
        email,
        message,
        category,
        phone,
        date,
      });

      // Send the response
      return response
        ? res.status(200)
        : res.status(500).send("Something was wrong, please try again later");
    } catch (error) {
      return res
        .status(500)
        .send("Something was wrong, please try again later");
    }
  }
}
