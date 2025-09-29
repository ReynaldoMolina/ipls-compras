import { View, Text } from '@react-pdf/renderer';

export function Footer() {
  return (
    <View
      fixed
      style={{
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        minHeight: 10,
      }}
    >
      <Text
        style={{ fontSize: 9 }}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}
