import { Story, Meta } from '@storybook/html';
import {
  createAutocompleteWithInput,
  EckAutocompleteProps,
} from './Eck-Autocomplete';

export default {
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
  },
} as Meta;

const Template: Story<EckAutocompleteProps> = (args) => {
  return createAutocompleteWithInput(args);
};

const defaultOptions = {
  highlightFirstOption: false,
  selectHighlightedOption: true,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultOptions,
};

export const HighlightFirstOption = Template.bind({});
HighlightFirstOption.args = {
  ...defaultOptions,
  ...{
    highlightFirstOption: true,
  },
};
HighlightFirstOption.storyName = 'First option highlighted';
