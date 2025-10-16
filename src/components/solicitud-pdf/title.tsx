import { SolicitudPdfProps } from '@/types/types';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  titleContainer: {
    width: '65%',
    gap: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 10,
    marginRight: 10,
  },
  orderId: {
    width: 90,
    borderBottom: 1,
    height: 15,
    textAlign: 'center',
  },
});

export function Title({ register }: { register: SolicitudPdfProps }) {
  const [year, month, day] = register.fecha.split('-');

  return (
    <View style={styles.mainContainer}>
      {/* title box */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pedido de materiales y/o Herramientas</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontWeight: 'semibold', textDecoration: 'underline' }}>
            ADMINISTRACIÓN
          </Text>
          <Text>Dependencia: ____________________________</Text>
        </View>
        <Text style={{ fontWeight: 'semibold' }}>ORDEN:</Text>
      </View>

      {/* order id */}
      <View style={{ width: '35%', gap: 5 }}>
        <View style={styles.orderIdContainer}>
          <Text>Fecha:</Text>
          <Text style={styles.orderId}>
            {day}/{month}/{year}
          </Text>
        </View>
        <View style={styles.orderIdContainer}>
          <Text>No.</Text>
          <Text style={styles.orderId}>
            {String(register.id_solicitud).padStart(6, '0')}
          </Text>
        </View>
      </View>
    </View>
  );
}
