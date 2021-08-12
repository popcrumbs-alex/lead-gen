import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            src="https://www.poptrkr.com/scripts/sdk/everflow.js"
          ></script>

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `EF.click({
                offer_id: EF.urlParameter('oid'),
                affiliate_id: EF.urlParameter('affid'),
                sub1: EF.urlParameter('sub1'),
                sub2: EF.urlParameter('sub2'),
                sub3: EF.urlParameter('sub3'),
                sub4: EF.urlParameter('sub4'),
                sub5: EF.urlParameter('sub5'),
                uid: EF.urlParameter('uid'),
                source_id: EF.urlParameter('source_id'),
                transaction_id: EF.urlParameter('_ef_transaction_id'),
            });`,
            }}
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `EF.conversion({
                  offer_id: 102,
              });`,
            }}
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `EF.conversion({
                offer_id: 102,
                event_id: 274,
            });`,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
