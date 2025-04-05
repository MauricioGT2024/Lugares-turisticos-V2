import AreaFilter from './AreaFilter';

export default {
  title: 'Catamarca/AreaFilter',
  component: AreaFilter,
  argTypes: {
    area: {
      control: 'text',
      description: 'The area name to display'
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the filter is currently selected'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when filter is clicked'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A filter button component for selecting tourism areas in Catamarca. Includes hover and tap animations.'
      }
    }
  }
};

const Template = (args) => <AreaFilter {...args} />;

export const Default = Template.bind({});
Default.args = {
  area: 'Centro',
  isSelected: false
};

export const Selected = Template.bind({});
Selected.args = {
  area: 'Noroeste',
  isSelected: true
};
