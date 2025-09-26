'use client';

import React from 'react';
import { Document, Page, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Header } from './header';
import { OrdenPdfProps } from '@/types/types';
import { Title } from './title';
import Table from './table';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontSize: 10,
    gap: 20,
  },
});

export function OrdenPdfViewer({ register }: { register: OrdenPdfProps }) {
  return (
    <PDFViewer className="h-screen">
      <Document
        title={`Órden de compra ${register.id_orden}`}
        author="IPLS - Administración"
      >
        <Page size="LETTER" style={styles.page}>
          <Header />
          <Title register={register} />
          <Table register={register} />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export function OrdenPdf({ register }: { register: OrdenPdfProps }) {
  return (
    <Document
      title={`Órden de compra ${register.id_orden}`}
      author="IPLS - Administración"
    >
      <Page size="LETTER" style={styles.page}>
        <Header />
        <Title register={register} />
        <Table register={register} />
      </Page>
    </Document>
  );
}
