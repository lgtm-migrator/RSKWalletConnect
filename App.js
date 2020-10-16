/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './shim'
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { generateMnemonic, mnemonicToSeedSync, seedToRSKHDKey } from '@rsksmart/rif-id-mnemonic';
import { rskDIDFromPrivateKey as rskMainnetDIDFromPrivateKey, rskTestnetDIDFromPrivateKey } from '@rsksmart/rif-id-ethr-did';

const App: () => React$Node = () => {
  const [network, setNetwork] = useState(30)
  const [did0, setDid0] = useState(null)
  const [did1, setDid1] = useState(null)
  const [selectedDid, setSelectedDid] = useState(0)

  const mnemonic = generateMnemonic(12)
  const seed = mnemonicToSeedSync(mnemonic)
  const hdKey = seedToRSKHDKey(seed)
  const privateKey0 = hdKey.derive(0).privateKey?.toString('hex')
  const privateKey1 = hdKey.derive(1).privateKey?.toString('hex')

  const setDIDs = (network) => {
    const rskDIDFromPrivateKey = network === 30 ? rskMainnetDIDFromPrivateKey() : rskTestnetDIDFromPrivateKey()
    const did0 = rskDIDFromPrivateKey(privateKey0)
    const did1 = rskDIDFromPrivateKey(privateKey1)

    setDid0(did0)
    setDid1(did1)
  }

  const handleNetworkChange = (network) => {
    setNetwork(network)
    setDIDs(network)
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Mnemonic</Text>
              <Text style={styles.sectionDescription}>
                {mnemonic}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Picker
                selectedValue={network}
                onValueChange={(itemValue, itemIndex) => handleNetworkChange(itemValue)}
              >
                <Picker.Item label="RSK Mainnet" value={30} />
                <Picker.Item label="RSK Testnet" value={31} />
              </Picker>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Change persona</Text>
                {
                  did0 && did1 && <Picker
                    selectedValue={selectedDid}
                    onValueChange={(itemValue, itemIndex) => setSelectedDid(itemValue)}
                  >
                    <Picker.Item label={did0.did} value={0} />
                    <Picker.Item label={did1.did} value={1} />
                  </Picker>
                }
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Use wallet connect</Text>
              <Text style={styles.sectionDescription}>
                connect
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Disconnect</Text>
              <Text style={styles.sectionDescription}>
                disconnect
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
