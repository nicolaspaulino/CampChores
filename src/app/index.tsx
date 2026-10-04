import { StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

    async function entrar() {
    try {
      const resposta = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem);
        return;
      }

      alert('Login realizado com sucesso!');

    } catch (error) {
      console.error(error);
      alert('Não foi possível conectar ao servidor.');
    }
  }

  return (
    <ThemedView style={styles.container}>

      <ThemedText type="title" style={styles.title}>
        CampChores
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Serviços domésticos de forma simples e segura.
      </ThemedText>

      <ThemedText style={styles.label}>
        E-mail
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <ThemedText style={styles.label}>
        Senha
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable
          style={styles.button}
          onPress={entrar}>
        <ThemedText style={styles.buttonText}>
          Entrar
        </ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push('/cadastro')}>
        <ThemedText style={styles.registerText}>
          Criar uma conta
        </ThemedText>
      </Pressable>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
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

  registerText: {
    textAlign: 'center',
  },
});