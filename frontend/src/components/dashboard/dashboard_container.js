import {connect} from "react-redux";
import Dashboard from "./dashboard";
import {logout, login, sessionLogin} from "../../actions/session_actions";
import {
    fetchUser,
    shareChallenge,
    createChallenge,
    redeemChallenge,
    retrieveChallengeUsers,
    redeemReferralCode,
    getReferralCode,
    setTokensPerReferral,
    resetUserData
} from "../../actions/dashboard_actions";

const mapStateToProps = (state, ownProps) => ({
    path: ownProps.test,
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
    currentUser: state.session.currentUser,
    userData: state.dashboard.userData,
    challengeBalances: state.dashboard.challengeBalances
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: user => dispatch(fetchUser(user)),
    shareChallenge: (challengeUuid, fromAddress, toAddress, numShares) => dispatch(shareChallenge(challengeUuid, fromAddress, toAddress, numShares)),
    redeemChallenge: (challengeUuid, sponsorAddress, redeemerAddress) => dispatch(redeemChallenge(challengeUuid, sponsorAddress, redeemerAddress)),
    logout: () => dispatch(logout()),
    login: user => dispatch(login(user)),
    resetUserData: () => dispatch(resetUserData()),
    sessionLogin: user => dispatch(sessionLogin(user)),
    createChallenge: challenge => dispatch(createChallenge(challenge)),
    retrieveChallengeUsers: challengeUuid => dispatch(retrieveChallengeUsers(challengeUuid)),
    redeemReferralCode: (referralCode, recipientUuid) => dispatch(redeemReferralCode(referralCode, recipientUuid)),
    getReferralCode: (userUuid, challengeUuid) => dispatch(getReferralCode(userUuid, challengeUuid)),
    setTokensPerReferral: (userUuid, challengeUuid, tokensPerReferral) => dispatch(setTokensPerReferral(userUuid, challengeUuid, tokensPerReferral))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
