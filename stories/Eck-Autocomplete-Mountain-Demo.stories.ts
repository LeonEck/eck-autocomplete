import type { Meta, StoryObj } from '@storybook/html';
import { createMountainDemo } from './Eck-Autocomplete-Mountain-Demo';

const meta: Meta = {
  title: 'Demos/Mountain selection',
  render: () => createMountainDemo(),
  tags: ['autodocs'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  name: 'Mountain selection',
};
