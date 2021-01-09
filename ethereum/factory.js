import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xD466FB24Bba94877ad15441424FfA18ef05D4eeB"
);

export default instance;
