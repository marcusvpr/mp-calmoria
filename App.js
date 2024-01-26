import * as React from 'react';

import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { ModalAnsIA } from './modal/index';

import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';

import axios from 'axios';

export default function App() {
  //
  const [ email, setEmail ] = React.useState('root@teste.com');
  const [ msg, setMsg ] = React.useState('Mensagem : ');
  const [ userData, setUserData ] = React.useState('');

  const [ indModalAnsIA, setIndModalAnsIA ] = React.useState(false);
  const openModalAnsIA = () => setIndModalAnsIA(true);
  const closeModalAnsIA = () => setIndModalAnsIA(false);

  const [indModalMenu, setIndModalMenu] = React.useState(false);
  const openModalMenu = () => setIndModalMenu(true);
  const closeModalMenu = () => setIndModalMenu(false);

  const [indModalNivelStress, setIndModalNivelStress] = React.useState(false);
  const openModalNivelStress = () => setIndModalNivelStress(true);
  const closeModalNivelStress = () => setIndModalNivelStress(false);

  const [ perguntaAnsIA, setPerguntaAnsIA ] = React.useState('');
  const [ respostaAnsIA, setRespostaAnsIA ] = React.useState('');

  const [ indModalPerguntaAnsIA, setIndModalPerguntaAnsIA ] = React.useState(false);
  const openModalPerguntaAnsIA = () => setIndModalPerguntaAnsIA(true);
  const closeModalPerguntaAnsIA = () => setIndModalPerguntaAnsIA(false);

  // ===============================================================

  function handlerLogin() {
    //
    setMsg('Mensagem : ');

    if (email == '') {
      setMsg('Mensagem : Informar E-mail!');
      return;
    }

    const endpoint = `http://192.168.0.102:8085/apps/api/v1/usuarios/auth/${email}` ;
    //const endpoint = `http://localhost:8085/apps/api/v1/usuarios/auth/${email}` ;

    axios.get(endpoint)
    .then(response => {
      // console.log(response.data);
      const { apelido, nome, sobreNome } = response.data;
      // console.log(apelido, nome, sobreNome);  
      const userDataApi = {
        apelido: apelido,
        nome: nome,
        sobreNome: sobreNome,
      };
      setUserData(userDataApi);
      setMsg(`Mensagem : Olá, \n( ${nome} ${sobreNome} ) ! `);

      setIndModalAnsIA(true);
    })
    .catch(error => {
      setMsg(`Mensagem : Error ao carregar os \ndados do Usuário ! \n( ${email} ) \n${error} `);
    });    
  };

  function handlerVoltar() {
    //
    setIndModalNivelStress(false);
  };

  function handlerSair() {
    //
    setIndModalAnsIA(false);
    setIndModalNivelStress(false);
  };

  function handlerMedirStress() {
    //
    setIndModalNivelStress(false);
  };
  
  return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Transtorno de Ansiedade</Text>
        <Image style={styles.logo}
          source={require('./assets/ansiedadeZeroCalmoria-AnsIA_logo.png')} 
        />
        <Text style={styles.email}>E-mail : </Text>
        <TouchableOpacity style={styles.textInput}>
          <TextInput onChangeText={setEmail} value={email}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlerLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.mensagem}>{msg}</Text>

        <Modal 
          visible={indModalAnsIA} 
          animationType='fade'>
          <PaperProvider>
            <View style={styles.containerMenu}>
              <Menu
                visible={indModalMenu}
                onDismiss={closeModalMenu}
                anchor={<Button onPress={openModalMenu}>Exibir MENU</Button>}>
                <Menu.Item onPress={openModalNivelStress} title="Medir Nivel de Estresse" />
                <Menu.Item onPress={() => {}} title="Fale com a Ans-IA" />
              </Menu>
              <Text style={styles.email}>Olá ! {userData.nome} {userData.sobreNome}</Text>
              <Image style={styles.logoMenor}
                source={require('./assets/ansiedadeZeroCalmoria-AnsIA_logo.png')}               
              />
              <TouchableOpacity style={styles.buttonMedio} onPress={openModalNivelStress}>
                <Text style={styles.buttonText}>Medir Nivel de Estresse</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMedio} onPress={openModalPerguntaAnsIA}>
                <Text style={styles.buttonText}>Fale com a Ans-IA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMenor} onPress={handlerSair}>
                <Text style={styles.buttonTextMenor}>Sair</Text>
              </TouchableOpacity>
            </View>
          </PaperProvider>          
        </Modal>

        <Modal 
          visible={indModalNivelStress} 
          animationType='fade'>
          <PaperProvider>
            <View style={styles.containerMenu}>
              <Image style={styles.logoMenor}
                source={require('./assets/ansiedadeZeroCalmoria-AnsIA_logo.png')}               
              />
              <Image style={styles.logo}
                source={require('./assets/ans-IA_NivelStress.png')}               
              />
              <Text style={styles.email}>Vamos medir ? {userData.nome} </Text>
              <TouchableOpacity style={styles.buttonMedio} onPress={handlerMedirStress}>
                <Text style={styles.buttonText}>Medir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMenor} onPress={handlerVoltar}>
                <Text style={styles.buttonTextMenor}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMenor} onPress={handlerSair}>
                <Text style={styles.buttonTextMenor}>Sair</Text>
              </TouchableOpacity>
            </View>
          </PaperProvider>          
        </Modal>

        <Modal 
          visible={indModalPerguntaAnsIA} 
          animationType='fade'>
          <PaperProvider>
            <View style={styles.containerMenu}>
              <Image style={styles.logoMenor}
                source={require('./assets/ansiedadeZeroCalmoria-AnsIA_logo.png')}               
              />
              <Text style={styles.email}>Vamos conversar ? {userData.nome} </Text>

              <TouchableOpacity style={styles.textInputPergunta}>
                <TextInput onChangeText={setPerguntaAnsIA} value={perguntaAnsIA}
                  placeholder="Digite sua pergunta?"
                  keyboardType="text"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonMedio} onPress={handlerMedirStress}>
                <Text style={styles.buttonText}>Perguntar</Text>
              </TouchableOpacity>

              <Text style={styles.textInputPergunta} value={respostaAnsIA} />

              <TouchableOpacity style={styles.buttonMenor} onPress={handlerVoltar}>
                <Text style={styles.buttonTextMenor}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMenor} onPress={handlerSair}>
                <Text style={styles.buttonTextMenor}>Sair</Text>
              </TouchableOpacity>
            </View>
          </PaperProvider>          
        </Modal>


      </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMenu: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'top',
  },
  titulo: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#392de9',
  },
  logo: {
    marginBottom: 10,
    width: 200,
    height: 270,
  },
  logoMenor: {
    marginBottom: 10,
    width: 120,
    height: 170,
  },
  area:{
    marginTop: 10,
    marginBottom: 14,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
  },
  email: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputPergunta: {
    marginTop: 5,
    backgroundColor: '#fff',
    width: '80%',
    fontSize: 32,
    fontWeight: 'bold',
  },
  button:{
    marginTop: 15,
    padding: 6,
    backgroundColor: '#392de9',
    borderRadius: 8,
    width: '50%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonMenor:{
    marginTop: 15,
    padding: 6,
    backgroundColor: '#392de9',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonMedio:{
    marginTop: 15,
    padding: 6,
    backgroundColor: '#392de9',
    borderRadius: 8,
    width: '60%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonText:{
    marginTop: 10,
    marginBottom: 10,
    padding: 3,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextMenor:{
    marginTop: 10,
    marginBottom: 10,
    padding: 3,
    color: 'yellow',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mensagem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
});
