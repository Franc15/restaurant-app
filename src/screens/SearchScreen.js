import React, { useState } from 'react';
import { ScrollView,View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import { myTheme } from '../../eva';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurant.restaurants);

  const user = useSelector((state) => state.auth.user);

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
      <Text style={{marginLeft: 10, marginTop: 10, marginBottom: 5, fontWeight: 'bold', color: myTheme.colors.primary}}>We have found {results.length} results</Text>
      <TouchableOpacity style={{marginLeft: 10, marginBottom: 10,}} onPress={() => navigation.navigate("Map")}>
        <Text style={{color: myTheme.colors.primary}}>View Map</Text>
      </TouchableOpacity>
      
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
