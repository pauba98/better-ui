import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
  title: 'Example/Tooltip',
  component: Tooltip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { children: (<p>Hello World</p>), text: 'Esto es el tooltip' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: <p>Hello World</p>,
    text: 'Mensaje del tooltip!',
  },
};

export const Secondary: Story = {
  args: {
    children: <p>Hello World</p>,
    text: 'Mensaje del tooltip!',
    styles: {
      backgroundColor: '#f00'
    }
  },
};

