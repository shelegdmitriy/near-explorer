import Head from "next/head";

import Content from "../../components/utils/Content";

import PartnerTotalTransactionList from "../../components/stats/PartnerTotalTransactionList";
import PartnerFirst3MonthTransactionslist from "../../components/stats/PartnerFirst3MonthTransactionsList";

export default class extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>NEAR Explorer | Partner Project Stats</title>
        </Head>
        <Content title={<h1>Partner Project Stats</h1>}>
          <PartnerTotalTransactionList />
          <PartnerFirst3MonthTransactionslist />
        </Content>
      </>
    );
  }
}
