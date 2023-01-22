import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_Q6pjPlNH0",
    ClientId:"1opasfqpko699cdoll7j17l2qf"
}

export default new CognitoUserPool(poolData)