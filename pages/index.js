import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";
 
class CampaignIndex extends Component {
  // if we wanna do initial data loading with next.js on the serverside
  // we have to do so with next.js specific funtion getInitialProps
  // why static? next wants to return data without rendering our component
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (<Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
