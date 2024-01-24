import mongoose from "mongoose";
import { AppController } from "../controllers";
import { config } from "../config";
import { FastifyInstance } from "fastify";

class AppRegistry {
  private static appController: AppController | undefined;
  private static mongoose: typeof mongoose | undefined;
  private constructor() {}

  static async SetUpDatabase(server: FastifyInstance) {
    try {
      server.log.info("Connecting to Database...");
      this.mongoose = await mongoose.connect(
        config.database.mongoUri,
        config.database.moogooseConnectionOptions
      );
      server.log.info(
        "Database Connected with URI: " + config.database.mongoUri
      );
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  }

  static NewAppController(): AppController {
    this.appController = new AppController();
    return this.appController;
  }

  get appController(): AppController {
    if (!this.appController) {
      throw new Error("AppController not initialized");
    }
    return this.appController;
  }

  get mongoose(): typeof mongoose {
    if (!this.mongoose) {
      throw new Error("Mongoose not initialized");
    }
    return this.mongoose;
  }
}

export { AppRegistry };
