import React from "react";
import "../../scss/components/transfer.css";
import x from "../../img/x.png";
import ncentLogo from "../../img/logo.png";

export default class ChallengeDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="fs-transfer-sheet">
            <div className="transfer-content">
                <div title="jobCents" className="close-button" onClick={this.props.handleInput("formType")}>
                    <img src={x} alt=""/>
                </div>
                <div className="not-x-button">
                    <h1 className="challengeName">{this.props.challengeDetails.name}</h1>
                    <h1 className="challengeName">{this.props.challengeDetails.company}</h1>
                    <div className="headerChallengeImage">
                        <img src={this.props.challengeDetails.imageUrl || ncentLogo} className="challengeImage"/>
                    </div>
                    <div className="challengeContent">
                        <h2 className="challengeReward">Total Reward: ${this.props.challengeDetails.rewardAmount}</h2>
                        <p className="challengeDescription">Description: {this.props.challengeDetails.description}</p>
                        <h2>Your balance: {this.props.challengeBalance} jobCent(s)</h2>
                        <h2>This challenge can still be redeemed {this.props.remainingRedemptions} time(s)</h2>
                    </div>
                </div>
            </div>
        </div>;
    }
}
