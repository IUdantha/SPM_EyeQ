import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
  },
});

const PdfGenerator = ({ data }) => {
  return (
    <PDFViewer width="100%" height={500}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Payment Successful</Text>
            <Text style={styles.content}>
              Your payment was processed successfully.
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfGenerator;
