import { Meta, Story } from '@storybook/html';
import { createMountainDemo } from './Eck-Autocomplete-Mountain-Demo';

export default {
  title: 'Demos/Mountain selection',
} as Meta;

const Template: Story = () => {
  return createMountainDemo();
};

export const Demo = Template.bind({});
Demo.storyName = 'Mountain selection';
