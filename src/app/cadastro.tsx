import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CadastroScreen() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
    function cpfValido(cpf: string) {
  const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += Number(cpfLimpo[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    if (resto !== Number(cpfLimpo[9])) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += Number(cpfLimpo[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    return resto === Number(cpfLimpo[10]);
  }
  async function criarConta() {
    if (!cpfValido(cpf)) {
    alert('Digite um CPF válido.');
    return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          cpf,
          telefone,
          endereco,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem);
        return;
      }

      alert('Conta criada com sucesso!');
      router.back();

    } catch (error) {
      console.error(error);
      alert('Não foi possível conectar ao servidor.');
    }
  }

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
          value={nome}
          onChangeText={setNome}
        />

        <ThemedText style={styles.label}>
          E-mail
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <ThemedText style={styles.label}>
          CPF
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />

        <ThemedText style={styles.label}>
          Telefone
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <ThemedText style={styles.label}>
          Endereço
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu endereço"
          value={endereco}
          onChangeText={setEndereco}
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

        <ThemedText style={styles.label}>
          Confirmar senha
        </ThemedText>

        <TextInput
        style={styles.input}
        placeholder="Digite sua senha novamente"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

        <Pressable style={styles.button} onPress={criarConta}>
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