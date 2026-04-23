import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ContributeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Contribute</Text>
        <Text style={styles.sub}>Submit evidence and updates to help keep guides accurate.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 32 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 20, color: '#111827' },
  sub: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#9CA3AF', textAlign: 'center' },
});
