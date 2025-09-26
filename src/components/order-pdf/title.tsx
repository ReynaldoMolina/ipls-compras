import { OrdenPdfProps } from '@/types/types';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  titleContainer: {
    width: '50%',
  },
  titleBox: {
    border: '2',
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderIdContainer: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
  },
  orderId: {
    width: 90,
    borderBottom: 2,
    height: 15,
    textAlign: 'center',
  },
});

export function Title({ register }: { register: OrdenPdfProps }) {
  return (
    <View style={styles.mainContainer}>
      {/* Empty slot */}
      <View style={styles.titleContainer}></View>

      {/* title box */}
      <View style={styles.titleContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Órden de compra</Text>
        </View>
      </View>

      {/* order id */}
      <View style={styles.orderIdContainer}>
        <Text>No.</Text>
        <Text style={styles.orderId}>
          {String(register.id_orden).padStart(6, '0')}
        </Text>
      </View>
    </View>
  );
}
