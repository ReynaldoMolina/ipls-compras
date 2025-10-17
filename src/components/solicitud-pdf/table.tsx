import { SolicitudPdfProps, SolicitudPdfDetalleProps } from '@/types/types';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

export function Table({ register }: { register: SolicitudPdfProps }) {
  return (
    <View>
      <TableHeader />
      <TableBody>
        {register.detalle.map((element) => (
          <TableRow key={element.id} element={element} />
        ))}
      </TableBody>
    </View>
  );
}

const tdBase = {
  padding: 2,
  borderLeft: 1,
  borderBottom: '1 solid black',
  fontSize: 9,
};

const styles = StyleSheet.create({
  // table header
  tableTh: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    fontWeight: 'bold',
    borderBottom: 1,
  },
  tableTd: tdBase,
  tdDescripcion: {
    ...tdBase,
    width: '100%',
    textAlign: 'left',
  },
  tdUnidadMedida: {
    ...tdBase,
    width: 80,
    textAlign: 'center',
  },
  tdCant: {
    ...tdBase,
    width: 70,
    textAlign: 'center',
  },
  tdSalida: {
    ...tdBase,
    width: 70,
    textAlign: 'center',
  },
});

export function TableHeader() {
  return (
    <View
      fixed
      style={{
        flexDirection: 'row',
        borderTop: 1,
        borderRight: 1,
      }}
    >
      <Text
        style={[styles.tableTh, styles.tdDescripcion, { textAlign: 'center' }]}
      >
        Descripción de Artículos
      </Text>
      <Text style={[styles.tableTh, styles.tdUnidadMedida]}>U. Medida</Text>
      <Text style={[styles.tableTh, styles.tdCant]}>Cantidad</Text>
      <Text style={[styles.tableTh, styles.tdSalida]}>Salida</Text>
    </View>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <View wrap style={{ borderRight: 1 }}>
      {children}
    </View>
  );
}

export function TableRow({ element }: { element: SolicitudPdfDetalleProps }) {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <Text break style={[styles.tableTd, styles.tdDescripcion]}>
        {element.producto_servicio}
      </Text>
      <Text break style={[styles.tableTd, styles.tdUnidadMedida]}>
        {element.unidad_medida}
      </Text>
      <Text break style={[styles.tableTd, styles.tdCant]}>
        {element.cantidad}
      </Text>
      <Text break style={[styles.tableTd, styles.tdSalida]}></Text>
    </View>
  );
}
