import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Line,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  signaturecontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  position: {
    fontSize: 16,
    color: "gray",
  },
  signature: {
    width: "auto",
    height: 50,
  },
});

const Receipt = ({tran, created_at}) => {
  let {
    object: type,
    id,
    amount,
    currency,
    bank_account: {object, bank_code, brand} = {},
    recipient,
  } = tran;
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.signaturecontainer}>
          <View>
            <Text style={styles.name}>Monkey D Car Rental</Text>
            <Text style={styles.position}>Receipt</Text>
          </View>
          <Image
            style={styles.signature}
            src={require("../assets/images/logo.png")}
          />
        </View>

        <Line style={{marginTop: 20, size: 3}} />
        <View style={styles.container}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Recipient:</Text>
          <Text style={styles.value}>{recipient}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{`${object} ${bank_code} ${brand}`}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>{created_at}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{`${amount / 100} ${currency}`}</Text>
        </View>

        <View style={styles.signaturecontainer}>
          <View>
            <Text style={styles.name}>Mickey Mouse</Text>
            <Text style={styles.position}>Manager</Text>
          </View>
          <Image
            style={styles.signature}
            src={require("../assets/images/manager_signature.png")}
          />
        </View>
      </Page>
    </Document>
  );
};

export default Receipt;
