import type { Meta, StoryObj } from '@storybook/html';
import { createMountainDemo } from './Eck-Autocomplete-Mountain-Demo';

const meta: Meta = {
  title: 'Demos/Mountain selection',
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
  render: () => createMountainDemo(),
};
Demo.storyName = 'Mountain selection';
