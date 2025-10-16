import { View, Text } from '@react-pdf/renderer';

export function Footer() {
  return (
    <View style={{ flexDirection: 'row', marginTop: 25 }}>
      {/* firmas */}
      <TableFooterFirma label="Recibido Por" />
      <TableFooterFirma label="Autorizado Por" />
      <TableFooterFirma label="Entregado Por" />
    </View>
  );
}

function TableFooterFirma({ label }: { label: string }) {
  return (
    <View style={{ gap: 5, alignItems: 'center', width: '100%' }}>
      <Text style={{ textAlign: 'center' }}>______________________</Text>
      <Text style={{ textAlign: 'center' }}>{label ?? ''}</Text>
    </View>
  );
}
