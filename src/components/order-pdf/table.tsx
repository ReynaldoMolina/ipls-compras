import { formatNumber } from '@/lib/formatters';
import { OrdenPdfProps, OrdePdfDetalleProps } from '@/types/types';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

export default function Table({ register }: OrdenPdfProps) {
  return (
    <View style={{ marginHorizontal: 15, marginTop: 15 }}>
      <TableInfo register={register} />
      <TableHeader />
      <TableBody>
        {register.detalle.map((element, index) => (
          <TableRow
            key={element.id_solicitud_detalle}
            element={element}
            index={index}
          />
        ))}
      </TableBody>
      {/* table footer */}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    borderTop: 1,
    borderRight: 1,
    borderLeft: 1,
    width: '75%',
  },
  info: {
    borderBottom: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  dateCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: 1,
    borderBottom: 1,
  },
  // table header
  tableTh: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRight: 1,
    fontSize: 9,
  },
  tableTd: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    fontSize: 9,
  },
  tdItem: {
    width: 25,
    textAlign: 'center',
  },
  tdCodigo: {
    width: 40,
    textAlign: 'center',
  },
  tdCant: {
    width: 30,
    textAlign: 'center',
  },
  tdUnidadMedida: {
    width: 70,
    textAlign: 'center',
  },
  tdProducto: {
    width: 300,
    textAlign: 'center',
  },
  tdPrecioUnitario: {
    width: 70,
    textAlign: 'center',
  },
  tdPrecioTotal: {
    width: 70,
    textAlign: 'center',
  },
});

export function TableInfo({ register }: OrdenPdfProps) {
  const [year, month, day] = register.fecha_creacion.split('-');

  return (
    <View style={{ flexDirection: 'row', height: 60 }}>
      {/* info */}
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Proveedor: {register.proveedor}</Text>
        <Text style={styles.info}>
          Términos de pago: {register.termino_de_pago.toLocaleUpperCase()}
        </Text>
        <Text style={styles.info}>
          Cotización Nº: {register.numero_cotizacion}
        </Text>
        <Text style={styles.info}>
          Moneda: {register.moneda.toLocaleUpperCase()}
        </Text>
      </View>

      {/* date */}
      <View style={{ width: '25%', height: '100%', borderTop: 1 }}>
        <View style={styles.dateContainer}>
          <View style={styles.dateCell}>
            <Text>Día</Text>
          </View>
          <View style={styles.dateCell}>
            <Text>Mes</Text>
          </View>
          <View style={styles.dateCell}>
            <Text>Año</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateCell}>
            <Text>{day}</Text>
          </View>
          <View style={styles.dateCell}>
            <Text>{month}</Text>
          </View>
          <View style={styles.dateCell}>
            <Text>{year}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function TableHeader() {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          borderTop: 1,
          borderLeft: 1,
          borderBottom: 1,
        }}
      >
        <Text style={[styles.tableTh, styles.tdItem]}>ITEM</Text>
        <Text style={[styles.tableTh, styles.tdCodigo]}>CÓD</Text>
        <Text style={[styles.tableTh, styles.tdCant]}>CANT</Text>
        <Text style={[styles.tableTh, styles.tdUnidadMedida]}>U/M</Text>
        <Text style={[styles.tableTh, styles.tdProducto]}>DESCRIPCIÓN</Text>
        <Text style={[styles.tableTh, styles.tdPrecioUnitario]}>PRECIO</Text>
        <Text style={[styles.tableTh, styles.tdPrecioTotal]}>PRECIO TOTAL</Text>
      </View>
    </View>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

export function TableRow({
  element,
  index,
}: {
  element: OrdePdfDetalleProps;
  index: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        // marginTop: 10,
        // borderTop: 1,
        // borderLeft: 1,
        // borderBottom: 1,
      }}
    >
      <Text style={[styles.tableTd, styles.tdItem]}>{index + 1}</Text>
      <Text style={[styles.tableTd, styles.tdCodigo]}>
        {element.id_solicitud_detalle}
      </Text>
      <Text style={[styles.tableTd, styles.tdCant]}>{element.cantidad}</Text>
      <Text style={[styles.tableTd, styles.tdUnidadMedida]}>
        {element.unidad_medida.toLocaleUpperCase()}
      </Text>
      <Text style={[styles.tableTd, styles.tdProducto]}>
        {element.producto_servicio}
      </Text>
      <Text style={[styles.tableTd, styles.tdPrecioUnitario]}>
        {element.precio_real}
      </Text>
      <Text style={[styles.tableTd, styles.tdPrecioTotal]}>
        {formatNumber(element.cantidad * element.precio_real)}
      </Text>
    </View>
  );
}
