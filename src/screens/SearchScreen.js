import React, { useState } from 'react';
import { ScrollView,View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import { myTheme } from '../../eva';
const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <ScrollView style={styles.background}>
      <View style={{backgroundColor: myTheme.colors.primary,}}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      </View>
      
      {errorMessage && <Text>{errorMessage}</Text>}
      <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
      <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
      <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
    </ScrollView>
  );
};

const styles = {
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
};

export default SearchScreen;
