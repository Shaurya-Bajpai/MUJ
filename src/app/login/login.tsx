import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useState } from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router'

export default function Login() {
  const colorScheme = useColorScheme();
  const [rollno, setRollno] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>MUJ Login</Text>

          <View style={styles.divider} />

          <TextInput 
            style={styles.input} 
            value={rollno} 
            onChangeText={setRollno} 
            placeholder="Roll No" 
            placeholderTextColor='gray'
          />
          
          <TextInput 
            style={styles.input}
            value={password} 
            onChangeText={setPassword} 
            placeholder="Password" 
            placeholderTextColor='gray' secureTextEntry 
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={!rollno || !password} // Disable the button if either field is empty
              onPress={() => console.log('Login pressed')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  card: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#f5b638',
    letterSpacing: 0.5,
    paddingTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: 'lightgray',
    borderWidth: 0.7,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  button: {
    justifyContent: 'flex-end',
    backgroundColor: '#f5b638',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})