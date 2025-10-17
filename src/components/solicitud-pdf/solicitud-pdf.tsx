'use client';

import React from 'react';
import { Document, Page, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Header } from './header';
import { SolicitudPdfProps } from '@/types/types';
import { Title } from './title';
import { Table } from './table';
import { Footer } from './footer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    fontSize: 10,
    padding: 20,
    gap: 15,
  },
});

export function SolicitudPdfViewer({
  register,
}: {
  register: SolicitudPdfProps;
}) {
  return (
    <PDFViewer className="h-screen">
      <Document
        title={`Solicitud de compra ${register.id_solicitud}`}
        author="IPLS - Administración"
      >
        <Page size="LETTER" style={styles.page}>
          <Header />
          <Title register={register} />
          <Table register={register} />
          <Footer />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export function SolicitudPdf({ register }: { register: SolicitudPdfProps }) {
  return (
    <Document
      title={`Solicitud de compra ${register.id_solicitud}`}
      author="IPLS - Administración"
    >
      <Page size="LETTER" style={styles.page}>
        <Header />
        <Title register={register} />
        <Table register={register} />
        <Footer />
      </Page>
    </Document>
  );
}
