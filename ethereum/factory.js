import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.abi),
  "0x97719D536f1eCA627Ff038650580BB1b6275863d"
);

export default instance;
