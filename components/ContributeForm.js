import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

class ContributeForm extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input label="ether" labelPosition="right" />
          <Button primary style={{ marginTop: "10px" }}>
            Contribute
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default ContributeForm;
