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
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: { textAlign: 'center' },
});

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image src="/logo-dark.png" style={styles.logo} />
      </View>

      {/* header title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ASOCIACIÓN EDUCATIVA LASALLISTA</Text>
        <Text style={styles.subtitle}>Instituto Politécnico La Salle</Text>
        <Text style={styles.subtitle}>
          Km 4 carreterra Poneloya - 2311-2584
        </Text>
      </View>
      {/* Empty slot */}
      <View style={{ width: '50%' }}></View>
    </View>
  );
}
