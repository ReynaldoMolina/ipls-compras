import { View, Image, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  logoContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  logo: { width: '65%' },
  titleContainer: {
    gap: 5,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: { textAlign: 'center', fontSize: 9 },
});

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image src="/logo-dark.png" style={styles.logo} />
      </View>

      {/* header title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Asociación Educativa Lasallista</Text>
        <Text style={styles.subtitle}>INSTITUTO POLITÉCNICO LA SALLE</Text>
        <Text style={styles.subtitle}>
          Dirección: Km. 4 carretera a Poneloya - Tel.: 2311-2584 - Fax:
          2312-5672
        </Text>
      </View>
      {/* Empty slot */}
      <View style={{ width: '50%' }}></View>
    </View>
  );
}
