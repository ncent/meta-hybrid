import React from "react";
import ncentLogo from "../../img/logo.png";
import _ from 'lodash';
import xIcon from "../../img/x.png";

export default class MyJobCents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sponsoredChallenges: [],
            sponsoredChallengeBalances: [],
            sponsoredChallengeRemainingRedemptions: [],
            sponsoredChallengeReferralCodes: [],
            heldChallenges: [],
            heldChallengeBalances: [],
            heldChallengeRemainingRedemptions: [],
            heldChallengeReferralCodes: [],
            successMessage: "",
            errorMessage: "",
            imageLoadErrBool: true,
            spinner: true
        };

        this.challengeList = this.challengeList.bind(this);
        this.successMessage = this.successMessage.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.applyButton = this.applyButton.bind(this);
        this.imgLoadError = this.imgLoadError.bind(this);
        this.imgLoad = this.imgLoad.bind(this);
    }

    componentWillMount() {
        this.props.fetchUser(this.props.currentUser)
            .then(res => {
                if (this.props.userData) {
                    this.setState({
                        sponsoredChallenges: this.props.userData.sponsoredChallenges,
                        sponsoredChallengeBalances: this.props.userData.sponsoredChallengeBalances,
                        sponsoredChallengeRemainingRedemptions: this.props.userData.sponsoredChallengeRemainingRedemptions,
                        heldChallenges: this.props.userData.heldChallenges,
                        heldChallengeBalances: this.props.userData.heldChallengeBalances,
                        heldChallengeRemainingRedemptions: this.props.userData.heldChallengeRemainingRedemptions,
                        spinner: false
                    });
                }
            });
        document.title = "jobCent - Dashboard";
        window.history.pushState({}, document.title, window.location.href);
    }

    componentDidUpdate(prevProps) {

        if (this.props.userData && !_.isEqual(this.props.userData, prevProps.userData)) {
            this.setState({
                sponsoredChallenges: this.props.userData.sponsoredChallenges,
                heldChallenges: this.props.userData.heldChallenges
            });
        }

    }

    componentWillUnmount() {
        
    }

    imgLoadError(e) {
        this.setState({ imageLoadErrBool: false });
        e.target.src = ncentLogo;
    }

    imgLoad(e) {
    }

    successMessage(message) {
        if (message) {
            return <div className="successMessage">
                <span>{message}</span>
                <img className="messageDismissal" src={xIcon} onClick={this.props.clearSuccessMessage}
                    title="Dismiss this message"
                />
            </div>;
        }
    }

    errorMessage(message) {
        if (message) {
            return <div className="errorMessage">
                <span>{message}</span>
                <img className="messageDismissal" src={xIcon} onClick={this.props.clearErrorMessage}
                    title="Dismiss this message"
                />
            </div>;
        }
    }
    applyButton(link) {
        if (link) {
            return (
                <a
                    className="initiate-payment"
                    href={link}
                    target="_blank"
                    title="Apply for this job"
                >
                    <button className="tileButtonOthers">Apply</button>
                </a>
            );
        }
    }

    challengeList(sponsoredChallenges, heldChallenges, sponsoredChallengeBalances, heldChallengeBalances, sponsoredChallengeRemainingRedemptions, heldChallengeRemainingRedemptions) {
        if ((!sponsoredChallenges || sponsoredChallenges.length < 1) && (!heldChallengeBalances || heldChallenges.length < 1)) {
            return <div className="challengesPage">
                {this.successMessage(this.props.successMessage)}
                {this.errorMessage(this.props.errorMessage)}
                <h1 className="challengesHeader">Your jobCent Challenges</h1>
                <h1 className="noJobCents">You do not currently have any jobCents</h1>
            </div>;
        }
        const sponsoredChallengeTiles = sponsoredChallenges.map(function (sponsoredChallenge, index) {
            return (<div key={index} className="balanceTile">
                <div className="tileClickContainer" 
                    // onClick={() => {
                    //     this.props.goToChallengeDetail(sponsoredChallenge, sponsoredChallengeBalances[index], sponsoredChallengeRemainingRedemptions[index])
                    // }}
                >
                    <h2 className="balance-title tileCompanyName">{sponsoredChallenge.company}</h2>
                    <div className="logoImgContainer">
                        <img className="logoImg" src={sponsoredChallenge.imageUrl || ncentLogo} alt="ncent logo"
                            onError={this.imgLoadError} onLoad={this.imgLoad}
                        />
                    </div>
                    <h2 className="balance-title tileJobTitle">{sponsoredChallenge.name}</h2>
                    <h3 className="balance-subtitle">Sponsored</h3>
                    <h3 className="balance-subtitle">{ sponsoredChallengeBalances[index]  === 1 ? sponsoredChallengeBalances[index] + " jobCent" : sponsoredChallengeBalances[index] + " jobCents"}</h3>
                </div>
                <div className="tileButtonsContainer">
                    <div className="tileButtonsSendBtnContainer">
                        <a
                            title="Send jobCents to another user"
                            className="initiate-payment-smaller-margin"
                            onClick={this.props.handleInput("formType", {
                                challengeName: sponsoredChallenge.name,
                                challengeUuid: sponsoredChallenge.uuid,
                                imageUrl: sponsoredChallenge.imageUrl
                            })}
                        >
                            <button className="tileButtonSend">Send</button>
                        </a>
                    </div>
                    <div className="tileButtonsOthersContainer">
                        <a
                            title="Redeem a challenge"
                            className="initiate-payment"
                            onClick={() => {
                                this.props.goToRedeemTab(sponsoredChallenge)
                            }}
                        >
                            <span className="tileButtonOthers">Redeem</span>
                        </a>
                        <a
                            title="View challenge details"
                            className="initiate-payment"
                            onClick={() => {
                                this.props.goToChallengeDetail(sponsoredChallenge, sponsoredChallengeBalances[index], sponsoredChallengeRemainingRedemptions[index], "Sponsored")
                            }}
                        >
                            <span className="tileButtonOthers">View Details</span>
                        </a>
                    </div>
                </div>
            </div>);
        }.bind(this));
        const heldChallengeTiles = heldChallenges.map(function (heldChallenge, index) {
            return (<div key={index} className="balanceTile">
                <div className="tileClickContainer" 
                // onClick={() => {
                //     this.props.goToChallengeDetail(heldChallenge, heldChallengeBalances[index], heldChallengeRemainingRedemptions[index])
                // }}
                >
                    <h2 className="balance-title tileCompanyName">{heldChallenge.company}</h2>
                    <div className="logoImgContainer">
                        <img className="logoImg" src={heldChallenge.imageUrl || ncentLogo} alt="ncent logo" 
                            onError={this.imgLoadError} onLoad={this.imgLoad}
                        />
                    </div>
                    <h2 className="balance-title tileJobTitle">{heldChallenge.name}</h2>
                    <h3 className="balance-subtitle">{heldChallengeBalances[index]} jobCent{Number(heldChallengeBalances[index]) === 1 ? "" : "s"}</h3>
                </div>
                <div className="tileButtonsContainer">
                    <div className="tileButtonsSendBtnContainer">
                        <a
                            title="Send jobCents to another user"
                            className="initiate-payment-smaller-margin"
                            onClick={this.props.handleInput("formType", {
                                challengeName: heldChallenge.name,
                                challengeUuid: heldChallenge.uuid,
                                imageUrl: heldChallenge.imageUrl
                            })}
                        >
                            <button className="tileButtonSend">Send</button>
                        </a>
                    </div>
                    <div className="tileButtonsOthersContainer">
                        <a
                            className="initiate-payment"
                            href={heldChallenge.participationUrl}
                            target="_blank"
                            title="Apply for this job"
                        >
                            <span className="tileButtonOthers">Apply</span>
                        </a>
                        <a
                            title="View challenge details"
                            className="initiate-payment"
                            onClick={() => {
                                this.props.goToChallengeDetail(heldChallenge, heldChallengeBalances[index], heldChallengeRemainingRedemptions[index], "Held", heldChallenge.participationUrl)
                            }}
                        >
                            <span className="tileButtonOthers">View Details</span>
                        </a>
                    </div>
                </div>
            </div>);
        }.bind(this));
        return (
            <div className="challengesPage">
                {this.successMessage(this.props.successMessage)}
                {this.errorMessage(this.props.errorMessage)}
                <h1 className="challengesHeader">Your jobCent Challenges</h1>
                <section className="challengeTiles">{sponsoredChallengeTiles}</section>
                <section className="challengeTiles heldChallenges">{heldChallengeTiles}</section>
            </div>
        );
    }

    render() {
        if (this.state.spinner) {
            return (
                <div className="spinner"></div>
            )
        } else {
            return (
                this.challengeList(this.state.sponsoredChallenges, this.state.heldChallenges, this.state.sponsoredChallengeBalances, this.state.heldChallengeBalances, this.state.sponsoredChallengeRemainingRedemptions, this.state.heldChallengeRemainingRedemptions)
            );
        }
    }
}

