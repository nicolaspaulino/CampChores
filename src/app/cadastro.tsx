import { StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CadastroScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>

        <ThemedText type="title" style={styles.title}>
          Criar sua conta
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Preencha seus dados para começar.
        </ThemedText>

        <ThemedText style={styles.label}>
          Nome completo
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
        />

        <ThemedText style={styles.label}>
          E-mail
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>
          CPF
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
        />

        <ThemedText style={styles.label}>
          Telefone
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
        />

        <ThemedText style={styles.label}>
          Endereço
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu endereço"
        />

        <ThemedText style={styles.label}>
          Senha
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <ThemedText style={styles.label}>
          Confirmar senha
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha novamente"
          secureTextEntry
        />

        <Pressable style={styles.button}>
          <ThemedText style={styles.buttonText}>
            Criar conta
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <ThemedText style={styles.loginText}>
            Já tenho uma conta
          </ThemedText>
        </Pressable>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },

  label: {
    marginBottom: 6,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#1976D2',
  },

  buttonText: {
    fontWeight: 'bold',
  },

  loginText: {
    textAlign: 'center',
  },
});