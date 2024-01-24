import { UserType, UserWithTokenType } from "../models/user";
import { UserRepository } from "../repositories/user.repo";
import { generateJwtToken } from "../utils/auth";
import { config } from "../config";

class UserService {
  private userRepository: UserRepository;

  constructor(ur: UserRepository) {
    this.userRepository = ur;
  }

  private fetchUserFromOAuth2Provider = async (code: string) => {
    const tokenEndpoint = new URL(
      "https://auth.delta.nitt.edu/api/oauth/token"
    );
    const resourceEndpoint = new URL(
      "https://auth.delta.nitt.edu/api/resources/user"
    );

    let response = await fetch(tokenEndpoint.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.auth.dauth.clientId,
        client_secret: config.auth.dauth.clientSecret,
        grant_type: config.auth.dauth.grantType,
        code: code,
        redirect_uri: config.auth.dauth.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error("Error in getting Access Token");
    }

    const tokenResponse = (await response.json()) as { access_token?: string };

    let access_token: string | null = null;

    if (typeof tokenResponse === "object" && tokenResponse?.access_token) {
      access_token = tokenResponse.access_token;
    }

    if (access_token === null) {
      throw new Error("Error in getting Access Token");
    }

    response = await fetch(resourceEndpoint.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    if (!response.ok) {
      throw new Error("Error in getting User Resource");
    }

    const dAuthUserResource = (await response.json()) as {
      email?: string;
      name?: string;
      gender?: string;
      batch?: string;
    };

    if (typeof dAuthUserResource !== "object") {
      throw new Error("Error in getting User Resource");
    }

    if (
      dAuthUserResource.email === undefined ||
      dAuthUserResource.name === undefined ||
      dAuthUserResource.gender === undefined ||
      dAuthUserResource.batch === undefined
    ) {
      throw new Error("Error in getting User Resource");
    }

    const userResource = {
      rollNo: dAuthUserResource.email.split("@")[0],
      name: dAuthUserResource.name,
      gender: dAuthUserResource.gender,
      batch: dAuthUserResource.batch,
    };

    return userResource;
  };

  // This method takes OAuth2 code as input
  // It will use the code to get the user from the OAuth2 provider
  // It will return the user if the user exists
  // It will create a new user if the user does not exist
  // It will also return a JWT token
  public async authCallback(
    code: string
  ): Promise<[UserWithTokenType | null, Error | null]> {
    try {
      const { name, rollNo, gender, batch } =
        await this.fetchUserFromOAuth2Provider(code);

      let userDoc = await this.userRepository.findUserByRollNo(rollNo);

      if (userDoc === null) {
        userDoc = await this.userRepository.createUser(
          name,
          rollNo,
          gender,
          batch
        );
      }

      const jwtToken = generateJwtToken(userDoc._id.toString());

      if (jwtToken === null) {
        throw new Error("Error in generating JWT Token");
      }

      return [
        {
          name: userDoc.name,
          rollNumber: userDoc.rollNumber,
          gender: userDoc.gender,
          batch: userDoc.batch,
          token: jwtToken,
        },
        null,
      ];
    } catch (error) {
      return [null, error as Error];
    }
  }

  // This method takes the user id as input
  // It will return the user if the user exists
  // It will return null if the user does not exist
  public async getUserFromId(
    id: string
  ): Promise<[UserType | null, Error | null]> {
    try {
      const userDoc = await this.userRepository.getUserFromId(id);

      if (userDoc === null) {
        return [null, new Error("User Not Found")];
      }

      return [
        {
          name: userDoc.name,
          rollNumber: userDoc.rollNumber,
          batch: userDoc.batch,
          gender: userDoc.gender,
        },
        null,
      ];
    } catch (error) {
      return [null, error as Error];
    }
  }
}

export { UserService };
