import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function VerifyScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify</Text>
        <Text style={styles.sub}>Review and verify guide accuracy. Coming soon.</Text>
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
