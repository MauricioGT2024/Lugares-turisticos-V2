import LocationImage from './LocationImage';

export default {
  title: 'Catamarca/LocationImage',
  component: LocationImage,
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A responsive image component for Catamarca location cards with hover effects and lazy loading.'
      }
    }
  }
};

const Template = (args) => <LocationImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: '/placeholder.jpg',
  alt: 'Sample location image'
};

export const MissingImage = Template.bind({});
MissingImage.args = {
  src: '/nonexistent.jpg',
  alt: 'Missing image'
};
