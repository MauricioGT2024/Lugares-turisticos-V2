import CatamarcaLocationCard from './CatamarcaLocationCard';

export default {
  title: 'Catamarca/LocationCard',
  component: CatamarcaLocationCard,
};

const Template = (args) => <CatamarcaLocationCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  location: {
    id: 1,
    imgSrc: '/placeholder.jpg',
    title: 'Sample Location',
    description: 'This is a sample location description',
    mapSrc: 'https://maps.google.com',
    area: 'Centro'
  },
  onShowDetails: () => console.log('Show details clicked')
};
