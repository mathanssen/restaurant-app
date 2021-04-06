export const AUTHINFO_SET = 'AUTHINFO_SET';

export const authInfoSet = (email, loginState) => {
    return { type: AUTHINFO_SET, userEmail: email, isLoggedIn: loginState }
}
