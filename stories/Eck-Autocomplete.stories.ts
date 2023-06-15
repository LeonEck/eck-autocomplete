import type { StoryObj, Meta } from '@storybook/html';
import { withActions } from '@storybook/addon-actions/decorator';
import {
  createAutocompleteWithInput,
  EckAutocompleteProps,
} from './Eck-Autocomplete';

const meta: Meta<EckAutocompleteProps> = {
  title: 'eck-autocomplete',
  argTypes: {
    highlightFirstOption: {
      control: 'boolean',
      name: 'highlight-first-option',
      description: 'Highlight first option.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectHighlightedOption: {
      control: 'boolean',
      name: 'select-highlighted-option',
      description:
        'Sets the value of the input to the highlighted option. When pressing ESC the value will be reset. Closing the panel in any other way will preserve the value.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['eck-autocomplete-option-selected'],
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 150,
      },
    },
  },
  decorators: [withActions],
};

export default meta;
type Story = StoryObj<EckAutocompleteProps>;

const defaultOptions = {
  highlightFirstOption: false,
  selectHighlightedOption: true,
};

export const Default: Story = {
  render: (args) => createAutocompleteWithInput(args),
  args: defaultOptions,
};

export const HighlightFirstOption = { ...Default };
HighlightFirstOption.args = {
  ...defaultOptions,
  ...{
    highlightFirstOption: true,
  },
};
HighlightFirstOption.storyName = 'First option highlighted';
