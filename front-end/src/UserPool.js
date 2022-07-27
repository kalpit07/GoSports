import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_UNr3psQy3",
  ClientId: "2o7ul1vh8vdabjomgqqb10bbjh",
};

export default new CognitoUserPool(poolData);
