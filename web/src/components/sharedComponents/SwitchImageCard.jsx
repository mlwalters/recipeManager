import beef from '../../assets/categories/beef.jpg';
import bread from '../../assets/categories/bread.jpg';
import dessert from '../../assets/categories/dessert.jpg';
import dipssauces from '../../assets/categories/dipssauces.jpg';
import soup from '../../assets/categories/soup.jpg';
import pork from '../../assets/categories/pork.jpg';
import drinks from '../../assets/categories/drinks.jpg';
import salad from '../../assets/categories/salad.jpg';
import poultry from '../../assets/categories/poultry.jpg';
import vegetarian from '../../assets/categories/vegetarian.jpg';
import seafood from '../../assets/categories/seafood.jpg';
import sides from '../../assets/categories/sides.jpg';
import snack from '../../assets/categories/snack.jpg';

const SwitchImageCard = (category) => {
  switch (category) {
    case 'Dessert':
      return `${dessert}`;
    case 'Drinks':
      return `${drinks}`;
    case 'Soup':
      return `${soup}`;
    case 'Seafood':
      return `${seafood}`;
    case 'Beef':
      return `${beef}`;
    case 'Pork':
      return `${pork}`;
    case 'Poultry':
      return `${poultry}`;
    case 'Salad':
      return `${salad}`;
    case 'Sauces':
      return `${dipssauces}`;
    case 'Sides':
      return `${sides}`;
    case 'Bread':
      return `${bread}`;
    case 'Snack':
      return `${snack}`;
    case 'Vegetarian':
      return `${vegetarian}`;
    default:
      return 'https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg';
  }
};

export default SwitchImageCard;
