import { formatNumber } from '@/lib/formatters';
import { OrdenPdfProps, OrdenPdfDetalleProps } from '@/types/types';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

export function Table({ register }: { register: OrdenPdfProps }) {
  return (
    <View>
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
      <TableFooter register={register} />
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
  infoContainer: {
    borderTop: 1,
    borderRight: 1,
    borderLeft: 1,
    width: '75%',
  },
  info: {
    flexDirection: 'row',
    gap: 5,
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
    fontWeight: 'bold',
    borderBottom: 1,
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
    width: 59,
    textAlign: 'center',
  },
  tdDescripcion: {
    ...tdBase,
    width: 307,
    textAlign: 'left',
  },
  tdPrecioUnitario: {
    ...tdBase,
    width: 64,
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
    <View style={{ flexDirection: 'row', height: 65, marginBottom: 10 }}>
      {/* info */}
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={{ fontWeight: 'bold' }}>Proveedor:</Text>
          <Text>{register.proveedor}</Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontWeight: 'bold' }}>Términos de pago:</Text>
          <Text>{register.termino_de_pago?.toLocaleUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontWeight: 'bold' }}>Cotización Nº:</Text>
          <Text>{register.numero_cotizacion}</Text>
        </View>
        <View style={styles.info}>
          <Text style={{ fontWeight: 'bold' }}>Moneda:</Text>
          <Text>{register.moneda?.toLocaleUpperCase()}</Text>
        </View>
      </View>

      {/* date */}
      <View style={{ width: '25%', height: '100%', borderTop: 1 }}>
        <View style={styles.dateContainer}>
          <View style={styles.dateCell}>
            <Text style={{ fontWeight: 'bold' }}>Día</Text>
          </View>
          <View style={styles.dateCell}>
            <Text style={{ fontWeight: 'bold' }}>Mes</Text>
          </View>
          <View style={styles.dateCell}>
            <Text style={{ fontWeight: 'bold' }}>Año</Text>
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
    <View
      fixed
      style={{
        flexDirection: 'row',
        borderTop: 1,
        borderRight: 1,
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
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <View
      wrap
      style={{
        // borderTop: 1,
        borderRight: 1,
        // borderLeft: 1,
      }}
    >
      {children}
    </View>
  );
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
      }}
    >
      <Text break style={[styles.tableTd, styles.tdItem]}>
        {index + 1}
      </Text>
      <Text break style={[styles.tableTd, styles.tdCodigo]}>
        {element.id_solicitud_detalle}
      </Text>
      <Text break style={[styles.tableTd, styles.tdCant]}>
        {element.cantidad}
      </Text>
      <Text break style={[styles.tableTd, styles.tdUnidadMedida]}>
        {element.unidad_medida}
      </Text>
      <Text break style={[styles.tableTd, styles.tdDescripcion]}>
        {element.producto_servicio}
      </Text>
      <Text break style={[styles.tableTd, styles.tdPrecioUnitario]}>
        {formatNumber(element.precio)}
      </Text>
      <Text break style={[styles.tableTd, styles.tdPrecioTotal]}>
        {formatNumber(element.cantidad * element.precio)}
      </Text>
    </View>
  );
}

export function TableFooter({ register }: { register: OrdenPdfProps }) {
  const subtotal = register.detalle.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );
  const descuento = register.descuento ?? 0;
  const base = subtotal - descuento;
  const iva = register.calcular_iva ? base * 0.15 : 0;
  const totalNeto = base + iva;

  return (
    <View style={{ flexDirection: 'row', height: 65, borderRight: 1 }}>
      {/* firmas */}
      <View style={{ flexDirection: 'row', width: '75%' }}>
        <TableFooterFirma upperLabel="AREA" lowerLabel="SOLICITANTE" />
        <TableFooterFirma upperLabel="COMPRAS" lowerLabel="ELABORADO" />
        <TableFooterFirma upperLabel="GERENCIA" lowerLabel="AUTORIZADO" />
      </View>

      {/* totales */}
      <View style={{ width: '25%' }}>
        <View
          style={{
            flexDirection: 'row',
            height: 65,
            borderTop: 1,
          }}
        >
          <Text
            style={[
              styles.tdPrecioUnitario,
              { textAlign: 'center', fontWeight: 'bold' },
            ]}
          >
            Subtotal
          </Text>
          <Text style={[styles.tdPrecioTotal, { fontWeight: 'bold' }]}>
            {formatNumber(subtotal)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <Text
            style={[
              styles.tdPrecioUnitario,
              { textAlign: 'center', fontWeight: 'bold' },
            ]}
          >
            Descuento
          </Text>
          <Text style={[styles.tdPrecioTotal, { fontWeight: 'bold' }]}>
            {formatNumber(descuento)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <Text
            style={[
              styles.tdPrecioUnitario,
              { textAlign: 'center', fontWeight: 'bold' },
            ]}
          >
            I.V.A. (15%)
          </Text>
          <Text style={[styles.tdPrecioTotal, { fontWeight: 'bold' }]}>
            {formatNumber(iva)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <Text
            style={[
              styles.tdPrecioUnitario,
              { textAlign: 'center', fontWeight: 'bold' },
            ]}
          >
            TOTAL
          </Text>
          <Text style={[styles.tdPrecioTotal, { fontWeight: 'bold' }]}>
            {formatNumber(totalNeto)}
          </Text>
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
    <View
      style={{ width: '100%', borderLeft: 1, borderTop: 1, borderBottom: 1 }}
    >
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 1,
          paddingHorizontal: 2,
          borderBottom: 1,
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Text>{upperLabel}</Text>
      </View>
      <View style={{ height: '100%' }}></View>
      <View style={{ height: '100%' }}></View>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 1,
          paddingHorizontal: 2,
          borderTop: 1,
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Text>{lowerLabel}</Text>
      </View>
    </View>
  );
}
