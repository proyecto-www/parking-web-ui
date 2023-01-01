import { createContext } from "react";
import { CognitoUser, AuthenticaciontDetails, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from '../UserPool'

const AccountContext = createContext()

const Account = (props) => {

    const getSession = async () => {
        return new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser()
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject()
                    }
                    else {
                        resolve(session)
                    }
                })
            }
            else {
                reject()
            }
        })
    }

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool
            })
            const authDetails = new AuthenticationDetails({
                Username,
                Password

            })
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess :", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure :", err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequiered: ", data)
                    resolve(data)
                }

            })

        })

    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession }}>
            {props.children}
        </AccountContext.Provider>
    )
}
export { Account, AccountContext }