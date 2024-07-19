import { useAccount, useDisconnect } from "wagmi";

import Viewer from "@knowins/viewer";

const Campaign = () => {
  const { address, status, chain } = useAccount();

  return address ? (
    <Viewer
      config={{
        title: "",
        account: '0x019bbe745b5c9b70060408Bf720B1E5172EEa5A3',
        command:
          `REPORT(QUERY_DB({"from":"ONEIRO_AF_TX","select":[{"node":"ONEIRO_AF_TX\\address","name":"address","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\name","name":"name","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\contract_address","name":"contract_address","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\transaction_hash","name":"transaction_hash","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\created_on","name":"promoted_on","alias":"","datatype":"D","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\campaign_name","name":"campaign_name","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\creator_name","name":"creator_name","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\campaign_url","name":"campaign_url","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\creator_fee","name":"creator_fee","alias":"","datatype":"N","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\affiliate_fee","name":"affiliate_fee","alias":"","datatype":"N","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\expiration","name":"expiration","alias":"","datatype":"D","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_TX\\amount","name":"amount","alias":"","datatype":"N","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_TX\\owner_address","name":"owner_address","alias":"","datatype":"","aggregate":"","expression":"","sorting":""},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_TX\\created_on","name":"transaction_date","alias":"","datatype":"D","aggregate":"","expression":"","sorting":""}],"where":[{"node":"ONEIRO_AF_TX\\address","name":"address","alias":"","datatype":"","filterfrom":"${address}","filterto":"","isnot":"N","operator":"-"},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\campaign_name","name":"campaign_name","alias":"","datatype":"","filterfrom":"","filterto":"","isnot":"N","operator":"EXISTS"},{"node":"ONEIRO_AF_TX\\ONEIRO_DT_CP\\creator_name","name":"creator_name","alias":"","datatype":"","filterfrom":"","filterto":"","isnot":"N","operator":"EXISTS"}]},ONEIRO_AF_DB))`,
        toolbar: { show: false },
      }}
      backgroundColor="#222738"
      // @ts-ignore
      loading={null}
    />
  ) : (
    <>Promote Campaigns: Connect your wallet to see your campaigns</>
  );
};


export default Campaign;
