import { formatNumber } from '@/lib/formatters';
import { OrdenPdfProps, OrdenPdfDetalleProps } from '@/types/types';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

export default function Table({ register }: { register: OrdenPdfProps }) {
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
      <TableFooter detalle={register.detalle} />
    </View>
  );
}

const tdBase = {
  paddingHorizontal: 2,
  paddingVertical: 2,
  // fontSize: 9,
};

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
    // borderRight: 1,
    fontSize: 9,
  },
  tableTd: tdBase,
  tdItem: {
    ...tdBase,
    width: 30,
    textAlign: 'center',
  },
  tdCodigo: {
    ...tdBase,
    width: 30,
    textAlign: 'center',
  },
  tdCant: {
    ...tdBase,
    width: 35,
    textAlign: 'center',
  },
  tdUnidadMedida: {
    ...tdBase,
    width: 60,
    textAlign: 'center',
  },
  tdDescripcion: {
    ...tdBase,
    width: 300,
    textAlign: 'center',
  },
  tdPrecioUnitario: {
    ...tdBase,
    width: 70,
    textAlign: 'right',
  },
  tdPrecioTotal: {
    ...tdBase,
    width: 90,
    textAlign: 'right',
  },
});

export function TableInfo({ register }: { register: OrdenPdfProps }) {
  const [year, month, day] = register.fecha_creacion.split('-');

  return (
    <View style={{ flexDirection: 'row', height: 65 }}>
      {/* info */}
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Proveedor: {register.proveedor}</Text>
        <Text style={styles.info}>
          Términos de pago: {register.termino_de_pago?.toLocaleUpperCase()}
        </Text>
        <Text style={styles.info}>
          Cotización Nº: {register.numero_cotizacion}
        </Text>
        <Text style={styles.info}>
          Moneda: {register.moneda?.toLocaleUpperCase()}
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
          // borderTop: 1,
          // borderLeft: 1,
          // borderBottom: 1,
        }}
      >
        <Text style={[styles.tableTh, styles.tdItem]}>ITEM</Text>
        <Text style={[styles.tableTh, styles.tdCodigo]}>CÓD</Text>
        <Text style={[styles.tableTh, styles.tdCant]}>CANT</Text>
        <Text style={[styles.tableTh, styles.tdUnidadMedida]}>U/M</Text>
        <Text style={[styles.tableTh, styles.tdDescripcion]}>DESCRIPCIÓN</Text>
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
  element: OrdenPdfDetalleProps;
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
        {element.unidad_medida}
      </Text>
      <Text style={[styles.tableTd, styles.tdDescripcion]}>
        {element.producto_servicio}
      </Text>
      <Text style={[styles.tableTd, styles.tdPrecioUnitario]}>
        {formatNumber(element.precio_real)}
      </Text>
      <Text style={[styles.tableTd, styles.tdPrecioTotal]}>
        {formatNumber(element.cantidad * element.precio_real)}
      </Text>
    </View>
  );
}

export function TableFooter({ detalle }: { detalle: OrdenPdfDetalleProps[] }) {
  const subtotal = detalle.reduce(
    (acc, item) => acc + item.cantidad * item.precio_real,
    0
  );
  const descuento = 0;
  const base = subtotal - descuento;
  const iva = base * 0.15;
  const totalNeto = base + iva;

  return (
    <View style={{ flexDirection: 'row', marginTop: 10, height: 65 }}>
      {/* firmas */}
      <View style={{ flexDirection: 'row', width: '75%', border: '1' }}>
        <TableFooterFirma upperLabel="AREA" lowerLabel="SOLICITANTE" />
        <TableFooterFirma upperLabel="COMPRAS" lowerLabel="ELABORADO" />
        <TableFooterFirma upperLabel="GERENCIA" lowerLabel="AUTORIZADO" />
      </View>

      {/* totales */}
      <View style={{ width: '25%', border: '1' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.tdPrecioUnitario, { textAlign: 'center' }]}>
            Subtotal
          </Text>
          <Text style={styles.tdPrecioTotal}>{formatNumber(subtotal)}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.tdPrecioUnitario, { textAlign: 'center' }]}>
            Descuento
          </Text>
          <Text style={styles.tdPrecioTotal}>{formatNumber(descuento)}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.tdPrecioUnitario, { textAlign: 'center' }]}>
            I.V.A.
          </Text>
          <Text style={styles.tdPrecioTotal}>{formatNumber(iva)}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.tdPrecioUnitario, { textAlign: 'center' }]}>
            TOTAL
          </Text>
          <Text style={styles.tdPrecioTotal}>{formatNumber(totalNeto)}</Text>
        </View>
      </View>
    </View>
  );
}

function TableFooterFirma({
  upperLabel,
  lowerLabel,
}: {
  upperLabel: string;
  lowerLabel: string;
}) {
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 1,
          paddingHorizontal: 2,
        }}
      >
        <Text>{upperLabel}</Text>
      </View>
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 1,
          paddingHorizontal: 2,
        }}
      >
        <Text>{lowerLabel}</Text>
      </View>
    </View>
  );
}
